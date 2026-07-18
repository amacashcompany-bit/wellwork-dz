import { o as __toESM } from "../_runtime.mjs";
import { t as wellwork_logo_mark_default } from "./wellwork-logo-mark-BsK64D-m.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useAuth } from "./useAuth-DFflI0UN.mjs";
import { t as billingDb } from "./billing-DEq1fU35.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { W as LoaderCircle, _ as ShieldCheck, _t as CircleCheck, kt as Building2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activate-2Q-J616z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ActivateCompanyPage() {
	const { user, loading } = useAuth();
	const [token, setToken] = (0, import_react.useState)("");
	const [companyName, setCompanyName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const value = new URLSearchParams(window.location.search).get("token") || sessionStorage.getItem("wellwork-activation-token") || "";
		if (value) sessionStorage.setItem("wellwork-activation-token", value);
		setToken(value);
		if (!loading && !user && value) window.location.replace(`/auth?payment=${value}`);
	}, [loading, user]);
	const activate = async () => {
		if (!token || !companyName.trim()) return;
		const finalSlug = (slug || companyName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
		setBusy(true);
		const { error } = await billingDb.rpc("create_paid_space", {
			p_activation_token: token,
			p_name: companyName.trim(),
			p_slug: finalSlug
		});
		setBusy(false);
		if (error) return toast.error(error.message);
		sessionStorage.removeItem("wellwork-activation-token");
		toast.success("Votre espace entreprise est prêt");
		window.location.replace("/admin/dashboard");
	};
	if (loading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-brand" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg border border-border bg-card p-6 shadow-sm rounded-lg sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-8 flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: wellwork_logo_mark_default,
						alt: "Wellwork",
						className: "h-10 w-10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold",
						children: "Wellwork"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold",
						children: "Activer votre espace"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Paiement validé. Donnez un nom à l'espace administrateur de votre entreprise."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nom de l'entreprise" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: companyName,
							onChange: (event) => setCompanyName(event.target.value),
							className: "mt-1",
							placeholder: "Ex. TechDZ"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Identifiant de l'espace" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: slug,
								onChange: (event) => setSlug(event.target.value),
								className: "mt-1",
								placeholder: "tech-dz"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Généré automatiquement si ce champ reste vide."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: activate,
							disabled: busy || !companyName.trim() || !token,
							className: "w-full bg-brand text-white",
							children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "me-2 h-4 w-4" }), "Créer l'espace"] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-2 text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), "Activation unique et sécurisée"]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { ActivateCompanyPage as component };
