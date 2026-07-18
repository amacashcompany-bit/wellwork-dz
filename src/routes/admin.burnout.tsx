import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bot,
  Building2,
  CheckCircle2,
  Database,
  Loader2,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
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
import { useMySpace } from "@/hooks/useAuth";
import {
  getBurnoutResults,
  resolveBurnoutAlert,
  runBurnoutAnalysis,
  type BurnoutResult,
} from "@/lib/burnout-analysis";

export const Route = createFileRoute("/admin/burnout")({
  head: () => ({ meta: [{ title: "Burn-out prevention - WellWork" }] }),
  component: BurnoutPage,
});

const severityStyle = {
  critical: {
    cls: "bg-danger/10 text-danger border-danger/20",
    dot: "bg-danger",
    label: { fr: "Critique", ar: "حرج", en: "Critical" },
  },
  high: {
    cls: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    dot: "bg-orange-500",
    label: { fr: "Eleve", ar: "مرتفع", en: "High" },
  },
  medium: {
    cls: "bg-warning/15 text-warning border-warning/25",
    dot: "bg-warning",
    label: { fr: "Vigilance", ar: "مراقبة", en: "Watch" },
  },
} as const;

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function BurnoutPage() {
  const { language, pick } = useI18n();
  const { info, loading: spaceLoading } = useMySpace();
  const [alerts, setAlerts] = useState<BurnoutResult[]>([]);
  const [selected, setSelected] = useState<BurnoutResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [analysisMeta, setAnalysisMeta] = useState<{
    groupsAnalyzed: number;
    groupsBelowMinimum: number;
    source: "atomesus" | "statistical";
  } | null>(null);

  const activeAlerts = alerts.filter((alert) => alert.status !== "resolved");
  const latestAt = activeAlerts[0]?.analyzedAt;

  const load = useCallback(async () => {
    if (!info?.spaceId) return;
    setLoading(true);
    setLoadError(null);
    try {
      const result = await getBurnoutResults({
        data: { spaceId: info.spaceId, locale: language },
      });
      setAlerts(result.alerts.filter((alert) => alert.status !== "resolved"));
    } catch (error) {
      setLoadError(
        errorMessage(
          error,
          language === "ar"
            ? "تعذر تحميل التحليلات."
            : language === "en"
              ? "Unable to load analyses."
              : "Impossible de charger les analyses.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }, [info?.spaceId, language]);

  useEffect(() => {
    if (!spaceLoading && info?.spaceId) void load();
  }, [spaceLoading, info?.spaceId, load]);

  const runAnalysis = async () => {
    if (!info?.spaceId || running) return;
    setRunning(true);
    setLoadError(null);
    try {
      const result = await runBurnoutAnalysis({
        data: { spaceId: info.spaceId, locale: language },
      });
      setAlerts(result.alerts);
      setAnalysisMeta({
        groupsAnalyzed: result.groupsAnalyzed,
        groupsBelowMinimum: Math.max(0, result.groupsBelowMinimum),
        source: result.source,
      });
      if (result.groupsAnalyzed === 0) {
        toast.info(
          pick(
            "Pas encore assez de reponses anonymes (minimum 6 par groupe).",
            "لا توجد ردود مجهولة كافية بعد (الحد الأدنى 6 لكل مجموعة).",
            "Not enough anonymous responses yet (minimum 6 per group).",
          ),
        );
      } else if (result.alerts.length === 0) {
        toast.success(
          pick(
            "Analyse terminee : aucun signal au-dessus du seuil de vigilance.",
            "اكتمل التحليل: لا توجد إشارة فوق حد المراقبة.",
            "Analysis complete: no signal is above the watch threshold.",
          ),
        );
      } else {
        toast.success(
          pick(
            `${result.alerts.length} signal(aux) de prevention detecte(s).`,
            `تم اكتشاف ${result.alerts.length} إشارة وقائية.`,
            `${result.alerts.length} prevention signal(s) detected.`,
          ),
        );
      }
    } catch (error) {
      const message = errorMessage(
        error,
        pick("L'analyse a echoue.", "فشل التحليل.", "Analysis failed."),
      );
      setLoadError(message);
      toast.error(message);
    } finally {
      setRunning(false);
    }
  };

  const resolveAlert = async (alert: BurnoutResult) => {
    if (!info?.spaceId || resolvingId) return;
    setResolvingId(alert.id);
    try {
      await resolveBurnoutAlert({
        data: { spaceId: info.spaceId, alertId: alert.id, locale: language },
      });
      setAlerts((current) => current.filter((item) => item.id !== alert.id));
      setSelected(null);
      toast.success(pick("Alerte resolue.", "تم حل التنبيه.", "Alert resolved."));
    } catch (error) {
      toast.error(
        errorMessage(error, pick("Action impossible.", "تعذر تنفيذ الإجراء.", "Action failed.")),
      );
    } finally {
      setResolvingId(null);
    }
  };

  return (
    <div>
      <PageHeader
        title={pick(
          "Analyse preventive du risque burn-out",
          "التحليل الوقائي لمخاطر الاحتراق الوظيفي",
          "Preventive burn-out risk analysis",
        )}
        subtitle={pick(
          "Analyse des reponses anonymes et indicateurs collectifs. Resultats affiches uniquement pour n >= 6.",
          "تحليل الردود المجهولة والمؤشرات الجماعية. تظهر النتائج فقط عندما يكون العدد 6 أو أكثر.",
          "Analysis of anonymous responses and team indicators. Results appear only when n >= 6.",
        )}
        actions={
          <Button
            onClick={runAnalysis}
            disabled={running || loading || !info?.spaceId}
            className="gradient-brand text-white border-0 gap-2"
          >
            {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            {pick("Lancer l'analyse", "بدء التحليل", "Run analysis")}
          </Button>
        }
      />

      <Card className="mb-6 overflow-hidden border-brand/15 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg gradient-brand shadow-sm">
            {running ? (
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            ) : (
              <Bot className="h-6 w-6 text-white" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase text-muted-foreground">
              {pick("Etat de l'analyse", "حالة التحليل", "Analysis status")}
            </div>
            <div className="mt-1 text-lg font-bold">
              {running
                ? pick(
                    "Analyse des agregats en cours...",
                    "جارٍ تحليل البيانات المجمعة...",
                    "Analyzing aggregates...",
                  )
                : pick(
                    `${activeAlerts.length} signal(aux) actif(s)`,
                    `${activeAlerts.length} إشارة نشطة`,
                    `${activeAlerts.length} active signal(s)`,
                  )}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {latestAt
                ? `${pick("Derniere analyse", "آخر تحليل", "Last analysis")}: ${new Date(latestAt).toLocaleString(language)}`
                : pick(
                    "Aucune analyse enregistree. Lancez la premiere analyse lorsque les reponses sont disponibles.",
                    "لا يوجد تحليل مسجل. ابدأ التحليل الأول عند توفر الردود.",
                    "No saved analysis. Run the first analysis when responses are available.",
                  )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1.5 border-success/25 text-success">
              <ShieldCheck className="h-3.5 w-3.5" />
              {pick("Anonymat n >= 6", "مجهولية n >= 6", "Anonymous n >= 6")}
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <Database className="h-3.5 w-3.5" />
              {analysisMeta?.source === "atomesus"
                ? "Atomesus + score"
                : pick("Score statistique", "درجة إحصائية", "Statistical score")}
            </Badge>
          </div>
        </div>
      </Card>

      {loadError && (
        <Card className="mb-6 border-danger/30 bg-danger/5 p-4 text-sm text-danger">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="flex-1">{loadError}</div>
            <Button variant="outline" size="sm" onClick={load}>
              {pick("Reessayer", "إعادة المحاولة", "Retry")}
            </Button>
          </div>
        </Card>
      )}

      {analysisMeta && (
        <div className="mb-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>
            {pick("Groupes analyses", "المجموعات المحللة", "Groups analyzed")}:{" "}
            {analysisMeta.groupsAnalyzed}
          </span>
          <span aria-hidden="true">•</span>
          <span>
            {pick("Masques par anonymat", "مخفية لحماية الهوية", "Hidden for anonymity")}:{" "}
            {analysisMeta.groupsBelowMinimum}
          </span>
        </div>
      )}

      {loading ? (
        <div className="grid min-h-56 place-items-center">
          <Loader2 className="h-7 w-7 animate-spin text-brand" />
        </div>
      ) : activeAlerts.length === 0 ? (
        <Card className="grid min-h-64 place-items-center border-dashed p-8 text-center">
          <div className="max-w-lg">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-success/10 text-success">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">
              {pick("Aucun signal actif", "لا توجد إشارة نشطة", "No active signal")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {pick(
                "Cela signifie qu'aucun groupe eligible ne depasse le seuil, ou qu'il n'y a pas encore six reponses anonymes. Ce resultat n'est pas un diagnostic.",
                "هذا يعني أنه لا توجد مجموعة مؤهلة تتجاوز الحد، أو أنه لا توجد ستة ردود مجهولة بعد. هذه النتيجة ليست تشخيصاً.",
                "No eligible group is above the threshold, or six anonymous responses are not available yet. This result is not a diagnosis.",
              )}
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {activeAlerts.map((alert, index) => {
            const style = severityStyle[alert.severity];
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="flex h-full flex-col p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <Badge variant="outline" className={`gap-1.5 ${style.cls}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                      {pick(style.label.fr, style.label.ar, style.label.en)}
                    </Badge>
                    <div className="text-end">
                      <div className="text-xl font-bold">{alert.score}/100</div>
                      <div className="text-[10px] text-muted-foreground">
                        {pick("Confiance", "الثقة", "Confidence")} {alert.confidence}%
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" /> {alert.department}
                    <span>•</span>
                    <Users className="h-3.5 w-3.5" /> n={alert.populationSize}
                  </div>
                  <h2 className="font-semibold">{alert.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{alert.summary}</p>
                  <div className="mt-3 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={alert.trend.map((value, itemIndex) => ({ itemIndex, value }))}
                      >
                        <defs>
                          <linearGradient id={`risk-${alert.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="var(--danger)"
                          strokeWidth={2}
                          fill={`url(#risk-${alert.id})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex gap-2 border-t border-border/60 pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setSelected(alert)}
                    >
                      <TrendingUp className="me-1.5 h-4 w-4" />
                      {pick("Details", "التفاصيل", "Details")}
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 gradient-brand text-white border-0"
                      disabled={resolvingId === alert.id}
                      onClick={() => resolveAlert(alert)}
                    >
                      {resolvingId === alert.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="me-1.5 h-4 w-4" />
                      )}
                      {pick("Resoudre", "حل", "Resolve")}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand" />
                  {selected.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-muted p-3">
                    <div className="text-[10px] uppercase text-muted-foreground">
                      {pick("Score", "الدرجة", "Score")}
                    </div>
                    <div className="mt-1 font-semibold">{selected.score}/100</div>
                  </div>
                  <div className="bg-muted p-3">
                    <div className="text-[10px] uppercase text-muted-foreground">
                      {pick("Confiance", "الثقة", "Confidence")}
                    </div>
                    <div className="mt-1 font-semibold">{selected.confidence}%</div>
                  </div>
                  <div className="bg-muted p-3">
                    <div className="text-[10px] uppercase text-muted-foreground">
                      {pick("Population", "العدد", "Population")}
                    </div>
                    <div className="mt-1 font-semibold">n={selected.populationSize}</div>
                  </div>
                </div>

                <div>
                  <div className="mb-3 text-sm font-semibold">
                    {pick(
                      "Facteurs contributifs agreges",
                      "العوامل المجمعة المساهمة",
                      "Aggregated contributing factors",
                    )}
                  </div>
                  <div className="space-y-3">
                    {selected.drivers.map((driver) => (
                      <div key={driver.label}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span>{driver.label}</span>
                          <span className="font-medium">{driver.weight}%</span>
                        </div>
                        <Progress value={driver.weight} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 text-sm font-semibold">
                    {pick("Actions recommandees", "الإجراءات الموصى بها", "Recommended actions")}
                  </div>
                  <div className="space-y-2">
                    {selected.recommendations.map((recommendation, index) => (
                      <label
                        key={`${selected.id}-${index}`}
                        className="flex cursor-pointer items-start gap-3 border p-3 hover:bg-muted/50"
                      >
                        <Checkbox />
                        <span className="text-sm">{recommendation}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <p className="flex items-start gap-2 border-t pt-4 text-xs text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {pick(
                    "Outil de prevention collectif. Ne remplace pas l'evaluation d'un professionnel de sante au travail.",
                    "أداة وقاية جماعية ولا تحل محل تقييم مختص في الصحة المهنية.",
                    "Team prevention tool. It does not replace an occupational-health professional's assessment.",
                  )}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
