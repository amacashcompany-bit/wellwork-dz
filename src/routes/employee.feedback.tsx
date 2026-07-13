import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Send } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { AnonymousBanner } from "@/components/shared/AnonymousBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";

export const Route = createFileRoute("/employee/feedback")({
  head: () => ({ meta: [{ title: "Feedback anonyme — QVT-Care" }] }),
  component: FeedbackPage,
});

const categories = [
  { id: "suggestion", emoji: "💡", fr: "Suggestion", ar: "اقتراح", en: "Suggestion" },
  { id: "conflict", emoji: "⚔️", fr: "Conflit", ar: "نزاع", en: "Conflict" },
  { id: "harassment", emoji: "🚫", fr: "Harcèlement", ar: "تحرش", en: "Harassment" },
  { id: "grievance", emoji: "📢", fr: "Plainte", ar: "شكوى", en: "Grievance" },
  { id: "idea", emoji: "💡", fr: "Idée", ar: "فكرة", en: "Idea" },
  { id: "other", emoji: "❓", fr: "Autre", ar: "آخر", en: "Other" },
];

function FeedbackPage() {
  const { pick, t } = useI18n();
  const addPost = useStore((s) => s.addAnonymousPost);
  const posts = useStore((s) => s.anonymousPosts);
  const [category, setCategory] = useState("suggestion");
  const [severity, setSeverity] = useState("low");
  const [content, setContent] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const [checkCode, setCheckCode] = useState("");
  const [foundPost, setFoundPost] = useState<typeof posts[0] | null>(null);

  const submit = () => {
    if (!content.trim()) return;
    const token = "REF-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    addPost({
      id: crypto.randomUUID(), token, category: category as "suggestion",
      severity: severity as "low", content, upvotes: 0, replies: [],
      createdAt: new Date().toISOString().slice(0, 10), sentiment: "neutral",
    });
    setSent(token);
    setContent("");
    toast.success(pick("Message reçu anonymement", "تم استلام رسالتك بشكل مجهول", "Message received anonymously"));
  };

  const checkReply = () => {
    const p = posts.find((x) => x.token.toLowerCase() === checkCode.trim().toLowerCase());
    setFoundPost(p ?? null);
    if (!p) toast.error(pick("Code introuvable", "الرمز غير موجود", "Code not found"));
  };

  const copy = (v: string) => { navigator.clipboard.writeText(v); toast.success(t("copied")); };

  return (
    <div>
      <PageHeader title={pick("Feedback anonyme", "رأي مجهول", "Anonymous Feedback")} />
      <AnonymousBanner />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-2xl">
          <div className="font-semibold mb-4">{pick("Nouveau message", "رسالة جديدة", "New message")}</div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">{pick("Catégorie", "الفئة", "Category")} *</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.emoji} {pick(c.fr, c.ar, c.en)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">{pick("Sévérité (optionnel)", "الخطورة (اختياري)", "Severity (optional)")}</label>
              <RadioGroup value={severity} onValueChange={setSeverity} className="flex gap-4 mt-2">
                {[["low", pick("Faible","منخفض","Low")], ["medium", pick("Moyenne","متوسط","Medium")], ["high", pick("Haute","مرتفع","High")]].map(([v, l]) => (
                  <label key={v as string} className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value={v as string} /> <span className="text-sm">{l}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">{pick("Message", "الرسالة", "Message")} *</label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="rounded-xl mt-1 min-h-[140px]" maxLength={2000} placeholder={pick("Écrivez librement…", "اكتب بحرية…", "Write freely…")} />
              <div className="text-xs text-muted-foreground mt-1 text-end">{content.length} / 2000</div>
            </div>
            <Button onClick={submit} className="w-full gradient-brand text-white border-0 gap-2 h-11"><Send className="w-4 h-4" /> {pick("Envoyer anonymement", "إرسال بشكل مجهول", "Send anonymously")}</Button>

            {sent && (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 rounded-2xl bg-brand-50 border border-brand/20 text-center">
                <div className="text-xs uppercase text-brand font-semibold">{t("yourTrackingCode")}</div>
                <div className="text-xl font-mono font-bold mt-1">{sent}</div>
                <Button size="sm" variant="outline" onClick={() => copy(sent)} className="mt-2"><Copy className="w-3.5 h-3.5 me-1" /> {t("copy")}</Button>
              </motion.div>
            )}
          </div>
        </Card>

        <Card className="p-6 rounded-2xl">
          <div className="font-semibold mb-4">{pick("Vérifier une réponse RH", "التحقق من رد الإدارة", "Check HR reply")}</div>
          <div className="flex gap-2">
            <Input value={checkCode} onChange={(e) => setCheckCode(e.target.value)} placeholder="REF-XXXXX" className="rounded-xl font-mono" />
            <Button onClick={checkReply} variant="outline">{pick("Vérifier", "تحقق", "Check")}</Button>
          </div>
          {foundPost && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-muted">
                <div className="text-[10px] uppercase text-muted-foreground">{pick("Votre message", "رسالتك", "Your message")}</div>
                <div className="text-sm mt-1">{foundPost.content}</div>
              </div>
              {foundPost.replies.length > 0 ? foundPost.replies.map((r) => (
                <div key={r.id} className="p-3 rounded-xl bg-brand-50 border border-brand/15">
                  <div className="text-[10px] uppercase text-brand font-semibold">{pick("Réponse RH", "رد الموارد البشرية", "HR reply")}</div>
                  <div className="text-sm mt-1">{r.content}</div>
                </div>
              )) : (
                <div className="text-sm text-muted-foreground text-center py-4">{pick("En attente d'une réponse RH.", "في انتظار رد من الإدارة.", "Awaiting HR reply.")}</div>
              )}
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
}
