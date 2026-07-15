import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import logoMark from "@/assets/brand/wellwork-logo-mark.png";
import { useAuth } from "@/hooks/useAuth";
import { billingDb } from "@/lib/billing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/activate")({ ssr: false, component: ActivateCompanyPage });

function ActivateCompanyPage() {
  const { user, loading } = useAuth();
  const [token, setToken] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [slug, setSlug] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("token") || sessionStorage.getItem("wellwork-activation-token") || "";
    if (value) sessionStorage.setItem("wellwork-activation-token", value);
    setToken(value);
    if (!loading && !user && value) window.location.replace(`/auth?payment=${value}`);
  }, [loading, user]);

  const activate = async () => {
    if (!token || !companyName.trim()) return;
    const finalSlug = (slug || companyName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
    setBusy(true);
    const { error } = await billingDb.rpc("create_paid_space", { p_activation_token: token, p_name: companyName.trim(), p_slug: finalSlug });
    setBusy(false);
    if (error) return toast.error(error.message);
    sessionStorage.removeItem("wellwork-activation-token");
    toast.success("Votre espace entreprise est prêt");
    window.location.replace("/admin/dashboard");
  };

  if (loading || !user) return <div className="grid min-h-screen place-items-center bg-background"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>;

  return <div className="grid min-h-screen place-items-center bg-background px-4 py-10"><div className="w-full max-w-lg border border-border bg-card p-6 shadow-sm rounded-lg sm:p-8"><Link to="/" className="mb-8 flex items-center justify-center gap-2"><img src={logoMark} alt="Wellwork" className="h-10 w-10" /><span className="font-display text-lg font-bold">Wellwork</span></Link><div className="mb-6 flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600"><CheckCircle2 /></div><div><h1 className="text-xl font-bold">Activer votre espace</h1><p className="mt-1 text-sm text-muted-foreground">Paiement validé. Donnez un nom à l'espace administrateur de votre entreprise.</p></div></div><div className="space-y-4"><div><Label>Nom de l'entreprise</Label><Input value={companyName} onChange={(event) => setCompanyName(event.target.value)} className="mt-1" placeholder="Ex. TechDZ" /></div><div><Label>Identifiant de l'espace</Label><Input value={slug} onChange={(event) => setSlug(event.target.value)} className="mt-1" placeholder="tech-dz" /><p className="mt-1 text-xs text-muted-foreground">Généré automatiquement si ce champ reste vide.</p></div><Button onClick={activate} disabled={busy || !companyName.trim() || !token} className="w-full bg-brand text-white">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Building2 className="me-2 h-4 w-4" />Créer l'espace</>}</Button><div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" />Activation unique et sécurisée</div></div></div></div>;
}
