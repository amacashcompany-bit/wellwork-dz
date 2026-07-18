import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Ot as CalendarClock } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-BpC9Zhk0.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
import { t as Checkbox } from "./checkbox-B1AjkRkB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.actions-1xHeExih.js
var import_jsx_runtime = require_jsx_runtime();
var statusMap = {
	completed: {
		fr: "Terminé",
		ar: "مكتمل",
		en: "Completed",
		cls: "bg-success/10 text-success"
	},
	in_progress: {
		fr: "En cours",
		ar: "قيد التنفيذ",
		en: "In progress",
		cls: "bg-warning/15 text-warning"
	},
	pending: {
		fr: "En attente",
		ar: "معلّق",
		en: "Pending",
		cls: "bg-muted text-muted-foreground"
	}
};
function ActionsPage() {
	const { pick } = useI18n();
	const plans = useStore((s) => s.actionPlans);
	const update = useStore((s) => s.updateActionPlan);
	const completed = plans.filter((p) => p.status === "completed").length;
	const overall = Math.round(completed / plans.length * 100);
	const toggle = (id, current) => {
		const next = current === "completed" ? "pending" : "completed";
		update(id, {
			status: next,
			progress: next === "completed" ? 100 : 0
		});
		toast.success(pick("Action mise à jour", "تم تحديث الإجراء", "Action updated"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Plans d'action préventifs", "خطط العمل الوقائية", "Preventive Action Plans"),
			subtitle: pick("Suivi centralisé des mesures QVT en cours et à venir.", "متابعة موحّدة للإجراءات الجارية والقادمة.", "Central tracking of ongoing and upcoming QVT measures.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5 rounded-2xl mb-6 gradient-hero border-brand/20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-wide text-brand font-semibold",
					children: pick("Progression globale", "التقدم العام", "Overall progress")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-2xl font-bold",
					children: [
						completed,
						" / ",
						plans.length,
						" ",
						pick("complétées", "مكتملة", "completed")
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-4xl font-bold text-brand",
					children: [overall, "%"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: overall,
				className: "h-2"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: plans.map((p, i) => {
				const st = statusMap[p.status];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						x: -8
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: { delay: i * .04 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-4 rounded-2xl hover:shadow-elegant transition-all",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: p.status === "completed",
									onCheckedChange: () => toggle(p.id, p.status),
									className: "mt-1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `font-semibold ${p.status === "completed" ? "line-through text-muted-foreground" : ""}`,
													children: pick(p.title, p.titleAr, p.title)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: "text-[10px] uppercase",
													children: p.category
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													className: `${st.cls} border-0 text-[10px]`,
													children: pick(st.fr, st.ar, st.en)
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground mt-1",
											children: pick(p.description, p.descriptionAr, p.description)
										}),
										p.status === "in_progress" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 max-w-md",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
												value: p.progress,
												className: "h-1.5"
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-end gap-2 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.assigneeAvatar,
										alt: "",
										className: "w-8 h-8 rounded-full bg-muted"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "w-3 h-3" }), p.dueDate]
									})]
								})
							]
						})
					})
				}, p.id);
			})
		})
	] });
}
//#endregion
export { ActionsPage as component };
