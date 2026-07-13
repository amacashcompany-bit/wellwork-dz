import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export function useThemeSync() {
  const isDarkMode = useStore((s) => s.isDarkMode);
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
}
