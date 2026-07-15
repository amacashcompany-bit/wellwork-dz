import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ShieldCheck, Loader2 } from "lucide-react";
import logoMark from "@/assets/brand/wellwork-logo-mark.jpg";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Connexion — Wellwork" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);


  const doSignIn = async () => {
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Bienvenue");
    navigate({ to: "/onboarding", replace: true });
  };

  const doSignUp = async () => {
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: window.location.origin, data: { full_name: fullName } },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Compte créé");
    navigate({ to: "/onboarding", replace: true });
  };

  const doGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    setBusy(false);
    if (result.error) return toast.error(result.error instanceof Error ? result.error.message : String(result.error));
    if (result.redirected) return;
    navigate({ to: "/onboarding", replace: true });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 gradient-mesh">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(1200px 600px at 20% 20%, rgba(139,92,246,0.4), transparent 60%), radial-gradient(1000px 500px at 80% 80%, rgba(56,189,248,0.25), transparent 60%)" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-6 text-foreground">
          <img src={logoMark} alt="Wellwork" className="w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]" />
          <div>
            <div className="font-display font-bold text-lg">Wellwork</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">QVT · Prévention RPS</div>
          </div>
        </Link>

        <Card className="p-8 rounded-3xl bg-card border text-card-foreground shadow-glow">
          <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
            <TabsList className="grid grid-cols-2 w-full bg-muted border">
              <TabsTrigger value="signin" className="data-[state=active]:bg-brand data-[state=active]:text-white">Connexion</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-brand data-[state=active]:text-white">Créer un compte</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-6 space-y-4">
              <div><Label className="text-foreground/80">Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 bg-background border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div><Label className="text-foreground/80">Mot de passe</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 bg-background border-border text-foreground" />
              </div>
              <Button onClick={doSignIn} disabled={busy} className="w-full gradient-brand text-white border-0 h-11">
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Se connecter"}
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="mt-6 space-y-4">
              <div><Label className="text-foreground/80">Nom complet</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 bg-background border-border text-foreground" />
              </div>
              <div><Label className="text-foreground/80">Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 bg-background border-border text-foreground" />
              </div>
              <div><Label className="text-foreground/80">Mot de passe</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 bg-background border-border text-foreground" />
              </div>
              <Button onClick={doSignUp} disabled={busy} className="w-full gradient-brand text-white border-0 h-11">
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Créer mon compte"}
              </Button>
            </TabsContent>
          </Tabs>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> ou <div className="flex-1 h-px bg-border" />
          </div>

          <Button onClick={doGoogle} disabled={busy} variant="outline" className="w-full h-11 bg-card text-card-foreground hover:bg-muted border border-border">
            <svg className="w-4 h-4 me-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continuer avec Google
          </Button>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground/70">
            <ShieldCheck className="w-3.5 h-3.5" /> Conforme Loi 18-07 · Anonymat strict
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
