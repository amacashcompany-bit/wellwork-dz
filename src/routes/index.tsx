import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, ChartLine, ShieldCheck, Sparkles, Users, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wellwork — Plateforme QVT & Prévention des RPS" },
      { name: "description", content: "Mesurez, prévenez et améliorez la Qualité de Vie au Travail. Anonymat strict, IA de détection burn-out, multi-tenant. Conforme Loi 18-07." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/onboarding", replace: true });
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-elegant">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="font-display font-bold">Wellwork</div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="text-sm font-medium hover:text-brand transition-colors">Connexion</Link>
            <Link to="/auth"><Button className="gradient-brand text-white border-0 h-9">Commencer <ArrowRight className="w-4 h-4 ms-1" /></Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="absolute inset-0 gradient-hero pointer-events-none" />
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/20 px-4 py-1.5 text-xs font-medium text-brand mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Conforme Loi 18-07 · Anonymat strict garanti
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            La plateforme QVT<br />qui protège <span className="text-brand">vraiment</span> vos équipes.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Mesurez le bien-être, prévenez les risques psychosociaux, agissez sur les signaux faibles. Anonymat cryptographique, IA burn-out, multi-tenant.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/auth"><Button size="lg" className="gradient-brand text-white border-0 h-12 px-6">Démarrer gratuitement <ArrowRight className="w-4 h-4 ms-1" /></Button></Link>
            <Link to="/auth"><Button size="lg" variant="outline" className="h-12 px-6">Se connecter</Button></Link>
          </motion.div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-left">
            {[
              { icon: ShieldCheck, label: "Anonymat", value: "Strict" },
              { icon: Users, label: "Multi-tenant", value: "Illimité" },
              { icon: Bot, label: "IA Burn-out", value: "Temps réel" },
              { icon: ChartLine, label: "Conformité", value: "Loi 18-07" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
                className="p-4 rounded-2xl glass">
                <s.icon className="w-5 h-5 text-brand mb-2" />
                <div className="text-xs uppercase text-muted-foreground">{s.label}</div>
                <div className="font-semibold">{s.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Une plateforme complète, pensée pour la confiance.</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">De la mesure au plan d'action, chaque brique respecte l'anonymat, la conformité et la culture QVT.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Espace anonyme sécurisé", desc: "Whistleblowing chiffré, jetons de suivi, aucune IP ni email stockés." },
              { icon: Bot, title: "IA de détection burn-out", desc: "Signaux faibles, tendances par équipe, recommandations RH concrètes." },
              { icon: ChartLine, title: "Tableau de bord temps réel", desc: "KPIs QVT, radar RPS, benchmarks, rapports Loi 18-07 prêts à l'export." },
              { icon: Users, title: "Multi-tenant natif", desc: "Un espace par organisation, RBAC complet, données strictement isolées." },
              { icon: Zap, title: "Plans d'action", desc: "Du signal à l'action : responsables, échéances, progression, ROI QVT." },
              { icon: Sparkles, title: "Bibliothèque bien-être", desc: "Contenus multilingues, événements, messagerie et pulse hebdomadaire." },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-6 rounded-3xl bg-card border shadow-sm hover:shadow-elegant transition-all">
                <div className="w-11 h-11 rounded-2xl gradient-brand flex items-center justify-center shadow-elegant mb-4">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold text-lg">{f.title}</div>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl gradient-mesh p-12 md:p-16 text-white text-center relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold">Prêt à mesurer ce qui compte vraiment ?</h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">Créez votre espace en quelques secondes. Invitez vos équipes. Lancez votre premier pulse.</p>
          <div className="mt-8">
            <Link to="/auth"><Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 h-12 px-6">Créer mon espace <ArrowRight className="w-4 h-4 ms-1" /></Button></Link>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t text-center text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-6">
          © {new Date().getFullYear()} Wellwork · Conforme Loi 18-07 · Anonymat cryptographique strict
        </div>
      </footer>
    </div>
  );
}
