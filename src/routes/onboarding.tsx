import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Building2, KeyRound, Loader2, Plus, Send, CheckCircle2 } from "lucide-react";
import logoMark from "@/assets/brand/wellwork-logo-mark.png";
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
  const [mode, setMode] = useState<"choose" | "request_demo" | "join_token" | "join_employee" | "join_manager" | "demo_success">("choose");
  
  // State for request demo
  const [companyName, setCompanyName] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  
  // State for join token
  const [accessToken, setAccessToken] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [spaceSlug, setSpaceSlug] = useState("");
  
  // Employee IDs and manager invitations are intentionally separate flows.
  const [employeeId, setEmployeeId] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  
  const [busy, setBusy] = useState(false);
  const [googleEmployeeFlow, setGoogleEmployeeFlow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("wellwork-employee-onboarding") === "true") {
      setGoogleEmployeeFlow(true);
      setMode("join_employee");
    }
  }, []);

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
    toast.success("Demande envoyée !");
    setMode("demo_success");
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

  const joinWithEmployeeId = async () => {
    if (!user || !employeeId.trim()) return;
    setBusy(true);
    const claimEmployeeId = supabase.rpc.bind(supabase) as unknown as (
      functionName: "claim_employee_id",
      args: { p_employee_code: string },
    ) => PromiseLike<{ data: unknown; error: { message: string } | null }>;
    const { error } = await claimEmployeeId("claim_employee_id", {
      p_employee_code: employeeId.trim().toUpperCase(),
    });
    setBusy(false);
    if (error) return toast.error(error.message || "Identifiant salarie invalide ou deja utilise");
    sessionStorage.removeItem("wellwork-employee-onboarding");
    toast.success("Compte salarie active");
    refetch();
    navigate({ to: "/employee/home", replace: true });
  };

  const joinWithManagerCode = async () => {
    if (!user || !inviteCode.trim()) return;
    setBusy(true);
    const { data, error } = await supabase.rpc("redeem_space_invite", { _code: inviteCode.trim() });
    setBusy(false);
    if (error || !data || !data.length) return toast.error(error?.message || "Code manager invalide ou expire");
    toast.success("Acces manager active");
    refetch();
    navigate({ to: "/admin/dashboard", replace: true });
  };

  if (authLoading || spaceLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-6 h-6 animate-spin text-brand" /></div>;
  }

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-4 py-12 text-foreground">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <img src={logoMark} alt="Wellwork" className="w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]" />
          <div className="font-display font-bold text-lg">Wellwork</div>
        </Link>

        {mode === "choose" && (
          <Card className="p-8 rounded-3xl glass-dark border-white/10 text-foreground">
            <h1 className="text-2xl font-bold text-center mb-2">Bienvenue{user?.email ? `, ${user.email.split("@")[0]}` : ""}</h1>
            <p className="text-muted-foreground text-sm text-center mb-8">Comment souhaitez-vous utiliser Wellwork ?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => setMode("join_employee")} className="text-left p-6 rounded-2xl bg-background border hover:border-brand hover:bg-muted transition-all flex flex-col items-center text-center">
                <KeyRound className="w-6 h-6 mb-3 text-brand" />
                <div className="font-semibold text-sm">Salarié</div>
                <div className="text-[10px] text-muted-foreground mt-1">J'ai mon identifiant employé (EMP-...)</div>
              </button>

              <button onClick={() => setMode("join_manager")} className="text-left p-6 rounded-2xl bg-background border hover:border-brand hover:bg-muted transition-all flex flex-col items-center text-center">
                <KeyRound className="w-6 h-6 mb-3 text-brand" />
                <div className="font-semibold text-sm">Manager RH</div>
                <div className="text-[10px] text-muted-foreground mt-1">J'ai un code manager (WW-...)</div>
              </button>
              
              <button onClick={() => setMode("join_token")} className="text-left p-6 rounded-2xl bg-background border hover:border-brand hover:bg-muted transition-all flex flex-col items-center text-center">
                <Building2 className="w-6 h-6 mb-3 text-brand" />
                <div className="font-semibold text-sm">Créer l'Espace</div>
                <div className="text-[10px] text-muted-foreground mt-1">J'ai un jeton d'accès démo</div>
              </button>
              
              <button onClick={() => setMode("request_demo")} className="text-left p-6 rounded-2xl bg-background border hover:border-brand hover:bg-muted transition-all flex flex-col items-center text-center">
                <Plus className="w-6 h-6 mb-3 text-brand" />
                <div className="font-semibold text-sm">Demander une Démo</div>
                <div className="text-[10px] text-muted-foreground mt-1">Je veux inscrire mon entreprise</div>
              </button>
            </div>
            
            <div className="mt-8 text-center">
              <button onClick={signOut} className="text-xs text-muted-foreground hover:text-foreground">Se déconnecter</button>
            </div>
          </Card>
        )}

        {mode === "request_demo" && (
          <Card className="p-8 rounded-3xl glass-dark border-white/10 text-foreground">
            <div className="flex items-center gap-3 mb-6"><Send className="w-6 h-6 text-brand" /><h1 className="text-xl font-bold">Demander une Démo</h1></div>
            <p className="text-sm text-muted-foreground mb-6">Parlez-nous de votre entreprise. Notre équipe examinera votre demande et vous enverra un jeton d'accès.</p>
            <div className="space-y-4">
              <div><Label className="text-foreground/80">Nom de l'entreprise</Label>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Ex. TechDZ" className="mt-1 bg-background border-border text-foreground" />
              </div>
              <div><Label className="text-foreground/80">Description / Besoins</Label>
                <Textarea value={companyDesc} onChange={(e) => setCompanyDesc(e.target.value)} placeholder="Décrivez votre entreprise et vos besoins..." className="mt-1 bg-background border-border text-foreground min-h-[80px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-foreground/80">Votre nom</Label>
                  <Input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Jean Dupont" className="mt-1 bg-background border-border text-foreground" />
                </div>
                <div><Label className="text-foreground/80">Téléphone (Optionnel)</Label>
                  <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+213 555 55 55" className="mt-1 bg-background border-border text-foreground" />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => googleEmployeeFlow ? signOut() : setMode("choose")} className="bg-transparent border-border text-foreground hover:bg-muted">{googleEmployeeFlow ? "Changer de compte" : "Retour"}</Button>
                <Button onClick={requestDemo} disabled={busy || !companyName.trim() || !contactName.trim()} className="flex-1 gradient-brand border-0 h-11">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Envoyer la demande"}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {mode === "demo_success" && (
          <Card className="p-10 rounded-3xl bg-card border-brand/30 text-center text-card-foreground relative overflow-hidden shadow-elegant">
            <div className="absolute inset-0 bg-brand/5 backdrop-blur-3xl" />
            <div className="relative z-10 flex flex-col items-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.1 }} className="w-16 h-16 rounded-full gradient-brand flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)] mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-2xl md:text-3xl font-bold font-display mb-3">Demande envoyée avec succès !</motion.h1>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed text-sm">
                Merci de l'intérêt que vous portez à WellWork. Notre équipe examinera votre demande et vous enverra un jeton d'accès sécurisé par email très rapidement.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Button onClick={() => setMode("choose")} variant="outline" className="bg-transparent border-border text-foreground hover:bg-muted rounded-full px-8">
                  Retour à l'accueil
                </Button>
              </motion.div>
            </div>
          </Card>
        )}

        {mode === "join_token" && (
          <Card className="p-8 rounded-3xl glass-dark border-white/10 text-foreground">
            <div className="flex items-center gap-3 mb-6"><Building2 className="w-6 h-6 text-brand" /><h1 className="text-xl font-bold">Activer votre Espace Démo</h1></div>
            <div className="space-y-4">
              <div><Label className="text-foreground/80">Jeton d'accès (Reçu par email)</Label>
                <Input value={accessToken} onChange={(e) => setAccessToken(e.target.value)} placeholder="Ex. 123e4567-e89b-12d3..." className="mt-1 bg-background border-border text-foreground font-mono" />
              </div>
              <div><Label className="text-foreground/80">Nom de l'organisation</Label>
                <Input value={spaceName} onChange={(e) => setSpaceName(e.target.value)} placeholder="Ex. TechDZ" className="mt-1 bg-background border-border text-foreground" />
              </div>
              <div><Label className="text-foreground/80">Identifiant unique (slug)</Label>
                <Input value={spaceSlug} onChange={(e) => setSpaceSlug(e.target.value)} placeholder="tech-dz" className="mt-1 bg-background border-border text-foreground" />
                <div className="text-[11px] text-muted-foreground mt-1">Auto-généré à partir du nom si vide.</div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setMode("choose")} className="bg-transparent border-border text-foreground hover:bg-muted">Retour</Button>
                <Button onClick={createTrialSpace} disabled={busy || !accessToken.trim() || !spaceName.trim()} className="flex-1 gradient-brand border-0 h-11">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Créer l'espace"}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {mode === "join_employee" && (
          <Card className="p-8 rounded-3xl glass-dark border-white/10 text-foreground">
            <div className="flex items-center gap-3 mb-6"><KeyRound className="w-6 h-6 text-brand" /><h1 className="text-xl font-bold">Activer mon compte salarié</h1></div>
            <div className="space-y-4">
              <div><Label className="text-foreground/80">Identifiant employé</Label>
                <Input value={employeeId} onChange={(e) => setEmployeeId(e.target.value.toUpperCase())} placeholder="Ex. EMP-0142" className="mt-1 bg-background border-border text-foreground font-mono tracking-wider" />
                <div className="text-[11px] text-muted-foreground mt-1">Utilisez l'identifiant figurant dans le registre de votre entreprise. Votre identité de connexion reste privée.</div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setMode("choose")} className="bg-transparent border-border text-foreground hover:bg-muted">Retour</Button>
                <Button onClick={joinWithEmployeeId} disabled={busy || !employeeId.trim()} className="flex-1 gradient-brand border-0 h-11">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Activer mon compte"}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {mode === "join_manager" && (
          <Card className="p-8 rounded-3xl glass-dark border-white/10 text-foreground">
            <div className="flex items-center gap-3 mb-6"><KeyRound className="w-6 h-6 text-brand" /><h1 className="text-xl font-bold">Accès manager RH</h1></div>
            <div className="space-y-4">
              <div><Label className="text-foreground/80">Code manager</Label>
                <Input value={inviteCode} onChange={(e) => setInviteCode(e.target.value.toUpperCase())} placeholder="Ex. WW-4G7K-9XZ2" className="mt-1 bg-background border-border text-foreground font-mono tracking-wider" />
                <div className="text-[11px] text-muted-foreground mt-1">Ce code est créé par l'administrateur. Vos modules seront limités aux permissions qu'il a choisies.</div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setMode("choose")} className="bg-transparent border-border text-foreground hover:bg-muted">Retour</Button>
                <Button onClick={joinWithManagerCode} disabled={busy || !inviteCode.trim()} className="flex-1 gradient-brand border-0 h-11">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Rejoindre l'espace manager"}
                </Button>
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
