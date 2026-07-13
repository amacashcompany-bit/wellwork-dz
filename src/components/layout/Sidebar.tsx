import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BarChart3, Bell, BookOpen, Bot, Calendar, HelpCircle, Home, Inbox, LayoutDashboard,
  Lightbulb, MessageSquare, Plug, ScrollText, Settings, ShieldQuestion, Users,
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";
import type { DictKey } from "@/lib/i18n";

const adminItems: { to: string; icon: React.ComponentType<{ className?: string }>; key: DictKey; badge?: string }[] = [
  { to: "/admin/dashboard", icon: LayoutDashboard, key: "dashboard" },
  { to: "/admin/employees", icon: Users, key: "employees" },
  { to: "/admin/surveys", icon: ScrollText, key: "surveys" },
  { to: "/admin/anonymous", icon: ShieldQuestion, key: "anonymousSpace", badge: "3" },
  { to: "/admin/burnout", icon: Bot, key: "burnoutEngine", badge: "!" },
  { to: "/admin/alerts", icon: Bell, key: "alerts" },
  { to: "/admin/actions", icon: Lightbulb, key: "actionPlans" },
  { to: "/admin/events", icon: Calendar, key: "events" },
  { to: "/admin/library", icon: BookOpen, key: "library" },
  { to: "/admin/messages", icon: MessageSquare, key: "messages" },
  { to: "/admin/erp", icon: Plug, key: "erp" },
  { to: "/admin/reports", icon: BarChart3, key: "reports" },
  { to: "/admin/settings", icon: Settings, key: "settings" },
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

export function Sidebar() {
  const { t, direction } = useI18n();
  const role = useStore((s) => s.role);
  const items = role === "admin" ? adminItems : employeeItems;
  const location = useLocation();

  return (
    <aside
      className={`fixed top-16 bottom-0 w-64 bg-sidebar text-sidebar-foreground border-sidebar-border ${
        direction === "rtl" ? "right-0 border-l" : "left-0 border-r"
      } overflow-y-auto py-4 px-3 hidden md:block z-40`}
    >
      <nav className="space-y-0.5">
        {items.map((item) => {
          const active = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
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
              <span className="relative z-10 flex-1 truncate">{t(item.key)}</span>
              {item.badge && (
                <span className={`relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  item.badge === "!" ? "bg-danger text-white" : "bg-white/20 text-white"
                }`}>{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 px-3 py-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="text-xs text-white/60 mb-2">Version</div>
        <div className="text-sm font-medium text-white">QVT-Care · 2.0</div>
        <div className="mt-3 text-[10px] text-white/50">Prototype · Master Thesis Edition</div>
      </div>
    </aside>
  );
}
