import { t as supabase } from "./client-bssJDK4U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/billing-DEq1fU35.js
var billingDb = supabase;
function money(amount, currency) {
	if (amount === null) return "Sur devis";
	return new Intl.NumberFormat("fr-DZ", {
		style: "currency",
		currency,
		maximumFractionDigits: 0
	}).format(amount);
}
//#endregion
export { money as n, billingDb as t };
