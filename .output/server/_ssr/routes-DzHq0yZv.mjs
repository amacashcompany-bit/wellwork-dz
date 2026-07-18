import { o as __toESM } from "../_runtime.mjs";
import { t as wellwork_logo_mark_default } from "./wellwork-logo-mark-BsK64D-m.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as Bot, Ct as Check, F as Moon, Ft as ArrowUpRight, I as Mic, It as ArrowRight, K as Leaf, Q as HeartPulse, R as MessageCircle, W as LoaderCircle, _ as ShieldCheck, at as ExternalLink, bt as ChevronRight, i as Users, m as Sparkles, n as X, p as Sun, t as Zap, wt as ChartLine, x as Send } from "../_libs/lucide-react.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-CDoe66ii.mjs";
import { n as useI18n, t as LANGS } from "./useI18n-C6quAtBX.mjs";
import { a as motion, o as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Cwnc7JqU.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DzHq0yZv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
	]
}));
ScrollArea.displayName = Root.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
var MAX_MESSAGE_LENGTH = 1200;
function validateRequest(input) {
	if (!input || typeof input !== "object") throw new Error("Invalid chat request.");
	const candidate = input;
	const locale = candidate.locale;
	if (locale !== "fr" && locale !== "ar" && locale !== "en") throw new Error("Invalid language.");
	if (!Array.isArray(candidate.messages) || candidate.messages.length === 0) throw new Error("A message is required.");
	return {
		locale,
		messages: candidate.messages.slice(-10).map((message) => {
			if (!message || message.role !== "user" && message.role !== "assistant" || typeof message.content !== "string") throw new Error("Invalid message.");
			const content = message.content.trim().slice(0, MAX_MESSAGE_LENGTH);
			if (!content) throw new Error("Empty messages are not allowed.");
			return {
				role: message.role,
				content
			};
		})
	};
}
var askWellWorkAssistant = createServerFn({ method: "POST" }).validator(validateRequest).handler(createSsrRpc("430e01e763efe192deeadcd55a5535f2aa833377fa2bc9d5bb9171143218ec3d"));
var copy = {
	fr: {
		title: "Assistant WellWork",
		status: "Conseils sur la plateforme",
		greeting: "Bonjour, je suis l’assistant WellWork. Je peux vous guider sur les services, les plans, la démo gratuite et la création de votre espace.",
		placeholder: "Posez votre question…",
		open: "Besoin d’aide ?",
		close: "Fermer l’assistant",
		send: "Envoyer",
		listen: "Dicter une question",
		note: "Ne partagez aucune donnée personnelle ou confidentielle.",
		error: "Je n’arrive pas à répondre pour le moment. Réessayez dans quelques instants.",
		plans: "Voir les plans",
		demo: "Demander une démo",
		suggestions: [
			"Comment demander une démo gratuite ?",
			"Comment une entreprise crée son espace ?",
			"Comment un employé ouvre son compte ?",
			"Quels moyens de paiement sont disponibles ?"
		]
	},
	ar: {
		title: "مساعد WellWork",
		status: "إرشاد حول المنصة",
		greeting: "مرحباً، أنا مساعد WellWork. يمكنني إرشادك حول خدمات المنصة والخطط والعرض التجريبي المجاني وإنشاء مساحة شركتك.",
		placeholder: "اكتب سؤالك…",
		open: "هل تحتاج مساعدة؟",
		close: "إغلاق المساعد",
		send: "إرسال",
		listen: "إملاء السؤال",
		note: "لا تشارك أي بيانات شخصية أو سرية.",
		error: "تعذر عليّ الرد الآن. يرجى المحاولة بعد قليل.",
		plans: "عرض الخطط",
		demo: "طلب عرض تجريبي",
		suggestions: [
			"كيف أطلب عرضاً تجريبياً مجانياً؟",
			"كيف تنشئ الشركة مساحتها؟",
			"كيف يفتح الموظف حسابه؟",
			"ما هي طرق الدفع المتاحة؟"
		]
	},
	en: {
		title: "WellWork Assistant",
		status: "Platform guidance",
		greeting: "Hi, I’m the WellWork assistant. I can guide you through services, plans, the free demo, and creating your company space.",
		placeholder: "Ask your question…",
		open: "Need help?",
		close: "Close assistant",
		send: "Send",
		listen: "Dictate a question",
		note: "Do not share personal or confidential information.",
		error: "I can’t answer right now. Please try again in a moment.",
		plans: "View plans",
		demo: "Request a demo",
		suggestions: [
			"How do I request a free demo?",
			"How does a company create its space?",
			"How does an employee open an account?",
			"Which payment methods are available?"
		]
	}
};
function makeId() {
	return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}
