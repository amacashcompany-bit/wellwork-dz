import { o as __toESM } from "../_runtime.mjs";
import { t as wellwork_logo_mark_default } from "./wellwork-logo-mark-BsK64D-m.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace, n as useAuth, t as hasRole } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { _ as useNavigate, f as Outlet, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Moon, H as LogOut, M as PanelLeftOpen, N as PanelLeftClose, W as LoaderCircle, Z as House, et as Globe, lt as CreditCard, o as User, p as Sun, q as LayoutDashboard, st as EllipsisVertical, y as Settings, z as Menu } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { a as DropdownMenuSeparator, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-CDoe66ii.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BBUarmca.mjs";
import { n as useI18n, t as LANGS } from "./useI18n-C6quAtBX.mjs";
import { t as MobileNavigation } from "./MobileNavigation-1wtlhWbb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/superadmin-CDDXc1NK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SuperAdminLayout() {
	const navigate = useNavigate();
	const { user, loading, signOut } = useAuth();
	const { info, loading: spaceLoading } = useMySpace();
	const { t, language, setLanguage } = useI18n();
	const isDark = useStore((s) => s.isDarkMode);
	const toggleDark = useStore((s) => s.toggleDarkMode);
	const isSidebarCollapsed = useStore((s) => s.isSidebarCollapsed);
	const toggleSidebar = useStore((s) => s.toggleSidebar);
	const setMobileNavOpen = useStore((s) => s.setMobileNavOpen);
	const currentLang = LANGS.find((l) => l.code === language) || LANGS[0];
	const [isProfileOpen, setIsProfileOpen] = (0, import_react.useState)(false);
	const [profileName, setProfileName] = (0, import_react.useState)("");
	const [profileAvatar, setProfileAvatar] = (0, import_react.useState)("");
	const [savingProfile, setSavingProfile] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (loading || spaceLoading) return;
		if (!user) {
			navigate({
				to: "/auth",
				replace: true
			});
			return;
		}
		if (!hasRole(info?.roles ?? [], ["super_admin"])) navigate({
			to: "/",
			replace: true
		});
	}, [
		user,
		loading,
		info,
		spaceLoading,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		(async () => {
			const { data } = await supabase.from("profiles").select("full_name, avatar_url").eq("id", user.id).maybeSingle();
			if (data) {
				setProfileName(data.full_name ?? "");
				setProfileAvatar(data.avatar_url ?? "");
			}
		})();
	}, [user]);
	const handleSaveProfile = async () => {
		if (!user) return;
		setSavingProfile(true);
		const { error } = await supabase.from("profiles").upsert({
			id: user.id,
			full_name: profileName,
			avatar_url: profileAvatar
		});
		setSavingProfile(false);
		if (error) toast.error(error.message);
		else {
			toast.success("Profil mis à jour !");
			setIsProfileOpen(false);
		}
	};
	if (loading || spaceLoading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin text-brand" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background md:flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-3 border-b border-border/60 bg-card/95 px-4 backdrop-blur-xl md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setMobileNavOpen(true),
						className: "h-9 w-9 shrink-0 text-muted-foreground",
						"aria-label": "Open navigation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/superadmin",
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: wellwork_logo_mark_default,
							alt: "Wellwork",
							className: "h-8 w-8 shrink-0 object-contain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate font-display text-sm font-bold leading-tight",
								children: "Wellwork"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-[10px] font-semibold text-brand",
								children: t("saMasterAdmin")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setIsProfileOpen(true),
						className: "h-9 w-9 shrink-0",
						"aria-label": t("profile"),
						children: profileAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: profileAvatar,
							className: "h-8 w-8 rounded-full border border-brand/20 object-cover",
							alt: "Avatar"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-8 w-8 place-items-center rounded-full bg-brand text-xs font-bold text-white",
							children: profileName ? profileName.slice(0, 2).toUpperCase() : "AD"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `hidden ${isSidebarCollapsed ? "md:w-20" : "md:w-64"} shrink-0 border-r border-border/40 bg-card md:flex md:flex-col transition-all duration-300 ease-in-out`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 md:p-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: `flex items-center ${isSidebarCollapsed ? "justify-center hidden" : "gap-2"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: wellwork_logo_mark_default,
								alt: "Wellwork",
								className: "w-8 h-8 object-contain drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)] shrink-0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display font-bold leading-tight truncate",
									children: "Wellwork"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[9px] uppercase tracking-widest text-brand font-semibold truncate",
									children: t("saMasterAdmin")
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: toggleSidebar,
							className: `hidden md:flex shrink-0 w-8 h-8 text-muted-foreground hover:text-foreground ${isSidebarCollapsed ? "mx-auto" : ""}`,
							children: isSidebarCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "w-4 h-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex-1 px-4 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/superadmin",
								title: isSidebarCollapsed ? t("dashboard") : void 0,
								activeOptions: { exact: true },
								activeProps: { className: "bg-brand/10 text-brand" },
								inactiveProps: { className: "text-muted-foreground hover:bg-muted/50 hover:text-foreground" },
								className: `flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl text-sm font-medium transition-colors`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "w-4 h-4 shrink-0" }), !isSidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: t("dashboard")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/superadmin/plans",
								title: isSidebarCollapsed ? t("saPlansAndPricing") : void 0,
								activeProps: { className: "bg-brand/10 text-brand" },
								inactiveProps: { className: "text-muted-foreground hover:bg-muted/50 hover:text-foreground" },
								className: `flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl text-sm font-medium transition-colors`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-4 h-4 shrink-0" }), !isSidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: t("saPlansAndPricing")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/superadmin/billing",
								title: isSidebarCollapsed ? "Paiements" : void 0,
								activeProps: { className: "bg-brand/10 text-brand" },
								inactiveProps: { className: "text-muted-foreground hover:bg-muted/50 hover:text-foreground" },
								className: `flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl text-sm font-medium transition-colors`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "w-4 h-4 shrink-0" }), !isSidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: "Paiements"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/",
									title: isSidebarCollapsed ? t("home") : void 0,
									className: `flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "w-4 h-4 shrink-0" }), !isSidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: t("home")
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `px-4 pb-2 flex ${isSidebarCollapsed ? "flex-col" : ""} gap-2`,
						children: [!isSidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "flex-1 justify-start gap-2 h-9 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: currentLang.label
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
							align: "start",
							className: "w-40",
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
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							className: "h-9 w-9 shrink-0 mx-auto",
							onClick: toggleDark,
							children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-t border-border/40 flex flex-col space-y-3",
						children: [!isSidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 px-2",
							children: [profileAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: profileAvatar,
								className: "w-9 h-9 rounded-full object-cover border border-brand/20 shadow-glow shrink-0",
								alt: "Avatar"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold font-display shadow-glow shrink-0",
								children: profileName ? profileName.slice(0, 2).toUpperCase() : "AD"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "truncate flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold text-foreground truncate",
									children: profileName || "Master Admin"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-muted-foreground truncate",
									children: user.email
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${isSidebarCollapsed ? "mx-auto" : "ml-auto"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 shrink-0",
									children: isSidebarCollapsed ? profileAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: profileAvatar,
										className: "w-8 h-8 rounded-full object-cover border border-brand/20 shadow-glow shrink-0",
										alt: "Avatar"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold font-display shadow-glow shrink-0",
										children: profileName ? profileName.slice(0, 2).toUpperCase() : "AD"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "w-4 h-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: isSidebarCollapsed ? "center" : "end",
								className: "w-48",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: () => setIsProfileOpen(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4 mr-2" }), t("profile")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: toggleDark,
										children: [isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4 mr-2" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4 mr-2" }), isDark ? t("lightMode") : t("darkMode")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: () => setLanguage(currentLang.code === "en" ? "fr" : "en"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4 mr-2" }), t("language")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: signOut,
										className: "text-destructive",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4 mr-2" }), t("logout")]
									})
								]
							})] })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 overflow-y-auto pt-16 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pt-0 md:pb-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 md:p-10 max-w-7xl mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNavigation, {
				variant: "superadmin",
				onLogout: signOut
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isProfileOpen,
				onOpenChange: setIsProfileOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("profile") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Modifiez vos informations personnelles." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Nom complet"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									value: profileName,
									onChange: (e) => setProfileName(e.target.value),
									placeholder: "Ex: Master Admin"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "avatar",
										children: "Ou URL de l'avatar personnalisée"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "avatar",
										value: profileAvatar,
										onChange: (e) => setProfileAvatar(e.target.value),
										placeholder: "https://example.com/avatar.png"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-5 gap-3 pt-2",
										children: [
											"https://api.dicebear.com/7.x/bottts/svg?seed=Felix",
											"https://api.dicebear.com/7.x/bottts/svg?seed=Aneka",
											"https://api.dicebear.com/7.x/bottts/svg?seed=Jack",
											"https://api.dicebear.com/7.x/bottts/svg?seed=Cody"
										].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${profileAvatar === opt ? "border-brand shadow-glow" : "border-transparent hover:border-brand/30"}`,
											onClick: () => setProfileAvatar(opt),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: opt,
												className: "w-full aspect-square object-cover bg-muted/30",
												alt: "Avatar option"
											})
										}, opt))
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "sm:justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setIsProfileOpen(false),
								children: t("cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: handleSaveProfile,
								disabled: savingProfile,
								children: [savingProfile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : null, t("save")]
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { SuperAdminLayout as component };
