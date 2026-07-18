//#region node_modules/.nitro/vite/services/ssr/assets/anonymity-C8KBXwWg.js
function generateTicketKey() {
	const arr = /* @__PURE__ */ new Uint8Array(18);
	crypto.getRandomValues(arr);
	return "WW-" + Array.from(arr).map((b) => b.toString(36).padStart(2, "0")).join("").slice(0, 16).toUpperCase();
}
async function sha256Hex(input) {
	const buf = new TextEncoder().encode(input);
	const hash = await crypto.subtle.digest("SHA-256", buf);
	return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function deriveKey(secret) {
	const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), "PBKDF2", false, ["deriveKey"]);
	return crypto.subtle.deriveKey({
		name: "PBKDF2",
		salt: new TextEncoder().encode("wellwork-v1"),
		iterations: 1e5,
		hash: "SHA-256"
	}, base, {
		name: "AES-GCM",
		length: 256
	}, false, ["encrypt", "decrypt"]);
}
async function encryptWithKey(plaintext, secret) {
	const key = await deriveKey(secret);
	const iv = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12));
	const ct = await crypto.subtle.encrypt({
		name: "AES-GCM",
		iv
	}, key, new TextEncoder().encode(plaintext));
	const combined = new Uint8Array(iv.byteLength + ct.byteLength);
	combined.set(iv, 0);
	combined.set(new Uint8Array(ct), iv.byteLength);
	return btoa(String.fromCharCode(...combined));
}
async function decryptWithKey(ciphertextB64, secret) {
	try {
		const key = await deriveKey(secret);
		const bin = Uint8Array.from(atob(ciphertextB64), (c) => c.charCodeAt(0));
		const iv = bin.slice(0, 12);
		const ct = bin.slice(12);
		const pt = await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv
		}, key, ct);
		return new TextDecoder().decode(pt);
	} catch {
		return "";
	}
}
//#endregion
export { sha256Hex as i, encryptWithKey as n, generateTicketKey as r, decryptWithKey as t };
