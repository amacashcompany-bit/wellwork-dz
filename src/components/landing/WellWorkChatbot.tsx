import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronRight, ExternalLink, MessageCircle, Mic, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/hooks/useI18n";
import { getInstantWellWorkAnswer, type WellWorkChatMessage } from "@/lib/wellwork-chat";
import logoMark from "@/assets/brand/wellwork-logo-mark.png";

type DisplayMessage = WellWorkChatMessage & {
  id: string;
};

type SpeechResultEvent = {
  results?: {
    [index: number]: {
      [index: number]: {
        transcript?: string;
      };
    };
  };
};

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: () => void;
  onend: () => void;
  onerror: () => void;
  onresult: (event: SpeechResultEvent) => void;
  start: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

const copy = {
  fr: {
    title: "Assistant WellWork",
    status: "Conseils sur la plateforme",
    greeting:
      "Bonjour, je suis l’assistant WellWork. Je peux vous guider sur les services, les plans, la démo gratuite et la création de votre espace.",
    placeholder: "Posez votre question…",
    open: "Besoin d’aide ?",
    close: "Fermer l’assistant",
    send: "Envoyer",
    listen: "Dicter une question",
    note: "Ne partagez aucune donnée personnelle ou confidentielle.",
    error: "Je n’arrive pas à répondre pour le moment. Réessayez dans quelques instants.",
    plans: "Voir les plans",
    demo: "Demander une démo",
    suggestions: [
      "Comment demander une démo gratuite ?",
      "Comment une entreprise crée son espace ?",
      "Comment un employé ouvre son compte ?",
      "Quels moyens de paiement sont disponibles ?",
    ],
  },
  ar: {
    title: "مساعد WellWork",
    status: "إرشاد حول المنصة",
    greeting:
      "مرحباً، أنا مساعد WellWork. يمكنني إرشادك حول خدمات المنصة والخطط والعرض التجريبي المجاني وإنشاء مساحة شركتك.",
    placeholder: "اكتب سؤالك…",
    open: "هل تحتاج مساعدة؟",
    close: "إغلاق المساعد",
    send: "إرسال",
    listen: "إملاء السؤال",
    note: "لا تشارك أي بيانات شخصية أو سرية.",
    error: "تعذر عليّ الرد الآن. يرجى المحاولة بعد قليل.",
    plans: "عرض الخطط",
    demo: "طلب عرض تجريبي",
    suggestions: [
      "كيف أطلب عرضاً تجريبياً مجانياً؟",
      "كيف تنشئ الشركة مساحتها؟",
      "كيف يفتح الموظف حسابه؟",
      "ما هي طرق الدفع المتاحة؟",
    ],
  },
  en: {
    title: "WellWork Assistant",
    status: "Platform guidance",
    greeting:
      "Hi, I’m the WellWork assistant. I can guide you through services, plans, the free demo, and creating your company space.",
    placeholder: "Ask your question…",
    open: "Need help?",
    close: "Close assistant",
    send: "Send",
    listen: "Dictate a question",
    note: "Do not share personal or confidential information.",
    error: "I can’t answer right now. Please try again in a moment.",
    plans: "View plans",
    demo: "Request a demo",
    suggestions: [
      "How do I request a free demo?",
      "How does a company create its space?",
      "How does an employee open an account?",
      "Which payment methods are available?",
    ],
  },
} as const;

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

