import { createRazorpayOrder, verifyRazorpayPayment } from "./payments.functions";
import { toast } from "sonner";

export type CheckoutCustomer = { name: string; email: string; whatsapp: string };

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Razorpay) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("Could not load the payment window."));
    };
    document.body.appendChild(s);
  });
  return scriptPromise;
}

export async function startCheckout(
  slug: string,
  customer: CheckoutCustomer,
  onSuccess?: () => void,
) {
  try {
    await loadRazorpayScript();
    const order = await createRazorpayOrder({ data: { slug, customer } });


    const rzp = new window.Razorpay!({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: "IndianDietDoc",
      description: order.productName,
      order_id: order.orderId,
      theme: { color: "#22C55E" },
      prefill: {
        email: userData.user.email ?? "",
        name: (userData.user.user_metadata?.full_name as string | undefined) ?? "",
      },
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        try {
          await verifyRazorpayPayment({ data: response });
          toast.success("Payment successful! Your purchase is unlocked.");
          onSuccess?.();
        } catch (e) {
          toast.error(e instanceof Error ? e.message : "Payment verification failed.");
        }
      },
      modal: {
        escape: true,
        backdropclose: false,
        ondismiss: () => {
          releasePageScroll();
          toast.info("Payment cancelled.");
        },
      },
    });
    rzp.open();
  } catch (e) {
    releasePageScroll();
    toast.error(e instanceof Error ? e.message : "Something went wrong.");
  }
}

// Razorpay's checkout locks scroll on <html>/<body> and can leave an invisible
// overlay/container behind when the modal is dismissed, which looks like a frozen screen.
function releasePageScroll() {
  if (typeof document === "undefined") return;
  const clean = () => {
    for (const el of [document.documentElement, document.body]) {
      el.style.overflow = "";
      el.style.position = "";
      el.style.top = "";
      el.style.width = "";
      el.style.height = "";
      el.classList.remove("razorpay-payment-lock", "razorpay-lock");
    }
    document
      .querySelectorAll(".razorpay-container, .razorpay-backdrop")
      .forEach((n) => n.remove());
  };
  clean();
  // Razorpay tears down asynchronously; re-run after its own cleanup.
  setTimeout(clean, 350);
  setTimeout(clean, 1200);
}
