import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { L as MessageSquare, W as LoaderCircle, g as ShieldQuestionMark, x as Send } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-BpC9Zhk0.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { n as encryptWithKey, t as decryptWithKey } from "./anonymity-C8KBXwWg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.anonymous-C2F6hHuz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnonymousPage() {
	const { pick } = useI18n();
	const { info } = useMySpace();
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [decrypted, setDecrypted] = (0, import_react.useState)({});
	const [messages, setMessages] = (0, import_react.useState)({});
	const [decryptedMessages, setDecryptedMessages] = (0, import_react.useState)({});
	const [replyText, setReplyText] = (0, import_react.useState)({});
	const [replying, setReplying] = (0, import_react.useState)({});
	const loadData = async () => {
		if (!info?.spaceId) return;
		try {
			const { data: ticketsData } = await supabase.from("feedback_tickets").select("*").eq("space_id", info.spaceId).order("created_at", { ascending: false });
			const ticketRows = ticketsData ?? [];
			setTickets(ticketRows);
			const { data: messagesData } = await supabase.from("ticket_messages").select("*").eq("space_id", info.spaceId).order("created_at", { ascending: true });
			const msgs = messagesData ?? [];
			const msgMap = {};
			msgs.forEach((m) => {
				if (!msgMap[m.ticket_id]) msgMap[m.ticket_id] = [];
				msgMap[m.ticket_id].push(m);
			});
			setMessages(msgMap);
			const decMap = {};
			await Promise.all(ticketRows.map(async (t) => {
				const [subject, body] = await Promise.all([decryptWithKey(t.encrypted_subject, info.spaceId), decryptWithKey(t.encrypted_content, info.spaceId)]);
				decMap[t.id] = {
					subject: subject || "Contenu illisible (chiffrement hérité)",
					body: body || "Ce message a été chiffré avec une ancienne clé de suivi."
				};
			}));
			setDecrypted(decMap);
			const decMsgs = {};
			await Promise.all(msgs.map(async (m) => {
				decMsgs[m.id] = await decryptWithKey(m.encrypted_content, info.spaceId);
			}));
			setDecryptedMessages(decMsgs);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, [info?.spaceId]);
	const filtered = tickets.filter((t) => filter === "all" || t.status === filter);
	const updateStatus = async (id, status) => {
		const { error } = await supabase.from("feedback_tickets").update({ status }).eq("id", id);
		if (error) return toast.error(error.message);
		setTickets((ts) => ts.map((t) => t.id === id ? {
			...t,
			status
		} : t));
		toast.success("Statut mis à jour");
	};
	const handleSendReply = async (ticketId) => {
		const text = replyText[ticketId]?.trim();
		if (!text || !info?.spaceId) return;
		setReplying((r) => ({
			...r,
			[ticketId]: true
		}));
		try {
			const encReply = await encryptWithKey(text, info.spaceId);
			const { error } = await supabase.from("ticket_messages").insert({
				ticket_id: ticketId,
				space_id: info.spaceId,
				author_role: "hr",
				encrypted_content: encReply
			});
			if (error) throw error;
			toast.success("Réponse envoyée");
			setReplyText((r) => ({
				...r,
				[ticketId]: ""
			}));
			await loadData();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Erreur");
		} finally {
			setReplying((r) => ({
				...r,
				[ticketId]: false
			}));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Espace anonyme — modération RH", "الفضاء المجهول — الإدارة", "Anonymous Space — HR"),
			subtitle: pick("Signalements chiffrés par espace. Tous les messages sont déchiffrés automatiquement pour votre espace de travail.", "بلاغات مشفرة حسب الفضاء. يتم فك تشفير جميع الرسائل تلقائياً لمساحة عملك.", "Space-encrypted reports. All messages are automatically decrypted for your workspace.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
			value: filter,
			onValueChange: (v) => setFilter(v),
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: "all",
					children: [
						"Tous (",
						tickets.length,
						")"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "open",
					children: "Ouverts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "resolved",
					children: "Résolus"
				})
			] })
		}),
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin text-brand" })
		}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-12 rounded-3xl text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldQuestionMark, { className: "w-10 h-10 mx-auto text-muted-foreground mb-3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-semibold",
					children: "Aucun signalement"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Les signalements anonymes de vos employés apparaîtront ici."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: filtered.map((t, i) => {
				const dec = decrypted[t.id];
				const ticketMsgs = messages[t.id] ?? [];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i * .04 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5 rounded-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											children: t.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: t.status === "resolved" ? "bg-success/10 text-success border-0" : t.status === "under_review" ? "bg-warning/15 text-warning border-0" : "bg-brand/10 text-brand border-0",
											children: t.status
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-mono text-muted-foreground",
											children: ["#", t.id.slice(0, 8)]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground shrink-0",
									children: new Date(t.created_at).toLocaleDateString()
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 pb-3 border-b",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-sm mb-1",
									children: dec?.subject || "Chargement..."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed whitespace-pre-line text-foreground/90",
									children: dec?.body || "Déchiffrement en cours..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-3 pl-4 border-l-2 border-brand/20 max-h-[250px] overflow-y-auto pr-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-3.5 h-3.5" }), " Échanges anonymes"]
								}), ticketMsgs.map((m) => {
									const isHR = m.author_role === "hr";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `flex flex-col ${isHR ? "items-end" : "items-start"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `p-2.5 rounded-2xl text-xs max-w-[85%] ${isHR ? "bg-brand text-white rounded-tr-none" : "bg-muted rounded-tl-none"}`,
											children: decryptedMessages[m.id] || "..."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[9px] text-muted-foreground mt-0.5 px-1",
											children: [
												isHR ? "Vous (RH)" : "Déclarant (Anonyme)",
												" · ",
												new Date(m.created_at).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit"
												})
											]
										})]
									}, m.id);
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex gap-2 items-end pt-3 border-t",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: replyText[t.id] ?? "",
									onChange: (e) => setReplyText((r) => ({
										...r,
										[t.id]: e.target.value
									})),
									placeholder: "Répondre anonymement au déclarant...",
									rows: 1,
									className: "rounded-xl min-h-[38px] resize-none text-xs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => handleSendReply(t.id),
									disabled: replying[t.id] || !(replyText[t.id] ?? "").trim(),
									size: "icon",
									className: "shrink-0 rounded-xl gradient-brand text-white w-9 h-9",
									children: replying[t.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center gap-2",
								children: [t.status !== "under_review" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => updateStatus(t.id, "under_review"),
									children: "En cours"
								}), t.status !== "resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => updateStatus(t.id, "resolved"),
									children: "Résoudre"
								})]
							})
						]
					})
				}, t.id);
			})
		})
	] });
}
//#endregion
export { AnonymousPage as component };
