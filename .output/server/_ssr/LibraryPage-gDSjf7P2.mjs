import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { Mt as BookOpen, S as Search, gt as CirclePlay, jt as Bookmark } from "../_libs/lucide-react.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-BpC9Zhk0.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LibraryPage-gDSjf7P2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var cats = [
	"all",
	"burnout",
	"ergonomics",
	"anxiety",
	"mindfulness",
	"nutrition",
	"sleep",
	"remote",
	"leadership"
];
function LibraryPage() {
	const { pick, t } = useI18n();
	const content = useStore((s) => s.wellnessContent);
	const toggle = useStore((s) => s.toggleBookmark);
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("all");
	const filtered = content.filter((c) => (cat === "all" || c.category === cat) && (!q || [
		c.title,
		c.titleAr,
		c.description
	].some((v) => v.toLowerCase().includes(q.toLowerCase()))));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Bibliothèque bien-être", "المكتبة الرقمية", "Wellness Library"),
			subtitle: pick("Articles et vidéos pour prendre soin de soi au quotidien.", "مقالات وفيديوهات للاعتناء بنفسك يومياً.", "Articles and videos to care for yourself daily.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col md:flex-row gap-3 mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: t("search"),
					className: "ps-9 rounded-xl"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 flex-wrap mb-6",
			children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setCat(c),
				className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${cat === c ? "gradient-brand text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
				children: c === "all" ? pick("Tous", "الكل", "All") : c
			}, c))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
			children: filtered.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: i * .04 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-2xl overflow-hidden hover:shadow-elegant transition-all group cursor-pointer h-full flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "aspect-video relative overflow-hidden",
						style: { background: c.coverGradient },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center opacity-90",
								children: c.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "w-12 h-12 text-white drop-shadow-lg" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-10 h-10 text-white/90 drop-shadow" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: (e) => {
									e.stopPropagation();
									toggle(c.id);
								},
								className: "absolute top-2 end-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: `w-4 h-4 ${c.isBookmarked ? "fill-brand text-brand" : "text-muted-foreground"}` })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "absolute bottom-2 start-2 bg-white/90 text-ink border-0 text-[10px] uppercase",
								children: c.category
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 flex-1 flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-sm leading-snug",
								children: pick(c.title, c.titleAr, c.title)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground mt-1.5 line-clamp-2 flex-1",
								children: pick(c.description, c.descriptionAr, c.description)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mt-3 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.readTime }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									className: "text-brand h-7 px-2",
									children: [pick("Lire", "قراءة", "Read"), " →"]
								})]
							})
						]
					})]
				})
			}, c.id))
		})
	] });
}
//#endregion
export { LibraryPage as t };
