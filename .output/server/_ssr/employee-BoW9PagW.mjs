import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useMySpace, n as useAuth } from "./useAuth-DFflI0UN.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as useNavigate, f as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { W as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-BpC9Zhk0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee-BoW9PagW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmployeeLayout() {
	const navigate = useNavigate();
	const { user, loading } = useAuth();
	const { info, loading: spaceLoading } = useMySpace();
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
		if (!info.roles.includes("employee")) navigate({
			to: "/admin/dashboard",
			replace: true
		});
	}, [
		user,
		loading,
		info,
		spaceLoading,
		navigate
	]);
	if (loading || spaceLoading || !user || !info?.spaceId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin text-brand" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { EmployeeLayout as component };