export function WellWorkChatbot() {
  const { language } = useI18n();
  const text = copy[language];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const greeting = useMemo<DisplayMessage>(
    () => ({ id: `greeting-${language}`, role: "assistant", content: text.greeting }),
    [language, text.greeting],
  );
  const visibleMessages = useMemo(
    () => (messages.length === 0 ? [greeting] : messages),
    [greeting, messages],
  );

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const submit = (question = input) => {
    const content = question.trim();
    if (!content) return;

    const currentMessages = messages.length === 0 ? [greeting] : messages;
    const userMessage: DisplayMessage = { id: makeId(), role: "user", content };
    const assistantMessage: DisplayMessage = {
      id: makeId(),
      role: "assistant",
      content: getInstantWellWorkAnswer(content, language),
    };
    setMessages([...currentMessages, userMessage, assistantMessage]);
    setInput("");
  };

  const startListening = () => {
    const speechWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const SpeechRecognition =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = language === "ar" ? "ar-DZ" : language === "en" ? "en-US" : "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) setInput(transcript);
    };
    recognition.start();
  };

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-[80] sm:inset-x-auto sm:bottom-5 sm:end-5"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3 flex h-[min(650px,calc(100dvh-5rem))] w-full flex-col overflow-hidden rounded-lg border border-border bg-background shadow-[0_24px_70px_-20px_rgba(15,23,42,0.4)] sm:w-[390px]"
            role="dialog"
            aria-label={text.title}
          >
            <header className="relative overflow-hidden border-b border-border bg-primary px-4 py-3 text-primary-foreground">
              <div className="absolute inset-y-0 end-0 w-28 bg-leaf/15" />
              <div className="relative flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white shadow-sm">
                  <img src={logoMark} alt="" className="h-8 w-8 object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-sm font-semibold">{text.title}</h2>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-primary-foreground/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                    {text.status}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-primary-foreground hover:bg-white/10 hover:text-white"
                  onClick={() => setOpen(false)}
                  aria-label={text.close}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="flex items-center gap-2 border-b border-border bg-muted/35 px-3 py-2">
              <a
                href="/auth"
                className="gradient-leaf inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium text-white transition hover:opacity-90"
              >
                {text.demo} <ChevronRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/#pricing"
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-medium transition hover:bg-muted"
              >
                {text.plans} <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <ScrollArea className="min-h-0 flex-1 bg-muted/20">
              <div className="space-y-4 p-4" aria-live="polite">
                {visibleMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] whitespace-pre-wrap rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background text-foreground shadow-sm"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {messages.length === 0 && (
                  <div className="grid gap-2 pt-1">
                    {text.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => submit(suggestion)}
                        className="flex min-h-10 items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2 text-start text-xs font-medium transition hover:border-brand/40 hover:bg-brand/5"
                      >
                        <span>{suggestion}</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-brand" />
                      </button>
                    ))}
                  </div>
                )}

                <div ref={endRef} />
              </div>
            </ScrollArea>

            <footer className="border-t border-border bg-background p-3">
              <div className="flex items-end gap-2 rounded-lg border border-input bg-muted/20 p-1.5 focus-within:border-brand/50 focus-within:ring-2 focus-within:ring-brand/15">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, 1_200))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      submit();
                    }
                  }}
                  placeholder={text.placeholder}
                  rows={1}
                  className="max-h-24 min-h-9 resize-none border-0 bg-transparent px-2 py-2 text-sm shadow-none focus-visible:ring-0"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`h-9 w-9 shrink-0 ${listening ? "text-destructive" : "text-muted-foreground"}`}
                  onClick={startListening}
                  aria-label={text.listen}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  className="gradient-brand h-9 w-9 shrink-0 border-0 text-white hover:opacity-90"
                  onClick={() => submit()}
                  disabled={!input.trim()}
                  aria-label={text.send}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">{text.note}</p>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen(true)}
          className="ms-auto flex h-13 items-center gap-2 rounded-lg border border-white/15 bg-primary px-3 text-primary-foreground shadow-[0_12px_35px_-10px_rgba(15,23,42,0.55)] transition hover:bg-primary/95 sm:px-4"
          aria-label={text.open}
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-md bg-white">
            <img src={logoMark} alt="" className="h-7 w-7 object-contain" />
            <span className="absolute -end-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-leaf" />
          </span>
          <span className="hidden text-start sm:block">
            <span className="block text-xs font-semibold">{text.open}</span>
            <span className="block text-[10px] text-primary-foreground/65">{text.title}</span>
          </span>
          <MessageCircle className="h-4 w-4 sm:ms-1" />
        </motion.button>
      )}
    </div>
  );
}
