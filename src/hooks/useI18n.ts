import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { t as translate, type DictKey } from "@/lib/i18n";

export function useI18n() {
  const language = useStore((s) => s.language);
  const direction = useStore((s) => s.direction);
  const setLanguage = useStore((s) => s.setLanguage);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  return {
    language,
    direction,
    setLanguage,
    t: (key: DictKey) => translate(key, language),
    pick: <T,>(fr: T, ar: T, en: T): T => (language === "ar" ? ar : language === "en" ? en : fr),
  };
}
