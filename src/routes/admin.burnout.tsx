import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Bot, Building2, CheckCircle2, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";
import type { BurnoutAlert } from "@/types";

export const Route = createFileRoute("/admin/burnout")({
  head: () => ({ meta: [{ title: "Moteur IA Burn-out — QVT-Care" }] }),
  component: BurnoutPage,
});

const sevMap = {
  critical: { cls: "bg-danger/10 text-danger border-danger/20", dot: "bg-danger", label: { fr: "Critique", ar: "حرج", en: "Critical" } },
  high:     { cls: "bg-orange-500/10 text-orange-600 border-orange-500/20", dot: "bg-orange-500", label: { fr: "Élevé", ar: "مرتفع", en: "High" } },
  medium:   { cls: "bg-warning/15 text-warning border-warning/25", dot: "bg-warning", label: { fr: "Moyen", ar: "متوسط", en: "Medium" } },
} as const;

function BurnoutPage() {
  const { pick } = useI18n();
  const alerts = useStore((s) => s.burnoutAlerts);
  const resolveAlert = useStore((s) => s.resolveAlert);
  const [selected, setSelected] = useState<BurnoutAlert | null>(null);
  const active = alerts.filter((a) => a.status === "active");

  return (
    <div>
      <PageHeader
        title={pick("Moteur IA de détection précoce", "محرك الكشف المبكر بالذكاء الاصطناعي", "AI Early Detection Engine")}
        subtitle={pick("Analyse continue de signaux faibles multi-sources. Alertes uniquement si n ≥ 6 pour préserver l'anonymat.", "تحليل مستمر للمؤشرات الضعيفة. تنبيهات فقط إذا n ≥ 6 لحماية الهوية.", "Continuous analysis of weak signals. Alerts only when n ≥ 6 to preserve anonymity.")}
      />

      {/* Glassmorphism status widget */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="glass rounded-3xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-60 pointer-events-none" />
          <div className="relative flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shadow-elegant">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-danger pulse-dot" />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{pick("Statut du moteur", "حالة المحرك", "Engine Status")}</div>
              <div className="text-lg font-bold">{active.length} {pick("alertes actives — surveillance en temps réel", "تنبيهات نشطة — مراقبة لحظية", "active alerts — real-time monitoring")}</div>
              <div className="text-xs text-muted-foreground mt-1">{pick("Dernière analyse : il y a 2 minutes · Modèle : QVT-BERT v2.1", "آخر تحليل: منذ دقيقتين · النموذج: QVT-BERT v2.1", "Last analysis: 2 min ago · Model: QVT-BERT v2.1")}</div>
            </div>
            <Badge className="bg-brand/10 text-brand border-brand/20">v2.1</Badge>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {active.map((a, i) => {
          const s = sevMap[a.severity];
          return (
            <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card className="p-5 rounded-2xl hover:shadow-elegant transition-all h-full">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <Badge variant="outline" className={`gap-1.5 ${s.cls}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {pick(s.label.fr, s.label.ar, s.label.en)}
                  </Badge>
                  <div className="text-xs text-muted-foreground">{a.detectedAt}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Building2 className="w-4 h-4" /> {pick(a.department, a.departmentAr, a.department)}
                  <span>·</span>
                  <Users className="w-3.5 h-3.5" /> n={a.populationSize}
                </div>
                <div className="font-semibold text-base leading-snug mb-2">{pick(a.title, a.titleAr, a.title)}</div>
                <p className="text-sm text-muted-foreground">{pick(a.description, a.descriptionAr, a.description)}</p>
                <div className="mt-3 h-16 -mx-2">
                  <ResponsiveContainer>
                    <AreaChart data={a.trend.map((v, idx) => ({ i: idx, v }))}>
                      <defs>
                        <linearGradient id={`g-${a.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="var(--danger)" strokeWidth={2} fill={`url(#g-${a.id})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t border-border/60">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelected(a)}>
                    <TrendingUp className="w-4 h-4 me-1.5" /> {pick("Détails", "تفاصيل", "Details")}
                  </Button>
                  <Button size="sm" className="flex-1 gradient-brand text-white border-0" onClick={() => { resolveAlert(a.id); toast.success(pick("Alerte marquée résolue", "تم حل التنبيه", "Alert resolved")); }}>
                    <CheckCircle2 className="w-4 h-4 me-1.5" /> {pick("Résoudre", "حل", "Resolve")}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl rounded-2xl">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-danger" />
                  <DialogTitle>{pick(selected.title, selected.titleAr, selected.title)}</DialogTitle>
                </div>
              </DialogHeader>
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-muted p-3">
                    <div className="text-[10px] uppercase text-muted-foreground">{pick("Sévérité", "الخطورة", "Severity")}</div>
                    <div className="mt-1 font-semibold">{pick(sevMap[selected.severity].label.fr, sevMap[selected.severity].label.ar, sevMap[selected.severity].label.en)}</div>
                  </div>
                  <div className="rounded-xl bg-muted p-3">
                    <div className="text-[10px] uppercase text-muted-foreground">{pick("Département", "القسم", "Department")}</div>
                    <div className="mt-1 font-semibold">{pick(selected.department, selected.departmentAr, selected.department)}</div>
                  </div>
                  <div className="rounded-xl bg-muted p-3">
                    <div className="text-[10px] uppercase text-muted-foreground">{pick("Population", "العدد", "Population")}</div>
                    <div className="mt-1 font-semibold">n = {selected.populationSize}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-3">{pick("Facteurs contributifs (SHAP)", "العوامل المساهمة (SHAP)", "Contributing factors (SHAP)")}</div>
                  <div className="space-y-2">
                    {selected.drivers.map((d) => (
                      <div key={d.label}>
                        <div className="flex justify-between text-xs mb-1"><span>{pick(d.label, d.labelAr, d.label)}</span><span className="font-medium">{d.weight}%</span></div>
                        <Progress value={d.weight} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-3">{pick("Actions recommandées", "الإجراءات الموصى بها", "Recommended actions")}</div>
                  <div className="space-y-2">
                    {(pick(selected.recommendations, selected.recommendationsAr, selected.recommendations)).map((r, i) => (
                      <label key={i} className="flex items-start gap-3 p-3 rounded-xl border cursor-pointer hover:bg-muted/50">
                        <Checkbox />
                        <span className="text-sm">{r}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
