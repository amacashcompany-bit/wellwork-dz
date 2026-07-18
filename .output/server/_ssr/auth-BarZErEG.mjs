import { o as __toESM } from "../_runtime.mjs";
import { t as wellwork_logo_mark_default } from "./wellwork-logo-mark-BsK64D-m.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { W as LoaderCircle, _ as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BarZErEG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("signin");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [activationToken, setActivationToken] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const token = new URLSearchParams(window.location.search).get("payment") || sessionStorage.getItem("wellwork-activation-token") || "";
		if (token) {
			sessionStorage.setItem("wellwork-activation-token", token);
			setActivationToken(token);
			setTab("signup");
		}
	}, []);
	const continueAfterAuth = () => {
		if (activationToken) {
			window.location.assign(`/activate?token=${activationToken}`);
			return;
		}
		navigate({
			to: "/onboarding",
			replace: true
		});
	};
	const doSignIn = async () => {
		setBusy(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setBusy(false);
		if (error) return toast.error(error.message);
		toast.success("Bienvenue");
		continueAfterAuth();
	};
	const doSignUp = async () => {
		setBusy(true);
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: window.location.origin,
				data: { full_name: fullName }
			}
		});
		setBusy(false);
		if (error) return toast.error(error.message);
		toast.success("Compte créé");
		continueAfterAuth();
	};
	const doGoogle = async () => {
		setBusy(true);
		sessionStorage.removeItem("wellwork-employee-onboarding");
		sessionStorage.setItem("wellwork-oauth-intent", "onboarding");
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
				queryParams: { prompt: "select_account" }
			}
		});
		setBusy(false);
		if (error) {
			sessionStorage.removeItem("wellwork-oauth-intent");
			return toast.error(error.message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen relative flex items-center justify-center px-4 py-12 gradient-mesh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 opacity-30 pointer-events-none",
			style: { background: "radial-gradient(1200px 600px at 20% 20%, rgba(139,92,246,0.4), transparent 60%), radial-gradient(1000px 500px at 80% 80%, rgba(56,189,248,0.25), transparent 60%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .5 },
			className: "relative w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2 justify-center mb-6 text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: wellwork_logo_mark_default,
					alt: "Wellwork",
					className: "w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display font-bold text-lg",
					children: "Wellwork"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-widest text-muted-foreground",
					children: "QVT · Prévention RPS"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-8 rounded-3xl bg-card border text-card-foreground shadow-glow",
				children: [
					activationToken && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-5 rounded-md border border-brand/30 bg-brand/5 p-3 text-sm text-foreground",
						children: "Votre paiement est validé. Créez ou connectez votre compte pour activer l'espace entreprise."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						value: tab,
						onValueChange: (v) => setTab(v),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid grid-cols-2 w-full bg-muted border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signin",
									className: "data-[state=active]:bg-brand data-[state=active]:text-white",
									children: "Connexion"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signup",
									className: "data-[state=active]:bg-brand data-[state=active]:text-white",
									children: "Créer un compte"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "signin",
								className: "mt-6 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-foreground/80",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										className: "mt-1 bg-background border-border text-foreground placeholder:text-muted-foreground"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-foreground/80",
										children: "Mot de passe"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										className: "mt-1 bg-background border-border text-foreground"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: doSignIn,
										disabled: busy,
										className: "w-full gradient-brand text-white border-0 h-11",
										children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Se connecter"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "signup",
								className: "mt-6 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-foreground/80",
										children: "Nom complet"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: fullName,
										onChange: (e) => setFullName(e.target.value),
										className: "mt-1 bg-background border-border text-foreground"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-foreground/80",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										className: "mt-1 bg-background border-border text-foreground"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-foreground/80",
										children: "Mot de passe"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										className: "mt-1 bg-background border-border text-foreground"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: doSignUp,
										disabled: busy,
										className: "w-full gradient-brand text-white border-0 h-11",
										children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Créer mon compte"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-border" }),
							" ou ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: doGoogle,
						disabled: busy,
						variant: "outline",
						className: "w-full h-11 bg-card text-card-foreground hover:bg-muted border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "w-4 h-4 me-2",
							viewBox: "0 0 24 24",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#4285F4",
									d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#34A853",
									d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#FBBC05",
									d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#EA4335",
									d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								})
							]
						}), "Continuer avec Google"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-center text-[11px] text-muted-foreground",
						children: "L'identifiant employé sera demandé après Google. Votre email de connexion reste privé."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5" }), " Conforme Loi 18-07 · Anonymat strict"]
					})
				]
			})]
		})]
	});
}
//#endregion
export { AuthPage as component };
