import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { E as Printer, W as LoaderCircle, nt as FileText, v as Sheet } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-CBNkTu1o.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reports-DWWqffiO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const { pick } = useI18n();
	const kpi = useStore((s) => s.kpiData);
	const [loading, setLoading] = (0, import_react.useState)(null);
	const run = (type, label) => {
		setLoading(type);
		setTimeout(() => {
			setLoading(null);
			toast.success(`${label} — ${pick("généré avec succès", "تم إنشاؤه بنجاح", "generated successfully")}`);
			if (type === "print") window.print();
		}, 1800);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Rapports", "التقارير", "Reports"),
			subtitle: pick("Générez des rapports exécutifs prêts à partager.", "أنشئ تقارير تنفيذية جاهزة للمشاركة.", "Generate executive-ready reports.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
			children: [
				{
					id: "pdf",
					icon: FileText,
					label: pick("Export PDF", "تصدير PDF", "Export PDF"),
					tone: "gradient-brand"
				},
				{
					id: "xls",
					icon: Sheet,
					label: pick("Export Excel", "تصدير Excel", "Export Excel"),
					tone: "bg-success"
				},
				{
					id: "print",
					icon: Printer,
					label: pick("Impression", "طباعة", "Print view"),
					tone: "bg-primary"
				}
			].map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: i * .06 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => run(b.id, b.label),
					disabled: loading === b.id,
					className: `w-full h-24 rounded-2xl text-white border-0 ${b.tone} flex-col gap-2 shadow-elegant`,
					children: [loading === b.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "w-6 h-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: b.label
					})]
				})
			}, b.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-8 rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-8 h-8 rounded-lg gradient-brand flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-4 h-4 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-semibold",
						children: ["QVT-Care · ", pick("Rapport mensuel", "التقرير الشهري", "Monthly Report")]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground mb-6",
					children: [pick("Généré le", "أُصدر في", "Generated on"), " 2026-07-12 · TechDZ · TN-908"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6",
					children: [
						{
							l: pick("Satisfaction", "الرضا", "Satisfaction"),
							v: `${kpi.satisfaction}%`
						},
						{
							l: pick("Stress", "الضغط", "Stress"),
							v: `${kpi.stress}%`
						},
						{
							l: pick("Participation", "المشاركة", "Participation"),
							v: `${kpi.participation}%`
						},
						{
							l: pick("Turnover", "الدوران", "Turnover"),
							v: `${kpi.turnover}%`
						}
					].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-muted p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase text-muted-foreground",
							children: k.l
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xl font-bold mt-1",
							children: k.v
						})]
					}, k.l))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "prose prose-sm max-w-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: pick("Synthèse exécutive", "الملخص التنفيذي", "Executive Summary")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: pick("Le climat général est en amélioration (+4,2 pts). Trois signaux faibles nécessitent une action ciblée sur Finance, IT et Operations.", "المناخ العام في تحسن (+4.2 نقطة). ثلاثة مؤشرات ضعيفة تتطلب إجراءً على المالية والمعلوماتية والعمليات.", "General climate is improving (+4.2 pts). Three weak signals need targeted action on Finance, IT, and Operations.")
					})]
				})
			]
		})
	] });
}
//#endregion
export { ReportsPage as component };
