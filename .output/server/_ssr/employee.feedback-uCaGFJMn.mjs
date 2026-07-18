import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { L as MessageSquare, S as Search, W as LoaderCircle, Y as KeyRound, ut as Copy, x as Send } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-CBNkTu1o.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { i as sha256Hex, n as encryptWithKey, r as generateTicketKey, t as decryptWithKey } from "./anonymity-C8KBXwWg.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { t as AnonymousBanner } from "./AnonymousBanner-BhemzUXk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.feedback-uCaGFJMn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categories = [
	{
		id: "suggestion",
		emoji: "💡",
		label: "Suggestion"
	},
	{
		id: "harassment",
		emoji: "🚫",
		label: "Harcèlement"
	},
	{
		id: "workload",
		emoji: "⚖️",
		label: "Charge de travail"
	},
	{
		id: "management",
		emoji: "👥",
		label: "Management"
	},
	{
		id: "safety",
		emoji: "🦺",
		label: "Sécurité"
	},
	{
		id: "other",
		emoji: "❓",
		label: "Autre"
	}
];
function FeedbackPage() {
	const { pick, t } = useI18n();
	const { info } = useMySpace();
	const [activeTab, setActiveTab] = (0, import_react.useState)("new");
	const [category, setCategory] = (0, import_react.useState)("suggestion");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [sentKey, setSentKey] = (0, import_react.useState)(null);
	const [trackKey, setTrackKey] = (0, import_react.useState)("");
	const [tracking, setTracking] = (0, import_react.useState)(false);
	const [trackedTicket, setTrackedTicket] = (0, import_react.useState)(null);
	const [decryptedTicket, setDecryptedTicket] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [decryptedMessages, setDecryptedMessages] = (0, import_react.useState)({});
	const [replyText, setReplyText] = (0, import_react.useState)("");
	const [replying, setReplying] = (0, import_react.useState)(false);
	const submit = async () => {
		if (!info?.spaceId || !content.trim() || !subject.trim()) return;
		setBusy(true);
		try {
			const key = generateTicketKey();
			const [encSubj, encBody, keyHash] = await Promise.all([
				encryptWithKey(subject.trim(), info.spaceId),
				encryptWithKey(content.trim(), info.spaceId),
				sha256Hex(key)
			]);
			const { error } = await supabase.from("feedback_tickets").insert({
				space_id: info.spaceId,
				category,
				encrypted_subject: encSubj,
				encrypted_content: encBody,
				ticket_key_hash: keyHash
			});
			if (error) throw error;
			setSentKey(key);
			setSubject("");
			setContent("");
			toast.success(pick("Signalement envoyé anonymement", "تم إرسال البلاغ بشكل مجهول", "Report sent anonymously"));
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Erreur");
		} finally {
			setBusy(false);
		}
	};
	const copyKey = () => {
		if (sentKey) {
			navigator.clipboard.writeText(sentKey);
			toast.success(t("copied"));
		}
	};
	const handleTrack = async () => {
		const raw = trackKey.trim();
		if (!raw) return toast.error(pick("Veuillez saisir votre clé de suivi", "الرجاء إدخال رمز التتبع", "Please enter your tracking key"));
		setTracking(true);
		setTrackedTicket(null);
		setDecryptedTicket(null);
		setMessages([]);
		setDecryptedMessages({});
		try {
			const hash = await sha256Hex(raw);
			const { data: ticketsData, error: ticketError } = await supabase.rpc("get_ticket_by_hash", { p_hash: hash });
			if (ticketError) throw ticketError;
			if (!ticketsData || ticketsData.length === 0) {
				toast.error(pick("Clé de suivi introuvable ou incorrecte", "رمز التتبع غير موجود", "Tracking key not found or incorrect"));
				return;
			}
			const ticket = ticketsData[0];
			setTrackedTicket(ticket);
			const [decSubj, decBody] = await Promise.all([decryptWithKey(ticket.encrypted_subject, info?.spaceId || ""), decryptWithKey(ticket.encrypted_content, info?.spaceId || "")]);
			setDecryptedTicket({
				subject: decSubj,
				body: decBody
			});
			const { data: messagesData, error: msgError } = await supabase.rpc("get_ticket_messages", {
				p_ticket_id: ticket.id,
				p_hash: hash
			});
			if (msgError) throw msgError;
			const thread = messagesData ?? [];
			setMessages(thread);
			const decMsgs = {};
			await Promise.all(thread.map(async (m) => {
				decMsgs[m.id] = await decryptWithKey(m.encrypted_content, info?.spaceId || "");
			}));
			setDecryptedMessages(decMsgs);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Erreur");
		} finally {
			setTracking(false);
		}
	};
	const handleSendReply = async () => {
		if (!replyText.trim() || !trackedTicket || !info?.spaceId) return;
		setReplying(true);
		try {
			const hash = await sha256Hex(trackKey.trim());
			const encReply = await encryptWithKey(replyText.trim(), info.spaceId);
			const { error } = await supabase.rpc("reply_to_ticket_anonymously", {
				p_ticket_id: trackedTicket.id,
				p_hash: hash,
				p_encrypted_content: encReply
			});
			if (error) throw error;
			toast.success(pick("Message envoyé anonymement", "تم إرسال الرسالة بشكل مجهول", "Message sent anonymously"));
			setReplyText("");
			await handleTrack();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Erreur");
		} finally {
			setReplying(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Signalement anonyme", "بلاغ مجهول", "Anonymous Report"),
			subtitle: pick("Contenu chiffré. Suivez vos signalements de manière sécurisée et anonyme.", "المحتوى مشفر. تتبع بلاغاتك بشكل آمن ومجهول.", "Encrypted content. Track your reports securely and anonymously.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnonymousBanner, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: activeTab,
			onValueChange: setActiveTab,
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "new",
						children: pick("Nouveau signalement", "بلاغ جديد", "New report")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "track",
						children: pick("Suivi de mon signalement", "تتبع بلاغي", "Track my report")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "new",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 rounded-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold mb-4",
								children: pick("Nouveau signalement", "بلاغ جديد", "New report")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-muted-foreground",
										children: "Catégorie *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: category,
										onValueChange: setCategory,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "rounded-xl mt-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
											value: c.id,
											children: [
												c.emoji,
												" ",
												c.label
											]
										}, c.id)) })]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-muted-foreground",
										children: "Sujet *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: subject,
										onChange: (e) => setSubject(e.target.value),
										maxLength: 140,
										className: "rounded-xl mt-1"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-medium text-muted-foreground",
											children: "Message *"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											value: content,
											onChange: (e) => setContent(e.target.value),
											className: "rounded-xl mt-1 min-h-[160px]",
											maxLength: 4e3
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground mt-1 text-end",
											children: [content.length, " / 4000"]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: submit,
										disabled: busy || !subject.trim() || !content.trim(),
										className: "w-full gradient-brand text-white border-0 gap-2 h-11",
										children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" }), " Envoyer chiffré"] })
									}),
									sentKey && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											scale: .96
										},
										animate: {
											opacity: 1,
											scale: 1
										},
										className: "mt-4 p-5 rounded-2xl bg-brand-50 border border-brand/20 text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs uppercase text-brand font-semibold",
												children: t("yourTrackingCode")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xl font-mono font-bold mt-2",
												children: sentKey
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground mt-3 max-w-sm mx-auto",
												children: "Ce code n'est visible qu'une fois. Sans lui, personne — pas même vous — ne peut relire ce signalement."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "outline",
												onClick: copyKey,
												className: "mt-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5 me-1" }),
													" ",
													t("copy")
												]
											})
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 rounded-2xl bg-muted/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold mb-3",
								children: "Comment fonctionne l'anonymat ?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-3 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "✓ Aucun identifiant utilisateur n'est stocké avec votre signalement." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "✓ Le contenu est chiffré (AES-GCM 256) avec l'identifiant de l'Espace." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"✓ Seul le ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "hash" }),
										" du code de suivi est stocké côté serveur pour le routage."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "✓ Aucune IP, aucun email, aucun user-agent lié à ce ticket." })
								]
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "track",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 rounded-2xl lg:col-span-1 h-fit",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold mb-4",
									children: pick("Consulter un signalement", "التحقق من بلاغ", "Track Report")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mb-4",
									children: "Saisissez le code de suivi qui vous a été fourni lors de l'envoi de votre signalement."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-4 h-4 text-muted-foreground absolute left-3 top-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: trackKey,
											onChange: (e) => setTrackKey(e.target.value),
											placeholder: "WW-XXXXXXXXXXXX",
											className: "pl-9 rounded-xl font-mono"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: handleTrack,
										disabled: tracking,
										className: "w-full gap-2 rounded-xl",
										children: tracking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4" }), " Rechercher"] })
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:col-span-2 space-y-4",
							children: trackedTicket && decryptedTicket ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 rounded-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-xs text-muted-foreground",
													children: ["#", trackedTicket.id.slice(0, 8)]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand capitalize",
													children: trackedTicket.category
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-xs px-2 py-0.5 rounded-full ${trackedTicket.status === "resolved" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`,
													children: trackedTicket.status
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: new Date(trackedTicket.created_at).toLocaleDateString()
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-b pb-4 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold text-lg",
											children: decryptedTicket.subject
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-foreground/90 whitespace-pre-line mt-2 leading-relaxed",
											children: decryptedTicket.body
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-center text-muted-foreground uppercase tracking-wider my-2 flex items-center justify-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-3.5 h-3.5" }), " Fil de discussion anonyme"]
										}), messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-center text-muted-foreground py-4",
											children: "Aucune réponse pour le moment. Vous serez notifié ici dès qu'un modérateur répondra."
										}) : messages.map((m) => {
											const isReporter = m.author_role === "reporter";
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `flex flex-col ${isReporter ? "items-end" : "items-start"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `p-3 rounded-2xl text-sm max-w-[85%] ${isReporter ? "bg-brand text-white rounded-tr-none" : "bg-muted rounded-tl-none"}`,
													children: decryptedMessages[m.id] || "..."
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] text-muted-foreground mt-1 px-1",
													children: [
														isReporter ? "Vous (anonyme)" : "RH Modérateur",
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
										className: "flex gap-2 items-end pt-2 border-t",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											value: replyText,
											onChange: (e) => setReplyText(e.target.value),
											placeholder: "Écrire un message anonyme...",
											rows: 1,
											className: "rounded-xl min-h-[40px] resize-none"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: handleSendReply,
											disabled: replying || !replyText.trim(),
											size: "icon",
											className: "shrink-0 rounded-xl gradient-brand text-white",
											children: replying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" })
										})]
									})
								]
							}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-12 rounded-3xl text-center border-dashed border-2 flex flex-col items-center justify-center min-h-[300px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-10 h-10 text-muted-foreground mb-3" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-muted-foreground",
										children: "Aucun signalement sélectionné"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-1 max-w-sm",
										children: "Saisissez votre clé de suivi dans le panneau de gauche pour consulter l'historique et échanger avec les ressources humaines."
									})
								]
							})
						})]
					})
				})
			]
		})
	] });
}
//#endregion
export { FeedbackPage as component };
