import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Sparkles, LayoutDashboard, LogOut, User, Image, Home, Settings, Moon, Sun, Globe, MoreVertical } from "lucide-react";
import { useAuth, useMySpace, hasRole } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";
import { LANGS } from "@/lib/i18n";
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
  const { t, language, setLanguage } = useI18n();
  const isDark = useStore((s) => s.isDarkMode);
  const toggleDark = useStore((s) => s.toggleDarkMode);
  const currentLang = LANGS.find((l) => l.code === language) || LANGS[0];

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
              <div className="text-[9px] uppercase tracking-widest text-brand font-semibold">{t("saMasterAdmin")}</div>
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
            {t("dashboard")}
          </Link>
          <Link
            to="/superadmin/plans"
            activeProps={{ className: "bg-brand/10 text-brand" }}
            inactiveProps={{ className: "text-muted-foreground hover:bg-muted/50 hover:text-foreground" }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <Settings className="w-4 h-4" />
            {t("saPlansAndPricing")}
          </Link>

          <div className="pt-6">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              {t("home")}
            </Link>
          </div>
        </nav>

        {/* Toggles */}
        <div className="px-4 pb-2 flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 justify-start gap-2 h-9 text-xs">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="truncate">{currentLang.label}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              {LANGS.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => setLanguage(l.code)}>
                  <img src={l.flag} alt={l.code} className="me-2 w-4 h-3 object-cover rounded-sm shadow-sm" /> {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={toggleDark}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>

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

          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                <User className="w-4 h-4 mr-2" />
                {t("profile")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleDark}>
                {isDark ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {isDark ? t("lightMode") : t("darkMode")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage(currentLang.code === 'en' ? 'fr' : 'en')}>
                <Globe className="w-4 h-4 mr-2" />
                {t("language")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                {t("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("profile")}</DialogTitle>
            <DialogDescription>
              Modifiez vos informations personnelles.
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
              <Label htmlFor="avatar">Ou URL de l'avatar personnalisée</Label>
              <Input
                id="avatar"
                value={profileAvatar}
                onChange={(e) => setProfileAvatar(e.target.value)}
                placeholder="https://example.com/avatar.png"
              />
              <div className="grid grid-cols-5 gap-3 pt-2">
                {avatarOptions.map(opt => (
                  <div 
                    key={opt}
                    className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${profileAvatar === opt ? 'border-brand shadow-glow' : 'border-transparent hover:border-brand/30'}`}
                    onClick={() => setProfileAvatar(opt)}
                  >
                    <img src={opt} className="w-full aspect-square object-cover bg-muted/30" alt="Avatar option" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsProfileOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={handleSaveProfile} disabled={savingProfile}>
              {savingProfile ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
