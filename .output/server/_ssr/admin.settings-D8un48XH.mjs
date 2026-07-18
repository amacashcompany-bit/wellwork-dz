import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { D as Plus, Nt as Bell, O as Plug, P as Palette, U as Lock, Y as KeyRound, _t as CircleCheck, a as UsersRound, ct as Database, et as Globe, f as Trash2, h as Shield, kt as Building2, rt as FileCheckCorner, ut as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-BpC9Zhk0.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Switch } from "./switch-CCza_WcE.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-D8un48XH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root.displayName;
function SettingsPage() {
	const { pick } = useI18n();
	const [tab, setTab] = (0, import_react.useState)("organization");
	const isDark = useStore((s) => s.isDarkMode);
	const toggleDark = useStore((s) => s.toggleDarkMode);
	const tabs = [
		{
			key: "organization",
			icon: Building2,
			label: pick("Organisation", "المؤسسة", "Organization")
		},
		{
			key: "roles",
			icon: UsersRound,
			label: pick("Rôles & permissions", "الأدوار والصلاحيات", "Roles & permissions")
		},
		{
			key: "security",
			icon: Shield,
			label: pick("Sécurité & RGPD", "الأمان والامتثال", "Security & Compliance")
		},
		{
			key: "anonymization",
			icon: Lock,
			label: pick("Anonymisation", "التجهيل", "Anonymization")
		},
		{
			key: "integrations",
			icon: Plug,
			label: pick("Intégrations ERP/API", "التكامل", "Integrations")
		},
		{
			key: "notifications",
			icon: Bell,
			label: pick("Notifications", "الإشعارات", "Notifications")
		},
		{
			key: "branding",
			icon: Palette,
			label: pick("Apparence", "المظهر", "Appearance")
		},
		{
			key: "data",
			icon: Database,
			label: pick("Données", "البيانات", "Data")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: pick("Paramètres", "الإعدادات", "Settings"),
		subtitle: pick("Gérer la configuration multi-tenant, la sécurité, les intégrations et la conformité (Loi 18-07).", "إدارة الإعدادات متعددة المستأجرين والأمان والتكامل والامتثال.", "Manage multi-tenant configuration, security, integrations and compliance.")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		value: tab,
		onValueChange: (v) => setTab(v),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
				className: "flex flex-wrap h-auto gap-1 bg-muted/40 p-1 rounded-2xl mb-6",
				children: tabs.map(({ key, icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: key,
					className: "rounded-xl gap-2 data-[state=active]:gradient-brand data-[state=active]:text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" }),
						" ",
						label
					]
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "organization",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationTab, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "roles",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RolesTab, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "security",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityTab, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "anonymization",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnonymizationTab, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "integrations",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrationsTab, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "notifications",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsTab, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "branding",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandingTab, {
					isDark,
					onToggleDark: toggleDark
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "data",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTab, {})
			})
		]
	})] });
}
function SectionCard({ title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 rounded-2xl border-border/60",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold",
						children: title
					}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: description
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "mb-4" }),
				children
			]
		})
	});
}
function ToggleRow({ title, desc, defaultChecked = false, checked, onCheckedChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground mt-0.5",
				children: desc
			})]
		}), checked !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked })]
	});
}
function OrganizationTab() {
	const { pick } = useI18n();
	const tenant = useStore((s) => s.tenant);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid md:grid-cols-2 gap-6 max-w-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: pick("Identité du tenant", "هوية المستأجر", "Tenant identity"),
			description: pick("Espace isolé et chiffré pour votre organisation.", "مساحة معزولة ومشفرة لمؤسستكم.", "Isolated, encrypted workspace for your organization."),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: pick("Nom", "الاسم", "Name") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						defaultValue: tenant,
						className: "mt-1 rounded-xl"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: pick("Identifiant tenant", "معرف المستأجر", "Tenant ID") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							readOnly: true,
							value: "tnt_2f9a-techdz",
							className: "rounded-xl font-mono text-xs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							className: "rounded-xl",
							onClick: () => {
								navigator.clipboard.writeText("tnt_2f9a-techdz");
								toast.success(pick("Copié", "تم النسخ", "Copied"));
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4" })
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: pick("Secteur", "القطاع", "Sector") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						defaultValue: "tech",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "mt-1 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "tech",
								children: pick("Technologies", "التقنية", "Technology")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "bank",
								children: pick("Banque & Finance", "بنوك ومالية", "Banking & Finance")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "health",
								children: pick("Santé", "الصحة", "Healthcare")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "energy",
								children: pick("Énergie", "الطاقة", "Energy")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "public",
								children: pick("Secteur public", "القطاع العام", "Public sector")
							})
						] })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: pick("Effectif", "عدد الموظفين", "Headcount") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						defaultValue: 487,
						className: "mt-1 rounded-xl"
					})] })
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: pick("Localisation & résidence des données", "الموقع ومسكن البيانات", "Locale & data residency"),
			description: pick("Conformité Loi 18-07 · hébergement Algérie / UE au choix.", "امتثال للقانون 18-07.", "Law 18-07 compliance · Algeria / EU hosting."),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: pick("Langue par défaut", "اللغة الافتراضية", "Default language") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						defaultValue: "fr",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "mt-1 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "fr",
								children: "Français"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "ar",
								children: "العربية"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "en",
								children: "English"
							})
						] })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: pick("Fuseau horaire", "المنطقة الزمنية", "Timezone") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						defaultValue: "algiers",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "mt-1 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "algiers",
								children: "Africa/Algiers (GMT+1)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "paris",
								children: "Europe/Paris (GMT+1/+2)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "dubai",
								children: "Asia/Dubai (GMT+4)"
							})
						] })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: pick("Région d'hébergement", "منطقة الاستضافة", "Hosting region") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						defaultValue: "dz",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "mt-1 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: "dz",
								children: ["🇩🇿 ", pick("Algérie (souverain)", "الجزائر (سيادي)", "Algeria (sovereign)")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: "eu",
								children: ["🇪🇺 ", pick("Union Européenne", "الاتحاد الأوروبي", "European Union")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: "onprem",
								children: ["🏢 ", pick("On-premise / Cloud privé", "داخلي / سحابة خاصة", "On-premise / Private cloud")]
							})
						] })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "gap-1 bg-success/10 text-success border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }),
								" ",
								pick("Loi 18-07 active", "القانون 18-07 مفعل", "Law 18-07 active")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3 h-3" }), " RGPD-ready"]
						})]
					})
				]
			})
		})]
	});
}
var seedRoles = [
	{
		name: "Super Admin",
		users: 2,
		color: "danger",
		perms: ["all"]
	},
	{
		name: "RH Manager",
		users: 5,
		color: "brand",
		perms: [
			"employees",
			"surveys",
			"alerts",
			"reports"
		]
	},
	{
		name: "Manager",
		users: 18,
		color: "teal",
		perms: ["dashboard", "team-view"]
	},
	{
		name: "Analyste QVT",
		users: 3,
		color: "warning",
		perms: [
			"reports",
			"burnout",
			"read"
		]
	},
	{
		name: "Employé",
		users: 459,
		color: "muted",
		perms: [
			"surveys",
			"feedback",
			"library"
		]
	}
];
var permMatrix = [
	{
		module: "Dashboard",
		roles: [
			true,
			true,
			true,
			true,
			false
		]
	},
	{
		module: "Employés",
		roles: [
			true,
			true,
			false,
			false,
			false
		]
	},
	{
		module: "Enquêtes",
		roles: [
			true,
			true,
			false,
			true,
			true
		]
	},
	{
		module: "Espace anonyme",
		roles: [
			true,
			true,
			false,
			false,
			true
		]
	},
	{
		module: "Burnout IA",
		roles: [
			true,
			true,
			false,
			true,
			false
		]
	},
	{
		module: "Alertes RPS",
		roles: [
			true,
			true,
			false,
			true,
			false
		]
	},
	{
		module: "Plans d'action",
		roles: [
			true,
			true,
			true,
			true,
			false
		]
	},
	{
		module: "Rapports & exports",
		roles: [
			true,
			true,
			false,
			true,
			false
		]
	},
	{
		module: "Paramètres",
		roles: [
			true,
			false,
			false,
			false,
			false
		]
	}
];
function RolesTab() {
	const { pick } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-6xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: pick("Rôles définis", "الأدوار المحددة", "Defined roles"),
			description: pick("Contrôle d'accès basé sur les rôles (RBAC).", "التحكم في الوصول القائم على الأدوار.", "Role-based access control (RBAC)."),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3",
				children: [seedRoles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-border/60 p-4 hover:border-brand/40 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: r.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: [
								r.users,
								" ",
								pick("utilisateurs", "مستخدمين", "users")
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "text-[10px]",
							children: [r.perms.length, " perms"]
						})]
					})
				}, r.name)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "rounded-xl border-2 border-dashed border-border/60 p-4 hover:border-brand hover:text-brand text-sm text-muted-foreground transition-colors flex items-center justify-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }),
						" ",
						pick("Nouveau rôle", "دور جديد", "New role")
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: pick("Matrice de permissions", "مصفوفة الصلاحيات", "Permissions matrix"),
			description: pick("Vue croisée modules × rôles.", "عرض متقاطع للوحدات والأدوار.", "Cross-view of modules × roles."),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto -mx-2 px-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-xs text-muted-foreground border-b",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 font-medium",
							children: pick("Module", "الوحدة", "Module")
						}), seedRoles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 px-2 text-center font-medium",
							children: r.name
						}, r.name))]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: permMatrix.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/40 hover:bg-muted/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 pr-4 font-medium",
							children: row.module
						}), row.roles.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 px-2 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: v })
						}, i))]
					}, row.module)) })]
				})
			})
		})]
	});
}
function SecurityTab() {
	const { pick } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid md:grid-cols-2 gap-6 max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: pick("Authentification", "المصادقة", "Authentication"),
				description: pick("Politiques d'accès aux comptes.", "سياسات الوصول للحسابات.", "Account access policies."),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Authentification à deux facteurs (2FA)", "مصادقة ثنائية", "Two-factor authentication (2FA)"),
						desc: pick("Obligatoire pour tous les administrateurs.", "إجبارية للمسؤولين.", "Required for all administrators."),
						defaultChecked: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: "SSO / SAML 2.0",
						desc: pick("Azure AD, Okta, Google Workspace.", "الدخول الموحد.", "Azure AD, Okta, Google Workspace."),
						defaultChecked: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Verrouillage après 5 tentatives", "قفل بعد 5 محاولات", "Lock after 5 failed attempts"),
						desc: pick("Protection anti brute-force.", "حماية من الهجمات.", "Brute-force protection."),
						defaultChecked: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: pick("Durée de session (minutes)", "مدة الجلسة", "Session duration (min)")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							defaultValue: 30,
							className: "mt-1 rounded-xl w-32"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: pick("Chiffrement & confidentialité", "التشفير والسرية", "Encryption & confidentiality"),
				description: pick("Protection cryptographique des données.", "حماية تشفيرية للبيانات.", "Cryptographic data protection."),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-success" }),
									" ",
									pick("Chiffrement au repos AES-256", "تشفير AES-256", "AES-256 encryption at rest")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-success" }),
									" ",
									pick("TLS 1.3 en transit", "TLS 1.3 أثناء النقل", "TLS 1.3 in transit")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-success" }),
									" ",
									pick("Hachage des identifiants d'enquêtes (SHA-256)", "تجزئة معرفات الاستطلاع", "Survey ID hashing (SHA-256)")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-success" }),
									" ",
									pick("Séparation stricte des tenants", "فصل صارم للمستأجرين", "Strict tenant isolation")
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Journal d'audit détaillé", "سجل التدقيق التفصيلي", "Detailed audit log"),
						desc: pick("Trace tous les accès administrateurs.", "يسجل كل عمليات الوصول.", "Traces all admin accesses."),
						defaultChecked: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Rotation automatique des clés (90j)", "تدوير المفاتيح تلقائياً", "Auto key rotation (90d)"),
						desc: pick("Renouvellement des secrets tenant.", "تجديد أسرار المستأجر.", "Tenant secret renewal."),
						defaultChecked: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: pick("Conformité Loi 18-07", "الامتثال للقانون 18-07", "Law 18-07 compliance"),
				description: pick("Protection des personnes physiques dans le traitement des données.", "حماية الأشخاص في معالجة البيانات.", "Protection of individuals in data processing."),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Registre des traitements", "سجل المعالجات", "Processing register"),
						desc: pick("Documentation des finalités de traitement.", "توثيق أغراض المعالجة.", "Documentation of processing purposes."),
						defaultChecked: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Consentement explicite", "الموافقة الصريحة", "Explicit consent"),
						desc: pick("Recueil du consentement à l'inscription.", "الحصول على الموافقة عند التسجيل.", "Consent capture at signup."),
						defaultChecked: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Droit à l'oubli", "الحق في النسيان", "Right to be forgotten"),
						desc: pick("Suppression sur demande sous 30j.", "الحذف عند الطلب خلال 30 يوم.", "Deletion on request within 30d."),
						defaultChecked: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Notification de violation (72h)", "إشعار الانتهاك (72 ساعة)", "Breach notification (72h)"),
						desc: pick("Alerte automatique à l'ARPCE.", "تنبيه تلقائي.", "Automatic ARPCE alert."),
						defaultChecked: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: pick("Politique de mots de passe", "سياسة كلمات المرور", "Password policy"),
				description: pick("Exigences minimales.", "المتطلبات الدنيا.", "Minimum requirements."),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Minimum 12 caractères", "12 حرف على الأقل", "Minimum 12 characters"),
						desc: pick("Longueur recommandée NIST.", "طول موصى به.", "NIST-recommended length."),
						defaultChecked: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Caractères mixtes obligatoires", "أحرف مختلطة إلزامية", "Mixed characters required"),
						desc: pick("Majuscules, chiffres, symboles.", "أحرف كبيرة وأرقام ورموز.", "Uppercase, numbers, symbols."),
						defaultChecked: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Interdire mots de passe compromis", "منع كلمات مرور مسربة", "Block breached passwords"),
						desc: pick("Vérification HaveIBeenPwned.", "التحقق من التسريبات.", "HaveIBeenPwned check."),
						defaultChecked: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Renouvellement obligatoire (90j)", "تجديد إلزامي (90 يوم)", "Force renewal (90d)"),
						desc: pick("Pour les comptes admin.", "للحسابات الإدارية.", "For admin accounts.")
					})
				]
			})
		]
	});
}
function AnonymizationTab() {
	const { pick } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid md:grid-cols-2 gap-6 max-w-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
			title: pick("Protection de l'identité", "حماية الهوية", "Identity protection"),
			description: pick("Garantit que RH ne peut pas identifier un répondant.", "يضمن عدم تحديد هوية المشاركين.", "Ensures HR cannot identify a respondent."),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("K-anonymat (k ≥ 6)", "التجهيل الجماعي (k ≥ 6)", "K-anonymity (k ≥ 6)"),
					desc: pick("Bloque tout affichage sous 6 répondants.", "يمنع العرض تحت 6 مشاركين.", "Blocks display below 6 respondents."),
					defaultChecked: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("Bruit différentiel (ε=1.0)", "التشويش التفاضلي", "Differential privacy (ε=1.0)"),
					desc: pick("Ajoute du bruit statistique aux agrégats.", "يضيف تشويشاً إحصائياً.", "Adds statistical noise to aggregates."),
					defaultChecked: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("Masquage géographique", "تعمية جغرافية", "Geographic masking"),
					desc: pick("Cache les petits sites (< 20 personnes).", "يخفي المواقع الصغيرة.", "Hides small sites (< 20 people)."),
					defaultChecked: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("Rotation des tokens de feedback", "تدوير رموز الملاحظات", "Feedback token rotation"),
					desc: pick("Renouvellement à chaque cycle.", "تجديد كل دورة.", "Renewed each cycle."),
					defaultChecked: true
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: pick("Rétention des données", "الاحتفاظ بالبيانات", "Data retention"),
			description: pick("Durées de conservation configurables.", "مدد قابلة للتكوين.", "Configurable retention periods."),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_auto] gap-3 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm",
							children: pick("Réponses d'enquêtes", "ردود الاستطلاعات", "Survey responses")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							defaultValue: 24,
							className: "w-24 rounded-xl"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_auto] gap-3 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm",
							children: pick("Feedback anonyme", "الملاحظات المجهولة", "Anonymous feedback")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							defaultValue: 12,
							className: "w-24 rounded-xl"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_auto] gap-3 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm",
							children: pick("Journaux d'audit", "سجلات التدقيق", "Audit logs")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							defaultValue: 36,
							className: "w-24 rounded-xl"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_auto] gap-3 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm",
							children: pick("Alertes IA burnout", "تنبيهات الذكاء الاصطناعي", "AI burnout alerts")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							defaultValue: 18,
							className: "w-24 rounded-xl"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground pt-2",
						children: pick("Durée en mois. Suppression automatique après échéance.", "المدة بالأشهر. حذف تلقائي بعد انتهاء الصلاحية.", "In months. Automatic deletion after expiry.")
					})
				]
			})
		})]
	});
}
var integrationList = [
	{
		key: "sap",
		name: "SAP SuccessFactors",
		desc: {
			fr: "Synchronisation employés, absentéisme, turnover.",
			ar: "مزامنة الموظفين والغياب والدوران.",
			en: "Employee sync, absenteeism, turnover."
		},
		connected: true,
		color: "bg-blue-500"
	},
	{
		key: "oracle",
		name: "Oracle HCM Cloud",
		desc: {
			fr: "Import des données RH via API REST.",
			ar: "استيراد بيانات الموارد البشرية.",
			en: "HR data import via REST API."
		},
		connected: true,
		color: "bg-red-500"
	},
	{
		key: "workday",
		name: "Workday",
		desc: {
			fr: "Import organigramme et compétences.",
			ar: "استيراد المخطط التنظيمي.",
			en: "Org chart & skills import."
		},
		connected: false,
		color: "bg-orange-500"
	},
	{
		key: "teams",
		name: "Microsoft Teams",
		desc: {
			fr: "Notifications d'alertes et rappels d'enquêtes.",
			ar: "إشعارات التنبيهات.",
			en: "Alert notifications & survey reminders."
		},
		connected: true,
		color: "bg-indigo-500"
	},
	{
		key: "slack",
		name: "Slack",
		desc: {
			fr: "Push des alertes RPS critiques.",
			ar: "دفع التنبيهات الحرجة.",
			en: "Push critical RPS alerts."
		},
		connected: false,
		color: "bg-purple-500"
	},
	{
		key: "google",
		name: "Google Workspace",
		desc: {
			fr: "SSO et calendrier des campagnes.",
			ar: "الدخول الموحد.",
			en: "SSO & campaign calendar."
		},
		connected: false,
		color: "bg-green-500"
	}
];
function IntegrationsTab() {
	const { pick } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: pick("Connecteurs ERP & outils", "موصلات ERP والأدوات", "ERP connectors & tools"),
				description: pick("Intégration bidirectionnelle avec vos systèmes existants.", "تكامل ثنائي الاتجاه.", "Bi-directional integration with existing systems."),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3",
					children: integrationList.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/60 p-4 hover:border-brand/40 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-9 h-9 rounded-lg ${i.color} flex items-center justify-center text-white text-sm font-bold`,
									children: i.name[0]
								}), i.connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									className: "bg-success/10 text-success border-0 gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }),
										" ",
										pick("Connecté", "متصل", "Connected")
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: pick("Non connecté", "غير متصل", "Not connected")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold",
								children: i.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground mt-1 mb-3",
								children: pick(i.desc.fr, i.desc.ar, i.desc.en)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: i.connected ? "outline" : "default",
								className: `w-full rounded-xl ${!i.connected && "gradient-brand text-white border-0"}`,
								children: i.connected ? pick("Configurer", "تكوين", "Configure") : pick("Connecter", "اتصال", "Connect")
							})
						]
					}, i.key))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: pick("Clés API", "مفاتيح API", "API keys"),
				description: pick("Accès programmatique à votre tenant.", "الوصول البرمجي للمستأجر.", "Programmatic access to your tenant."),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [[{
						name: "Production",
						key: "qvt_pk_live_••••••••7f2a",
						scope: "read/write",
						created: "12/06/2026"
					}, {
						name: "Analytics",
						key: "qvt_pk_read_••••••••1c9e",
						scope: "read-only",
						created: "01/07/2026"
					}].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-xl border border-border/60 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-4 h-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium",
									children: k.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground font-mono truncate",
									children: k.key
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: k.scope
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground hidden md:block",
								children: k.created
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								className: "rounded-xl text-danger hover:text-danger",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
							})
						]
					}, k.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "rounded-xl gradient-brand text-white border-0 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), pick("Générer une clé", "إنشاء مفتاح", "Generate key")]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Webhooks",
				description: pick("Envoi d'événements vers vos endpoints.", "إرسال الأحداث إلى نقاط النهاية.", "Send events to your endpoints."),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: pick("URL de destination", "عنوان URL الوجهة", "Destination URL")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "https://votre-erp.com/hooks/qvt",
							className: "mt-1 rounded-xl font-mono text-xs"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								"burnout.alert",
								"survey.completed",
								"feedback.received",
								"action.updated"
							].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "font-mono text-[11px]",
								children: e
							}, e))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "rounded-xl",
							children: pick("Enregistrer", "حفظ", "Save")
						})
					]
				})
			})
		]
	});
}
function NotificationsTab() {
	const { pick } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid md:grid-cols-2 gap-6 max-w-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
			title: pick("Canaux", "القنوات", "Channels"),
			description: pick("Où recevoir les notifications ?", "أين تتلقى الإشعارات؟", "Where to receive notifications?"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: "Email",
					desc: pick("hr@techdz.com", "بريد إلكتروني", "hr@techdz.com"),
					defaultChecked: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: "SMS",
					desc: pick("+213 5 55 12 34 56", "رسائل نصية", "+213 5 55 12 34 56")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: "Push (mobile)",
					desc: pick("Application QVT-Care mobile.", "تطبيق الجوال.", "QVT-Care mobile app."),
					defaultChecked: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: "Microsoft Teams",
					desc: pick("Canal #qvt-alerts.", "قناة التنبيهات.", "#qvt-alerts channel."),
					defaultChecked: true
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
			title: pick("Types d'événements", "أنواع الأحداث", "Event types"),
			description: pick("Sélectionnez ce qui déclenche une notification.", "اختر ما يشغل الإشعار.", "Select what triggers a notification."),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("Alerte burnout critique", "تنبيه احتراق حرج", "Critical burnout alert"),
					desc: pick("Score IA > 75.", "درجة > 75.", "AI score > 75."),
					defaultChecked: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("Nouveau signalement anonyme", "بلاغ مجهول جديد", "New anonymous report"),
					desc: pick("Harcèlement, conflit, grief.", "تحرش، نزاع.", "Harassment, conflict, grievance."),
					defaultChecked: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("Enquête terminée", "استطلاع مكتمل", "Survey completed"),
					desc: pick("Résultats disponibles.", "النتائج متاحة.", "Results available."),
					defaultChecked: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("Rapport hebdomadaire", "تقرير أسبوعي", "Weekly report"),
					desc: pick("Chaque lundi 08:00.", "كل اثنين 08:00.", "Every Monday 8am."),
					defaultChecked: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("Seuil de participation", "عتبة المشاركة", "Participation threshold"),
					desc: pick("< 60% sur un département.", "أقل من 60%.", "< 60% on a department."),
					defaultChecked: true
				})
			]
		})]
	});
}
function BrandingTab({ isDark, onToggleDark }) {
	const { pick } = useI18n();
	const [primary, setPrimary] = (0, import_react.useState)("#1E3A8A");
	const [accent, setAccent] = (0, import_react.useState)("#14B8A6");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid md:grid-cols-2 gap-6 max-w-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
			title: pick("Apparence", "المظهر", "Appearance"),
			description: pick("Thème et mode.", "السمة والوضع.", "Theme and mode."),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("Mode sombre", "الوضع الداكن", "Dark mode"),
					desc: pick("Interface en teintes profondes.", "واجهة داكنة.", "Deep-toned interface."),
					checked: isDark,
					onCheckedChange: onToggleDark
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("Densité compacte", "كثافة مضغوطة", "Compact density"),
					desc: pick("Réduit les espacements.", "يقلل التباعد.", "Reduces spacing.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					title: pick("Animations réduites", "تقليل الحركة", "Reduced motion"),
					desc: pick("Accessibilité — vestibulaire.", "لأسباب الوصولية.", "Vestibular accessibility.")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: pick("Personnalisation tenant", "تخصيص المستأجر", "Tenant branding"),
			description: pick("Logo, couleurs et signature.", "الشعار والألوان.", "Logo, colors and signature."),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs",
						children: pick("Couleur primaire", "اللون الأساسي", "Primary color")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "color",
							value: primary,
							onChange: (e) => setPrimary(e.target.value),
							className: "w-14 h-10 rounded-xl p-1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: primary,
							onChange: (e) => setPrimary(e.target.value),
							className: "rounded-xl font-mono"
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs",
						children: pick("Couleur accent", "لون التمييز", "Accent color")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "color",
							value: accent,
							onChange: (e) => setAccent(e.target.value),
							className: "w-14 h-10 rounded-xl p-1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: accent,
							onChange: (e) => setAccent(e.target.value),
							className: "rounded-xl font-mono"
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs",
						children: pick("Logo (SVG/PNG)", "الشعار", "Logo (SVG/PNG)")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 rounded-xl border-2 border-dashed border-border/60 p-6 text-center text-xs text-muted-foreground hover:border-brand/40 cursor-pointer",
						children: pick("Déposer ou cliquer pour téléverser", "اسحب أو انقر للتحميل", "Drop or click to upload")
					})] })
				]
			})
		})]
	});
}
function DataTab() {
	const { pick } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid md:grid-cols-2 gap-6 max-w-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: pick("Export & sauvegarde", "التصدير والنسخ الاحتياطي", "Export & backup"),
			description: pick("Récupérez vos données à tout moment.", "استرد بياناتك في أي وقت.", "Retrieve your data anytime."),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "w-full justify-start rounded-xl gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "w-4 h-4" }),
							" ",
							pick("Exporter tous les employés (CSV)", "تصدير الموظفين", "Export all employees (CSV)")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "w-full justify-start rounded-xl gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "w-4 h-4" }),
							" ",
							pick("Exporter les résultats d'enquêtes (Excel)", "تصدير الاستطلاعات", "Export survey results (Excel)")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "w-full justify-start rounded-xl gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "w-4 h-4" }),
							" ",
							pick("Archive complète du tenant (ZIP)", "أرشيف المستأجر الكامل", "Full tenant archive (ZIP)")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						title: pick("Sauvegarde chiffrée quotidienne", "نسخ احتياطي مشفر يومي", "Daily encrypted backup"),
						desc: pick("Conservée 90 jours.", "محفوظ لمدة 90 يوم.", "Retained 90 days."),
						defaultChecked: true
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: pick("Zone dangereuse", "المنطقة الخطرة", "Danger zone"),
			description: pick("Actions irréversibles.", "إجراءات لا رجعة فيها.", "Irreversible actions."),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-danger/30 bg-danger/5 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium text-sm text-danger mb-1",
							children: pick("Réinitialiser toutes les enquêtes", "إعادة تعيين الاستطلاعات", "Reset all surveys")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mb-3",
							children: pick("Supprime définitivement les réponses. Ne peut être annulé.", "يحذف الردود نهائياً.", "Permanently deletes responses.")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "border-danger/40 text-danger hover:bg-danger/10 rounded-xl",
							children: pick("Réinitialiser", "إعادة تعيين", "Reset")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-danger/30 bg-danger/5 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium text-sm text-danger mb-1",
							children: pick("Supprimer le tenant", "حذف المستأجر", "Delete tenant")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mb-3",
							children: pick("Suppression définitive dans 30 jours. Conforme Loi 18-07.", "حذف نهائي خلال 30 يوم.", "Definitive deletion within 30 days.")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "border-danger/40 text-danger hover:bg-danger/10 rounded-xl gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" }), pick("Supprimer définitivement", "حذف نهائي", "Delete permanently")]
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { SettingsPage as component };
