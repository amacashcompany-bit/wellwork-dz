import { o as __toESM } from "../_runtime.mjs";
import { t as wellwork_logo_mark_default } from "./wellwork-logo-mark-BsK64D-m.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { W as LoaderCircle, _ as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.callback-_eAoUmUC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoogleAuthCallback() {
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let active = true;
		(async () => {
			const params = new URLSearchParams(window.location.search);
			const providerError = params.get("error_description") || params.get("error");
			if (providerError) {
				if (active) setError(providerError);
				return;
			}
			const code = params.get("code");
			if (!code) {
				if (active) setError("Code Google manquant. Veuillez recommencer la connexion.");
				return;
			}
			const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
			if (exchangeError) {
				if (active) setError(exchangeError.message);
				return;
			}
			const activationToken = sessionStorage.getItem("wellwork-activation-token");
			if (activationToken) {
				window.location.replace(`/activate?token=${activationToken}`);
				return;
			}
			sessionStorage.removeItem("wellwork-employee-onboarding");
			sessionStorage.removeItem("wellwork-oauth-intent");
			window.location.replace("/onboarding");
		})();
		return () => {
			active = false;
		};
	}, []);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md border border-border bg-card p-6 text-center shadow-sm rounded-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: wellwork_logo_mark_default,
					alt: "Wellwork",
					className: "mx-auto h-12 w-12"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-lg font-bold",
					children: "Connexion Google impossible"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5",
					onClick: () => window.location.replace("/auth"),
					children: "Retour à la connexion"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid h-16 w-16 place-items-center rounded-lg border border-brand/30 bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: wellwork_logo_mark_default,
						alt: "Wellwork",
						className: "h-11 w-11"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "absolute -bottom-2 -right-2 h-5 w-5 animate-spin rounded-full bg-background text-brand" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 font-semibold",
					children: "Connexion sécurisée"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Préparation de votre espace..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-brand" }), "Votre email Google reste privé dans les parcours salariés"]
				})
			]
		})
	});
}
//#endregion
export { GoogleAuthCallback as component };
