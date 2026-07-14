import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { AnonymousBanner } from "@/components/shared/AnonymousBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/hooks/useI18n";
import { useMySpace } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { encryptWithKey, generateTicketKey, sha256Hex } from "@/lib/anonymity";

export const Route = createFileRoute("/employee/feedback")({
  head: () => ({ meta: [{ title: "Feedback anonyme — Wellwork" }] }),
  component: FeedbackPage,
});

const categories = [
  { id: "suggestion", emoji: "💡", label: "Suggestion" },
  { id: "harassment", emoji: "🚫", label: "Harcèlement" },
  { id: "workload", emoji: "⚖️", label: "Charge de travail" },
  { id: "management", emoji: "👥", label: "Management" },
  { id: "safety", emoji: "🦺", label: "Sécurité" },
  { id: "other", emoji: "❓", label: "Autre" },
] as const;

function FeedbackPage() {
  const { pick, t } = useI18n();
  const { info } = useMySpace();
  const [category, setCategory] = useState<string>("suggestion");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [sentKey, setSentKey] = useState<string | null>(null);

  const submit = async () => {
    if (!info?.spaceId || !content.trim() || !subject.trim()) return;
    setBusy(true);
    try {
      const key = generateTicketKey();
      const [encSubj, encBody, keyHash] = await Promise.all([
        encryptWithKey(subject.trim(), info.spaceId),
        encryptWithKey(content.trim(), info.spaceId),
        sha256Hex(key),
      ]);
      const { error } = await supabase.from("feedback_tickets").insert({
        space_id: info.spaceId,
        category: category as "suggestion",
        encrypted_subject: encSubj,
        encrypted_content: encBody,
        ticket_key_hash: keyHash,
      });
      if (error) throw error;
      setSentKey(key);
      setSubject(""); setContent("");
      toast.success(pick("Signalement envoyé anonymement", "تم إرسال البلاغ بشكل مجهول", "Report sent anonymously"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setBusy(false);
    }
  };

  const copyKey = () => { if (sentKey) { navigator.clipboard.writeText(sentKey); toast.success(t("copied")); } };

  return (
    <div>
      <PageHeader
        title={pick("Signalement anonyme", "بلاغ مجهول", "Anonymous Report")}
        subtitle={pick("Contenu chiffré côté client. Seul votre code de suivi permet de consulter la réponse RH.", "المحتوى مشفر من جانبك. رمز التتبع هو الوحيد الذي يفتح رد الإدارة.", "Client-side encrypted. Only your tracking key opens the HR reply.")}
      />
      <AnonymousBanner />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-6 rounded-2xl">
          <div className="font-semibold mb-4">{pick("Nouveau signalement", "بلاغ جديد", "New report")}</div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Catégorie *</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.emoji} {c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Sujet *</label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={140} className="rounded-xl mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Message *</label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="rounded-xl mt-1 min-h-[160px]" maxLength={4000} />
              <div className="text-xs text-muted-foreground mt-1 text-end">{content.length} / 4000</div>
            </div>
            <Button onClick={submit} disabled={busy || !subject.trim() || !content.trim()} className="w-full gradient-brand text-white border-0 gap-2 h-11">
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Envoyer chiffré</>}
            </Button>

            {sentKey && (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-5 rounded-2xl bg-brand-50 border border-brand/20 text-center">
                <div className="text-xs uppercase text-brand font-semibold">{t("yourTrackingCode")}</div>
                <div className="text-xl font-mono font-bold mt-2">{sentKey}</div>
                <div className="text-xs text-muted-foreground mt-3 max-w-sm mx-auto">
                  Ce code n'est visible qu'une fois. Sans lui, personne — pas même vous — ne peut relire ce signalement.
                </div>
                <Button size="sm" variant="outline" onClick={copyKey} className="mt-3"><Copy className="w-3.5 h-3.5 me-1" /> {t("copy")}</Button>
              </motion.div>
            )}
          </div>
        </Card>

        <Card className="p-6 rounded-2xl bg-muted/30">
          <div className="font-semibold mb-3">Comment fonctionne l'anonymat ?</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>✓ Aucun identifiant utilisateur n'est stocké avec votre signalement.</li>
            <li>✓ Le contenu est chiffré (AES-GCM 256) avec une clé générée dans votre navigateur.</li>
            <li>✓ Seul le <em>hash</em> de cette clé est stocké côté serveur.</li>
            <li>✓ Sans le code de suivi, ni les RH ni Wellwork ne peuvent lire le contenu.</li>
            <li>✓ Aucune IP, aucun email, aucun user-agent lié à ce ticket.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
