import { createFileRoute } from "@tanstack/react-router";

/**
 * Razorpay webhook — configure this URL in the Razorpay Dashboard
 * (Settings → Webhooks) with events: payment.captured, payment.failed.
 * Secures itself with the RAZORPAY_WEBHOOK_SECRET signature.
 */
export const Route = createFileRoute("/api/public/razorpay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!secret) return new Response("Not configured", { status: 503 });

        const signature = request.headers.get("x-razorpay-signature") ?? "";
        const body = await request.text();

        const { createHmac, timingSafeEqual } = await import("crypto");
        const expected = createHmac("sha256", secret).update(body).digest("hex");
        const got = Buffer.from(signature);
        const exp = Buffer.from(expected);
        if (got.length !== exp.length || !timingSafeEqual(got, exp)) {
          return new Response("Invalid signature", { status: 401 });
        }

        let payload: {
          event?: string;
          payload?: { payment?: { entity?: { id?: string; order_id?: string } } };
        };
        try {
          payload = JSON.parse(body);
        } catch {
          return new Response("Bad payload", { status: 400 });
        }

        const entity = payload.payload?.payment?.entity;
        if (!entity?.order_id) return new Response("ok");

        const status =
          payload.event === "payment.captured"
            ? "paid"
            : payload.event === "payment.failed"
              ? "failed"
              : null;
        if (!status) return new Response("ok");

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        await supabaseAdmin
          .from("orders")
          .update({
            status,
            razorpay_payment_id: entity.id ?? null,
            paid_at: status === "paid" ? new Date().toISOString() : null,
          })
          .eq("razorpay_order_id", entity.order_id)
          .neq("status", "paid");

        return new Response("ok");
      },
    },
  },
});
