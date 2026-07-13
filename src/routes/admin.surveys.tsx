import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarDays, Plus, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";

export const Route = createFileRoute("/admin/surveys")({
  head: () => ({ meta: [{ title: "Questionnaires — QVT-Care" }] }),
  component: SurveysPage,
});

const statusMap = {
  active:    { fr: "Actif",     ar: "نشط",   en: "Active",    cls: "bg-success/10 text-success border-success/20" },
  scheduled: { fr: "Programmé", ar: "مجدول", en: "Scheduled", cls: "bg-brand/10 text-brand border-brand/20" },
  closed:    { fr: "Clôturé",   ar: "مغلق",  en: "Closed",    cls: "bg-muted text-muted-foreground border-border" },
} as const;

function SurveysPage() {
  const { pick } = useI18n();
  const surveys = useStore((s) => s.surveys);
  return (
    <div>
      <PageHeader
        title={pick("Questionnaires scientifiques", "الاستبيانات العلمية", "Scientific Surveys")}
        subtitle={pick("Karasek, Siegrist, COPSOQ, MBI, WHO-5 — outils validés pour mesurer la QVT.", "أدوات علمية معتمدة لقياس جودة الحياة في العمل.", "Validated tools to measure workplace wellbeing.")}
        actions={<Button className="gap-2 gradient-brand text-white border-0"><Plus className="w-4 h-4" /> {pick("Nouveau", "جديد", "New")}</Button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {surveys.map((s, i) => {
          const st = statusMap[s.status];
          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5 rounded-2xl hover:shadow-elegant transition-all h-full flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="outline" className="uppercase tracking-wide text-[10px]">{s.type}</Badge>
                  <Badge variant="outline" className={st.cls}>{pick(st.fr, st.ar, st.en)}</Badge>
                </div>
                <div className="mt-3 font-semibold text-base leading-snug">{pick(s.title, s.titleAr, s.titleEn)}</div>
                <div className="mt-4 space-y-3 flex-1">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground flex items-center gap-1"><Users className="w-3.5 h-3.5" />{pick("Réponses", "الردود", "Responses")}</span>
                      <span className="font-medium">{s.responseCount}/{s.targetCount}</span>
                    </div>
                    <Progress value={s.completionRate} className="h-1.5" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {pick("Clôture", "الإغلاق", "Closes")} · {s.closesAt}
                  </div>
                </div>
                <div className="mt-4 flex gap-2 pt-3 border-t border-border/60">
                  <Button variant="outline" size="sm" className="flex-1">{pick("Résultats", "النتائج", "Results")}</Button>
                  <Button size="sm" className="flex-1 gradient-brand text-white border-0">{pick("Gérer", "إدارة", "Manage")}</Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
