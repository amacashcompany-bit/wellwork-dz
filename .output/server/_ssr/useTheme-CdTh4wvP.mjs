import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useStore } from "./useStore-BJ-X0o7y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useTheme-CdTh4wvP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useThemeSync() {
	const isDarkMode = useStore((s) => s.isDarkMode);
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);
}
//#endregion
export { useThemeSync as t };
