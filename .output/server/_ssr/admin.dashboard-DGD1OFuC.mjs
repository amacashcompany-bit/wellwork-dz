import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { $ as HeartHandshake, Ft as ArrowUpRight, Lt as ArrowDownRight, Rt as Activity, d as TrendingDown, i as Users } from "../_libs/lucide-react.mjs";
import { n as useStore, t as rpsFactors } from "./useStore-BJ-X0o7y.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion, i as useMotionValue, r as useTransform, t as animate } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-BpC9Zhk0.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { _ as PolarGrid, a as LineChart, b as Tooltip, c as Area, d as ReferenceLine, f as Bar, g as PolarRadiusAxis, h as PolarAngleAxis, i as BarChart, l as Line, m as Pie, n as RadarChart, o as YAxis, p as Radar, r as PieChart, s as XAxis, t as AreaChart, u as CartesianGrid, v as Cell, x as Legend, y as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dashboard-DGD1OFuC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var toneMap = {
	brand: {
		bg: "bg-brand/10",
		text: "text-brand",
		stroke: "var(--brand)"
	},
	success: {
		bg: "bg-success/10",
		text: "text-success",
		stroke: "var(--success)"
	},
	warning: {
		bg: "bg-warning/15",
		text: "text-warning",
		stroke: "var(--warning)"
	},
	danger: {
		bg: "bg-danger/10",
		text: "text-danger",
		stroke: "var(--danger)"
	},
	muted: {
		bg: "bg-muted",
		text: "text-muted-foreground",
		stroke: "var(--muted-foreground)"
	}
};
function KpiCard({ icon: Icon, label, value, suffix = "", change, tone = "brand", spark }) {
	const t = toneMap[tone];
	const [display, setDisplay] = (0, import_react.useState)(0);
	const mv = useMotionValue(0);
	const rounded = useTransform(mv, (v) => Math.round(v));
	(0, import_react.useEffect)(() => {
		const controls = animate(mv, value, {
			duration: 1.2,
			ease: [
				.25,
				.46,
				.45,
				.94
			]
		});
		const unsub = rounded.on("change", (v) => setDisplay(v));
		return () => {
			controls.stop();
			unsub();
		};
	}, [
		value,
		mv,
		rounded
	]);
	const data = (spark ?? [
		3,
		5,
		4,
		6,
		8,
		7,
		9
	]).map((v, i) => ({
		i,
		v
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 16
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .4 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5 rounded-2xl border-slate-200/60 hover:shadow-elegant transition-all duration-300 relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `w-11 h-11 rounded-2xl ${t.bg} flex items-center justify-center`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `w-5 h-5 ${t.text}` })
					}), typeof change === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center gap-0.5 text-xs font-medium ${change >= 0 ? "text-success" : "text-danger"}`,
						children: [
							change >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "w-3.5 h-3.5" }),
							change > 0 ? "+" : "",
							change,
							"%"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground uppercase tracking-wide",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 text-3xl font-bold tracking-tight",
					children: [display, suffix]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-10 -mx-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineChart, {
							data,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "v",
								stroke: t.stroke,
								strokeWidth: 2,
								dot: false
							})
						})
					})
				})
			]
		})
	});
}
function ChartCard({ title, children, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 16
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .4,
			delay
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5 rounded-2xl border-slate-200/60 h-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold mb-4",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-64",
				children
			})]
		})
	});
}
var tooltipStyle = {
	contentStyle: {
		background: "var(--primary)",
		border: "none",
		borderRadius: 12,
		color: "white",
		fontSize: 12
	},
	labelStyle: { color: "rgba(255,255,255,0.7)" },
	itemStyle: { color: "white" }
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
		fill: d.stressLevel > 70 ? "var(--danger)" : d.stressLevel > 55 ? "#f97316" : d.stressLevel > 40 ? "var(--warning)" : "var(--success)"
	}));
	const rpsData = rpsFactors.map((f) => ({
		factor: pick(f.factor, f.factorAr, f.factor),
		current: f.current,
		benchmark: f.benchmark
	}));
	const pieData = [
		{
			name: pick("Normal", "طبيعي", "Normal"),
			value: 58,
			fill: "var(--success)"
		},
		{
			name: pick("Vigilance", "مراقبة", "Watch"),
			value: 24,
			fill: "var(--warning)"
		},
		{
			name: pick("Préoccupant", "مقلق", "Concerning"),
			value: 12,
			fill: "#f97316"
		},
		{
			name: pick("Critique", "حرج", "Critical"),
			value: 6,
			fill: "var(--danger)"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Tableau de bord exécutif", "لوحة التحكم التنفيذية", "Executive Dashboard"),
			subtitle: pick("Vue temps réel de la qualité de vie au travail et des risques psychosociaux.", "عرض لحظي لجودة الحياة في العمل والمخاطر النفسية والاجتماعية.", "Real-time view of workplace wellbeing and psychosocial risks.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: HeartHandshake,
					label: t("kpiSatisfaction"),
					value: kpi.satisfaction,
					suffix: "%",
					change: kpi.satisfactionChange,
					tone: "success",
					spark: [
						65,
						68,
						70,
						72,
						74,
						76,
						78
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Activity,
					label: t("kpiStress"),
					value: kpi.stress,
					suffix: "%",
					change: kpi.stressChange,
					tone: "warning",
					spark: [
						55,
						52,
						48,
						46,
						44,
						43,
						42
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: Users,
					label: t("kpiParticipation"),
					value: kpi.participation,
					suffix: "%",
					change: kpi.participationChange,
					tone: "brand",
					spark: [
						60,
						66,
						70,
						76,
						80,
						83,
						85
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					icon: TrendingDown,
					label: t("kpiTurnover"),
					value: kpi.turnover,
					suffix: "%",
					tone: "muted",
					spark: [
						8,
						7.5,
						7,
						6.8,
						6.6,
						6.4,
						6.3
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: t("qvtEvolution"),
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: chartData,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: monthKey,
								stroke: "var(--muted-foreground)",
								fontSize: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "var(--muted-foreground)",
								fontSize: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltipStyle }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 11 } }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "satisfaction",
								stroke: "var(--brand)",
								strokeWidth: 2.5,
								dot: { r: 3 },
								name: pick("Satisfaction", "الرضا", "Satisfaction")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "stress",
								stroke: "var(--warning)",
								strokeWidth: 2.5,
								dot: { r: 3 },
								name: pick("Stress", "الضغط", "Stress")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "participation",
								stroke: "var(--success)",
								strokeWidth: 2.5,
								dot: { r: 3 },
								name: pick("Participation", "المشاركة", "Participation")
							})
						]
					}) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: t("stressByDept"),
					delay: .2,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: deptData,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								stroke: "var(--muted-foreground)",
								fontSize: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "var(--muted-foreground)",
								fontSize: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltipStyle }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "stress",
								radius: [
									8,
									8,
									0,
									0
								],
								children: deptData.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, i))
							})
						]
					}) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: t("psRisks"),
					delay: .3,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
						data: rpsData,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "var(--border)" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
								dataKey: "factor",
								fontSize: 10,
								stroke: "var(--muted-foreground)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarRadiusAxis, {
								angle: 90,
								domain: [0, 100],
								fontSize: 9,
								stroke: "var(--muted-foreground)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
								name: "Benchmark",
								dataKey: "benchmark",
								stroke: "var(--muted-foreground)",
								fill: "var(--muted-foreground)",
								fillOpacity: .15
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
								name: "Current",
								dataKey: "current",
								stroke: "var(--brand)",
								fill: "var(--brand)",
								fillOpacity: .45
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltipStyle })
						]
					}) })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: t("burnoutTrend"),
					delay: .35,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: chartData,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "burnGrad",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "5%",
									stopColor: "var(--danger)",
									stopOpacity: .5
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "95%",
									stopColor: "var(--danger)",
									stopOpacity: 0
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: monthKey,
								stroke: "var(--muted-foreground)",
								fontSize: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "var(--muted-foreground)",
								fontSize: 11,
								domain: [0, 100]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltipStyle }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								y: 25,
								stroke: "var(--warning)",
								strokeDasharray: "4 4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								y: 50,
								stroke: "var(--danger)",
								strokeDasharray: "4 4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "burnoutRisk",
								stroke: "var(--danger)",
								fill: "url(#burnGrad)",
								strokeWidth: 2.5
							})
						]
					}) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: t("severityDist"),
					delay: .4,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
							data: pieData,
							innerRadius: 55,
							outerRadius: 90,
							paddingAngle: 3,
							dataKey: "value",
							children: pieData.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltipStyle }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 11 } })
					] }) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .4,
						delay: .45
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5 rounded-2xl h-full gradient-hero border-brand/20 flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-wide text-brand font-semibold",
								children: pick("Focus IA", "ذكاء اصطناعي", "AI Focus")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-lg font-semibold leading-snug",
								children: pick("3 signaux faibles nécessitent votre attention cette semaine.", "3 مؤشرات ضعيفة تحتاج انتباهك هذا الأسبوع.", "3 weak signals need your attention this week.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-2 text-sm flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-danger pulse-dot" }),
											" Finance — ",
											pick("pic de stress", "ارتفاع الضغط", "stress spike")
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-orange-500" }),
											" IT — ",
											pick("fatigue cognitive", "إجهاد ذهني", "cognitive fatigue")
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-warning" }),
											" Ops — ",
											pick("baisse reconnaissance", "تراجع التقدير", "recognition drop")
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/admin/burnout",
								className: "mt-4 text-sm font-medium text-brand hover:underline",
								children: [pick("Ouvrir le moteur IA", "افتح محرك الذكاء الاصطناعي", "Open AI engine"), " →"]
							})
						]
					})
				})
			]
		})
	] });
}
//#endregion
export { Dashboard as component };
