import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const customerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  whatsapp: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid WhatsApp number"),
});

const createOrderInput = z.object({
  slug: z.string().min(1).max(120),
  customer: customerSchema,
});

const verifyInput = z.object({
  razorpay_order_id: z.string().min(1).max(200),
  razorpay_payment_id: z.string().min(1).max(200),
  razorpay_signature: z.string().min(1).max(400),
});

/** Public: the Razorpay Key ID is publishable and required by the checkout widget. */
export const getRazorpayKeyId = createServerFn({ method: "GET" }).handler(async () => {
  return { keyId: process.env["RAZORPAY_KEY_ID"] ?? null };
});

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createOrderInput.parse(data))
  .handler(async ({ data }) => {
    const keyId = process.env["RAZORPAY_KEY_ID"];
    const keySecret = process.env["RAZORPAY_KEY_SECRET"];
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
        notes: {
          product_slug: data.slug,
          customer_name: data.customer.name,
          customer_email: data.customer.email,
          customer_whatsapp: data.customer.whatsapp,
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[razorpay] order create failed", res.status, body);
      throw new Error("Could not start the payment. Please try again.");
    }

    const order = (await res.json()) as { id: string; amount: number; currency: string };

    const { error: insertError } = await supabaseAdmin.from("orders").insert({
      product_id: product.id,
      razorpay_order_id: order.id,
      amount_paise: product.amount_paise,
      currency: product.currency,
      status: "created",
      customer_name: data.customer.name,
      customer_email: data.customer.email,
      customer_whatsapp: data.customer.whatsapp,
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

/**
 * Public but self-authenticating: the Razorpay HMAC signature proves the payment,
 * so guests (no account) can complete checkout and receive their delivery.
 */
export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => verifyInput.parse(data))
  .handler(async ({ data }) => {
    const keySecret = process.env["RAZORPAY_KEY_SECRET"];
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
      .select(
        "id, amount_paise, currency, customer_name, customer_email, customer_whatsapp, products(name, download_url, sample_pdf_url)",
      )
      .maybeSingle();

    if (error || !updated) throw new Error("Order not found.");

    const { sendReceiptEmail, sendReceiptWhatsapp } = await import("./delivery.server");
    const payload = {
      customerName: updated.customer_name ?? "there",
      customerEmail: updated.customer_email ?? "",
      customerWhatsapp: updated.customer_whatsapp ?? "",
      productName: updated.products?.name ?? "IndianDietDoc purchase",
      amountPaise: updated.amount_paise,
      currency: updated.currency,
      paymentId: data.razorpay_payment_id,
      orderId: data.razorpay_order_id,
      downloadUrl: updated.products?.download_url ?? null,
      samplePdfUrl: updated.products?.sample_pdf_url ?? "/samples/indiandietdoc-sample.pdf",
      siteOrigin: process.env["SITE_ORIGIN"] ?? "https://indiandietdoc-dev.lovable.app",
    };

    let emailed = false;
    let whatsapped = false;
    if (payload.customerEmail) emailed = await sendReceiptEmail(payload);
    if (payload.customerWhatsapp) whatsapped = await sendReceiptWhatsapp(payload);

    if (emailed || whatsapped) {
      await supabaseAdmin
        .from("orders")
        .update({ delivered_at: new Date().toISOString() })
        .eq("id", updated.id);
    }

    return {
      ok: true as const,
      emailed,
      whatsapped,
      email: payload.customerEmail,
      productName: payload.productName,
      amountPaise: payload.amountPaise,
      currency: payload.currency,
      paymentId: payload.paymentId,
      downloadUrl: payload.downloadUrl,
      samplePdfUrl: payload.samplePdfUrl,
    };
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
