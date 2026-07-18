import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { x as Send } from "../_libs/lucide-react.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-BpC9Zhk0.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MessagingPage-B7CZzBZi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MessagingPage() {
	const { pick } = useI18n();
	const threads = useStore((s) => s.messageThreads);
	const send = useStore((s) => s.sendMessage);
	const [activeId, setActiveId] = (0, import_react.useState)(threads[0]?.id);
	const [draft, setDraft] = (0, import_react.useState)("");
	const active = threads.find((t) => t.id === activeId);
	const handleSend = () => {
		if (!draft.trim() || !active) return;
		send(active.id, {
			id: crypto.randomUUID(),
			from: "me",
			content: draft,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			isRead: true
		});
		setDraft("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: pick("Messagerie", "المراسلة", "Messaging") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] h-[600px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-e overflow-y-auto",
			children: threads.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setActiveId(t.id),
				className: `w-full text-start p-4 border-b hover:bg-muted/50 transition-colors ${activeId === t.id ? "bg-brand-50" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium text-sm truncate",
							children: t.title
						}), t.unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] bg-danger text-white rounded-full px-1.5 py-0.5",
							children: t.unread
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground mt-1",
						children: t.participant
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground mt-2 truncate",
						children: t.messages[t.messages.length - 1]?.content
					})
				]
			}, t.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col",
			children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold text-sm",
						children: active.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: active.participant
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30",
					children: active.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: `max-w-[75%] rounded-2xl px-4 py-2.5 ${m.from === "me" ? "ms-auto gradient-brand text-white" : "bg-card border"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm",
							children: m.content
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `text-[10px] mt-1 ${m.from === "me" ? "text-white/70" : "text-muted-foreground"}`,
							children: new Date(m.timestamp).toLocaleString()
						})]
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 border-t flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						onKeyDown: (e) => e.key === "Enter" && handleSend(),
						placeholder: pick("Écrire un message…", "اكتب رسالة…", "Write a message…"),
						className: "rounded-xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleSend,
						className: "gradient-brand text-white border-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" })
					})]
				})
			] })
		})]
	})] });
}
//#endregion
export { MessagingPage as t };
