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
	"/assets/activate-tqcOVTcy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d45-pABcvRgDJOgRDVqduzD9rsgpcc4\"",
		"mtime": "2026-07-18T22:41:40.162Z",
		"size": 3397,
		"path": "../public/assets/activate-tqcOVTcy.js"
	},
	"/assets/admin-C5IOY4pO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48d-CMP+OBQdozsB9yInTCyOp+U8yyE\"",
		"mtime": "2026-07-18T22:41:40.162Z",
		"size": 1165,
		"path": "../public/assets/admin-C5IOY4pO.js"
	},
	"/assets/admin.actions-DCEj5HfA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f05-cQC4hNFs6R334hnwcdZKpRQDxjU\"",
		"mtime": "2026-07-18T22:41:40.163Z",
		"size": 3845,
		"path": "../public/assets/admin.actions-DCEj5HfA.js"
	},
	"/assets/admin.alerts-nSHSDySo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e49-ur3s01olRVkG/wU+eAWEWggMWp4\"",
		"mtime": "2026-07-18T22:41:40.163Z",
		"size": 3657,
		"path": "../public/assets/admin.alerts-nSHSDySo.js"
	},
	"/assets/admin.anonymous-CKGcBPQ0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19a4-lVpcEnOVhFuszlAXpgftoL07RMA\"",
		"mtime": "2026-07-18T22:41:40.163Z",
		"size": 6564,
		"path": "../public/assets/admin.anonymous-CKGcBPQ0.js"
	},
	"/assets/admin.burnout-CCGQ1ryH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"352d-9jHlBONhabuHja8A7A72+zt0uUM\"",
		"mtime": "2026-07-18T22:41:40.163Z",
		"size": 13613,
		"path": "../public/assets/admin.burnout-CCGQ1ryH.js"
	},
	"/assets/admin.dashboard-C3jKZ_aW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11dbd-pCdutFjQTtkZ1LTJogcgeI/UCfQ\"",
		"mtime": "2026-07-18T22:41:40.163Z",
		"size": 73149,
		"path": "../public/assets/admin.dashboard-C3jKZ_aW.js"
	},
	"/assets/admin.employees-C4xeqvN5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc5-eTysVEo6uzLAHX9Ilksk22T9fWE\"",
		"mtime": "2026-07-18T22:41:40.163Z",
		"size": 7109,
		"path": "../public/assets/admin.employees-C4xeqvN5.js"
	},
	"/assets/admin.erp-z1OLrTSR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148e-97LxlSmN2Urv6reBqSCDEWWkjx4\"",
		"mtime": "2026-07-18T22:41:40.163Z",
		"size": 5262,
		"path": "../public/assets/admin.erp-z1OLrTSR.js"
	},
	"/assets/admin.events-B3Hi_cVF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c-34zzYzBThE50XP/yAnpVdC9aLkE\"",
		"mtime": "2026-07-18T22:41:40.175Z",
		"size": 76,
		"path": "../public/assets/admin.events-B3Hi_cVF.js"
	},
	"/assets/admin.index-Kum0_AC1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d4-A+np1qfZyuP63tk8wF306wk6qxY\"",
		"mtime": "2026-07-18T22:41:40.175Z",
		"size": 212,
		"path": "../public/assets/admin.index-Kum0_AC1.js"
	},
	"/assets/admin.library-7lnK2JXN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-+UlmJrQpSc/kfFAkpXLnl5Uczak\"",
		"mtime": "2026-07-18T22:41:40.176Z",
		"size": 77,
		"path": "../public/assets/admin.library-7lnK2JXN.js"
	},
	"/assets/admin.messages-DQ_29uCk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-TY0EuS6nMdGrXaqUtLNkY9mw3Rg\"",
		"mtime": "2026-07-18T22:41:40.176Z",
		"size": 79,
		"path": "../public/assets/admin.messages-DQ_29uCk.js"
	},
	"/assets/admin.reports-C8OUE3Qw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1193-3+xaiz+eDKYdW0MFpHZ58PZPwYM\"",
		"mtime": "2026-07-18T22:41:40.176Z",
		"size": 4499,
		"path": "../public/assets/admin.reports-C8OUE3Qw.js"
	},
	"/assets/admin.settings-CCIJy3AA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85e7-PhOG3vjTp7yvhXE40WM4UqLnxSs\"",
		"mtime": "2026-07-18T22:41:40.176Z",
		"size": 34279,
		"path": "../public/assets/admin.settings-CCIJy3AA.js"
	},
	"/assets/admin.surveys-D9_nDZFf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c30-ZAds1jJj0dpaWOEP0RpcckQTXYM\"",
		"mtime": "2026-07-18T22:41:40.177Z",
		"size": 3120,
		"path": "../public/assets/admin.surveys-D9_nDZFf.js"
	},
	"/assets/admin.team-CcNkqWLn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f7-ZZbJbBpAuh0rljE/XSjjzVlzdc8\"",
		"mtime": "2026-07-18T22:41:40.178Z",
		"size": 9463,
		"path": "../public/assets/admin.team-CcNkqWLn.js"
	},
	"/assets/anonymity-Bz--fVPw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b3-0NQfeXlejonJalBL28XXcqBWZL8\"",
		"mtime": "2026-07-18T22:41:40.178Z",
		"size": 1203,
		"path": "../public/assets/anonymity-Bz--fVPw.js"
	},
	"/assets/algerie-poste-CYYv7qDA.png": {
		"type": "image/png",
		"etag": "\"2ef99-D+Y0eUl/XFLo6X7OcKkBHM9GW4w\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 192409,
		"path": "../public/assets/algerie-poste-CYYv7qDA.png"
	},
	"/assets/AnonymousBanner-MCE9IwPr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20f3-GRtQ0jgIizfJBSXC3d1uKSTa+6k\"",
		"mtime": "2026-07-18T22:41:40.159Z",
		"size": 8435,
		"path": "../public/assets/AnonymousBanner-MCE9IwPr.js"
	},
	"/assets/AppShell-CwuijylV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3473-4gpZWx7mlcQGTReAR1fMUSe4K8Q\"",
		"mtime": "2026-07-18T22:41:40.159Z",
		"size": 13427,
		"path": "../public/assets/AppShell-CwuijylV.js"
	},
	"/assets/arrow-up-right-DpzC3__p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-aqD980q7rcX5FKBpjAAAfVQOk3A\"",
		"mtime": "2026-07-18T22:41:40.194Z",
		"size": 157,
		"path": "../public/assets/arrow-up-right-DpzC3__p.js"
	},
	"/assets/auth-BGu5ZZCW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19bb-ddVCO+raaCU5RjqjTQW4kd6JUPc\"",
		"mtime": "2026-07-18T22:41:40.195Z",
		"size": 6587,
		"path": "../public/assets/auth-BGu5ZZCW.js"
	},
	"/assets/AreaChart-CgCa2kLD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b651-8CXvYRsVrgxKzsUa3G+mRH2vsnw\"",
		"mtime": "2026-07-18T22:41:40.159Z",
		"size": 374353,
		"path": "../public/assets/AreaChart-CgCa2kLD.js"
	},
	"/assets/auth.callback-CdRC0VxU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"960-6/bYiLmlrdTMETxECQf0rNNjsbM\"",
		"mtime": "2026-07-18T22:41:40.206Z",
		"size": 2400,
		"path": "../public/assets/auth.callback-CdRC0VxU.js"
	},
	"/assets/badge-C4dSGxVr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31c-IYWt4G7K9HbetjkoDXDCw5K5u1w\"",
		"mtime": "2026-07-18T22:41:40.206Z",
		"size": 796,
		"path": "../public/assets/badge-C4dSGxVr.js"
	},
	"/assets/baridimob-CtydI89s.png": {
		"type": "image/png",
		"etag": "\"af0c-5p4u8XF4CXDX6h2uC1NU+DonEYY\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 44812,
		"path": "../public/assets/baridimob-CtydI89s.png"
	},
	"/assets/billing-D_q62G0Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-CK5sj1lEj4/NhC+BJJ2/uWA5FOg\"",
		"mtime": "2026-07-18T22:41:40.208Z",
		"size": 200,
		"path": "../public/assets/billing-D_q62G0Y.js"
	},
	"/assets/building-2-B-4khl6P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-1OpNnN+jKey7G9x2O8VnpCcjov4\"",
		"mtime": "2026-07-18T22:41:40.208Z",
		"size": 373,
		"path": "../public/assets/building-2-B-4khl6P.js"
	},
	"/assets/button-D_h1E0Ub.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f7f-1mtDey3GW9lS2l3Pfuz4QkPJznk\"",
		"mtime": "2026-07-18T22:41:40.208Z",
		"size": 32639,
		"path": "../public/assets/button-D_h1E0Ub.js"
	},
	"/assets/calendar-days-BAaWzf2k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-RCzsDPg16Ojg3rVG15/4pf4REtY\"",
		"mtime": "2026-07-18T22:41:40.208Z",
		"size": 484,
		"path": "../public/assets/calendar-days-BAaWzf2k.js"
	},
	"/assets/check-Cg4A6mVq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"72-snQf4adNID1SY5fXpcfBcjx8syY\"",
		"mtime": "2026-07-18T22:41:40.209Z",
		"size": 114,
		"path": "../public/assets/check-Cg4A6mVq.js"
	},
	"/assets/card-0GbvPCKT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41f-1DKAkghvW/AhdTDd8n22OO1Uy+I\"",
		"mtime": "2026-07-18T22:41:40.209Z",
		"size": 1055,
		"path": "../public/assets/card-0GbvPCKT.js"
	},
	"/assets/checkbox-DKDFEWs5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe5-11bS/8BFBcQ0G0CyuU0YjuTjBBA\"",
		"mtime": "2026-07-18T22:41:40.209Z",
		"size": 4069,
		"path": "../public/assets/checkbox-DKDFEWs5.js"
	},
	"/assets/checkout-BPfR7Dd3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f4e-V9JO+N9J2a716cCD5pt5Xrajl54\"",
		"mtime": "2026-07-18T22:41:40.210Z",
		"size": 20302,
		"path": "../public/assets/checkout-BPfR7Dd3.js"
	},
	"/assets/chevron-down-JG68WOvF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-nsThMbYu9OvY7IgLHIZIqqD5+tU\"",
		"mtime": "2026-07-18T22:41:40.211Z",
		"size": 118,
		"path": "../public/assets/chevron-down-JG68WOvF.js"
	},
	"/assets/circle-alert-BXKOhw_Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-n4vHQ1/FBUvB6Hf5u+A3NO/tP2E\"",
		"mtime": "2026-07-18T22:41:40.211Z",
		"size": 240,
		"path": "../public/assets/circle-alert-BXKOhw_Z.js"
	},
	"/assets/circle-check-tmvf4M41.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-uzZs6GfsqemsLu/Jea26MzCR1f0\"",
		"mtime": "2026-07-18T22:41:40.212Z",
		"size": 168,
		"path": "../public/assets/circle-check-tmvf4M41.js"
	},
	"/assets/circle-x-BBIJHN4n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-Z/nTmHVD25uh1bhcipU9FiuHTyE\"",
		"mtime": "2026-07-18T22:41:40.223Z",
		"size": 197,
		"path": "../public/assets/circle-x-BBIJHN4n.js"
	},
	"/assets/client-CtRRebDM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32354-mYpnbT5USMybJNbICzPpwi7+Tf0\"",
		"mtime": "2026-07-18T22:41:40.223Z",
		"size": 205652,
		"path": "../public/assets/client-CtRRebDM.js"
	},
	"/assets/clock-cL6hdXHJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-6XKv3aTi7svCXMb7YfD29Tw5Shc\"",
		"mtime": "2026-07-18T22:41:40.224Z",
		"size": 159,
		"path": "../public/assets/clock-cL6hdXHJ.js"
	},
	"/assets/Combination-M7_R_nL0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5267-ZmUz7KO83FlKrfY14u22fR4UYdg\"",
		"mtime": "2026-07-18T22:41:40.159Z",
		"size": 21095,
		"path": "../public/assets/Combination-M7_R_nL0.js"
	},
	"/assets/copy-CTstNNaw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-iLhP7OQWb4l66y6B5jiMcd+EMbo\"",
		"mtime": "2026-07-18T22:41:40.224Z",
		"size": 226,
		"path": "../public/assets/copy-CTstNNaw.js"
	},
	"/assets/createServerFn-CJKvlgXu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1123-fsk5ARXhaA8xFL0C3nQ8wEnkv2w\"",
		"mtime": "2026-07-18T22:41:40.225Z",
		"size": 4387,
		"path": "../public/assets/createServerFn-CJKvlgXu.js"
	},
	"/assets/credit-card-CndUKd3B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-7iGvU0FXJrfDGaUc7WfreXxL554\"",
		"mtime": "2026-07-18T22:41:40.226Z",
		"size": 197,
		"path": "../public/assets/credit-card-CndUKd3B.js"
	},
	"/assets/database-CwHlaViv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-LXV9EGcRH6zy4yE9/pLRD2Qyv4E\"",
		"mtime": "2026-07-18T22:41:40.226Z",
		"size": 233,
		"path": "../public/assets/database-CwHlaViv.js"
	},
	"/assets/dialog-njFfpwok.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184a-o+InQVPznCNuoZxBQBcguYCVvjw\"",
		"mtime": "2026-07-18T22:41:40.227Z",
		"size": 6218,
		"path": "../public/assets/dialog-njFfpwok.js"
	},
	"/assets/dist-C2J943E6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44-OS6su+NFCKVeCGRYewHX2hCT1qA\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 68,
		"path": "../public/assets/dist-C2J943E6.js"
	},
	"/assets/dist-BfnKMUgh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"272-Bd1Cfv8OTI1HODj9RFNTzozEEIA\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 626,
		"path": "../public/assets/dist-BfnKMUgh.js"
	},
	"/assets/dist-C9Sm5wnZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"223-RmnJbvJZ2CNIC0GNljAo4cXDpfk\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 547,
		"path": "../public/assets/dist-C9Sm5wnZ.js"
	},
	"/assets/dist-CbBK0gLs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1305-JxVMoDJb6MA1yNB54dWKGstrujc\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 4869,
		"path": "../public/assets/dist-CbBK0gLs.js"
	},
	"/assets/dist-DV0jE0HF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13aa-kCCCTz5+n/vVJ7n4wfAgmlPQ+Xo\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 5034,
		"path": "../public/assets/dist-DV0jE0HF.js"
	},
	"/assets/dropdown-menu-nnCQGEKi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc7d-XndsFDyHHGz1WN5R5gHJVS/ZjxQ\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 48253,
		"path": "../public/assets/dropdown-menu-nnCQGEKi.js"
	},
	"/assets/employee.events-B3Hi_cVF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c-34zzYzBThE50XP/yAnpVdC9aLkE\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 76,
		"path": "../public/assets/employee.events-B3Hi_cVF.js"
	},
	"/assets/employee.help--4TXRx5M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2833-uedg49IZPtV2d5dyWcV9gq1y0l4\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 10291,
		"path": "../public/assets/employee.help--4TXRx5M.js"
	},
	"/assets/employee.feedback-BeNqZ2bC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf0-3eC0D4pEULRspTRGgs77vcTbck8\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 11248,
		"path": "../public/assets/employee.feedback-BeNqZ2bC.js"
	},
	"/assets/employee.home-BFlPnbaJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1294-RIaEvqfoaE/KphWLH1igI58AGVA\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 4756,
		"path": "../public/assets/employee.home-BFlPnbaJ.js"
	},
	"/assets/employee-C9m0wsTH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"331-eIYy0pe1qkZMNys0O/3kapldgdI\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 817,
		"path": "../public/assets/employee-C9m0wsTH.js"
	},
	"/assets/employee.index-CLBjGhtV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2-h1RFHv/JQ1mfWIdgzfYi1LnZE/c\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 210,
		"path": "../public/assets/employee.index-CLBjGhtV.js"
	},
	"/assets/employee.library-7lnK2JXN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-+UlmJrQpSc/kfFAkpXLnl5Uczak\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 77,
		"path": "../public/assets/employee.library-7lnK2JXN.js"
	},
	"/assets/employee.messages-DQ_29uCk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-TY0EuS6nMdGrXaqUtLNkY9mw3Rg\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 79,
		"path": "../public/assets/employee.messages-DQ_29uCk.js"
	},
	"/assets/employee.surveys-Ckwr0F_u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b1e-eTRdfhF+JOsdyUpmZcpslD1w1H0\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 19230,
		"path": "../public/assets/employee.surveys-Ckwr0F_u.js"
	},
	"/assets/EventsPage-DvEVoLGN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3c-NBsZVPQQqzulDB69SkO/zHDpiwU\"",
		"mtime": "2026-07-18T22:41:40.160Z",
		"size": 3388,
		"path": "../public/assets/EventsPage-DvEVoLGN.js"
	},
	"/assets/dist-CEh50d6X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-hPI/incivhUN9MuJZAAvGG7HzYQ\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 246,
		"path": "../public/assets/dist-CEh50d6X.js"
	},
	"/assets/external-link-Dljof09u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-DoUvZ0PUHtGOma0kOiAM08e3OeI\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 241,
		"path": "../public/assets/external-link-Dljof09u.js"
	},
	"/assets/globe-CydhzfyO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-oJhOiCKwiCxJZjUBx0bwe1N7u/s\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 232,
		"path": "../public/assets/globe-CydhzfyO.js"
	},
	"/assets/hero-team-D22dQlj7.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a654-NHsoR+FHinWQK9EWd1l0OooYKmg\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 108116,
		"path": "../public/assets/hero-team-D22dQlj7.jpg"
	},
	"/assets/input-B9ppqgRe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"817a-A0X+afN9irFO4aC36GKCxQ5Twnk\"",
		"mtime": "2026-07-18T22:41:40.228Z",
		"size": 33146,
		"path": "../public/assets/input-B9ppqgRe.js"
	},
	"/assets/key-round-r7zA_-es.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"159-cnDRd2INu+H+ELliWbIckon/3bI\"",
		"mtime": "2026-07-18T22:41:40.243Z",
		"size": 345,
		"path": "../public/assets/key-round-r7zA_-es.js"
	},
	"/assets/label-CGDYpC2o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-RX9yLjcznPDSiSiQ4cc3bC/RqZY\"",
		"mtime": "2026-07-18T22:41:40.244Z",
		"size": 649,
		"path": "../public/assets/label-CGDYpC2o.js"
	},
	"/assets/LibraryPage-DGsOJ8TA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f89-gK/6Ey833pdHc4dAvDGYWiaY04I\"",
		"mtime": "2026-07-18T22:41:40.161Z",
		"size": 3977,
		"path": "../public/assets/LibraryPage-DGsOJ8TA.js"
	},
	"/assets/lock-CVN9MGWP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-05ZsCUe+pU0UugYp2QIEAxGcvA4\"",
		"mtime": "2026-07-18T22:41:40.244Z",
		"size": 196,
		"path": "../public/assets/lock-CVN9MGWP.js"
	},
	"/assets/index-4x3y76IH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"799d9-IillB2G8i2euuAxyQ64jrXKOY9A\"",
		"mtime": "2026-07-18T22:41:40.158Z",
		"size": 498137,
		"path": "../public/assets/index-4x3y76IH.js"
	},
	"/assets/MessagingPage-xHp1G7qw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b28-HiA2sXL82CyuzGtRC6REoPxWooY\"",
		"mtime": "2026-07-18T22:41:40.161Z",
		"size": 2856,
		"path": "../public/assets/MessagingPage-xHp1G7qw.js"
	},
	"/assets/MobileNavigation-CntqcSw_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"318f-cEXb+UuhqVy7GtBYZYLnMxvupBc\"",
		"mtime": "2026-07-18T22:41:40.161Z",
		"size": 12687,
		"path": "../public/assets/MobileNavigation-CntqcSw_.js"
	},
	"/assets/onboarding-DYy5xKNX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3552-hcvaqKm0PIvLeHKOWSLOi11KDCY\"",
		"mtime": "2026-07-18T22:41:40.244Z",
		"size": 13650,
		"path": "../public/assets/onboarding-DYy5xKNX.js"
	},
	"/assets/plus-IfYW_8K7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-BYlnYIFI95PxLgjJ3YeBfIaeuOs\"",
		"mtime": "2026-07-18T22:41:40.245Z",
		"size": 143,
		"path": "../public/assets/plus-IfYW_8K7.js"
	},
	"/assets/product-dashboard-Cfx7CP-b.jpg": {
		"type": "image/jpeg",
		"etag": "\"12097-Wj68+1LhhfnxMqk3Ode2C8Z4+xk\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 73879,
		"path": "../public/assets/product-dashboard-Cfx7CP-b.jpg"
	},
	"/assets/progress-BGKJv0dR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"808-oKmpYzXHw2x5GXTwKXVQdAxQneA\"",
		"mtime": "2026-07-18T22:41:40.245Z",
		"size": 2056,
		"path": "../public/assets/progress-BGKJv0dR.js"
	},
	"/assets/react-Ca03aNmg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"209c-USFuEbwY5iMmvZ/V4vj+KOHLghg\"",
		"mtime": "2026-07-18T22:41:40.256Z",
		"size": 8348,
		"path": "../public/assets/react-Ca03aNmg.js"
	},
	"/assets/react-dom-BRSbvI1o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcf-K6mUMjuTToL18GgLxDc7h9zRDT4\"",
		"mtime": "2026-07-18T22:41:40.258Z",
		"size": 3535,
		"path": "../public/assets/react-dom-BRSbvI1o.js"
	},
	"/assets/refresh-cw-DEQykIWC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ab-c08paZpG1NATe/grrFUUlmhesSE\"",
		"mtime": "2026-07-18T22:41:40.259Z",
		"size": 427,
		"path": "../public/assets/refresh-cw-DEQykIWC.js"
	},
	"/assets/select-BiFppIs4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"575e-OJp5uocv0R8InDZIzC6deUMj2JE\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 22366,
		"path": "../public/assets/select-BiFppIs4.js"
	},
	"/assets/send-LIyW7_6K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118-g0nMnwwLb3G43/EnDyMOGVwkfws\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 280,
		"path": "../public/assets/send-LIyW7_6K.js"
	},
	"/assets/settings-DR6CrkWH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dd-A222MqDSqB4Qa7OQvzA4k6vO+t0\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 477,
		"path": "../public/assets/settings-DR6CrkWH.js"
	},
	"/assets/shield-check-C3YMjrjd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-/Mv24QxNkG2sLdlSQKjrZ9oO7uY\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 310,
		"path": "../public/assets/shield-check-C3YMjrjd.js"
	},
	"/assets/slider-jn6vUfFK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"258a-1OEPXQE/WwqekQyQRTCW/H/D9IM\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 9610,
		"path": "../public/assets/slider-jn6vUfFK.js"
	},
	"/assets/sparkles-BJbRzRcb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-mFvBVbEVeD0g6Wzh98dfp6SJXFA\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 484,
		"path": "../public/assets/sparkles-BJbRzRcb.js"
	},
	"/assets/story-woman-B5NsApse.jpg": {
		"type": "image/jpeg",
		"etag": "\"1125f-KCb9QBGy/eZgGmb4AoXMG2sEGAc\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 70239,
		"path": "../public/assets/story-woman-B5NsApse.jpg"
	},
	"/assets/sun-8Q9dUbKE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37b-S0tgTShEB29Ey0+66KxrCAJfNek\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 891,
		"path": "../public/assets/sun-8Q9dUbKE.js"
	},
	"/assets/styles-B7fjEsQt.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1e126-5fBWhr65JHJxsn55iKPxqO6HxCI\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 123174,
		"path": "../public/assets/styles-B7fjEsQt.css"
	},
	"/assets/superadmin-CDB_OP2w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a46-7HfOtLKiQwcKj0U8U+0l94xnmYk\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 10822,
		"path": "../public/assets/superadmin-CDB_OP2w.js"
	},
	"/assets/superadmin.billing-C1YtZIi_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4555-AI8deyL2h0WdPZwCMHv5aSpbZZE\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 17749,
		"path": "../public/assets/superadmin.billing-C1YtZIi_.js"
	},
	"/assets/superadmin.index-9e_yjeV1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37a7-IFn9oDfJEOX7S6ZP8O+h7mjTJNU\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 14247,
		"path": "../public/assets/superadmin.index-9e_yjeV1.js"
	},
	"/assets/superadmin.plans-CDnPULmS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f8e-MFzMUjCN9Z+V6Vcjvt3DD/Hw9Ng\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 8078,
		"path": "../public/assets/superadmin.plans-CDnPULmS.js"
	},
	"/assets/switch-DnyToQXb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4b-O+PCG6ehZYOTjN4hQ5ctIx0477M\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 3915,
		"path": "../public/assets/switch-DnyToQXb.js"
	},
	"/assets/table-CesTWpiA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"684-3SSD3x6Lo2mWiacO8fMM2V+Sye4\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 1668,
		"path": "../public/assets/table-CesTWpiA.js"
	},
	"/assets/tabs-DRbbe6vp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d81-RBFS5dNpe/oG+QqNklQgrdC3Fko\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 3457,
		"path": "../public/assets/tabs-DRbbe6vp.js"
	},
	"/assets/trash-2-7zOyLx4b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-uNQtyyHpacMq0ykxc9zUf7wa7/4\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 318,
		"path": "../public/assets/trash-2-7zOyLx4b.js"
	},
	"/assets/textarea-CTlwMkBA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f-taso36PLJzaixv8Hji7WBuV2+8E\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 543,
		"path": "../public/assets/textarea-CTlwMkBA.js"
	},
	"/assets/useAuth-BgaA8hs0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b14-1TgkpiHuMN7TYYNsyzjcfn2DPpA\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 2836,
		"path": "../public/assets/useAuth-BgaA8hs0.js"
	},
	"/assets/triangle-alert-DmIJpFzn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f8-nuOO2+UAvcgoWZWiR1WdT3lcYxo\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 504,
		"path": "../public/assets/triangle-alert-DmIJpFzn.js"
	},
	"/assets/useI18n-hDmfgCJo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5551-xQkwDl7c804pQKVcfjvH+pxyzcA\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 21841,
		"path": "../public/assets/useI18n-hDmfgCJo.js"
	},
	"/assets/user-cog-CKP7HKtj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27b-tKZzmogORQE/ugm6nTSAib74jmM\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 635,
		"path": "../public/assets/user-cog-CKP7HKtj.js"
	},
	"/assets/wellwork-logo-mark-Bo16x6Vw.png": {
		"type": "image/png",
		"etag": "\"109fa-2tIKU95P3kH2uz5CRQ23D+I9YO0\"",
		"mtime": "2026-07-18T22:41:40.273Z",
		"size": 68090,
		"path": "../public/assets/wellwork-logo-mark-Bo16x6Vw.png"
	},
	"/assets/wellwork-wordmark-BznugxUj.png": {
		"type": "image/png",
		"etag": "\"fe63-1NIO4uV1uci2Zey7N0fXDbGvNRM\"",
		"mtime": "2026-07-18T22:41:40.273Z",
		"size": 65123,
		"path": "../public/assets/wellwork-wordmark-BznugxUj.png"
	},
	"/assets/search-DcBXG7aT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-qrBBU+7H2zMQQIAsEet8XyyDKxM\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 164,
		"path": "../public/assets/search-DcBXG7aT.js"
	},
	"/assets/routes-C9UUOqkO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8ec-iFIYftnj8l2LwS05Z/0+4c/OkS4\"",
		"mtime": "2026-07-18T22:41:40.261Z",
		"size": 59628,
		"path": "../public/assets/routes-C9UUOqkO.js"
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
