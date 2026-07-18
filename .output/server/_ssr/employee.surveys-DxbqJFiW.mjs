import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { Ct as Check, W as LoaderCircle, bt as ChevronRight, ut as Copy, xt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion, o as AnimatePresence } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-CBNkTu1o.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Slider } from "./slider-lX4rQHvT.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as AnonymousBanner } from "./AnonymousBanner-BhemzUXk.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.surveys-DxbqJFiW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emojis = [
	"😫",
	"😕",
	"😐",
	"🙂",
	"😄"
];
var steps = [
	{
		title: {
			fr: "Énergie & humeur",
			ar: "الطاقة والمزاج",
			en: "Energy & mood"
		},
		questions: [{
			key: "q1",
			label: {
				fr: "Comment vous sentez-vous aujourd'hui ?",
				ar: "كيف تشعر اليوم؟",
				en: "How do you feel today?"
			}
		}, {
			key: "q2",
			label: {
				fr: "Votre niveau d'énergie cette semaine",
				ar: "مستوى طاقتك هذا الأسبوع",
				en: "Your energy this week"
			}
		}]
	},
	{
		title: {
			fr: "Charge & autonomie",
			ar: "العبء والاستقلالية",
			en: "Workload & autonomy"
		},
		questions: [
			{
				key: "q3",
				label: {
					fr: "Ma charge de travail est raisonnable",
					ar: "عبء عملي معقول",
					en: "My workload is reasonable"
				}
			},
			{
				key: "q4",
				label: {
					fr: "J'ai la liberté d'organiser mon travail",
					ar: "لدي الحرية في تنظيم عملي",
					en: "I have the freedom to organize my work"
				}
			},
			{
				key: "q5",
				label: {
					fr: "J'arrive à terminer mes tâches dans les délais",
					ar: "أستطيع إنجاز مهامي في الوقت",
					en: "I complete my tasks on time"
				}
			}
		]
	},
	{
		title: {
			fr: "Soutien & reconnaissance",
			ar: "الدعم والتقدير",
			en: "Support & recognition"
		},
		questions: [
			{
				key: "q6",
				label: {
					fr: "Mon manager me soutient quand j'en ai besoin",
					ar: "مديري يدعمني عند الحاجة",
					en: "My manager supports me when needed"
				}
			},
			{
				key: "q7",
				label: {
					fr: "Mon travail est reconnu",
					ar: "عملي معترف به",
					en: "My work is recognized"
				}
			},
			{
				key: "q8",
				label: {
					fr: "La communication interne est claire",
					ar: "التواصل الداخلي واضح",
					en: "Internal communication is clear"
				}
			}
		]
	},
	{
		title: {
			fr: "Environnement & équilibre",
			ar: "البيئة والتوازن",
			en: "Environment & balance"
		},
		questions: [
			{
				key: "q9",
				label: {
					fr: "Mon poste est physiquement confortable",
					ar: "مكان عملي مريح جسدياً",
					en: "My workstation is physically comfortable"
				}
			},
			{
				key: "q10",
				label: {
					fr: "Je parviens à déconnecter en dehors du travail",
					ar: "أستطيع الانفصال عن العمل",
					en: "I can disconnect outside of work"
				}
			},
			{
				key: "q11",
				label: {
					fr: "Quelque chose à ajouter ? (optionnel)",
					ar: "هل هناك ما تريد إضافته؟ (اختياري)",
					en: "Anything to add? (optional)"
				},
				type: "text"
			}
		]
	}
];
function SurveysPage() {
	const { pick, t } = useI18n();
	const { info } = useMySpace();
	const [step, setStep] = (0, import_react.useState)(0);
	const [dir, setDir] = (0, import_react.useState)(1);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [done, setDone] = (0, import_react.useState)(false);
	const [refCode, setRefCode] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const stepData = steps[step];
	const isLast = step === steps.length - 1;
	const next = async () => {
		if (isLast) {
			if (!info?.spaceId || submitting) return;
			setSubmitting(true);
			try {
				const completeAnswers = Object.fromEntries(Array.from({ length: 10 }, (_, index) => {
					const key = `q${index + 1}`;
					return [key, Number(answers[key] ?? 3)];
				}));
				if (String(answers.q11 ?? "").trim()) completeAnswers.q11 = String(answers.q11).trim();
				const { data, error } = await supabase.rpc.bind(supabase)("submit_weekly_wellbeing_pulse", {
					_space_id: info.spaceId,
					_answers: completeAnswers
				});
				if (error) throw new Error(error.message);
				setRefCode(data || "PULSE-SAVED");
				setDone(true);
				setTimeout(() => confetti_module_default({
					particleCount: 120,
					spread: 80,
					origin: { y: .6 },
					colors: [
						"#0d9488",
						"#10b981",
						"#14b8a6",
						"#0f172a"
					]
				}), 200);
			} catch (error) {
				toast.error(error instanceof Error ? error.message : pick("Impossible d'enregistrer vos reponses.", "تعذر حفظ إجاباتك.", "Unable to save your answers."));
			} finally {
				setSubmitting(false);
			}
		} else {
			setDir(1);
			setStep(step + 1);
		}
	};
	const prev = () => {
		setDir(-1);
		setStep(Math.max(0, step - 1));
	};
	const copy = () => {
		navigator.clipboard.writeText(refCode);
		toast.success(t("copied"));
	};
	const textVal = String(answers.q11 ?? "");
	const sentiment = textVal.length === 0 ? null : /(super|excellent|top|good|great|content|جيد|ممتاز|رائع)/i.test(textVal) ? "positive" : /(mauvais|difficile|nul|stressé|épuisé|سيء|صعب|متعب|مرهق)/i.test(textVal) ? "negative" : "neutral";
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: pick("Mes questionnaires", "استبياناتي", "My Surveys") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			scale: .96
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-10 rounded-3xl text-center gradient-hero border-brand/20 max-w-2xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-5xl mb-4",
					children: "🎉"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: pick("Merci pour votre participation !", "شكراً لمشاركتك!", "Thank you for participating!")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-2 max-w-md mx-auto",
					children: pick("Vos réponses ont été agrégées de manière totalement anonyme.", "تم دمج إجاباتك بشكل مجهول تماماً.", "Your answers have been aggregated fully anonymously.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/70 border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase text-muted-foreground",
							children: t("yourTrackingCode")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-mono font-bold",
							children: refCode
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: copy,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4 me-1" }),
							" ",
							t("copy")
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-4",
					children: pick("Ce code confirme uniquement l'enregistrement anonyme de cette participation.", "يؤكد هذا الرمز فقط تسجيل هذه المشاركة بشكل مجهول.", "This code only confirms that this anonymous participation was saved.")
				})
			]
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Mes questionnaires", "استبياناتي", "My Surveys"),
			subtitle: pick("Pulse hebdomadaire · 4 étapes · 3 minutes", "النبض الأسبوعي · 4 خطوات · 3 دقائق", "Weekly pulse · 4 steps · 3 minutes")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnonymousBanner, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2 mb-6 max-w-2xl mx-auto",
			children: steps.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i < step ? "gradient-brand text-white" : i === step ? "border-2 border-brand text-brand" : "bg-muted text-muted-foreground"}`,
					children: i < step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }) : i + 1
				}), i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `flex-1 h-0.5 ${i < step ? "bg-brand" : "bg-muted"}` })]
			}, i))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 md:p-8 rounded-3xl max-w-2xl mx-auto overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				custom: dir,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					custom: dir,
					initial: {
						x: dir > 0 ? 100 : -100,
						opacity: 0
					},
					animate: {
						x: 0,
						opacity: 1
					},
					exit: {
						x: dir > 0 ? -100 : 100,
						opacity: 0
					},
					transition: { duration: .3 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-brand font-semibold uppercase mb-1",
							children: [
								pick("Étape", "خطوة", "Step"),
								" ",
								step + 1,
								"/",
								steps.length
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold mb-6",
							children: pick(stepData.title.fr, stepData.title.ar, stepData.title.en)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-6",
							children: stepData.questions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								children: pick(q.label.fr, q.label.ar, q.label.en)
							}), q.type === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: String(answers[q.key] ?? ""),
								onChange: (e) => setAnswers((a) => ({
									...a,
									[q.key]: e.target.value
								})),
								className: "mt-2 rounded-xl min-h-[100px]",
								maxLength: 500
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mt-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [textVal.length, " / 500"] }), sentiment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `px-2 py-0.5 rounded-full ${sentiment === "positive" ? "bg-success/10 text-success" : sentiment === "negative" ? "bg-danger/10 text-danger" : "bg-warning/15 text-warning"}`,
									children: [
										sentiment === "positive" ? "🟢" : sentiment === "negative" ? "🔴" : "🟡",
										" ",
										sentiment
									]
								})]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									value: [answers[q.key] ?? 3],
									min: 1,
									max: 5,
									step: 1,
									onValueChange: (v) => setAnswers((a) => ({
										...a,
										[q.key]: v[0]
									}))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-between mt-3 text-2xl",
									children: emojis.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `transition-all ${(answers[q.key] ?? 3) === i + 1 ? "scale-125" : "opacity-40"}`,
										children: e
									}, i))
								})]
							})] }, q.key))
						})
					]
				}, step)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between mt-8 pt-6 border-t",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: prev,
					disabled: step === 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4 me-1" }),
						" ",
						t("previous")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: next,
					disabled: submitting || !info?.spaceId,
					className: "gradient-brand text-white border-0",
					children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						isLast ? t("finish") : t("next"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 ms-1" })
					] })
				})]
			})]
		})
	] });
}
//#endregion
export { SurveysPage as component };
