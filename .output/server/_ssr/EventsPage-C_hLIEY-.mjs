import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { B as MapPin, Dt as CalendarDays, dt as Clock, i as Users } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-BpC9Zhk0.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/EventsPage-C_hLIEY-.js
var import_jsx_runtime = require_jsx_runtime();
var typeMap = {
	workshop: {
		fr: "Atelier",
		ar: "ورشة",
		en: "Workshop",
		cls: "bg-brand/10 text-brand"
	},
	training: {
		fr: "Formation",
		ar: "تكوين",
		en: "Training",
		cls: "bg-primary/10 text-primary"
	},
	wellness: {
		fr: "Bien-être",
		ar: "رفاهية",
		en: "Wellness",
		cls: "bg-success/10 text-success"
	},
	awareness: {
		fr: "Sensibilisation",
		ar: "توعية",
		en: "Awareness",
		cls: "bg-warning/15 text-warning"
	}
};
function EventsPage() {
	const { pick, t } = useI18n();
	const events = useStore((s) => s.events);
	const register = useStore((s) => s.registerForEvent);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: pick("Événements & formations", "الفعاليات والتكوين", "Events & Training"),
		subtitle: pick("Ateliers santé mentale, formations RPS, séances bien-être.", "ورش الصحة النفسية والتكوينات وجلسات الرفاهية.", "Mental health workshops, RPS training, wellness sessions.")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
		children: events.map((e, i) => {
			const type = typeMap[e.type];
			const full = e.registered >= e.capacity;
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: `${type.cls} border-0 self-start`,
							children: pick(type.fr, type.ar, type.en)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 font-semibold text-base leading-snug",
							children: pick(e.title, e.titleAr, e.title)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1 flex-1",
							children: e.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-1.5 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "w-3.5 h-3.5" }),
										" ",
										e.date
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }),
										" ",
										e.time
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5" }),
										" ",
										pick(e.location, e.locationAr, e.location)
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-3.5 h-3.5" }),
										" ",
										e.registered,
										"/",
										e.capacity
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: [Math.round(e.registered / e.capacity * 100), "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: e.registered / e.capacity * 100,
								className: "h-1.5"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: full,
							onClick: () => {
								register(e.id);
								toast.success(pick("Inscription confirmée !", "تم التسجيل!", "Registration confirmed!"));
							},
							className: "mt-4 gradient-brand text-white border-0",
							children: full ? pick("Complet", "مكتمل", "Full") : t("register")
						})
					]
				})
			}, e.id);
		})
	})] });
}
//#endregion
export { EventsPage as t };
