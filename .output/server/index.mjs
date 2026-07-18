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
	"/assets/activate-BKvIdTOl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d45-7ZxLIq31SYJipTtTGPC55832AaI\"",
		"mtime": "2026-07-18T03:06:56.447Z",
		"size": 3397,
		"path": "../public/assets/activate-BKvIdTOl.js"
	},
	"/assets/admin-DpIQnKqU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48d-/UuRS0vs6QFEUg3hKjQqMFl6pew\"",
		"mtime": "2026-07-18T03:06:56.447Z",
		"size": 1165,
		"path": "../public/assets/admin-DpIQnKqU.js"
	},
	"/assets/admin.actions-Bv3jXTIB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f05-oJ+1xDuyTJ2+PbIbok51NGMCyoc\"",
		"mtime": "2026-07-18T03:06:56.448Z",
		"size": 3845,
		"path": "../public/assets/admin.actions-Bv3jXTIB.js"
	},
	"/assets/admin.alerts-BJayjAck.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e49-Uzd/ZCE1EaZYL/PksqZ1ltS3cYk\"",
		"mtime": "2026-07-18T03:06:56.448Z",
		"size": 3657,
		"path": "../public/assets/admin.alerts-BJayjAck.js"
	},
	"/assets/admin.anonymous-C7EShZyF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19a4-8OjqqMvyTb0RPnit3Q10jS/vCok\"",
		"mtime": "2026-07-18T03:06:56.466Z",
		"size": 6564,
		"path": "../public/assets/admin.anonymous-C7EShZyF.js"
	},
	"/assets/admin.burnout-DXRSlXJa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"352d-btG6jCPbX5pqyMx7HTZdPwRD+Wo\"",
		"mtime": "2026-07-18T03:06:56.466Z",
		"size": 13613,
		"path": "../public/assets/admin.burnout-DXRSlXJa.js"
	},
	"/assets/admin.employees-CjApa0pc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc5-eDEjiyB8mhGWH/xuc30cPWxtBjc\"",
		"mtime": "2026-07-18T03:06:56.479Z",
		"size": 7109,
		"path": "../public/assets/admin.employees-CjApa0pc.js"
	},
	"/assets/admin.dashboard-uuSEhQ8p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11dbd-joL4+Z598aoaIaCChOOQh9uGzyE\"",
		"mtime": "2026-07-18T03:06:56.479Z",
		"size": 73149,
		"path": "../public/assets/admin.dashboard-uuSEhQ8p.js"
	},
	"/assets/admin.erp-DJv1VAPw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148e-y7L3irjgnobb/xyGGvojUaBOHfQ\"",
		"mtime": "2026-07-18T03:06:56.480Z",
		"size": 5262,
		"path": "../public/assets/admin.erp-DJv1VAPw.js"
	},
	"/assets/admin.events-ByA10jwf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c-Pxq+ex1LCMLoJJr+oXVurdkwZTU\"",
		"mtime": "2026-07-18T03:06:56.480Z",
		"size": 76,
		"path": "../public/assets/admin.events-ByA10jwf.js"
	},
	"/assets/admin.index-BWWfOOYN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d4-6aKji58WiMBHRYRcrfg8neUT7/k\"",
		"mtime": "2026-07-18T03:06:56.480Z",
		"size": 212,
		"path": "../public/assets/admin.index-BWWfOOYN.js"
	},
	"/assets/admin.messages-C-eeC2Yu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-Wku7nrRrUsmminkdYn4ZausueF4\"",
		"mtime": "2026-07-18T03:06:56.481Z",
		"size": 79,
		"path": "../public/assets/admin.messages-C-eeC2Yu.js"
	},
	"/assets/admin.settings-DFj5Vaea.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85e7-n4Fh9d2WkRgSE8ijtSNzPrbpQpo\"",
		"mtime": "2026-07-18T03:06:56.481Z",
		"size": 34279,
		"path": "../public/assets/admin.settings-DFj5Vaea.js"
	},
	"/assets/admin.library-b_fyU2ou.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-yD3ZsFpWf7EN0akslV9n31U8nJU\"",
		"mtime": "2026-07-18T03:06:56.481Z",
		"size": 77,
		"path": "../public/assets/admin.library-b_fyU2ou.js"
	},
	"/assets/admin.reports-vnSshAT0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1193-tbZtbyXLDRdYiSLuUayu7usIlfE\"",
		"mtime": "2026-07-18T03:06:56.481Z",
		"size": 4499,
		"path": "../public/assets/admin.reports-vnSshAT0.js"
	},
	"/assets/admin.surveys-CyvV-1qu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c30-p+WVqTROigTsNMSAJt5CzHgqfLU\"",
		"mtime": "2026-07-18T03:06:56.482Z",
		"size": 3120,
		"path": "../public/assets/admin.surveys-CyvV-1qu.js"
	},
	"/assets/admin.team-BW2hUQG1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f7-U+SPaoGYu30PFrBR1kl+BF5iZD4\"",
		"mtime": "2026-07-18T03:06:56.496Z",
		"size": 9463,
		"path": "../public/assets/admin.team-BW2hUQG1.js"
	},
	"/assets/anonymity-Bz--fVPw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b3-0NQfeXlejonJalBL28XXcqBWZL8\"",
		"mtime": "2026-07-18T03:06:56.496Z",
		"size": 1203,
		"path": "../public/assets/anonymity-Bz--fVPw.js"
	},
	"/assets/AnonymousBanner-Ck_9ET0t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20f3-wP71jfQEdpmDreNTAsuAdrMhocU\"",
		"mtime": "2026-07-18T03:06:56.413Z",
		"size": 8435,
		"path": "../public/assets/AnonymousBanner-Ck_9ET0t.js"
	},
	"/assets/algerie-poste-CYYv7qDA.png": {
		"type": "image/png",
		"etag": "\"2ef99-D+Y0eUl/XFLo6X7OcKkBHM9GW4w\"",
		"mtime": "2026-07-18T03:06:56.677Z",
		"size": 192409,
		"path": "../public/assets/algerie-poste-CYYv7qDA.png"
	},
	"/assets/AppShell-D4MjUYzG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3473-nCQygGYH0JSOfbByIbYDDZCT5u8\"",
		"mtime": "2026-07-18T03:06:56.430Z",
		"size": 13427,
		"path": "../public/assets/AppShell-D4MjUYzG.js"
	},
	"/assets/auth-0QDVz_eO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19bb-/pc29i8nUb3VZg8Zl81Ae9KCS6I\"",
		"mtime": "2026-07-18T03:06:56.497Z",
		"size": 6587,
		"path": "../public/assets/auth-0QDVz_eO.js"
	},
	"/assets/arrow-up-right-DpzC3__p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-aqD980q7rcX5FKBpjAAAfVQOk3A\"",
		"mtime": "2026-07-18T03:06:56.496Z",
		"size": 157,
		"path": "../public/assets/arrow-up-right-DpzC3__p.js"
	},
	"/assets/AreaChart-CgCa2kLD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b651-8CXvYRsVrgxKzsUa3G+mRH2vsnw\"",
		"mtime": "2026-07-18T03:06:56.431Z",
		"size": 374353,
		"path": "../public/assets/AreaChart-CgCa2kLD.js"
	},
	"/assets/auth.callback-BcS0vho4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"960-e+0YNGgnPPKI0TeRYZJlu3dayoM\"",
		"mtime": "2026-07-18T03:06:56.497Z",
		"size": 2400,
		"path": "../public/assets/auth.callback-BcS0vho4.js"
	},
	"/assets/badge-C4dSGxVr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31c-IYWt4G7K9HbetjkoDXDCw5K5u1w\"",
		"mtime": "2026-07-18T03:06:56.498Z",
		"size": 796,
		"path": "../public/assets/badge-C4dSGxVr.js"
	},
	"/assets/baridimob-CtydI89s.png": {
		"type": "image/png",
		"etag": "\"af0c-5p4u8XF4CXDX6h2uC1NU+DonEYY\"",
		"mtime": "2026-07-18T03:06:56.678Z",
		"size": 44812,
		"path": "../public/assets/baridimob-CtydI89s.png"
	},
	"/assets/billing-D_q62G0Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-CK5sj1lEj4/NhC+BJJ2/uWA5FOg\"",
		"mtime": "2026-07-18T03:06:56.498Z",
		"size": 200,
		"path": "../public/assets/billing-D_q62G0Y.js"
	},
	"/assets/building-2-B-4khl6P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-1OpNnN+jKey7G9x2O8VnpCcjov4\"",
		"mtime": "2026-07-18T03:06:56.498Z",
		"size": 373,
		"path": "../public/assets/building-2-B-4khl6P.js"
	},
	"/assets/button-D_h1E0Ub.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f7f-1mtDey3GW9lS2l3Pfuz4QkPJznk\"",
		"mtime": "2026-07-18T03:06:56.524Z",
		"size": 32639,
		"path": "../public/assets/button-D_h1E0Ub.js"
	},
	"/assets/check-Cg4A6mVq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"72-snQf4adNID1SY5fXpcfBcjx8syY\"",
		"mtime": "2026-07-18T03:06:56.526Z",
		"size": 114,
		"path": "../public/assets/check-Cg4A6mVq.js"
	},
	"/assets/calendar-days-BAaWzf2k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-RCzsDPg16Ojg3rVG15/4pf4REtY\"",
		"mtime": "2026-07-18T03:06:56.525Z",
		"size": 484,
		"path": "../public/assets/calendar-days-BAaWzf2k.js"
	},
	"/assets/card-0GbvPCKT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41f-1DKAkghvW/AhdTDd8n22OO1Uy+I\"",
		"mtime": "2026-07-18T03:06:56.526Z",
		"size": 1055,
		"path": "../public/assets/card-0GbvPCKT.js"
	},
	"/assets/checkbox-DKDFEWs5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe5-11bS/8BFBcQ0G0CyuU0YjuTjBBA\"",
		"mtime": "2026-07-18T03:06:56.527Z",
		"size": 4069,
		"path": "../public/assets/checkbox-DKDFEWs5.js"
	},
	"/assets/chevron-down-JG68WOvF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-nsThMbYu9OvY7IgLHIZIqqD5+tU\"",
		"mtime": "2026-07-18T03:06:56.527Z",
		"size": 118,
		"path": "../public/assets/chevron-down-JG68WOvF.js"
	},
	"/assets/checkout-BvasgCJq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f4e-lEejNns5n5hpI+lUexolYll9B+s\"",
		"mtime": "2026-07-18T03:06:56.527Z",
		"size": 20302,
		"path": "../public/assets/checkout-BvasgCJq.js"
	},
	"/assets/circle-alert-BXKOhw_Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-n4vHQ1/FBUvB6Hf5u+A3NO/tP2E\"",
		"mtime": "2026-07-18T03:06:56.528Z",
		"size": 240,
		"path": "../public/assets/circle-alert-BXKOhw_Z.js"
	},
	"/assets/circle-check-tmvf4M41.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-uzZs6GfsqemsLu/Jea26MzCR1f0\"",
		"mtime": "2026-07-18T03:06:56.528Z",
		"size": 168,
		"path": "../public/assets/circle-check-tmvf4M41.js"
	},
	"/assets/circle-x-BBIJHN4n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-Z/nTmHVD25uh1bhcipU9FiuHTyE\"",
		"mtime": "2026-07-18T03:06:56.528Z",
		"size": 197,
		"path": "../public/assets/circle-x-BBIJHN4n.js"
	},
	"/assets/clock-cL6hdXHJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-6XKv3aTi7svCXMb7YfD29Tw5Shc\"",
		"mtime": "2026-07-18T03:06:56.550Z",
		"size": 159,
		"path": "../public/assets/clock-cL6hdXHJ.js"
	},
	"/assets/client-CtRRebDM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32354-mYpnbT5USMybJNbICzPpwi7+Tf0\"",
		"mtime": "2026-07-18T03:06:56.543Z",
		"size": 205652,
		"path": "../public/assets/client-CtRRebDM.js"
	},
	"/assets/Combination-M7_R_nL0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5267-ZmUz7KO83FlKrfY14u22fR4UYdg\"",
		"mtime": "2026-07-18T03:06:56.445Z",
		"size": 21095,
		"path": "../public/assets/Combination-M7_R_nL0.js"
	},
	"/assets/createServerFn-C_KpEz5S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1123-N5ZCpOIGDfLYkGSUM6K/I/2iq14\"",
		"mtime": "2026-07-18T03:06:56.623Z",
		"size": 4387,
		"path": "../public/assets/createServerFn-C_KpEz5S.js"
	},
	"/assets/copy-CTstNNaw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-iLhP7OQWb4l66y6B5jiMcd+EMbo\"",
		"mtime": "2026-07-18T03:06:56.550Z",
		"size": 226,
		"path": "../public/assets/copy-CTstNNaw.js"
	},
	"/assets/credit-card-CndUKd3B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-7iGvU0FXJrfDGaUc7WfreXxL554\"",
		"mtime": "2026-07-18T03:06:56.623Z",
		"size": 197,
		"path": "../public/assets/credit-card-CndUKd3B.js"
	},
	"/assets/database-CwHlaViv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-LXV9EGcRH6zy4yE9/pLRD2Qyv4E\"",
		"mtime": "2026-07-18T03:06:56.623Z",
		"size": 233,
		"path": "../public/assets/database-CwHlaViv.js"
	},
	"/assets/dialog-njFfpwok.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184a-o+InQVPznCNuoZxBQBcguYCVvjw\"",
		"mtime": "2026-07-18T03:06:56.624Z",
		"size": 6218,
		"path": "../public/assets/dialog-njFfpwok.js"
	},
	"/assets/dist-BfnKMUgh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"272-Bd1Cfv8OTI1HODj9RFNTzozEEIA\"",
		"mtime": "2026-07-18T03:06:56.625Z",
		"size": 626,
		"path": "../public/assets/dist-BfnKMUgh.js"
	},
	"/assets/dist-C2J943E6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44-OS6su+NFCKVeCGRYewHX2hCT1qA\"",
		"mtime": "2026-07-18T03:06:56.625Z",
		"size": 68,
		"path": "../public/assets/dist-C2J943E6.js"
	},
	"/assets/dist-C9Sm5wnZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"223-RmnJbvJZ2CNIC0GNljAo4cXDpfk\"",
		"mtime": "2026-07-18T03:06:56.656Z",
		"size": 547,
		"path": "../public/assets/dist-C9Sm5wnZ.js"
	},
	"/assets/dist-CbBK0gLs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1305-JxVMoDJb6MA1yNB54dWKGstrujc\"",
		"mtime": "2026-07-18T03:06:56.659Z",
		"size": 4869,
		"path": "../public/assets/dist-CbBK0gLs.js"
	},
	"/assets/dist-CEh50d6X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-hPI/incivhUN9MuJZAAvGG7HzYQ\"",
		"mtime": "2026-07-18T03:06:56.656Z",
		"size": 246,
		"path": "../public/assets/dist-CEh50d6X.js"
	},
	"/assets/dist-DV0jE0HF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13aa-kCCCTz5+n/vVJ7n4wfAgmlPQ+Xo\"",
		"mtime": "2026-07-18T03:06:56.659Z",
		"size": 5034,
		"path": "../public/assets/dist-DV0jE0HF.js"
	},
	"/assets/employee-BoWGJHBn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"331-f4ukog9N2b1PZGwBItVWnhj+fO0\"",
		"mtime": "2026-07-18T03:06:56.660Z",
		"size": 817,
		"path": "../public/assets/employee-BoWGJHBn.js"
	},
	"/assets/employee.events-ByA10jwf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c-Pxq+ex1LCMLoJJr+oXVurdkwZTU\"",
		"mtime": "2026-07-18T03:06:56.660Z",
		"size": 76,
		"path": "../public/assets/employee.events-ByA10jwf.js"
	},
	"/assets/dropdown-menu-nnCQGEKi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc7d-XndsFDyHHGz1WN5R5gHJVS/ZjxQ\"",
		"mtime": "2026-07-18T03:06:56.660Z",
		"size": 48253,
		"path": "../public/assets/dropdown-menu-nnCQGEKi.js"
	},
	"/assets/employee.feedback-irJkR2u6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf0-fFJzMIpAAr0vEsytcF+nGQr26aA\"",
		"mtime": "2026-07-18T03:06:56.661Z",
		"size": 11248,
		"path": "../public/assets/employee.feedback-irJkR2u6.js"
	},
	"/assets/employee.help-D7-ZRQ5m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2833-CFcorUv4CNEjSnDF4IadaP7iIIQ\"",
		"mtime": "2026-07-18T03:06:56.661Z",
		"size": 10291,
		"path": "../public/assets/employee.help-D7-ZRQ5m.js"
	},
	"/assets/employee.index-JUzTNgO9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2-vZMD75ihXVW2aN1MyfxZoWklzQE\"",
		"mtime": "2026-07-18T03:06:56.662Z",
		"size": 210,
		"path": "../public/assets/employee.index-JUzTNgO9.js"
	},
	"/assets/employee.home-DPxf2JDW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1294-WzGVbn7Q3CiJ45m1kFSy756QeGs\"",
		"mtime": "2026-07-18T03:06:56.661Z",
		"size": 4756,
		"path": "../public/assets/employee.home-DPxf2JDW.js"
	},
	"/assets/employee.library-b_fyU2ou.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-yD3ZsFpWf7EN0akslV9n31U8nJU\"",
		"mtime": "2026-07-18T03:06:56.662Z",
		"size": 77,
		"path": "../public/assets/employee.library-b_fyU2ou.js"
	},
	"/assets/employee.messages-C-eeC2Yu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-Wku7nrRrUsmminkdYn4ZausueF4\"",
		"mtime": "2026-07-18T03:06:56.663Z",
		"size": 79,
		"path": "../public/assets/employee.messages-C-eeC2Yu.js"
	},
	"/assets/employee.surveys-DHSsN0wD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b1e-LKzPHCNArAl3OUIhlptnqv4+1r0\"",
		"mtime": "2026-07-18T03:06:56.663Z",
		"size": 19230,
		"path": "../public/assets/employee.surveys-DHSsN0wD.js"
	},
	"/assets/external-link-Dljof09u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-DoUvZ0PUHtGOma0kOiAM08e3OeI\"",
		"mtime": "2026-07-18T03:06:56.663Z",
		"size": 241,
		"path": "../public/assets/external-link-Dljof09u.js"
	},
	"/assets/EventsPage-_hRu0Gqn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3c-IXj+WU7dY8wGIhyTDPc+gevfbo0\"",
		"mtime": "2026-07-18T03:06:56.446Z",
		"size": 3388,
		"path": "../public/assets/EventsPage-_hRu0Gqn.js"
	},
	"/assets/globe-CydhzfyO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-oJhOiCKwiCxJZjUBx0bwe1N7u/s\"",
		"mtime": "2026-07-18T03:06:56.664Z",
		"size": 232,
		"path": "../public/assets/globe-CydhzfyO.js"
	},
	"/assets/hero-team-D22dQlj7.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a654-NHsoR+FHinWQK9EWd1l0OooYKmg\"",
		"mtime": "2026-07-18T03:06:56.678Z",
		"size": 108116,
		"path": "../public/assets/hero-team-D22dQlj7.jpg"
	},
	"/assets/input-B9ppqgRe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"817a-A0X+afN9irFO4aC36GKCxQ5Twnk\"",
		"mtime": "2026-07-18T03:06:56.664Z",
		"size": 33146,
		"path": "../public/assets/input-B9ppqgRe.js"
	},
	"/assets/key-round-r7zA_-es.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"159-cnDRd2INu+H+ELliWbIckon/3bI\"",
		"mtime": "2026-07-18T03:06:56.664Z",
		"size": 345,
		"path": "../public/assets/key-round-r7zA_-es.js"
	},
	"/assets/index-Ckiev4mi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"799d9-si+bK3Eq4cQZs9e/yPeukB+view\"",
		"mtime": "2026-07-18T03:06:56.404Z",
		"size": 498137,
		"path": "../public/assets/index-Ckiev4mi.js"
	},
	"/assets/label-CGDYpC2o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-RX9yLjcznPDSiSiQ4cc3bC/RqZY\"",
		"mtime": "2026-07-18T03:06:56.665Z",
		"size": 649,
		"path": "../public/assets/label-CGDYpC2o.js"
	},
	"/assets/LibraryPage-BQaXInVR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f89-/q2vSIQ4cc2a7GJ9wNb9sl2bSCQ\"",
		"mtime": "2026-07-18T03:06:56.446Z",
		"size": 3977,
		"path": "../public/assets/LibraryPage-BQaXInVR.js"
	},
	"/assets/lock-CVN9MGWP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-05ZsCUe+pU0UugYp2QIEAxGcvA4\"",
		"mtime": "2026-07-18T03:06:56.665Z",
		"size": 196,
		"path": "../public/assets/lock-CVN9MGWP.js"
	},
	"/assets/MessagingPage-EK29osDD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b28-unZEAxaX8u2IbfxmmzRS803Lu0w\"",
		"mtime": "2026-07-18T03:06:56.446Z",
		"size": 2856,
		"path": "../public/assets/MessagingPage-EK29osDD.js"
	},
	"/assets/MobileNavigation-DjfiSzpP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"318f-AX7/VVN+47T62pmZZmWAQWGf83c\"",
		"mtime": "2026-07-18T03:06:56.447Z",
		"size": 12687,
		"path": "../public/assets/MobileNavigation-DjfiSzpP.js"
	},
	"/assets/onboarding-sdephLjf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3552-wJmOJJUWaabrhj9DxlTkeOyFDvs\"",
		"mtime": "2026-07-18T03:06:56.665Z",
		"size": 13650,
		"path": "../public/assets/onboarding-sdephLjf.js"
	},
	"/assets/plus-IfYW_8K7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-BYlnYIFI95PxLgjJ3YeBfIaeuOs\"",
		"mtime": "2026-07-18T03:06:56.666Z",
		"size": 143,
		"path": "../public/assets/plus-IfYW_8K7.js"
	},
	"/assets/product-dashboard-Cfx7CP-b.jpg": {
		"type": "image/jpeg",
		"etag": "\"12097-Wj68+1LhhfnxMqk3Ode2C8Z4+xk\"",
		"mtime": "2026-07-18T03:06:56.678Z",
		"size": 73879,
		"path": "../public/assets/product-dashboard-Cfx7CP-b.jpg"
	},
	"/assets/progress-BGKJv0dR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"808-oKmpYzXHw2x5GXTwKXVQdAxQneA\"",
		"mtime": "2026-07-18T03:06:56.666Z",
		"size": 2056,
		"path": "../public/assets/progress-BGKJv0dR.js"
	},
	"/assets/react-Ca03aNmg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"209c-USFuEbwY5iMmvZ/V4vj+KOHLghg\"",
		"mtime": "2026-07-18T03:06:56.666Z",
		"size": 8348,
		"path": "../public/assets/react-Ca03aNmg.js"
	},
	"/assets/react-dom-BRSbvI1o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcf-K6mUMjuTToL18GgLxDc7h9zRDT4\"",
		"mtime": "2026-07-18T03:06:56.667Z",
		"size": 3535,
		"path": "../public/assets/react-dom-BRSbvI1o.js"
	},
	"/assets/refresh-cw-DEQykIWC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ab-c08paZpG1NATe/grrFUUlmhesSE\"",
		"mtime": "2026-07-18T03:06:56.667Z",
		"size": 427,
		"path": "../public/assets/refresh-cw-DEQykIWC.js"
	},
	"/assets/routes-D7MsI5_I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b89a-VQ/WTf6kHILcQ03/UdMnzadNJxM\"",
		"mtime": "2026-07-18T03:06:56.668Z",
		"size": 47258,
		"path": "../public/assets/routes-D7MsI5_I.js"
	},
	"/assets/search-DcBXG7aT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-qrBBU+7H2zMQQIAsEet8XyyDKxM\"",
		"mtime": "2026-07-18T03:06:56.668Z",
		"size": 164,
		"path": "../public/assets/search-DcBXG7aT.js"
	},
	"/assets/select-BiFppIs4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"575e-OJp5uocv0R8InDZIzC6deUMj2JE\"",
		"mtime": "2026-07-18T03:06:56.669Z",
		"size": 22366,
		"path": "../public/assets/select-BiFppIs4.js"
	},
	"/assets/send-LIyW7_6K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118-g0nMnwwLb3G43/EnDyMOGVwkfws\"",
		"mtime": "2026-07-18T03:06:56.669Z",
		"size": 280,
		"path": "../public/assets/send-LIyW7_6K.js"
	},
	"/assets/settings-DR6CrkWH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dd-A222MqDSqB4Qa7OQvzA4k6vO+t0\"",
		"mtime": "2026-07-18T03:06:56.669Z",
		"size": 477,
		"path": "../public/assets/settings-DR6CrkWH.js"
	},
	"/assets/shield-check-C3YMjrjd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-/Mv24QxNkG2sLdlSQKjrZ9oO7uY\"",
		"mtime": "2026-07-18T03:06:56.670Z",
		"size": 310,
		"path": "../public/assets/shield-check-C3YMjrjd.js"
	},
	"/assets/slider-jn6vUfFK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"258a-1OEPXQE/WwqekQyQRTCW/H/D9IM\"",
		"mtime": "2026-07-18T03:06:56.671Z",
		"size": 9610,
		"path": "../public/assets/slider-jn6vUfFK.js"
	},
	"/assets/sparkles-BJbRzRcb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-mFvBVbEVeD0g6Wzh98dfp6SJXFA\"",
		"mtime": "2026-07-18T03:06:56.671Z",
		"size": 484,
		"path": "../public/assets/sparkles-BJbRzRcb.js"
	},
	"/assets/story-woman-B5NsApse.jpg": {
		"type": "image/jpeg",
		"etag": "\"1125f-KCb9QBGy/eZgGmb4AoXMG2sEGAc\"",
		"mtime": "2026-07-18T03:06:56.679Z",
		"size": 70239,
		"path": "../public/assets/story-woman-B5NsApse.jpg"
	},
	"/assets/styles-B7fjEsQt.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1e126-5fBWhr65JHJxsn55iKPxqO6HxCI\"",
		"mtime": "2026-07-18T03:06:56.679Z",
		"size": 123174,
		"path": "../public/assets/styles-B7fjEsQt.css"
	},
	"/assets/sun-8Q9dUbKE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37b-S0tgTShEB29Ey0+66KxrCAJfNek\"",
		"mtime": "2026-07-18T03:06:56.671Z",
		"size": 891,
		"path": "../public/assets/sun-8Q9dUbKE.js"
	},
	"/assets/superadmin-B8LYtYXE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a46-hsOPa8AEd5pmYFEgCt5i/zNmBV4\"",
		"mtime": "2026-07-18T03:06:56.672Z",
		"size": 10822,
		"path": "../public/assets/superadmin-B8LYtYXE.js"
	},
	"/assets/superadmin.billing-C1YtZIi_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4555-AI8deyL2h0WdPZwCMHv5aSpbZZE\"",
		"mtime": "2026-07-18T03:06:56.672Z",
		"size": 17749,
		"path": "../public/assets/superadmin.billing-C1YtZIi_.js"
	},
	"/assets/superadmin.index-CcqZik_S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37a7-7tLcCL4gQfZAz7YYU+Z+Z1y/X44\"",
		"mtime": "2026-07-18T03:06:56.672Z",
		"size": 14247,
		"path": "../public/assets/superadmin.index-CcqZik_S.js"
	},
	"/assets/superadmin.plans-CNHHXSZ0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f8e-91HjrWnW2dfz92/85RQq6Kspx/Y\"",
		"mtime": "2026-07-18T03:06:56.673Z",
		"size": 8078,
		"path": "../public/assets/superadmin.plans-CNHHXSZ0.js"
	},
	"/assets/switch-DnyToQXb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4b-O+PCG6ehZYOTjN4hQ5ctIx0477M\"",
		"mtime": "2026-07-18T03:06:56.673Z",
		"size": 3915,
		"path": "../public/assets/switch-DnyToQXb.js"
	},
	"/assets/table-CesTWpiA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"684-3SSD3x6Lo2mWiacO8fMM2V+Sye4\"",
		"mtime": "2026-07-18T03:06:56.673Z",
		"size": 1668,
		"path": "../public/assets/table-CesTWpiA.js"
	},
	"/assets/tabs-DRbbe6vp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d81-RBFS5dNpe/oG+QqNklQgrdC3Fko\"",
		"mtime": "2026-07-18T03:06:56.674Z",
		"size": 3457,
		"path": "../public/assets/tabs-DRbbe6vp.js"
	},
	"/assets/textarea-CTlwMkBA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f-taso36PLJzaixv8Hji7WBuV2+8E\"",
		"mtime": "2026-07-18T03:06:56.675Z",
		"size": 543,
		"path": "../public/assets/textarea-CTlwMkBA.js"
	},
	"/assets/trash-2-7zOyLx4b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-uNQtyyHpacMq0ykxc9zUf7wa7/4\"",
		"mtime": "2026-07-18T03:06:56.675Z",
		"size": 318,
		"path": "../public/assets/trash-2-7zOyLx4b.js"
	},
	"/assets/triangle-alert-DmIJpFzn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f8-nuOO2+UAvcgoWZWiR1WdT3lcYxo\"",
		"mtime": "2026-07-18T03:06:56.676Z",
		"size": 504,
		"path": "../public/assets/triangle-alert-DmIJpFzn.js"
	},
	"/assets/useAuth-BgaA8hs0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b14-1TgkpiHuMN7TYYNsyzjcfn2DPpA\"",
		"mtime": "2026-07-18T03:06:56.676Z",
		"size": 2836,
		"path": "../public/assets/useAuth-BgaA8hs0.js"
	},
	"/assets/useI18n-BjJsnaZI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5551-yvztygI2chFAxk+p/oOuYr5oHIM\"",
		"mtime": "2026-07-18T03:06:56.676Z",
		"size": 21841,
		"path": "../public/assets/useI18n-BjJsnaZI.js"
	},
	"/assets/user-cog-CKP7HKtj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27b-tKZzmogORQE/ugm6nTSAib74jmM\"",
		"mtime": "2026-07-18T03:06:56.677Z",
		"size": 635,
		"path": "../public/assets/user-cog-CKP7HKtj.js"
	},
	"/assets/wellwork-logo-mark-Bo16x6Vw.png": {
		"type": "image/png",
		"etag": "\"109fa-2tIKU95P3kH2uz5CRQ23D+I9YO0\"",
		"mtime": "2026-07-18T03:06:56.680Z",
		"size": 68090,
		"path": "../public/assets/wellwork-logo-mark-Bo16x6Vw.png"
	},
	"/assets/wellwork-wordmark-BznugxUj.png": {
		"type": "image/png",
		"etag": "\"fe63-1NIO4uV1uci2Zey7N0fXDbGvNRM\"",
		"mtime": "2026-07-18T03:06:56.680Z",
		"size": 65123,
		"path": "../public/assets/wellwork-wordmark-BznugxUj.png"
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
