import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";

export function MessagingPage() {
  const { pick } = useI18n();
  const threads = useStore((s) => s.messageThreads);
  const send = useStore((s) => s.sendMessage);
  const [activeId, setActiveId] = useState(threads[0]?.id);
  const [draft, setDraft] = useState("");
  const active = threads.find((t) => t.id === activeId);

  const handleSend = () => {
    if (!draft.trim() || !active) return;
    send(active.id, { id: crypto.randomUUID(), from: "me", content: draft, timestamp: new Date().toISOString(), isRead: true });
    setDraft("");
  };

  return (
    <div>
      <PageHeader title={pick("Messagerie", "المراسلة", "Messaging")} />

      <Card className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] h-[600px]">
        <div className="border-e overflow-y-auto">
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={`w-full text-start p-4 border-b hover:bg-muted/50 transition-colors ${activeId === t.id ? "bg-brand-50" : ""}`}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="font-medium text-sm truncate">{t.title}</div>
                {t.unread > 0 && <span className="text-[10px] bg-danger text-white rounded-full px-1.5 py-0.5">{t.unread}</span>}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{t.participant}</div>
              <div className="text-xs text-muted-foreground mt-2 truncate">{t.messages[t.messages.length - 1]?.content}</div>
            </button>
          ))}
        </div>

        <div className="flex flex-col">
          {active && (
            <>
              <div className="p-4 border-b">
                <div className="font-semibold text-sm">{active.title}</div>
                <div className="text-xs text-muted-foreground">{active.participant}</div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
                {active.messages.map((m) => (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${m.from === "me" ? "ms-auto gradient-brand text-white" : "bg-card border"}`}>
                    <div className="text-sm">{m.content}</div>
                    <div className={`text-[10px] mt-1 ${m.from === "me" ? "text-white/70" : "text-muted-foreground"}`}>{new Date(m.timestamp).toLocaleString()}</div>
                  </motion.div>
                ))}
              </div>
              <div className="p-3 border-t flex gap-2">
                <Input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder={pick("Écrire un message…", "اكتب رسالة…", "Write a message…")} className="rounded-xl" />
                <Button onClick={handleSend} className="gradient-brand text-white border-0"><Send className="w-4 h-4" /></Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
