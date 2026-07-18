import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BarChart3, Bell, BookOpen, Bot, Calendar, HelpCircle, Home, Inbox, LayoutDashboard,
  Lightbulb, MessageSquare, Plug, ScrollText, Settings, ShieldQuestion, Users, UserCog,
  PanelLeftClose, PanelLeftOpen
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";
import { useMySpace, hasRole, useManagerPermissions } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { ManagerModule } from "@/lib/manager-access";
import type { DictKey } from "@/lib/i18n";

const adminItems: { to: string; icon: React.ComponentType<{ className?: string }>; key: DictKey; badge?: string; module?: ManagerModule; adminOnly?: boolean }[] = [
  { to: "/admin/dashboard", icon: LayoutDashboard, key: "dashboard" },
  { to: "/admin/employees", icon: Users, key: "employees", module: "employees" },
  { to: "/admin/team", icon: UserCog, key: "employees", adminOnly: true },
  { to: "/admin/surveys", icon: ScrollText, key: "surveys", module: "surveys" },
  { to: "/admin/anonymous", icon: ShieldQuestion, key: "anonymousSpace", module: "alerts" },
  { to: "/admin/burnout", icon: Bot, key: "burnoutEngine", badge: "!", module: "alerts" },
  { to: "/admin/alerts", icon: Bell, key: "alerts", module: "alerts" },
  { to: "/admin/actions", icon: Lightbulb, key: "actionPlans", module: "actions" },
  { to: "/admin/events", icon: Calendar, key: "events", module: "events" },
  { to: "/admin/library", icon: BookOpen, key: "library", module: "library" },
  { to: "/admin/messages", icon: MessageSquare, key: "messages", module: "messages" },
  { to: "/admin/erp", icon: Plug, key: "erp", module: "erp" },
  { to: "/admin/reports", icon: BarChart3, key: "reports", module: "reports" },
  { to: "/admin/settings", icon: Settings, key: "settings", adminOnly: true },
];

const employeeItems: { to: string; icon: React.ComponentType<{ className?: string }>; key: DictKey; badge?: string }[] = [
  { to: "/employee/home", icon: Home, key: "home" },
  { to: "/employee/surveys", icon: ScrollText, key: "mySurveys" },
  { to: "/employee/feedback", icon: Inbox, key: "anonymousFeedback" },
  { to: "/employee/library", icon: BookOpen, key: "library" },
  { to: "/employee/events", icon: Calendar, key: "events" },
  { to: "/employee/messages", icon: MessageSquare, key: "myMessages", badge: "1" },
  { to: "/employee/help", icon: HelpCircle, key: "help" },
];

const superAdminItems: { to: string; icon: React.ComponentType<{ className?: string }>; label: [string, string, string] }[] = [
];

export function Sidebar() {
  const { t, direction, pick } = useI18n();
  const { info } = useMySpace();
  const [anonymousCount, setAnonymousCount] = useState<number | null>(null);
  const isSuperAdmin = hasRole(info?.roles ?? [], "super_admin");
  const isEmployee = hasRole(info?.roles ?? [], "employee");
  const isManager = hasRole(info?.roles ?? [], "manager") && !hasRole(info?.roles ?? [], ["hr_admin", "super_admin"]);
  const { permissions } = useManagerPermissions(info?.spaceId ?? null, isManager);
  const items = isEmployee
    ? employeeItems
    : isManager
      ? adminItems.filter((item) => !item.adminOnly && (!item.module || permissions.has(item.module)))
      : adminItems;
  const location = useLocation();
  const isSidebarCollapsed = useStore((s) => s.isSidebarCollapsed);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  useEffect(() => {
    const spaceId = info?.spaceId;
    if (!spaceId || isEmployee) {
      setAnonymousCount(null);
      return;
    }

    let mounted = true;
    const loadCount = async () => {
      const { count, error } = await supabase
        .from("feedback_tickets")
        .select("id", { count: "exact", head: true })
        .eq("space_id", spaceId);

      if (mounted && !error) setAnonymousCount(count ?? 0);
    };

    void loadCount();
    const channel = supabase
      .channel(`sidebar-feedback-${spaceId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "feedback_tickets",
          filter: `space_id=eq.${spaceId}`,
        },
        () => void loadCount(),
      )
      .subscribe();

    return () => {
      mounted = false;
      void supabase.removeChannel(channel);
    };
  }, [info?.spaceId, isEmployee]);

  return (
    <aside
      className={`fixed top-16 bottom-0 ${isSidebarCollapsed ? "w-20" : "w-64"} bg-sidebar text-sidebar-foreground border-sidebar-border ${
        direction === "rtl" ? "right-0 border-l" : "left-0 border-r"
      } overflow-y-auto py-4 px-3 hidden md:flex flex-col z-40 transition-all duration-300 ease-in-out`}
    >
      <nav className="space-y-0.5 flex-1">
        {items.map((item) => {
          const active = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          const badge =
            item.to === "/admin/anonymous" && anonymousCount !== null
              ? String(anonymousCount)
              : item.badge;
          return (
            <Link
              key={item.to}
              to={item.to}
              title={isSidebarCollapsed ? t(item.key) : undefined}
              className={`relative flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl text-sm transition-colors ${
                active ? "text-white" : "text-sidebar-foreground/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="side-active"
                  className="absolute inset-0 gradient-brand rounded-xl -z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="relative z-10 flex-1 truncate">{t(item.key)}</span>
                  {badge && (
                    <span className={`relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      badge === "!" ? "bg-danger text-white" : "bg-white/20 text-white"
                    }`}>{badge}</span>
                  )}
                </>
              )}
            </Link>
          );
        })}

        {isSuperAdmin && (
          <>
            <div className={`mt-4 mb-1 px-3 text-[10px] uppercase tracking-widest text-sidebar-foreground/40 ${isSidebarCollapsed ? "text-center hidden" : ""}`}>
              {pick("Super admin", "المشرف العام", "Super admin")}
            </div>
            {superAdminItems.map((item) => {
              const active = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  title={isSidebarCollapsed ? pick(...item.label) : undefined}
                  className={`relative flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    active ? "text-white" : "text-sidebar-foreground/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="side-active-super"
                      className="absolute inset-0 gradient-brand rounded-xl -z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10 shrink-0" />
                  {!isSidebarCollapsed && (
                    <span className="relative z-10 flex-1 truncate">{pick(...item.label)}</span>
                  )}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      <div className="mt-auto space-y-4">
        {!isSidebarCollapsed && (
          <div className="px-3 py-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-xs text-white/60 mb-2">Version</div>
            <div className="text-sm font-medium text-white">QVT-Care · 2.0</div>
            <div className="mt-3 text-[10px] text-white/50">Prototype · Master Thesis Edition</div>
          </div>
        )}

        <button 
          onClick={toggleSidebar}
          className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-3"} py-2.5 w-full rounded-xl text-sm text-sidebar-foreground/70 hover:text-white hover:bg-white/5 transition-colors`}
        >
          {direction === "rtl" 
            ? (isSidebarCollapsed ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />)
            : (isSidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />)
          }
          {!isSidebarCollapsed && <span className="truncate">{pick("Réduire", "تصغير", "Collapse")}</span>}
        </button>
      </div>
    </aside>
  );
}
