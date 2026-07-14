// Server functions for reviewing demo requests.
// These run only on the server (TanStack Start server functions) and use the
// service-role Supabase client so they can verify the caller is a super_admin
// and mint/deliver the access token without ever exposing the service role
// key to the browser.
import { createServerFn } from "@tanstack/react-start";

interface DecisionInput {
  requestId: string;
  accessToken: string; // the caller's Supabase auth access token (JWT)
}

interface RejectInput extends DecisionInput {
  reason?: string;
}

async function requireSuperAdmin(accessToken: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: userRes, error: userErr } = await supabaseAdmin.auth.getUser(accessToken);
  if (userErr || !userRes?.user) {
    throw new Error("Unauthorized");
  }

  const { data: isSuperAdmin, error: roleErr } = await supabaseAdmin.rpc("is_super_admin", {
    _user_id: userRes.user.id,
  });
  if (roleErr || !isSuperAdmin) {
    throw new Error("Forbidden: super_admin role required");
  }

  return { userId: userRes.user.id, supabaseAdmin };
}

async function sendDemoDecisionEmail(opts: {
  to: string;
  contactName: string;
  companyName: string;
  approved: boolean;
  accessToken?: string;
  rejectionReason?: string;
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.warn("[demoDecision] RESEND_API_KEY not configured — skipping email send. The token is still saved and visible in the admin review screen.");
    return { sent: false, reason: "no_provider_configured" as const };
  }

  const subject = opts.approved
    ? "Votre accès à la démo WellWork est prêt"
    : "À propos de votre demande de démo WellWork";

  const html = opts.approved
    ? `<p>Bonjour ${opts.contactName},</p>
       <p>Votre demande de démo pour <strong>${opts.companyName}</strong> a été approuvée.</p>
       <p>Votre jeton d'accès (à utiliser lors de votre inscription avec l'adresse ${opts.to}) :</p>
       <p style="font-size:18px;font-weight:bold;letter-spacing:1px;">${opts.accessToken}</p>
       <p>Rendez-vous sur la page d'inscription et collez ce jeton pour activer votre démo.</p>`
    : `<p>Bonjour ${opts.contactName},</p>
       <p>Merci pour votre intérêt pour WellWork. Après examen, nous ne sommes pas en mesure de donner suite à votre demande de démo pour <strong>${opts.companyName}</strong> pour le moment.${opts.rejectionReason ? ` Motif : ${opts.rejectionReason}` : ""}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "WellWork <onboarding@resend.dev>",
      to: [opts.to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[demoDecision] Resend send failed", res.status, text);
    return { sent: false, reason: "provider_error" as const };
  }

  return { sent: true as const };
}

export const approveDemoRequestFn = createServerFn({ method: "POST" })
  .validator((data: DecisionInput) => data)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await requireSuperAdmin(data.accessToken);

    const { data: existing, error: fetchErr } = await supabaseAdmin
      .from("demo_requests")
      .select("*")
      .eq("id", data.requestId)
      .maybeSingle();
    if (fetchErr || !existing) throw new Error("Demande introuvable");
    if (existing.status !== "pending") throw new Error("Cette demande a déjà été traitée");

    const accessToken = crypto.randomUUID();
    const { error: updateErr } = await supabaseAdmin
      .from("demo_requests")
      .update({
        status: "approved",
        access_token: accessToken,
        reviewed_by: (await supabaseAdmin.auth.getUser(data.accessToken)).data.user?.id ?? null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", data.requestId);
    if (updateErr) throw new Error(updateErr.message);

    const emailResult = await sendDemoDecisionEmail({
      to: existing.contact_email,
      contactName: existing.contact_name,
      companyName: existing.company_name,
      approved: true,
      accessToken,
    });

    return { accessToken, emailSent: emailResult.sent };
  });

export const rejectDemoRequestFn = createServerFn({ method: "POST" })
  .validator((data: RejectInput) => data)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await requireSuperAdmin(data.accessToken);

    const { data: existing, error: fetchErr } = await supabaseAdmin
      .from("demo_requests")
      .select("*")
      .eq("id", data.requestId)
      .maybeSingle();
    if (fetchErr || !existing) throw new Error("Demande introuvable");
    if (existing.status !== "pending") throw new Error("Cette demande a déjà été traitée");

    const { error: updateErr } = await supabaseAdmin
      .from("demo_requests")
      .update({
        status: "rejected",
        rejection_reason: data.reason ?? null,
        reviewed_by: (await supabaseAdmin.auth.getUser(data.accessToken)).data.user?.id ?? null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", data.requestId);
    if (updateErr) throw new Error(updateErr.message);

    const emailResult = await sendDemoDecisionEmail({
      to: existing.contact_email,
      contactName: existing.contact_name,
      companyName: existing.company_name,
      approved: false,
      rejectionReason: data.reason,
    });

    return { emailSent: emailResult.sent };
  });
