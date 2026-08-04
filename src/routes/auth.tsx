import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dumbbell, ArrowLeft } from "lucide-react";

const searchSchema = z.object({ next: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign In — IndianDietDoc | Coach Plawan Hota" },
      { name: "description", content: "Sign in or create your IndianDietDoc account to buy recipe books, join coaching programs and access your purchases." },
      { property: "og:title", content: "Sign In — IndianDietDoc" },
      { property: "og:description", content: "Access your IndianDietDoc account, purchases and coaching programs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function safePath(next?: string) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/purchases";
  return next;
}

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${safePath(next)}`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Check your email to confirm your account.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: safePath(next) });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    const { lovable } = await import("@/integrations/lovable/index");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safePath(next))}`,
    });
    if (result.error) {
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: safePath(next) });
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-card p-8">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Dumbbell className="w-4 h-4" />
            </span>
            IndianDietDoc
          </div>

          <h1 className="mt-6 text-2xl font-bold">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-white/50">
            {mode === "signin"
              ? "Sign in to access your purchases and programs."
              : "Sign up to buy recipe books and join coaching programs."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <Input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
            )}
            <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4 text-xs text-white/30">
            <div className="h-px flex-1 bg-white/10" /> OR <div className="h-px flex-1 bg-white/10" />
          </div>

          <Button variant="outline" size="lg" className="w-full" onClick={google}>
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-white/50">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}