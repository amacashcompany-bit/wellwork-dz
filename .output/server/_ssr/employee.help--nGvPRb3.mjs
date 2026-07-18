import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as cn } from "./button-DRsC1qZi.mjs";
import { St as ChevronDown, _ as ShieldCheck, _t as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { n as PageHeader } from "./AppShell-BpC9Zhk0.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.help--nGvPRb3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
function HelpPage() {
	const { pick } = useI18n();
	const guarantees = [
		pick("Aucune IP n'est stockée", "لا يتم تخزين IP", "No IP is stored"),
		pick("Aucun email lié à vos réponses", "لا بريد إلكتروني مرتبط", "No email tied to your answers"),
		pick("Hachage cryptographique SHA-256 côté client", "تجزئة SHA-256 على العميل", "Client-side SHA-256 hashing"),
		pick("Agrégation en groupes ≥ 6 obligatoire", "التجميع في مجموعات ≥ 6", "Mandatory aggregation in groups of ≥ 6"),
		pick("Conforme à la Loi algérienne 18-07 sur la protection des données", "متوافق مع القانون 18-07", "Compliant with Algerian Law 18-07")
	];
	const faqs = [
		{
			q: pick("Qui voit mes réponses ?", "من يرى إجاباتي؟", "Who sees my answers?"),
			a: pick("Personne individuellement. Toutes les réponses sont fusionnées en statistiques anonymes.", "لا أحد بشكل فردي. تُدمج كل الإجابات في إحصائيات مجهولة.", "Nobody individually. Answers merge into anonymous statistics.")
		},
		{
			q: pick("Puis-je récupérer un message envoyé ?", "هل أستطيع استرجاع رسالة أرسلتها؟", "Can I retrieve a sent message?"),
			a: pick("Oui, avec votre code REF-XXXXX. Sans ce code, aucune récupération n'est possible.", "نعم بواسطة رمز REF-XXXXX. بدونه لا يمكن الاسترجاع.", "Yes, with your REF-XXXXX code. Without it, no retrieval is possible.")
		},
		{
			q: pick("Comment le RH répond-il sans me connaître ?", "كيف يرد الموارد البشرية دون معرفتي؟", "How does HR reply without knowing me?"),
			a: pick("Le RH répond au token, pas à vous. La conversation reste toujours anonyme.", "الموارد البشرية ترد على الرمز، لا عليك. تبقى المحادثة مجهولة.", "HR replies to the token, not to you. The thread stays anonymous.")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: pick("Aide & Anonymat", "المساعدة والخصوصية", "Help & Anonymity"),
			subtitle: pick("Tout ce qu'il faut savoir sur votre protection.", "كل ما يجب معرفته عن حمايتك.", "Everything to know about your protection.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 rounded-2xl mb-6 gradient-hero border-brand/20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-11 h-11 rounded-2xl gradient-brand flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-white" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-semibold",
					children: pick("Vos garanties", "ضماناتك", "Your guarantees")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: pick("5 protections activées par défaut", "5 حمايات مفعلة افتراضياً", "5 protections enabled by default")
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: guarantees.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-success mt-0.5 shrink-0" }),
						" ",
						g
					]
				}, i))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-semibold mb-4",
				children: "FAQ"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				children: faqs.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: `f${i}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "text-sm",
						children: f.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-sm text-muted-foreground",
						children: f.a
					})]
				}, i))
			})]
		})
	] });
}
//#endregion
export { HelpPage as component };
