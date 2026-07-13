import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Loader2, Printer, Sheet } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Rapports — QVT-Care" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const { pick } = useI18n();
  const kpi = useStore((s) => s.kpiData);
  const [loading, setLoading] = useState<string | null>(null);

  const run = (type: string, label: string) => {
    setLoading(type);
    setTimeout(() => {
      setLoading(null);
      toast.success(`${label} — ${pick("généré avec succès", "تم إنشاؤه بنجاح", "generated successfully")}`);
      if (type === "print") window.print();
    }, 1800);
  };

  return (
    <div>
      <PageHeader
        title={pick("Rapports", "التقارير", "Reports")}
        subtitle={pick("Générez des rapports exécutifs prêts à partager.", "أنشئ تقارير تنفيذية جاهزة للمشاركة.", "Generate executive-ready reports.")}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { id: "pdf", icon: FileText, label: pick("Export PDF", "تصدير PDF", "Export PDF"), tone: "gradient-brand" },
          { id: "xls", icon: Sheet, label: pick("Export Excel", "تصدير Excel", "Export Excel"), tone: "bg-success" },
          { id: "print", icon: Printer, label: pick("Impression", "طباعة", "Print view"), tone: "bg-primary" },
        ].map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Button
              onClick={() => run(b.id, b.label)}
              disabled={loading === b.id}
              className={`w-full h-24 rounded-2xl text-white border-0 ${b.tone} flex-col gap-2 shadow-elegant`}
            >
              {loading === b.id ? <Loader2 className="w-6 h-6 animate-spin" /> : <b.icon className="w-6 h-6" />}
              <span className="font-semibold">{b.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>

      <Card className="p-8 rounded-2xl">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div className="font-semibold">QVT-Care · {pick("Rapport mensuel", "التقرير الشهري", "Monthly Report")}</div>
        </div>
        <div className="text-xs text-muted-foreground mb-6">{pick("Généré le", "أُصدر في", "Generated on")} 2026-07-12 · TechDZ · TN-908</div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { l: pick("Satisfaction", "الرضا", "Satisfaction"), v: `${kpi.satisfaction}%` },
            { l: pick("Stress", "الضغط", "Stress"), v: `${kpi.stress}%` },
            { l: pick("Participation", "المشاركة", "Participation"), v: `${kpi.participation}%` },
            { l: pick("Turnover", "الدوران", "Turnover"), v: `${kpi.turnover}%` },
          ].map((k) => (
            <div key={k.l} className="rounded-xl bg-muted p-3">
              <div className="text-[10px] uppercase text-muted-foreground">{k.l}</div>
              <div className="text-xl font-bold mt-1">{k.v}</div>
            </div>
          ))}
        </div>

        <div className="prose prose-sm max-w-none">
          <h3 className="text-sm font-semibold">{pick("Synthèse exécutive", "الملخص التنفيذي", "Executive Summary")}</h3>
          <p className="text-sm text-muted-foreground">
            {pick(
              "Le climat général est en amélioration (+4,2 pts). Trois signaux faibles nécessitent une action ciblée sur Finance, IT et Operations.",
              "المناخ العام في تحسن (+4.2 نقطة). ثلاثة مؤشرات ضعيفة تتطلب إجراءً على المالية والمعلوماتية والعمليات.",
              "General climate is improving (+4.2 pts). Three weak signals need targeted action on Finance, IT, and Operations."
            )}
          </p>
        </div>
      </Card>
    </div>
  );
}
