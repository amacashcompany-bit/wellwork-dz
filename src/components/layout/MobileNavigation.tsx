import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Calendar,
  Home,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Menu,
  MessageSquare,
  Plug,
  ScrollText,
  Settings,
  ShieldQuestion,
  Users,
  UserCog,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ComponentType } from "react";
import logoMark from "@/assets/brand/wellwork-logo-mark.png";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { hasRole, useManagerPermissions, useMySpace } from "@/hooks/useAuth";
import { useI18n } from "@/hooks/useI18n";
import { managerAccessForPath } from "@/lib/manager-access";
import { useStore } from "@/store/useStore";

type MobileNavigationProps = {
  variant?: "workspace" | "superadmin";
  onLogout?: () => void | Promise<void>;
};

type NavItem = {
  to: string;
  icon: ComponentType<{ className?: string }>;
  label: [string, string, string];
  adminOnly?: boolean;
};

const adminItems: NavItem[] = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: ["Tableau", "الرئيسية", "Dashboard"] },
  { to: "/admin/employees", icon: Users, label: ["Employés", "الموظفون", "Employees"] },
  { to: "/admin/team", icon: UserCog, label: ["Équipe", "الفريق", "Team"], adminOnly: true },
  { to: "/admin/surveys", icon: ScrollText, label: ["Enquêtes", "الاستبيانات", "Surveys"] },
  { to: "/admin/anonymous", icon: ShieldQuestion, label: ["Anonyme", "مجهول", "Anonymous"] },
  { to: "/admin/burnout", icon: Bot, label: ["Burn-out", "الاحتراق", "Burnout"] },
  { to: "/admin/alerts", icon: Bell, label: ["Alertes", "التنبيهات", "Alerts"] },
  { to: "/admin/actions", icon: Lightbulb, label: ["Actions", "الإجراءات", "Actions"] },
  { to: "/admin/events", icon: Calendar, label: ["Événements", "الفعاليات", "Events"] },
  { to: "/admin/library", icon: BookOpen, label: ["Bibliothèque", "المكتبة", "Library"] },
  { to: "/admin/messages", icon: MessageSquare, label: ["Messages", "الرسائل", "Messages"] },
  { to: "/admin/erp", icon: Plug, label: ["ERP / KPI", "المؤشرات", "ERP / KPI"] },
  { to: "/admin/reports", icon: BarChart3, label: ["Rapports", "التقارير", "Reports"] },
  { to: "/admin/settings", icon: Settings, label: ["Réglages", "الإعدادات", "Settings"], adminOnly: true },
];

const employeeItems: NavItem[] = [
  { to: "/employee/home", icon: Home, label: ["Accueil", "الرئيسية", "Home"] },
  { to: "/employee/surveys", icon: ScrollText, label: ["Sondages", "الاستبيانات", "Surveys"] },
  { to: "/employee/feedback", icon: ShieldQuestion, label: ["Anonyme", "مجهول", "Anonymous"] },
  { to: "/employee/library", icon: BookOpen, label: ["Ressources", "الموارد", "Resources"] },
  { to: "/employee/events", icon: Calendar, label: ["Événements", "الفعاليات", "Events"] },
  { to: "/employee/messages", icon: MessageSquare, label: ["Messages", "الرسائل", "Messages"] },
];

const superAdminItems: NavItem[] = [
  { to: "/superadmin", icon: LayoutDashboard, label: ["Tableau", "الرئيسية", "Dashboard"] },
  { to: "/superadmin/plans", icon: Settings, label: ["Offres", "الخطط", "Plans"] },
  { to: "/superadmin/billing", icon: CreditCard, label: ["Paiements", "المدفوعات", "Payments"] },
  { to: "/", icon: Home, label: ["Site", "الموقع", "Website"] },
];

function isActivePath(pathname: string, to: string) {
  return pathname === to || (to !== "/" && pathname.startsWith(`${to}/`));
}

