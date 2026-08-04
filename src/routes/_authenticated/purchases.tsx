import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMyPurchases } from "@/lib/payments.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Dumbbell, Loader2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/_authenticated/purchases")({
  head: () => ({
    meta: [
      { title: "My Purchases — IndianDietDoc | Coach Plawan Hota" },
      { name: "description", content: "View your IndianDietDoc orders, download your recipe books and manage your coaching program enrolments." },
      { property: "og:title", content: "My Purchases — IndianDietDoc" },
      { property: "og:description", content: "Your IndianDietDoc recipe books, guides and coaching programs in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Purchases,
});

function Purchases() {
  const navigate = useNavigate();
  const fetchPurchases = useServerFn(listMyPurchases);
  const { data, isLoading } = useQuery({
    queryKey: ["my-purchases"],
    queryFn: () => fetchPurchases(),
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
          <button onClick={signOut} className="text-sm text-white/50 hover:text-white transition-colors">
            Sign out
          </button>
        </div>

        <div className="mt-8 flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <Dumbbell className="w-4 h-4" />
          </span>
          IndianDietDoc
        </div>

        <h1 className="mt-6 text-3xl md:text-4xl font-bold">My purchases</h1>
        <p className="mt-2 text-white/50">Your recipe books, guides and coaching programs.</p>

        <div className="mt-10 space-y-4">
          {isLoading && (
            <div className="flex items-center gap-3 text-white/50 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading your orders…
            </div>
          )}

          {!isLoading && (!data || data.length === 0) && (
            <div className="rounded-3xl border border-white/10 bg-card p-10 text-center">
              <ShoppingBag className="w-8 h-8 mx-auto text-primary" />
              <p className="mt-4 text-white/60">You haven't bought anything yet.</p>
              <Button variant="hero" className="mt-6" onClick={() => navigate({ to: "/" })}>
                Browse the store
              </Button>
            </div>
          )}

          {data?.map(order => (
            <div
              key={order.id}
              className="rounded-2xl border border-white/10 bg-card p-6 flex items-center justify-between gap-6 flex-wrap transition-colors hover:border-primary/40"
            >
              <div>
                <h2 className="font-semibold">{order.products?.name ?? "Product"}</h2>
                <p className="text-sm text-white/50 mt-1">
                  ₹{(order.amount_paise / 100).toLocaleString("en-IN")} ·{" "}
                  {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${
                    order.status === "paid"
                      ? "border-primary/50 text-primary"
                      : "border-white/15 text-white/50"
                  }`}
                >
                  {order.status}
                </span>
                {order.products?.download_url && (
                  <Button size="sm" asChild>
                    <a href={order.products.download_url} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}