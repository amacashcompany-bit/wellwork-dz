import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as money, t as billingDb } from "./billing-DEq1fU35.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { D as Plus, Pt as Banknote, T as RefreshCw, W as LoaderCircle, _t as CircleCheck, b as Settings2, ft as Clock3, it as Eye, j as Pause, k as Play, kt as Building2, l as TriangleAlert, lt as CreditCard, mt as CircleX, u as TrendingUp, w as Save } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-BBUarmca.mjs";
import { t as Switch } from "./switch-CCza_WcE.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BQuBX6bn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/superadmin.billing-TU0B6dOB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var paymentStatus = {
	awaiting_payment: {
		label: "En attente",
		className: "border-amber-500/30 bg-amber-500/10 text-amber-700"
	},
	under_review: {
		label: "À vérifier",
		className: "border-blue-500/30 bg-blue-500/10 text-blue-700"
	},
	paid: {
		label: "Payé",
		className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
	},
	rejected: {
		label: "Refusé",
		className: "border-destructive/30 bg-destructive/10 text-destructive"
	},
	refunded: {
		label: "Remboursé",
		className: "border-muted-foreground/30 bg-muted text-muted-foreground"
	}
};
function SuperAdminBilling() {
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [subscriptions, setSubscriptions] = (0, import_react.useState)([]);
	const [methods, setMethods] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [methodDialog, setMethodDialog] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const loadData = (0, import_react.useCallback)(async () => {
		setLoading(true);
		const [orderResult, subscriptionResult, methodResult] = await Promise.all([
			billingDb.from("payment_orders").select("*, plans(name), payment_methods(name,code)").order("created_at", { ascending: false }),
			billingDb.from("company_subscriptions").select("*, spaces(name,slug,subscription_status), plans(name)").order("ends_at", { ascending: true }),
			billingDb.from("payment_methods").select("*").order("sort_order")
		]);
		if (orderResult.error || subscriptionResult.error || methodResult.error) toast.error(orderResult.error?.message || subscriptionResult.error?.message || methodResult.error?.message);
		setOrders(orderResult.data || []);
		setSubscriptions(subscriptionResult.data || []);
		setMethods(methodResult.data || []);
		setLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	const analytics = (0, import_react.useMemo)(() => {
		const paid = orders.filter((order) => order.status === "paid");
		const revenueDzd = paid.filter((order) => order.currency === "DZD").reduce((sum, order) => sum + Number(order.amount), 0);
		const pending = orders.filter((order) => ["awaiting_payment", "under_review"].includes(order.status)).length;
		const inFourteenDays = Date.now() + 14 * 864e5;
		const expiring = subscriptions.filter((subscription) => subscription.status === "active" && new Date(subscription.ends_at).getTime() <= inFourteenDays).length;
		const months = Array.from({ length: 6 }, (_, offset) => {
			const date = /* @__PURE__ */ new Date();
			date.setMonth(date.getMonth() - (5 - offset));
			const key = `${date.getFullYear()}-${date.getMonth()}`;
			return {
				key,
				label: date.toLocaleDateString("fr-DZ", { month: "short" }),
				value: paid.filter((order) => {
					const paidDate = new Date(order.paid_at || order.created_at);
					return `${paidDate.getFullYear()}-${paidDate.getMonth()}` === key && order.currency === "DZD";
				}).reduce((sum, order) => sum + Number(order.amount), 0)
			};
		});
		return {
			revenueDzd,
			pending,
			expiring,
			active: subscriptions.filter((subscription) => subscription.status === "active").length,
			months
		};
	}, [orders, subscriptions]);
	const review = async (id, decision) => {
		const note = decision === "reject" ? window.prompt("Motif du refus (facultatif)") : null;
		const { error } = await billingDb.rpc("review_payment_order", {
			p_order_id: id,
			p_decision: decision,
			p_note: note
		});
		if (error) return toast.error(error.message);
		toast.success(decision === "approve" ? "Paiement accepté" : decision === "reject" ? "Paiement refusé" : "Remboursement enregistré");
		loadData();
	};
	const openProof = async (path) => {
		const { data, error } = await billingDb.storage.from("payment-proofs").createSignedUrl(path, 120);
		if (error || !data?.signedUrl) return toast.error(error?.message || "Justificatif indisponible");
		window.open(data.signedUrl, "_blank", "noopener,noreferrer");
	};
	const setSubscriptionStatus = async (spaceId, status) => {
		const { error } = await billingDb.rpc("set_company_subscription_status", {
			p_space_id: spaceId,
			p_status: status
		});
		if (error) return toast.error(error.message);
		toast.success(status === "active" ? "Abonnement réactivé" : status === "paused" ? "Abonnement mis en pause" : "Abonnement annulé");
		loadData();
	};
	const saveMethod = async () => {
		if (!methodDialog?.code || !methodDialog.name) return toast.error("Le code et le nom sont requis");
		setSaving(true);
		const payload = {
			code: methodDialog.code.toLowerCase().replace(/[^a-z0-9_]+/g, "_"),
			name: methodDialog.name,
			description: methodDialog.description || null,
			provider: methodDialog.provider || "manual",
			enabled: methodDialog.enabled ?? true,
			requires_proof: methodDialog.requires_proof ?? true,
			accepted_currencies: methodDialog.accepted_currencies || ["DZD"],
			instructions: methodDialog.instructions || null,
			public_config: methodDialog.public_config || {},
			sort_order: methodDialog.sort_order ?? methods.length + 1
		};
		const result = methodDialog.id ? await billingDb.from("payment_methods").update(payload).eq("id", methodDialog.id) : await billingDb.from("payment_methods").insert(payload);
		setSaving(false);
		if (result.error) return toast.error(result.error.message);
		toast.success("Moyen de paiement enregistré");
		setMethodDialog(null);
		loadData();
	};
	const maxMonth = Math.max(...analytics.months.map((month) => month.value), 1);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[60vh] place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-7 w-7 animate-spin text-brand" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold font-display",
						children: "Paiements & abonnements"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Revenus, validations, expirations et moyens de paiement."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: loadData,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "me-2 h-4 w-4" }), "Actualiser"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: Banknote,
						label: "Revenu encaissé",
						value: money(analytics.revenueDzd, "DZD"),
						tone: "emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: Clock3,
						label: "Paiements à traiter",
						value: String(analytics.pending),
						tone: "amber"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: Building2,
						label: "Abonnements actifs",
						value: String(analytics.active),
						tone: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: TriangleAlert,
						label: "Expirent sous 14 jours",
						value: String(analytics.expiring),
						tone: "red"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "overview",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "h-auto w-full justify-start overflow-x-auto bg-muted p-1 sm:w-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "overview",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "me-2 h-4 w-4" }), "Analyse"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "payments",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "me-2 h-4 w-4" }), "Paiements"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "companies",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "me-2 h-4 w-4" }), "Entreprises"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "methods",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "me-2 h-4 w-4" }), "Méthodes"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "overview",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "border border-border bg-card p-5 rounded-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold",
									children: "Revenu DZD sur 6 mois"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Paiements confirmés uniquement"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-56 grid-cols-6 items-end gap-3",
								children: analytics.months.map((month) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-full min-w-0 flex-col justify-end gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-center text-[10px] text-muted-foreground",
											children: month.value ? new Intl.NumberFormat("fr-DZ", { notation: "compact" }).format(month.value) : "0"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mx-auto w-full max-w-14 rounded-t-md bg-brand/85",
											style: { height: `${Math.max(4, month.value / maxMonth * 170)}px` }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-center text-xs text-muted-foreground",
											children: month.label
										})
									]
								}, month.key))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "payments",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "overflow-hidden border border-border bg-card rounded-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Entreprise" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Plan" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Méthode" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Montant" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Statut" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "text-right",
										children: "Actions"
									})
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: orders.map((order) => {
									const status = paymentStatus[order.status] || {
										label: order.status,
										className: ""
									};
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium",
											children: order.company_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											children: order.contact_email
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: order.plans?.name || "-" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: order.payment_methods?.name || "-" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-medium",
											children: money(Number(order.amount), order.currency)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: status.className,
											children: status.label
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "text-xs text-muted-foreground",
											children: new Date(order.created_at).toLocaleDateString("fr-DZ")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-end gap-1",
											children: [
												order.proof_path && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "icon",
													title: "Voir le reçu",
													onClick: () => openProof(order.proof_path),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
												}),
												["awaiting_payment", "under_review"].includes(order.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "icon",
													title: "Refuser",
													className: "text-destructive",
													onClick: () => review(order.id, "reject"),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "icon",
													title: "Accepter",
													className: "text-emerald-600",
													onClick: () => review(order.id, "approve"),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
												})] }),
												order.status === "paid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													onClick: () => review(order.id, "refund"),
													children: "Rembourser"
												})
											]
										}) })
									] }, order.id);
								}) })] })
							}), orders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "Aucun paiement enregistré" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "companies",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "overflow-hidden border border-border bg-card rounded-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Entreprise" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Plan" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Début" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Expiration" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Statut" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "text-right",
										children: "Contrôle"
									})
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: subscriptions.map((subscription) => {
									const days = Math.ceil((new Date(subscription.ends_at).getTime() - Date.now()) / 864e5);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium",
											children: subscription.spaces?.name || "-"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											children: subscription.spaces?.slug
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: subscription.plans?.name || "-" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(subscription.starts_at).toLocaleDateString("fr-DZ") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: new Date(subscription.ends_at).toLocaleDateString("fr-DZ") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `text-xs ${days <= 14 ? "text-amber-600" : "text-muted-foreground"}`,
											children: days > 0 ? `${days} jours restants` : "Expiré"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											children: subscription.status
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-end gap-1",
											children: [subscription.status === "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												title: "Réactiver",
												onClick: () => setSubscriptionStatus(subscription.space_id, "active"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 text-emerald-600" })
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												title: "Mettre en pause",
												onClick: () => setSubscriptionStatus(subscription.space_id, "paused"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4 text-amber-600" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												title: "Annuler",
												onClick: () => setSubscriptionStatus(subscription.space_id, "cancelled"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 text-destructive" })
											})]
										}) })
									] }, subscription.id);
								}) })] })
							}), subscriptions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "Aucun abonnement actif" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "methods",
						className: "mt-5 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold",
									children: "Moyens de paiement"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Activez, désactivez et configurez les informations visibles au client."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => setMethodDialog({
										provider: "manual",
										enabled: true,
										requires_proof: true,
										accepted_currencies: ["DZD"],
										public_config: {}
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "me-2 h-4 w-4" }), "Ajouter"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 lg:grid-cols-2",
							children: methods.map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 border border-border bg-card p-4 rounded-lg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-10 w-10 place-items-center rounded-md bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-5 w-5 text-brand" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium",
													children: method.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: "text-[10px]",
													children: method.provider
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-xs text-muted-foreground",
												children: method.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-[10px] text-muted-foreground",
												children: method.accepted_currencies.join(" · ")
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: method.enabled,
										onCheckedChange: async (enabled) => {
											await billingDb.from("payment_methods").update({ enabled }).eq("id", method.id);
											loadData();
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: () => setMethodDialog(method),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-4 w-4" })
									})
								]
							}, method.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!methodDialog,
				onOpenChange: (open) => !open && setMethodDialog(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-h-[90vh] overflow-y-auto sm:max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: methodDialog?.id ? "Configurer le moyen de paiement" : "Nouveau moyen de paiement" }) }),
						methodDialog && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 py-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nom" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: methodDialog.name || "",
									onChange: (event) => setMethodDialog({
										...methodDialog,
										name: event.target.value
									}),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Code" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: methodDialog.code || "",
									disabled: !!methodDialog.id,
									onChange: (event) => setMethodDialog({
										...methodDialog,
										code: event.target.value
									}),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: methodDialog.provider || "manual",
									onChange: (event) => setMethodDialog({
										...methodDialog,
										provider: event.target.value
									}),
									className: "mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "manual",
											children: "Manuel"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "chargily",
											children: "Chargily"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "paypal",
											children: "PayPal"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "external",
											children: "Lien externe"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Devises (séparées par virgule)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: (methodDialog.accepted_currencies || []).join(", "),
									onChange: (event) => setMethodDialog({
										...methodDialog,
										accepted_currencies: event.target.value.split(",").map((value) => value.trim().toUpperCase()).filter(Boolean)
									}),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: methodDialog.description || "",
										onChange: (event) => setMethodDialog({
											...methodDialog,
											description: event.target.value
										}),
										className: "mt-1"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Instructions client" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: methodDialog.instructions || "",
										onChange: (event) => setMethodDialog({
											...methodDialog,
											instructions: event.target.value
										}),
										className: "mt-1",
										rows: 4
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Titulaire du compte" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: methodDialog.public_config?.account_name || "",
									onChange: (event) => setMethodDialog({
										...methodDialog,
										public_config: {
											...methodDialog.public_config || {},
											account_name: event.target.value
										}
									}),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Numéro de compte / CCP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: methodDialog.public_config?.account_number || "",
									onChange: (event) => setMethodDialog({
										...methodDialog,
										public_config: {
											...methodDialog.public_config || {},
											account_number: event.target.value
										}
									}),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Lien de paiement public" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: methodDialog.public_config?.payment_url || "",
										onChange: (event) => setMethodDialog({
											...methodDialog,
											public_config: {
												...methodDialog.public_config || {},
												payment_url: event.target.value
											}
										}),
										className: "mt-1",
										placeholder: "https://"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: methodDialog.enabled ?? true,
										onCheckedChange: (enabled) => setMethodDialog({
											...methodDialog,
											enabled
										})
									}), "Actif"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: methodDialog.requires_proof ?? true,
										onCheckedChange: (requires_proof) => setMethodDialog({
											...methodDialog,
											requires_proof
										})
									}), "Justificatif requis"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setMethodDialog(null),
							children: "Annuler"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: saveMethod,
							disabled: saving,
							className: "bg-brand text-white",
							children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "me-2 h-4 w-4" }), "Enregistrer"] })
						})] })
					]
				})
			})
		]
	});
}
function Metric({ icon: Icon, label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4 border border-border bg-card p-4 rounded-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid h-11 w-11 shrink-0 place-items-center rounded-md ${{
				emerald: "bg-emerald-500/10 text-emerald-600",
				amber: "bg-amber-500/10 text-amber-600",
				blue: "bg-blue-500/10 text-blue-600",
				red: "bg-red-500/10 text-red-600"
			}[tone]}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "truncate text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 truncate text-xl font-bold",
				children: value
			})]
		})]
	});
}
function Empty({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10 text-center text-sm text-muted-foreground",
		children: text
	});
}
//#endregion
export { SuperAdminBilling as component };
