import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { MobileNavigation } from "./MobileNavigation";
import { useI18n } from "@/hooks/useI18n";
import { useThemeSync } from "@/hooks/useTheme";
import { Toaster } from "@/components/ui/sonner";
import { useStore } from "@/store/useStore";

export function AppShell({ children }: { children: ReactNode }) {
  useI18n(); // sync direction
  useThemeSync();
  const { direction } = useI18n();
  const location = useLocation();
  const isSidebarCollapsed = useStore((s) => s.isSidebarCollapsed);

  const mainPadding = direction === "rtl" 
    ? (isSidebarCollapsed ? "md:pr-[80px]" : "md:pr-64") 
    : (isSidebarCollapsed ? "md:pl-[80px]" : "md:pl-64");

  return (
    <div className={`min-h-screen bg-background ${direction === "rtl" ? "font-arabic" : ""}`}>
      <TopNav />
      <Sidebar />
      <main className={`${mainPadding} pt-16 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0 min-h-screen transition-all duration-300 ease-in-out`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="p-4 md:p-8 max-w-[1600px] mx-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <MobileNavigation />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}
