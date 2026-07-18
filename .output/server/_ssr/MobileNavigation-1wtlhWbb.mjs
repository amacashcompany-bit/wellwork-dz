import { o as __toESM } from "../_runtime.mjs";
import { t as wellwork_logo_mark_default } from "./wellwork-logo-mark-BsK64D-m.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace, r as useManagerPermissions, t as hasRole } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as Bot, C as ScrollText, Et as Calendar, G as Lightbulb, H as LogOut, L as MessageSquare, Mt as BookOpen, Nt as Bell, O as Plug, Tt as ChartColumn, Z as House, c as UserCog, g as ShieldQuestionMark, i as Users, lt as CreditCard, n as X, q as LayoutDashboard, y as Settings, z as Menu } from "../_libs/lucide-react.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MobileNavigation-1wtlhWbb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet$1 = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function managerAccessForPath(pathname) {
	if (pathname === "/admin" || pathname.startsWith("/admin/dashboard")) return null;
	if (pathname.startsWith("/admin/employees")) return "employees";
	if (pathname.startsWith("/admin/surveys")) return "surveys";
	if (pathname.startsWith("/admin/anonymous") || pathname.startsWith("/admin/burnout") || pathname.startsWith("/admin/alerts")) return "alerts";
	if (pathname.startsWith("/admin/actions")) return "actions";
	if (pathname.startsWith("/admin/library")) return "library";
	if (pathname.startsWith("/admin/events")) return "events";
	if (pathname.startsWith("/admin/messages")) return "messages";
	if (pathname.startsWith("/admin/reports")) return "reports";
	if (pathname.startsWith("/admin/erp")) return "erp";
	return "admin_only";
}
var adminItems = [
	{
		to: "/admin/dashboard",
		icon: LayoutDashboard,
		label: [
			"Tableau",
			"الرئيسية",
			"Dashboard"
		]
	},
	{
		to: "/admin/employees",
		icon: Users,
		label: [
			"Employés",
			"الموظفون",
			"Employees"
		]
	},
	{
		to: "/admin/team",
		icon: UserCog,
		label: [
			"Équipe",
			"الفريق",
			"Team"
		],
		adminOnly: true
	},
	{
		to: "/admin/surveys",
		icon: ScrollText,
		label: [
			"Enquêtes",
			"الاستبيانات",
			"Surveys"
		]
	},
	{
		to: "/admin/anonymous",
		icon: ShieldQuestionMark,
		label: [
			"Anonyme",
			"مجهول",
			"Anonymous"
		]
	},
	{
		to: "/admin/burnout",
		icon: Bot,
		label: [
			"Burn-out",
			"الاحتراق",
			"Burnout"
		]
	},
	{
		to: "/admin/alerts",
		icon: Bell,
		label: [
			"Alertes",
			"التنبيهات",
			"Alerts"
		]
	},
	{
		to: "/admin/actions",
		icon: Lightbulb,
		label: [
			"Actions",
			"الإجراءات",
			"Actions"
		]
	},
	{
		to: "/admin/events",
		icon: Calendar,
		label: [
			"Événements",
			"الفعاليات",
			"Events"
		]
	},
	{
		to: "/admin/library",
		icon: BookOpen,
		label: [
			"Bibliothèque",
			"المكتبة",
			"Library"
		]
	},
	{
		to: "/admin/messages",
		icon: MessageSquare,
		label: [
			"Messages",
			"الرسائل",
			"Messages"
		]
	},
	{
		to: "/admin/erp",
		icon: Plug,
		label: [
			"ERP / KPI",
			"المؤشرات",
			"ERP / KPI"
		]
	},
	{
		to: "/admin/reports",
		icon: ChartColumn,
		label: [
			"Rapports",
			"التقارير",
			"Reports"
		]
	},
	{
		to: "/admin/settings",
		icon: Settings,
		label: [
			"Réglages",
			"الإعدادات",
			"Settings"
		],
		adminOnly: true
	}
];
var employeeItems = [
	{
		to: "/employee/home",
		icon: House,
		label: [
			"Accueil",
			"الرئيسية",
			"Home"
		]
	},
	{
		to: "/employee/surveys",
		icon: ScrollText,
		label: [
			"Sondages",
			"الاستبيانات",
			"Surveys"
		]
	},
	{
		to: "/employee/feedback",
		icon: ShieldQuestionMark,
		label: [
			"Anonyme",
			"مجهول",
			"Anonymous"
		]
	},
	{
		to: "/employee/library",
		icon: BookOpen,
		label: [
			"Ressources",
			"الموارد",
			"Resources"
		]
	},
	{
		to: "/employee/events",
		icon: Calendar,
		label: [
			"Événements",
			"الفعاليات",
			"Events"
		]
	},
	{
		to: "/employee/messages",
		icon: MessageSquare,
		label: [
			"Messages",
			"الرسائل",
			"Messages"
		]
	}
];
var superAdminItems = [
	{
		to: "/superadmin",
		icon: LayoutDashboard,
		label: [
			"Tableau",
			"الرئيسية",
			"Dashboard"
		]
	},
	{
		to: "/superadmin/plans",
		icon: Settings,
		label: [
			"Offres",
			"الخطط",
			"Plans"
		]
	},
	{
		to: "/superadmin/billing",
		icon: CreditCard,
		label: [
			"Paiements",
			"المدفوعات",
			"Payments"
		]
	},
	{
		to: "/",
		icon: House,
		label: [
			"Site",
			"الموقع",
			"Website"
		]
	}
];
function isActivePath(pathname, to) {
	return pathname === to || to !== "/" && pathname.startsWith(`${to}/`);
}
function MobileNavigation({ variant = "workspace", onLogout }) {
	const location = useLocation();
	const { pick } = useI18n();
	const { info } = useMySpace();
	const open = useStore((state) => state.isMobileNavOpen);
	const setOpen = useStore((state) => state.setMobileNavOpen);
	const isEmployee = variant === "workspace" && hasRole(info?.roles ?? [], "employee");
	const isManager = variant === "workspace" && hasRole(info?.roles ?? [], "manager") && !hasRole(info?.roles ?? [], ["hr_admin", "super_admin"]);
	const { permissions } = useManagerPermissions(info?.spaceId ?? null, isManager);
	const items = variant === "superadmin" ? superAdminItems : isEmployee ? employeeItems : isManager ? adminItems.filter((item) => {
		if (item.adminOnly) return false;
		const required = managerAccessForPath(item.to);
		return required === null || required !== "admin_only" && permissions.has(required);
	}) : adminItems;
	const primaryItems = (isEmployee ? [
		"/employee/home",
		"/employee/surveys",
		"/employee/feedback",
		"/employee/messages"
	] : variant === "superadmin" ? [
		"/superadmin",
		"/superadmin/plans",
		"/superadmin/billing",
		"/"
	] : [
		"/admin/dashboard",
		"/admin/employees",
		"/admin/surveys",
		"/admin/alerts"
	]).map((path) => items.find((item) => item.to === path)).filter((item) => Boolean(item));
	const moreIsActive = !primaryItems.some((item) => isActivePath(location.pathname, item.to));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": pick("Navigation mobile", "التنقل عبر الهاتف", "Mobile navigation"),
		className: "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 h-16 border border-border/80 bg-card/95 shadow-[0_12px_34px_rgba(15,23,42,0.18)] backdrop-blur-xl md:hidden rounded-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid h-full grid-cols-5 items-center px-1",
			children: [
				primaryItems.map((item) => {
					const active = isActivePath(location.pathname, item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: () => setOpen(false),
						className: "flex min-w-0 flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							animate: { y: active ? -3 : 0 },
							transition: {
								type: "spring",
								stiffness: 420,
								damping: 30
							},
							className: `grid h-8 w-9 place-items-center rounded-md ${active ? "bg-brand text-white shadow-[0_6px_16px_rgba(16,185,129,0.28)]" : "text-muted-foreground"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-[18px] w-[18px]" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `w-full truncate px-1 text-center ${active ? "text-brand" : ""}`,
							children: pick(...item.label)
						})]
					}, item.to);
				}),
				Array.from({ length: Math.max(0, 4 - primaryItems.length) }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, `spacer-${index}`)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpen(true),
					className: "flex min-w-0 flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `grid h-8 w-9 place-items-center rounded-md ${moreIsActive ? "bg-brand text-white shadow-[0_6px_16px_rgba(16,185,129,0.28)]" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-[18px] w-[18px]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: moreIsActive ? "text-brand" : "",
						children: pick("Plus", "المزيد", "More")
					})]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet$1, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "bottom",
			className: "max-h-[78dvh] overflow-y-auto rounded-t-lg px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-5 md:hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "text-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: wellwork_logo_mark_default,
							alt: "WellWork",
							className: "h-9 w-9 object-contain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "text-base",
							children: "WellWork"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
							className: "text-xs",
							children: pick("Navigation", "التنقل", "Navigation")
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid grid-cols-3 gap-2",
					children: items.map((item) => {
						const active = isActivePath(location.pathname, item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							onClick: () => setOpen(false),
							className: `flex min-h-20 flex-col items-center justify-center gap-2 rounded-md border px-2 py-3 text-center text-xs font-medium ${active ? "border-brand/40 bg-brand/10 text-brand" : "border-border bg-background text-muted-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-full break-words",
								children: pick(...item.label)
							})]
						}, item.to);
					})
				}),
				onLogout && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => {
						setOpen(false);
						onLogout();
					},
					className: "mt-4 h-11 w-full justify-center gap-2 border border-destructive/25 bg-destructive/5 text-destructive hover:bg-destructive/10 hover:text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), pick("Déconnexion", "تسجيل الخروج", "Logout")]
				})
			]
		})
	})] });
}
//#endregion
export { managerAccessForPath as n, MobileNavigation as t };
