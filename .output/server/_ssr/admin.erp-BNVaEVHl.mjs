import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { O as Plug, W as LoaderCircle, _t as CircleCheck, ct as Database } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion, o as AnimatePresence } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-BpC9Zhk0.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Switch } from "./switch-CCza_WcE.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BQuBX6bn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.erp-BNVaEVHl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var mockRows = [
	{
		emp: "EMP-****",
		dept: "IT",
		turnover: "low",
		absence: "2j",
		qvt: 72,
		stress: 45,
		rec: "Entretien"
	},
	{
		emp: "EMP-****",
		dept: "Marketing",
		turnover: "low",
		absence: "1j",
		qvt: 85,
		stress: 32,
		rec: "—"
	},
	{
		emp: "EMP-****",
		dept: "Finance",
		turnover: "high",
		absence: "5j",
		qvt: 45,
		stress: 78,
		rec: "Intervention immédiate"
	},
	{
		emp: "EMP-****",
		dept: "RH",
		turnover: "low",
		absence: "0j",
		qvt: 91,
		stress: 28,
		rec: "—"
	},
	{
		emp: "EMP-****",
		dept: "Operations",
		turnover: "medium",
		absence: "3j",
		qvt: 58,
		stress: 62,
		rec: "Suivi"
	},
	{
		emp: "EMP-****",
		dept: "IT",
		turnover: "low",
		absence: "2j",
		qvt: 78,
		stress: 40,
		rec: "—"
	},
	{
		emp: "EMP-****",
		dept: "Marketing",
		turnover: "medium",
		absence: "4j",
		qvt: 68,
		stress: 55,
		rec: "Coaching"
	},
	{
		emp: "EMP-****",
		dept: "Finance",
		turnover: "high",
		absence: "6j",
		qvt: 52,
		stress: 71,
		rec: "Réunion managériale"
	},
	{
		emp: "EMP-****",
		dept: "IT",
		turnover: "low",
		absence: "1j",
		qvt: 64,
		stress: 48,
		rec: "—"
	},
	{
		emp: "EMP-****",
		dept: "RH",
		turnover: "low",
		absence: "0j",
		qvt: 82,
		stress: 35,
		rec: "—"
	}
];
function ErpPage() {
	const { pick } = useI18n();
	const [stage, setStage] = (0, import_react.useState)("idle");
	const start = () => {
		setStage("connecting");
		setTimeout(() => setStage("connected"), 2500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Intégration ERP", "ربط أنظمة ERP", "ERP Integration"),
			subtitle: pick("Synchronisez SAP / Oracle avec les indicateurs QVT.", "مزامنة SAP / Oracle مع مؤشرات QVT.", "Sync SAP / Oracle with QVT indicators.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-8 rounded-3xl text-center gradient-hero border-brand/20 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-16 h-16 mx-auto rounded-2xl gradient-brand flex items-center justify-center shadow-elegant mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-8 h-8 text-white" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xl font-bold",
					children: pick("Connectez votre ERP", "اربط نظام ERP", "Connect your ERP")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground max-w-md mx-auto mt-2",
					children: pick("Récupérez turnover, absences et heures pour enrichir l'analyse QVT.", "استرجاع الدوران والغياب والساعات لإثراء تحليل QVT.", "Pull turnover, absence, and hours to enrich QVT analytics.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: start,
					disabled: stage !== "idle",
					className: "mt-5 gradient-brand text-white border-0 gap-2",
					children: [stage === "connecting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : stage === "connected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug, { className: "w-4 h-4" }), stage === "connecting" ? pick("Connexion…", "جاري الاتصال…", "Connecting…") : stage === "connected" ? pick("Connecté avec succès", "تم الاتصال بنجاح", "Connected") : pick("Lancer la synchronisation", "بدء المزامنة", "Start sync")]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: stage === "connected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 16
			},
			animate: {
				opacity: 1,
				y: 0
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-2xl overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-b flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: pick("Données consolidées", "بيانات موحدة", "Consolidated data")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: pick("Dernière sync : il y a 2 minutes", "آخر مزامنة: منذ دقيقتين", "Last sync: 2 minutes ago")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true }),
							" ",
							pick("Sync auto", "مزامنة تلقائية", "Auto sync")
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: pick("Employé", "الموظف", "Employee") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: pick("Dept.", "القسم", "Dept.") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: pick("Turnover", "الدوران", "Turnover") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: pick("Absence", "الغياب", "Absence") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "QVT" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: pick("Stress", "الضغط", "Stress") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: pick("Recommandation IA", "توصية الذكاء الاصطناعي", "AI Recommendation") })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: mockRows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
					initial: {
						opacity: 0,
						x: -8
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: { delay: i * .04 },
					className: "border-b",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-xs",
							children: r.emp
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: r.dept
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: r.turnover === "high" ? "bg-danger/10 text-danger border-0" : r.turnover === "medium" ? "bg-warning/15 text-warning border-0" : "bg-success/10 text-success border-0",
							children: r.turnover
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-sm",
							children: r.absence
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "font-medium",
							children: [r.qvt, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "font-medium",
							children: [r.stress, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-xs",
							children: r.rec
						})
					]
				}, i)) })] })]
			})
		}) })
	] });
}
//#endregion
export { ErpPage as component };
