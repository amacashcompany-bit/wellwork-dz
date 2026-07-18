import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useThemeSync } from "./useTheme-CdTh4wvP.mjs";
import { a as motion, n as useReducedMotion, o as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-5Vx0-ogI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B7fjEsQt.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function SplashScreen() {
	const [show, setShow] = (0, import_react.useState)(true);
	const prefersReducedMotion = useReducedMotion();
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem("wellwork-splash-shown")) {
			setShow(false);
			return;
		}
		const timer = setTimeout(() => {
			setShow(false);
			sessionStorage.setItem("wellwork-splash-shown", "true");
		}, prefersReducedMotion ? 700 : 1800);
		return () => clearTimeout(timer);
	}, [prefersReducedMotion]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: show && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: prefersReducedMotion ? .15 : .35,
			ease: "easeOut"
		},
		className: "fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background md:hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-6 top-8 h-px bg-border/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-6 bottom-8 h-px bg-border/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: prefersReducedMotion ? { opacity: 0 } : {
					scale: .92,
					opacity: 0,
					y: 8
				},
				animate: {
					scale: 1,
					opacity: 1,
					y: 0
				},
				transition: {
					duration: prefersReducedMotion ? .2 : .55,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "relative z-10 flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mb-6 grid h-24 w-24 place-items-center rounded-lg border border-brand/30 bg-card shadow-[0_18px_40px_rgba(15,23,42,0.12)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							initial: prefersReducedMotion ? void 0 : {
								scale: .78,
								rotate: -8
							},
							animate: {
								scale: 1,
								rotate: 0
							},
							transition: {
								delay: .08,
								duration: .5,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "absolute inset-2 rounded-md border border-border/80"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/wellwork-logo-mark-Bo16x6Vw.png",
							alt: "Wellwork",
							className: "relative h-16 w-16 object-contain"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: prefersReducedMotion ? 0 : .18,
							duration: .4
						},
						className: "mb-2 flex items-center text-4xl font-display font-bold text-foreground",
						children: ["Well", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: "work"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: {
							delay: prefersReducedMotion ? 0 : .35,
							duration: .35
						},
						className: "text-xs font-medium text-muted-foreground",
						children: "QVT · Prévention RPS"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					delay: prefersReducedMotion ? 0 : .45,
					duration: .3
				},
				className: "absolute bottom-[max(3.5rem,env(safe-area-inset-bottom))] w-36",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 text-center text-[10px] font-medium text-muted-foreground",
					children: "Votre espace bien-être"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "h-full rounded-full bg-brand",
						initial: { width: "0%" },
						animate: { width: "100%" },
						transition: {
							duration: prefersReducedMotion ? .3 : 1.25,
							ease: "easeInOut"
						}
					})
				})]
			})
		]
	}) });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page introuvable"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Cette page n'existe pas ou a été déplacée."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Retour à l'accueil"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Une erreur est survenue"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Vous pouvez réessayer ou revenir à l'accueil."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Réessayer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
						children: "Accueil"
					})]
				})
			]
		})
	});
}
var Route$35 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "WellWork" },
			{
				name: "description",
				content: "Prévenez les risques psychosociaux avant qu'ils ne touchent votre entreprise. Plateforme QVT multi-tenant, anonymat cryptographique, IA burn-out. Conforme Loi 18-07."
			},
			{
				property: "og:title",
				content: "WellWork"
			},
			{
				property: "og:description",
				content: "Prévenez les risques psychosociaux avant qu'ils ne touchent votre entreprise. Plateforme QVT multi-tenant, anonymat cryptographique, IA burn-out. Conforme Loi 18-07."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "WellWork"
			},
			{
				name: "twitter:description",
				content: "Prévenez les risques psychosociaux avant qu'ils ne touchent votre entreprise. Plateforme QVT multi-tenant, anonymat cryptographique, IA burn-out. Conforme Loi 18-07."
			},
			{
				property: "og:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9af00c09-7606-4bd7-a1a9-0d5303d764a7"
			},
			{
				name: "twitter:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9af00c09-7606-4bd7-a1a9-0d5303d764a7"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	useThemeSync();
	const { queryClient } = Route$35.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplashScreen, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
	});
}
var $$splitComponentImporter$34 = () => import("./superadmin-CDDXc1NK.mjs");
var Route$34 = createFileRoute("/superadmin")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./onboarding-CNyNpG7p.mjs");
var Route$33 = createFileRoute("/onboarding")({
	head: () => ({ meta: [{ title: "Bienvenue — Wellwork" }] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./employee-BbEsE3O9.mjs");
var Route$32 = createFileRoute("/employee")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./checkout-Xb5b9g43.mjs");
var Route$31 = createFileRoute("/checkout")({
	ssr: false,
	head: () => ({ meta: [{ title: "Paiement sécurisé - Wellwork" }] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./auth-BarZErEG.mjs");
var Route$30 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Connexion — Wellwork" }] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./admin-BGMUNF3k.mjs");
var Route$29 = createFileRoute("/admin")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./activate-2Q-J616z.mjs");
var Route$28 = createFileRoute("/activate")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./routes-B6-ZSElK.mjs");
var Route$27 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "WellWork" },
		{
			name: "description",
			content: "Prévenez les risques psychosociaux avant qu'ils ne touchent votre entreprise. Plateforme QVT multi-tenant, anonymat cryptographique, IA burn-out. Conforme Loi 18-07."
		},
		{
			property: "og:title",
			content: "WellWork"
		},
		{
			property: "og:description",
			content: "Prévenez les risques psychosociaux avant qu'ils ne touchent votre entreprise. Plateforme QVT multi-tenant, anonymat cryptographique, IA burn-out. Conforme Loi 18-07."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./superadmin.index-BuK5U3wZ.mjs");
var Route$26 = createFileRoute("/superadmin/")({
	head: () => ({ meta: [{ title: "Super Admin Dashboard — Wellwork" }] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./employee.index-Ll3-SU4Q.mjs");
var Route$25 = createFileRoute("/employee/")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./admin.index-CESb61a4.mjs");
var Route$24 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("./superadmin.plans-SL41YBl_.mjs");
var Route$23 = createFileRoute("/superadmin/plans")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
var $$splitComponentImporter$22 = () => import("./superadmin.billing-TU0B6dOB.mjs");
var Route$22 = createFileRoute("/superadmin/billing")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./employee.surveys-DxbqJFiW.mjs");
var Route$21 = createFileRoute("/employee/surveys")({
	head: () => ({ meta: [{ title: "Mes questionnaires — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./employee.messages-D0_VInvk.mjs");
var Route$20 = createFileRoute("/employee/messages")({
	head: () => ({ meta: [{ title: "Mes messages — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./employee.library-DCAaGyNo.mjs");
var Route$19 = createFileRoute("/employee/library")({
	head: () => ({ meta: [{ title: "Bibliothèque — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./employee.home-DtY0aDac.mjs");
var Route$18 = createFileRoute("/employee/home")({
	head: () => ({ meta: [{ title: "Accueil — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./employee.help-J92542Un.mjs");
var Route$17 = createFileRoute("/employee/help")({
	head: () => ({ meta: [{ title: "Aide & Anonymat — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./employee.feedback-uCaGFJMn.mjs");
var Route$16 = createFileRoute("/employee/feedback")({
	head: () => ({ meta: [{ title: "Feedback anonyme — Wellwork" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./employee.events-CPIPaWLm.mjs");
var Route$15 = createFileRoute("/employee/events")({
	head: () => ({ meta: [{ title: "Événements — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./auth.callback-_eAoUmUC.mjs");
var Route$14 = createFileRoute("/auth/callback")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./admin.team-CEFnHxjS.mjs");
var Route$13 = createFileRoute("/admin/team")({
	head: () => ({ meta: [{ title: "Équipe & invitations — WellWork" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./admin.surveys-CZEaGVmS.mjs");
var Route$12 = createFileRoute("/admin/surveys")({
	head: () => ({ meta: [{ title: "Questionnaires — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin.settings-CCuY1Z9G.mjs");
var Route$11 = createFileRoute("/admin/settings")({
	head: () => ({ meta: [{ title: "Paramètres — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin.reports-DWWqffiO.mjs");
var Route$10 = createFileRoute("/admin/reports")({
	head: () => ({ meta: [{ title: "Rapports — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./admin.messages-BZcftKpN.mjs");
var Route$9 = createFileRoute("/admin/messages")({
	head: () => ({ meta: [{ title: "Messagerie — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./admin.library-ztaS3YAe.mjs");
var Route$8 = createFileRoute("/admin/library")({
	head: () => ({ meta: [{ title: "Bibliothèque — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./admin.events-g_YdtQ-W.mjs");
var Route$7 = createFileRoute("/admin/events")({
	head: () => ({ meta: [{ title: "Événements — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin.erp-Ca3g3Ty8.mjs");
var Route$6 = createFileRoute("/admin/erp")({
	head: () => ({ meta: [{ title: "ERP — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.employees-CiTUt_QM.mjs");
var Route$5 = createFileRoute("/admin/employees")({
	head: () => ({ meta: [{ title: "Employés — WellWork" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.dashboard-BYjkQhgT.mjs");
var Route$4 = createFileRoute("/admin/dashboard")({
	head: () => ({ meta: [{ title: "Tableau de bord — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.burnout-CdScAjV0.mjs");
var Route$3 = createFileRoute("/admin/burnout")({
	head: () => ({ meta: [{ title: "Burn-out prevention - WellWork" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.anonymous-DNOqQwnp.mjs");
var Route$2 = createFileRoute("/admin/anonymous")({
	head: () => ({ meta: [{ title: "Espace Anonyme — Wellwork" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin.alerts-PZeImNlX.mjs");
var Route$1 = createFileRoute("/admin/alerts")({
	head: () => ({ meta: [{ title: "Alertes & Seuils — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.actions-CQHfZng_.mjs");
var Route = createFileRoute("/admin/actions")({
	head: () => ({ meta: [{ title: "Plans d'action — QVT-Care" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SuperadminRoute = Route$34.update({
	id: "/superadmin",
	path: "/superadmin",
	getParentRoute: () => Route$35
});
var OnboardingRoute = Route$33.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$35
});
var EmployeeRoute = Route$32.update({
	id: "/employee",
	path: "/employee",
	getParentRoute: () => Route$35
});
var CheckoutRoute = Route$31.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$35
});
var AuthRoute = Route$30.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$35
});
var AdminRoute = Route$29.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$35
});
var ActivateRoute = Route$28.update({
	id: "/activate",
	path: "/activate",
	getParentRoute: () => Route$35
});
var IndexRoute = Route$27.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$35
});
var SuperadminIndexRoute = Route$26.update({
	id: "/",
	path: "/",
	getParentRoute: () => SuperadminRoute
});
var EmployeeIndexRoute = Route$25.update({
	id: "/",
	path: "/",
	getParentRoute: () => EmployeeRoute
});
var AdminIndexRoute = Route$24.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var SuperadminPlansRoute = Route$23.update({
	id: "/plans",
	path: "/plans",
	getParentRoute: () => SuperadminRoute
});
var SuperadminBillingRoute = Route$22.update({
	id: "/billing",
	path: "/billing",
	getParentRoute: () => SuperadminRoute
});
var EmployeeSurveysRoute = Route$21.update({
	id: "/surveys",
	path: "/surveys",
	getParentRoute: () => EmployeeRoute
});
var EmployeeMessagesRoute = Route$20.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => EmployeeRoute
});
var EmployeeLibraryRoute = Route$19.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => EmployeeRoute
});
var EmployeeHomeRoute = Route$18.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => EmployeeRoute
});
var EmployeeHelpRoute = Route$17.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => EmployeeRoute
});
var EmployeeFeedbackRoute = Route$16.update({
	id: "/feedback",
	path: "/feedback",
	getParentRoute: () => EmployeeRoute
});
var EmployeeEventsRoute = Route$15.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => EmployeeRoute
});
var AuthCallbackRoute = Route$14.update({
	id: "/callback",
	path: "/callback",
	getParentRoute: () => AuthRoute
});
var AdminTeamRoute = Route$13.update({
	id: "/team",
	path: "/team",
	getParentRoute: () => AdminRoute
});
var AdminSurveysRoute = Route$12.update({
	id: "/surveys",
	path: "/surveys",
	getParentRoute: () => AdminRoute
});
var AdminSettingsRoute = Route$11.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var AdminReportsRoute = Route$10.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AdminRoute
});
var AdminMessagesRoute = Route$9.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => AdminRoute
});
var AdminLibraryRoute = Route$8.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => AdminRoute
});
var AdminEventsRoute = Route$7.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => AdminRoute
});
var AdminErpRoute = Route$6.update({
	id: "/erp",
	path: "/erp",
	getParentRoute: () => AdminRoute
});
var AdminEmployeesRoute = Route$5.update({
	id: "/employees",
	path: "/employees",
	getParentRoute: () => AdminRoute
});
var AdminDashboardRoute = Route$4.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AdminRoute
});
var AdminBurnoutRoute = Route$3.update({
	id: "/burnout",
	path: "/burnout",
	getParentRoute: () => AdminRoute
});
var AdminAnonymousRoute = Route$2.update({
	id: "/anonymous",
	path: "/anonymous",
	getParentRoute: () => AdminRoute
});
var AdminAlertsRoute = Route$1.update({
	id: "/alerts",
	path: "/alerts",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminActionsRoute: Route.update({
		id: "/actions",
		path: "/actions",
		getParentRoute: () => AdminRoute
	}),
	AdminAlertsRoute,
	AdminAnonymousRoute,
	AdminBurnoutRoute,
	AdminDashboardRoute,
	AdminEmployeesRoute,
	AdminErpRoute,
	AdminEventsRoute,
	AdminLibraryRoute,
	AdminMessagesRoute,
	AdminReportsRoute,
	AdminSettingsRoute,
	AdminSurveysRoute,
	AdminTeamRoute,
	AdminIndexRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var AuthRouteChildren = { AuthCallbackRoute };
var AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);
var EmployeeRouteChildren = {
	EmployeeEventsRoute,
	EmployeeFeedbackRoute,
	EmployeeHelpRoute,
	EmployeeHomeRoute,
	EmployeeLibraryRoute,
	EmployeeMessagesRoute,
	EmployeeSurveysRoute,
	EmployeeIndexRoute
};
var EmployeeRouteWithChildren = EmployeeRoute._addFileChildren(EmployeeRouteChildren);
var SuperadminRouteChildren = {
	SuperadminBillingRoute,
	SuperadminPlansRoute,
	SuperadminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	ActivateRoute,
	AdminRoute: AdminRouteWithChildren,
	AuthRoute: AuthRouteWithChildren,
	CheckoutRoute,
	EmployeeRoute: EmployeeRouteWithChildren,
	OnboardingRoute,
	SuperadminRoute: SuperadminRoute._addFileChildren(SuperadminRouteChildren)
};
var routeTree = Route$35._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
