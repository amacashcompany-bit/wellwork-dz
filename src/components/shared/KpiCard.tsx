import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer } from "recharts";

type Tone = "brand" | "success" | "warning" | "danger" | "muted";

const toneMap: Record<Tone, { bg: string; text: string; stroke: string }> = {
  brand:   { bg: "bg-brand/10",    text: "text-brand",    stroke: "var(--brand)" },
  success: { bg: "bg-success/10",  text: "text-success",  stroke: "var(--success)" },
  warning: { bg: "bg-warning/15",  text: "text-warning",  stroke: "var(--warning)" },
  danger:  { bg: "bg-danger/10",   text: "text-danger",   stroke: "var(--danger)" },
  muted:   { bg: "bg-muted",       text: "text-muted-foreground", stroke: "var(--muted-foreground)" },
};

export function KpiCard({
  icon: Icon, label, value, suffix = "", change, tone = "brand", spark,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  suffix?: string;
  change?: number;
  tone?: Tone;
  spark?: number[];
}) {
  const t = toneMap[tone];
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [value, mv, rounded]);

  const data = (spark ?? [3, 5, 4, 6, 8, 7, 9]).map((v, i) => ({ i, v }));

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card className="p-5 rounded-2xl border-slate-200/60 hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-2xl ${t.bg} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${t.text}`} />
          </div>
          {typeof change === "number" && (
            <div className={`flex items-center gap-0.5 text-xs font-medium ${change >= 0 ? "text-success" : "text-danger"}`}>
              {change >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {change > 0 ? "+" : ""}{change}%
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
        <div className="mt-1 text-3xl font-bold tracking-tight">
          {display}{suffix}
        </div>
        <div className="mt-3 h-10 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="v" stroke={t.stroke} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
