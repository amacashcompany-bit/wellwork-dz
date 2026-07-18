import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-CBNkTu1o.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Slider } from "./slider-lX4rQHvT.mjs";
import { t as Switch } from "./switch-CCza_WcE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.alerts-PZeImNlX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var defaults = [
	{
		key: "sat",
		label: {
			fr: "Satisfaction",
			ar: "الرضا",
			en: "Satisfaction"
		},
		desc: {
			fr: "Alerte si le score chute sous ce seuil.",
			ar: "تنبيه إذا انخفض تحت العتبة.",
			en: "Alert if score drops below."
		},
		current: 78,
		warn: 50,
		danger: 30
	},
	{
		key: "str",
		label: {
			fr: "Stress",
			ar: "الضغط",
			en: "Stress"
		},
		desc: {
			fr: "Alerte si le stress dépasse ce seuil.",
			ar: "تنبيه إذا تجاوز العتبة.",
			en: "Alert if stress exceeds."
		},
		current: 42,
		warn: 60,
		danger: 80,
		invert: true
	},
	{
		key: "bur",
		label: {
			fr: "Risque burn-out",
			ar: "خطر الاحتراق",
			en: "Burnout risk"
		},
		desc: {
			fr: "Alerte selon la probabilité IA.",
			ar: "تنبيه حسب احتمالية الذكاء الاصطناعي.",
			en: "Alert based on AI probability."
		},
		current: 35,
		warn: 50,
		danger: 75,
		invert: true
	},
	{
		key: "par",
		label: {
			fr: "Participation",
			ar: "المشاركة",
			en: "Participation"
		},
		desc: {
			fr: "Alerte si la participation baisse.",
			ar: "تنبيه إذا انخفضت المشاركة.",
			en: "Alert if participation drops."
		},
		current: 85,
		warn: 40,
		danger: 20
	}
];
function AlertsPage() {
	const { pick } = useI18n();
	const [thresholds, setThresholds] = (0, import_react.useState)(defaults);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: pick("Alertes & Seuils", "التنبيهات والعتبات", "Alerts & Thresholds"),
		subtitle: pick("Configurez les niveaux de déclenchement des alertes automatiques.", "اضبط مستويات إطلاق التنبيهات التلقائية.", "Configure trigger levels for automatic alerts.")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
		children: thresholds.map((t, i) => {
			const isCritical = t.invert ? t.current >= t.danger : t.current <= t.danger;
			const isWarn = t.invert ? t.current >= t.warn : t.current <= t.warn;
			const tone = isCritical ? "bg-danger/10 text-danger" : isWarn ? "bg-warning/15 text-warning" : "bg-success/10 text-success";
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
					className: "p-5 rounded-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: pick(t.label.fr, t.label.ar, t.label.en)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground mt-0.5 max-w-md",
								children: pick(t.desc.fr, t.desc.ar, t.desc.en)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: `${tone} border-0`,
								children: [t.current, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								value: [t.warn, t.danger],
								min: 0,
								max: 100,
								step: 1,
								onValueChange: (v) => setThresholds((s) => s.map((x) => x.key === t.key ? {
									...x,
									warn: v[0],
									danger: v[1]
								} : x)),
								className: "my-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-warning font-medium",
										children: [
											pick("Vigilance", "مراقبة", "Watch"),
											" : ",
											t.warn
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-danger font-medium",
										children: [
											pick("Critique", "حرج", "Critical"),
											" : ",
											t.danger
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "100" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-4 border-t border-border/60 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [pick("Dernière alerte", "آخر تنبيه", "Last alert"), " : 2026-07-08"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true }),
									" ",
									pick("Actif", "نشط", "Active")
								]
							})]
						})
					]
				})
			}, t.key);
		})
	})] });
}
//#endregion
export { AlertsPage as component };
