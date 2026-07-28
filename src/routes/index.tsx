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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import coachHero from "@/assets/coach-hero.jpg";
import gymBg from "@/assets/gym-bg.jpg";
import nutritionImg from "@/assets/nutrition.jpg";
import transform1 from "@/assets/transform-1.jpg";
import transform2 from "@/assets/transform-2.jpg";
import transform3 from "@/assets/transform-3.jpg";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";

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
      <About2 />
      <Services />
      <WhyChoose />
      <Programs />
      <Transformations2 />
      <VideoGallery />
      <Store />
      <DietPlan />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingButtons />
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
    ["Transformations", "#transformations"], ["Shop", "#store"], ["Contact", "#contact"],
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
        <img src={gymBg} alt="" className="w-full h-full object-cover opacity-40" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
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
          <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[3/4] max-w-md mx-auto">
            <img src={coachHero} alt="Coach Plawan Hota" className="w-full h-full object-cover" width={1200} height={1600} />
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
    { name: "Basic", price: "4,999", period: "/month", desc: "Perfect starting point.", features: ["Personalized diet plan", "Basic workout plan", "Bi-weekly check-ins", "Email support", "Recipe book access"], featured: false },
    { name: "Premium", price: "8,999", period: "/month", desc: "Most popular choice.", features: ["Fully custom diet & training", "Weekly 1-on-1 video calls", "WhatsApp daily support", "Weekly plan adjustments", "All recipe books included", "Supplement guidance"], featured: true },
    { name: "Elite", price: "14,999", period: "/month", desc: "Total transformation.", features: ["Everything in Premium", "24/7 priority WhatsApp", "Daily meal photo reviews", "Custom video workouts", "Body composition tracking", "Lifestyle & mindset coaching"], featured: false },
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
              <Button variant={p.featured ? "hero" : "outline"} size="lg" className="mt-8 w-full">Join Now</Button>
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
  img:any;
  gradient: string;
  metric: string;
  unit: string;
  metricLabel: string;
  caption: string;
  points: Point[]; // 3 points, x/y in 0-100 within chart box
};

const transformations: TCard[] = [
  {
    initials: "RM",
    img: transform1,
    gradient: "from-neutral-700 via-neutral-800 to-black",
    metric: "120",
    unit: "mmHg",
    metricLabel: "Blood pressure",
    caption: "From 118 kg to 92 kg and 15% body fat, coaching gave me my life back.",
    points: [
      { x: 12, y: 20, label: "118 kg" },
      { x: 50, y: 55, label: "100 kg" },
      { x: 88, y: 85, label: "92 kg" },
    ],
  },
  {
    initials: "PS",
    img: transform2,
    gradient: "from-emerald-900 via-neutral-800 to-black",
    metric: "85",
    unit: "mg/dL",
    metricLabel: "Diabetes",
    caption: "Reversed diabetes, lost 17 kg, and gained energy, thanks to Indian Diet Doc.",
    points: [
      { x: 12, y: 55, label: "200 mg/dl" },
      { x: 50, y: 25, label: "220 mg/dl" },
      { x: 88, y: 82, label: "85 mg/dl" },
    ],
  },
  {
    initials: "AK",
    img: transform3,
    gradient: "from-amber-900 via-neutral-800 to-black",
    metric: "17",
    unit: "kg",
    metricLabel: "Diabetes reversed",
    caption: "I reversed diabetes, lost 17 kg, and no longer need medication — thanks to Plawan.",
    points: [
      { x: 12, y: 22, label: "89 kg" },
      { x: 50, y: 58, label: "80 kg" },
      { x: 88, y: 88, label: "74 kg" },
    ],
  },
  {
    initials: "ML",
    img: transform1,
    gradient: "from-rose-900 via-neutral-800 to-black",
    metric: "35",
    unit: "kg",
    metricLabel: "Weight lost",
    caption: "From PCOD and obesity to inspiring others, going from 92.5 kg to 57 kg.",
    points: [
      { x: 12, y: 20, label: "94 kg" },
      { x: 50, y: 55, label: "87 kg" },
      { x: 88, y: 85, label: "59 kg" },
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
      className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-border cursor-pointer"
    >
      {/* portrait background */}
      {/* <div
        className={`absolute inset-0 bg-gradient-to-b ${t.gradient} flex items-center justify-center text-7xl font-bold text-white/10 transition-all duration-500 ${
          hover ? "blur-xl scale-110" : "blur-0 scale-100"
        }`}
      >
        {t.initials}
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          hover ? "opacity-100 bg-black/40" : "opacity-0"
        }`}
      /> */}
      <img
                src={t.img}
                alt={`${t.initials} transformation`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-110 group-hover:blur-sm group-hover:opacity-20"
                loading="lazy"
                width={1200}
                height={1600}
              />

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

      {/* graph overlay */}
      <div
        className={`absolute inset-x-6 top-10 bottom-28 transition-all duration-500 ${
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
      <div className="absolute inset-x-0 bottom-0 p-4 text-center text-sm text-white/90 bg-gradient-to-t from-black/80 to-transparent pt-10">
        {t.caption}
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
      className="bg-[#0a0a0a] border-y border-border"
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
function VideoGallery() {
  const cats = ["Nutrition", "Workout", "Transformation", "Recipes", "Motivation"];
  const [active, setActive] = useState(cats[0]);
  return (
    <section className="py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <SectionLabel>Video Library</SectionLabel>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Learn from <span className="text-gradient-green">the coach</span>.</h2>
          </div>
          <Button variant="outline">View All Videos <ArrowRight className="w-4 h-4" /></Button>
        </div>

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/8 aspect-video bg-card cursor-pointer hover-lift">
              <img src={i % 2 === 0 ? nutritionImg : gymBg} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" loading="lazy" width={1200} height={900} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-primary-foreground fill-current" />
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black to-transparent">
                <div className="text-xs text-primary uppercase tracking-widest">{active}</div>
                <div className="font-semibold mt-1">{active} Tip #{i} — Watch on YouTube</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- STORE ---------------- */
function Store() {
  const books = [
    { img: book1, title: "Healthy Recipe Book", desc: "80+ everyday Indian recipes for fat loss.", price: "499" },
    { img: book2, title: "High Protein Recipes", desc: "Vegetarian & non-veg high-protein Indian meals.", price: "599" },
    { img: book3, title: "Indian Meal Prep Guide", desc: "Weekly meal prep made simple for Indian kitchens.", price: "699" },
    { img: book1, title: "Diabetic Friendly Recipes", desc: "Low-GI Indian recipes for blood sugar balance.", price: "799" },
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
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" width={800} height={1000} />
              </div>
              <div className="p-6">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-white/50 mt-2 line-clamp-2">{b.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xl font-bold">₹{b.price}</div>
                  <Button size="sm">Buy Now</Button>
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
              { icon: MessageCircle, label: "WhatsApp", value: "+91 98000 00000" },
              { icon: Mail, label: "Email", value: "hello@indiandietdoc.com" },
              { icon: Phone, label: "Phone", value: "+91 98000 00000" },
              { icon: MapPin, label: "Location", value: "Bhubaneswar, India (Online globally)" },
            ].map(c => (
              <a key={c.label} href="#" className="flex items-center gap-4 p-4 rounded-2xl glass hover:border-primary/40 transition-colors group">
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
              {[Instagram, Youtube, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Quick Links</div>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {[["About", "#about"], ["Services", "#services"], ["Programs", "#programs"], ["Shop", "#store"], ["Contact", "#contact"]].map(([l, h]) => (
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
          <div>© {new Date().getFullYear()} indiandietdoc. All rights reserved.</div>
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
