import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, Loader2, ShieldQuestion, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/hooks/useI18n";
import { useMySpace } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { encryptWithKey, decryptWithKey } from "@/lib/anonymity";

export const Route = createFileRoute("/admin/anonymous")({
  head: () => ({ meta: [{ title: "Espace Anonyme — Wellwork" }] }),
  component: AnonymousPage,
});

type Ticket = {
  id: string;
  category: string;
  status: string;
  encrypted_subject: string;
  encrypted_content: string;
  created_at: string;
};

type TicketMessage = {
  id: string;
  ticket_id: string;
  author_role: "reporter" | "hr";
  encrypted_content: string;
  created_at: string;
};

function AnonymousPage() {
  const { pick } = useI18n();
  const { info } = useMySpace();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("all");
  const [decrypted, setDecrypted] = useState<Record<string, { subject: string; body: string }>>({});
  
  // Chat messaging states
  const [messages, setMessages] = useState<Record<string, TicketMessage[]>>({});
  const [decryptedMessages, setDecryptedMessages] = useState<Record<string, string>>({});
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replying, setReplying] = useState<Record<string, boolean>>({});

  const loadData = async () => {
    if (!info?.spaceId) return;
    try {
      const { data: ticketsData } = await supabase
        .from("feedback_tickets")
        .select("*")
        .eq("space_id", info.spaceId)
        .order("created_at", { ascending: false });
      
      const ticketRows = (ticketsData ?? []) as Ticket[];
      setTickets(ticketRows);

      // Fetch all messages for this space
      const { data: messagesData } = await supabase
        .from("ticket_messages")
        .select("*")
        .eq("space_id", info.spaceId)
        .order("created_at", { ascending: true });

      const msgs = (messagesData ?? []) as TicketMessage[];
      
      // Group messages by ticket_id
      const msgMap: Record<string, TicketMessage[]> = {};
      msgs.forEach((m) => {
        if (!msgMap[m.ticket_id]) msgMap[m.ticket_id] = [];
        msgMap[m.ticket_id].push(m);
      });
      setMessages(msgMap);

      // Decrypt all ticket contents and message contents
      const decMap: Record<string, { subject: string; body: string }> = {};
      await Promise.all(
        ticketRows.map(async (t) => {
          const [subject, body] = await Promise.all([
            decryptWithKey(t.encrypted_subject, info.spaceId!),
            decryptWithKey(t.encrypted_content, info.spaceId!),
          ]);
          decMap[t.id] = { 
            subject: subject || "Contenu illisible (chiffrement hérité)", 
            body: body || "Ce message a été chiffré avec une ancienne clé de suivi." 
          };
        })
      );
      setDecrypted(decMap);

      const decMsgs: Record<string, string> = {};
      await Promise.all(
        msgs.map(async (m) => {
          decMsgs[m.id] = await decryptWithKey(m.encrypted_content, info.spaceId!);
        })
      );
      setDecryptedMessages(decMsgs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [info?.spaceId]);

  const filtered = tickets.filter((t) => filter === "all" || t.status === filter);

  const updateStatus = async (id: string, status: "open" | "under_review" | "resolved" | "closed") => {
    const { error } = await supabase.from("feedback_tickets").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setTickets((ts) => ts.map((t) => t.id === id ? { ...t, status } : t));
    toast.success("Statut mis à jour");
  };

  const handleSendReply = async (ticketId: string) => {
    const text = replyText[ticketId]?.trim();
    if (!text || !info?.spaceId) return;
    setReplying((r) => ({ ...r, [ticketId]: true }));
    try {
      const encReply = await encryptWithKey(text, info.spaceId);
      const { error } = await supabase
        .from("ticket_messages")
        .insert({
          ticket_id: ticketId,
          space_id: info.spaceId,
          author_role: "hr",
          encrypted_content: encReply
        });

      if (error) throw error;

      toast.success("Réponse envoyée");
      setReplyText((r) => ({ ...r, [ticketId]: "" }));
      await loadData();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setReplying((r) => ({ ...r, [ticketId]: false }));
    }
  };

  return (
    <div>
      <PageHeader
        title={pick("Espace anonyme — modération RH", "الفضاء المجهول — الإدارة", "Anonymous Space — HR")}
        subtitle={pick("Signalements chiffrés par espace. Tous les messages sont déchiffrés automatiquement pour votre espace de travail.", "بلاغات مشفرة حسب الفضاء. يتم فك تشفير جميع الرسائل تلقائياً لمساحة عملك.", "Space-encrypted reports. All messages are automatically decrypted for your workspace.")}
      />

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">Tous ({tickets.length})</TabsTrigger>
          <TabsTrigger value="open">Ouverts</TabsTrigger>
          <TabsTrigger value="resolved">Résolus</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-brand" /></div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 rounded-3xl text-center">
          <ShieldQuestion className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <div className="font-semibold">Aucun signalement</div>
          <p className="text-sm text-muted-foreground mt-1">Les signalements anonymes de vos employés apparaîtront ici.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((t, i) => {
            const dec = decrypted[t.id];
            const ticketMsgs = messages[t.id] ?? [];
            return (
              <motion.div key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card className="p-5 rounded-2xl">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{t.category}</Badge>
                      <Badge className={t.status === "resolved" ? "bg-success/10 text-success border-0" : t.status === "under_review" ? "bg-warning/15 text-warning border-0" : "bg-brand/10 text-brand border-0"}>
                        {t.status}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">#{t.id.slice(0, 8)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0">{new Date(t.created_at).toLocaleDateString()}</div>
                  </div>

                  <div className="mt-2 pb-3 border-b">
                    <div className="font-semibold text-sm mb-1">{dec?.subject || "Chargement..."}</div>
                    <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">{dec?.body || "Déchiffrement en cours..."}</p>
                  </div>

                  {/* Messaging thread */}
                  <div className="mt-4 space-y-3 pl-4 border-l-2 border-brand/20 max-h-[250px] overflow-y-auto pr-1">
                    <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-2">
                      <MessageSquare className="w-3.5 h-3.5" /> Échanges anonymes
                    </div>
                    {ticketMsgs.map((m) => {
                      const isHR = m.author_role === "hr";
                      return (
                        <div key={m.id} className={`flex flex-col ${isHR ? "items-end" : "items-start"}`}>
                          <div className={`p-2.5 rounded-2xl text-xs max-w-[85%] ${isHR ? "bg-brand text-white rounded-tr-none" : "bg-muted rounded-tl-none"}`}>
                            {decryptedMessages[m.id] || "..."}
                          </div>
                          <span className="text-[9px] text-muted-foreground mt-0.5 px-1">
                            {isHR ? "Vous (RH)" : "Déclarant (Anonyme)"} · {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Send response message form */}
                  <div className="mt-4 flex gap-2 items-end pt-3 border-t">
                    <Textarea 
                      value={replyText[t.id] ?? ""} 
                      onChange={(e) => setReplyText((r) => ({ ...r, [t.id]: e.target.value }))} 
                      placeholder="Répondre anonymement au déclarant..." 
                      rows={1}
                      className="rounded-xl min-h-[38px] resize-none text-xs"
                    />
                    <Button onClick={() => handleSendReply(t.id)} disabled={replying[t.id] || !(replyText[t.id] ?? "").trim()} size="icon" className="shrink-0 rounded-xl gradient-brand text-white w-9 h-9">
                      {replying[t.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {t.status !== "under_review" && <Button size="sm" variant="outline" onClick={() => updateStatus(t.id, "under_review")}>En cours</Button>}
                    {t.status !== "resolved" && <Button size="sm" variant="outline" onClick={() => updateStatus(t.id, "resolved")}>Résoudre</Button>}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
