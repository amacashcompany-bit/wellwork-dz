import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Send, Loader2, KeyRound, MessageSquare, Search } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { AnonymousBanner } from "@/components/shared/AnonymousBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/hooks/useI18n";
import { useMySpace } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { encryptWithKey, decryptWithKey, generateTicketKey, sha256Hex } from "@/lib/anonymity";

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

type FeedbackTicket = {
  id: string;
  category: string;
  status: string;
  encrypted_subject: string;
  encrypted_content: string;
  created_at: string;
};

type TicketMessage = {
  id: string;
  author_role: "reporter" | "hr";
  encrypted_content: string;
  created_at: string;
};

function FeedbackPage() {
  const { pick, t } = useI18n();
  const { info } = useMySpace();
  const [activeTab, setActiveTab] = useState<string>("new");

  const [category, setCategory] = useState<string>("suggestion");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [sentKey, setSentKey] = useState<string | null>(null);

  const [trackKey, setTrackKey] = useState("");
  const [tracking, setTracking] = useState(false);
  const [trackedTicket, setTrackedTicket] = useState<FeedbackTicket | null>(null);
  const [decryptedTicket, setDecryptedTicket] = useState<{ subject: string; body: string } | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [decryptedMessages, setDecryptedMessages] = useState<Record<string, string>>({});
  
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);

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

  const handleTrack = async () => {
    const raw = trackKey.trim();
    if (!raw) return toast.error(pick("Veuillez saisir votre clé de suivi", "الرجاء إدخال رمز التتبع", "Please enter your tracking key"));
    setTracking(true);
    setTrackedTicket(null);
    setDecryptedTicket(null);
    setMessages([]);
    setDecryptedMessages({});
    try {
      const hash = await sha256Hex(raw);
      const { data: ticketsData, error: ticketError } = await (supabase.rpc as any)("get_ticket_by_hash", { p_hash: hash });
      if (ticketError) throw ticketError;
      if (!ticketsData || (ticketsData as any).length === 0) {
        toast.error(pick("Clé de suivi introuvable ou incorrecte", "رمز التتبع غير موجود", "Tracking key not found or incorrect"));
        return;
      }

      const ticket = (ticketsData as any)[0] as FeedbackTicket;
      setTrackedTicket(ticket);

      const [decSubj, decBody] = await Promise.all([
        decryptWithKey(ticket.encrypted_subject, info?.spaceId || ""),
        decryptWithKey(ticket.encrypted_content, info?.spaceId || ""),
      ]);
      setDecryptedTicket({ subject: decSubj, body: decBody });

      const { data: messagesData, error: msgError } = await (supabase.rpc as any)("get_ticket_messages", { 
        p_ticket_id: ticket.id, 
        p_hash: hash 
      });
      if (msgError) throw msgError;

      const thread = (messagesData ?? []) as TicketMessage[];
      setMessages(thread);

      const decMsgs: Record<string, string> = {};
      await Promise.all(
        thread.map(async (m) => {
          decMsgs[m.id] = await decryptWithKey(m.encrypted_content, info?.spaceId || "");
        })
      );
      setDecryptedMessages(decMsgs);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setTracking(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !trackedTicket || !info?.spaceId) return;
    setReplying(true);
    try {
      const hash = await sha256Hex(trackKey.trim());
      const encReply = await encryptWithKey(replyText.trim(), info.spaceId);

      const { error } = await (supabase.rpc as any)("reply_to_ticket_anonymously", {
        p_ticket_id: trackedTicket.id,
        p_hash: hash,
        p_encrypted_content: encReply
      });

      if (error) throw error;

      toast.success(pick("Message envoyé anonymement", "تم إرسال الرسالة بشكل مجهول", "Message sent anonymously"));
      setReplyText("");
      await handleTrack();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setReplying(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={pick("Signalement anonyme", "بلاغ مجهول", "Anonymous Report")}
        subtitle={pick("Contenu chiffré. Suivez vos signalements de manière sécurisée et anonyme.", "المحتوى مشفر. تتبع بلاغاتك بشكل آمن ومجهول.", "Encrypted content. Track your reports securely and anonymously.")}
      />
      <AnonymousBanner />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="new">{pick("Nouveau signalement", "بلاغ جديد", "New report")}</TabsTrigger>
          <TabsTrigger value="track">{pick("Suivi de mon signalement", "تتبع بلاغي", "Track my report")}</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <li>✓ Le contenu est chiffré (AES-GCM 256) avec l'identifiant de l'Espace.</li>
                <li>✓ Seul le <em>hash</em> du code de suivi est stocké côté serveur pour le routage.</li>
                <li>✓ Aucune IP, aucun email, aucun user-agent lié à ce ticket.</li>
              </ul>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="track">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 rounded-2xl lg:col-span-1 h-fit">
              <div className="font-semibold mb-4">{pick("Consulter un signalement", "التحقق من بلاغ", "Track Report")}</div>
              <p className="text-xs text-muted-foreground mb-4">
                Saisissez le code de suivi qui vous a été fourni lors de l'envoi de votre signalement.
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                  <Input 
                    value={trackKey} 
                    onChange={(e) => setTrackKey(e.target.value)} 
                    placeholder="WW-XXXXXXXXXXXX" 
                    className="pl-9 rounded-xl font-mono"
                  />
                </div>
                <Button onClick={handleTrack} disabled={tracking} className="w-full gap-2 rounded-xl">
                  {tracking ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Search className="w-4 h-4" /> Rechercher</>}
                </Button>
              </div>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              {trackedTicket && decryptedTicket ? (
                <>
                  <Card className="p-6 rounded-2xl">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">#{trackedTicket.id.slice(0, 8)}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand capitalize">{trackedTicket.category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${trackedTicket.status === "resolved" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{trackedTicket.status}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(trackedTicket.created_at).toLocaleDateString()}</span>
                    </div>

                    <div className="border-b pb-4 mb-4">
                      <h3 className="font-semibold text-lg">{decryptedTicket.subject}</h3>
                      <p className="text-sm text-foreground/90 whitespace-pre-line mt-2 leading-relaxed">{decryptedTicket.body}</p>
                    </div>

                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-4">
                      <div className="text-xs text-center text-muted-foreground uppercase tracking-wider my-2 flex items-center justify-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" /> Fil de discussion anonyme
                      </div>
                      {messages.length === 0 ? (
                        <p className="text-xs text-center text-muted-foreground py-4">Aucune réponse pour le moment. Vous serez notifié ici dès qu'un modérateur répondra.</p>
                      ) : (
                        messages.map((m) => {
                          const isReporter = m.author_role === "reporter";
                          return (
                            <div key={m.id} className={`flex flex-col ${isReporter ? "items-end" : "items-start"}`}>
                              <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${isReporter ? "bg-brand text-white rounded-tr-none" : "bg-muted rounded-tl-none"}`}>
                                {decryptedMessages[m.id] || "..."}
                              </div>
                              <span className="text-[10px] text-muted-foreground mt-1 px-1">
                                {isReporter ? "Vous (anonyme)" : "RH Modérateur"} · {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="flex gap-2 items-end pt-2 border-t">
                      <Textarea 
                        value={replyText} 
                        onChange={(e) => setReplyText(e.target.value)} 
                        placeholder="Écrire un message anonyme..." 
                        rows={1}
                        className="rounded-xl min-h-[40px] resize-none"
                      />
                      <Button onClick={handleSendReply} disabled={replying || !replyText.trim()} size="icon" className="shrink-0 rounded-xl gradient-brand text-white">
                        {replying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </Button>
                    </div>
                  </Card>
                </>
              ) : (
                <Card className="p-12 rounded-3xl text-center border-dashed border-2 flex flex-col items-center justify-center min-h-[300px]">
                  <MessageSquare className="w-10 h-10 text-muted-foreground mb-3" />
                  <div className="font-semibold text-muted-foreground">Aucun signalement sélectionné</div>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                    Saisissez votre clé de suivi dans le panneau de gauche pour consulter l'historique et échanger avec les ressources humaines.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
