import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { useI18n } from "@/hooks/useI18n";
import { useThemeSync } from "@/hooks/useTheme";
import { Toaster } from "@/components/ui/sonner";

export function AppShell({ children }: { children: ReactNode }) {
  useI18n(); // sync direction
  useThemeSync();
  const { direction } = useI18n();
  const location = useLocation();

  return (
    <div className={`min-h-screen bg-background ${direction === "rtl" ? "font-arabic" : ""}`}>
      <TopNav />
      <Sidebar />
      <main className={`${direction === "rtl" ? "md:pr-64" : "md:pl-64"} pt-16 min-h-screen`}>
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
