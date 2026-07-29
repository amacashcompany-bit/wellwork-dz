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
	"/assets/admin.actions-DIIKIX7J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f05-tn52Q246y44FAJTV3YcUAVk/uMg\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 3845,
		"path": "../public/assets/admin.actions-DIIKIX7J.js"
	},
	"/assets/admin-BtKqzPyI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48d-t/rUxXuiVQpArvr687w9zF0YD6E\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 1165,
		"path": "../public/assets/admin-BtKqzPyI.js"
	},
	"/assets/activate-DIRm49oc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d45-diq5Gp2vRb8UHc5YfAhAFxETd64\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 3397,
		"path": "../public/assets/activate-DIRm49oc.js"
	},
	"/assets/admin.burnout-cz7Hby44.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"352d-cWV3fdwq/5+WiONVShFi5MV5sqw\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 13613,
		"path": "../public/assets/admin.burnout-cz7Hby44.js"
	},
	"/assets/admin.anonymous-B7yUoNFk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19a4-oxHUsiXgdxhGGEYCUlR11w8jVYw\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 6564,
		"path": "../public/assets/admin.anonymous-B7yUoNFk.js"
	},
	"/assets/admin.alerts-C17eSnd3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e49-Vw8bj7/AHAR8oKn8wam6Gqa8Lt8\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 3657,
		"path": "../public/assets/admin.alerts-C17eSnd3.js"
	},
	"/assets/admin.employees-cznagZjT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc5-fBY0HvEO3wzf460ndAqUUuUV7KA\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 7109,
		"path": "../public/assets/admin.employees-cznagZjT.js"
	},
	"/assets/admin.dashboard-xFjoTT6j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11dbd-oDuP6d11GsF5PWY5/EvqRIqv1hk\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 73149,
		"path": "../public/assets/admin.dashboard-xFjoTT6j.js"
	},
	"/assets/admin.index-Ch-ow1Rw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d4-zL+OzNHkBWJqS59Btk1j9mmwolI\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 212,
		"path": "../public/assets/admin.index-Ch-ow1Rw.js"
	},
	"/assets/admin.erp-B_LZGCBv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148e-A8IAAJKgbdvVmAXdvQtsz/Wn72I\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 5262,
		"path": "../public/assets/admin.erp-B_LZGCBv.js"
	},
	"/assets/admin.events-DsRmnbwQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c-mo9/LsVGfZQDl6sVK8fMZHvUOok\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 76,
		"path": "../public/assets/admin.events-DsRmnbwQ.js"
	},
	"/assets/admin.library-DEnN_8pP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-Ohq0KUb55VWPtMsqzxm6NMNXlrQ\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 77,
		"path": "../public/assets/admin.library-DEnN_8pP.js"
	},
	"/assets/admin.messages-BPk6Ojbi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-5l21kjsErv6SEMM0dwP1oGnsKdc\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 79,
		"path": "../public/assets/admin.messages-BPk6Ojbi.js"
	},
	"/assets/admin.reports-C8QGmSwg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1193-kx4Tqs+RM1n6eG94rYrK//9QCU8\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 4499,
		"path": "../public/assets/admin.reports-C8QGmSwg.js"
	},
	"/assets/admin.settings-BKAP5vk_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85e7-5b+tlNRr43eA1yz8nzyWugBPW18\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 34279,
		"path": "../public/assets/admin.settings-BKAP5vk_.js"
	},
	"/assets/admin.surveys-7fmnJQAj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c30-Z+7blRRHHR50rHa4mKGxok3Gmf8\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 3120,
		"path": "../public/assets/admin.surveys-7fmnJQAj.js"
	},
	"/assets/admin.team-h8aCgPEg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f7-TNjW6vYOydg/scwzlhAE/KPl9pU\"",
		"mtime": "2026-07-29T22:10:06.193Z",
		"size": 9463,
		"path": "../public/assets/admin.team-h8aCgPEg.js"
	},
	"/assets/anonymity-Bz--fVPw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b3-0NQfeXlejonJalBL28XXcqBWZL8\"",
		"mtime": "2026-07-29T22:10:06.193Z",
		"size": 1203,
		"path": "../public/assets/anonymity-Bz--fVPw.js"
	},
	"/assets/AnonymousBanner-By18d8sT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20f3-DXeQh6e5dTH/kjNgzL9NzXIs/2Y\"",
		"mtime": "2026-07-29T22:10:06.145Z",
		"size": 8435,
		"path": "../public/assets/AnonymousBanner-By18d8sT.js"
	},
	"/assets/algerie-poste-CYYv7qDA.png": {
		"type": "image/png",
		"etag": "\"2ef99-D+Y0eUl/XFLo6X7OcKkBHM9GW4w\"",
		"mtime": "2026-07-29T22:10:06.414Z",
		"size": 192409,
		"path": "../public/assets/algerie-poste-CYYv7qDA.png"
	},
	"/assets/AppShell-CSACOljn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"365b-sgzfpJLsxLbMVPxyKpOla1jPzXQ\"",
		"mtime": "2026-07-29T22:10:06.145Z",
		"size": 13915,
		"path": "../public/assets/AppShell-CSACOljn.js"
	},
	"/assets/arrow-up-right-DpzC3__p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-aqD980q7rcX5FKBpjAAAfVQOk3A\"",
		"mtime": "2026-07-29T22:10:06.194Z",
		"size": 157,
		"path": "../public/assets/arrow-up-right-DpzC3__p.js"
	},
	"/assets/AreaChart-CgCa2kLD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b651-8CXvYRsVrgxKzsUa3G+mRH2vsnw\"",
		"mtime": "2026-07-29T22:10:06.145Z",
		"size": 374353,
		"path": "../public/assets/AreaChart-CgCa2kLD.js"
	},
	"/assets/auth-DmVkCHGY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a29-1iaz/sVsaTb4gLnDbJIL1XTGoJ0\"",
		"mtime": "2026-07-29T22:10:06.194Z",
		"size": 6697,
		"path": "../public/assets/auth-DmVkCHGY.js"
	},
	"/assets/auth_.callback-CTJBnMEX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a56-llzGdKOkWXE0EpFJvQeoVyfFo68\"",
		"mtime": "2026-07-29T22:10:06.194Z",
		"size": 2646,
		"path": "../public/assets/auth_.callback-CTJBnMEX.js"
	},
	"/assets/badge-C4dSGxVr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31c-IYWt4G7K9HbetjkoDXDCw5K5u1w\"",
		"mtime": "2026-07-29T22:10:06.226Z",
		"size": 796,
		"path": "../public/assets/badge-C4dSGxVr.js"
	},
	"/assets/billing-D_q62G0Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-CK5sj1lEj4/NhC+BJJ2/uWA5FOg\"",
		"mtime": "2026-07-29T22:10:06.226Z",
		"size": 200,
		"path": "../public/assets/billing-D_q62G0Y.js"
	},
	"/assets/building-2-B-4khl6P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-1OpNnN+jKey7G9x2O8VnpCcjov4\"",
		"mtime": "2026-07-29T22:10:06.227Z",
		"size": 373,
		"path": "../public/assets/building-2-B-4khl6P.js"
	},
	"/assets/button-D_h1E0Ub.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f7f-1mtDey3GW9lS2l3Pfuz4QkPJznk\"",
		"mtime": "2026-07-29T22:10:06.227Z",
		"size": 32639,
		"path": "../public/assets/button-D_h1E0Ub.js"
	},
	"/assets/calendar-days-BAaWzf2k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-RCzsDPg16Ojg3rVG15/4pf4REtY\"",
		"mtime": "2026-07-29T22:10:06.228Z",
		"size": 484,
		"path": "../public/assets/calendar-days-BAaWzf2k.js"
	},
	"/assets/card-0GbvPCKT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41f-1DKAkghvW/AhdTDd8n22OO1Uy+I\"",
		"mtime": "2026-07-29T22:10:06.228Z",
		"size": 1055,
		"path": "../public/assets/card-0GbvPCKT.js"
	},
	"/assets/check-Cg4A6mVq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"72-snQf4adNID1SY5fXpcfBcjx8syY\"",
		"mtime": "2026-07-29T22:10:06.271Z",
		"size": 114,
		"path": "../public/assets/check-Cg4A6mVq.js"
	},
	"/assets/baridimob-CtydI89s.png": {
		"type": "image/png",
		"etag": "\"af0c-5p4u8XF4CXDX6h2uC1NU+DonEYY\"",
		"mtime": "2026-07-29T22:10:06.414Z",
		"size": 44812,
		"path": "../public/assets/baridimob-CtydI89s.png"
	},
	"/assets/checkbox-DKDFEWs5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe5-11bS/8BFBcQ0G0CyuU0YjuTjBBA\"",
		"mtime": "2026-07-29T22:10:06.271Z",
		"size": 4069,
		"path": "../public/assets/checkbox-DKDFEWs5.js"
	},
	"/assets/chevron-down-JG68WOvF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-nsThMbYu9OvY7IgLHIZIqqD5+tU\"",
		"mtime": "2026-07-29T22:10:06.272Z",
		"size": 118,
		"path": "../public/assets/chevron-down-JG68WOvF.js"
	},
	"/assets/checkout-VcmJiUW2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f4e-AVDVAXV5f1OEL4QkiO9KGkmTeQA\"",
		"mtime": "2026-07-29T22:10:06.272Z",
		"size": 20302,
		"path": "../public/assets/checkout-VcmJiUW2.js"
	},
	"/assets/circle-alert-BXKOhw_Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-n4vHQ1/FBUvB6Hf5u+A3NO/tP2E\"",
		"mtime": "2026-07-29T22:10:06.272Z",
		"size": 240,
		"path": "../public/assets/circle-alert-BXKOhw_Z.js"
	},
	"/assets/circle-x-BBIJHN4n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-Z/nTmHVD25uh1bhcipU9FiuHTyE\"",
		"mtime": "2026-07-29T22:10:06.273Z",
		"size": 197,
		"path": "../public/assets/circle-x-BBIJHN4n.js"
	},
	"/assets/circle-check-tmvf4M41.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-uzZs6GfsqemsLu/Jea26MzCR1f0\"",
		"mtime": "2026-07-29T22:10:06.272Z",
		"size": 168,
		"path": "../public/assets/circle-check-tmvf4M41.js"
	},
	"/assets/clock-cL6hdXHJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-6XKv3aTi7svCXMb7YfD29Tw5Shc\"",
		"mtime": "2026-07-29T22:10:06.274Z",
		"size": 159,
		"path": "../public/assets/clock-cL6hdXHJ.js"
	},
	"/assets/Combination-M7_R_nL0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5267-ZmUz7KO83FlKrfY14u22fR4UYdg\"",
		"mtime": "2026-07-29T22:10:06.145Z",
		"size": 21095,
		"path": "../public/assets/Combination-M7_R_nL0.js"
	},
	"/assets/copy-CTstNNaw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-iLhP7OQWb4l66y6B5jiMcd+EMbo\"",
		"mtime": "2026-07-29T22:10:06.274Z",
		"size": 226,
		"path": "../public/assets/copy-CTstNNaw.js"
	},
	"/assets/createServerFn-Bdw8jvIk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1123-Bz0/HRcUjoOYv6BlDix6j0g37zo\"",
		"mtime": "2026-07-29T22:10:06.310Z",
		"size": 4387,
		"path": "../public/assets/createServerFn-Bdw8jvIk.js"
	},
	"/assets/client-CtRRebDM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32354-mYpnbT5USMybJNbICzPpwi7+Tf0\"",
		"mtime": "2026-07-29T22:10:06.273Z",
		"size": 205652,
		"path": "../public/assets/client-CtRRebDM.js"
	},
	"/assets/credit-card-CndUKd3B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-7iGvU0FXJrfDGaUc7WfreXxL554\"",
		"mtime": "2026-07-29T22:10:06.311Z",
		"size": 197,
		"path": "../public/assets/credit-card-CndUKd3B.js"
	},
	"/assets/database-CwHlaViv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-LXV9EGcRH6zy4yE9/pLRD2Qyv4E\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 233,
		"path": "../public/assets/database-CwHlaViv.js"
	},
	"/assets/dialog-njFfpwok.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184a-o+InQVPznCNuoZxBQBcguYCVvjw\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 6218,
		"path": "../public/assets/dialog-njFfpwok.js"
	},
	"/assets/dist-BfnKMUgh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"272-Bd1Cfv8OTI1HODj9RFNTzozEEIA\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 626,
		"path": "../public/assets/dist-BfnKMUgh.js"
	},
	"/assets/dist-C2J943E6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44-OS6su+NFCKVeCGRYewHX2hCT1qA\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 68,
		"path": "../public/assets/dist-C2J943E6.js"
	},
	"/assets/dist-C9Sm5wnZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"223-RmnJbvJZ2CNIC0GNljAo4cXDpfk\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 547,
		"path": "../public/assets/dist-C9Sm5wnZ.js"
	},
	"/assets/dist-CbBK0gLs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1305-JxVMoDJb6MA1yNB54dWKGstrujc\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 4869,
		"path": "../public/assets/dist-CbBK0gLs.js"
	},
	"/assets/dist-CEh50d6X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-hPI/incivhUN9MuJZAAvGG7HzYQ\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 246,
		"path": "../public/assets/dist-CEh50d6X.js"
	},
	"/assets/dist-DV0jE0HF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13aa-kCCCTz5+n/vVJ7n4wfAgmlPQ+Xo\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 5034,
		"path": "../public/assets/dist-DV0jE0HF.js"
	},
	"/assets/dropdown-menu-nnCQGEKi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc7d-XndsFDyHHGz1WN5R5gHJVS/ZjxQ\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 48253,
		"path": "../public/assets/dropdown-menu-nnCQGEKi.js"
	},
	"/assets/employee.events-DsRmnbwQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c-mo9/LsVGfZQDl6sVK8fMZHvUOok\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 76,
		"path": "../public/assets/employee.events-DsRmnbwQ.js"
	},
	"/assets/employee-BL45uY9r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"331-Td0w1Se2wXhqvY/ECTt0gnFk7Do\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 817,
		"path": "../public/assets/employee-BL45uY9r.js"
	},
	"/assets/employee.feedback-Dckykzjl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf0-r7KqhBAQ86E9/VTaw/9G8jmWbFA\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 11248,
		"path": "../public/assets/employee.feedback-Dckykzjl.js"
	},
	"/assets/employee.help-57zYsGnw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2833-bLboi98YS9KEYlGAL52d49ST4p0\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 10291,
		"path": "../public/assets/employee.help-57zYsGnw.js"
	},
	"/assets/employee.home-DiKfwySk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1294-rGiwLeYztg3299v34Z+P/dTC7+c\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 4756,
		"path": "../public/assets/employee.home-DiKfwySk.js"
	},
	"/assets/employee.index-WR9Xwc37.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2-N6gK6GT7ml40FZzfchCdC+z7n0I\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 210,
		"path": "../public/assets/employee.index-WR9Xwc37.js"
	},
	"/assets/employee.library-DEnN_8pP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-Ohq0KUb55VWPtMsqzxm6NMNXlrQ\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 77,
		"path": "../public/assets/employee.library-DEnN_8pP.js"
	},
	"/assets/employee.messages-BPk6Ojbi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-5l21kjsErv6SEMM0dwP1oGnsKdc\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 79,
		"path": "../public/assets/employee.messages-BPk6Ojbi.js"
	},
	"/assets/employee.surveys-BObDKwNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b1e-2xM/kocs3wcaWibXWKIT52kGpi4\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 19230,
		"path": "../public/assets/employee.surveys-BObDKwNW.js"
	},
	"/assets/EventsPage-C_xmMK-R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3c-nzRySa0tPtM3Va9ntXPwrIIlsdw\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 3388,
		"path": "../public/assets/EventsPage-C_xmMK-R.js"
	},
	"/assets/external-link-Dljof09u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-DoUvZ0PUHtGOma0kOiAM08e3OeI\"",
		"mtime": "2026-07-29T22:10:06.312Z",
		"size": 241,
		"path": "../public/assets/external-link-Dljof09u.js"
	},
	"/assets/globe-CydhzfyO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-oJhOiCKwiCxJZjUBx0bwe1N7u/s\"",
		"mtime": "2026-07-29T22:10:06.326Z",
		"size": 232,
		"path": "../public/assets/globe-CydhzfyO.js"
	},
	"/assets/hero-team-D22dQlj7.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a654-NHsoR+FHinWQK9EWd1l0OooYKmg\"",
		"mtime": "2026-07-29T22:10:06.414Z",
		"size": 108116,
		"path": "../public/assets/hero-team-D22dQlj7.jpg"
	},
	"/assets/input-B9ppqgRe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"817a-A0X+afN9irFO4aC36GKCxQ5Twnk\"",
		"mtime": "2026-07-29T22:10:06.326Z",
		"size": 33146,
		"path": "../public/assets/input-B9ppqgRe.js"
	},
	"/assets/key-round-r7zA_-es.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"159-cnDRd2INu+H+ELliWbIckon/3bI\"",
		"mtime": "2026-07-29T22:10:06.327Z",
		"size": 345,
		"path": "../public/assets/key-round-r7zA_-es.js"
	},
	"/assets/index-C_9ncvHb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"799c7-P1vkzG9W3vdAxduGP3gNovj5Ngs\"",
		"mtime": "2026-07-29T22:10:06.145Z",
		"size": 498119,
		"path": "../public/assets/index-C_9ncvHb.js"
	},
	"/assets/label-CGDYpC2o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-RX9yLjcznPDSiSiQ4cc3bC/RqZY\"",
		"mtime": "2026-07-29T22:10:06.328Z",
		"size": 649,
		"path": "../public/assets/label-CGDYpC2o.js"
	},
	"/assets/LibraryPage-B4EbmcCO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f89-7Swc5ZbBwHyUUsjfzdQVMHGcRHw\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 3977,
		"path": "../public/assets/LibraryPage-B4EbmcCO.js"
	},
	"/assets/lock-CVN9MGWP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-05ZsCUe+pU0UugYp2QIEAxGcvA4\"",
		"mtime": "2026-07-29T22:10:06.329Z",
		"size": 196,
		"path": "../public/assets/lock-CVN9MGWP.js"
	},
	"/assets/MessagingPage-BYfC6wj1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b28-7c5zNRehn46sn1wMMTzK1CJa6iU\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 2856,
		"path": "../public/assets/MessagingPage-BYfC6wj1.js"
	},
	"/assets/MobileNavigation-8iP2gCZz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"318f-nwYENwDTS8TaQQph94w/b8I6fpA\"",
		"mtime": "2026-07-29T22:10:06.179Z",
		"size": 12687,
		"path": "../public/assets/MobileNavigation-8iP2gCZz.js"
	},
	"/assets/onboarding-CIQwPosu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3552-DEtIHyxYE17usFy26WK543sGL8A\"",
		"mtime": "2026-07-29T22:10:06.329Z",
		"size": 13650,
		"path": "../public/assets/onboarding-CIQwPosu.js"
	},
	"/assets/plus-IfYW_8K7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-BYlnYIFI95PxLgjJ3YeBfIaeuOs\"",
		"mtime": "2026-07-29T22:10:06.329Z",
		"size": 143,
		"path": "../public/assets/plus-IfYW_8K7.js"
	},
	"/assets/product-dashboard-Cfx7CP-b.jpg": {
		"type": "image/jpeg",
		"etag": "\"12097-Wj68+1LhhfnxMqk3Ode2C8Z4+xk\"",
		"mtime": "2026-07-29T22:10:06.415Z",
		"size": 73879,
		"path": "../public/assets/product-dashboard-Cfx7CP-b.jpg"
	},
	"/assets/progress-BGKJv0dR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"808-oKmpYzXHw2x5GXTwKXVQdAxQneA\"",
		"mtime": "2026-07-29T22:10:06.330Z",
		"size": 2056,
		"path": "../public/assets/progress-BGKJv0dR.js"
	},
	"/assets/react-Ca03aNmg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"209c-USFuEbwY5iMmvZ/V4vj+KOHLghg\"",
		"mtime": "2026-07-29T22:10:06.331Z",
		"size": 8348,
		"path": "../public/assets/react-Ca03aNmg.js"
	},
	"/assets/react-dom-BRSbvI1o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcf-K6mUMjuTToL18GgLxDc7h9zRDT4\"",
		"mtime": "2026-07-29T22:10:06.331Z",
		"size": 3535,
		"path": "../public/assets/react-dom-BRSbvI1o.js"
	},
	"/assets/refresh-cw-DEQykIWC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ab-c08paZpG1NATe/grrFUUlmhesSE\"",
		"mtime": "2026-07-29T22:10:06.331Z",
		"size": 427,
		"path": "../public/assets/refresh-cw-DEQykIWC.js"
	},
	"/assets/routes-BENGhp1d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8c1-QoGCOXvMAFksSKXOd7gTv2orYms\"",
		"mtime": "2026-07-29T22:10:06.374Z",
		"size": 59585,
		"path": "../public/assets/routes-BENGhp1d.js"
	},
	"/assets/search-DcBXG7aT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-qrBBU+7H2zMQQIAsEet8XyyDKxM\"",
		"mtime": "2026-07-29T22:10:06.375Z",
		"size": 164,
		"path": "../public/assets/search-DcBXG7aT.js"
	},
	"/assets/select-BiFppIs4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"575e-OJp5uocv0R8InDZIzC6deUMj2JE\"",
		"mtime": "2026-07-29T22:10:06.376Z",
		"size": 22366,
		"path": "../public/assets/select-BiFppIs4.js"
	},
	"/assets/send-LIyW7_6K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118-g0nMnwwLb3G43/EnDyMOGVwkfws\"",
		"mtime": "2026-07-29T22:10:06.376Z",
		"size": 280,
		"path": "../public/assets/send-LIyW7_6K.js"
	},
	"/assets/settings-DR6CrkWH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dd-A222MqDSqB4Qa7OQvzA4k6vO+t0\"",
		"mtime": "2026-07-29T22:10:06.376Z",
		"size": 477,
		"path": "../public/assets/settings-DR6CrkWH.js"
	},
	"/assets/shield-check-C3YMjrjd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-/Mv24QxNkG2sLdlSQKjrZ9oO7uY\"",
		"mtime": "2026-07-29T22:10:06.377Z",
		"size": 310,
		"path": "../public/assets/shield-check-C3YMjrjd.js"
	},
	"/assets/slider-jn6vUfFK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"258a-1OEPXQE/WwqekQyQRTCW/H/D9IM\"",
		"mtime": "2026-07-29T22:10:06.377Z",
		"size": 9610,
		"path": "../public/assets/slider-jn6vUfFK.js"
	},
	"/assets/sparkles-BJbRzRcb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-mFvBVbEVeD0g6Wzh98dfp6SJXFA\"",
		"mtime": "2026-07-29T22:10:06.378Z",
		"size": 484,
		"path": "../public/assets/sparkles-BJbRzRcb.js"
	},
	"/assets/story-woman-B5NsApse.jpg": {
		"type": "image/jpeg",
		"etag": "\"1125f-KCb9QBGy/eZgGmb4AoXMG2sEGAc\"",
		"mtime": "2026-07-29T22:10:06.458Z",
		"size": 70239,
		"path": "../public/assets/story-woman-B5NsApse.jpg"
	},
	"/assets/sun-8Q9dUbKE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37b-S0tgTShEB29Ey0+66KxrCAJfNek\"",
		"mtime": "2026-07-29T22:10:06.378Z",
		"size": 891,
		"path": "../public/assets/sun-8Q9dUbKE.js"
	},
	"/assets/styles-5H6ATYtS.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1e709-Dt6nvw7W1p4aLKpg9ECao5APmQw\"",
		"mtime": "2026-07-29T22:10:06.459Z",
		"size": 124681,
		"path": "../public/assets/styles-5H6ATYtS.css"
	},
	"/assets/superadmin-8ts9Gx0b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a46-oFBoNqdFKjs/x6Zl7UVrcjLgPLI\"",
		"mtime": "2026-07-29T22:10:06.379Z",
		"size": 10822,
		"path": "../public/assets/superadmin-8ts9Gx0b.js"
	},
	"/assets/superadmin.billing-C1YtZIi_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4555-AI8deyL2h0WdPZwCMHv5aSpbZZE\"",
		"mtime": "2026-07-29T22:10:06.381Z",
		"size": 17749,
		"path": "../public/assets/superadmin.billing-C1YtZIi_.js"
	},
	"/assets/superadmin.index-DUDZx0eb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37a7-L6Nl/y6vAJO4Cw/CLe9bP6523yA\"",
		"mtime": "2026-07-29T22:10:06.381Z",
		"size": 14247,
		"path": "../public/assets/superadmin.index-DUDZx0eb.js"
	},
	"/assets/superadmin.plans-B3v8Nh8Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f8e-5nKs54KMpGZmjfD3uia0NW3/2QY\"",
		"mtime": "2026-07-29T22:10:06.381Z",
		"size": 8078,
		"path": "../public/assets/superadmin.plans-B3v8Nh8Z.js"
	},
	"/assets/switch-DnyToQXb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4b-O+PCG6ehZYOTjN4hQ5ctIx0477M\"",
		"mtime": "2026-07-29T22:10:06.398Z",
		"size": 3915,
		"path": "../public/assets/switch-DnyToQXb.js"
	},
	"/assets/tabs-DRbbe6vp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d81-RBFS5dNpe/oG+QqNklQgrdC3Fko\"",
		"mtime": "2026-07-29T22:10:06.399Z",
		"size": 3457,
		"path": "../public/assets/tabs-DRbbe6vp.js"
	},
	"/assets/table-CesTWpiA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"684-3SSD3x6Lo2mWiacO8fMM2V+Sye4\"",
		"mtime": "2026-07-29T22:10:06.399Z",
		"size": 1668,
		"path": "../public/assets/table-CesTWpiA.js"
	},
	"/assets/textarea-CTlwMkBA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f-taso36PLJzaixv8Hji7WBuV2+8E\"",
		"mtime": "2026-07-29T22:10:06.411Z",
		"size": 543,
		"path": "../public/assets/textarea-CTlwMkBA.js"
	},
	"/assets/trash-2-7zOyLx4b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-uNQtyyHpacMq0ykxc9zUf7wa7/4\"",
		"mtime": "2026-07-29T22:10:06.411Z",
		"size": 318,
		"path": "../public/assets/trash-2-7zOyLx4b.js"
	},
	"/assets/triangle-alert-DmIJpFzn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f8-nuOO2+UAvcgoWZWiR1WdT3lcYxo\"",
		"mtime": "2026-07-29T22:10:06.412Z",
		"size": 504,
		"path": "../public/assets/triangle-alert-DmIJpFzn.js"
	},
	"/assets/useAuth-DUU9WhDE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b31-7arSGOfl2n4F4Om/jTOefrc07HY\"",
		"mtime": "2026-07-29T22:10:06.412Z",
		"size": 2865,
		"path": "../public/assets/useAuth-DUU9WhDE.js"
	},
	"/assets/useI18n-BFakvLbJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5551-4cSZOG3821L+aLkzSgDh2shMDjU\"",
		"mtime": "2026-07-29T22:10:06.413Z",
		"size": 21841,
		"path": "../public/assets/useI18n-BFakvLbJ.js"
	},
	"/assets/user-cog-CKP7HKtj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27b-tKZzmogORQE/ugm6nTSAib74jmM\"",
		"mtime": "2026-07-29T22:10:06.413Z",
		"size": 635,
		"path": "../public/assets/user-cog-CKP7HKtj.js"
	},
	"/assets/wellwork-assistant-mascot-BeyclNtP.png": {
		"type": "image/png",
		"etag": "\"16209-TTWyRmf7WdY3zVKpj0QcZYY39hw\"",
		"mtime": "2026-07-29T22:10:06.459Z",
		"size": 90633,
		"path": "../public/assets/wellwork-assistant-mascot-BeyclNtP.png"
	},
	"/assets/wellwork-logo-mark-Bo16x6Vw.png": {
		"type": "image/png",
		"etag": "\"109fa-2tIKU95P3kH2uz5CRQ23D+I9YO0\"",
		"mtime": "2026-07-29T22:10:06.460Z",
		"size": 68090,
		"path": "../public/assets/wellwork-logo-mark-Bo16x6Vw.png"
	},
	"/assets/wellwork-wordmark-BznugxUj.png": {
		"type": "image/png",
		"etag": "\"fe63-1NIO4uV1uci2Zey7N0fXDbGvNRM\"",
		"mtime": "2026-07-29T22:10:06.460Z",
		"size": 65123,
		"path": "../public/assets/wellwork-wordmark-BznugxUj.png"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"423e-MbID4VcIxvDdgL4ew0qEbPp9cpM\"",
		"mtime": "2026-07-14T14:53:13.840Z",
		"size": 16958,
		"path": "../public/favicon.ico"
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
