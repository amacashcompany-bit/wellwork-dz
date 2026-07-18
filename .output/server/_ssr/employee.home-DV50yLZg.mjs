import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ScrollText, Et as Calendar, L as MessageSquare, Mt as BookOpen, m as Sparkles } from "../_libs/lucide-react.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-BpC9Zhk0.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as AnonymousBanner } from "./AnonymousBanner-BhemzUXk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.home-DV50yLZg.js
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	const { pick } = useI18n();
	const events = useStore((s) => s.events).slice(0, 3);
	const content = useStore((s) => s.wellnessContent).slice(0, 3);
	const quickActions = [
		{
			to: "/employee/surveys",
			icon: ScrollText,
			label: pick("Faire mon pulse", "أكمل النبض", "Complete pulse"),
			tone: "gradient-brand"
		},
		{
			to: "/employee/feedback",
			icon: MessageSquare,
			label: pick("Feedback anonyme", "رأي مجهول", "Anonymous feedback"),
			tone: "bg-primary"
		},
		{
			to: "/employee/library",
			icon: BookOpen,
			label: pick("Bibliothèque", "المكتبة", "Library"),
			tone: "bg-success"
		},
		{
			to: "/employee/events",
			icon: Calendar,
			label: pick("Événements", "الفعاليات", "Events"),
			tone: "bg-warning"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Bonjour 👋", "مرحباً 👋", "Hello 👋"),
			subtitle: pick("Votre espace confidentiel pour parler du travail, en toute sécurité.", "فضاؤك السري للحديث عن العمل بأمان.", "Your confidential space to talk about work, safely.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnonymousBanner, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 12
			},
			animate: {
				opacity: 1,
				y: 0
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-3xl p-6 md:p-8 mb-6 gradient-hero border-brand/20 relative overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "bg-brand/15 text-brand border-brand/20 gap-1 mb-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3" }),
								" ",
								pick("Nouveau pulse disponible", "نبض جديد متاح", "New pulse available")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl md:text-3xl font-bold leading-tight",
							children: pick("3 minutes pour être entendu·e", "3 دقائق ليُسمع صوتك", "3 minutes to be heard")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: pick("Votre voix compte. Répondez en toute confidentialité.", "صوتك مهم. أجب بكل سرية.", "Your voice matters. Reply confidentially.")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/employee/surveys",
							className: "inline-flex mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "gradient-brand text-white border-0 gap-2 h-11 px-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "w-4 h-4" }),
									" ",
									pick("Commencer", "ابدأ", "Start")
								]
							})
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-8",
			children: quickActions.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: i * .05 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: a.to,
					className: "block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: `p-4 rounded-2xl ${a.tone} text-white border-0 hover:scale-[1.02] transition-transform h-full`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { className: "w-6 h-6 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: a.label
						})]
					})
				})
			}, a.to))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold mb-3",
				children: pick("Événements à venir", "الفعاليات القادمة", "Upcoming events")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4 rounded-2xl flex items-center gap-4 hover:shadow-elegant transition-all",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-14 h-14 rounded-xl gradient-brand text-white flex flex-col items-center justify-center shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase leading-none",
							children: e.date.split("-")[1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-bold leading-none mt-0.5",
							children: e.date.split("-")[2]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium text-sm truncate",
							children: pick(e.title, e.titleAr, e.title)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: [
								e.time,
								" · ",
								pick(e.location, e.locationAr, e.location)
							]
						})]
					})]
				}, e.id))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold mb-3",
				children: pick("Sélection bien-être", "مختارات الرفاهية", "Wellness picks")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: content.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-3 rounded-2xl flex items-center gap-3 hover:shadow-elegant transition-all",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-14 h-14 rounded-xl shrink-0",
						style: { background: c.coverGradient }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium text-sm truncate",
							children: pick(c.title, c.titleAr, c.title)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: [
								c.readTime,
								" · ",
								c.type
							]
						})]
					})]
				}, c.id))
			})] })]
		})
	] });
}
//#endregion
export { HomePage as component };
