import { Lock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useI18n } from "@/hooks/useI18n";

export function AnonymousBanner() {
  const { t, pick } = useI18n();
  return (
    <div className="mb-6 rounded-2xl border border-brand/20 bg-gradient-to-r from-brand-50 to-transparent p-4 md:p-5 flex items-start gap-4">
      <div className="relative">
        <div className="w-11 h-11 rounded-full bg-brand/15 flex items-center justify-center">
          <Lock className="w-5 h-5 text-brand" />
        </div>
        <span className="absolute inset-0 rounded-full ring-2 ring-brand/30 animate-ping" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm md:text-base text-ink">{t("anonymousBanner")}</div>
        <div className="text-xs md:text-sm text-muted-foreground mt-1">{t("anonymousBannerSub")}</div>
        <Popover>
          <PopoverTrigger className="mt-2 text-xs text-brand hover:underline font-medium">
            {t("howAnonymityWorks")} →
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">🎫</div>
                <div>
                  <div className="text-sm font-medium">{pick("Émission du jeton", "إصدار الرمز", "Token issuance")}</div>
                  <div className="text-xs text-muted-foreground">{pick("Un jeton unique par session, jamais lié à votre compte.", "رمز فريد لكل جلسة، غير مرتبط بحسابك.", "One unique token per session, never tied to your account.")}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">🔐</div>
                <div>
                  <div className="text-sm font-medium">{pick("Hachage cryptographique", "تجزئة تشفيرية", "Cryptographic hashing")}</div>
                  <div className="text-xs text-muted-foreground">{pick("Toutes les réponses sont hachées côté client (SHA-256).", "كل الإجابات مُجزَّأة على العميل (SHA-256).", "All answers are hashed client-side (SHA-256).")}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">📊</div>
                <div>
                  <div className="text-sm font-medium">{pick("Agrégation k≥6", "التجميع k≥6", "Aggregation k≥6")}</div>
                  <div className="text-xs text-muted-foreground">{pick("Données agrégées en groupes d'au moins 6 pour prévenir toute ré-identification.", "بيانات مجمّعة في مجموعات ≥6 لمنع التعريف.", "Data aggregated in groups of ≥6 to prevent re-identification.")}</div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
