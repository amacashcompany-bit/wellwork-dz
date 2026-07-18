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
	"/assets/activate-CtvLdT5M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d45-K47GK+PqPaA+VWxnRaO9ggpF1qk\"",
		"mtime": "2026-07-18T02:20:22.696Z",
		"size": 3397,
		"path": "../public/assets/activate-CtvLdT5M.js"
	},
	"/assets/admin.actions-weChn4kh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f05-K5rsAbwBwTPUvNSTXSE1N3y8Qz8\"",
		"mtime": "2026-07-18T02:20:22.708Z",
		"size": 3845,
		"path": "../public/assets/admin.actions-weChn4kh.js"
	},
	"/assets/admin-DhVXSx_1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48d-JpykBG6c4wkD5UxgiZdS9kBhuTA\"",
		"mtime": "2026-07-18T02:20:22.708Z",
		"size": 1165,
		"path": "../public/assets/admin-DhVXSx_1.js"
	},
	"/assets/admin.alerts-D1OzTQel.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e49-984w7M4pGdKLkXzMasQKt8MHMZc\"",
		"mtime": "2026-07-18T02:20:22.709Z",
		"size": 3657,
		"path": "../public/assets/admin.alerts-D1OzTQel.js"
	},
	"/assets/admin.anonymous-BKuiHOUk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19a4-eJFmU7n8mWl/jQuVRsHY6wDh+yk\"",
		"mtime": "2026-07-18T02:20:22.709Z",
		"size": 6564,
		"path": "../public/assets/admin.anonymous-BKuiHOUk.js"
	},
	"/assets/admin.burnout-Xh7gd1Z1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f5b-SRrwmc8TfzzdC9nAfjnVAI1Ehhc\"",
		"mtime": "2026-07-18T02:20:22.709Z",
		"size": 8027,
		"path": "../public/assets/admin.burnout-Xh7gd1Z1.js"
	},
	"/assets/admin.erp-Du16lfUS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148e-Iq2j1qFvKvLK76z0eqkuEw5doz0\"",
		"mtime": "2026-07-18T02:20:22.711Z",
		"size": 5262,
		"path": "../public/assets/admin.erp-Du16lfUS.js"
	},
	"/assets/admin.employees-CNE_gGsE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc5-IKyu+5uZfjYf+hbdCx8JyQShxak\"",
		"mtime": "2026-07-18T02:20:22.711Z",
		"size": 7109,
		"path": "../public/assets/admin.employees-CNE_gGsE.js"
	},
	"/assets/admin.dashboard-DNpobtUO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11dbd-DcaxGqP8DaBL6rFfpvNQQzsnFLM\"",
		"mtime": "2026-07-18T02:20:22.711Z",
		"size": 73149,
		"path": "../public/assets/admin.dashboard-DNpobtUO.js"
	},
	"/assets/admin.events-DxW8HIFf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c-c+mErA55Fxt9tqUg7Vxr2RTOfxM\"",
		"mtime": "2026-07-18T02:20:22.711Z",
		"size": 76,
		"path": "../public/assets/admin.events-DxW8HIFf.js"
	},
	"/assets/admin.library-DfEHr8_L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-UiFRcJ6IAyjh/cNfSwIoA2+mlT0\"",
		"mtime": "2026-07-18T02:20:22.712Z",
		"size": 77,
		"path": "../public/assets/admin.library-DfEHr8_L.js"
	},
	"/assets/admin.index-CExJtV3d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d4-+twDuVF8QAfo9bpKyilY7VXypx4\"",
		"mtime": "2026-07-18T02:20:22.712Z",
		"size": 212,
		"path": "../public/assets/admin.index-CExJtV3d.js"
	},
	"/assets/admin.messages-D4zm_WAx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-TqmjkO2hhA7EXALj/phzkqL9CXk\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 79,
		"path": "../public/assets/admin.messages-D4zm_WAx.js"
	},
	"/assets/admin.reports-CO11o3jt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1193-Gei6AnUDgO99yxw8VFM889rD7Z0\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 4499,
		"path": "../public/assets/admin.reports-CO11o3jt.js"
	},
	"/assets/admin.team-zceHSU3E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f7-bWmsI29fYisdplqOgQFaTUN13po\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 9463,
		"path": "../public/assets/admin.team-zceHSU3E.js"
	},
	"/assets/admin.settings-zdZNDg2j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85e7-C/wzX5nmxWqjgXOZ55gReRRlXCM\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 34279,
		"path": "../public/assets/admin.settings-zdZNDg2j.js"
	},
	"/assets/AnonymousBanner-DeI6lW_Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20f3-dQAc/s9T8QMGaxIv77oqlMTnL10\"",
		"mtime": "2026-07-18T02:20:22.696Z",
		"size": 8435,
		"path": "../public/assets/AnonymousBanner-DeI6lW_Q.js"
	},
	"/assets/algerie-poste-CYYv7qDA.png": {
		"type": "image/png",
		"etag": "\"2ef99-D+Y0eUl/XFLo6X7OcKkBHM9GW4w\"",
		"mtime": "2026-07-18T02:20:22.743Z",
		"size": 192409,
		"path": "../public/assets/algerie-poste-CYYv7qDA.png"
	},
	"/assets/admin.surveys-PGen51s9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c30-/Br6xRSnuohd9DjwII5zhAYbtPs\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 3120,
		"path": "../public/assets/admin.surveys-PGen51s9.js"
	},
	"/assets/AppShell-BecO3tQ9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3469-jVsZyOmfp5mVnTQVJoCufORFFTM\"",
		"mtime": "2026-07-18T02:20:22.696Z",
		"size": 13417,
		"path": "../public/assets/AppShell-BecO3tQ9.js"
	},
	"/assets/arrow-up-right-DpzC3__p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-aqD980q7rcX5FKBpjAAAfVQOk3A\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 157,
		"path": "../public/assets/arrow-up-right-DpzC3__p.js"
	},
	"/assets/anonymity-Bz--fVPw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b3-0NQfeXlejonJalBL28XXcqBWZL8\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 1203,
		"path": "../public/assets/anonymity-Bz--fVPw.js"
	},
	"/assets/auth-CzLkOxpd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19bb-7HLRQFrMBySJeNsO5hC/D6BJmdY\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 6587,
		"path": "../public/assets/auth-CzLkOxpd.js"
	},
	"/assets/AreaChart-CgCa2kLD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b651-8CXvYRsVrgxKzsUa3G+mRH2vsnw\"",
		"mtime": "2026-07-18T02:20:22.696Z",
		"size": 374353,
		"path": "../public/assets/AreaChart-CgCa2kLD.js"
	},
	"/assets/auth.callback-DA4ZCpVE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"960-SYr25X7zEOnV0uTwqx3M/FbpcM4\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 2400,
		"path": "../public/assets/auth.callback-DA4ZCpVE.js"
	},
	"/assets/badge-C4dSGxVr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31c-IYWt4G7K9HbetjkoDXDCw5K5u1w\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 796,
		"path": "../public/assets/badge-C4dSGxVr.js"
	},
	"/assets/baridimob-CtydI89s.png": {
		"type": "image/png",
		"etag": "\"af0c-5p4u8XF4CXDX6h2uC1NU+DonEYY\"",
		"mtime": "2026-07-18T02:20:22.743Z",
		"size": 44812,
		"path": "../public/assets/baridimob-CtydI89s.png"
	},
	"/assets/billing-D_q62G0Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-CK5sj1lEj4/NhC+BJJ2/uWA5FOg\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 200,
		"path": "../public/assets/billing-D_q62G0Y.js"
	},
	"/assets/building-2-B-4khl6P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-1OpNnN+jKey7G9x2O8VnpCcjov4\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 373,
		"path": "../public/assets/building-2-B-4khl6P.js"
	},
	"/assets/button-D_h1E0Ub.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f7f-1mtDey3GW9lS2l3Pfuz4QkPJznk\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 32639,
		"path": "../public/assets/button-D_h1E0Ub.js"
	},
	"/assets/calendar-days-BAaWzf2k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-RCzsDPg16Ojg3rVG15/4pf4REtY\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 484,
		"path": "../public/assets/calendar-days-BAaWzf2k.js"
	},
	"/assets/card-0GbvPCKT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41f-1DKAkghvW/AhdTDd8n22OO1Uy+I\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 1055,
		"path": "../public/assets/card-0GbvPCKT.js"
	},
	"/assets/check-Cg4A6mVq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"72-snQf4adNID1SY5fXpcfBcjx8syY\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 114,
		"path": "../public/assets/check-Cg4A6mVq.js"
	},
	"/assets/checkbox-DKDFEWs5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe5-11bS/8BFBcQ0G0CyuU0YjuTjBBA\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 4069,
		"path": "../public/assets/checkbox-DKDFEWs5.js"
	},
	"/assets/checkout-Bo6CmsON.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f4e-GcsWDC5qbRkV930Jnjgzzr+PpmE\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 20302,
		"path": "../public/assets/checkout-Bo6CmsON.js"
	},
	"/assets/chevron-down-JG68WOvF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-nsThMbYu9OvY7IgLHIZIqqD5+tU\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 118,
		"path": "../public/assets/chevron-down-JG68WOvF.js"
	},
	"/assets/circle-alert-BXKOhw_Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-n4vHQ1/FBUvB6Hf5u+A3NO/tP2E\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 240,
		"path": "../public/assets/circle-alert-BXKOhw_Z.js"
	},
	"/assets/circle-check-tmvf4M41.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-uzZs6GfsqemsLu/Jea26MzCR1f0\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 168,
		"path": "../public/assets/circle-check-tmvf4M41.js"
	},
	"/assets/circle-x-BBIJHN4n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-Z/nTmHVD25uh1bhcipU9FiuHTyE\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 197,
		"path": "../public/assets/circle-x-BBIJHN4n.js"
	},
	"/assets/clock-cL6hdXHJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-6XKv3aTi7svCXMb7YfD29Tw5Shc\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 159,
		"path": "../public/assets/clock-cL6hdXHJ.js"
	},
	"/assets/Combination-M7_R_nL0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5267-ZmUz7KO83FlKrfY14u22fR4UYdg\"",
		"mtime": "2026-07-18T02:20:22.696Z",
		"size": 21095,
		"path": "../public/assets/Combination-M7_R_nL0.js"
	},
	"/assets/client-CtRRebDM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32354-mYpnbT5USMybJNbICzPpwi7+Tf0\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 205652,
		"path": "../public/assets/client-CtRRebDM.js"
	},
	"/assets/copy-CTstNNaw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-iLhP7OQWb4l66y6B5jiMcd+EMbo\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 226,
		"path": "../public/assets/copy-CTstNNaw.js"
	},
	"/assets/credit-card-CndUKd3B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-7iGvU0FXJrfDGaUc7WfreXxL554\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 197,
		"path": "../public/assets/credit-card-CndUKd3B.js"
	},
	"/assets/createServerFn-DS8TDlTC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1123-RmT92gAy9ZrAp5So1nr5nk6JBDI\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 4387,
		"path": "../public/assets/createServerFn-DS8TDlTC.js"
	},
	"/assets/database-CwHlaViv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-LXV9EGcRH6zy4yE9/pLRD2Qyv4E\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 233,
		"path": "../public/assets/database-CwHlaViv.js"
	},
	"/assets/dialog-njFfpwok.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184a-o+InQVPznCNuoZxBQBcguYCVvjw\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 6218,
		"path": "../public/assets/dialog-njFfpwok.js"
	},
	"/assets/dist-BfnKMUgh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"272-Bd1Cfv8OTI1HODj9RFNTzozEEIA\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 626,
		"path": "../public/assets/dist-BfnKMUgh.js"
	},
	"/assets/dist-C2J943E6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44-OS6su+NFCKVeCGRYewHX2hCT1qA\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 68,
		"path": "../public/assets/dist-C2J943E6.js"
	},
	"/assets/dist-C9Sm5wnZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"223-RmnJbvJZ2CNIC0GNljAo4cXDpfk\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 547,
		"path": "../public/assets/dist-C9Sm5wnZ.js"
	},
	"/assets/dist-CbBK0gLs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1305-JxVMoDJb6MA1yNB54dWKGstrujc\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 4869,
		"path": "../public/assets/dist-CbBK0gLs.js"
	},
	"/assets/dist-CEh50d6X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-hPI/incivhUN9MuJZAAvGG7HzYQ\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 246,
		"path": "../public/assets/dist-CEh50d6X.js"
	},
	"/assets/dist-DV0jE0HF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13aa-kCCCTz5+n/vVJ7n4wfAgmlPQ+Xo\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 5034,
		"path": "../public/assets/dist-DV0jE0HF.js"
	},
	"/assets/dropdown-menu-nnCQGEKi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc7d-XndsFDyHHGz1WN5R5gHJVS/ZjxQ\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 48253,
		"path": "../public/assets/dropdown-menu-nnCQGEKi.js"
	},
	"/assets/employee-CdqPiMLA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"331-tkVMn95/LYlDAN+MYwwqrxlE64A\"",
		"mtime": "2026-07-18T02:20:22.713Z",
		"size": 817,
		"path": "../public/assets/employee-CdqPiMLA.js"
	},
	"/assets/employee.events-DxW8HIFf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c-c+mErA55Fxt9tqUg7Vxr2RTOfxM\"",
		"mtime": "2026-07-18T02:20:22.725Z",
		"size": 76,
		"path": "../public/assets/employee.events-DxW8HIFf.js"
	},
	"/assets/employee.help-R-o9sX0E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2833-iqvz2qPz9xXxIblQS59bv3emFNg\"",
		"mtime": "2026-07-18T02:20:22.726Z",
		"size": 10291,
		"path": "../public/assets/employee.help-R-o9sX0E.js"
	},
	"/assets/employee.home-CJ36kTd6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1294-0yUneYnG57H2tn3nTfOrEOZK9nY\"",
		"mtime": "2026-07-18T02:20:22.727Z",
		"size": 4756,
		"path": "../public/assets/employee.home-CJ36kTd6.js"
	},
	"/assets/employee.index-BAyy71Y3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2-F4PK03mwxU0hOzZAegTNKn7rt1c\"",
		"mtime": "2026-07-18T02:20:22.728Z",
		"size": 210,
		"path": "../public/assets/employee.index-BAyy71Y3.js"
	},
	"/assets/employee.library-DfEHr8_L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-UiFRcJ6IAyjh/cNfSwIoA2+mlT0\"",
		"mtime": "2026-07-18T02:20:22.728Z",
		"size": 77,
		"path": "../public/assets/employee.library-DfEHr8_L.js"
	},
	"/assets/employee.messages-D4zm_WAx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-TqmjkO2hhA7EXALj/phzkqL9CXk\"",
		"mtime": "2026-07-18T02:20:22.729Z",
		"size": 79,
		"path": "../public/assets/employee.messages-D4zm_WAx.js"
	},
	"/assets/employee.surveys-D1KnVx9I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4827-sBt+kVSBR8+aROBJKgSRHcIwNng\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 18471,
		"path": "../public/assets/employee.surveys-D1KnVx9I.js"
	},
	"/assets/EventsPage-LItGWnJk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3c-P6hpfIWOSkf3R8Vq17N30x2GGeU\"",
		"mtime": "2026-07-18T02:20:22.696Z",
		"size": 3388,
		"path": "../public/assets/EventsPage-LItGWnJk.js"
	},
	"/assets/external-link-Dljof09u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-DoUvZ0PUHtGOma0kOiAM08e3OeI\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 241,
		"path": "../public/assets/external-link-Dljof09u.js"
	},
	"/assets/globe-CydhzfyO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-oJhOiCKwiCxJZjUBx0bwe1N7u/s\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 232,
		"path": "../public/assets/globe-CydhzfyO.js"
	},
	"/assets/hero-team-D22dQlj7.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a654-NHsoR+FHinWQK9EWd1l0OooYKmg\"",
		"mtime": "2026-07-18T02:20:22.744Z",
		"size": 108116,
		"path": "../public/assets/hero-team-D22dQlj7.jpg"
	},
	"/assets/input-B9ppqgRe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"817a-A0X+afN9irFO4aC36GKCxQ5Twnk\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 33146,
		"path": "../public/assets/input-B9ppqgRe.js"
	},
	"/assets/key-round-r7zA_-es.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"159-cnDRd2INu+H+ELliWbIckon/3bI\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 345,
		"path": "../public/assets/key-round-r7zA_-es.js"
	},
	"/assets/label-CGDYpC2o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-RX9yLjcznPDSiSiQ4cc3bC/RqZY\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 649,
		"path": "../public/assets/label-CGDYpC2o.js"
	},
	"/assets/LibraryPage-BzSTXuKT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f89-iqoczesWw05vOXysZUCCG/XfTL0\"",
		"mtime": "2026-07-18T02:20:22.696Z",
		"size": 3977,
		"path": "../public/assets/LibraryPage-BzSTXuKT.js"
	},
	"/assets/lock-CVN9MGWP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-05ZsCUe+pU0UugYp2QIEAxGcvA4\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 196,
		"path": "../public/assets/lock-CVN9MGWP.js"
	},
	"/assets/index-Cx9tJlSd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"799c9-Nz+cq2958Zdn8QjxCig47MiiVjU\"",
		"mtime": "2026-07-18T02:20:22.696Z",
		"size": 498121,
		"path": "../public/assets/index-Cx9tJlSd.js"
	},
	"/assets/MessagingPage-DoR0yM20.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b28-8KVy7bG/Uy/9jkqFJ1grCbaioDM\"",
		"mtime": "2026-07-18T02:20:22.696Z",
		"size": 2856,
		"path": "../public/assets/MessagingPage-DoR0yM20.js"
	},
	"/assets/employee.feedback-Dab7ZkWy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf0-vFEhHcXP8NDzcHJbXGZeoYs8+NM\"",
		"mtime": "2026-07-18T02:20:22.726Z",
		"size": 11248,
		"path": "../public/assets/employee.feedback-Dab7ZkWy.js"
	},
	"/assets/MobileNavigation-DunWYdLq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3194-edvik2gh4XFMszRLVT7tCRezm/U\"",
		"mtime": "2026-07-18T02:20:22.696Z",
		"size": 12692,
		"path": "../public/assets/MobileNavigation-DunWYdLq.js"
	},
	"/assets/onboarding-8KMfUo57.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3552-Ulsgzm7/pZt9ZSkiKQo/WrfPEZw\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 13650,
		"path": "../public/assets/onboarding-8KMfUo57.js"
	},
	"/assets/plus-IfYW_8K7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-BYlnYIFI95PxLgjJ3YeBfIaeuOs\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 143,
		"path": "../public/assets/plus-IfYW_8K7.js"
	},
	"/assets/progress-BGKJv0dR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"808-oKmpYzXHw2x5GXTwKXVQdAxQneA\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 2056,
		"path": "../public/assets/progress-BGKJv0dR.js"
	},
	"/assets/product-dashboard-Cfx7CP-b.jpg": {
		"type": "image/jpeg",
		"etag": "\"12097-Wj68+1LhhfnxMqk3Ode2C8Z4+xk\"",
		"mtime": "2026-07-18T02:20:22.744Z",
		"size": 73879,
		"path": "../public/assets/product-dashboard-Cfx7CP-b.jpg"
	},
	"/assets/react-Ca03aNmg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"209c-USFuEbwY5iMmvZ/V4vj+KOHLghg\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 8348,
		"path": "../public/assets/react-Ca03aNmg.js"
	},
	"/assets/react-dom-BRSbvI1o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcf-K6mUMjuTToL18GgLxDc7h9zRDT4\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 3535,
		"path": "../public/assets/react-dom-BRSbvI1o.js"
	},
	"/assets/refresh-cw-DEQykIWC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ab-c08paZpG1NATe/grrFUUlmhesSE\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 427,
		"path": "../public/assets/refresh-cw-DEQykIWC.js"
	},
	"/assets/routes-BmlmZadW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b89a-0il5RvPC+8SqCPT2NFaIKkJxztw\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 47258,
		"path": "../public/assets/routes-BmlmZadW.js"
	},
	"/assets/search-DcBXG7aT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-qrBBU+7H2zMQQIAsEet8XyyDKxM\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 164,
		"path": "../public/assets/search-DcBXG7aT.js"
	},
	"/assets/select-BiFppIs4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"575e-OJp5uocv0R8InDZIzC6deUMj2JE\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 22366,
		"path": "../public/assets/select-BiFppIs4.js"
	},
	"/assets/send-LIyW7_6K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118-g0nMnwwLb3G43/EnDyMOGVwkfws\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 280,
		"path": "../public/assets/send-LIyW7_6K.js"
	},
	"/assets/settings-DR6CrkWH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dd-A222MqDSqB4Qa7OQvzA4k6vO+t0\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 477,
		"path": "../public/assets/settings-DR6CrkWH.js"
	},
	"/assets/shield-check-C3YMjrjd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-/Mv24QxNkG2sLdlSQKjrZ9oO7uY\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 310,
		"path": "../public/assets/shield-check-C3YMjrjd.js"
	},
	"/assets/slider-jn6vUfFK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"258a-1OEPXQE/WwqekQyQRTCW/H/D9IM\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 9610,
		"path": "../public/assets/slider-jn6vUfFK.js"
	},
	"/assets/sparkles-BJbRzRcb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-mFvBVbEVeD0g6Wzh98dfp6SJXFA\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 484,
		"path": "../public/assets/sparkles-BJbRzRcb.js"
	},
	"/assets/sun-8Q9dUbKE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37b-S0tgTShEB29Ey0+66KxrCAJfNek\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 891,
		"path": "../public/assets/sun-8Q9dUbKE.js"
	},
	"/assets/styles-C87-yn2w.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1df8c-IhD1g/sunN2Vn7Il0fTUv5d3eMo\"",
		"mtime": "2026-07-18T02:20:22.746Z",
		"size": 122764,
		"path": "../public/assets/styles-C87-yn2w.css"
	},
	"/assets/superadmin-CYVCEONE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a46-Q2QBuT2XqZCJp4vUBJUoP9Qj+ko\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 10822,
		"path": "../public/assets/superadmin-CYVCEONE.js"
	},
	"/assets/superadmin.billing-KOEGPpck.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"45cb-Qm/bIT69bZQd7ko3NJomWRgOUWA\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 17867,
		"path": "../public/assets/superadmin.billing-KOEGPpck.js"
	},
	"/assets/superadmin.index-B6WdtpMK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37a7-/za8RDuemFzGsrin54dKoVb+f04\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 14247,
		"path": "../public/assets/superadmin.index-B6WdtpMK.js"
	},
	"/assets/superadmin.plans-CbAnCLqF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f8e-g81X1Qnri/jCBPSGpLLbgH991K4\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 8078,
		"path": "../public/assets/superadmin.plans-CbAnCLqF.js"
	},
	"/assets/switch-DnyToQXb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4b-O+PCG6ehZYOTjN4hQ5ctIx0477M\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 3915,
		"path": "../public/assets/switch-DnyToQXb.js"
	},
	"/assets/table-CesTWpiA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"684-3SSD3x6Lo2mWiacO8fMM2V+Sye4\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 1668,
		"path": "../public/assets/table-CesTWpiA.js"
	},
	"/assets/story-woman-B5NsApse.jpg": {
		"type": "image/jpeg",
		"etag": "\"1125f-KCb9QBGy/eZgGmb4AoXMG2sEGAc\"",
		"mtime": "2026-07-18T02:20:22.744Z",
		"size": 70239,
		"path": "../public/assets/story-woman-B5NsApse.jpg"
	},
	"/assets/tabs-DRbbe6vp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d81-RBFS5dNpe/oG+QqNklQgrdC3Fko\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 3457,
		"path": "../public/assets/tabs-DRbbe6vp.js"
	},
	"/assets/textarea-CTlwMkBA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f-taso36PLJzaixv8Hji7WBuV2+8E\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 543,
		"path": "../public/assets/textarea-CTlwMkBA.js"
	},
	"/assets/trash-2-7zOyLx4b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-uNQtyyHpacMq0ykxc9zUf7wa7/4\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 318,
		"path": "../public/assets/trash-2-7zOyLx4b.js"
	},
	"/assets/triangle-alert-DAMlZAdo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-7xm0eFP3TMcOVh+GvpPhv6tTmPw\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 377,
		"path": "../public/assets/triangle-alert-DAMlZAdo.js"
	},
	"/assets/useI18n-CkDhzRDn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5551-lonrv1KyrY4SwZSvUqJY5KmcWqQ\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 21841,
		"path": "../public/assets/useI18n-CkDhzRDn.js"
	},
	"/assets/useAuth-BgaA8hs0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b14-1TgkpiHuMN7TYYNsyzjcfn2DPpA\"",
		"mtime": "2026-07-18T02:20:22.730Z",
		"size": 2836,
		"path": "../public/assets/useAuth-BgaA8hs0.js"
	},
	"/assets/user-cog-CKP7HKtj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27b-tKZzmogORQE/ugm6nTSAib74jmM\"",
		"mtime": "2026-07-18T02:20:22.742Z",
		"size": 635,
		"path": "../public/assets/user-cog-CKP7HKtj.js"
	},
	"/assets/wellwork-logo-mark-Bo16x6Vw.png": {
		"type": "image/png",
		"etag": "\"109fa-2tIKU95P3kH2uz5CRQ23D+I9YO0\"",
		"mtime": "2026-07-18T02:20:22.747Z",
		"size": 68090,
		"path": "../public/assets/wellwork-logo-mark-Bo16x6Vw.png"
	},
	"/assets/wellwork-wordmark-BznugxUj.png": {
		"type": "image/png",
		"etag": "\"fe63-1NIO4uV1uci2Zey7N0fXDbGvNRM\"",
		"mtime": "2026-07-18T02:20:22.747Z",
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
