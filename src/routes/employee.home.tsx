import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Calendar, MessageSquare, ScrollText, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/AppShell";
import { AnonymousBanner } from "@/components/shared/AnonymousBanner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";

export const Route = createFileRoute("/employee/home")({
  head: () => ({ meta: [{ title: "Accueil — QVT-Care" }] }),
  component: HomePage,
});

function HomePage() {
  const { pick } = useI18n();
  const events = useStore((s) => s.events).slice(0, 3);
  const content = useStore((s) => s.wellnessContent).slice(0, 3);

  const quickActions = [
    { to: "/employee/surveys", icon: ScrollText, label: pick("Faire mon pulse", "أكمل النبض", "Complete pulse"), tone: "gradient-brand" },
    { to: "/employee/feedback", icon: MessageSquare, label: pick("Feedback anonyme", "رأي مجهول", "Anonymous feedback"), tone: "bg-primary" },
    { to: "/employee/library", icon: BookOpen, label: pick("Bibliothèque", "المكتبة", "Library"), tone: "bg-success" },
    { to: "/employee/events", icon: Calendar, label: pick("Événements", "الفعاليات", "Events"), tone: "bg-warning" },
  ];

  return (
    <div>
      <PageHeader
        title={pick("Bonjour 👋", "مرحباً 👋", "Hello 👋")}
        subtitle={pick("Votre espace confidentiel pour parler du travail, en toute sécurité.", "فضاؤك السري للحديث عن العمل بأمان.", "Your confidential space to talk about work, safely.")}
      />

      <AnonymousBanner />

      {/* Hero card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="rounded-3xl p-6 md:p-8 mb-6 gradient-hero border-brand/20 relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <Badge className="bg-brand/15 text-brand border-brand/20 gap-1 mb-3"><Sparkles className="w-3 h-3" /> {pick("Nouveau pulse disponible", "نبض جديد متاح", "New pulse available")}</Badge>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">{pick("3 minutes pour être entendu·e", "3 دقائق ليُسمع صوتك", "3 minutes to be heard")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{pick("Votre voix compte. Répondez en toute confidentialité.", "صوتك مهم. أجب بكل سرية.", "Your voice matters. Reply confidentially.")}</p>
            <Link to="/employee/surveys" className="inline-flex mt-5">
              <Button className="gradient-brand text-white border-0 gap-2 h-11 px-5">
                <ScrollText className="w-4 h-4" /> {pick("Commencer", "ابدأ", "Start")}
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {quickActions.map((a, i) => (
          <motion.div key={a.to} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link to={a.to} className="block">
              <Card className={`p-4 rounded-2xl ${a.tone} text-white border-0 hover:scale-[1.02] transition-transform h-full`}>
                <a.icon className="w-6 h-6 mb-2" />
                <div className="text-sm font-semibold">{a.label}</div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Upcoming events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">{pick("Événements à venir", "الفعاليات القادمة", "Upcoming events")}</h3>
          <div className="space-y-3">
            {events.map((e) => (
              <Card key={e.id} className="p-4 rounded-2xl flex items-center gap-4 hover:shadow-elegant transition-all">
                <div className="w-14 h-14 rounded-xl gradient-brand text-white flex flex-col items-center justify-center shrink-0">
                  <div className="text-[10px] uppercase leading-none">{e.date.split("-")[1]}</div>
                  <div className="text-lg font-bold leading-none mt-0.5">{e.date.split("-")[2]}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{pick(e.title, e.titleAr, e.title)}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{e.time} · {pick(e.location, e.locationAr, e.location)}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">{pick("Sélection bien-être", "مختارات الرفاهية", "Wellness picks")}</h3>
          <div className="space-y-3">
            {content.map((c) => (
              <Card key={c.id} className="p-3 rounded-2xl flex items-center gap-3 hover:shadow-elegant transition-all">
                <div className="w-14 h-14 rounded-xl shrink-0" style={{ background: c.coverGradient }} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{pick(c.title, c.titleAr, c.title)}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.readTime} · {c.type}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
