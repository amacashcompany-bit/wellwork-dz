import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";

export const Route = createFileRoute("/admin/actions")({
  head: () => ({ meta: [{ title: "Plans d'action — QVT-Care" }] }),
  component: ActionsPage,
});

const statusMap = {
  completed: { fr: "Terminé", ar: "مكتمل", en: "Completed", cls: "bg-success/10 text-success" },
  in_progress: { fr: "En cours", ar: "قيد التنفيذ", en: "In progress", cls: "bg-warning/15 text-warning" },
  pending: { fr: "En attente", ar: "معلّق", en: "Pending", cls: "bg-muted text-muted-foreground" },
} as const;

function ActionsPage() {
  const { pick } = useI18n();
  const plans = useStore((s) => s.actionPlans);
  const update = useStore((s) => s.updateActionPlan);
  const completed = plans.filter((p) => p.status === "completed").length;
  const overall = Math.round((completed / plans.length) * 100);

  const toggle = (id: string, current: string) => {
    const next = current === "completed" ? "pending" : "completed";
    update(id, { status: next as "completed" | "pending", progress: next === "completed" ? 100 : 0 });
    toast.success(pick("Action mise à jour", "تم تحديث الإجراء", "Action updated"));
  };

  return (
    <div>
      <PageHeader
        title={pick("Plans d'action préventifs", "خطط العمل الوقائية", "Preventive Action Plans")}
        subtitle={pick("Suivi centralisé des mesures QVT en cours et à venir.", "متابعة موحّدة للإجراءات الجارية والقادمة.", "Central tracking of ongoing and upcoming QVT measures.")}
      />

      <Card className="p-5 rounded-2xl mb-6 gradient-hero border-brand/20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-brand font-semibold">{pick("Progression globale", "التقدم العام", "Overall progress")}</div>
            <div className="text-2xl font-bold">{completed} / {plans.length} {pick("complétées", "مكتملة", "completed")}</div>
          </div>
          <div className="text-4xl font-bold text-brand">{overall}%</div>
        </div>
        <Progress value={overall} className="h-2" />
      </Card>

      <div className="space-y-3">
        {plans.map((p, i) => {
          const st = statusMap[p.status];
          return (
            <motion.div key={p.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="p-4 rounded-2xl hover:shadow-elegant transition-all">
                <div className="flex items-start gap-4">
                  <Checkbox checked={p.status === "completed"} onCheckedChange={() => toggle(p.id, p.status)} className="mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className={`font-semibold ${p.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                        {pick(p.title, p.titleAr, p.title)}
                      </div>
                      <Badge variant="outline" className="text-[10px] uppercase">{p.category}</Badge>
                      <Badge className={`${st.cls} border-0 text-[10px]`}>{pick(st.fr, st.ar, st.en)}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{pick(p.description, p.descriptionAr, p.description)}</div>
                    {p.status === "in_progress" && (
                      <div className="mt-3 max-w-md">
                        <Progress value={p.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <img src={p.assigneeAvatar} alt="" className="w-8 h-8 rounded-full bg-muted" />
                    <div className="text-xs text-muted-foreground inline-flex items-center gap-1"><CalendarClock className="w-3 h-3" />{p.dueDate}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
