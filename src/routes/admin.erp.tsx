import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Database, Loader2, Plug } from "lucide-react";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/hooks/useI18n";

export const Route = createFileRoute("/admin/erp")({
  head: () => ({ meta: [{ title: "ERP — QVT-Care" }] }),
  component: ErpPage,
});

const mockRows = [
  { emp: "EMP-****", dept: "IT", turnover: "low", absence: "2j", qvt: 72, stress: 45, rec: "Entretien" },
  { emp: "EMP-****", dept: "Marketing", turnover: "low", absence: "1j", qvt: 85, stress: 32, rec: "—" },
  { emp: "EMP-****", dept: "Finance", turnover: "high", absence: "5j", qvt: 45, stress: 78, rec: "Intervention immédiate" },
  { emp: "EMP-****", dept: "RH", turnover: "low", absence: "0j", qvt: 91, stress: 28, rec: "—" },
  { emp: "EMP-****", dept: "Operations", turnover: "medium", absence: "3j", qvt: 58, stress: 62, rec: "Suivi" },
  { emp: "EMP-****", dept: "IT", turnover: "low", absence: "2j", qvt: 78, stress: 40, rec: "—" },
  { emp: "EMP-****", dept: "Marketing", turnover: "medium", absence: "4j", qvt: 68, stress: 55, rec: "Coaching" },
  { emp: "EMP-****", dept: "Finance", turnover: "high", absence: "6j", qvt: 52, stress: 71, rec: "Réunion managériale" },
  { emp: "EMP-****", dept: "IT", turnover: "low", absence: "1j", qvt: 64, stress: 48, rec: "—" },
  { emp: "EMP-****", dept: "RH", turnover: "low", absence: "0j", qvt: 82, stress: 35, rec: "—" },
];

function ErpPage() {
  const { pick } = useI18n();
  const [stage, setStage] = useState<"idle" | "connecting" | "connected">("idle");
  const start = () => {
    setStage("connecting");
    setTimeout(() => setStage("connected"), 2500);
  };
  return (
    <div>
      <PageHeader
        title={pick("Intégration ERP", "ربط أنظمة ERP", "ERP Integration")}
        subtitle={pick("Synchronisez SAP / Oracle avec les indicateurs QVT.", "مزامنة SAP / Oracle مع مؤشرات QVT.", "Sync SAP / Oracle with QVT indicators.")}
      />

      <Card className="p-8 rounded-3xl text-center gradient-hero border-brand/20 mb-6">
        <div className="w-16 h-16 mx-auto rounded-2xl gradient-brand flex items-center justify-center shadow-elegant mb-4">
          <Database className="w-8 h-8 text-white" />
        </div>
        <div className="text-xl font-bold">{pick("Connectez votre ERP", "اربط نظام ERP", "Connect your ERP")}</div>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
          {pick("Récupérez turnover, absences et heures pour enrichir l'analyse QVT.", "استرجاع الدوران والغياب والساعات لإثراء تحليل QVT.", "Pull turnover, absence, and hours to enrich QVT analytics.")}
        </p>
        <Button onClick={start} disabled={stage !== "idle"} className="mt-5 gradient-brand text-white border-0 gap-2">
          {stage === "connecting" ? <Loader2 className="w-4 h-4 animate-spin" /> : stage === "connected" ? <CheckCircle2 className="w-4 h-4" /> : <Plug className="w-4 h-4" />}
          {stage === "connecting" ? pick("Connexion…", "جاري الاتصال…", "Connecting…") : stage === "connected" ? pick("Connecté avec succès", "تم الاتصال بنجاح", "Connected") : pick("Lancer la synchronisation", "بدء المزامنة", "Start sync")}
        </Button>
      </Card>

      <AnimatePresence>
        {stage === "connected" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-2xl overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{pick("Données consolidées", "بيانات موحدة", "Consolidated data")}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{pick("Dernière sync : il y a 2 minutes", "آخر مزامنة: منذ دقيقتين", "Last sync: 2 minutes ago")}</div>
                </div>
                <div className="flex items-center gap-2 text-xs"><Switch defaultChecked /> {pick("Sync auto", "مزامنة تلقائية", "Auto sync")}</div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{pick("Employé", "الموظف", "Employee")}</TableHead>
                    <TableHead>{pick("Dept.", "القسم", "Dept.")}</TableHead>
                    <TableHead>{pick("Turnover", "الدوران", "Turnover")}</TableHead>
                    <TableHead>{pick("Absence", "الغياب", "Absence")}</TableHead>
                    <TableHead>QVT</TableHead>
                    <TableHead>{pick("Stress", "الضغط", "Stress")}</TableHead>
                    <TableHead>{pick("Recommandation IA", "توصية الذكاء الاصطناعي", "AI Recommendation")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRows.map((r, i) => (
                    <motion.tr key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="border-b">
                      <TableCell className="font-mono text-xs">{r.emp}</TableCell>
                      <TableCell><Badge variant="secondary">{r.dept}</Badge></TableCell>
                      <TableCell>
                        <Badge className={r.turnover === "high" ? "bg-danger/10 text-danger border-0" : r.turnover === "medium" ? "bg-warning/15 text-warning border-0" : "bg-success/10 text-success border-0"}>{r.turnover}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{r.absence}</TableCell>
                      <TableCell className="font-medium">{r.qvt}%</TableCell>
                      <TableCell className="font-medium">{r.stress}%</TableCell>
                      <TableCell className="text-xs">{r.rec}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
