//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CRHDyp2r.js
var manifest = {
	"430e01e763efe192deeadcd55a5535f2aa833377fa2bc9d5bb9171143218ec3d": {
		functionName: "askWellWorkAssistant_createServerFn_handler",
		importer: () => import("./_ssr/wellwork-chat-DQDA7XpE.mjs")
	},
	"70743b5a81bdb43c5c6d916e58432ad6e3f0267aed24d3d4d3d51e03d3924267": {
		functionName: "sendAccessTokenEmail_createServerFn_handler",
		importer: () => import("./_ssr/mailer-DHLAj5Wd.mjs")
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
