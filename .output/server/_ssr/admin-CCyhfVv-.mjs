import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace, n as useAuth, r as useManagerPermissions, t as hasRole } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as useNavigate, f as Outlet, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { W as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as managerAccessForPath } from "./MobileNavigation-1wtlhWbb.mjs";
import { t as AppShell } from "./AppShell-BpC9Zhk0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CCyhfVv-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	const { user, loading } = useAuth();
	const { info, loading: spaceLoading } = useMySpace();
	const isManager = hasRole(info?.roles ?? [], "manager") && !hasRole(info?.roles ?? [], ["hr_admin", "super_admin"]);
	const { permissions, loading: permissionsLoading } = useManagerPermissions(info?.spaceId ?? null, isManager);
	(0, import_react.useEffect)(() => {
		if (loading) return;
		if (!user) {
			navigate({
				to: "/auth",
				replace: true
			});
			return;
		}
		if (spaceLoading) return;
		if (!info?.spaceId) {
			navigate({
				to: "/onboarding",
				replace: true
			});
			return;
		}
		if (!hasRole(info.roles, [
			"hr_admin",
			"super_admin",
			"manager"
		])) {
			navigate({
				to: "/employee/home",
				replace: true
			});
			return;
		}
		if (isManager && !permissionsLoading) {
			const requiredAccess = managerAccessForPath(location.pathname);
			if (requiredAccess === "admin_only" || requiredAccess && !permissions.has(requiredAccess)) navigate({
				to: "/admin/dashboard",
				replace: true
			});
		}
	}, [
		user,
		loading,
		info,
		spaceLoading,
		navigate,
		isManager,
		permissionsLoading,
		permissions,
		location.pathname
	]);
	if (loading || spaceLoading || isManager && permissionsLoading || !user || !info?.spaceId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin text-brand" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AdminLayout as component };
