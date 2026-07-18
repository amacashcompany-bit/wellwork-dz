import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { At as Bot, W as LoaderCircle, _ as ShieldCheck, _t as CircleCheck, ct as Database, i as Users, k as Play, kt as Building2, l as TriangleAlert, m as Sparkles, u as TrendingUp } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-BBUarmca.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-CBNkTu1o.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
import { t as Checkbox } from "./checkbox-B1AjkRkB.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BwF_b_eS.mjs";
import { t as createSsrRpc } from "./createSsrRpc-DyMO587P.mjs";
import { c as Area, t as AreaChart, y as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.burnout-CdScAjV0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function validateRequest(value) {
	if (!value || typeof value !== "object") throw new Error("Invalid analysis request.");
	const candidate = value;
	if (typeof candidate.spaceId !== "string" || !candidate.spaceId.trim()) throw new Error("A company space is required.");
	if (candidate.locale !== "fr" && candidate.locale !== "ar" && candidate.locale !== "en") throw new Error("Invalid language.");
	return {
		spaceId: candidate.spaceId,
		locale: candidate.locale
	};
}
function validateResolveRequest(value) {
	const base = validateRequest(value);
	const candidate = value;
	if (typeof candidate.alertId !== "string" || !candidate.alertId) throw new Error("Invalid alert.");
	return {
		...base,
		alertId: candidate.alertId
	};
}
var getBurnoutResults = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator(validateRequest).handler(createSsrRpc("6d1773d538bad7cf9b83304348952d2c04b0dade706c2463076d4f1ebba70bd2"));
var runBurnoutAnalysis = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator(validateRequest).handler(createSsrRpc("058bf6547f500f9ac7b8c1b768beea1fb5662f8e937aa9f620bb2f7c90626096"));
var resolveBurnoutAlert = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator(validateResolveRequest).handler(createSsrRpc("910c7c79dd001c73fda815fcf58f935ad4743214656499eb406443326118de0a"));
var severityStyle = {
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
			fr: "Eleve",
			ar: "مرتفع",
			en: "High"
		}
	},
	medium: {
		cls: "bg-warning/15 text-warning border-warning/25",
		dot: "bg-warning",
		label: {
			fr: "Vigilance",
			ar: "مراقبة",
			en: "Watch"
		}
	}
};
function errorMessage(error, fallback) {
	return error instanceof Error && error.message ? error.message : fallback;
}
function BurnoutPage() {
	const { language, pick } = useI18n();
	const { info, loading: spaceLoading } = useMySpace();
	const [alerts, setAlerts] = (0, import_react.useState)([]);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [resolvingId, setResolvingId] = (0, import_react.useState)(null);
	const [loadError, setLoadError] = (0, import_react.useState)(null);
	const [analysisMeta, setAnalysisMeta] = (0, import_react.useState)(null);
	const activeAlerts = alerts.filter((alert) => alert.status !== "resolved");
	const latestAt = activeAlerts[0]?.analyzedAt;
	const load = (0, import_react.useCallback)(async () => {
		if (!info?.spaceId) return;
		setLoading(true);
		setLoadError(null);
		try {
			const result = await getBurnoutResults({ data: {
				spaceId: info.spaceId,
				locale: language
			} });
			setAlerts(result.alerts.filter((alert) => alert.status !== "resolved"));
		} catch (error) {
			setLoadError(errorMessage(error, language === "ar" ? "تعذر تحميل التحليلات." : language === "en" ? "Unable to load analyses." : "Impossible de charger les analyses."));
		} finally {
			setLoading(false);
		}
	}, [info?.spaceId, language]);
	(0, import_react.useEffect)(() => {
		if (!spaceLoading && info?.spaceId) load();
	}, [
		spaceLoading,
		info?.spaceId,
		load
	]);
	const runAnalysis = async () => {
		if (!info?.spaceId || running) return;
		setRunning(true);
		setLoadError(null);
		try {
			const result = await runBurnoutAnalysis({ data: {
				spaceId: info.spaceId,
				locale: language
			} });
			setAlerts(result.alerts);
			setAnalysisMeta({
				groupsAnalyzed: result.groupsAnalyzed,
				groupsBelowMinimum: Math.max(0, result.groupsBelowMinimum),
				source: result.source
			});
			if (result.groupsAnalyzed === 0) toast.info(pick("Pas encore assez de reponses anonymes (minimum 6 par groupe).", "لا توجد ردود مجهولة كافية بعد (الحد الأدنى 6 لكل مجموعة).", "Not enough anonymous responses yet (minimum 6 per group)."));
			else if (result.alerts.length === 0) toast.success(pick("Analyse terminee : aucun signal au-dessus du seuil de vigilance.", "اكتمل التحليل: لا توجد إشارة فوق حد المراقبة.", "Analysis complete: no signal is above the watch threshold."));
			else toast.success(pick(`${result.alerts.length} signal(aux) de prevention detecte(s).`, `تم اكتشاف ${result.alerts.length} إشارة وقائية.`, `${result.alerts.length} prevention signal(s) detected.`));
		} catch (error) {
			const message = errorMessage(error, pick("L'analyse a echoue.", "فشل التحليل.", "Analysis failed."));
			setLoadError(message);
			toast.error(message);
		} finally {
			setRunning(false);
		}
	};
	const resolveAlert = async (alert) => {
		if (!info?.spaceId || resolvingId) return;
		setResolvingId(alert.id);
		try {
			await resolveBurnoutAlert({ data: {
				spaceId: info.spaceId,
				alertId: alert.id,
				locale: language
			} });
			setAlerts((current) => current.filter((item) => item.id !== alert.id));
			setSelected(null);
			toast.success(pick("Alerte resolue.", "تم حل التنبيه.", "Alert resolved."));
		} catch (error) {
			toast.error(errorMessage(error, pick("Action impossible.", "تعذر تنفيذ الإجراء.", "Action failed.")));
		} finally {
			setResolvingId(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Analyse preventive du risque burn-out", "التحليل الوقائي لمخاطر الاحتراق الوظيفي", "Preventive burn-out risk analysis"),
			subtitle: pick("Analyse des reponses anonymes et indicateurs collectifs. Resultats affiches uniquement pour n >= 6.", "تحليل الردود المجهولة والمؤشرات الجماعية. تظهر النتائج فقط عندما يكون العدد 6 أو أكثر.", "Analysis of anonymous responses and team indicators. Results appear only when n >= 6."),
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: runAnalysis,
				disabled: running || loading || !info?.spaceId,
				className: "gradient-brand text-white border-0 gap-2",
				children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }), pick("Lancer l'analyse", "بدء التحليل", "Run analysis")]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6 overflow-hidden border-brand/15 p-5 sm:p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5 sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 w-12 shrink-0 place-items-center rounded-lg gradient-brand shadow-sm",
						children: running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-6 w-6 text-white" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase text-muted-foreground",
								children: pick("Etat de l'analyse", "حالة التحليل", "Analysis status")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-lg font-bold",
								children: running ? pick("Analyse des agregats en cours...", "جارٍ تحليل البيانات المجمعة...", "Analyzing aggregates...") : pick(`${activeAlerts.length} signal(aux) actif(s)`, `${activeAlerts.length} إشارة نشطة`, `${activeAlerts.length} active signal(s)`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: latestAt ? `${pick("Derniere analyse", "آخر تحليل", "Last analysis")}: ${new Date(latestAt).toLocaleString(language)}` : pick("Aucune analyse enregistree. Lancez la premiere analyse lorsque les reponses sont disponibles.", "لا يوجد تحليل مسجل. ابدأ التحليل الأول عند توفر الردود.", "No saved analysis. Run the first analysis when responses are available.")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "gap-1.5 border-success/25 text-success",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), pick("Anonymat n >= 6", "مجهولية n >= 6", "Anonymous n >= 6")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-3.5 w-3.5" }), analysisMeta?.source === "atomesus" ? "Atomesus + score" : pick("Score statistique", "درجة إحصائية", "Statistical score")]
						})]
					})
				]
			})
		}),
		loadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6 border-danger/30 bg-danger/5 p-4 text-sm text-danger",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children: loadError
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: load,
						children: pick("Reessayer", "إعادة المحاولة", "Retry")
					})
				]
			})
		}),
		analysisMeta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap gap-2 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					pick("Groupes analyses", "المجموعات المحللة", "Groups analyzed"),
					":",
					" ",
					analysisMeta.groupsAnalyzed
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "•"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					pick("Masques par anonymat", "مخفية لحماية الهوية", "Hidden for anonymity"),
					":",
					" ",
					analysisMeta.groupsBelowMinimum
				] })
			]
		}),
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid min-h-56 place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-7 w-7 animate-spin text-brand" })
		}) : activeAlerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "grid min-h-64 place-items-center border-dashed p-8 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-12 w-12 place-items-center rounded-lg bg-success/10 text-success",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-lg font-semibold",
						children: pick("Aucun signal actif", "لا توجد إشارة نشطة", "No active signal")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: pick("Cela signifie qu'aucun groupe eligible ne depasse le seuil, ou qu'il n'y a pas encore six reponses anonymes. Ce resultat n'est pas un diagnostic.", "هذا يعني أنه لا توجد مجموعة مؤهلة تتجاوز الحد، أو أنه لا توجد ستة ردود مجهولة بعد. هذه النتيجة ليست تشخيصاً.", "No eligible group is above the threshold, or six anonymous responses are not available yet. This result is not a diagnosis.")
					})
				]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 lg:grid-cols-2",
			children: activeAlerts.map((alert, index) => {
				const style = severityStyle[alert.severity];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: index * .05 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex h-full flex-col p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: `gap-1.5 ${style.cls}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${style.dot}` }), pick(style.label.fr, style.label.ar, style.label.en)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xl font-bold",
										children: [alert.score, "/100"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] text-muted-foreground",
										children: [
											pick("Confiance", "الثقة", "Confidence"),
											" ",
											alert.confidence,
											"%"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center gap-2 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" }),
									" ",
									alert.department,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5" }),
									" n=",
									alert.populationSize
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold",
								children: alert.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 flex-1 text-sm text-muted-foreground",
								children: alert.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-16",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
										data: alert.trend.map((value, itemIndex) => ({
											itemIndex,
											value
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: `risk-${alert.id}`,
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "var(--danger)",
												stopOpacity: .4
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "var(--danger)",
												stopOpacity: 0
											})]
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											type: "monotone",
											dataKey: "value",
											stroke: "var(--danger)",
											strokeWidth: 2,
											fill: `url(#risk-${alert.id})`
										})]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex gap-2 border-t border-border/60 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "flex-1",
									onClick: () => setSelected(alert),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "me-1.5 h-4 w-4" }), pick("Details", "التفاصيل", "Details")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "flex-1 gradient-brand text-white border-0",
									disabled: resolvingId === alert.id,
									onClick: () => resolveAlert(alert),
									children: [resolvingId === alert.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "me-1.5 h-4 w-4" }), pick("Resoudre", "حل", "Resolve")]
								})]
							})
						]
					})
				}, alert.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!selected,
			onOpenChange: (open) => !open && setSelected(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
				className: "max-w-2xl",
				children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-brand" }), selected.title]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-muted p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase text-muted-foreground",
										children: pick("Score", "الدرجة", "Score")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 font-semibold",
										children: [selected.score, "/100"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-muted p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase text-muted-foreground",
										children: pick("Confiance", "الثقة", "Confidence")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 font-semibold",
										children: [selected.confidence, "%"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-muted p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase text-muted-foreground",
										children: pick("Population", "العدد", "Population")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 font-semibold",
										children: ["n=", selected.populationSize]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 text-sm font-semibold",
							children: pick("Facteurs contributifs agreges", "العوامل المجمعة المساهمة", "Aggregated contributing factors")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: selected.drivers.map((driver) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: driver.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: [driver.weight, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: driver.weight,
								className: "h-1.5"
							})] }, driver.label))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 text-sm font-semibold",
							children: pick("Actions recommandees", "الإجراءات الموصى بها", "Recommended actions")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: selected.recommendations.map((recommendation, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-start gap-3 border p-3 hover:bg-muted/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: recommendation
								})]
							}, `${selected.id}-${index}`))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-start gap-2 border-t pt-4 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), pick("Outil de prevention collectif. Ne remplace pas l'evaluation d'un professionnel de sante au travail.", "أداة وقاية جماعية ولا تحل محل تقييم مختص في الصحة المهنية.", "Team prevention tool. It does not replace an occupational-health professional's assessment.")]
						})
					]
				})] })
			})
		})
	] });
}
//#endregion
export { BurnoutPage as component };
