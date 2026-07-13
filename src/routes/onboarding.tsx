import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Building2, KeyRound, Loader2, Plus, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useMySpace } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Bienvenue — Wellwork" }] }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { info, loading: spaceLoading, refetch } = useMySpace();
  const [mode, setMode] = useState<"choose" | "create" | "join">("choose");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [spaceKey, setSpaceKey] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate({ to: "/auth", replace: true }); return; }
    if (spaceLoading) return;
    if (info?.spaceId) {
      const isAdmin = info.roles.includes("hr_admin") || info.roles.includes("super_admin");
      navigate({ to: isAdmin ? "/admin/dashboard" : "/employee/home", replace: true });
    }
  }, [authLoading, spaceLoading, user, info, navigate]);

  const createSpace = async () => {
    if (!user || !name.trim()) return;
    setBusy(true);
    const finalSlug = (slug || name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || `space-${Date.now()}`;
    const { data: space, error } = await supabase.from("spaces").insert({ name: name.trim(), slug: finalSlug, owner_id: user.id }).select().single();
    if (error || !space) { setBusy(false); return toast.error(error?.message || "Erreur"); }
    await supabase.from("space_members").insert({ space_id: space.id, user_id: user.id });
    await supabase.from("user_roles").insert({ user_id: user.id, space_id: space.id, role: "hr_admin" });
    await supabase.from("profiles").upsert({ id: user.id, current_space_id: space.id });
    setBusy(false);
    toast.success("Espace créé");
    refetch();
    navigate({ to: "/admin/dashboard", replace: true });
  };

  const joinSpace = async () => {
    if (!user || !spaceKey.trim()) return;
    setBusy(true);
    const { data: space, error } = await supabase.from("spaces").select("id, name").eq("space_key", spaceKey.trim()).maybeSingle();
    if (error || !space) { setBusy(false); return toast.error("Clé d'espace invalide"); }
    const { error: memErr } = await supabase.from("space_members").insert({ space_id: space.id, user_id: user.id });
    if (memErr && !memErr.message.includes("duplicate")) { setBusy(false); return toast.error(memErr.message); }
    await supabase.from("user_roles").insert({ user_id: user.id, space_id: space.id, role: "employee" }).select();
    await supabase.from("profiles").upsert({ id: user.id, current_space_id: space.id });
    setBusy(false);
    toast.success(`Bienvenue dans ${space.name}`);
    refetch();
    navigate({ to: "/employee/home", replace: true });
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
            <p className="text-white/60 text-sm text-center mb-8">Rejoignez un espace existant ou créez celui de votre organisation.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <button onClick={() => setMode("join")} className="text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand hover:bg-white/10 transition-all">
                <KeyRound className="w-6 h-6 mb-3 text-brand" />
                <div className="font-semibold">Rejoindre un espace</div>
                <div className="text-xs text-white/60 mt-1">Vous avez une clé d'invitation de votre RH.</div>
              </button>
              <button onClick={() => setMode("create")} className="text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand hover:bg-white/10 transition-all">
                <Plus className="w-6 h-6 mb-3 text-brand" />
                <div className="font-semibold">Créer un espace</div>
                <div className="text-xs text-white/60 mt-1">Devenez administrateur RH d'un nouvel espace.</div>
              </button>
            </div>
            <div className="mt-6 text-center">
              <button onClick={signOut} className="text-xs text-white/40 hover:text-white/70">Se déconnecter</button>
            </div>
          </Card>
        )}

        {mode === "create" && (
          <Card className="p-8 rounded-3xl glass-dark border-white/10 text-white">
            <div className="flex items-center gap-3 mb-6"><Building2 className="w-6 h-6 text-brand" /><h1 className="text-xl font-bold">Créer votre espace</h1></div>
            <div className="space-y-4">
              <div><Label className="text-white/80">Nom de l'organisation</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. TechDZ" className="mt-1 bg-white/5 border-white/10 text-white" />
              </div>
              <div><Label className="text-white/80">Identifiant unique (slug)</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="tech-dz" className="mt-1 bg-white/5 border-white/10 text-white" />
                <div className="text-[11px] text-white/40 mt-1">Utilisé pour identifier votre espace. Auto-généré à partir du nom.</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setMode("choose")} className="bg-transparent border-white/20 text-white hover:bg-white/10">Retour</Button>
                <Button onClick={createSpace} disabled={busy || !name.trim()} className="flex-1 gradient-brand border-0 h-11">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Créer l'espace"}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {mode === "join" && (
          <Card className="p-8 rounded-3xl glass-dark border-white/10 text-white">
            <div className="flex items-center gap-3 mb-6"><KeyRound className="w-6 h-6 text-brand" /><h1 className="text-xl font-bold">Rejoindre un espace</h1></div>
            <div className="space-y-4">
              <div><Label className="text-white/80">Clé d'invitation</Label>
                <Input value={spaceKey} onChange={(e) => setSpaceKey(e.target.value)} placeholder="UUID fourni par votre RH" className="mt-1 bg-white/5 border-white/10 text-white font-mono" />
                <div className="text-[11px] text-white/40 mt-1">Votre RH trouve cette clé dans Paramètres → Espace.</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setMode("choose")} className="bg-transparent border-white/20 text-white hover:bg-white/10">Retour</Button>
                <Button onClick={joinSpace} disabled={busy || !spaceKey.trim()} className="flex-1 gradient-brand border-0 h-11">
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
