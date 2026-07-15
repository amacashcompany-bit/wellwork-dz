import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return result === 0;
}

Deno.serve(async (request) => {
  const secret = Deno.env.get("CHARGILY_SECRET_KEY");
  const signature = request.headers.get("signature");
  const payload = await request.text();
  if (!secret || !signature) return new Response("Invalid signature", { status: 403 });

  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const computed = toHex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)));
  if (!safeEqual(signature, computed)) return new Response("Invalid signature", { status: 403 });

  const event = JSON.parse(payload);
  if (event.type === "checkout.paid" && event.data?.id) {
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { error } = await supabase.rpc("mark_provider_payment_paid", {
      p_provider_checkout_id: event.data.id,
      p_payload: event,
    });
    if (error) return new Response(error.message, { status: 500 });
  }

  return Response.json({ received: true });
});
