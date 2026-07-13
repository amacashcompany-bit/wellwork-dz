import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/hooks/useI18n";
import type { RiskLevel } from "@/types";

const map: Record<RiskLevel, { cls: string; dot: string }> = {
  low:      { cls: "bg-success/10 text-success border-success/20",     dot: "bg-success" },
  medium:   { cls: "bg-warning/15 text-warning border-warning/25",     dot: "bg-warning" },
  high:     { cls: "bg-orange-500/10 text-orange-600 border-orange-500/20", dot: "bg-orange-500" },
  critical: { cls: "bg-danger/10 text-danger border-danger/20",        dot: "bg-danger" },
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  const { t } = useI18n();
  const label = level === "low" ? t("riskLow") : level === "medium" ? t("riskMedium") : level === "high" ? t("riskHigh") : t("riskCritical");
  return (
    <Badge variant="outline" className={`gap-1.5 ${map[level].cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${map[level].dot}`} />
      {label}
    </Badge>
  );
}
