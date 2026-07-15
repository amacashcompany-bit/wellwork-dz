import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { orderToken } = await request.json();
    if (!orderToken) throw new Error("Missing order token");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const secret = Deno.env.get("CHARGILY_SECRET_KEY");
    if (!secret) throw new Error("Chargily is not configured yet");

    const { data: order, error } = await supabase
      .from("payment_orders")
      .select("id, checkout_token, amount, currency, company_name, contact_email, status, provider_checkout_url, payment_methods!inner(code)")
      .eq("checkout_token", orderToken)
      .eq("payment_methods.code", "chargily")
      .single();
    if (error || !order) throw new Error("Payment order not found");
    if (order.provider_checkout_url) return Response.json({ url: order.provider_checkout_url }, { headers: corsHeaders });
    if (order.status !== "awaiting_payment" || order.currency.toUpperCase() !== "DZD") throw new Error("Order cannot be paid with Chargily");

    const siteUrl = Deno.env.get("SITE_URL") || request.headers.get("origin") || "http://localhost:5000";
    const liveMode = secret.startsWith("live_");
    const apiBase = liveMode ? "https://pay.chargily.net/api/v2" : "https://pay.chargily.net/test/api/v2";
    const response = await fetch(`${apiBase}/checkouts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(Number(order.amount) * 100),
        currency: "dzd",
        description: `Wellwork - ${order.company_name}`,
        success_url: `${siteUrl}/checkout?order=${order.checkout_token}`,
        failure_url: `${siteUrl}/checkout?order=${order.checkout_token}&payment=failed`,
        webhook_endpoint: `${Deno.env.get("SUPABASE_URL")}/functions/v1/chargily-webhook`,
        locale: "fr",
      }),
    });
    const checkout = await response.json();
    if (!response.ok) throw new Error(checkout.message || "Chargily checkout creation failed");

    await supabase.from("payment_orders").update({
      provider_checkout_id: checkout.id,
      provider_checkout_url: checkout.checkout_url || checkout.url,
      provider_payload: checkout,
    }).eq("id", order.id);

    return Response.json({ url: checkout.checkout_url || checkout.url }, { headers: corsHeaders });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unexpected error" }, { status: 400, headers: corsHeaders });
  }
});
