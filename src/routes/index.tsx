import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Dumbbell, Salad, Scale, Heart, Activity, User, Users, Award, Clock, Star,
  ArrowRight, Check, Play, MessageCircle, Mail, Phone, MapPin, Menu, X,
  ChevronDown, Zap, Target, TrendingUp, Shield, Calendar, BookOpen, Download,
  Instagram, Youtube, Facebook, Twitter,Sparkles, HeartPulse, Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutDialog, requestCheckout } from "@/components/checkout-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import coachHero from "@/assets/coach-hero.jpg";
import heroVideoAsset from "@/assets/plawan-hero.mp4.asset.json";
import heroPosterAsset from "@/assets/plawan-hero-poster.jpg.asset.json";
const heroVideo = heroVideoAsset.url;
const heroPoster = heroPosterAsset.url;
import gymBg from "@/assets/gym-bg.jpg";
import nutritionImg from "@/assets/nutrition.jpg";
import transform1 from "@/assets/transform-1.jpg";
import transform2 from "@/assets/transform-2.jpg";
import transform3 from "@/assets/transform-3.jpg";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";
import c1Before from "@/assets/client-1-before.jpg";
import c1After from "@/assets/client-1-after.jpg";
import c2Before from "@/assets/client-2-before.jpg";
import c2After from "@/assets/client-2-after.jpg";
import c3Before from "@/assets/client-3-before.jpg";
import c3After from "@/assets/client-3-after.jpg";
import c4Before from "@/assets/client-4-before.jpg";
import c4After from "@/assets/client-4-after.jpg";
import c5Before from "@/assets/client-5-before.jpg";
import c5After from "@/assets/client-5-after.jpg";
import c6Before from "@/assets/client-6-before.jpg";
import c6After from "@/assets/client-6-after.jpg";
import c7Before from "@/assets/client-7-before.jpg";
import c7After from "@/assets/client-7-after.jpg";
import c8Before from "@/assets/client-8-before.jpg";
import c8After from "@/assets/client-8-after.jpg";
import c9Before from "@/assets/client-9-before.jpg";
import c9After from "@/assets/client-9-after.jpg";
import c10Before from "@/assets/client-10-before.jpg";
import c10After from "@/assets/client-10-after.jpg";
import c11Before from "@/assets/client-11-before.jpg";
import c11After from "@/assets/client-11-after.jpg";
import c12Before from "@/assets/client-12-before.jpg";
import c12After from "@/assets/client-12-after.jpg";

import certNasmAsset from "@/assets/cert-nasm.jpg.asset.json";
import certCptAsset from "@/assets/cert-cpt.jpg.asset.json";
import certMptAsset from "@/assets/cert-mpt.jpg.asset.json";
import certWomenAsset from "@/assets/cert-women.jpg.asset.json";
import certObesityAsset from "@/assets/cert-obesity.jpg.asset.json";
import certAceAsset from "@/assets/cert-ace.jpg.asset.json";

