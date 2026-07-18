import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.index-Ll3-SU4Q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var SplitComponent = () => {
	const nav = useNavigate();
	(0, import_react.useEffect)(() => {
		nav({
			to: "/employee/home",
			replace: true
		});
	}, [nav]);
	return null;
};
//#endregion
export { SplitComponent as component };