export function MobileNavigation({ variant = "workspace", onLogout }: MobileNavigationProps) {
  const location = useLocation();
  const { pick } = useI18n();
  const { info } = useMySpace();
  const open = useStore((state) => state.isMobileNavOpen);
  const setOpen = useStore((state) => state.setMobileNavOpen);
  const isEmployee = variant === "workspace" && hasRole(info?.roles ?? [], "employee");
  const isManager = variant === "workspace"
    && hasRole(info?.roles ?? [], "manager")
    && !hasRole(info?.roles ?? [], ["hr_admin", "super_admin"]);
  const { permissions } = useManagerPermissions(info?.spaceId ?? null, isManager);

  const items = variant === "superadmin"
    ? superAdminItems
    : isEmployee
      ? employeeItems
      : isManager
        ? adminItems.filter((item) => {
            if (item.adminOnly) return false;
            const required = managerAccessForPath(item.to);
            return required === null || (required !== "admin_only" && permissions.has(required));
          })
        : adminItems;

  const preferredPaths = isEmployee
    ? ["/employee/home", "/employee/surveys", "/employee/feedback", "/employee/messages"]
    : variant === "superadmin"
      ? ["/superadmin", "/superadmin/plans", "/superadmin/billing", "/"]
      : ["/admin/dashboard", "/admin/employees", "/admin/surveys", "/admin/alerts"];
  const primaryItems = preferredPaths
    .map((path) => items.find((item) => item.to === path))
    .filter((item): item is NavItem => Boolean(item));
  const moreIsActive = !primaryItems.some((item) => isActivePath(location.pathname, item.to));

  return (
    <>
      <nav
        aria-label={pick("Navigation mobile", "التنقل عبر الهاتف", "Mobile navigation")}
        className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 h-16 border border-border/80 bg-card/95 shadow-[0_12px_34px_rgba(15,23,42,0.18)] backdrop-blur-xl md:hidden rounded-lg"
      >
        <div className="grid h-full grid-cols-5 items-center px-1">
          {primaryItems.map((item) => {
            const active = isActivePath(location.pathname, item.to);
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="flex min-w-0 flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-muted-foreground">
                <motion.span
                  animate={{ y: active ? -3 : 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  className={`grid h-8 w-9 place-items-center rounded-md ${active ? "bg-brand text-white shadow-[0_6px_16px_rgba(16,185,129,0.28)]" : "text-muted-foreground"}`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </motion.span>
                <span className={`w-full truncate px-1 text-center ${active ? "text-brand" : ""}`}>{pick(...item.label)}</span>
              </Link>
            );
          })}
          {Array.from({ length: Math.max(0, 4 - primaryItems.length) }).map((_, index) => <span key={`spacer-${index}`} />)}
          <button type="button" onClick={() => setOpen(true)} className="flex min-w-0 flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-muted-foreground">
            <span className={`grid h-8 w-9 place-items-center rounded-md ${moreIsActive ? "bg-brand text-white shadow-[0_6px_16px_rgba(16,185,129,0.28)]" : ""}`}>
              <Menu className="h-[18px] w-[18px]" />
            </span>
            <span className={moreIsActive ? "text-brand" : ""}>{pick("Plus", "المزيد", "More")}</span>
          </button>
        </div>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="max-h-[78dvh] overflow-y-auto rounded-t-lg px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-5 md:hidden">
          <SheetHeader className="text-start">
            <div className="flex items-center gap-2">
              <img src={logoMark} alt="WellWork" className="h-9 w-9 object-contain" />
              <div>
                <SheetTitle className="text-base">WellWork</SheetTitle>
                <SheetDescription className="text-xs">{pick("Navigation", "التنقل", "Navigation")}</SheetDescription>
              </div>
            </div>
          </SheetHeader>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {items.map((item) => {
              const active = isActivePath(location.pathname, item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-md border px-2 py-3 text-center text-xs font-medium ${active ? "border-brand/40 bg-brand/10 text-brand" : "border-border bg-background text-muted-foreground"}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="w-full break-words">{pick(...item.label)}</span>
                </Link>
              );
            })}
          </div>
          {onLogout && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setOpen(false);
                void onLogout();
              }}
              className="mt-4 h-11 w-full justify-center gap-2 border border-destructive/25 bg-destructive/5 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              {pick("Déconnexion", "تسجيل الخروج", "Logout")}
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
