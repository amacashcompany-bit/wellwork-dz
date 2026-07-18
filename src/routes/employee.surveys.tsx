import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, ChevronLeft, ChevronRight, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { AnonymousBanner } from "@/components/shared/AnonymousBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/hooks/useI18n";
import { useMySpace } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/employee/surveys")({
  head: () => ({ meta: [{ title: "Mes questionnaires — QVT-Care" }] }),
  component: SurveysPage,
});

const emojis = ["😫", "😕", "😐", "🙂", "😄"];

interface StepDef {
  title: { fr: string; ar: string; en: string };
  questions: { key: string; label: { fr: string; ar: string; en: string }; type?: "text" }[];
}

const steps: StepDef[] = [
  {
    title: { fr: "Énergie & humeur", ar: "الطاقة والمزاج", en: "Energy & mood" },
    questions: [
      {
        key: "q1",
        label: {
          fr: "Comment vous sentez-vous aujourd'hui ?",
          ar: "كيف تشعر اليوم؟",
          en: "How do you feel today?",
        },
      },
      {
        key: "q2",
        label: {
          fr: "Votre niveau d'énergie cette semaine",
          ar: "مستوى طاقتك هذا الأسبوع",
          en: "Your energy this week",
        },
      },
    ],
  },
  {
    title: { fr: "Charge & autonomie", ar: "العبء والاستقلالية", en: "Workload & autonomy" },
    questions: [
      {
        key: "q3",
        label: {
          fr: "Ma charge de travail est raisonnable",
          ar: "عبء عملي معقول",
          en: "My workload is reasonable",
        },
      },
      {
        key: "q4",
        label: {
          fr: "J'ai la liberté d'organiser mon travail",
          ar: "لدي الحرية في تنظيم عملي",
          en: "I have the freedom to organize my work",
        },
      },
      {
        key: "q5",
        label: {
          fr: "J'arrive à terminer mes tâches dans les délais",
          ar: "أستطيع إنجاز مهامي في الوقت",
          en: "I complete my tasks on time",
        },
      },
    ],
  },
  {
    title: { fr: "Soutien & reconnaissance", ar: "الدعم والتقدير", en: "Support & recognition" },
    questions: [
      {
        key: "q6",
        label: {
          fr: "Mon manager me soutient quand j'en ai besoin",
          ar: "مديري يدعمني عند الحاجة",
          en: "My manager supports me when needed",
        },
      },
      {
        key: "q7",
        label: { fr: "Mon travail est reconnu", ar: "عملي معترف به", en: "My work is recognized" },
      },
      {
        key: "q8",
        label: {
          fr: "La communication interne est claire",
          ar: "التواصل الداخلي واضح",
          en: "Internal communication is clear",
        },
      },
    ],
  },
  {
    title: { fr: "Environnement & équilibre", ar: "البيئة والتوازن", en: "Environment & balance" },
    questions: [
      {
        key: "q9",
        label: {
          fr: "Mon poste est physiquement confortable",
          ar: "مكان عملي مريح جسدياً",
          en: "My workstation is physically comfortable",
        },
      },
      {
        key: "q10",
        label: {
          fr: "Je parviens à déconnecter en dehors du travail",
          ar: "أستطيع الانفصال عن العمل",
          en: "I can disconnect outside of work",
        },
      },
      {
        key: "q11",
        label: {
          fr: "Quelque chose à ajouter ? (optionnel)",
          ar: "هل هناك ما تريد إضافته؟ (اختياري)",
          en: "Anything to add? (optional)",
        },
        type: "text",
      },
    ],
  },
];

