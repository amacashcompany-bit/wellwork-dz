import { o as __toESM } from "../_runtime.mjs";
import { t as wellwork_logo_mark_default } from "./wellwork-logo-mark-BsK64D-m.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace, n as useAuth, r as useManagerPermissions, t as hasRole } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { _ as useNavigate, g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as Bot, C as ScrollText, Et as Calendar, F as Moon, G as Lightbulb, H as LogOut, L as MessageSquare, M as PanelLeftOpen, Mt as BookOpen, N as PanelLeftClose, Nt as Bell, O as Plug, Tt as ChartColumn, W as LoaderCircle, X as Inbox, Z as House, _ as ShieldCheck, c as UserCog, g as ShieldQuestionMark, ht as CircleQuestionMark, i as Users, kt as Building2, o as User, p as Sun, q as LayoutDashboard, vt as CircleAlert, y as Settings, z as Menu } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { t as useThemeSync } from "./useTheme-CdTh4wvP.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-CDoe66ii.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BBUarmca.mjs";
import { n as useI18n, t as LANGS } from "./useI18n-C6quAtBX.mjs";
import { a as motion, o as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as MobileNavigation } from "./MobileNavigation-1wtlhWbb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-CBNkTu1o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TopNav() {
	const { t, language, setLanguage } = useI18n();
	useNavigate();
	const role = useStore((s) => s.role);
	useStore((s) => s.setRole);
	const isDark = useStore((s) => s.isDarkMode);
	const toggleDark = useStore((s) => s.toggleDarkMode);
	const currentLang = LANGS.find((l) => l.code === language);
	const { user, signOut } = useAuth();
	const { info } = useMySpace();
	info && hasRole(info.roles, [
		"hr_admin",
		"super_admin",
		"manager"
	]);
	const [showDeleteModal, setShowDeleteModal] = (0, import_react.useState)(false);
	const [deleteConfirmText, setDeleteConfirmText] = (0, import_react.useState)("");
	const [isDeleting, setIsDeleting] = (0, import_react.useState)(false);
	const handleDeleteAccount = async () => {
		if (deleteConfirmText !== "delete account") return;
		setIsDeleting(true);
		const { error } = await supabase.rpc("delete_my_account");
		setIsDeleting(false);
		if (error) {
			if (error.message.includes("violates foreign key constraint")) toast.error("Impossible de supprimer : vous êtes propriétaire d'un espace. Veuillez supprimer ou transférer l'espace d'abord.");
			else toast.error(error.message);
			return;
		}
		toast.success("Votre compte a été supprimé avec succès.");
		setShowDeleteModal(false);
		signOut();
	};
	const isSidebarCollapsed = useStore((s) => s.isSidebarCollapsed);
	const toggleSidebar = useStore((s) => s.toggleSidebar);
	const setMobileNavOpen = useStore((s) => s.setMobileNavOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed top-0 inset-x-0 z-50 h-16 glass border-b flex items-center px-4 md:px-6 gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: role === "admin" ? "/admin/dashboard" : "/employee/home",
				className: "flex items-center gap-2 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					src: wellwork_logo_mark_default,
					alt: "WellWork",
					className: "w-9 h-9 object-contain drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]",
					initial: {
						opacity: 0,
						scale: .85
					},
					animate: {
						opacity: 1,
						scale: 1
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
					},
					transition: {
						type: "spring",
						stiffness: 220,
						damping: 16
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden sm:block leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display font-bold text-sm",
						children: "Wellwork"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] text-muted-foreground",
						children: "Wellbeing Platform"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: toggleSidebar,
				className: "hidden md:flex shrink-0 w-9 h-9 text-muted-foreground hover:text-foreground ml-1",
				children: isSidebarCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "w-5 h-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: () => setMobileNavOpen(true),
				className: "md:hidden shrink-0 w-9 h-9 text-muted-foreground hover:text-foreground",
				"aria-label": "Open navigation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-5 h-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "outline",
				className: "hidden lg:inline-flex gap-1.5 py-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-3.5 h-3.5" }), info?.spaceName ?? "—"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				className: "hidden lg:inline-flex gap-1.5 py-1 bg-success/10 text-success border border-success/20 hover:bg-success/15",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5" }), t("complianceBadge")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "h-9 w-9 gap-1.5 px-0 sm:w-auto sm:px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: currentLang.flag,
						alt: currentLang.code,
						className: "w-4 h-3 object-cover rounded-sm shadow-sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: currentLang.label
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
				className: "hidden sm:inline-flex",
				children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "relative hidden sm:inline-flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-7 h-7 rounded-full gradient-brand flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4 text-white" })
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, {
						className: "text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: user?.email }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-normal text-muted-foreground mt-0.5",
							children: info?.roles.join(" · ") || "employé"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, { children: t("profile") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/settings",
							children: t("settings")
						})
					}),
					info && hasRole(info.roles, "super_admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						asChild: true,
						className: "text-brand font-medium",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/superadmin",
							children: "Master Admin"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						className: "text-danger cursor-pointer",
						onSelect: (e) => {
							e.preventDefault();
							setShowDeleteModal(true);
						},
						children: "Supprimer le compte"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						className: "cursor-pointer",
						onClick: signOut,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-3.5 h-3.5 me-2" }),
							" ",
							t("logout")
						]
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: showDeleteModal,
				onOpenChange: setShowDeleteModal,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "bg-card border-brand/20 text-card-foreground sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2 text-danger",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-5 h-5" }), "Supprimer le compte"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-white/70 pt-3",
							children: [
								"Cette action est ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-white",
									children: "définitive"
								}),
								". Toutes vos données seront effacées et vous ne pourrez plus accéder à votre compte.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Veuillez écrire ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "delete account" }),
								" ci-dessous pour confirmer."
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: deleteConfirmText,
								onChange: (e) => setDeleteConfirmText(e.target.value),
								placeholder: "delete account",
								className: "bg-white/5 border-white/10 text-white"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setShowDeleteModal(false),
								className: "bg-transparent border-white/20 text-white hover:bg-white/10",
								children: "Annuler"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								onClick: handleDeleteAccount,
								disabled: deleteConfirmText !== "delete account" || isDeleting,
								className: "bg-danger hover:bg-danger/90 text-white",
								children: isDeleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Confirmer la suppression"
							})]
						})
					]
				})
			})
		]
	});
}
var adminItems = [
	{
		to: "/admin/dashboard",
		icon: LayoutDashboard,
		key: "dashboard"
	},
	{
		to: "/admin/employees",
		icon: Users,
		key: "employees",
		module: "employees"
	},
	{
		to: "/admin/team",
		icon: UserCog,
		key: "employees",
		adminOnly: true
	},
	{
		to: "/admin/surveys",
		icon: ScrollText,
		key: "surveys",
		module: "surveys"
	},
	{
		to: "/admin/anonymous",
		icon: ShieldQuestionMark,
		key: "anonymousSpace",
		badge: "3",
		module: "alerts"
	},
	{
		to: "/admin/burnout",
		icon: Bot,
		key: "burnoutEngine",
		badge: "!",
		module: "alerts"
	},
	{
		to: "/admin/alerts",
		icon: Bell,
		key: "alerts",
		module: "alerts"
	},
	{
		to: "/admin/actions",
		icon: Lightbulb,
		key: "actionPlans",
		module: "actions"
	},
	{
		to: "/admin/events",
		icon: Calendar,
		key: "events",
		module: "events"
	},
	{
		to: "/admin/library",
		icon: BookOpen,
		key: "library",
		module: "library"
	},
	{
		to: "/admin/messages",
		icon: MessageSquare,
		key: "messages",
		module: "messages"
	},
	{
		to: "/admin/erp",
		icon: Plug,
		key: "erp",
		module: "erp"
	},
	{
		to: "/admin/reports",
		icon: ChartColumn,
		key: "reports",
		module: "reports"
	},
	{
		to: "/admin/settings",
		icon: Settings,
		key: "settings",
		adminOnly: true
	}
];
var employeeItems = [
	{
		to: "/employee/home",
		icon: House,
		key: "home"
	},
	{
		to: "/employee/surveys",
		icon: ScrollText,
		key: "mySurveys"
	},
	{
		to: "/employee/feedback",
		icon: Inbox,
		key: "anonymousFeedback"
	},
	{
		to: "/employee/library",
		icon: BookOpen,
		key: "library"
	},
	{
		to: "/employee/events",
		icon: Calendar,
		key: "events"
	},
	{
		to: "/employee/messages",
		icon: MessageSquare,
		key: "myMessages",
		badge: "1"
	},
	{
		to: "/employee/help",
		icon: CircleQuestionMark,
		key: "help"
	}
];
var superAdminItems = [];
function Sidebar() {
	const { t, direction, pick } = useI18n();
	const { info } = useMySpace();
	const isSuperAdmin = hasRole(info?.roles ?? [], "super_admin");
	const isEmployee = hasRole(info?.roles ?? [], "employee");
	const isManager = hasRole(info?.roles ?? [], "manager") && !hasRole(info?.roles ?? [], ["hr_admin", "super_admin"]);
	const { permissions } = useManagerPermissions(info?.spaceId ?? null, isManager);
	const items = isEmployee ? employeeItems : isManager ? adminItems.filter((item) => !item.adminOnly && (!item.module || permissions.has(item.module))) : adminItems;
	const location = useLocation();
	const isSidebarCollapsed = useStore((s) => s.isSidebarCollapsed);
	const toggleSidebar = useStore((s) => s.toggleSidebar);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: `fixed top-16 bottom-0 ${isSidebarCollapsed ? "w-20" : "w-64"} bg-sidebar text-sidebar-foreground border-sidebar-border ${direction === "rtl" ? "right-0 border-l" : "left-0 border-r"} overflow-y-auto py-4 px-3 hidden md:flex flex-col z-40 transition-all duration-300 ease-in-out`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "space-y-0.5 flex-1",
			children: [items.map((item) => {
				const active = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					title: isSidebarCollapsed ? t(item.key) : void 0,
					className: `relative flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl text-sm transition-colors ${active ? "text-white" : "text-sidebar-foreground/70 hover:text-white hover:bg-white/5"}`,
					children: [
						active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							layoutId: "side-active",
							className: "absolute inset-0 gradient-brand rounded-xl -z-0",
							transition: {
								type: "spring",
								stiffness: 400,
								damping: 32
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 relative z-10 shrink-0" }),
						!isSidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10 flex-1 truncate",
							children: t(item.key)
						}), item.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badge === "!" ? "bg-danger text-white" : "bg-white/20 text-white"}`,
							children: item.badge
						})] })
					]
				}, item.to);
			}), isSuperAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-4 mb-1 px-3 text-[10px] uppercase tracking-widest text-sidebar-foreground/40 ${isSidebarCollapsed ? "text-center hidden" : ""}`,
				children: pick("Super admin", "المشرف العام", "Super admin")
			}), superAdminItems.map((item) => {
				const active = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					title: isSidebarCollapsed ? pick(...item.label) : void 0,
					className: `relative flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl text-sm transition-colors ${active ? "text-white" : "text-sidebar-foreground/70 hover:text-white hover:bg-white/5"}`,
					children: [
						active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							layoutId: "side-active-super",
							className: "absolute inset-0 gradient-brand rounded-xl -z-0",
							transition: {
								type: "spring",
								stiffness: 400,
								damping: 32
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 relative z-10 shrink-0" }),
						!isSidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10 flex-1 truncate",
							children: pick(...item.label)
						})
					]
				}, item.to);
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-auto space-y-4",
			children: [!isSidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-3 py-4 rounded-2xl bg-white/5 border border-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-white/60 mb-2",
						children: "Version"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium text-white",
						children: "QVT-Care · 2.0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 text-[10px] text-white/50",
						children: "Prototype · Master Thesis Edition"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: toggleSidebar,
				className: `flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 w-full rounded-xl text-sm text-sidebar-foreground/70 hover:text-white hover:bg-white/5 transition-colors`,
				children: [direction === "rtl" ? isSidebarCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "w-4 h-4" }) : isSidebarCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "w-4 h-4" }), !isSidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: pick("Réduire", "تصغير", "Collapse")
				})]
			})]
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function AppShell({ children }) {
	useI18n();
	useThemeSync();
	const { direction } = useI18n();
	const location = useLocation();
	const isSidebarCollapsed = useStore((s) => s.isSidebarCollapsed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `min-h-screen bg-background ${direction === "rtl" ? "font-arabic" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: `${direction === "rtl" ? isSidebarCollapsed ? "md:pr-[80px]" : "md:pr-64" : isSidebarCollapsed ? "md:pl-[80px]" : "md:pl-64"} pt-16 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0 min-h-screen transition-all duration-300 ease-in-out`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -8
						},
						transition: {
							duration: .28,
							ease: [
								.25,
								.46,
								.45,
								.94
							]
						},
						className: "p-4 md:p-8 max-w-[1600px] mx-auto",
						children
					}, location.pathname)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNavigation, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-center",
				richColors: true
			})
		]
	});
}
function PageHeader({ title, subtitle, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl md:text-4xl font-bold tracking-tight",
			children: title
		}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted-foreground text-sm md:text-base max-w-2xl",
			children: subtitle
		})] }), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 flex-wrap",
			children: actions
		})]
	});
}
//#endregion
export { PageHeader as n, AppShell as t };
