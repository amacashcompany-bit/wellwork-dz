import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Building2, KeyRound, Loader2, Plus, Sparkles, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useMySpace } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Bienvenue — Wellwork" }] }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { info, loading: spaceLoading, refetch } = useMySpace();
  const [mode, setMode] = useState<"choose" | "request_demo" | "join_token" | "join_employee">("choose");
  
  // State for request demo
  const [companyName, setCompanyName] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  
  // State for join token
  const [accessToken, setAccessToken] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [spaceSlug, setSpaceSlug] = useState("");
  
  // State for employee join
  const [inviteCode, setInviteCode] = useState("");
  
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate({ to: "/auth", replace: true }); return; }
    if (spaceLoading) return;
    
    // Redirect super admin directly
    if (info?.roles.includes("super_admin")) {
      navigate({ to: "/superadmin", replace: true });
      return;
    }

    if (info?.spaceId) {
      const isAdmin = info.roles.includes("hr_admin") || info.roles.includes("manager");
      navigate({ to: isAdmin ? "/admin/dashboard" : "/employee/home", replace: true });
    }
  }, [authLoading, spaceLoading, user, info, navigate]);

  const requestDemo = async () => {
    if (!user || !companyName.trim() || !contactName.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("demo_requests").insert({
      company_name: companyName.trim(),
      company_description: companyDesc.trim(),
      contact_name: contactName.trim(),
      contact_email: user.email!,
      contact_phone: contactPhone.trim(),
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Demande envoyée ! Nous vous contacterons sous peu.");
    setMode("choose");
  };

  const createTrialSpace = async () => {
    if (!user || !accessToken.trim() || !spaceName.trim()) return;
    setBusy(true);
    const finalSlug = (spaceSlug || spaceName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || `space-${Date.now()}`;
    
    const { data, error } = await supabase.rpc("create_trial_space", {
      p_token: accessToken.trim(),
      p_name: spaceName.trim(),
      p_slug: finalSlug
    });
    
    setBusy(false);
    if (error) {
      return toast.error(error.message || "Erreur lors de la création de l'espace");
    }
    
    toast.success("Espace créé avec succès ! Votre essai commence maintenant.");
    refetch();
    navigate({ to: "/admin/dashboard", replace: true });
  };

  const joinWithCode = async () => {
    if (!user || !inviteCode.trim()) return;
    setBusy(true);
    const { data, error } = await supabase.rpc("redeem_space_invite", { _code: inviteCode.trim() });
    setBusy(false);
    if (error || !data || !data.length) return toast.error(error?.message || "Code d'invitation invalide ou expiré");
    const role = data[0].role;
    toast.success("Bienvenue dans votre espace");
    refetch();
    navigate({ to: role === "employee" ? "/employee/home" : "/admin/dashboard", replace: true });
  };

  if (authLoading || spaceLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-6 h-6 animate-spin text-brand" /></div>;
  }

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-4 py-12 text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="font-display font-bold text-lg">Wellwork</div>
        </Link>

        {mode === "choose" && (
          <Card className="p-8 rounded-3xl glass-dark border-white/10 text-white">
            <h1 className="text-2xl font-bold text-center mb-2">Bienvenue{user?.email ? `, ${user.email.split("@")[0]}` : ""}</h1>
            <p className="text-white/60 text-sm text-center mb-8">Comment souhaitez-vous utiliser Wellwork ?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => setMode("join_employee")} className="text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand hover:bg-white/10 transition-all flex flex-col items-center text-center">
                <KeyRound className="w-6 h-6 mb-3 text-brand" />
                <div className="font-semibold text-sm">Salarié / Manager</div>
                <div className="text-[10px] text-white/60 mt-1">J'ai un code d'invitation (WW-...)</div>
              </button>
              
              <button onClick={() => setMode("join_token")} className="text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand hover:bg-white/10 transition-all flex flex-col items-center text-center">
                <Building2 className="w-6 h-6 mb-3 text-brand" />
                <div className="font-semibold text-sm">Créer l'Espace</div>
                <div className="text-[10px] text-white/60 mt-1">J'ai un jeton d'accès démo</div>
              </button>
              
              <button onClick={() => setMode("request_demo")} className="text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand hover:bg-white/10 transition-all flex flex-col items-center text-center">
                <Plus className="w-6 h-6 mb-3 text-brand" />
                <div className="font-semibold text-sm">Demander une Démo</div>
                <div className="text-[10px] text-white/60 mt-1">Je veux inscrire mon entreprise</div>
              </button>
            </div>
            
            <div className="mt-8 text-center">
              <button onClick={signOut} className="text-xs text-white/40 hover:text-white/70">Se déconnecter</button>
            </div>
          </Card>
        )}

        {mode === "request_demo" && (
          <Card className="p-8 rounded-3xl glass-dark border-white/10 text-white">
            <div className="flex items-center gap-3 mb-6"><Send className="w-6 h-6 text-brand" /><h1 className="text-xl font-bold">Demander une Démo</h1></div>
            <p className="text-sm text-white/60 mb-6">Parlez-nous de votre entreprise. Notre équipe examinera votre demande et vous enverra un jeton d'accès.</p>
            <div className="space-y-4">
              <div><Label className="text-white/80">Nom de l'entreprise</Label>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Ex. TechDZ" className="mt-1 bg-white/5 border-white/10 text-white" />
              </div>
              <div><Label className="text-white/80">Description / Besoins</Label>
                <Textarea value={companyDesc} onChange={(e) => setCompanyDesc(e.target.value)} placeholder="Décrivez votre entreprise et vos besoins..." className="mt-1 bg-white/5 border-white/10 text-white min-h-[80px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-white/80">Votre nom</Label>
                  <Input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Jean Dupont" className="mt-1 bg-white/5 border-white/10 text-white" />
                </div>
                <div><Label className="text-white/80">Téléphone (Optionnel)</Label>
                  <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+213 555 55 55" className="mt-1 bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setMode("choose")} className="bg-transparent border-white/20 text-white hover:bg-white/10">Retour</Button>
                <Button onClick={requestDemo} disabled={busy || !companyName.trim() || !contactName.trim()} className="flex-1 gradient-brand border-0 h-11">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Envoyer la demande"}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {mode === "join_token" && (
          <Card className="p-8 rounded-3xl glass-dark border-white/10 text-white">
            <div className="flex items-center gap-3 mb-6"><Building2 className="w-6 h-6 text-brand" /><h1 className="text-xl font-bold">Activer votre Espace Démo</h1></div>
            <div className="space-y-4">
              <div><Label className="text-white/80">Jeton d'accès (Reçu par email)</Label>
                <Input value={accessToken} onChange={(e) => setAccessToken(e.target.value)} placeholder="Ex. 123e4567-e89b-12d3..." className="mt-1 bg-white/5 border-white/10 text-white font-mono" />
              </div>
              <div><Label className="text-white/80">Nom de l'organisation</Label>
                <Input value={spaceName} onChange={(e) => setSpaceName(e.target.value)} placeholder="Ex. TechDZ" className="mt-1 bg-white/5 border-white/10 text-white" />
              </div>
              <div><Label className="text-white/80">Identifiant unique (slug)</Label>
                <Input value={spaceSlug} onChange={(e) => setSpaceSlug(e.target.value)} placeholder="tech-dz" className="mt-1 bg-white/5 border-white/10 text-white" />
                <div className="text-[11px] text-white/40 mt-1">Auto-généré à partir du nom si vide.</div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setMode("choose")} className="bg-transparent border-white/20 text-white hover:bg-white/10">Retour</Button>
                <Button onClick={createTrialSpace} disabled={busy || !accessToken.trim() || !spaceName.trim()} className="flex-1 gradient-brand border-0 h-11">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Créer l'espace"}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {mode === "join_employee" && (
          <Card className="p-8 rounded-3xl glass-dark border-white/10 text-white">
            <div className="flex items-center gap-3 mb-6"><KeyRound className="w-6 h-6 text-brand" /><h1 className="text-xl font-bold">Rejoindre avec un code</h1></div>
            <div className="space-y-4">
              <div><Label className="text-white/80">Code d'invitation</Label>
                <Input value={inviteCode} onChange={(e) => setInviteCode(e.target.value.toUpperCase())} placeholder="Ex. WW-4G7K-9XZ2" className="mt-1 bg-white/5 border-white/10 text-white font-mono tracking-wider" />
                <div className="text-[11px] text-white/40 mt-1">Code unique reçu de votre RH ou manager.</div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setMode("choose")} className="bg-transparent border-white/20 text-white hover:bg-white/10">Retour</Button>
                <Button onClick={joinWithCode} disabled={busy || !inviteCode.trim()} className="flex-1 gradient-brand border-0 h-11">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Rejoindre"}
                </Button>
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
