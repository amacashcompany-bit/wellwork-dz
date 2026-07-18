import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { D as Plus, Dt as CalendarDays, i as Users } from "../_libs/lucide-react.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-BpC9Zhk0.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.surveys-Cptk98iz.js
var import_jsx_runtime = require_jsx_runtime();
var statusMap = {
	active: {
		fr: "Actif",
		ar: "نشط",
		en: "Active",
		cls: "bg-success/10 text-success border-success/20"
	},
	scheduled: {
		fr: "Programmé",
		ar: "مجدول",
		en: "Scheduled",
		cls: "bg-brand/10 text-brand border-brand/20"
	},
	closed: {
		fr: "Clôturé",
		ar: "مغلق",
		en: "Closed",
		cls: "bg-muted text-muted-foreground border-border"
	}
};
function SurveysPage() {
	const { pick } = useI18n();
	const surveys = useStore((s) => s.surveys);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: pick("Questionnaires scientifiques", "الاستبيانات العلمية", "Scientific Surveys"),
		subtitle: pick("Karasek, Siegrist, COPSOQ, MBI, WHO-5 — outils validés pour mesurer la QVT.", "أدوات علمية معتمدة لقياس جودة الحياة في العمل.", "Validated tools to measure workplace wellbeing."),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			className: "gap-2 gradient-brand text-white border-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }),
				" ",
				pick("Nouveau", "جديد", "New")
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
		children: surveys.map((s, i) => {
			const st = statusMap[s.status];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: i * .05 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5 rounded-2xl hover:shadow-elegant transition-all h-full flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "uppercase tracking-wide text-[10px]",
								children: s.type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: st.cls,
								children: pick(st.fr, st.ar, st.en)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 font-semibold text-base leading-snug",
							children: pick(s.title, s.titleAr, s.titleEn)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5" }), pick("Réponses", "الردود", "Responses")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: [
										s.responseCount,
										"/",
										s.targetCount
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: s.completionRate,
								className: "h-1.5"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "w-3.5 h-3.5" }),
									pick("Clôture", "الإغلاق", "Closes"),
									" · ",
									s.closesAt
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2 pt-3 border-t border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "flex-1",
								children: pick("Résultats", "النتائج", "Results")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								className: "flex-1 gradient-brand text-white border-0",
								children: pick("Gérer", "إدارة", "Manage")
							})]
						})
					]
				})
			}, s.id);
		})
	})] });
}
//#endregion
export { SurveysPage as component };
