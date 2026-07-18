import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { S as Search, V as Mail, W as LoaderCircle, _ as ShieldCheck, _t as CircleCheck, dt as Clock, i as Users, kt as Building2, mt as CircleX, ot as Ellipsis, vt as CircleAlert, y as Settings } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-CDoe66ii.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BBUarmca.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion, o as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BQuBX6bn.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Cz2Xs2J4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/superadmin.index-f3wjllai.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sendAccessTokenEmail = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("70743b5a81bdb43c5c6d916e58432ad6e3f0267aed24d3d4d3d51e03d3924267"));
function SuperAdminDashboard() {
	const { t } = useI18n();
	const [tab, setTab] = (0, import_react.useState)("spaces");
	const [spaces, setSpaces] = (0, import_react.useState)([]);
	const [demoRequests, setDemoRequests] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [stats, setStats] = (0, import_react.useState)({
		totalSpaces: 0,
		totalUsers: 0,
		activeSpaces: 0,
		pendingDemos: 0
	});
	const [selectedDemo, setSelectedDemo] = (0, import_react.useState)(null);
	const [trialDuration, setTrialDuration] = (0, import_react.useState)("30");
	const [isApproving, setIsApproving] = (0, import_react.useState)(false);
	const loadData = (0, import_react.useCallback)(async () => {
		setLoading(true);
		const { data: spacesData, error: spacesError } = await supabase.from("spaces").select("*").order("created_at", { ascending: false });
		if (spacesError) toast.error("Erreur de chargement des entreprises: " + spacesError.message);
		const { data: membersData } = await supabase.from("space_members").select("space_id, user_id");
		const membersBySpace = (membersData ?? []).reduce((acc, curr) => {
			acc[curr.space_id] = (acc[curr.space_id] || 0) + 1;
			return acc;
		}, {});
		const enrichedSpaces = (spacesData ?? []).map((space) => ({
			...space,
			member_count: membersBySpace[space.id] || 0,
			owner_email: space.owner_id
		}));
		const { data: requestsData } = await supabase.from("demo_requests").select("*").order("created_at", { ascending: false });
		setSpaces(enrichedSpaces);
		setDemoRequests(requestsData ?? []);
		setStats({
			totalSpaces: enrichedSpaces.length,
			totalUsers: new Set((membersData ?? []).map((m) => m.user_id)).size,
			activeSpaces: enrichedSpaces.filter((s) => s.subscription_status === "active").length || enrichedSpaces.length,
			pendingDemos: (requestsData ?? []).filter((r) => r.status === "pending").length
		});
		setLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	const approveDemo = async () => {
		if (!selectedDemo) return;
		setIsApproving(true);
		const token = crypto.randomUUID();
		const { error } = await supabase.from("demo_requests").update({
			status: "approved",
			access_token: token,
			trial_duration_days: parseInt(trialDuration) || 30,
			reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", selectedDemo.id);
		if (error) {
			setIsApproving(false);
			toast.error(error.message);
			return;
		}
		try {
			await sendAccessTokenEmail({ data: {
				email: selectedDemo.contact_email,
				companyName: selectedDemo.company_name,
				token
			} });
			toast.success("Jeton généré et email envoyé avec succès !");
		} catch (err) {
			console.error(err);
			toast.warning("Jeton généré, mais l'envoi de l'email a échoué. Vérifiez vos identifiants Gmail.");
		}
		setIsApproving(false);
		setSelectedDemo(null);
		loadData();
	};
	const rejectDemo = async (id) => {
		const { error } = await supabase.from("demo_requests").update({
			status: "rejected",
			reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id);
		if (error) return toast.error(error.message);
		toast.success("Demande rejetée.");
		loadData();
	};
	const filteredSpaces = spaces.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.slug.toLowerCase().includes(search.toLowerCase()));
	const filteredDemos = demoRequests.filter((d) => d.company_name.toLowerCase().includes(search.toLowerCase()) || d.contact_email.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold font-display",
					children: t("saPlatformOverview")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: t("saManageCompanies")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .1 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 rounded-2xl flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-6 h-6 text-brand" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: t("saCompanies")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold",
								children: loading ? "-" : stats.totalSpaces
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .2 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 rounded-2xl flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-6 h-6 text-blue-500" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: t("saTotalUsers")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold",
								children: loading ? "-" : stats.totalUsers
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .3 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 rounded-2xl flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-6 h-6 text-emerald-500" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: t("saActiveSpaces")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold",
								children: loading ? "-" : stats.activeSpaces
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .4 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 rounded-2xl flex items-center gap-4 border-amber-500/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-6 h-6 text-amber-500" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: t("saPendingRequests")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold",
								children: loading ? "-" : stats.pendingDemos
							})] })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 p-1 bg-muted rounded-xl w-fit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab("spaces"),
					className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "spaces" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`,
					children: t("saCompanies")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTab("demos"),
					className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${tab === "demos" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`,
					children: [t("saDemoRequests"), stats.pendingDemos > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "default",
						className: "h-5 px-1.5 min-w-[20px] rounded-full bg-brand flex items-center justify-center text-[10px]",
						children: stats.pendingDemos
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: tab === "spaces" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -10
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-1 rounded-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-lg flex items-center gap-2",
								children: t("saCompanies")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full sm:w-72",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: search,
									onChange: (e) => setSearch(e.target.value),
									placeholder: t("saSearchCompany"),
									className: "ps-9 rounded-xl bg-muted/50 border-transparent focus-visible:bg-background"
								})]
							})]
						}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-12 flex justify-center items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand/50" })
						}) : filteredSpaces.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-12 text-center text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-12 h-12 mx-auto mb-3 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Aucune entreprise trouvée" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								className: "border-border/40 hover:bg-transparent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("saCompany") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Slug" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("saMembers") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("saDate") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("saStatus") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { className: "w-12" })
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredSpaces.map((space, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								className: "border-b border-border/40 hover:bg-muted/30 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "font-medium",
										children: space.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "px-2 py-1 bg-muted rounded text-xs text-muted-foreground",
										children: space.slug
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "font-medium",
										children: space.member_count
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "text-sm text-muted-foreground",
										children: new Date(space.created_at).toLocaleDateString()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: space.subscription_status === "active" ? "default" : space.subscription_status === "trial" ? "secondary" : "outline",
										className: space.subscription_status === "active" ? "bg-emerald-500 hover:bg-emerald-600" : space.subscription_status === "trial" ? "bg-blue-500/20 text-blue-500 border-blue-500/30" : "",
										children: space.subscription_status || "active"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "w-8 h-8 rounded-lg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "w-4 h-4" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
										align: "end",
										className: "rounded-xl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											className: "cursor-pointer gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-4 h-4" }), " Gérer l'espace"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											className: "cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4" }), " Suspendre"]
										})]
									})] }) })
								]
							}, space.id)) })] })
						})]
					})
				}, "spaces") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -10
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-1 rounded-2xl border-brand/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-lg flex items-center gap-2",
								children: t("saDemoRequests")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full sm:w-72",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: search,
									onChange: (e) => setSearch(e.target.value),
									placeholder: t("saSearchCompany"),
									className: "ps-9 rounded-xl bg-muted/50 border-transparent focus-visible:bg-background"
								})]
							})]
						}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-12 flex justify-center items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand/50" })
						}) : filteredDemos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-12 text-center text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-12 h-12 mx-auto mb-3 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Aucune demande de démo" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								className: "border-border/40 hover:bg-transparent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("saCompany") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("saContact") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("saDemoRequests") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Jeton (Si approuvé)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("saStatus") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "text-right",
										children: t("actions")
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredDemos.map((demo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								className: "border-b border-border/40 hover:bg-muted/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: demo.company_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: new Date(demo.created_at).toLocaleDateString()
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm",
										children: demo.contact_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: demo.contact_email
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "max-w-[200px] truncate text-sm text-muted-foreground",
										title: demo.company_description,
										children: demo.company_description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: demo.access_token ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "text-[10px] bg-muted px-1.5 py-0.5 rounded text-brand",
										children: demo.access_token
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground text-xs",
										children: "—"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: demo.status === "pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : demo.status === "approved" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-destructive/10 text-destructive border-destructive/20",
										children: demo.status === "pending" ? t("saPending") : demo.status === "approved" ? t("saApproved") : t("saRejected")
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "text-right",
										children: demo.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-end gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "outline",
												className: "h-8 text-destructive hover:text-destructive hover:bg-destructive/10",
												onClick: () => rejectDemo(demo.id),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-3.5 h-3.5 me-1" }),
													" ",
													t("saReject")
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												className: "h-8 gradient-brand border-0",
												onClick: () => setSelectedDemo(demo),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 me-1" }),
													" ",
													t("saApprove")
												]
											})]
										})
									})
								]
							}, demo.id)) })] })
						})]
					})
				}, "demos")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedDemo,
				onOpenChange: (open) => !open && setSelectedDemo(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[425px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("saApprove") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Vous allez générer un jeton d'accès pour ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedDemo?.company_name }),
							". Ce jeton devra leur être envoyé par email."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("saTrialDurationDays") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: trialDuration,
										onChange: (e) => setTrialDuration(e.target.value),
										min: "1",
										max: "365",
										className: "bg-muted/50"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: t("saApproveDemoDesc")
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setSelectedDemo(null),
							children: t("cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: approveDemo,
							disabled: isApproving,
							className: "gradient-brand border-0",
							children: [isApproving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin me-2" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 me-2" }), t("saGenerateToken")]
						})] })
					]
				})
			})
		]
	});
}
//#endregion
export { SuperAdminDashboard as component };
