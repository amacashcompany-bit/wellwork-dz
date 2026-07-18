import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace, n as useAuth, t as hasRole } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { W as LoaderCircle, _ as ShieldCheck, c as UserCog, f as Trash2, s as UserPlus, ut as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Checkbox } from "./checkbox-B1AjkRkB.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.team-CEFnHxjS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MODULES = [
	{
		key: "employees",
		label: "Employés"
	},
	{
		key: "surveys",
		label: "Enquêtes"
	},
	{
		key: "alerts",
		label: "Alertes"
	},
	{
		key: "actions",
		label: "Plans d'action"
	},
	{
		key: "library",
		label: "Bibliothèque"
	},
	{
		key: "events",
		label: "Événements"
	},
	{
		key: "messages",
		label: "Messages"
	},
	{
		key: "reports",
		label: "Rapports"
	},
	{
		key: "erp",
		label: "ERP / KPI"
	}
];
function generateCode() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	const rand = (n) => Array.from({ length: n }, () => alphabet[Math.floor(Math.random() * 32)]).join("");
	return `WW-${rand(4)}-${rand(4)}`;
}
function TeamPage() {
	const { user } = useAuth();
	const { info } = useMySpace();
	const canManage = hasRole(info?.roles ?? [], ["hr_admin", "super_admin"]);
	const spaceId = info?.spaceId ?? null;
	const [invites, setInvites] = (0, import_react.useState)([]);
	const [members, setMembers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const load = (0, import_react.useCallback)(async () => {
		if (!spaceId) return;
		setLoading(true);
		const [{ data: inv }, { data: roleRows }] = await Promise.all([supabase.from("space_invites").select("*").eq("space_id", spaceId).eq("role", "manager").order("created_at", { ascending: false }), supabase.from("user_roles").select("user_id, role").eq("space_id", spaceId).in("role", ["manager", "hr_admin"])]);
		setInvites(inv ?? []);
		const uids = Array.from(new Set((roleRows ?? []).map((r) => r.user_id)));
		let profilesById = {};
		if (uids.length) {
			const { data: profs } = await supabase.from("profiles").select("id, full_name").in("id", uids);
			profilesById = Object.fromEntries((profs ?? []).map((p) => [p.id, p]));
		}
		setMembers((roleRows ?? []).map((r) => ({
			user_id: r.user_id,
			role: r.role,
			full_name: profilesById[r.user_id]?.full_name ?? null,
			email: null
		})));
		setLoading(false);
	}, [spaceId]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const createInvite = async () => {
		if (!spaceId || !user) return;
		setBusy(true);
		const code = generateCode();
		const { error } = await supabase.from("space_invites").insert({
			space_id: spaceId,
			code,
			role: "manager",
			full_name: fullName.trim() || null,
			email: email.trim() || null,
			created_by: user.id,
			expires_at: new Date(Date.now() + 30 * 864e5).toISOString()
		});
		setBusy(false);
		if (error) return toast.error(error.message);
		setFullName("");
		setEmail("");
		toast.success(`Code créé : ${code}`);
		load();
	};
	const revokeInvite = async (id) => {
		const { error } = await supabase.from("space_invites").delete().eq("id", id);
		if (error) return toast.error(error.message);
		toast.success("Invitation supprimée");
		load();
	};
	const copyCode = (code) => {
		navigator.clipboard.writeText(code);
		toast.success("Code copié");
	};
	const activeInvites = (0, import_react.useMemo)(() => invites.filter((i) => !i.used_by), [invites]);
	const usedInvites = (0, import_react.useMemo)(() => invites.filter((i) => i.used_by), [invites]);
	const managers = (0, import_react.useMemo)(() => members.filter((m) => m.role === "manager"), [members]);
	if (!canManage) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-muted-foreground",
		children: "Vous n'avez pas accès à la gestion d'équipe. Contactez votre RH."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 md:p-8 space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 8
			},
			animate: {
				opacity: 1,
				y: 0
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-10 h-10 rounded-xl gradient-brand flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCog, { className: "w-5 h-5 text-white" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold font-display",
					children: "Équipe & invitations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Créez des codes uniques pour vos managers RH et gérez leurs permissions."
				})] })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "invites",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "invites",
						children: "Codes d'invitation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "managers",
						children: "Managers & permissions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "members",
						children: "Membres"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "invites",
					className: "space-y-4 mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-semibold mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-4 h-4 text-brand" }), " Créer une invitation manager"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid md:grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nom complet (optionnel)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: fullName,
											onChange: (e) => setFullName(e.target.value),
											className: "mt-1",
											placeholder: "Ex. Sara Benali"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email (optionnel)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: email,
											onChange: (e) => setEmail(e.target.value),
											className: "mt-1",
											placeholder: "sara@entreprise.dz"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-end",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												onClick: createInvite,
												disabled: busy,
												className: "w-full gradient-brand border-0",
												children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Générer un code"
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground mt-3",
									children: "Chaque code manager est unique, à usage unique, et expire dans 30 jours."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold mb-3",
								children: [
									"Invitations actives (",
									activeInvites.length,
									")"
								]
							}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin text-brand" }) : activeInvites.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: "Aucune invitation active."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: activeInvites.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 p-3 rounded-xl border bg-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Manager" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "font-mono text-sm font-semibold tracking-wider",
											children: inv.code
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm text-muted-foreground flex-1 truncate",
											children: inv.full_name || inv.email || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[11px] text-muted-foreground",
											children: ["Expire ", inv.expires_at ? new Date(inv.expires_at).toLocaleDateString() : "—"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => copyCode(inv.code),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => revokeInvite(inv.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5 text-danger" })
										})
									]
								}, inv.id))
							})]
						}),
						usedInvites.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold mb-3 text-sm text-muted-foreground",
								children: [
									"Invitations utilisées (",
									usedInvites.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1 text-sm",
								children: usedInvites.slice(0, 20).map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "font-mono text-xs",
											children: inv.code
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inv.full_name || inv.email || "—" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px]",
											children: ["Utilisé ", inv.used_at ? new Date(inv.used_at).toLocaleDateString() : ""]
										})
									]
								}, inv.id))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "managers",
					className: "mt-4 space-y-4",
					children: managers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 text-sm text-muted-foreground",
						children: [
							"Aucun manager pour l'instant — invitez-en un depuis l'onglet ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Codes d'invitation" }),
							"."
						]
					}) : managers.map((m) => spaceId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagerPermissions, {
						spaceId,
						member: m
					}, m.user_id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "members",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-semibold mb-3",
							children: [
								"Équipe de gestion (",
								members.length,
								")"
							]
						}), members.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: "Aucun membre."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 p-2.5 rounded-lg border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: m.role === "hr_admin" ? "default" : "secondary",
									children: m.role === "hr_admin" ? "RH Admin" : "Manager"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm",
									children: m.full_name || m.user_id.slice(0, 8)
								})]
							}, m.user_id + m.role))
						})]
					})
				})
			]
		})]
	});
}
function ManagerPermissions({ spaceId, member }) {
	const [perms, setPerms] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [loading, setLoading] = (0, import_react.useState)(true);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		const { data } = await supabase.from("manager_permissions").select("module").eq("space_id", spaceId).eq("user_id", member.user_id);
		setPerms(new Set((data ?? []).map((p) => p.module)));
		setLoading(false);
	}, [spaceId, member.user_id]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const toggle = async (module, checked) => {
		if (checked) {
			const { error } = await supabase.from("manager_permissions").insert({
				space_id: spaceId,
				user_id: member.user_id,
				module
			});
			if (error) return toast.error(error.message);
			setPerms((p) => new Set(p).add(module));
		} else {
			const { error } = await supabase.from("manager_permissions").delete().eq("space_id", spaceId).eq("user_id", member.user_id).eq("module", module);
			if (error) return toast.error(error.message);
			setPerms((p) => {
				const n = new Set(p);
				n.delete(module);
				return n;
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-9 h-9 rounded-full bg-brand/20 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-brand" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-semibold",
				children: member.full_name || member.user_id.slice(0, 8)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: "Manager · définissez ses modules accessibles"
			})] })]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin text-brand" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 md:grid-cols-3 gap-2",
			children: MODULES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer hover:bg-muted/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: perms.has(m.key),
					onCheckedChange: (v) => toggle(m.key, !!v)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: m.label
				})]
			}, m.key))
		})]
	});
}
//#endregion
export { TeamPage as component };
