/**
 * Server-only delivery helpers: emails the payment receipt + sample PDF and,
 * when a WhatsApp Cloud API token is configured, sends the same receipt on WhatsApp.
 */

export type DeliveryOrder = {
  customerName: string;
  customerEmail: string;
  customerWhatsapp: string;
  productName: string;
  amountPaise: number;
  currency: string;
  paymentId: string;
  orderId: string;
  downloadUrl: string | null;
  samplePdfUrl: string | null;
  siteOrigin: string;
};

const money = (paise: number, currency: string) =>
  `${currency === "INR" ? "₹" : `${currency} `}${(paise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  })}`;

function absolute(origin: string, url: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${origin.replace(/\/$/, "")}${url.startsWith("/") ? "" : "/"}${url}`;
}

function receiptHtml(o: DeliveryOrder) {
  const sample = absolute(o.siteOrigin, o.samplePdfUrl);
  const download = absolute(o.siteOrigin, o.downloadUrl);
  return `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#0a0a0a">
  <div style="max-width:560px;margin:0 auto;padding:28px 24px">
    <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#16a34a">IndianDietDoc</div>
    <h1 style="font-size:22px;margin:12px 0 4px">Payment received — thank you, ${escapeHtml(o.customerName)}!</h1>
    <p style="font-size:14px;line-height:1.6;color:#444">Your purchase is confirmed. Here is your receipt.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin:18px 0">
      <tr><td style="padding:8px 0;color:#666">Item</td><td style="padding:8px 0;text-align:right"><b>${escapeHtml(o.productName)}</b></td></tr>
      <tr><td style="padding:8px 0;color:#666">Amount paid</td><td style="padding:8px 0;text-align:right"><b>${money(o.amountPaise, o.currency)}</b></td></tr>
      <tr><td style="padding:8px 0;color:#666">Payment ID</td><td style="padding:8px 0;text-align:right">${escapeHtml(o.paymentId)}</td></tr>
      <tr><td style="padding:8px 0;color:#666">Order ID</td><td style="padding:8px 0;text-align:right">${escapeHtml(o.orderId)}</td></tr>
      <tr><td style="padding:8px 0;color:#666">WhatsApp</td><td style="padding:8px 0;text-align:right">${escapeHtml(o.customerWhatsapp)}</td></tr>
    </table>
    ${download ? `<p style="margin:18px 0"><a href="${download}" style="background:#16a34a;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;display:inline-block;font-size:14px">Download your purchase</a></p>` : ""}
    ${sample ? `<p style="font-size:14px;color:#444">Your free sample plan is attached to this email${download ? "" : ""}. You can also <a href="${sample}" style="color:#16a34a">download it here</a>.</p>` : ""}
    <p style="font-size:14px;color:#444;line-height:1.6">Coach Plawan will reach out on WhatsApp shortly to start your plan.</p>
    <p style="font-size:12px;color:#888;margin-top:24px">IndianDietDoc · Coach Plawan Hota</p>
  </div></body></html>`;
}

function escapeHtml(v: string) {
  return v.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

export function receiptText(o: DeliveryOrder) {
  return [
    `IndianDietDoc — payment receipt`,
    ``,
    `Hi ${o.customerName}, your payment is confirmed.`,
    `Item: ${o.productName}`,
    `Amount: ${money(o.amountPaise, o.currency)}`,
    `Payment ID: ${o.paymentId}`,
    `Order ID: ${o.orderId}`,
    absolute(o.siteOrigin, o.downloadUrl) ? `Download: ${absolute(o.siteOrigin, o.downloadUrl)}` : "",
    absolute(o.siteOrigin, o.samplePdfUrl) ? `Sample plan: ${absolute(o.siteOrigin, o.samplePdfUrl)}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function fetchSampleAttachment(o: DeliveryOrder) {
  const url = absolute(o.siteOrigin, o.samplePdfUrl);
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = new Uint8Array(await res.arrayBuffer());
    let binary = "";
    for (let i = 0; i < buf.length; i += 1) binary += String.fromCharCode(buf[i]!);
    return { filename: "indiandietdoc-sample-plan.pdf", content: btoa(binary) };
  } catch (e) {
    console.error("[delivery] sample pdf fetch failed", e);
    return null;
  }
}

export async function sendReceiptEmail(o: DeliveryOrder): Promise<boolean> {
  const apiKey = process.env["RESEND_API_KEY"];
  const from = process.env["RESEND_FROM_EMAIL"];
  if (!apiKey || !from) {
    console.warn("[delivery] email skipped — RESEND_API_KEY/RESEND_FROM_EMAIL not set");
    return false;
  }
  const attachment = await fetchSampleAttachment(o);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [o.customerEmail],
        subject: `Your IndianDietDoc receipt — ${o.productName}`,
        html: receiptHtml(o),
        ...(attachment ? { attachments: [attachment] } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[delivery] resend failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[delivery] resend error", e);
    return false;
  }
}

/** Sends the receipt over WhatsApp when Meta Cloud API credentials are configured. */
export async function sendReceiptWhatsapp(o: DeliveryOrder): Promise<boolean> {
  const token = process.env["WHATSAPP_TOKEN"];
  const phoneId = process.env["WHATSAPP_PHONE_NUMBER_ID"];
  if (!token || !phoneId) return false;
  const to = o.customerWhatsapp.replace(/\D/g, "");
  if (to.length < 10) return false;
  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { preview_url: true, body: receiptText(o) },
      }),
    });
    if (!res.ok) {
      console.error("[delivery] whatsapp failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[delivery] whatsapp error", e);
    return false;
  }
}
