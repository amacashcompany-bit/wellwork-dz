import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Sparkles, LayoutDashboard, LogOut, User, Image, Home, Settings } from "lucide-react";
import { useAuth, useMySpace, hasRole } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/superadmin")({
  ssr: false,
  component: SuperAdminLayout,
});

function SuperAdminLayout() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { info, loading: spaceLoading } = useMySpace();

  // Profile Customization state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileAvatar, setProfileAvatar] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (loading || spaceLoading) return;
    if (!user) {
      navigate({ to: "/auth", replace: true });
      return;
    }
    // Only allow super_admin role
    if (!hasRole(info?.roles ?? [], ["super_admin"])) {
      navigate({ to: "/", replace: true });
    }
  }, [user, loading, info, spaceLoading, navigate]);

  // Load current profile name and avatar on login
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      if (data) {
        setProfileName(data.full_name ?? "");
        setProfileAvatar(data.avatar_url ?? "");
      }
    })();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: profileName,
      avatar_url: profileAvatar,
    });
    setSavingProfile(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profil mis à jour !");
      setIsProfileOpen(false);
    }
  };

  if (loading || spaceLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-brand" />
      </div>
    );
  }

  const avatarOptions = [
    "https://api.dicebear.com/7.x/bottts/svg?seed=Felix",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Jack",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Cody"
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar for Super Admin */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border/40 bg-card flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shadow-glow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-display font-bold leading-tight">Wellwork</div>
              <div className="text-[9px] uppercase tracking-widest text-brand font-semibold">Master Admin</div>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <Link
            to="/superadmin"
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-brand/10 text-brand" }}
            inactiveProps={{ className: "text-muted-foreground hover:bg-muted/50 hover:text-foreground" }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Tableau de bord
          </Link>
          <Link
            to="/superadmin/plans"
            activeProps={{ className: "bg-brand/10 text-brand" }}
            inactiveProps={{ className: "text-muted-foreground hover:bg-muted/50 hover:text-foreground" }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <Settings className="w-4 h-4" />
            Abonnements & Plans
          </Link>

          <div className="pt-6">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              Page d'accueil
            </Link>
          </div>
        </nav>

        {/* User profile section at the bottom */}
        <div className="p-4 border-t border-border/40 space-y-3">
          <div className="flex items-center gap-3 px-2">
            {profileAvatar ? (
              <img src={profileAvatar} className="w-9 h-9 rounded-full object-cover border border-brand/20 shadow-glow" alt="Avatar" />
            ) : (
              <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold font-display shadow-glow">
                {profileName ? profileName.slice(0, 2).toUpperCase() : "AD"}
              </div>
            )}
            <div className="truncate flex-1">
              <div className="text-sm font-semibold text-foreground truncate">{profileName || "Master Admin"}</div>
              <div className="text-[10px] text-muted-foreground truncate">{user.email}</div>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
            >
              <User className="w-4 h-4" />
              Mon Profil
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-[calc(100vh-4rem)] md:min-h-screen p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>

      {/* Profile Edit Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier mon profil</DialogTitle>
            <DialogDescription>
              Personnalisez votre nom de profil et votre avatar d'administrateur.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Ex: Master Admin"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Choisir un avatar prédéfini</Label>
              <div className="flex gap-2.5 mt-1">
                {avatarOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setProfileAvatar(opt)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${profileAvatar === opt ? 'border-brand shadow-glow' : 'border-border/40 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={opt} alt="Avatar option" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="avatar">Ou URL de l'avatar personnalisée</Label>
              <div className="relative">
                <Input
                  id="avatar"
                  value={profileAvatar}
                  onChange={(e) => setProfileAvatar(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className="pr-10"
                />
                <Image className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProfileOpen(false)}>Annuler</Button>
            <Button onClick={handleSaveProfile} disabled={savingProfile} className="gradient-brand text-white border-0">
              {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sauvegarder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