function SurveysPage() {
  const { pick, t } = useI18n();
  const { info } = useMySpace();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [done, setDone] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const stepData = steps[step];
  const isLast = step === steps.length - 1;

  const next = async () => {
    if (isLast) {
      if (!info?.spaceId || submitting) return;
      setSubmitting(true);
      try {
        const completeAnswers = Object.fromEntries(
          Array.from({ length: 10 }, (_, index) => {
            const key = `q${index + 1}`;
            return [key, Number(answers[key] ?? 3)];
          }),
        ) as Record<string, number | string>;
        if (String(answers.q11 ?? "").trim()) completeAnswers.q11 = String(answers.q11).trim();

        // Generated database types are refreshed separately after migrations deploy.
        const submitPulse = supabase.rpc.bind(supabase) as unknown as (
          functionName: "submit_weekly_wellbeing_pulse",
          params: { _space_id: string; _answers: Record<string, number | string> },
        ) => PromiseLike<{ data: string | null; error: { message: string } | null }>;
        const { data, error } = await submitPulse("submit_weekly_wellbeing_pulse", {
          _space_id: info.spaceId,
          _answers: completeAnswers,
        });
        if (error) throw new Error(error.message);

        setRefCode(data || "PULSE-SAVED");
        setDone(true);
        setTimeout(
          () =>
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 },
              colors: ["#0d9488", "#10b981", "#14b8a6", "#0f172a"],
            }),
          200,
        );
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : pick(
                "Impossible d'enregistrer vos reponses.",
                "تعذر حفظ إجاباتك.",
                "Unable to save your answers.",
              ),
        );
      } finally {
        setSubmitting(false);
      }
    } else {
      setDir(1);
      setStep(step + 1);
    }
  };
  const prev = () => {
    setDir(-1);
    setStep(Math.max(0, step - 1));
  };

  const copy = () => {
    navigator.clipboard.writeText(refCode);
    toast.success(t("copied"));
  };

  const textVal = String(answers.q11 ?? "");
  const sentiment =
    textVal.length === 0
      ? null
      : /(super|excellent|top|good|great|content|جيد|ممتاز|رائع)/i.test(textVal)
        ? "positive"
        : /(mauvais|difficile|nul|stressé|épuisé|سيء|صعب|متعب|مرهق)/i.test(textVal)
          ? "negative"
          : "neutral";

  if (done) {
    return (
      <div>
        <PageHeader title={pick("Mes questionnaires", "استبياناتي", "My Surveys")} />
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="p-10 rounded-3xl text-center gradient-hero border-brand/20 max-w-2xl mx-auto">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold">
              {pick(
                "Merci pour votre participation !",
                "شكراً لمشاركتك!",
                "Thank you for participating!",
              )}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              {pick(
                "Vos réponses ont été agrégées de manière totalement anonyme.",
                "تم دمج إجاباتك بشكل مجهول تماماً.",
                "Your answers have been aggregated fully anonymously.",
              )}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/70 border px-5 py-4">
              <div className="text-start">
                <div className="text-[10px] uppercase text-muted-foreground">
                  {t("yourTrackingCode")}
                </div>
                <div className="text-lg font-mono font-bold">{refCode}</div>
              </div>
              <Button size="sm" variant="outline" onClick={copy}>
                <Copy className="w-4 h-4 me-1" /> {t("copy")}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {pick(
                "Ce code confirme uniquement l'enregistrement anonyme de cette participation.",
                "يؤكد هذا الرمز فقط تسجيل هذه المشاركة بشكل مجهول.",
                "This code only confirms that this anonymous participation was saved.",
              )}
            </p>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={pick("Mes questionnaires", "استبياناتي", "My Surveys")}
        subtitle={pick(
          "Pulse hebdomadaire · 4 étapes · 3 minutes",
          "النبض الأسبوعي · 4 خطوات · 3 دقائق",
          "Weekly pulse · 4 steps · 3 minutes",
        )}
      />
      <AnonymousBanner />

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-6 max-w-2xl mx-auto">
        {steps.map((_, i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i < step ? "gradient-brand text-white" : i === step ? "border-2 border-brand text-brand" : "bg-muted text-muted-foreground"}`}
            >
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${i < step ? "bg-brand" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      <Card className="p-6 md:p-8 rounded-3xl max-w-2xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ x: dir > 0 ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir > 0 ? -100 : 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-xs text-brand font-semibold uppercase mb-1">
              {pick("Étape", "خطوة", "Step")} {step + 1}/{steps.length}
            </div>
            <h3 className="text-xl font-bold mb-6">
              {pick(stepData.title.fr, stepData.title.ar, stepData.title.en)}
            </h3>

            <div className="space-y-6">
              {stepData.questions.map((q) => (
                <div key={q.key}>
                  <label className="text-sm font-medium">
                    {pick(q.label.fr, q.label.ar, q.label.en)}
                  </label>
                  {q.type === "text" ? (
                    <>
                      <Textarea
                        value={String(answers[q.key] ?? "")}
                        onChange={(e) => setAnswers((a) => ({ ...a, [q.key]: e.target.value }))}
                        className="mt-2 rounded-xl min-h-[100px]"
                        maxLength={500}
                      />
                      <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                        <span>{textVal.length} / 500</span>
                        {sentiment && (
                          <span
                            className={`px-2 py-0.5 rounded-full ${sentiment === "positive" ? "bg-success/10 text-success" : sentiment === "negative" ? "bg-danger/10 text-danger" : "bg-warning/15 text-warning"}`}
                          >
                            {sentiment === "positive"
                              ? "🟢"
                              : sentiment === "negative"
                                ? "🔴"
                                : "🟡"}{" "}
                            {sentiment}
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="mt-4">
                      <Slider
                        value={[(answers[q.key] as number) ?? 3]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(v) => setAnswers((a) => ({ ...a, [q.key]: v[0] }))}
                      />
                      <div className="flex justify-between mt-3 text-2xl">
                        {emojis.map((e, i) => (
                          <span
                            key={i}
                            className={`transition-all ${((answers[q.key] as number) ?? 3) === i + 1 ? "scale-125" : "opacity-40"}`}
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button variant="outline" onClick={prev} disabled={step === 0}>
            <ChevronLeft className="w-4 h-4 me-1" /> {t("previous")}
          </Button>
          <Button
            onClick={next}
            disabled={submitting || !info?.spaceId}
            className="gradient-brand text-white border-0"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {isLast ? t("finish") : t("next")} <ChevronRight className="w-4 h-4 ms-1" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
