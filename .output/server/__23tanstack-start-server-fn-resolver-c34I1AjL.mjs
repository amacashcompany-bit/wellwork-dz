//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-c34I1AjL.js
var manifest = {
	"058bf6547f500f9ac7b8c1b768beea1fb5662f8e937aa9f620bb2f7c90626096": {
		functionName: "runBurnoutAnalysis_createServerFn_handler",
		importer: () => import("./_ssr/burnout-analysis-CjVM2XFz.mjs")
	},
	"430e01e763efe192deeadcd55a5535f2aa833377fa2bc9d5bb9171143218ec3d": {
		functionName: "askWellWorkAssistant_createServerFn_handler",
		importer: () => import("./_ssr/wellwork-chat-D9kPRigI.mjs")
	},
	"6d1773d538bad7cf9b83304348952d2c04b0dade706c2463076d4f1ebba70bd2": {
		functionName: "getBurnoutResults_createServerFn_handler",
		importer: () => import("./_ssr/burnout-analysis-CjVM2XFz.mjs")
	},
	"70743b5a81bdb43c5c6d916e58432ad6e3f0267aed24d3d4d3d51e03d3924267": {
		functionName: "sendAccessTokenEmail_createServerFn_handler",
		importer: () => import("./_ssr/mailer-DHLAj5Wd.mjs")
	},
	"910c7c79dd001c73fda815fcf58f935ad4743214656499eb406443326118de0a": {
		functionName: "resolveBurnoutAlert_createServerFn_handler",
		importer: () => import("./_ssr/burnout-analysis-CjVM2XFz.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
