import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, HeartHandshake, TrendingDown, Users } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend,
  Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis,
  Radar, RadarChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageHeader } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/shared/KpiCard";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";
import { rpsFactors } from "@/data/mockData";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Tableau de bord — QVT-Care" }] }),
  component: Dashboard,
});

function ChartCard({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}>
      <Card className="p-5 rounded-2xl border-slate-200/60 h-full">
        <div className="text-sm font-semibold mb-4">{title}</div>
        <div className="h-64">{children}</div>
      </Card>
    </motion.div>
  );
}

const tooltipStyle = {
  contentStyle: { background: "var(--primary)", border: "none", borderRadius: 12, color: "white", fontSize: 12 },
  labelStyle: { color: "rgba(255,255,255,0.7)" },
  itemStyle: { color: "white" },
};

function Dashboard() {
  const { t, pick, language } = useI18n();
  const kpi = useStore((s) => s.kpiData);
  const chartData = useStore((s) => s.chartData);
  const departments = useStore((s) => s.departments);

  const monthKey = language === "ar" ? "monthAr" : "month";

  const deptData = departments.map((d) => ({
    name: pick(d.name, d.nameAr, d.name),
    stress: d.stressLevel,
    fill: d.stressLevel > 70 ? "var(--danger)" : d.stressLevel > 55 ? "#f97316" : d.stressLevel > 40 ? "var(--warning)" : "var(--success)",
  }));

  const rpsData = rpsFactors.map((f) => ({
    factor: pick(f.factor, f.factorAr, f.factor),
    current: f.current,
    benchmark: f.benchmark,
  }));

  const pieData = [
    { name: pick("Normal", "طبيعي", "Normal"), value: 58, fill: "var(--success)" },
    { name: pick("Vigilance", "مراقبة", "Watch"), value: 24, fill: "var(--warning)" },
    { name: pick("Préoccupant", "مقلق", "Concerning"), value: 12, fill: "#f97316" },
    { name: pick("Critique", "حرج", "Critical"), value: 6, fill: "var(--danger)" },
  ];

  return (
    <div>
      <PageHeader
        title={pick("Tableau de bord exécutif", "لوحة التحكم التنفيذية", "Executive Dashboard")}
        subtitle={pick(
          "Vue temps réel de la qualité de vie au travail et des risques psychosociaux.",
          "عرض لحظي لجودة الحياة في العمل والمخاطر النفسية والاجتماعية.",
          "Real-time view of workplace wellbeing and psychosocial risks."
        )}
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard icon={HeartHandshake} label={t("kpiSatisfaction")} value={kpi.satisfaction} suffix="%" change={kpi.satisfactionChange} tone="success" spark={[65,68,70,72,74,76,78]} />
        <KpiCard icon={Activity} label={t("kpiStress")} value={kpi.stress} suffix="%" change={kpi.stressChange} tone="warning" spark={[55,52,48,46,44,43,42]} />
        <KpiCard icon={Users} label={t("kpiParticipation")} value={kpi.participation} suffix="%" change={kpi.participationChange} tone="brand" spark={[60,66,70,76,80,83,85]} />
        <KpiCard icon={TrendingDown} label={t("kpiTurnover")} value={kpi.turnover} suffix="%" tone="muted" spark={[8,7.5,7,6.8,6.6,6.4,6.3]} />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title={t("qvtEvolution")} delay={0.1}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey={monthKey} stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="satisfaction" stroke="var(--brand)" strokeWidth={2.5} dot={{ r: 3 }} name={pick("Satisfaction", "الرضا", "Satisfaction")} />
              <Line type="monotone" dataKey="stress" stroke="var(--warning)" strokeWidth={2.5} dot={{ r: 3 }} name={pick("Stress", "الضغط", "Stress")} />
              <Line type="monotone" dataKey="participation" stroke="var(--success)" strokeWidth={2.5} dot={{ r: 3 }} name={pick("Participation", "المشاركة", "Participation")} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={t("stressByDept")} delay={0.2}>
          <ResponsiveContainer>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="stress" radius={[8, 8, 0, 0]}>
                {deptData.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={t("psRisks")} delay={0.3}>
          <ResponsiveContainer>
            <RadarChart data={rpsData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="factor" fontSize={10} stroke="var(--muted-foreground)" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={9} stroke="var(--muted-foreground)" />
              <Radar name="Benchmark" dataKey="benchmark" stroke="var(--muted-foreground)" fill="var(--muted-foreground)" fillOpacity={0.15} />
              <Radar name="Current" dataKey="current" stroke="var(--brand)" fill="var(--brand)" fillOpacity={0.45} />
              <Tooltip {...tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title={t("burnoutTrend")} delay={0.35}>
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="burnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="var(--danger)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey={monthKey} stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} domain={[0, 100]} />
              <Tooltip {...tooltipStyle} />
              <ReferenceLine y={25} stroke="var(--warning)" strokeDasharray="4 4" />
              <ReferenceLine y={50} stroke="var(--danger)" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="burnoutRisk" stroke="var(--danger)" fill="url(#burnGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={t("severityDist")} delay={0.4}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                {pieData.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45 }}>
          <Card className="p-5 rounded-2xl h-full gradient-hero border-brand/20 flex flex-col">
            <div className="text-xs uppercase tracking-wide text-brand font-semibold">{pick("Focus IA", "ذكاء اصطناعي", "AI Focus")}</div>
            <div className="mt-2 text-lg font-semibold leading-snug">
              {pick(
                "3 signaux faibles nécessitent votre attention cette semaine.",
                "3 مؤشرات ضعيفة تحتاج انتباهك هذا الأسبوع.",
                "3 weak signals need your attention this week."
              )}
            </div>
            <ul className="mt-4 space-y-2 text-sm flex-1">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-danger pulse-dot" /> Finance — {pick("pic de stress", "ارتفاع الضغط", "stress spike")}</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500" /> IT — {pick("fatigue cognitive", "إجهاد ذهني", "cognitive fatigue")}</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-warning" /> Ops — {pick("baisse reconnaissance", "تراجع التقدير", "recognition drop")}</li>
            </ul>
            <a href="/admin/burnout" className="mt-4 text-sm font-medium text-brand hover:underline">
              {pick("Ouvrir le moteur IA", "افتح محرك الذكاء الاصطناعي", "Open AI engine")} →
            </a>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
