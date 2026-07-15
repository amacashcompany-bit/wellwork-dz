import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Building2, LogOut, Moon, ShieldCheck, Sun, User, AlertCircle, Loader2, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import logoMark from "@/assets/brand/wellwork-logo-mark.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";
import { useAuth, useMySpace, hasRole } from "@/hooks/useAuth";
import { LANGS } from "@/lib/i18n";

export function TopNav() {
  const { t, language, setLanguage } = useI18n();
  const navigate = useNavigate();
  const role = useStore((s) => s.role);
  const setRole = useStore((s) => s.setRole);
  const isDark = useStore((s) => s.isDarkMode);
  const toggleDark = useStore((s) => s.toggleDarkMode);
  const currentLang = LANGS.find((l) => l.code === language)!;
  const { user, signOut } = useAuth();
  const { info } = useMySpace();
  const isAdminUser = info ? hasRole(info.roles, ["hr_admin", "super_admin", "manager"]) : false;

  const handleRoleChange = (r: "admin" | "employee") => {
    setRole(r);
    navigate({ to: r === "admin" ? "/admin/dashboard" : "/employee/home", replace: true });
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "delete account") return;
    setIsDeleting(true);
    const { error } = await supabase.rpc("delete_my_account" as any);
    setIsDeleting(false);
    
    if (error) {
      if (error.message.includes("violates foreign key constraint")) {
        toast.error("Impossible de supprimer : vous êtes propriétaire d'un espace. Veuillez supprimer ou transférer l'espace d'abord.");
      } else {
        toast.error(error.message);
      }
      return;
    }
    
    toast.success("Votre compte a été supprimé avec succès.");
    setShowDeleteModal(false);
    signOut();
  };

  const isSidebarCollapsed = useStore((s) => s.isSidebarCollapsed);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 glass border-b flex items-center px-4 md:px-6 gap-3">
      <Link to={role === "admin" ? "/admin/dashboard" : "/employee/home"} className="flex items-center gap-2 shrink-0">
        <motion.img
          src={logoMark}
          alt="WellWork"
          className="w-9 h-9 object-contain drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ rotate: [0, -6, 6, 0], scale: 1.08, transition: { duration: 0.6 } }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
        />
        <div className="hidden sm:block leading-tight">
          <div className="font-display font-bold text-sm">Wellwork</div>
          <div className="text-[10px] text-muted-foreground">Wellbeing Platform</div>
        </div>
      </Link>

      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex shrink-0 w-9 h-9 text-muted-foreground hover:text-foreground ml-1">
        {isSidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
      </Button>

      <div className="flex-1" />

      <Badge variant="outline" className="hidden lg:inline-flex gap-1.5 py-1">
        <Building2 className="w-3.5 h-3.5" />
        {info?.spaceName ?? "—"}
      </Badge>
      <Badge className="hidden lg:inline-flex gap-1.5 py-1 bg-success/10 text-success border border-success/20 hover:bg-success/15">
        <ShieldCheck className="w-3.5 h-3.5" />
        {t("complianceBadge")}
      </Badge>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5">
            <img src={currentLang.flag} alt={currentLang.code} className="w-4 h-3 object-cover rounded-sm shadow-sm" />
            <span className="hidden sm:inline">{currentLang.label}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {LANGS.map((l) => (
            <DropdownMenuItem key={l.code} onClick={() => setLanguage(l.code)}>
              <img src={l.flag} alt={l.code} className="me-2 w-4 h-3 object-cover rounded-sm shadow-sm" /> {l.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="icon" onClick={toggleDark} aria-label="Toggle theme">
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>

      <Button variant="ghost" size="icon" className="relative">
        <Bell className="w-4 h-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-xs">
            <div>{user?.email}</div>
            <div className="text-[10px] font-normal text-muted-foreground mt-0.5">
              {info?.roles.join(" · ") || "employé"}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
          <DropdownMenuItem asChild><Link to="/admin/settings">{t("settings")}</Link></DropdownMenuItem>
          {info && hasRole(info.roles, "super_admin") && (
            <DropdownMenuItem asChild className="text-brand font-medium"><Link to="/superadmin">Master Admin</Link></DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-danger cursor-pointer" onSelect={(e) => { e.preventDefault(); setShowDeleteModal(true); }}>
            Supprimer le compte
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
            <LogOut className="w-3.5 h-3.5 me-2" /> {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="bg-card border-brand/20 text-card-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-danger">
              <AlertCircle className="w-5 h-5" />
              Supprimer le compte
            </DialogTitle>
            <DialogDescription className="text-white/70 pt-3">
              Cette action est <strong className="text-white">définitive</strong>. Toutes vos données seront effacées et vous ne pourrez plus accéder à votre compte. 
              <br /><br />
              Veuillez écrire <strong>delete account</strong> ci-dessous pour confirmer.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={deleteConfirmText} 
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="delete account" 
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="bg-transparent border-white/20 text-white hover:bg-white/10">
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount} 
              disabled={deleteConfirmText !== "delete account" || isDeleting}
              className="bg-danger hover:bg-danger/90 text-white"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmer la suppression"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
