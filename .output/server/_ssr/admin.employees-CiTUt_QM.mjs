import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { D as Plus, S as Search, W as LoaderCircle, _ as ShieldCheck, i as Users } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as useI18n } from "./useI18n-C6quAtBX.mjs";
import { a as motion } from "../_libs/framer-motion.mjs";
import { n as PageHeader } from "./AppShell-CBNkTu1o.mjs";
import { t as Card } from "./card-BLWafi8D.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BQuBX6bn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.employees-CiTUt_QM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function parseEmployees(data) {
	if (!Array.isArray(data)) return [];
	return data.filter((value) => {
		if (!value || typeof value !== "object") return false;
		const row = value;
		return typeof row.id === "string" && typeof row.employeeCode === "string" && typeof row.fullName === "string";
	});
}
function EmployeesPage() {
	const { pick, t } = useI18n();
	const departments = useStore((state) => state.departments);
	const { info } = useMySpace();
	const [employees, setEmployees] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [employeeCode, setEmployeeCode] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [position, setPosition] = (0, import_react.useState)("");
	const loadEmployees = (0, import_react.useCallback)(async () => {
		if (!info?.spaceId) return;
		setLoading(true);
		const { data, error } = await supabase.rpc.bind(supabase)("list_company_employees");
		setLoading(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		setEmployees(parseEmployees(data));
	}, [info?.spaceId]);
	(0, import_react.useEffect)(() => {
		loadEmployees();
	}, [loadEmployees]);
	const createEmployee = async () => {
		if (!employeeCode.trim() || !fullName.trim() || !email.trim()) return;
		setBusy(true);
		const { error } = await supabase.rpc.bind(supabase)("create_company_employee", {
			p_employee_code: employeeCode.trim().toUpperCase(),
			p_full_name: fullName.trim(),
			p_email: email.trim(),
			p_position: position.trim() || null
		});
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		setEmployeeCode("");
		setFullName("");
		setEmail("");
		setPosition("");
		toast.success("Salarié ajouté au registre");
		loadEmployees();
	};
	const filtered = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return employees;
		return employees.filter((employee) => [
			employee.employeeCode,
			employee.fullName,
			employee.email,
			employee.position ?? "",
			employee.department ?? ""
		].some((value) => value.toLowerCase().includes(needle)));
	}, [employees, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: pick("Employés & Départements", "الموظفون والأقسام", "Employees & Departments"),
		subtitle: pick("Registre salarié et identifiants d'accès privés.", "سجل الموظفين ومعرفات الوصول الخاصة.", "Employee roster and private access IDs.")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "employees",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
				value: "employees",
				children: [
					pick("Employés", "الموظفون", "Employees"),
					" (",
					employees.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
				value: "departments",
				children: [
					pick("Départements", "الأقسام", "Departments"),
					" (",
					departments.length,
					")"
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "employees",
				className: "mt-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: pick("Ajouter un salarié", "إضافة موظف", "Add employee")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2 xl:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: pick("Identifiant", "المعرف", "Employee ID") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: employeeCode,
								onChange: (event) => setEmployeeCode(event.target.value.toUpperCase()),
								placeholder: "EMP-0142",
								className: "mt-1 font-mono"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: pick("Nom complet", "الاسم الكامل", "Full name") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: fullName,
								onChange: (event) => setFullName(event.target.value),
								className: "mt-1"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								className: "mt-1"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: pick("Poste", "المنصب", "Position") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: position,
								onChange: (event) => setPosition(event.target.value),
								className: "mt-1"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: createEmployee,
									disabled: busy || !employeeCode.trim() || !fullName.trim() || !email.trim(),
									className: "w-full",
									children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 me-2" }), pick("Ajouter", "إضافة", "Add")] })
								})
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 mb-4 md:flex-row md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: t("search"),
								className: "ps-9"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-brand" }), pick("L'activation du compte reste confidentielle", "يبقى تفعيل الحساب سرياً", "Account activation remains private")]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: pick("Identifiant", "المعرف", "Employee ID") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: pick("Employé", "الموظف", "Employee") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Email" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: pick("Poste", "المنصب", "Position") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: pick("Département", "القسم", "Department") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: pick("Statut", "الحالة", "Status") })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 6,
							className: "h-24 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin text-brand mx-auto" })
						}) }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 6,
							className: "h-24 text-center text-muted-foreground",
							children: pick("Aucun salarié dans ce registre.", "لا يوجد موظفون في هذا السجل.", "No employees in this roster.")
						}) }) : filtered.map((employee, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: index * .02 },
							className: "border-b hover:bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "font-mono font-semibold text-brand",
									children: employee.employeeCode
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "font-medium",
									children: employee.fullName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-sm text-muted-foreground",
									children: employee.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-sm",
									children: employee.position || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: employee.department || "—"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: employee.status === "active" ? "default" : "outline",
									children: employee.status
								}) })
							]
						}, employee.id)) })] })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "departments",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
					children: departments.map((department, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: index * .05 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "p-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-9 h-9 bg-brand/10 flex items-center justify-center rounded-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-4 h-4 text-brand" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: pick(department.name, department.nameAr, department.name)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										department.headcount,
										" ",
										pick("personnes", "أشخاص", "people")
									]
								})] })]
							})
						})
					}, department.id))
				})
			})
		]
	})] });
}
//#endregion
export { EmployeesPage as component };
