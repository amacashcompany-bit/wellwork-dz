import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, Users, Bot, ChartLine, Zap,
  HeartPulse, LineChart, Leaf, Check, Moon, Sun, Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";
import { LANGS } from "@/lib/i18n";
import logoMark from "@/assets/brand/wellwork-logo-mark.png";
import wordmark from "@/assets/brand/wellwork-wordmark.png";
import heroTeam from "@/assets/hero-team.jpg";
import storyWoman from "@/assets/story-woman.jpg";
import productDashboard from "@/assets/product-dashboard.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WellWork" },
      { name: "description", content: "Prévenez les risques psychosociaux avant qu'ils ne touchent votre entreprise. Plateforme QVT multi-tenant, anonymat cryptographique, IA burn-out. Conforme Loi 18-07." },
      { property: "og:title", content: "WellWork" },
      { property: "og:description", content: "Prévenez les risques psychosociaux avant qu'ils ne touchent votre entreprise. Plateforme QVT multi-tenant, anonymat cryptographique, IA burn-out. Conforme Loi 18-07." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [user, setUser] = useState<any>(null);
  const { t, language, setLanguage } = useI18n();
  const isDark = useStore((s) => s.isDarkMode);
  const toggleDark = useStore((s) => s.toggleDarkMode);
  const currentLang = LANGS.find((l) => l.code === language) || LANGS[0];

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      {/* ============== NAV ============== */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.img
              src={logoMark}
              alt="WellWork"
              className="w-9 h-9 object-contain drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]"
              initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
              whileHover={{ rotate: [0, -6, 6, 0], scale: 1.08, transition: { duration: 0.6 } }}
            />
            <span className="font-display font-bold text-lg tracking-tight">WellWork</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#platform" className="hover:text-foreground transition">{t("landingNavPlatform")}</a>
            <a href="#approach" className="hover:text-foreground transition">{t("landingNavApproach")}</a>
            <a href="#insights" className="hover:text-foreground transition">{t("landingNavInsights")}</a>
            <a href="#pricing" className="hover:text-foreground transition">{t("landingNavPricing")}</a>
          </nav>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 px-2 text-muted-foreground hover:text-foreground">
                  <img src={currentLang.flag} alt={currentLang.code} className="w-4 h-3 object-cover rounded-sm shadow-sm" />
                  <span className="hidden sm:inline uppercase text-xs font-semibold">{currentLang.code}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANGS.map((l) => (
                  <DropdownMenuItem key={l.code} onClick={() => setLanguage(l.code)}>
                    <img src={l.flag} alt={l.code} className="me-2 w-4 h-3 object-cover rounded-sm shadow-sm" /> {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={toggleDark} aria-label="Toggle theme" className="text-muted-foreground hover:text-foreground">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {user ? (
              <Link to="/onboarding">
                <Button className="gradient-brand text-white border-0 h-10 rounded-full px-5 shadow-elegant">
                  Tableau de bord
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth" className="text-sm font-medium hover:text-brand transition-colors hidden sm:inline-flex px-3">{t("landingLogin")}</Link>
                <Link to="/auth">
                  <Button className="gradient-leaf text-white border-0 h-10 rounded-full px-5 shadow-elegant">
                    {t("landingDemoBtn")} <ArrowUpRight className="w-4 h-4 ms-1" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ============== HERO ============== */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-6 gradient-woba">
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-leaf/10 border border-leaf/25 px-4 py-1.5 text-xs font-medium text-leaf-deep mb-6">
              <Leaf className="w-3.5 h-3.5" /> {t("landingHeroBadge")}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="text-[2.5rem] md:text-6xl lg:text-[4.2rem] font-bold tracking-tight leading-[1.02] font-display">
              {t("landingHeroTitle1")}<span className="text-gradient-leaf">{t("landingHeroTitle2")}</span>{t("landingHeroTitle3")}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t("landingHeroDesc")}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/auth">
                <Button size="lg" className="gradient-leaf text-white border-0 h-12 px-6 rounded-full shadow-elegant">
                  {t("landingHeroStartBtn")} <ArrowRight className="w-4 h-4 ms-1" />
                </Button>
              </Link>
              <a href="#platform">
                <Button size="lg" variant="outline" className="h-12 px-6 rounded-full border-foreground/15">
                  {t("landingHeroDiscoverBtn")}
                </Button>
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {[t("landingFeature1"), t("landingFeature2"), t("landingFeature3"), t("landingFeature4")].map((feat) => (
                <div key={feat} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-leaf" /> {feat}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant border border-border/60">
              <img src={heroTeam} alt="Équipe au travail" width={1280} height={960} className="w-full h-[420px] md:h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-leaf/20 mix-blend-multiply" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-4 md:-left-8 glass rounded-2xl p-4 pr-6 shadow-elegant flex items-center gap-3 max-w-[280px]">
              <div className="w-11 h-11 rounded-xl gradient-leaf grid place-items-center text-white shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground">{t("landingScore")}</div>
                <div className="font-semibold text-lg leading-tight">78<span className="text-sm text-muted-foreground">/100</span> <span className="text-leaf-deep text-xs font-medium">+6.4%</span></div>
              </div>
            </div>
            <div className="absolute -top-4 -right-3 md:-right-6 glass rounded-2xl p-3 pr-5 shadow-elegant flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand/15 text-brand grid place-items-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-semibold">{t("landingAnon")}</div>
                <div className="text-muted-foreground">k ≥ 5 · AES-GCM</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust bar */}
        <div className="relative max-w-7xl mx-auto mt-20">
          <div className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-4">{t("landingTrust")}</div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-70">
            {["Sonatrach", "CNAS", "Djezzy", "BNA", "Cosider", "Cevital"].map((n) => (
              <div key={n} className="font-display font-semibold text-lg text-muted-foreground/80">{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== LEADING THE CHANGE ============== */}
      <section id="insights" className="py-24 px-6 bg-muted/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-widest text-leaf-deep font-semibold mb-3">{t("landingImpactTag")}</div>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">{t("landingImpactTitle")}</h2>
            <p className="mt-4 text-muted-foreground">{t("landingImpactDesc")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { value: "13.3%", label: t("landingImpactStat1"), tone: "bg-card border" },
              { value: "33%", label: t("landingImpactStat2"), tone: "gradient-leaf text-white border-0" },
              { value: "500%", label: t("landingImpactStat3"), tone: "bg-primary text-primary-foreground border-0" },
            ].map((s) => (
              <div key={s.label} className={`rounded-3xl p-8 md:p-10 ${s.tone}`}>
                <div className="text-5xl md:text-6xl font-bold font-display tracking-tight">{s.value}</div>
                <div className="mt-3 text-sm opacity-90">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== ONE SUITE ============== */}
      <section id="platform" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-leaf-deep font-semibold mb-3">{t("landingSuiteTag")}</div>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">{t("landingSuiteTitle")}</h2>
            <p className="mt-5 text-muted-foreground max-w-lg">{t("landingSuiteDesc")}</p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: LineChart, t: t("landingSuiteF1T"), d: t("landingSuiteF1D") },
                { icon: Bot, t: t("landingSuiteF2T"), d: t("landingSuiteF2D") },
                { icon: ShieldCheck, t: t("landingSuiteF3T"), d: t("landingSuiteF3D") },
                { icon: ChartLine, t: t("landingSuiteF4T"), d: t("landingSuiteF4D") },
              ].map((f) => (
                <li key={f.t} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-leaf grid place-items-center text-white shrink-0"><f.icon className="w-5 h-5" /></div>
                  <div>
                    <div className="font-semibold">{f.t}</div>
                    <div className="text-sm text-muted-foreground">{f.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-border shadow-elegant bg-card">
              <img src={productDashboard} alt="Tableau de bord WellWork" width={1280} height={900} loading="lazy" className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-4 glass rounded-2xl px-4 py-3 shadow-elegant text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" /> {t("landingSuiteRealtime")}
            </div>
          </div>
        </div>
      </section>

      {/* ============== STORY / EDITORIAL ============== */}
      <section id="approach" className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden">
            <img src={storyWoman} alt="Portrait salariée" width={960} height={1024} loading="lazy" className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs uppercase tracking-widest opacity-80 mb-2">{t("landingApprReality")}</div>
              <div className="text-2xl font-display font-semibold leading-tight">{t("landingApprRealityT")}</div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-leaf font-semibold mb-3">{t("landingApprTag")}</div>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">{t("landingApprTitle1")}<em className="not-italic text-gradient-leaf">{t("landingApprTitle2")}</em>{t("landingApprTitle3")}</h2>
            <p className="mt-5 text-primary-foreground/80 max-w-lg">{t("landingApprDesc")}</p>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {[
                { t: t("landingApprF1T"), d: t("landingApprF1D") },
                { t: t("landingApprF2T"), d: t("landingApprF2D") },
                { t: t("landingApprF3T"), d: t("landingApprF3D") },
                { t: t("landingApprF4T"), d: t("landingApprF4D") },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">
                  <div className="font-semibold">{c.t}</div>
                  <div className="text-sm text-primary-foreground/70 mt-1">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== BRIDGING RH & HSE ============== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <div className="text-xs uppercase tracking-widest text-leaf-deep font-semibold mb-3">{t("landingBridgeTag")}</div>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">{t("landingBridgeTitle")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 rounded-3xl bg-card border p-8 relative overflow-hidden">
              <div className="text-sm text-muted-foreground mb-6">{t("landingBridgeChartTitle")}</div>
              <FakeChart />
              <div className="mt-6 flex flex-wrap gap-4 text-xs">
                <Legend color="var(--brand)" label={t("landingBridgeLegend1")} />
                <Legend color="var(--leaf)" label={t("landingBridgeLegend2")} />
              </div>
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="rounded-3xl gradient-leaf text-white p-8 flex flex-col justify-between">
                <div className="text-sm/6 opacity-90">{t("landingBridgeStat1T")}</div>
                <div className="text-5xl font-bold font-display">6%</div>
              </div>
              <div className="rounded-3xl bg-primary text-primary-foreground p-8 flex flex-col justify-between">
                <div className="text-sm/6 opacity-90">{t("landingBridgeStat2T")}</div>
                <div className="text-5xl font-bold font-display">14%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FEATURES GRID ============== */}
      <section className="py-24 px-6 bg-muted/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">{t("landingGridTitle")}</h2>
            <p className="mt-4 text-muted-foreground">{t("landingGridDesc")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: t("landingGridF1T"), desc: t("landingGridF1D") },
              { icon: Bot, title: t("landingGridF2T"), desc: t("landingGridF2D") },
              { icon: ChartLine, title: t("landingGridF3T"), desc: t("landingGridF3D") },
              { icon: Users, title: t("landingGridF4T"), desc: t("landingGridF4D") },
              { icon: Zap, title: t("landingGridF5T"), desc: t("landingGridF5D") },
              { icon: Sparkles, title: t("landingGridF6T"), desc: t("landingGridF6D") },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="p-6 rounded-3xl bg-card border hover:shadow-elegant hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-2xl gradient-leaf grid place-items-center shadow-elegant mb-4">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold text-lg font-display">{f.title}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <PricingSection />

      {/* ============== FINAL CTA ============== */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[2rem] gradient-mesh p-12 md:p-16 text-white text-center relative overflow-hidden">
          <motion.img
            src={logoMark}
            alt=""
            className="w-14 h-14 mx-auto object-contain mb-6"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.95, scale: 1, y: [0, -6, 0] }}
            transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.6 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
          />
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">{t("landingCtaTitle")}</h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">{t("landingCtaDesc")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/auth"><Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-6 rounded-full">{t("landingPricingCreate")} <ArrowRight className="w-4 h-4 ms-1" /></Button></Link>
            <Link to="/auth"><Button size="lg" variant="outline" className="h-12 px-6 rounded-full border-white/30 bg-transparent text-white hover:bg-white/10">{t("landingCtaTalk")}</Button></Link>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="border-t border-border/50 py-14 px-6 bg-sidebar text-sidebar-foreground">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <img src={wordmark} alt="WellWork" className="h-9 w-auto object-contain" />
            <p className="mt-4 text-sm text-sidebar-foreground/70 max-w-xs">{t("landingFooterDesc")}</p>
          </div>
          {[
            { title: "Plateforme", links: ["Pulse", "Feedback anonyme", "IA burn-out", "Rapports"] },
            { title: "Ressources", links: ["Bibliothèque", "Événements", "Blog", "Guides"] },
            { title: "Entreprise", links: ["À propos", "Contact", "Sécurité", "Confidentialité"] },
          ].map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-widest text-sidebar-foreground/50 mb-4">{c.title}</div>
              <ul className="space-y-2 text-sm">
                {c.links.map((l) => <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-xs text-sidebar-foreground/50 flex flex-wrap justify-between gap-3">
          <div>© {new Date().getFullYear()} WellWork · {t("landingFooterRights")}</div>
          <div>{t("landingFooterLegal")}</div>
        </div>
      </footer>
    </div>
  );
}

function PricingSection() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("plans")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setPlans(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <section id="pricing" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="mb-4">{t("landingPricingTag")}</Badge>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">{t("landingPricingTitle")}</h2>
          <p className="mt-4 text-muted-foreground">{t("landingPricingDesc")}</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-brand/50" /></div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className={`h-full p-6 rounded-3xl border bg-card flex flex-col relative ${plan.highlighted ? "border-brand shadow-glow ring-1 ring-brand/30" : ""}`}>
                  {plan.highlighted && (
                    <span className="absolute -top-3 start-6 text-[11px] font-semibold px-3 py-1 rounded-full gradient-brand text-white">{t("landingPricingPop")}</span>
                  )}
                  <div className="font-display font-semibold text-lg">{plan.name}</div>
                  <p className="text-sm text-muted-foreground mt-1">{plan.tagline}</p>
                  <div className="mt-5 text-2xl font-bold">
                    {plan.price_monthly === null ? t("landingPricingQuote") : plan.price_monthly === 0 ? t("landingPricingFree") : `${plan.price_monthly} ${plan.currency}/${t("landingPricingMonth")}`}
                  </div>
                  <ul className="mt-5 space-y-2.5 text-sm flex-1">
                    {(plan.features || []).map((f: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-leaf mt-0.5 shrink-0" /> <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link to="/auth">
                      <Button className={`w-full rounded-full ${plan.highlighted ? "gradient-brand text-white border-0" : ""}`} variant={plan.highlighted ? "default" : "outline"}>
                        {plan.price_monthly === null ? t("landingPricingContact") : t("landingPricingCreate")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <span className="w-3 h-3 rounded-full" style={{ background: color }} /> {label}
    </div>
  );
}

function FakeChart() {
  // SVG placeholder chart — indigo + leaf lines
  return (
    <svg viewBox="0 0 600 220" className="w-full h-56">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--leaf)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--leaf)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[40, 80, 120, 160, 200].map((y) => (
        <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.06" />
      ))}
      <path d="M0,150 C60,140 100,120 160,110 C220,100 260,90 320,80 C380,70 420,60 480,55 C540,50 580,45 600,42 L600,220 L0,220 Z" fill="url(#g1)" />
      <path d="M0,150 C60,140 100,120 160,110 C220,100 260,90 320,80 C380,70 420,60 480,55 C540,50 580,45 600,42" fill="none" stroke="var(--brand)" strokeWidth="2.5" />
      <path d="M0,80 C60,95 120,110 180,120 C240,130 300,140 360,150 C420,160 480,170 540,175 C570,178 590,180 600,181 L600,220 L0,220 Z" fill="url(#g2)" />
      <path d="M0,80 C60,95 120,110 180,120 C240,130 300,140 360,150 C420,160 480,170 540,175 C570,178 590,180 600,181" fill="none" stroke="var(--leaf)" strokeWidth="2.5" />
    </svg>
  );
}
