globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as serve, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"423e-MbID4VcIxvDdgL4ew0qEbPp9cpM\"",
		"mtime": "2026-07-14T14:53:13.840Z",
		"size": 16958,
		"path": "../public/favicon.ico"
	},
	"/assets/admin-B8FN1KIw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48d-olRBD1K6HAA7nw0z3daXBtRkS/Y\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 1165,
		"path": "../public/assets/admin-B8FN1KIw.js"
	},
	"/assets/activate-DScaWJwa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d45-YjH/JD8XZHWJ9QJryOJNpqAfee0\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 3397,
		"path": "../public/assets/activate-DScaWJwa.js"
	},
	"/assets/admin.actions-Dtk1lJ3U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f05-B1MBexbTI5dnZF4RZkQVCCBLL58\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 3845,
		"path": "../public/assets/admin.actions-Dtk1lJ3U.js"
	},
	"/assets/admin.alerts-DQdtJ_j0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e49-I8t31d2gzMycLNkhJO2VJaF9lm8\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 3657,
		"path": "../public/assets/admin.alerts-DQdtJ_j0.js"
	},
	"/assets/admin.anonymous-BAc9-uak.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19a4-R1uqhcK4IgkHM100QS9K1q+MzrI\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 6564,
		"path": "../public/assets/admin.anonymous-BAc9-uak.js"
	},
	"/assets/admin.burnout-fPv04tx-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f5b-u1BURAesBbuzR7sxNChilBVcAzE\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 8027,
		"path": "../public/assets/admin.burnout-fPv04tx-.js"
	},
	"/assets/admin.employees-Lj_yhulf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc5-lNFXEY5BtufwVNg3zZ+xcXW7KZ8\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 7109,
		"path": "../public/assets/admin.employees-Lj_yhulf.js"
	},
	"/assets/admin.dashboard-DJgi49u9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11dbd-tZbywixu0d4ox4VgT3OEVhD79tU\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 73149,
		"path": "../public/assets/admin.dashboard-DJgi49u9.js"
	},
	"/assets/admin.erp-BP7m2vCS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148e-4byM+1u4ngEG0e3HcI1dPlOvaGU\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 5262,
		"path": "../public/assets/admin.erp-BP7m2vCS.js"
	},
	"/assets/admin.events-DG9fqAMZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c-KQLXcAgu4a2IlRDrjfD9wwj0vrg\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 76,
		"path": "../public/assets/admin.events-DG9fqAMZ.js"
	},
	"/assets/admin.index-CVMvyY4I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d4-ZXomo80qGOZPyFVVmTbghHPpfdA\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 212,
		"path": "../public/assets/admin.index-CVMvyY4I.js"
	},
	"/assets/admin.library-CJW6AGLA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-5EMn9umeLWVoRJnNWcgiazvvaTs\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 77,
		"path": "../public/assets/admin.library-CJW6AGLA.js"
	},
	"/assets/admin.messages-Cn192N2T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-Xi95IDTeO6Qv/Y/RIKtdpIPOT6U\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 79,
		"path": "../public/assets/admin.messages-Cn192N2T.js"
	},
	"/assets/admin.reports-k9rgHlJL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1193-3Dgj9nkeN6kBhXK29us8bFU/Ttk\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 4499,
		"path": "../public/assets/admin.reports-k9rgHlJL.js"
	},
	"/assets/admin.surveys-CGw_qJn2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c30-jFvLTzmfWnN248v65G3CKYEFOFs\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 3120,
		"path": "../public/assets/admin.surveys-CGw_qJn2.js"
	},
	"/assets/admin.settings-sSdo5iOg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85e7-c7cKzn9FA6xSDx3s/H0DbE7lOHs\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 34279,
		"path": "../public/assets/admin.settings-sSdo5iOg.js"
	},
	"/assets/admin.team-CJQdsaKr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f7-tFX/TrzIh7nMGbC1uzX7iYyLzxE\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 9463,
		"path": "../public/assets/admin.team-CJQdsaKr.js"
	},
	"/assets/anonymity-Bz--fVPw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b3-0NQfeXlejonJalBL28XXcqBWZL8\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 1203,
		"path": "../public/assets/anonymity-Bz--fVPw.js"
	},
	"/assets/algerie-poste-CYYv7qDA.png": {
		"type": "image/png",
		"etag": "\"2ef99-D+Y0eUl/XFLo6X7OcKkBHM9GW4w\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 192409,
		"path": "../public/assets/algerie-poste-CYYv7qDA.png"
	},
	"/assets/AnonymousBanner-CWWBSju4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20f3-RruZJdKw9zAhCEzpZeeKOPT7zns\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 8435,
		"path": "../public/assets/AnonymousBanner-CWWBSju4.js"
	},
	"/assets/AppShell-CsNYugcs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3469-v9S4+I8nGksdS7Qi+SRsL8U2pSc\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 13417,
		"path": "../public/assets/AppShell-CsNYugcs.js"
	},
	"/assets/arrow-up-right-DpzC3__p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-aqD980q7rcX5FKBpjAAAfVQOk3A\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 157,
		"path": "../public/assets/arrow-up-right-DpzC3__p.js"
	},
	"/assets/auth-Ct5mXg6Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19bb-/i8YiA0+4CWqpfXj2L6JOeYJJC0\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 6587,
		"path": "../public/assets/auth-Ct5mXg6Y.js"
	},
	"/assets/AreaChart-CgCa2kLD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b651-8CXvYRsVrgxKzsUa3G+mRH2vsnw\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 374353,
		"path": "../public/assets/AreaChart-CgCa2kLD.js"
	},
	"/assets/auth.callback-C0xOp5yT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"960-Yw+upgQ3uWxREHPt4q5Vjs+B760\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 2400,
		"path": "../public/assets/auth.callback-C0xOp5yT.js"
	},
	"/assets/baridimob-CtydI89s.png": {
		"type": "image/png",
		"etag": "\"af0c-5p4u8XF4CXDX6h2uC1NU+DonEYY\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 44812,
		"path": "../public/assets/baridimob-CtydI89s.png"
	},
	"/assets/badge-C4dSGxVr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31c-IYWt4G7K9HbetjkoDXDCw5K5u1w\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 796,
		"path": "../public/assets/badge-C4dSGxVr.js"
	},
	"/assets/billing-D_q62G0Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-CK5sj1lEj4/NhC+BJJ2/uWA5FOg\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 200,
		"path": "../public/assets/billing-D_q62G0Y.js"
	},
	"/assets/building-2-B-4khl6P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-1OpNnN+jKey7G9x2O8VnpCcjov4\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 373,
		"path": "../public/assets/building-2-B-4khl6P.js"
	},
	"/assets/button-D_h1E0Ub.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f7f-1mtDey3GW9lS2l3Pfuz4QkPJznk\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 32639,
		"path": "../public/assets/button-D_h1E0Ub.js"
	},
	"/assets/calendar-days-BAaWzf2k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-RCzsDPg16Ojg3rVG15/4pf4REtY\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 484,
		"path": "../public/assets/calendar-days-BAaWzf2k.js"
	},
	"/assets/check-Cg4A6mVq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"72-snQf4adNID1SY5fXpcfBcjx8syY\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 114,
		"path": "../public/assets/check-Cg4A6mVq.js"
	},
	"/assets/card-0GbvPCKT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41f-1DKAkghvW/AhdTDd8n22OO1Uy+I\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 1055,
		"path": "../public/assets/card-0GbvPCKT.js"
	},
	"/assets/checkbox-DKDFEWs5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe5-11bS/8BFBcQ0G0CyuU0YjuTjBBA\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 4069,
		"path": "../public/assets/checkbox-DKDFEWs5.js"
	},
	"/assets/checkout-C-jKplKl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f4e-qs9tl+rVJfSxDwQ0gU6JIDSXkns\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 20302,
		"path": "../public/assets/checkout-C-jKplKl.js"
	},
	"/assets/circle-alert-BXKOhw_Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-n4vHQ1/FBUvB6Hf5u+A3NO/tP2E\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 240,
		"path": "../public/assets/circle-alert-BXKOhw_Z.js"
	},
	"/assets/chevron-down-JG68WOvF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-nsThMbYu9OvY7IgLHIZIqqD5+tU\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 118,
		"path": "../public/assets/chevron-down-JG68WOvF.js"
	},
	"/assets/circle-x-BBIJHN4n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-Z/nTmHVD25uh1bhcipU9FiuHTyE\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 197,
		"path": "../public/assets/circle-x-BBIJHN4n.js"
	},
	"/assets/circle-check-tmvf4M41.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-uzZs6GfsqemsLu/Jea26MzCR1f0\"",
		"mtime": "2026-07-18T01:32:59.068Z",
		"size": 168,
		"path": "../public/assets/circle-check-tmvf4M41.js"
	},
	"/assets/client-CtRRebDM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32354-mYpnbT5USMybJNbICzPpwi7+Tf0\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 205652,
		"path": "../public/assets/client-CtRRebDM.js"
	},
	"/assets/clock-cL6hdXHJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-6XKv3aTi7svCXMb7YfD29Tw5Shc\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 159,
		"path": "../public/assets/clock-cL6hdXHJ.js"
	},
	"/assets/copy-CTstNNaw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-iLhP7OQWb4l66y6B5jiMcd+EMbo\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 226,
		"path": "../public/assets/copy-CTstNNaw.js"
	},
	"/assets/credit-card-CndUKd3B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-7iGvU0FXJrfDGaUc7WfreXxL554\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 197,
		"path": "../public/assets/credit-card-CndUKd3B.js"
	},
	"/assets/Combination-M7_R_nL0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5267-ZmUz7KO83FlKrfY14u22fR4UYdg\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 21095,
		"path": "../public/assets/Combination-M7_R_nL0.js"
	},
	"/assets/createServerFn-B9Mv2PVe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1123-z5LvXS6PRyTxaoOyELXHWUIov7w\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 4387,
		"path": "../public/assets/createServerFn-B9Mv2PVe.js"
	},
	"/assets/database-CwHlaViv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-LXV9EGcRH6zy4yE9/pLRD2Qyv4E\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 233,
		"path": "../public/assets/database-CwHlaViv.js"
	},
	"/assets/dist-C2J943E6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44-OS6su+NFCKVeCGRYewHX2hCT1qA\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 68,
		"path": "../public/assets/dist-C2J943E6.js"
	},
	"/assets/dist-BfnKMUgh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"272-Bd1Cfv8OTI1HODj9RFNTzozEEIA\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 626,
		"path": "../public/assets/dist-BfnKMUgh.js"
	},
	"/assets/dialog-njFfpwok.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184a-o+InQVPznCNuoZxBQBcguYCVvjw\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 6218,
		"path": "../public/assets/dialog-njFfpwok.js"
	},
	"/assets/dist-C9Sm5wnZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"223-RmnJbvJZ2CNIC0GNljAo4cXDpfk\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 547,
		"path": "../public/assets/dist-C9Sm5wnZ.js"
	},
	"/assets/dist-CbBK0gLs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1305-JxVMoDJb6MA1yNB54dWKGstrujc\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 4869,
		"path": "../public/assets/dist-CbBK0gLs.js"
	},
	"/assets/dist-CEh50d6X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-hPI/incivhUN9MuJZAAvGG7HzYQ\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 246,
		"path": "../public/assets/dist-CEh50d6X.js"
	},
	"/assets/dist-DV0jE0HF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13aa-kCCCTz5+n/vVJ7n4wfAgmlPQ+Xo\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 5034,
		"path": "../public/assets/dist-DV0jE0HF.js"
	},
	"/assets/employee-B3z17zng.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"331-fhH/T0lmeeyuojMOw58oqqCj7Go\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 817,
		"path": "../public/assets/employee-B3z17zng.js"
	},
	"/assets/dropdown-menu-nnCQGEKi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc7d-XndsFDyHHGz1WN5R5gHJVS/ZjxQ\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 48253,
		"path": "../public/assets/dropdown-menu-nnCQGEKi.js"
	},
	"/assets/employee.events-DG9fqAMZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c-KQLXcAgu4a2IlRDrjfD9wwj0vrg\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 76,
		"path": "../public/assets/employee.events-DG9fqAMZ.js"
	},
	"/assets/employee.feedback-CHVKyS2N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf0-E+tXRR4endMREBfw+28TexsX7hQ\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 11248,
		"path": "../public/assets/employee.feedback-CHVKyS2N.js"
	},
	"/assets/employee.help-CatwUygd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2833-mI4kpIsfBu7AGYzplA6cRtMO3J4\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 10291,
		"path": "../public/assets/employee.help-CatwUygd.js"
	},
	"/assets/employee.home-BDEiP-dY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1294-0ZUxifsOLxRNpX1PZmLW9npkUMA\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 4756,
		"path": "../public/assets/employee.home-BDEiP-dY.js"
	},
	"/assets/employee.index-nwyYjlWy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2-eHfd5FKbXChCyAE2YrwPekytMtI\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 210,
		"path": "../public/assets/employee.index-nwyYjlWy.js"
	},
	"/assets/employee.library-CJW6AGLA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-5EMn9umeLWVoRJnNWcgiazvvaTs\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 77,
		"path": "../public/assets/employee.library-CJW6AGLA.js"
	},
	"/assets/employee.messages-Cn192N2T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-Xi95IDTeO6Qv/Y/RIKtdpIPOT6U\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 79,
		"path": "../public/assets/employee.messages-Cn192N2T.js"
	},
	"/assets/employee.surveys-IpS68RE3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4827-4waWq0vnua5b3dueUitmKDaW8jc\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 18471,
		"path": "../public/assets/employee.surveys-IpS68RE3.js"
	},
	"/assets/EventsPage-BhXuV9tL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3c-k2xyVyrprjXMZPWiKn8BnkywQ9w\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 3388,
		"path": "../public/assets/EventsPage-BhXuV9tL.js"
	},
	"/assets/external-link-Dljof09u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-DoUvZ0PUHtGOma0kOiAM08e3OeI\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 241,
		"path": "../public/assets/external-link-Dljof09u.js"
	},
	"/assets/globe-CydhzfyO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-oJhOiCKwiCxJZjUBx0bwe1N7u/s\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 232,
		"path": "../public/assets/globe-CydhzfyO.js"
	},
	"/assets/input-B9ppqgRe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"817a-A0X+afN9irFO4aC36GKCxQ5Twnk\"",
		"mtime": "2026-07-18T01:32:59.083Z",
		"size": 33146,
		"path": "../public/assets/input-B9ppqgRe.js"
	},
	"/assets/key-round-r7zA_-es.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"159-cnDRd2INu+H+ELliWbIckon/3bI\"",
		"mtime": "2026-07-18T01:32:59.098Z",
		"size": 345,
		"path": "../public/assets/key-round-r7zA_-es.js"
	},
	"/assets/label-CGDYpC2o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-RX9yLjcznPDSiSiQ4cc3bC/RqZY\"",
		"mtime": "2026-07-18T01:32:59.099Z",
		"size": 649,
		"path": "../public/assets/label-CGDYpC2o.js"
	},
	"/assets/index-TsA6EU6-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"799c9-4WmVbfGzFpQDGoDiJy2Xh507WD8\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 498121,
		"path": "../public/assets/index-TsA6EU6-.js"
	},
	"/assets/LibraryPage-BqU82Ieu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f89-ck69bAssE1myiKHgizR4pNDx7LA\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 3977,
		"path": "../public/assets/LibraryPage-BqU82Ieu.js"
	},
	"/assets/lock-CVN9MGWP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-05ZsCUe+pU0UugYp2QIEAxGcvA4\"",
		"mtime": "2026-07-18T01:32:59.099Z",
		"size": 196,
		"path": "../public/assets/lock-CVN9MGWP.js"
	},
	"/assets/MessagingPage-DMV3_XZp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b28-ftXxrQL+JRYCdVyW8Ebh7BUdTkE\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 2856,
		"path": "../public/assets/MessagingPage-DMV3_XZp.js"
	},
	"/assets/hero-team-D22dQlj7.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a654-NHsoR+FHinWQK9EWd1l0OooYKmg\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 108116,
		"path": "../public/assets/hero-team-D22dQlj7.jpg"
	},
	"/assets/MobileNavigation-Bs602jNO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3194-/ErjodMR7ZqVG0c++fq9uBWPN2E\"",
		"mtime": "2026-07-18T01:32:59.051Z",
		"size": 12692,
		"path": "../public/assets/MobileNavigation-Bs602jNO.js"
	},
	"/assets/plus-IfYW_8K7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-BYlnYIFI95PxLgjJ3YeBfIaeuOs\"",
		"mtime": "2026-07-18T01:32:59.133Z",
		"size": 143,
		"path": "../public/assets/plus-IfYW_8K7.js"
	},
	"/assets/onboarding-V2iZrzPd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3552-e4Z3vpB46Ewc0h0m8oyHRR/Cuso\"",
		"mtime": "2026-07-18T01:32:59.100Z",
		"size": 13650,
		"path": "../public/assets/onboarding-V2iZrzPd.js"
	},
	"/assets/progress-BGKJv0dR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"808-oKmpYzXHw2x5GXTwKXVQdAxQneA\"",
		"mtime": "2026-07-18T01:32:59.134Z",
		"size": 2056,
		"path": "../public/assets/progress-BGKJv0dR.js"
	},
	"/assets/react-Ca03aNmg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"209c-USFuEbwY5iMmvZ/V4vj+KOHLghg\"",
		"mtime": "2026-07-18T01:32:59.134Z",
		"size": 8348,
		"path": "../public/assets/react-Ca03aNmg.js"
	},
	"/assets/product-dashboard-Cfx7CP-b.jpg": {
		"type": "image/jpeg",
		"etag": "\"12097-Wj68+1LhhfnxMqk3Ode2C8Z4+xk\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 73879,
		"path": "../public/assets/product-dashboard-Cfx7CP-b.jpg"
	},
	"/assets/react-dom-BRSbvI1o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcf-K6mUMjuTToL18GgLxDc7h9zRDT4\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 3535,
		"path": "../public/assets/react-dom-BRSbvI1o.js"
	},
	"/assets/refresh-cw-DEQykIWC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ab-c08paZpG1NATe/grrFUUlmhesSE\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 427,
		"path": "../public/assets/refresh-cw-DEQykIWC.js"
	},
	"/assets/routes-2clBCOPG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b737-G3Zv1aT5LXeuZ8j3sYp8FOj3u/A\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 46903,
		"path": "../public/assets/routes-2clBCOPG.js"
	},
	"/assets/search-DcBXG7aT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-qrBBU+7H2zMQQIAsEet8XyyDKxM\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 164,
		"path": "../public/assets/search-DcBXG7aT.js"
	},
	"/assets/send-LIyW7_6K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118-g0nMnwwLb3G43/EnDyMOGVwkfws\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 280,
		"path": "../public/assets/send-LIyW7_6K.js"
	},
	"/assets/select-BiFppIs4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"575e-OJp5uocv0R8InDZIzC6deUMj2JE\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 22366,
		"path": "../public/assets/select-BiFppIs4.js"
	},
	"/assets/settings-DR6CrkWH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dd-A222MqDSqB4Qa7OQvzA4k6vO+t0\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 477,
		"path": "../public/assets/settings-DR6CrkWH.js"
	},
	"/assets/shield-check-C3YMjrjd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-/Mv24QxNkG2sLdlSQKjrZ9oO7uY\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 310,
		"path": "../public/assets/shield-check-C3YMjrjd.js"
	},
	"/assets/slider-jn6vUfFK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"258a-1OEPXQE/WwqekQyQRTCW/H/D9IM\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 9610,
		"path": "../public/assets/slider-jn6vUfFK.js"
	},
	"/assets/sparkles-BJbRzRcb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-mFvBVbEVeD0g6Wzh98dfp6SJXFA\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 484,
		"path": "../public/assets/sparkles-BJbRzRcb.js"
	},
	"/assets/sun-8Q9dUbKE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37b-S0tgTShEB29Ey0+66KxrCAJfNek\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 891,
		"path": "../public/assets/sun-8Q9dUbKE.js"
	},
	"/assets/superadmin-B-DarnsD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a46-KQwXSf22fkBZWmNPe7Rm6atdGBA\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 10822,
		"path": "../public/assets/superadmin-B-DarnsD.js"
	},
	"/assets/story-woman-B5NsApse.jpg": {
		"type": "image/jpeg",
		"etag": "\"1125f-KCb9QBGy/eZgGmb4AoXMG2sEGAc\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 70239,
		"path": "../public/assets/story-woman-B5NsApse.jpg"
	},
	"/assets/styles-Bg3PiDha.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1dd84-DL5eingx32nNCdwI2LdZtQzkYtg\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 122244,
		"path": "../public/assets/styles-Bg3PiDha.css"
	},
	"/assets/superadmin.billing-KOEGPpck.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"45cb-Qm/bIT69bZQd7ko3NJomWRgOUWA\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 17867,
		"path": "../public/assets/superadmin.billing-KOEGPpck.js"
	},
	"/assets/superadmin.index-BWVUV0Op.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37a7-Q7OHRGt85B4pa5lDP/QtDQfoCRQ\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 14247,
		"path": "../public/assets/superadmin.index-BWVUV0Op.js"
	},
	"/assets/superadmin.plans-CEw7ppjw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f8e-xdVJ3Wqx3U3AlJY2XiJd7UNuwMU\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 8078,
		"path": "../public/assets/superadmin.plans-CEw7ppjw.js"
	},
	"/assets/switch-DnyToQXb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4b-O+PCG6ehZYOTjN4hQ5ctIx0477M\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 3915,
		"path": "../public/assets/switch-DnyToQXb.js"
	},
	"/assets/table-CesTWpiA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"684-3SSD3x6Lo2mWiacO8fMM2V+Sye4\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 1668,
		"path": "../public/assets/table-CesTWpiA.js"
	},
	"/assets/tabs-DRbbe6vp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d81-RBFS5dNpe/oG+QqNklQgrdC3Fko\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 3457,
		"path": "../public/assets/tabs-DRbbe6vp.js"
	},
	"/assets/textarea-CTlwMkBA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f-taso36PLJzaixv8Hji7WBuV2+8E\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 543,
		"path": "../public/assets/textarea-CTlwMkBA.js"
	},
	"/assets/useAuth-BgaA8hs0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b14-1TgkpiHuMN7TYYNsyzjcfn2DPpA\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 2836,
		"path": "../public/assets/useAuth-BgaA8hs0.js"
	},
	"/assets/triangle-alert-DAMlZAdo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-7xm0eFP3TMcOVh+GvpPhv6tTmPw\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 377,
		"path": "../public/assets/triangle-alert-DAMlZAdo.js"
	},
	"/assets/useI18n-CCaFtbex.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5551-D7KhwBBYw00x+PmE2S+zzDy3OyI\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 21841,
		"path": "../public/assets/useI18n-CCaFtbex.js"
	},
	"/assets/user-cog-CKP7HKtj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27b-tKZzmogORQE/ugm6nTSAib74jmM\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 635,
		"path": "../public/assets/user-cog-CKP7HKtj.js"
	},
	"/assets/wellwork-logo-mark-Bo16x6Vw.png": {
		"type": "image/png",
		"etag": "\"109fa-2tIKU95P3kH2uz5CRQ23D+I9YO0\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 68090,
		"path": "../public/assets/wellwork-logo-mark-Bo16x6Vw.png"
	},
	"/assets/wellwork-wordmark-BznugxUj.png": {
		"type": "image/png",
		"etag": "\"fe63-1NIO4uV1uci2Zey7N0fXDbGvNRM\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 65123,
		"path": "../public/assets/wellwork-wordmark-BznugxUj.png"
	},
	"/assets/trash-2-7zOyLx4b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-uNQtyyHpacMq0ykxc9zUf7wa7/4\"",
		"mtime": "2026-07-18T01:32:59.135Z",
		"size": 318,
		"path": "../public/assets/trash-2-7zOyLx4b.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_7WB3A4 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_7WB3A4
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
