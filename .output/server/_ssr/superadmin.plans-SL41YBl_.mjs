import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as billingDb } from "./billing-DEq1fU35.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { A as Pen, Ct as Check, D as Plus, W as LoaderCircle, f as Trash2, n as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-BBUarmca.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { t as Checkbox } from "./checkbox-B1AjkRkB.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BQuBX6bn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/superadmin.plans-SL41YBl_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SuperAdminPlans() {
	const { t } = useI18n();
	const [plans, setPlans] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [editingPlan, setEditingPlan] = (0, import_react.useState)(null);
	const [featuresText, setFeaturesText] = (0, import_react.useState)("");
	const loadPlans = (0, import_react.useCallback)(async () => {
		setLoading(true);
		const { data, error } = await billingDb.from("plans").select("*").order("sort_order", { ascending: true });
		if (error) toast.error("Erreur de chargement: " + error.message);
		else {
			const parsedPlans = (data || []).map((p) => ({
				...p,
				features: Array.isArray(p.features) ? p.features : []
			}));
			setPlans(parsedPlans);
		}
		setLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		loadPlans();
	}, [loadPlans]);
	const handleOpenDialog = (plan) => {
		if (plan) {
			setEditingPlan(plan);
			setFeaturesText((plan.features || []).join("\n"));
		} else {
			setEditingPlan({
				slug: "",
				name: "",
				tagline: "",
				price_monthly: 0,
				price_yearly: 0,
				currency: "DZD",
				duration_months: 1,
				is_demo: false,
				highlighted: false,
				active: true,
				sort_order: plans.length
			});
			setFeaturesText("");
		}
		setIsOpen(true);
	};
	const handleSave = async () => {
		if (!editingPlan?.slug || !editingPlan?.name) {
			toast.error("Le slug et le nom sont requis");
			return;
		}
		setSaving(true);
		const featuresArray = featuresText.split("\n").map((f) => f.trim()).filter(Boolean);
		const planData = {
			...editingPlan,
			features: featuresArray
		};
		let error;
		if (editingPlan.id) error = (await billingDb.from("plans").update(planData).eq("id", editingPlan.id)).error;
		else error = (await billingDb.from("plans").insert(planData)).error;
		setSaving(false);
		if (error) toast.error(error.message);
		else {
			toast.success("Plan enregistré !");
			setIsOpen(false);
			loadPlans();
		}
	};
	const handleDelete = async (id) => {
		if (!window.confirm("Supprimer ce plan définitivement ?")) return;
		const { error } = await billingDb.from("plans").delete().eq("id", id);
		if (error) toast.error(error.message);
		else {
			toast.success("Plan supprimé");
			loadPlans();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						children: t("saManagePlans")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: t("saManagePlansDesc")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => handleOpenDialog(),
					className: "gradient-brand text-white border-0 shadow-glow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 me-2" }),
						" ",
						t("saCreatePlan")
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-1 rounded-2xl",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-12 flex justify-center items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand/50" })
				}) : plans.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-12 text-center text-muted-foreground",
					children: "Aucun plan trouvé."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-border/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Ordre" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("saPlanName") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("saPriceMonthly") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableHead, { children: [t("saIsDemo"), " ?"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableHead, { children: [t("saActive"), " ?"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: t("actions")
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-b border-border/40 hover:bg-muted/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-mono text-xs",
								children: p.sort_order
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-medium flex items-center gap-2",
								children: [p.name, p.highlighted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-brand/10 text-brand text-[10px] h-4 px-1.5 border-brand/20",
									children: "Mise en avant"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: p.slug
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: p.price_monthly === null ? "Sur devis" : `${p.price_monthly} ${p.currency}/mois` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: p.is_demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "bg-amber-500/10 text-amber-600",
								children: t("yes")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-xs",
								children: t("no")
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: p.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4 text-muted-foreground" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: () => handleOpenDialog(p),
										className: "w-8 h-8 rounded-lg hover:bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-4 h-4 text-brand" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: () => handleDelete(p.id),
										className: "w-8 h-8 rounded-lg hover:bg-destructive/10 text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
									})]
								})
							})
						]
					}, p.id)) })] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isOpen,
				onOpenChange: setIsOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[600px] max-h-[90vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingPlan?.id ? t("saEditPlan") : t("saCreatePlan") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("saPlanName") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: editingPlan?.name || "",
										onChange: (e) => setEditingPlan({
											...editingPlan,
											name: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Slug (identifiant unique)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: editingPlan?.slug || "",
										onChange: (e) => setEditingPlan({
											...editingPlan,
											slug: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("saTagline") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: editingPlan?.tagline || "",
										onChange: (e) => setEditingPlan({
											...editingPlan,
											tagline: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("saPriceMonthly") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: editingPlan?.price_monthly ?? "",
										onChange: (e) => setEditingPlan({
											...editingPlan,
											price_monthly: e.target.value ? Number(e.target.value) : null
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("saCurrency") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: editingPlan?.currency || "DZD",
										onChange: (e) => setEditingPlan({
											...editingPlan,
											currency: e.target.value.toUpperCase()
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Prix annuel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: editingPlan?.price_yearly ?? "",
										onChange: (e) => setEditingPlan({
											...editingPlan,
											price_yearly: e.target.value ? Number(e.target.value) : null
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Durée (mois)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: "1",
										value: editingPlan?.duration_months ?? 1,
										onChange: (e) => setEditingPlan({
											...editingPlan,
											duration_months: Math.max(1, Number(e.target.value))
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Ordre d'affichage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: editingPlan?.sort_order ?? 0,
										onChange: (e) => setEditingPlan({
											...editingPlan,
											sort_order: Number(e.target.value)
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-2 grid grid-cols-3 gap-4 pt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-sm cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: editingPlan?.active ?? false,
												onCheckedChange: (c) => setEditingPlan({
													...editingPlan,
													active: !!c
												})
											}), t("saActive")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-sm cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: editingPlan?.is_demo ?? false,
												onCheckedChange: (c) => setEditingPlan({
													...editingPlan,
													is_demo: !!c
												})
											}), t("saIsDemo")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-sm cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: editingPlan?.highlighted ?? false,
												onCheckedChange: (c) => setEditingPlan({
													...editingPlan,
													highlighted: !!c
												})
											}), t("saHighlighted")]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 col-span-2 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("saFeatures") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: featuresText,
										onChange: (e) => setFeaturesText(e.target.value),
										rows: 6,
										placeholder: "Tableau de bord standard\nSupport par email"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setIsOpen(false),
							children: t("cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleSave,
							disabled: saving,
							className: "gradient-brand text-white border-0",
							children: [
								saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin me-2" }),
								" ",
								t("save")
							]
						})] })
					]
				})
			})
		]
	});
}
//#endregion
export { SuperAdminPlans as component };
