import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, Loader2, ShieldQuestion } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/hooks/useI18n";
import { useMySpace } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { decryptWithKey, sha256Hex } from "@/lib/anonymity";

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

function AnonymousPage() {
  const { pick } = useI18n();
  const { info } = useMySpace();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("all");
  const [keyInput, setKeyInput] = useState<Record<string, string>>({});
  const [decrypted, setDecrypted] = useState<Record<string, { subject: string; body: string }>>({});
  const [busy, setBusy] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!info?.spaceId) return;
    supabase.from("feedback_tickets").select("*").eq("space_id", info.spaceId).order("created_at", { ascending: false })
      .then(({ data }) => { setTickets((data ?? []) as Ticket[]); setLoading(false); });
  }, [info?.spaceId]);

  const filtered = tickets.filter((t) => filter === "all" || t.status === filter);

  const decrypt = async (t: Ticket) => {
    const raw = keyInput[t.id]?.trim();
    if (!raw) return toast.error("Clé requise");
    setBusy((b) => ({ ...b, [t.id]: true }));
    try {
      const hash = await sha256Hex(raw);
      const row = await supabase.from("feedback_tickets").select("ticket_key_hash").eq("id", t.id).maybeSingle();
      if (row.data?.ticket_key_hash !== hash) { toast.error("Clé invalide"); return; }
      const [subject, body] = await Promise.all([
        decryptWithKey(t.encrypted_subject, raw),
        decryptWithKey(t.encrypted_content, raw),
      ]);
      setDecrypted((d) => ({ ...d, [t.id]: { subject, body } }));
    } finally { setBusy((b) => ({ ...b, [t.id]: false })); }
  };

  const updateStatus = async (id: string, status: "open" | "under_review" | "resolved" | "closed") => {
    const { error } = await supabase.from("feedback_tickets").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setTickets((ts) => ts.map((t) => t.id === id ? { ...t, status } : t));
    toast.success("Statut mis à jour");
  };

  return (
    <div>
      <PageHeader
        title={pick("Espace anonyme — modération RH", "الفضاء المجهول — الإدارة", "Anonymous Space — HR")}
        subtitle={pick("Signalements chiffrés. Chaque ticket nécessite la clé de suivi du déclarant pour être déchiffré.", "بلاغات مشفرة. كل تذكرة تتطلب مفتاح المُبلِّغ.", "Encrypted reports. Each ticket needs the reporter's tracking key to decrypt.")}
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

                  {dec ? (
                    <>
                      <div className="font-semibold text-sm mb-1">{dec.subject}</div>
                      <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">{dec.body}</p>
                    </>
                  ) : (
                    <div className="rounded-xl bg-muted/50 border p-4">
                      <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5" /> Contenu chiffré · saisissez la clé fournie par le déclarant
                      </div>
                      <div className="flex gap-2">
                        <Input value={keyInput[t.id] ?? ""} onChange={(e) => setKeyInput((k) => ({ ...k, [t.id]: e.target.value }))} placeholder="WW-XXXXXXXX" className="rounded-xl font-mono text-sm" />
                        <Button onClick={() => decrypt(t)} disabled={busy[t.id]} variant="outline">
                          {busy[t.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : "Déchiffrer"}
                        </Button>
                      </div>
                    </div>
                  )}

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
