import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth_/callback")({
  validateSearch: z.object({ next: z.string().optional() }),
  ssr: false,
  head: () => ({
    meta: [
      { title: "Signing you in — IndianDietDoc" },
      { name: "description", content: "Completing your secure sign-in to IndianDietDoc." },
      { property: "og:title", content: "Signing you in — IndianDietDoc" },
      { property: "og:description", content: "Completing your secure sign-in to IndianDietDoc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Callback,
});

function Callback() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const target = next && next.startsWith("/") && !next.startsWith("//") ? next : "/purchases";
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      navigate({ to: target });
    };
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) go();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) go();
    });
    const t = setTimeout(() => navigate({ to: "/auth" }), 8000);
    return () => {
      clearTimeout(t);
      sub.subscription.unsubscribe();
    };
  }, [next, navigate]);

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <p className="text-sm text-white/50">Signing you in…</p>
    </main>
  );
}
