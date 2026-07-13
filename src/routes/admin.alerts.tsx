import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/hooks/useI18n";

export const Route = createFileRoute("/admin/alerts")({
  head: () => ({ meta: [{ title: "Alertes & Seuils — QVT-Care" }] }),
  component: AlertsPage,
});

interface Threshold {
  key: string;
  label: { fr: string; ar: string; en: string };
  desc: { fr: string; ar: string; en: string };
  current: number;
  warn: number;
  danger: number;
  invert?: boolean; // true if higher is bad
}

const defaults: Threshold[] = [
  { key: "sat", label: { fr: "Satisfaction", ar: "الرضا", en: "Satisfaction" }, desc: { fr: "Alerte si le score chute sous ce seuil.", ar: "تنبيه إذا انخفض تحت العتبة.", en: "Alert if score drops below." }, current: 78, warn: 50, danger: 30 },
  { key: "str", label: { fr: "Stress", ar: "الضغط", en: "Stress" }, desc: { fr: "Alerte si le stress dépasse ce seuil.", ar: "تنبيه إذا تجاوز العتبة.", en: "Alert if stress exceeds." }, current: 42, warn: 60, danger: 80, invert: true },
  { key: "bur", label: { fr: "Risque burn-out", ar: "خطر الاحتراق", en: "Burnout risk" }, desc: { fr: "Alerte selon la probabilité IA.", ar: "تنبيه حسب احتمالية الذكاء الاصطناعي.", en: "Alert based on AI probability." }, current: 35, warn: 50, danger: 75, invert: true },
  { key: "par", label: { fr: "Participation", ar: "المشاركة", en: "Participation" }, desc: { fr: "Alerte si la participation baisse.", ar: "تنبيه إذا انخفضت المشاركة.", en: "Alert if participation drops." }, current: 85, warn: 40, danger: 20 },
];

function AlertsPage() {
  const { pick } = useI18n();
  const [thresholds, setThresholds] = useState(defaults);

  return (
    <div>
      <PageHeader
        title={pick("Alertes & Seuils", "التنبيهات والعتبات", "Alerts & Thresholds")}
        subtitle={pick("Configurez les niveaux de déclenchement des alertes automatiques.", "اضبط مستويات إطلاق التنبيهات التلقائية.", "Configure trigger levels for automatic alerts.")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {thresholds.map((t, i) => {
          const isCritical = t.invert ? t.current >= t.danger : t.current <= t.danger;
          const isWarn = t.invert ? t.current >= t.warn : t.current <= t.warn;
          const tone = isCritical ? "bg-danger/10 text-danger" : isWarn ? "bg-warning/15 text-warning" : "bg-success/10 text-success";
          return (
            <motion.div key={t.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5 rounded-2xl">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold">{pick(t.label.fr, t.label.ar, t.label.en)}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 max-w-md">{pick(t.desc.fr, t.desc.ar, t.desc.en)}</div>
                  </div>
                  <Badge className={`${tone} border-0`}>{t.current}%</Badge>
                </div>

                <div className="mt-5">
                  <Slider
                    value={[t.warn, t.danger]}
                    min={0} max={100} step={1}
                    onValueChange={(v) => setThresholds((s) => s.map((x) => x.key === t.key ? { ...x, warn: v[0], danger: v[1] } : x))}
                    className="my-4"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>0</span>
                    <span className="text-warning font-medium">{pick("Vigilance", "مراقبة", "Watch")} : {t.warn}</span>
                    <span className="text-danger font-medium">{pick("Critique", "حرج", "Critical")} : {t.danger}</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">{pick("Dernière alerte", "آخر تنبيه", "Last alert")} : 2026-07-08</div>
                  <div className="flex items-center gap-2 text-xs"><Switch defaultChecked /> {pick("Actif", "نشط", "Active")}</div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
