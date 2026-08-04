import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const createOrderInput = z.object({ slug: z.string().min(1).max(120) });
const verifyInput = z.object({
  razorpay_order_id: z.string().min(1).max(200),
  razorpay_payment_id: z.string().min(1).max(200),
  razorpay_signature: z.string().min(1).max(400),
});

/** Public: the Razorpay Key ID is publishable and required by the checkout widget. */
export const getRazorpayKeyId = createServerFn({ method: "GET" }).handler(async () => {
  return { keyId: process.env.RAZORPAY_KEY_ID ?? null };
});

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => createOrderInput.parse(data))
  .handler(async ({ data, context }) => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      throw new Error("Payments are not configured yet. Please add your Razorpay keys.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: product, error: productError } = await supabaseAdmin
      .from("products")
      .select("id, name, amount_paise, currency, active")
      .eq("slug", data.slug)
      .maybeSingle();

    if (productError) throw new Error("Could not load that product.");
    if (!product || !product.active) throw new Error("That product is not available.");

    const receipt = `rcpt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
      },
      body: JSON.stringify({
        amount: product.amount_paise,
        currency: product.currency,
        receipt,
        notes: { product_slug: data.slug, user_id: context.userId },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[razorpay] order create failed", res.status, body);
      throw new Error("Could not start the payment. Please try again.");
    }

    const order = (await res.json()) as { id: string; amount: number; currency: string };

    const { error: insertError } = await supabaseAdmin.from("orders").insert({
      user_id: context.userId,
      product_id: product.id,
      razorpay_order_id: order.id,
      amount_paise: product.amount_paise,
      currency: product.currency,
      status: "created",
    });
    if (insertError) {
      console.error("[razorpay] order persist failed", insertError);
      throw new Error("Could not record the order. Please try again.");
    }

    return {
      keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      productName: product.name,
    };
  });

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => verifyInput.parse(data))
  .handler(async ({ data, context }) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) throw new Error("Payments are not configured yet.");

    const { createHmac, timingSafeEqual } = await import("crypto");
    const expected = createHmac("sha256", keySecret)
      .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
      .digest("hex");

    const got = Buffer.from(data.razorpay_signature);
    const exp = Buffer.from(expected);
    if (got.length !== exp.length || !timingSafeEqual(got, exp)) {
      throw new Error("Payment could not be verified.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: updated, error } = await supabaseAdmin
      .from("orders")
      .update({
        status: "paid",
        razorpay_payment_id: data.razorpay_payment_id,
        paid_at: new Date().toISOString(),
      })
      .eq("razorpay_order_id", data.razorpay_order_id)
      .eq("user_id", context.userId)
      .select("id")
      .maybeSingle();

    if (error || !updated) throw new Error("Order not found for this account.");
    return { ok: true as const };
  });

export const listMyPurchases = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select("id, status, amount_paise, currency, created_at, paid_at, products(name, slug, kind, download_url)")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Could not load your purchases.");
    return (data ?? []).map((row) => ({
      ...row,
      products: row.products
        ? { ...row.products, download_url: row.status === "paid" ? row.products.download_url : null }
        : null,
    }));
  });