import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bell, Building2, LogOut, Moon, ShieldCheck, Sparkles, Sun, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";
import { useAuth, useMySpace, hasRole } from "@/hooks/useAuth";
import { LANGS } from "@/lib/i18n";

export function TopNav() {
  const { t, language, setLanguage } = useI18n();
  const role = useStore((s) => s.role);
  const setRole = useStore((s) => s.setRole);
  const isDark = useStore((s) => s.isDarkMode);
  const toggleDark = useStore((s) => s.toggleDarkMode);
  const currentLang = LANGS.find((l) => l.code === language)!;
  const { user, signOut } = useAuth();
  const { info } = useMySpace();
  const isAdminUser = info ? hasRole(info.roles, ["hr_admin", "super_admin", "manager"]) : false;

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 glass border-b flex items-center px-4 md:px-6 gap-3">
      <Link to={role === "admin" ? "/admin/dashboard" : "/employee/home"} className="flex items-center gap-2 shrink-0">
        <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-elegant">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="hidden sm:block leading-tight">
          <div className="font-display font-bold text-sm">Wellwork</div>
          <div className="text-[10px] text-muted-foreground">Wellbeing Platform</div>
        </div>
      </Link>

      {isAdminUser && (
        <div className="hidden md:flex items-center bg-muted rounded-full p-1 relative">
          {(["admin", "employee"] as const).map((r) => {
            const active = role === r;
            return (
              <button key={r} onClick={() => setRole(r)} className="relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors z-10">
                {active && <motion.span layoutId="role-pill" className="absolute inset-0 gradient-brand rounded-full shadow-elegant" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                <span className={`relative z-10 ${active ? "text-white" : "text-muted-foreground"}`}>
                  {r === "admin" ? t("hrPortal") : t("employeePortal")}
                </span>
              </button>
            );
          })}
        </div>
      )}

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
            <span>{currentLang.flag}</span>
            <span className="hidden sm:inline">{currentLang.label}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {LANGS.map((l) => (
            <DropdownMenuItem key={l.code} onClick={() => setLanguage(l.code)}>
              <span className="me-2">{l.flag}</span> {l.label}
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
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-danger" onClick={signOut}>
            <LogOut className="w-3.5 h-3.5 me-2" /> {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
