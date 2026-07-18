import { o as __toESM } from "../_runtime.mjs";
import { t as wellwork_logo_mark_default } from "./wellwork-logo-mark-BsK64D-m.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace, n as useAuth } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Plus, W as LoaderCircle, Y as KeyRound, _t as CircleCheck, kt as Building2, x as Send } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-CNyNpG7p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OnboardingPage() {
	const navigate = useNavigate();
	const { user, loading: authLoading, signOut } = useAuth();
	const { info, loading: spaceLoading, refetch } = useMySpace();
	const [mode, setMode] = (0, import_react.useState)("choose");
	const [companyName, setCompanyName] = (0, import_react.useState)("");
	const [companyDesc, setCompanyDesc] = (0, import_react.useState)("");
	const [contactName, setContactName] = (0, import_react.useState)("");
	const [contactPhone, setContactPhone] = (0, import_react.useState)("");
	const [accessToken, setAccessToken] = (0, import_react.useState)("");
	const [spaceName, setSpaceName] = (0, import_react.useState)("");
	const [spaceSlug, setSpaceSlug] = (0, import_react.useState)("");
	const [employeeId, setEmployeeId] = (0, import_react.useState)("");
	const [inviteCode, setInviteCode] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [googleEmployeeFlow, setGoogleEmployeeFlow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem("wellwork-employee-onboarding") === "true") {
			setGoogleEmployeeFlow(true);
			setMode("join_employee");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		if (!user) {
			navigate({
				to: "/auth",
				replace: true
			});
			return;
		}
		if (spaceLoading) return;
		if (info?.roles.includes("super_admin")) {
			navigate({
				to: "/superadmin",
				replace: true
			});
			return;
		}
		if (info?.spaceId) {
			const isAdmin = info.roles.includes("hr_admin") || info.roles.includes("manager");
			navigate({
				to: isAdmin ? "/admin/dashboard" : "/employee/home",
				replace: true
			});
		}
	}, [
		authLoading,
		spaceLoading,
		user,
		info,
		navigate
	]);
	const requestDemo = async () => {
		if (!user || !companyName.trim() || !contactName.trim()) return;
		setBusy(true);
		const { error } = await supabase.from("demo_requests").insert({
			company_name: companyName.trim(),
			company_description: companyDesc.trim(),
			contact_name: contactName.trim(),
			contact_email: user.email,
			contact_phone: contactPhone.trim()
		});
		setBusy(false);
		if (error) return toast.error(error.message);
		toast.success("Demande envoyée !");
		setMode("demo_success");
	};
	const createTrialSpace = async () => {
		if (!user || !accessToken.trim() || !spaceName.trim()) return;
		setBusy(true);
		const finalSlug = (spaceSlug || spaceName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || `space-${Date.now()}`;
		const { data, error } = await supabase.rpc("create_trial_space", {
			p_token: accessToken.trim(),
			p_name: spaceName.trim(),
			p_slug: finalSlug
		});
		setBusy(false);
		if (error) return toast.error(error.message || "Erreur lors de la création de l'espace");
		toast.success("Espace créé avec succès ! Votre essai commence maintenant.");
		refetch();
		navigate({
			to: "/admin/dashboard",
			replace: true
		});
	};
	const joinWithEmployeeId = async () => {
		if (!user || !employeeId.trim()) return;
		setBusy(true);
		const { error } = await supabase.rpc.bind(supabase)("claim_employee_id", { p_employee_code: employeeId.trim().toUpperCase() });
		setBusy(false);
		if (error) return toast.error(error.message || "Identifiant salarie invalide ou deja utilise");
		sessionStorage.removeItem("wellwork-employee-onboarding");
		toast.success("Compte salarie active");
		refetch();
		navigate({
			to: "/employee/home",
			replace: true
		});
	};
	const joinWithManagerCode = async () => {
		if (!user || !inviteCode.trim()) return;
		setBusy(true);
		const { data, error } = await supabase.rpc("redeem_space_invite", { _code: inviteCode.trim() });
		setBusy(false);
		if (error || !data || !data.length) return toast.error(error?.message || "Code manager invalide ou expire");
		toast.success("Acces manager active");
		refetch();
		navigate({
			to: "/admin/dashboard",
			replace: true
		});
	};
	if (authLoading || spaceLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin text-brand" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen gradient-mesh flex items-center justify-center px-4 py-12 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "w-full max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 justify-center mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: wellwork_logo_mark_default,
						alt: "Wellwork",
						className: "w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display font-bold text-lg",
						children: "Wellwork"
					})]
				}),
				mode === "choose" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-8 rounded-3xl glass-dark border-white/10 text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-2xl font-bold text-center mb-2",
							children: ["Bienvenue", user?.email ? `, ${user.email.split("@")[0]}` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm text-center mb-8",
							children: "Comment souhaitez-vous utiliser Wellwork ?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setMode("join_employee"),
									className: "text-left p-6 rounded-2xl bg-background border hover:border-brand hover:bg-muted transition-all flex flex-col items-center text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-6 h-6 mb-3 text-brand" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-sm",
											children: "Salarié"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground mt-1",
											children: "J'ai mon identifiant employé (EMP-...)"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setMode("join_manager"),
									className: "text-left p-6 rounded-2xl bg-background border hover:border-brand hover:bg-muted transition-all flex flex-col items-center text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-6 h-6 mb-3 text-brand" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-sm",
											children: "Manager RH"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground mt-1",
											children: "J'ai un code manager (WW-...)"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setMode("join_token"),
									className: "text-left p-6 rounded-2xl bg-background border hover:border-brand hover:bg-muted transition-all flex flex-col items-center text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-6 h-6 mb-3 text-brand" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-sm",
											children: "Créer l'Espace"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground mt-1",
											children: "J'ai un jeton d'accès démo"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setMode("request_demo"),
									className: "text-left p-6 rounded-2xl bg-background border hover:border-brand hover:bg-muted transition-all flex flex-col items-center text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-6 h-6 mb-3 text-brand" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-sm",
											children: "Demander une Démo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground mt-1",
											children: "Je veux inscrire mon entreprise"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: signOut,
								className: "text-xs text-muted-foreground hover:text-foreground",
								children: "Se déconnecter"
							})
						})
					]
				}),
				mode === "request_demo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-8 rounded-3xl glass-dark border-white/10 text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-6 h-6 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-xl font-bold",
								children: "Demander une Démo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mb-6",
							children: "Parlez-nous de votre entreprise. Notre équipe examinera votre demande et vous enverra un jeton d'accès."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-foreground/80",
									children: "Nom de l'entreprise"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: companyName,
									onChange: (e) => setCompanyName(e.target.value),
									placeholder: "Ex. TechDZ",
									className: "mt-1 bg-background border-border text-foreground"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-foreground/80",
									children: "Description / Besoins"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: companyDesc,
									onChange: (e) => setCompanyDesc(e.target.value),
									placeholder: "Décrivez votre entreprise et vos besoins...",
									className: "mt-1 bg-background border-border text-foreground min-h-[80px]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-foreground/80",
										children: "Votre nom"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: contactName,
										onChange: (e) => setContactName(e.target.value),
										placeholder: "Jean Dupont",
										className: "mt-1 bg-background border-border text-foreground"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-foreground/80",
										children: "Téléphone (Optionnel)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: contactPhone,
										onChange: (e) => setContactPhone(e.target.value),
										placeholder: "+213 555 55 55",
										className: "mt-1 bg-background border-border text-foreground"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										onClick: () => googleEmployeeFlow ? signOut() : setMode("choose"),
										className: "bg-transparent border-border text-foreground hover:bg-muted",
										children: googleEmployeeFlow ? "Changer de compte" : "Retour"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: requestDemo,
										disabled: busy || !companyName.trim() || !contactName.trim(),
										className: "flex-1 gradient-brand border-0 h-11",
										children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Envoyer la demande"
									})]
								})
							]
						})
					]
				}),
				mode === "demo_success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-10 rounded-3xl bg-card border-brand/30 text-center text-card-foreground relative overflow-hidden shadow-elegant",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-brand/5 backdrop-blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex flex-col items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: { scale: 0 },
								animate: { scale: 1 },
								transition: {
									type: "spring",
									damping: 12,
									delay: .1
								},
								className: "w-16 h-16 rounded-full gradient-brand flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)] mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-8 h-8 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { delay: .2 },
								className: "text-2xl md:text-3xl font-bold font-display mb-3",
								children: "Demande envoyée avec succès !"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { delay: .3 },
								className: "text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed text-sm",
								children: "Merci de l'intérêt que vous portez à WellWork. Notre équipe examinera votre demande et vous enverra un jeton d'accès sécurisé par email très rapidement."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								transition: { delay: .4 },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => setMode("choose"),
									variant: "outline",
									className: "bg-transparent border-border text-foreground hover:bg-muted rounded-full px-8",
									children: "Retour à l'accueil"
								})
							})
						]
					})]
				}),
				mode === "join_token" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-8 rounded-3xl glass-dark border-white/10 text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-6 h-6 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-bold",
							children: "Activer votre Espace Démo"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-foreground/80",
								children: "Jeton d'accès (Reçu par email)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: accessToken,
								onChange: (e) => setAccessToken(e.target.value),
								placeholder: "Ex. 123e4567-e89b-12d3...",
								className: "mt-1 bg-background border-border text-foreground font-mono"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-foreground/80",
								children: "Nom de l'organisation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: spaceName,
								onChange: (e) => setSpaceName(e.target.value),
								placeholder: "Ex. TechDZ",
								className: "mt-1 bg-background border-border text-foreground"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-foreground/80",
									children: "Identifiant unique (slug)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: spaceSlug,
									onChange: (e) => setSpaceSlug(e.target.value),
									placeholder: "tech-dz",
									className: "mt-1 bg-background border-border text-foreground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground mt-1",
									children: "Auto-généré à partir du nom si vide."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => setMode("choose"),
									className: "bg-transparent border-border text-foreground hover:bg-muted",
									children: "Retour"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: createTrialSpace,
									disabled: busy || !accessToken.trim() || !spaceName.trim(),
									className: "flex-1 gradient-brand border-0 h-11",
									children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Créer l'espace"
								})]
							})
						]
					})]
				}),
				mode === "join_employee" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-8 rounded-3xl glass-dark border-white/10 text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-6 h-6 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-bold",
							children: "Activer mon compte salarié"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-foreground/80",
								children: "Identifiant employé"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: employeeId,
								onChange: (e) => setEmployeeId(e.target.value.toUpperCase()),
								placeholder: "Ex. EMP-0142",
								className: "mt-1 bg-background border-border text-foreground font-mono tracking-wider"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "Utilisez l'identifiant figurant dans le registre de votre entreprise. Votre identité de connexion reste privée."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setMode("choose"),
								className: "bg-transparent border-border text-foreground hover:bg-muted",
								children: "Retour"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: joinWithEmployeeId,
								disabled: busy || !employeeId.trim(),
								className: "flex-1 gradient-brand border-0 h-11",
								children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Activer mon compte"
							})]
						})]
					})]
				}),
				mode === "join_manager" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-8 rounded-3xl glass-dark border-white/10 text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-6 h-6 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-bold",
							children: "Accès manager RH"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-foreground/80",
								children: "Code manager"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: inviteCode,
								onChange: (e) => setInviteCode(e.target.value.toUpperCase()),
								placeholder: "Ex. WW-4G7K-9XZ2",
								className: "mt-1 bg-background border-border text-foreground font-mono tracking-wider"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "Ce code est créé par l'administrateur. Vos modules seront limités aux permissions qu'il a choisies."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setMode("choose"),
								className: "bg-transparent border-border text-foreground hover:bg-muted",
								children: "Retour"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: joinWithManagerCode,
								disabled: busy || !inviteCode.trim(),
								className: "flex-1 gradient-brand border-0 h-11",
								children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Rejoindre l'espace manager"
							})]
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { OnboardingPage as component };