const certNasm = certNasmAsset.url;
const certCpt = certCptAsset.url;
const certMpt = certMptAsset.url;
const certWomen = certWomenAsset.url;
const certObesity = certObesityAsset.url;
const certAce = certAceAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "/og-image.jpg" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "IndianDietDoc — Coach Plawan Hota",
          description: "Premium online fitness coaching, personalized Indian diet plans and lifestyle transformation.",
          areaServed: "IN",
          priceRange: "₹₹",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500" },
        },
      },
    ],
  }),
  component: Home,
});
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
} as const;
function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Transformations2 />
      <About2 />
      <WhyChoose />
      <Certifications />
      <Services />
      <Programs />
      <Store />
      <VideoGallery />
      <DietPlan />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />

      <Footer />
      <FloatingButtons />
      <CheckoutDialog />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    ["About", "#about"], ["Services", "#services"], ["Programs", "#programs"],
    ["Certifications", "#certifications"], ["Transformations", "#transformations"], ["Videos", "#videos"], ["Shop", "#store"], ["Contact", "#contact"],
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong py-3" : "py-6 bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <Dumbbell className="w-4 h-4" />
          </span>
          <span>indiandietdoc</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="text-sm text-white/70 hover:text-primary transition-colors">{l}</a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href="/purchases" className="text-sm text-white/70 hover:text-primary transition-colors">My Purchases</a>
          <Button variant="outline" size="sm" asChild><a href="#contact">Book Consultation</a></Button>
          <Button size="sm" asChild><a href="#programs">Start Now</a></Button>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden glass-strong border-t border-white/5 mt-3">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setOpen(false)} className="text-white/70 hover:text-primary">{l}</a>
            ))}
            <a href="/purchases" onClick={() => setOpen(false)} className="text-white/70 hover:text-primary">My Purchases</a>
            <Button size="sm" asChild><a href="#programs" onClick={() => setOpen(false)}>Start Now</a></Button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 z-0">
        <img src={gymBg} alt="" className="hero-bg-img w-full h-full object-cover opacity-40" width={1920} height={1080} />
        <div className="absolute inset-0 hero-fade-b" />
        <div className="absolute inset-0 hero-fade-r" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-white/80">Now accepting new clients</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Transform Your Body.
            <br />
            <span className="text-gradient-green">Transform Your Life.</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
            Science-based fitness coaching, personalized nutrition, sustainable fat loss,
            muscle building, and lifestyle transformation with Coach Plawan Hota.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="#programs">Start Your Transformation <ArrowRight className="w-4 h-4" /></a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#contact">Book Free Consultation</a>
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl">
            {[
              ["1000+", "Clients"],
              ["500+", "Transformations"],
              ["10+", "Years Exp"],
              ["4.9★", "Rating"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl md:text-3xl font-bold text-primary">{v}</div>
                <div className="text-xs uppercase tracking-widest text-white/50 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-scale-in hidden lg:block">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="media-dark relative rounded-3xl overflow-hidden border border-white/10 aspect-[3/4] max-w-md mx-auto">
            <video
              src={heroVideo}
              poster={heroPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Coach Plawan Hota training"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass-strong rounded-2xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Coach Plawan Hota</div>
                  <div className="text-xs text-white/60">Certified Nutrition & Fitness Coach</div>
                </div>
              </div>
            </div>
          </div>

          {/* floating stat pills */}
          <div className="absolute -left-4 top-1/4 glass-strong rounded-2xl p-4 hidden xl:block animate-fade-up">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <div className="text-lg font-bold">1000+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50">Clients</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 bottom-1/4 glass-strong rounded-2xl p-4 hidden xl:block animate-fade-up">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <div className="text-lg font-bold">500+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50">Transforms</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = ["Fat Loss", "Muscle Building", "Diabetes Care", "PCOS Coaching", "Senior Fitness", "Meal Plans", "Online Coaching", "Recipe Books"];
  return (
    <section className="border-y border-white/5 py-6 overflow-hidden bg-surface">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-16 shrink-0">
            <span className="text-2xl font-display font-semibold text-white/40">{it}</span>
            <span className="w-2 h-2 rounded-full bg-primary" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="rounded-3xl overflow-hidden border border-white/10">
            <img src={coachHero} alt="Coach Plawan Hota" className="w-full aspect-[4/5] object-cover" loading="lazy" width={1200} height={1600} />
          </div>
          <div className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-6 max-w-xs hidden md:block">
            <div className="text-4xl font-bold text-primary">10+</div>
            <div className="text-sm text-white/60 mt-1">Years transforming lives through fitness & nutrition</div>
          </div>
        </div>

        <div>
          <SectionLabel>About the Coach</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
            Meet <span className="text-gradient-green">Plawan Hota</span> — your partner in transformation.
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed">
            A certified fitness coach, nutritionist, and lifestyle expert with over a decade of experience
            helping men and women across India build stronger, healthier, and more confident versions of themselves.
          </p>

          <div className="mt-8 space-y-4">
            {[
              ["Mission", "Deliver science-backed coaching that fits your lifestyle, culture, and goals."],
              ["Vision", "Make world-class fitness and nutrition accessible to every Indian household."],
              ["Values", "Honesty, sustainability, personalization, and long-term results — never quick fixes."],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-white/60 mt-1">{d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {["ISSA Certified", "Precision Nutrition L1", "ACE Certified", "PCOS Specialist"].map(c => (
              <span key={c} className="text-xs px-3 py-1.5 rounded-full glass border border-primary/20 text-primary">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- about -------------------------- */
function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(eyebrow || title || subtitle) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-3xl mb-16"
          >
            {eyebrow && (
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary mb-5">
                <span className="h-px w-8 bg-primary" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-4xl md:text-6xl font-bold text-gradient leading-[1.05]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
function About2() {
  return (
    <Section id="about" eyebrow="About" className="border-t border-border">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden border border-border">
            <img
              src={coachHero}
              alt="Head coach"
              width={1000}
              height={1200}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 max-w-[220px]">
            <div className="text-xs uppercase tracking-widest text-primary">Certified</div>
            <div className="mt-1 text-sm text-foreground">
              ISSA · NASM · Precision Nutrition L2
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gradient">
            A decade of turning bodies — and lives — around.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            I'm <span className="text-foreground font-semibold">Plawan Hota</span>, a certified fitness coach and nutrition specialist obsessed with one thing:
            sustainable transformation. No fad diets. No crash workouts. Just a personalized,
            science-backed system that fits your life — and finally works.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {[
              { icon: Sparkles, title: "Mission", body: "Make elite coaching accessible to anyone serious about change." },
              { icon: HeartPulse, title: "Vision", body: "A world where fitness is a lifestyle, not a punishment." },
              { icon: Trophy, title: "Experience", body: "10+ years, 1000+ clients across 20+ countries." },
              { icon: Users, title: "Values", body: "Honesty, science, empathy, and relentless follow-through." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-5">
                <v.icon className="h-5 w-5 text-primary" />
                <div className="mt-3 font-semibold">{v.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{v.body}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services() {
  const services = [
    { icon: User, title: "Online Transformation Coaching", desc: "1-on-1 personalized coaching with weekly check-ins and full accountability." },
    { icon: Salad, title: "Personalized Diet Plans", desc: "Indian meal plans built around your lifestyle, culture, and goals." },
    { icon: Scale, title: "Weight Loss Programs", desc: "Sustainable fat loss without extreme restriction or crash diets." },
    { icon: Dumbbell, title: "Muscle Building", desc: "Science-based hypertrophy programs for strength and definition." },
    { icon: Activity, title: "Diabetes Lifestyle Management", desc: "Habit-based coaching to support healthy blood sugar management.", note: "Supports healthy lifestyle habits; not a substitute for medical treatment." },
    { icon: Heart, title: "PCOS Lifestyle Coaching", desc: "Nutrition and training strategies designed for hormonal balance." },
    { icon: Shield, title: "Fatty Liver Lifestyle Coaching", desc: "Structured plans to support liver health and long-term recovery." },
    { icon: Users, title: "Senior Fitness", desc: "Safe, guided training and nutrition programs for 50+ clients." },
  ];
  return (
    <section id="services" className="py-32 bg-surface relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel>What I Offer</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
            Coaching that adapts to <span className="text-gradient-green">your life</span>.
          </h2>
          <p className="mt-4 text-white/60">Every program is tailored to your body, goals, and daily rhythm — no cookie-cutter templates.</p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(s => (
            <div key={s.title} className="group relative rounded-3xl border border-white/8 bg-card p-8 hover-lift hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <s.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="mt-6 font-semibold text-lg">{s.title}</h3>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">{s.desc}</p>
              {s.note && <p className="mt-3 text-[10px] text-white/40 italic border-t border-white/5 pt-3">{s.note}</p>}
              <div className="mt-6 inline-flex items-center gap-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY CHOOSE ---------------- */
function WhyChoose() {
  const steps = [
    { icon: Target, title: "Personalized Coaching", desc: "Every plan is built around your body, goals, medical history and daily schedule." },
    { icon: Salad, title: "Science-backed Nutrition", desc: "Real macros, real meals — no fad diets or juice cleanses." },
    { icon: TrendingUp, title: "Weekly Progress Tracking", desc: "Detailed check-ins, measurements and adjustments every single week." },
    { icon: MessageCircle, title: "Daily Support", desc: "WhatsApp access for questions, form checks, and accountability." },
    { icon: Zap, title: "Long-term Sustainability", desc: "Habits that last a lifetime, not just 12 weeks." },
  ];
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel>Why Choose Me</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
            A different kind of coaching <span className="text-gradient-green">experience</span>.
          </h2>
        </div>

        <div className="mt-20 relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          <div className="space-y-16">
            {steps.map((s, i) => (
              <div key={s.title} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className={`${i % 2 === 1 ? "md:order-2 md:text-left" : "md:text-right"} pl-20 md:pl-0`}>
                  <div className="text-6xl font-display font-bold text-white/5">0{i + 1}</div>
                  <h3 className="text-2xl font-bold mt-2">{s.title}</h3>
                  <p className="mt-3 text-white/60 max-w-md md:ml-auto">{s.desc}</p>
                </div>
                <div className={`relative ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center border-4 border-background animate-pulse-glow">
                    <s.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROGRAMS / PRICING ---------------- */
function Programs() {
  const plans = [
    { slug: "program-basic", name: "Basic", price: "4,999", period: "/month", desc: "Perfect starting point.", features: ["Personalized diet plan", "Basic workout plan", "Bi-weekly check-ins", "Email support", "Recipe book access"], featured: false },
    { slug: "program-premium", name: "Premium", price: "8,999", period: "/month", desc: "Most popular choice.", features: ["Fully custom diet & training", "Weekly 1-on-1 video calls", "WhatsApp daily support", "Weekly plan adjustments", "All recipe books included", "Supplement guidance"], featured: true },
    { slug: "program-elite", name: "Elite", price: "14,999", period: "/month", desc: "Total transformation.", features: ["Everything in Premium", "24/7 priority WhatsApp", "Daily meal photo reviews", "Custom video workouts", "Body composition tracking", "Lifestyle & mindset coaching"], featured: false },
  ];
  return (
    <section id="programs" className="py-32 bg-surface relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel>Transformation Programs</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            Choose the program that <span className="text-gradient-green">fits your goals</span>.
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div key={p.name} className={`relative rounded-3xl border p-8 flex flex-col ${p.featured ? "border-primary/50 bg-gradient-to-b from-primary/10 to-transparent glow-green" : "border-white/8 bg-card"}`}>
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold">{p.name}</h3>
              <p className="text-white/50 text-sm mt-1">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-sm text-white/50">₹</span>
                <span className="text-5xl font-bold">{p.price}</span>
                <span className="text-white/50 text-sm">{p.period}</span>
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={p.featured ? "hero" : "outline"} size="lg" className="mt-8 w-full" onClick={() => requestCheckout(p.slug, p.name)}>Join Now</Button>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-xs text-white/40">All programs include a satisfaction guarantee. Cancel anytime.</p>
      </div>
    </section>
  );
}

/* ---------------- TRANSFORMATIONS ---------------- */
function Transformations() {
  const items = [
    {
      img: transform1,
      name: "Rahul S.",
      metric: "26",
      unit: "kg",
      label: "Weight lost",
      quote: "From 118 kg to 92 kg and 15% body fat — Coach Plawan gave me my life back.",
      points: "20,50 90,95 160,150 230,200 300,240",
      labels: [
        { x: 20, y: 268, text: "118 kg", anchor: "start" },
        { x: 160, y: 268, text: "100 kg", anchor: "middle" },
        { x: 300, y: 268, text: "92 kg", anchor: "end" },
      ],
    },
    {
      img: transform2,
      name: "Priya K.",
      metric: "85",
      unit: "mg/dL",
      label: "Diabetes reversed",
      quote: "Reversed pre-diabetes, lost 18 kg and gained energy — thanks to Coach Plawan.",
      points: "20,60 90,85 160,140 230,190 300,235",
      labels: [
        { x: 20, y: 268, text: "180", anchor: "start" },
        { x: 160, y: 268, text: "120", anchor: "middle" },
        { x: 300, y: 268, text: "85", anchor: "end" },
      ],
    },
    {
      img: transform3,
      name: "Vikram R.",
      metric: "26",
      unit: "kg",
      label: "Life-changing at 52",
      quote: "At 52, I feel stronger than I did at 32. Sustainable results, every week.",
      points: "20,55 90,110 160,155 230,210 300,245",
      labels: [
        { x: 20, y: 268, text: "108 kg", anchor: "start" },
        { x: 160, y: 268, text: "94 kg", anchor: "middle" },
        { x: 300, y: 268, text: "82 kg", anchor: "end" },
      ],
    },
  ];
  return (
    <section id="transformations" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <SectionLabel>Real Results</SectionLabel>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
              Client <span className="text-gradient-green">Transformations</span>.
            </h2>
            <p className="mt-4 text-white/60 max-w-xl">Hover a story to watch the transformation unfold.</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary">500+</div>
            <div className="text-sm text-white/50">Documented transformations</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div
              key={t.name}
              className="group relative rounded-3xl overflow-hidden border border-white/8 bg-card aspect-[3/4] cursor-pointer transition-transform duration-500 hover:-translate-y-1"
            >
              <img
                src={t.img}
                alt={`${t.name} transformation`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-110 group-hover:blur-md group-hover:opacity-30"
                loading="lazy"
                width={1200}
                height={1600}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/85 opacity-70 group-hover:opacity-95 transition-opacity duration-700" />

              <div className="absolute top-6 left-6 right-6 z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tight">{t.metric}</span>
                  <span className="text-sm text-white/70">{t.unit}</span>
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60 flex items-center gap-1.5">
                  {t.label}
                  <TrendingUp className="w-3 h-3" />
                </div>
              </div>

              <svg
                viewBox="0 0 320 280"
                preserveAspectRatio="none"
                className="absolute left-4 right-4 top-[30%] h-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 pointer-events-none"
                aria-hidden
              >
                <line x1="20" y1="255" x2="300" y2="255" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <polyline
                  points={t.points}
                  fill="none"
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="[stroke-dasharray:800] [stroke-dashoffset:800] group-hover:[stroke-dashoffset:0] [transition:stroke-dashoffset_1.8s_cubic-bezier(0.16,1,0.3,1)_250ms]"
                />
                {t.points.split(" ").map((pt, i, arr) => {
                  const [x, y] = pt.split(",");
                  const delay = 0.25 + (i / (arr.length - 1)) * 1.55;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="white"
                      className="opacity-0 group-hover:opacity-100"
                      style={{ transition: `opacity 0.3s ease ${delay}s` }}
                    />
                  );
                })}
                {t.labels.map((l, i) => (
                  <text
                    key={i}
                    x={l.x}
                    y={l.y}
                    fill="rgba(255,255,255,0.55)"
                    fontSize="11"
                    textAnchor={l.anchor as "start" | "middle" | "end"}
                    className="opacity-0 group-hover:opacity-100"
                    style={{ transition: "opacity 0.4s ease 1.6s" }}
                  >
                    {l.text}
                  </text>
                ))}
              </svg>

              <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                <p className="text-sm md:text-[15px] leading-relaxed text-white/95 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {t.quote}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-white/60">— {t.name}</div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- transformations -------------------------- */

type Point = { x: number; y: number; label: string };
type TCard = {
  initials: string;
  name: string;
  category: string;
  before: string;
  after: string;
  duration: string;
  metric: string;
  unit: string;
  metricLabel: string;
  caption: string;
  points: Point[]; // 3 points, x/y in 0-100 within chart box
};

const transformations: TCard[] = [
  {
    initials: "RM",
    name: "Rohit M.",
    category: "Fat Loss",
    before: c1Before,
    after: c1After,
    duration: "7 months",
    metric: "26",
    unit: "kg",
    metricLabel: "Weight lost",
    caption: "From 118 kg to 92 kg and 15% body fat — coaching gave me my life back.",
    points: [
      { x: 12, y: 20, label: "118 kg" },
      { x: 50, y: 55, label: "100 kg" },
      { x: 88, y: 85, label: "92 kg" },
    ],
  },
  {
    initials: "PS",
    name: "Priya S.",
    category: "Female Fat Loss",
    before: c2Before,
    after: c2After,
    duration: "9 months",
    metric: "18",
    unit: "kg",
    metricLabel: "Weight lost",
    caption: "PCOS under control, 18 kg down and finally energetic all day.",
    points: [
      { x: 12, y: 18, label: "78 kg" },
      { x: 50, y: 52, label: "68 kg" },
      { x: 88, y: 84, label: "60 kg" },
    ],
  },
  {
    initials: "AK",
    name: "Ankit K.",
    category: "Body Recomposition",
    before: c3Before,
    after: c3After,
    duration: "11 months",
    metric: "24",
    unit: "kg",
    metricLabel: "Weight lost",
    caption: "I reversed pre-diabetes, lost 24 kg and built real strength with Plawan.",
    points: [
      { x: 12, y: 22, label: "98 kg" },
      { x: 50, y: 58, label: "85 kg" },
      { x: 88, y: 88, label: "74 kg" },
    ],
  },
  {
    initials: "SD",
    name: "Sanjay D.",
    category: "Teen Fat Loss",
    before: c4Before,
    after: c4After,
    duration: "8 months",
    metric: "31",
    unit: "kg",
    metricLabel: "Weight lost",
    caption: "From bullied at school to the fittest in class — 31 kg gone for good.",
    points: [
      { x: 12, y: 16, label: "104 kg" },
      { x: 50, y: 50, label: "88 kg" },
      { x: 88, y: 86, label: "73 kg" },
    ],
  },
  {
    initials: "SK",
    name: "Sadiq K.",
    category: "Muscle Gain",
    before: c5Before,
    after: c5After,
    duration: "10 months",
    metric: "12",
    unit: "kg",
    metricLabel: "Lean mass gained",
    caption: "Coach, excited to work for the next target — 12 kg of lean muscle added.",
    points: [
      { x: 12, y: 82, label: "62 kg" },
      { x: 50, y: 50, label: "68 kg" },
      { x: 88, y: 18, label: "74 kg" },
    ],
  },
  {
    initials: "BP",
    name: "Bikash P.",
    category: "Strength & Size",
    before: c6Before,
    after: c6After,
    duration: "12 months",
    metric: "14",
    unit: "kg",
    metricLabel: "Lean mass gained",
    caption: "No excuses — one year of training and I finally look and lift like an athlete.",
    points: [
      { x: 12, y: 84, label: "66 kg" },
      { x: 50, y: 48, label: "74 kg" },
      { x: 88, y: 16, label: "80 kg" },
    ],
  },
  {
    initials: "MR",
    name: "Manoj R.",
    category: "Body Recomposition",
    before: c7Before,
    after: c7After,
    duration: "3 months",
    metric: "9",
    unit: "kg",
    metricLabel: "Lean mass gained",
    caption: "July to September — from skinny to visible abs with a proper Indian diet plan.",
    points: [
      { x: 12, y: 80, label: "56 kg" },
      { x: 50, y: 46, label: "61 kg" },
      { x: 88, y: 18, label: "65 kg" },
    ],
  },
  {
    initials: "AS",
    name: "Abhijit S.",
    category: "Fat Loss",
    before: c8Before,
    after: c8After,
    duration: "6 months",
    metric: "16",
    unit: "kg",
    metricLabel: "Weight lost",
    caption: "Lost the belly, kept the strength — the plan fit my job and my family food.",
    points: [
      { x: 12, y: 20, label: "94 kg" },
      { x: 50, y: 54, label: "85 kg" },
      { x: 88, y: 86, label: "78 kg" },
    ],
  },
  {
    initials: "VT",
    name: "Vikram T.",
    category: "Contest Prep",
    before: c9Before,
    after: c9After,
    duration: "5 months",
    metric: "11",
    unit: "%",
    metricLabel: "Body fat dropped",
    caption: "Stage-ready conditioning without crash dieting — full veins, full strength.",
    points: [
      { x: 12, y: 22, label: "20% BF" },
      { x: 50, y: 56, label: "14% BF" },
      { x: 88, y: 88, label: "9% BF" },
    ],
  },
  {
    initials: "SM",
    name: "Swagatika M.",
    category: "Female Fat Loss",
    before: c10Before,
    after: c10After,
    duration: "8 months",
    metric: "21",
    unit: "kg",
    metricLabel: "Weight lost",
    caption: "Thank you sir — your guidance helped a lot in the journey.",
    points: [
      { x: 12, y: 18, label: "82 kg" },
      { x: 50, y: 52, label: "71 kg" },
      { x: 88, y: 85, label: "61 kg" },
    ],
  },
  {
    initials: "AM",
    name: "Ashok M.",
    category: "Fat Loss Over 40",
    before: c11Before,
    after: c11After,
    duration: "7 months",
    metric: "15",
    unit: "kg",
    metricLabel: "Weight lost",
    caption: "At 40+ I got the leanest I have ever been — abs for the first time in my life.",
    points: [
      { x: 12, y: 20, label: "84 kg" },
      { x: 50, y: 55, label: "76 kg" },
      { x: 88, y: 87, label: "69 kg" },
    ],
  },
  {
    initials: "SP",
    name: "Sunita P.",
    category: "Women's Weight Loss",
    before: c12Before,
    after: c12After,
    duration: "8 months",
    metric: "23",
    unit: "kg",
    metricLabel: "Weight lost",
    caption: "I feel confident in every outfit again — and my energy through the day is completely different.",
    points: [
      { x: 12, y: 16, label: "88 kg" },
      { x: 50, y: 54, label: "76 kg" },
      { x: 88, y: 88, label: "65 kg" },
    ],
  },
];


function TransformationCard({ t }: { t: TCard }) {
  const [hover, setHover] = useState(false);
  const pathD = `M ${t.points[0].x} ${t.points[0].y} L ${t.points[1].x} ${t.points[1].y} L ${t.points[2].x} ${t.points[2].y}`;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="media-dark group relative rounded-2xl overflow-hidden aspect-[3/4] border border-border cursor-pointer bg-black"
    >
      {/* before / after split */}
      <div className="absolute inset-0 flex">
        <div className="relative w-1/2 overflow-hidden">
          <img
            src={t.before}
            alt={`${t.name} before transformation`}
            className="absolute inset-0 w-full h-full object-cover object-top grayscale transition-all duration-[900ms] ease-out group-hover:scale-105 group-hover:blur-sm group-hover:opacity-20"
            loading="lazy"
            width={900}
            height={1200}
          />
          <span
            className={`absolute bottom-24 left-2 z-10 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[10px] tracking-[0.2em] text-white/70 transition-opacity duration-500 ${hover ? "opacity-0" : "opacity-100"}`}
          >
            BEFORE
          </span>
        </div>
        <div className="relative w-1/2 overflow-hidden">
          <img
            src={t.after}
            alt={`${t.name} after transformation`}
            className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-[900ms] ease-out group-hover:scale-105 group-hover:blur-sm group-hover:opacity-20"
            loading="lazy"
            width={900}
            height={1200}
          />
          <span
            className={`absolute bottom-24 right-2 z-10 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] tracking-[0.2em] text-primary-foreground transition-opacity duration-500 ${hover ? "opacity-0" : "opacity-100"}`}
          >
            AFTER
          </span>
        </div>
        {/* divider */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/40 transition-opacity duration-500 ${hover ? "opacity-0" : "opacity-100"}`}
        />
      </div>

      {/* top-left metric */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold text-white leading-none">{t.metric}</span>
          <span className="text-sm text-white/80">{t.unit}</span>
        </div>
        <div className="mt-1 text-xs text-white/70 flex items-center gap-1">
          {t.metricLabel}
          <span className="inline-block">↘</span>
        </div>
      </div>

      {/* top-right category */}
      <div className="absolute top-4 right-4 z-10 text-right">
        <div className="text-[10px] uppercase tracking-[0.18em] text-primary">{t.category}</div>
        <div className="text-[11px] text-white/60">{t.duration}</div>
      </div>

      {/* graph overlay */}
      <div
        className={`absolute inset-x-6 top-16 bottom-28 transition-all duration-500 ${
          hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <path
            d={pathD}
            fill="none"
            stroke="white"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 300,
              strokeDashoffset: hover ? 0 : 300,
              transition: "stroke-dashoffset 900ms ease-out",
            }}
          />
          {t.points.map((p, idx) => (
            <line
              key={`v-${idx}`}
              x1={p.x}
              x2={p.x}
              y1={p.y}
              y2={100}
              stroke="white"
              strokeWidth="0.3"
              strokeDasharray="1 1.5"
              style={{
                opacity: hover ? 0.5 : 0,
                transition: `opacity 300ms ease ${500 + idx * 200}ms`,
              }}
            />
          ))}
          {t.points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r="1.6"
              fill="white"
              style={{
                opacity: hover ? 1 : 0,
                transition: `opacity 300ms ease ${400 + idx * 200}ms`,
              }}
            />
          ))}
        </svg>
        {/* x-axis labels */}
        <div
          className={`absolute -bottom-6 inset-x-0 flex justify-between text-[11px] text-white/70 transition-opacity duration-500 delay-500 ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          {t.points.map((p) => (
            <span key={p.label}>{p.label}</span>
          ))}
        </div>
      </div>

      {/* caption */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-center bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
        <div className="text-xs uppercase tracking-[0.18em] text-white/50 mb-1">{t.name}</div>
        <div className="text-sm text-white/90">{t.caption}</div>
      </div>
    </div>
  );
}

function Transformations2() {
  return (
    <Section
      id="transformations"
      eyebrow="Transformations"
      title={<>Real people. <span className="text-primary">Real results.</span></>}
      className="bg-background border-y border-border"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {transformations.map((t) => (
          <TransformationCard key={t.initials} t={t} />
        ))}
      </div>
    </Section>
  );
}
/* ---------------- VIDEO GALLERY ---------------- */
const featuredVideo = {
  id: "alXY-j4zq_U",
  title: "The REAL Problem With Gym Culture No One Talks About!",
  category: "Motivation",
  description: "Coach Plawan exposes the hidden truth behind modern gym culture — why most people stay stuck, and the mindset shift that actually creates lasting transformation.",
};

const videoThumbs = [
  { id: "alXY-j4zq_U", title: "The #1 mistake that stops your fat loss", category: "Fat Loss", img: nutritionImg },
  { id: "alXY-j4zq_U", title: "How to eat rice and still lose weight", category: "Nutrition", img: gymBg },
  { id: "alXY-j4zq_U", title: "3 exercises for a stronger core", category: "Workout", img: nutritionImg },
  { id: "alXY-j4zq_U", title: "Protein myths Indians believe", category: "Nutrition", img: gymBg },
  { id: "alXY-j4zq_U", title: "Staying consistent with your diet", category: "Motivation", img: nutritionImg },
  { id: "alXY-j4zq_U", title: "Beginner home workout routine", category: "Workout", img: gymBg },
];

function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="media-dark relative w-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-primary/10 aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

function VideoGallery() {
  const cats = ["All", "Nutrition", "Workout", "Fat Loss", "Motivation"];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? videoThumbs : videoThumbs.filter(v => v.category === active);

  return (
    <section id="videos" className="py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <SectionLabel>Video Library</SectionLabel>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Learn from <span className="text-gradient-green">the coach</span>.</h2>
            <p className="mt-4 text-white/60">Watch free, actionable advice from Coach Plawan. No fluff — just proven strategies that work for Indian lifestyles.</p>
          </div>
          <Button variant="outline" asChild>
            <a href="https://www.youtube.com/@indiandietdoc" target="_blank" rel="noreferrer">Visit YouTube Channel <ArrowRight className="w-4 h-4" /></a>
          </Button>
        </motion.div>

        {/* Featured video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <VideoEmbed videoId={featuredVideo.id} title={featuredVideo.title} />
            </div>
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/20 text-primary text-xs uppercase tracking-widest mb-4">
                <Play className="w-3 h-3 fill-current" /> Featured
              </div>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">{featuredVideo.title}</h3>
              <p className="mt-4 text-white/60 leading-relaxed">{featuredVideo.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={`https://www.youtube.com/watch?v=${featuredVideo.id}`} target="_blank" rel="noreferrer">Watch on YouTube <Youtube className="w-4 h-4" /></a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#contact">Start Coaching</a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm transition-all ${active === c ? "bg-primary text-primary-foreground" : "glass text-white/70 hover:text-white"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v, i) => (
            <motion.a
              key={`${v.id}-${i}`}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl overflow-hidden border border-white/8 aspect-video bg-card cursor-pointer hover-lift block"
            >
              <img src={v.img} alt={v.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" loading="lazy" width={1200} height={900} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 text-primary-foreground fill-current" />
                </div>
              </div>
              <div className="media-dark absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/70 to-transparent">
                <div className="text-xs text-primary uppercase tracking-widest">{v.category}</div>
                <div className="font-semibold mt-1 line-clamp-2">{v.title}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- STORE ---------------- */
function Store() {
  const books = [
    { slug: "healthy-recipe-book", img: book1, title: "Healthy Recipe Book", desc: "80+ everyday Indian recipes for fat loss.", price: "499" },
    { slug: "high-protein-recipes", img: book2, title: "High Protein Recipes", desc: "Vegetarian & non-veg high-protein Indian meals.", price: "599" },
    { slug: "indian-meal-prep-guide", img: book3, title: "Indian Meal Prep Guide", desc: "Weekly meal prep made simple for Indian kitchens.", price: "699" },
    { slug: "diabetic-friendly-recipes", img: book1, title: "Diabetic Friendly Recipes", desc: "Low-GI Indian recipes for blood sugar balance.", price: "799" },
  ];
  return (
    <section id="store" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <SectionLabel>Digital Store</SectionLabel>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Recipe books & <span className="text-gradient-green">guides</span>.</h2>
            <p className="mt-3 text-white/60">Instant digital download. Delivered to your inbox.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map(b => (
            <div key={b.title} className="group rounded-3xl border border-white/8 bg-card overflow-hidden hover-lift">
              <div className="media-dark relative aspect-[4/5] overflow-hidden bg-black">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" width={800} height={1000} />
              </div>
              <div className="p-6">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-white/50 mt-2 line-clamp-2">{b.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xl font-bold">₹{b.price}</div>
                  <Button size="sm" onClick={() => requestCheckout(b.slug, b.title)}>Buy Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- DIET PLAN CTA ---------------- */
function DietPlan() {
  return (
    <section className="py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="rounded-3xl overflow-hidden border border-white/10 aspect-[4/3]">
          <img src={nutritionImg} alt="Personalized meals" className="w-full h-full object-cover" loading="lazy" width={1200} height={900} />
        </div>
        <div>
          <SectionLabel>Personalized Diet Plan</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
            A plan built for <span className="text-gradient-green">your body</span>, your kitchen.
          </h2>
          <p className="mt-4 text-white/60">Real Indian food. Real macros. Real support.</p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              ["Calorie targets", "Precisely calculated for your goal."],
              ["Macro breakdown", "Protein, carbs & fats optimized."],
              ["Meal timing", "Around your daily schedule."],
              ["Weekly revisions", "Adjustments as you progress."],
            ].map(([t, d]) => (
              <div key={t} className="glass rounded-2xl p-5">
                <div className="font-semibold text-sm">{t}</div>
                <div className="text-xs text-white/50 mt-1">{d}</div>
              </div>
            ))}
          </div>

          <Button variant="hero" size="lg" className="mt-8">Get My Diet Plan <ArrowRight className="w-4 h-4" /></Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const reviews = [
    { name: "Anjali M.", role: "Bengaluru", text: "The most professional coaching I've experienced. Down 15kg and stronger than ever." },
    { name: "Suresh P.", role: "Mumbai", text: "Coach Plawan's approach to Indian nutrition is unmatched. Highly recommended." },
    { name: "Neha D.", role: "Delhi", text: "PCOS coaching genuinely changed my life. Regular cycles, better mood, more energy." },
    { name: "Arjun T.", role: "Hyderabad", text: "Built serious muscle without sacrificing my dal-chawal lifestyle. Brilliant." },
    { name: "Kavita S.", role: "Pune", text: "Warm, structured, and results-driven. My whole family follows his tips now." },
    { name: "Rohan G.", role: "Kolkata", text: "Sustainable habits I actually stuck with. Best investment I've made in myself." },
  ];
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Success Stories</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Loved by <span className="text-gradient-green">1000+ clients</span>.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(r => (
            <div key={r.name} className="rounded-3xl border border-white/8 bg-card p-8 hover:border-primary/30 transition-colors">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed">"{r.text}"</p>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-semibold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-white/50">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BLOG ---------------- */
function Blog() {
  const posts = [
    { cat: "Weight Loss", title: "5 Indian foods that accelerate fat loss", read: "6 min", img: nutritionImg },
    { cat: "Protein Guide", title: "How much protein do vegetarians really need?", read: "8 min", img: gymBg },
    { cat: "Recipes", title: "The perfect high-protein paneer bhurji", read: "4 min", img: nutritionImg },
  ];
  return (
    <section className="py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <SectionLabel>Free Resources</SectionLabel>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Learn. <span className="text-gradient-green">Apply. Grow.</span></h2>
          </div>
          <Button variant="outline">All Articles <ArrowRight className="w-4 h-4" /></Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(p => (
            <article key={p.title} className="group rounded-3xl overflow-hidden border border-white/8 bg-card hover-lift cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" width={1200} height={750} />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span className="text-primary">{p.cat}</span>
                  <span>•</span>
                  <span>{p.read} read</span>
                </div>
                <h3 className="mt-3 font-semibold text-lg leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs = [
    { q: "How does online coaching work?", a: "After a free consultation, you'll receive a fully personalized diet and training plan through the coaching app. We check in weekly and adjust as you progress." },
    { q: "Do I need a gym membership?", a: "No. Programs can be built for home, hotel or gym — whatever fits your lifestyle." },
    { q: "Is the diet plan Indian friendly?", a: "Absolutely. Every plan is built around real Indian food, regional preferences and family meals." },
    { q: "Can you help with medical conditions?", a: "Lifestyle coaching for diabetes, PCOS and fatty liver is available. This supports healthy lifestyle habits and is not a substitute for medical treatment." },
    { q: "What if I don't see results?", a: "We adjust weekly. If you follow the plan and show up, results are inevitable — that's the guarantee." },
    { q: "Which payment methods are accepted?", a: "UPI, credit/debit cards, net banking, Razorpay and Stripe are all supported." },
  ];
  return (
    <section className="py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Questions? <span className="text-gradient-green">Answered</span>.</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-white/8 bg-card px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-white/60 pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  return (
    <section id="contact" className="py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16">
        <div>
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">Let's start your <span className="text-gradient-green">journey</span>.</h2>
          <p className="mt-4 text-white/60">Book a free consultation or reach out directly. Response within 24 hours.</p>

          <div className="mt-10 space-y-4">
            {[
              { icon: MessageCircle, label: "WhatsApp", value: "+91 98000 00000", href: "https://wa.me/919800000000" },
              { icon: Mail, label: "Email", value: "hello@indiandietdoc.com", href: "mailto:hello@indiandietdoc.com" },
              { icon: Phone, label: "Phone", value: "+91 98000 00000", href: "tel:+919800000000" },
              { icon: MapPin, label: "Location", value: "Bhubaneswar, India (Online globally)", href: "#" },
              { icon: Youtube, label: "YouTube", value: "@indiandietdoc", href: "https://www.youtube.com/@indiandietdoc" },
            ].map(c => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-4 p-4 rounded-2xl glass hover:border-primary/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <c.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/40">{c.label}</div>
                  <div className="font-medium mt-0.5">{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form className="rounded-3xl border border-white/8 bg-card p-8" onSubmit={(e) => e.preventDefault()}>
          <h3 className="text-xl font-bold">Book Free Consultation</h3>
          <p className="text-sm text-white/50 mt-2">Fill in your details — we'll get back within 24 hours.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-white/40">Full Name</label>
              <Input placeholder="Your name" className="mt-2 bg-surface border-white/10 h-12" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/40">Email</label>
              <Input type="email" placeholder="you@example.com" className="mt-2 bg-surface border-white/10 h-12" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/40">Phone / WhatsApp</label>
              <Input placeholder="+91" className="mt-2 bg-surface border-white/10 h-12" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/40">Your Goal</label>
              <Textarea placeholder="Tell us about your fitness goal..." className="mt-2 bg-surface border-white/10 min-h-28" />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full">Book Consultation <Calendar className="w-4 h-4" /></Button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="border-t border-white/5 bg-background pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
              <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Dumbbell className="w-4 h-4" />
              </span>
              <span>indiandietdoc</span>
            </a>
            <p className="mt-4 text-white/50 text-sm max-w-sm">
              Premium coaching, personalized Indian nutrition, and lifestyle transformation with Coach Plawan Hota.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Youtube, href: "https://www.youtube.com/@indiandietdoc", label: "YouTube" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Quick Links</div>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {[["About", "#about"], ["Services", "#services"], ["Programs", "#programs"], ["Videos", "#videos"], ["Shop", "#store"], ["Contact", "#contact"]].map(([l, h]) => (
                <li key={l}><a href={h} className="hover:text-primary">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Legal</div>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Refund Policy</a></li>
              <li><a href="#" className="hover:text-primary">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between text-xs text-white/40">
          <div>© {year} indiandietdoc. All rights reserved.</div>
          <div>Coaching by Plawan Hota. Results vary. Not medical advice.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- FLOATING BUTTONS ---------------- */
function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a href="#contact" className="hidden md:flex h-12 px-5 items-center gap-2 rounded-full glass-strong text-sm font-medium hover:border-primary/40 transition-colors">
        <Calendar className="w-4 h-4 text-primary" /> Book Consultation
      </a>
      <a href="https://wa.me/919800000000" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center animate-pulse-glow" aria-label="WhatsApp">
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </a>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="w-8 h-px bg-primary" />
      <span className="text-xs uppercase tracking-[0.25em] text-primary">{children}</span>
    </div>
  );
}

/* ---------------- CERTIFICATIONS ---------------- */
const certifications = [
  { img: certNasm, title: "Physique & Bodybuilding Coach", issuer: "NASM (National Academy of Sports Medicine)", year: "2025" },
  { img: certCpt, title: "Certified Personal Trainer (Level 5)", issuer: "Prehab 121 Academy", year: "2025" },
  { img: certMpt, title: "Master Personal Trainer — Strength & Conditioning", issuer: "Prehab 121 Academy", year: "2025" },
  { img: certWomen, title: "Women's Health Fitness Coach", issuer: "Prehab 121 Academy · ACSM Approved", year: "2025" },
  { img: certObesity, title: "Obesity, Diabetes & Metabolic Training Specialist", issuer: "Prehab 121 Academy · ACSM Approved", year: "2025" },
  { img: certAce, title: "Sport, Exercise & Nutrition — Community Physical Activity Leader", issuer: "ACE (American Council on Exercise)", year: "2025" },
];

function Certifications() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="certifications" className="py-32 bg-surface relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16"
        >
          <SectionLabel>Credentials</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold">
            Certified for <span className="text-gradient-green">authenticity</span>
          </h2>
          <p className="mt-4 text-white/60">
            Every plan is backed by internationally recognised certifications in training,
            metabolic health and nutrition science.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((c, i) => (
            <motion.button
              key={c.title}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group text-left rounded-3xl glass overflow-hidden hover-lift focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              <div className="media-dark relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={c.img} alt={`${c.title} certificate awarded to Plawan Hota by ${c.issuer}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute top-4 left-4 flex items-center gap-1.5 text-[11px] uppercase tracking-widest px-3 py-1 rounded-full glass-strong text-primary">
                  <Shield className="w-3 h-3" /> Verified
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-primary">{String(i + 1).padStart(2, "0")} · {c.year}</div>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{c.title}</h3>
                <p className="mt-2 text-sm text-white/55">{c.issuer}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="media-dark fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-3xl overflow-hidden glass-strong"
            >
              <img src={certifications[active].img} alt={certifications[active].title} className="w-full h-auto" />
              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold">{certifications[active].title}</h3>
                  <p className="text-sm text-white/55">{certifications[active].issuer}</p>
                </div>
                <button onClick={() => setActive(null)} aria-label="Close certificate" className="p-2 rounded-full glass hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
