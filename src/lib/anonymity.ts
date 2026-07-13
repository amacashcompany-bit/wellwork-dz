// Client-side helpers for anonymous whistleblowing tickets.
// The ticket key is a random string shown to the reporter ONCE and never stored.
// We store only sha256(key) on the row and use the raw key to encrypt subject/content.

export function generateTicketKey(): string {
  const arr = new Uint8Array(18);
  crypto.getRandomValues(arr);
  return "WW-" + Array.from(arr).map((b) => b.toString(36).padStart(2, "0")).join("").slice(0, 16).toUpperCase();
}

export async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function deriveKey(secret: string): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: new TextEncoder().encode("wellwork-v1"), iterations: 100_000, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptWithKey(plaintext: string, secret: string): Promise<string> {
  const key = await deriveKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(plaintext));
  const combined = new Uint8Array(iv.byteLength + ct.byteLength);
  combined.set(iv, 0); combined.set(new Uint8Array(ct), iv.byteLength);
  return btoa(String.fromCharCode(...combined));
}

export async function decryptWithKey(ciphertextB64: string, secret: string): Promise<string> {
  try {
    const key = await deriveKey(secret);
    const bin = Uint8Array.from(atob(ciphertextB64), (c) => c.charCodeAt(0));
    const iv = bin.slice(0, 12); const ct = bin.slice(12);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
    return new TextDecoder().decode(pt);
  } catch {
    return "";
  }
}
