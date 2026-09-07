import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { startCheckout, type CheckoutCustomer } from "@/lib/razorpay";

const EVENT = "iddc:checkout";

/** Opens the details form, then Razorpay. Safe to call from any button. */
export function requestCheckout(slug: string, productName?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { slug, productName } }));
}

export function CheckoutDialog() {
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [productName, setProductName] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<CheckoutCustomer>({ name: "", email: "", whatsapp: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onReq = (e: Event) => {
      const detail = (e as CustomEvent<{ slug: string; productName?: string }>).detail;
      setSlug(detail.slug);
      setProductName(detail.productName);
      setError(null);
      setOpen(true);
    };
    window.addEventListener(EVENT, onReq);
    return () => window.removeEventListener(EVENT, onReq);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const name = form.name.trim();
    const email = form.email.trim();
    const whatsapp = form.whatsapp.trim();
    if (name.length < 2) return setError("Please enter your full name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError("Please enter a valid email address.");
    if (!/^[0-9+\-\s()]{8,20}$/.test(whatsapp)) return setError("Please enter a valid WhatsApp number.");
    setError(null);
    setBusy(true);
    try {
      await startCheckout(slug, { name, email, whatsapp });
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your details</DialogTitle>
          <DialogDescription>
            {productName ? `For ${productName}. ` : ""}We send your receipt and plan to your email and WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="co-name">Full name</Label>
            <Input id="co-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="co-email">Email</Label>
            <Input id="co-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="co-wa">WhatsApp number</Label>
            <Input id="co-wa" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="+91 98765 43210" autoComplete="tel" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
            {busy ? "Opening payment…" : "Continue to payment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
