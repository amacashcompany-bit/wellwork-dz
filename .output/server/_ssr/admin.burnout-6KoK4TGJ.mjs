import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { At as Bot, _t as CircleCheck, i as Users, kt as Building2, l as TriangleAlert, u as TrendingUp } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-BBUarmca.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-CBNkTu1o.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
import { t as Checkbox } from "./checkbox-B1AjkRkB.mjs";
import { c as Area, t as AreaChart, y as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.burnout-6KoK4TGJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sevMap = {
	critical: {
		cls: "bg-danger/10 text-danger border-danger/20",
		dot: "bg-danger",
		label: {
			fr: "Critique",
			ar: "حرج",
			en: "Critical"
		}
	},
	high: {
		cls: "bg-orange-500/10 text-orange-600 border-orange-500/20",
		dot: "bg-orange-500",
		label: {
			fr: "Élevé",
			ar: "مرتفع",
			en: "High"
		}
	},
	medium: {
		cls: "bg-warning/15 text-warning border-warning/25",
		dot: "bg-warning",
		label: {
			fr: "Moyen",
			ar: "متوسط",
			en: "Medium"
		}
	}
};
function BurnoutPage() {
	const { pick } = useI18n();
	const alerts = useStore((s) => s.burnoutAlerts);
	const resolveAlert = useStore((s) => s.resolveAlert);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const active = alerts.filter((a) => a.status === "active");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Moteur IA de détection précoce", "محرك الكشف المبكر بالذكاء الاصطناعي", "AI Early Detection Engine"),
			subtitle: pick("Analyse continue de signaux faibles multi-sources. Alertes uniquement si n ≥ 6 pour préserver l'anonymat.", "تحليل مستمر للمؤشرات الضعيفة. تنبيهات فقط إذا n ≥ 6 لحماية الهوية.", "Continuous analysis of weak signals. Alerts only when n ≥ 6 to preserve anonymity.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				scale: .98
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass rounded-3xl p-6 mb-6 relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 gradient-hero opacity-60 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shadow-elegant",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "w-7 h-7 text-white" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-danger pulse-dot" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wide text-muted-foreground",
									children: pick("Statut du moteur", "حالة المحرك", "Engine Status")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-lg font-bold",
									children: [
										active.length,
										" ",
										pick("alertes actives — surveillance en temps réel", "تنبيهات نشطة — مراقبة لحظية", "active alerts — real-time monitoring")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground mt-1",
									children: pick("Dernière analyse : il y a 2 minutes · Modèle : QVT-BERT v2.1", "آخر تحليل: منذ دقيقتين · النموذج: QVT-BERT v2.1", "Last analysis: 2 min ago · Model: QVT-BERT v2.1")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "bg-brand/10 text-brand border-brand/20",
							children: "v2.1"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
			children: active.map((a, i) => {
				const s = sevMap[a.severity];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i * .06 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5 rounded-2xl hover:shadow-elegant transition-all h-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: `gap-1.5 ${s.cls}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${s.dot}` }), pick(s.label.fr, s.label.ar, s.label.en)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: a.detectedAt
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm text-muted-foreground mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-4 h-4" }),
									" ",
									pick(a.department, a.departmentAr, a.department),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5" }),
									" n=",
									a.populationSize
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-base leading-snug mb-2",
								children: pick(a.title, a.titleAr, a.title)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: pick(a.description, a.descriptionAr, a.description)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-16 -mx-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
									data: a.trend.map((v, idx) => ({
										i: idx,
										v
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: `g-${a.id}`,
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--danger)",
											stopOpacity: .5
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--danger)",
											stopOpacity: 0
										})]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "v",
										stroke: "var(--danger)",
										strokeWidth: 2,
										fill: `url(#g-${a.id})`
									})]
								}) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 mt-4 pt-3 border-t border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "flex-1",
									onClick: () => setSelected(a),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4 me-1.5" }),
										" ",
										pick("Détails", "تفاصيل", "Details")
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "flex-1 gradient-brand text-white border-0",
									onClick: () => {
										resolveAlert(a.id);
										toast.success(pick("Alerte marquée résolue", "تم حل التنبيه", "Alert resolved"));
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 me-1.5" }),
										" ",
										pick("Résoudre", "حل", "Resolve")
									]
								})]
							})
						]
					})
				}, a.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!selected,
			onOpenChange: (o) => !o && setSelected(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
				className: "max-w-2xl rounded-2xl",
				children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5 text-danger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: pick(selected.title, selected.titleAr, selected.title) })]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-muted p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase text-muted-foreground",
										children: pick("Sévérité", "الخطورة", "Severity")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-semibold",
										children: pick(sevMap[selected.severity].label.fr, sevMap[selected.severity].label.ar, sevMap[selected.severity].label.en)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-muted p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase text-muted-foreground",
										children: pick("Département", "القسم", "Department")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-semibold",
										children: pick(selected.department, selected.departmentAr, selected.department)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-muted p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase text-muted-foreground",
										children: pick("Population", "العدد", "Population")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 font-semibold",
										children: ["n = ", selected.populationSize]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold mb-3",
							children: pick("Facteurs contributifs (SHAP)", "العوامل المساهمة (SHAP)", "Contributing factors (SHAP)")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: selected.drivers.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pick(d.label, d.labelAr, d.label) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: [d.weight, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: d.weight,
								className: "h-1.5"
							})] }, d.label))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold mb-3",
							children: pick("Actions recommandées", "الإجراءات الموصى بها", "Recommended actions")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: pick(selected.recommendations, selected.recommendationsAr, selected.recommendations).map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-start gap-3 p-3 rounded-xl border cursor-pointer hover:bg-muted/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: r
								})]
							}, i))
						})] })
					]
				})] })
			})
		})
	] });
}
//#endregion
export { BurnoutPage as component };
