import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import logoMark from "@/assets/brand/wellwork-logo-mark.png";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/callback")({ ssr: false, component: GoogleAuthCallback });

function GoogleAuthCallback() {
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const providerError = params.get("error_description") || params.get("error");
      if (providerError) { if (active) setError(providerError); return; }

      const code = params.get("code");
      if (!code) { if (active) setError("Code Google manquant. Veuillez recommencer la connexion."); return; }

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) { if (active) setError(exchangeError.message); return; }

      const activationToken = sessionStorage.getItem("wellwork-activation-token");
      if (activationToken) { window.location.replace(`/activate?token=${activationToken}`); return; }

      sessionStorage.removeItem("wellwork-employee-onboarding");
      sessionStorage.removeItem("wellwork-oauth-intent");
      window.location.replace("/onboarding");
    })();
    return () => { active = false; };
  }, []);

  if (error) {
    return <div className="grid min-h-screen place-items-center bg-background px-4"><div className="w-full max-w-md border border-border bg-card p-6 text-center shadow-sm rounded-lg"><img src={logoMark} alt="Wellwork" className="mx-auto h-12 w-12" /><h1 className="mt-4 text-lg font-bold">Connexion Google impossible</h1><p className="mt-2 text-sm text-muted-foreground">{error}</p><Button className="mt-5" onClick={() => window.location.replace("/auth")}>Retour à la connexion</Button></div></div>;
  }

  return <div className="grid min-h-screen place-items-center bg-background px-4"><div className="text-center"><div className="relative mx-auto grid h-16 w-16 place-items-center rounded-lg border border-brand/30 bg-card"><img src={logoMark} alt="Wellwork" className="h-11 w-11" /><Loader2 className="absolute -bottom-2 -right-2 h-5 w-5 animate-spin rounded-full bg-background text-brand" /></div><h1 className="mt-5 font-semibold">Connexion sécurisée</h1><p className="mt-1 text-sm text-muted-foreground">Préparation de votre espace...</p><div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5 text-brand" />Votre email Google reste privé dans les parcours salariés</div></div></div>;
}