function WellWorkChatbot() {
	const { language } = useI18n();
	const text = copy[language];
	const [open, setOpen] = (0, import_react.useState)(false);
	const [input, setInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const endRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const greeting = (0, import_react.useMemo)(() => ({
		id: `greeting-${language}`,
		role: "assistant",
		content: text.greeting
	}), [language, text.greeting]);
	const visibleMessages = messages.length === 0 ? [greeting] : messages;
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const timer = window.setTimeout(() => inputRef.current?.focus(), 180);
		return () => window.clearTimeout(timer);
	}, [open]);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [visibleMessages, loading]);
	(0, import_react.useEffect)(() => {
		const closeOnEscape = (event) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, []);
	const submit = async (question = input) => {
		const content = question.trim();
		if (!content || loading) return;
		const currentMessages = messages.length === 0 ? [greeting] : messages;
		const userMessage = {
			id: makeId(),
			role: "user",
			content
		};
		const nextMessages = [...currentMessages, userMessage];
		setMessages(nextMessages);
		setInput("");
		setLoading(true);
		try {
			const result = await askWellWorkAssistant({ data: {
				locale: language,
				messages: nextMessages.map(({ role, content: messageContent }) => ({
					role,
					content: messageContent
				}))
			} });
			setMessages((current) => [...current, {
				id: makeId(),
				role: "assistant",
				content: result.answer
			}]);
		} catch (error) {
			console.error("[WellWork chat] Request failed.", error);
			setMessages((current) => [...current, {
				id: makeId(),
				role: "assistant",
				content: text.error
			}]);
		} finally {
			setLoading(false);
		}
	};
	const startListening = () => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) return;
		const recognition = new SpeechRecognition();
		recognition.lang = language === "ar" ? "ar-DZ" : language === "en" ? "en-US" : "fr-FR";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;
		recognition.onstart = () => setListening(true);
		recognition.onend = () => setListening(false);
		recognition.onerror = () => setListening(false);
		recognition.onresult = (event) => {
			const transcript = event.results?.[0]?.[0]?.transcript;
			if (transcript) setInput(transcript);
		};
		recognition.start();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-x-3 bottom-3 z-[80] sm:inset-x-auto sm:bottom-5 sm:end-5",
		dir: language === "ar" ? "rtl" : "ltr",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
			initial: {
				opacity: 0,
				y: 18,
				scale: .97
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: 12,
				scale: .98
			},
			transition: {
				duration: .2,
				ease: "easeOut"
			},
			className: "mb-3 flex h-[min(650px,calc(100dvh-5rem))] w-full flex-col overflow-hidden rounded-lg border border-border bg-background shadow-[0_24px_70px_-20px_rgba(15,23,42,0.4)] sm:w-[390px]",
			role: "dialog",
			"aria-label": text.title,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "relative overflow-hidden border-b border-border bg-primary px-4 py-3 text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 end-0 w-28 bg-leaf/15" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/assets/wellwork-logo-mark-Bo16x6Vw.png",
									alt: "",
									className: "h-8 w-8 object-contain"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "truncate text-sm font-semibold",
									children: text.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-0.5 flex items-center gap-1.5 text-[11px] text-primary-foreground/75",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-leaf" }), text.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								className: "h-9 w-9 text-primary-foreground hover:bg-white/10 hover:text-white",
								onClick: () => setOpen(false),
								"aria-label": text.close,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-border bg-muted/35 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/auth",
						className: "gradient-leaf inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium text-white transition hover:opacity-90",
						children: [
							text.demo,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/#pricing",
						className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-medium transition hover:bg-muted",
						children: [
							text.plans,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "min-h-0 flex-1 bg-muted/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 p-4",
						"aria-live": "polite",
						children: [
							visibleMessages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`,
								children: [message.role === "assistant" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `max-w-[82%] whitespace-pre-wrap rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${message.role === "user" ? "bg-primary text-primary-foreground" : "border border-border bg-background text-foreground shadow-sm"}`,
									children: message.content
								})]
							}, message.id)),
							messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 pt-1",
								children: text.suggestions.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => submit(suggestion),
									className: "flex min-h-10 items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2 text-start text-xs font-medium transition hover:border-brand/40 hover:bg-brand/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: suggestion }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 shrink-0 text-brand" })]
								}, suggestion))
							}),
							loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), "WellWork…"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "border-t border-border bg-background p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end gap-2 rounded-lg border border-input bg-muted/20 p-1.5 focus-within:border-brand/50 focus-within:ring-2 focus-within:ring-brand/15",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								ref: inputRef,
								value: input,
								onChange: (event) => setInput(event.target.value.slice(0, 1200)),
								onKeyDown: (event) => {
									if (event.key === "Enter" && !event.shiftKey) {
										event.preventDefault();
										submit();
									}
								},
								placeholder: text.placeholder,
								rows: 1,
								className: "max-h-24 min-h-9 resize-none border-0 bg-transparent px-2 py-2 text-sm shadow-none focus-visible:ring-0",
								disabled: loading
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								className: `h-9 w-9 shrink-0 ${listening ? "text-destructive" : "text-muted-foreground"}`,
								onClick: startListening,
								"aria-label": text.listen,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon",
								className: "gradient-brand h-9 w-9 shrink-0 border-0 text-white hover:opacity-90",
								onClick: () => submit(),
								disabled: !input.trim() || loading,
								"aria-label": text.send,
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-center text-[10px] text-muted-foreground",
						children: text.note
					})]
				})
			]
		}) }), !open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
			type: "button",
			initial: {
				opacity: 0,
				y: 12
			},
			animate: {
				opacity: 1,
				y: 0
			},
			whileHover: { y: -2 },
			whileTap: { scale: .98 },
			onClick: () => setOpen(true),
			className: "ms-auto flex h-13 items-center gap-2 rounded-lg border border-white/15 bg-primary px-3 text-primary-foreground shadow-[0_12px_35px_-10px_rgba(15,23,42,0.55)] transition hover:bg-primary/95 sm:px-4",
			"aria-label": text.open,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "relative grid h-9 w-9 place-items-center rounded-md bg-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/assets/wellwork-logo-mark-Bo16x6Vw.png",
						alt: "",
						className: "h-7 w-7 object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -end-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-leaf" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "hidden text-start sm:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs font-semibold",
						children: text.open
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[10px] text-primary-foreground/65",
						children: text.title
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 sm:ms-1" })
			]
		})]
	});
}
var wellwork_wordmark_default = "/assets/wellwork-wordmark-BznugxUj.png";
var hero_team_default = "/assets/hero-team-D22dQlj7.jpg";
var story_woman_default = "/assets/story-woman-B5NsApse.jpg";
var product_dashboard_default = "/assets/product-dashboard-Cfx7CP-b.jpg";
function Landing() {
	const [user, setUser] = (0, import_react.useState)(null);
	const { t, language, setLanguage } = useI18n();
	const isDark = useStore((s) => s.isDarkMode);
	const toggleDark = useStore((s) => s.toggleDarkMode);
	const currentLang = LANGS.find((l) => l.code === language) || LANGS[0];
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			setUser(data.user);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground overflow-x-hidden font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "fixed top-0 inset-x-0 z-50 glass border-b border-border/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto grid grid-cols-[1fr_auto] items-center gap-x-2 px-4 pb-12 pt-2 sm:flex sm:h-16 sm:px-6 sm:py-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex min-w-0 items-center gap-2 group sm:gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
								src: wellwork_logo_mark_default,
								alt: "WellWork",
								className: "h-8 w-8 shrink-0 object-contain drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)] sm:h-9 sm:w-9",
								initial: {
									rotate: -8,
									scale: .9,
									opacity: 0
								},
								animate: {
									rotate: 0,
									scale: 1,
									opacity: 1
								},
								transition: {
									type: "spring",
									stiffness: 200,
									damping: 14,
									delay: .1
								},
								whileHover: {
									rotate: [
										0,
										-6,
										6,
										0
									],
									scale: 1.08,
									transition: { duration: .6 }
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-display text-base font-bold tracking-normal sm:text-lg",
								children: "WellWork"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#platform",
									className: "hover:text-foreground transition",
									children: t("landingNavPlatform")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#approach",
									className: "hover:text-foreground transition",
									children: t("landingNavApproach")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#insights",
									className: "hover:text-foreground transition",
									children: t("landingNavInsights")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#pricing",
									className: "hover:text-foreground transition",
									children: t("landingNavPricing")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-1 sm:gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "icon",
										className: "h-9 w-9 text-muted-foreground hover:text-foreground sm:w-auto sm:gap-1.5 sm:px-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: currentLang.flag,
											alt: currentLang.code,
											className: "w-4 h-3 object-cover rounded-sm shadow-sm"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline uppercase text-xs font-semibold",
											children: currentLang.code
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
									align: "end",
									children: LANGS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: () => setLanguage(l.code),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: l.flag,
												alt: l.code,
												className: "me-2 w-4 h-3 object-cover rounded-sm shadow-sm"
											}),
											" ",
											l.label
										]
									}, l.code))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: toggleDark,
									"aria-label": "Toggle theme",
									className: "h-9 w-9 text-muted-foreground hover:text-foreground",
									children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4" })
								}),
								user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/onboarding",
									className: "absolute left-4 right-4 top-[3.25rem] sm:static sm:w-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "gradient-brand h-9 w-full rounded-full border-0 px-5 text-white shadow-elegant sm:h-10 sm:w-auto",
										children: "Tableau de bord"
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									className: "text-sm font-medium hover:text-brand transition-colors hidden sm:inline-flex px-3",
									children: t("landingLogin")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									className: "absolute left-4 right-4 top-[3.25rem] sm:static",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										className: "gradient-leaf h-9 w-full rounded-full border-0 px-5 text-sm text-white shadow-elegant sm:h-10 sm:w-auto",
										children: [
											t("landingDemoBtn"),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-4 h-4 ms-1" })
										]
									})
								})] })
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative px-5 pb-16 pt-36 sm:px-6 sm:pt-28 md:pt-36 md:pb-24 gradient-woba",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "inline-flex items-center gap-2 rounded-full bg-leaf/10 border border-leaf/25 px-4 py-1.5 text-xs font-medium text-leaf-deep mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "w-3.5 h-3.5" }),
								" ",
								t("landingHeroBadge")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .05 },
							className: "text-[2.5rem] md:text-6xl lg:text-[4.2rem] font-bold tracking-tight leading-[1.02] font-display",
							children: [
								t("landingHeroTitle1"),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-leaf",
									children: t("landingHeroTitle2")
								}),
								t("landingHeroTitle3")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .1 },
							className: "mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed",
							children: t("landingHeroDesc")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .15 },
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									className: "gradient-leaf text-white border-0 h-12 px-6 rounded-full shadow-elegant",
									children: [
										t("landingHeroStartBtn"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4 ms-1" })
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#platform",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									variant: "outline",
									className: "h-12 px-6 rounded-full border-foreground/15",
									children: t("landingHeroDiscoverBtn")
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: .25 },
							className: "mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground",
							children: [
								t("landingFeature1"),
								t("landingFeature2"),
								t("landingFeature3"),
								t("landingFeature4")
							].map((feat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-leaf" }),
									" ",
									feat
								]
							}, feat))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .97
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						transition: { duration: .6 },
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative rounded-3xl overflow-hidden shadow-elegant border border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: hero_team_default,
									alt: "Équipe au travail",
									width: 1280,
									height: 960,
									className: "w-full h-[420px] md:h-[520px] object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-leaf/20 mix-blend-multiply" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute -bottom-6 -left-4 md:-left-8 glass rounded-2xl p-4 pr-6 shadow-elegant flex items-center gap-3 max-w-[280px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-11 h-11 rounded-xl gradient-leaf grid place-items-center text-white shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: t("landingScore")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-semibold text-lg leading-tight",
										children: [
											"78",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-muted-foreground",
												children: "/100"
											}),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-leaf-deep text-xs font-medium",
												children: "+6.4%"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute -top-4 -right-3 md:-right-6 glass rounded-2xl p-3 pr-5 shadow-elegant flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-xl bg-brand/15 text-brand grid place-items-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: t("landingAnon")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: "k ≥ 5 · AES-GCM"
									})]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-7xl mx-auto mt-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center text-xs uppercase tracking-widest text-muted-foreground mb-4",
						children: t("landingTrust")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-70",
						children: [
							"Sonatrach",
							"CNAS",
							"Djezzy",
							"BNA",
							"Cosider",
							"Cevital"
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display font-semibold text-lg text-muted-foreground/80",
							children: n
						}, n))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "insights",
				className: "py-24 px-6 bg-muted/30 border-y border-border/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-6xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-2xl mx-auto mb-14",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-leaf-deep font-semibold mb-3",
								children: t("landingImpactTag")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl md:text-5xl font-bold font-display tracking-tight",
								children: t("landingImpactTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground",
								children: t("landingImpactDesc")
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-3 gap-4",
						children: [
							{
								value: "13.3%",
								label: t("landingImpactStat1"),
								tone: "bg-card border"
							},
							{
								value: "33%",
								label: t("landingImpactStat2"),
								tone: "gradient-leaf text-white border-0"
							},
							{
								value: "500%",
								label: t("landingImpactStat3"),
								tone: "bg-primary text-primary-foreground border-0"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-3xl p-8 md:p-10 ${s.tone}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-5xl md:text-6xl font-bold font-display tracking-tight",
								children: s.value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 text-sm opacity-90",
								children: s.label
							})]
						}, s.label))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "platform",
				className: "py-24 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest text-leaf-deep font-semibold mb-3",
							children: t("landingSuiteTag")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-5xl font-bold font-display tracking-tight",
							children: t("landingSuiteTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-muted-foreground max-w-lg",
							children: t("landingSuiteDesc")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 space-y-4",
							children: [
								{
									icon: ChartLine,
									t: t("landingSuiteF1T"),
									d: t("landingSuiteF1D")
								},
								{
									icon: Bot,
									t: t("landingSuiteF2T"),
									d: t("landingSuiteF2D")
								},
								{
									icon: ShieldCheck,
									t: t("landingSuiteF3T"),
									d: t("landingSuiteF3D")
								},
								{
									icon: ChartLine,
									t: t("landingSuiteF4T"),
									d: t("landingSuiteF4D")
								}
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-xl gradient-leaf grid place-items-center text-white shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: f.t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground",
									children: f.d
								})] })]
							}, f.t))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl overflow-hidden border border-border shadow-elegant bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product_dashboard_default,
								alt: "Tableau de bord WellWork",
								width: 1280,
								height: 900,
								loading: "lazy",
								className: "w-full h-auto object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -bottom-5 -right-4 glass rounded-2xl px-4 py-3 shadow-elegant text-xs font-medium flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-leaf animate-pulse" }),
								" ",
								t("landingSuiteRealtime")
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "approach",
				className: "py-24 px-6 bg-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative rounded-3xl overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: story_woman_default,
								alt: "Portrait salariée",
								width: 960,
								height: 1024,
								loading: "lazy",
								className: "w-full h-[500px] object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-6 left-6 right-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-widest opacity-80 mb-2",
									children: t("landingApprReality")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-display font-semibold leading-tight",
									children: t("landingApprRealityT")
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest text-leaf font-semibold mb-3",
							children: t("landingApprTag")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-3xl md:text-5xl font-bold font-display tracking-tight",
							children: [
								t("landingApprTitle1"),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "not-italic text-gradient-leaf",
									children: t("landingApprTitle2")
								}),
								t("landingApprTitle3")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-primary-foreground/80 max-w-lg",
							children: t("landingApprDesc")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid sm:grid-cols-2 gap-4",
							children: [
								{
									t: t("landingApprF1T"),
									d: t("landingApprF1D")
								},
								{
									t: t("landingApprF2T"),
									d: t("landingApprF2D")
								},
								{
									t: t("landingApprF3T"),
									d: t("landingApprF3D")
								},
								{
									t: t("landingApprF4T"),
									d: t("landingApprF4D")
								}
							].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: c.t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-primary-foreground/70 mt-1",
									children: c.d
								})]
							}, c.t))
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-24 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl mb-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest text-leaf-deep font-semibold mb-3",
							children: t("landingBridgeTag")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-5xl font-bold font-display tracking-tight",
							children: t("landingBridgeTitle")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-3 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2 rounded-3xl bg-card border p-8 relative overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground mb-6",
									children: t("landingBridgeChartTitle")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FakeChart, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap gap-4 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
										color: "var(--brand)",
										label: t("landingBridgeLegend1")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
										color: "var(--leaf)",
										label: t("landingBridgeLegend2")
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-rows-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl gradient-leaf text-white p-8 flex flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm/6 opacity-90",
									children: t("landingBridgeStat1T")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-5xl font-bold font-display",
									children: "6%"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-primary text-primary-foreground p-8 flex flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm/6 opacity-90",
									children: t("landingBridgeStat2T")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-5xl font-bold font-display",
									children: "14%"
								})]
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-24 px-6 bg-muted/30 border-y border-border/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-6xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-14 max-w-2xl mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-5xl font-bold font-display tracking-tight",
							children: t("landingGridTitle")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: t("landingGridDesc")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-3 gap-5",
						children: [
							{
								icon: ShieldCheck,
								title: t("landingGridF1T"),
								desc: t("landingGridF1D")
							},
							{
								icon: Bot,
								title: t("landingGridF2T"),
								desc: t("landingGridF2D")
							},
							{
								icon: ChartLine,
								title: t("landingGridF3T"),
								desc: t("landingGridF3D")
							},
							{
								icon: Users,
								title: t("landingGridF4T"),
								desc: t("landingGridF4D")
							},
							{
								icon: Zap,
								title: t("landingGridF5T"),
								desc: t("landingGridF5D")
							},
							{
								icon: Sparkles,
								title: t("landingGridF6T"),
								desc: t("landingGridF6D")
							}
						].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: i * .04 },
							className: "p-6 rounded-3xl bg-card border hover:shadow-elegant hover:-translate-y-0.5 transition-all",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-11 h-11 rounded-2xl gradient-leaf grid place-items-center shadow-elegant mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "w-5 h-5 text-white" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-lg font-display",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mt-2 leading-relaxed",
									children: f.desc
								})
							]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-24 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto rounded-[2rem] gradient-mesh p-12 md:p-16 text-white text-center relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
							src: wellwork_logo_mark_default,
							alt: "",
							className: "w-14 h-14 mx-auto object-contain mb-6",
							initial: {
								opacity: 0,
								scale: .85
							},
							animate: {
								opacity: .95,
								scale: 1,
								y: [
									0,
									-6,
									0
								]
							},
							transition: {
								opacity: { duration: .6 },
								scale: { duration: .6 },
								y: {
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut"
								}
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-5xl font-bold font-display tracking-tight",
							children: t("landingCtaTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-white/80 max-w-xl mx-auto",
							children: t("landingCtaDesc")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									className: "bg-white text-primary hover:bg-white/90 h-12 px-6 rounded-full",
									children: [
										t("landingPricingCreate"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4 ms-1" })
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									variant: "outline",
									className: "h-12 px-6 rounded-full border-white/30 bg-transparent text-white hover:bg-white/10",
									children: t("landingCtaTalk")
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border/50 py-14 px-6 bg-sidebar text-sidebar-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: wellwork_wordmark_default,
						alt: "WellWork",
						className: "h-9 w-auto object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-sidebar-foreground/70 max-w-xs",
						children: t("landingFooterDesc")
					})] }), [
						{
							title: "Plateforme",
							links: [
								"Pulse",
								"Feedback anonyme",
								"IA burn-out",
								"Rapports"
							]
						},
						{
							title: "Ressources",
							links: [
								"Bibliothèque",
								"Événements",
								"Blog",
								"Guides"
							]
						},
						{
							title: "Entreprise",
							links: [
								"À propos",
								"Contact",
								"Sécurité",
								"Confidentialité"
							]
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-sidebar-foreground/50 mb-4",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-sm",
						children: c.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-white transition",
							children: l
						}) }, l))
					})] }, c.title))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-xs text-sidebar-foreground/50 flex flex-wrap justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" WellWork · ",
						t("landingFooterRights")
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t("landingFooterLegal") })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WellWorkChatbot, {})
		]
	});
}
function PricingSection() {
	const { t } = useI18n();
	const [plans, setPlans] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		supabase.from("plans").select("*").eq("active", true).order("sort_order", { ascending: true }).then(({ data }) => {
			setPlans(data || []);
			setLoading(false);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "pricing",
		className: "py-24 px-6 bg-muted/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto mb-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "mb-4",
						children: t("landingPricingTag")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl md:text-5xl font-bold font-display tracking-tight",
						children: t("landingPricingTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: t("landingPricingDesc")
					})
				]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center p-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand/50" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-3 gap-5",
				children: plans.map((plan, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: i * .06 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `h-full p-6 rounded-3xl border bg-card flex flex-col relative ${plan.highlighted ? "border-brand shadow-glow ring-1 ring-brand/30" : ""}`,
						children: [
							plan.highlighted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-3 start-6 text-[11px] font-semibold px-3 py-1 rounded-full gradient-brand text-white",
								children: t("landingPricingPop")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display font-semibold text-lg",
								children: plan.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1",
								children: plan.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 text-2xl font-bold",
								children: plan.price_monthly === null ? t("landingPricingQuote") : plan.price_monthly === 0 ? t("landingPricingFree") : `${plan.price_monthly} ${plan.currency}/${t("landingPricingMonth")}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-2.5 text-sm flex-1",
								children: (plan.features || []).map((f, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-leaf mt-0.5 shrink-0" }),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: f
										})
									]
								}, idx))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: plan.price_monthly === null || plan.is_demo ? "/auth" : `/checkout?plan=${plan.id}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: `w-full rounded-full ${plan.highlighted ? "gradient-brand text-white border-0" : ""}`,
										variant: plan.highlighted ? "default" : "outline",
										children: plan.price_monthly === null ? t("landingPricingContact") : t("landingPricingCreate")
									})
								})
							})
						]
					})
				}, plan.id))
			})]
		})
	});
}
function Legend({ color, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-3 h-3 rounded-full",
				style: { background: color }
			}),
			" ",
			label
		]
	});
}
function FakeChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 600 220",
		className: "w-full h-56",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "g1",
				x1: "0",
				x2: "0",
				y1: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "var(--brand)",
					stopOpacity: "0.4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "var(--brand)",
					stopOpacity: "0"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "g2",
				x1: "0",
				x2: "0",
				y1: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "var(--leaf)",
					stopOpacity: "0.35"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "var(--leaf)",
					stopOpacity: "0"
				})]
			})] }),
			[
				40,
				80,
				120,
				160,
				200
			].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "0",
				x2: "600",
				y1: y,
				y2: y,
				stroke: "currentColor",
				strokeOpacity: "0.06"
			}, y)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0,150 C60,140 100,120 160,110 C220,100 260,90 320,80 C380,70 420,60 480,55 C540,50 580,45 600,42 L600,220 L0,220 Z",
				fill: "url(#g1)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0,150 C60,140 100,120 160,110 C220,100 260,90 320,80 C380,70 420,60 480,55 C540,50 580,45 600,42",
				fill: "none",
				stroke: "var(--brand)",
				strokeWidth: "2.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0,80 C60,95 120,110 180,120 C240,130 300,140 360,150 C420,160 480,170 540,175 C570,178 590,180 600,181 L600,220 L0,220 Z",
				fill: "url(#g2)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0,80 C60,95 120,110 180,120 C240,130 300,140 360,150 C420,160 480,170 540,175 C570,178 590,180 600,181",
				fill: "none",
				stroke: "var(--leaf)",
				strokeWidth: "2.5"
			})
		]
	});
}
//#endregion
export { Landing as component };
