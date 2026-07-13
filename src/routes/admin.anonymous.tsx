import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";

export const Route = createFileRoute("/admin/anonymous")({
  head: () => ({ meta: [{ title: "Espace Anonyme — QVT-Care" }] }),
  component: AnonymousPage,
});

const catMap = {
  suggestion: { fr: "Suggestion", ar: "اقتراح", en: "Suggestion", emoji: "💡" },
  conflict: { fr: "Conflit", ar: "نزاع", en: "Conflict", emoji: "⚔️" },
  harassment: { fr: "Harcèlement", ar: "تحرش", en: "Harassment", emoji: "🚫" },
  grievance: { fr: "Plainte", ar: "شكوى", en: "Grievance", emoji: "📢" },
  idea: { fr: "Idée", ar: "فكرة", en: "Idea", emoji: "💡" },
  other: { fr: "Autre", ar: "آخر", en: "Other", emoji: "❓" },
} as const;

const sevMap = { low: "bg-success/10 text-success", medium: "bg-warning/15 text-warning", high: "bg-danger/10 text-danger" };

function AnonymousPage() {
  const { pick } = useI18n();
  const posts = useStore((s) => s.anonymousPosts);
  const addReply = useStore((s) => s.addReply);
  const [filter, setFilter] = useState<"all" | "unanswered" | "urgent">("all");
  const [replies, setReplies] = useState<Record<string, string>>({});

  const filtered = posts.filter((p) => {
    if (filter === "unanswered") return p.replies.length === 0;
    if (filter === "urgent") return p.severity === "high" || p.category === "harassment";
    return true;
  });

  const handleReply = (postId: string) => {
    const content = replies[postId]?.trim();
    if (!content) return;
    addReply(postId, { id: crypto.randomUUID(), from: "hr", content, createdAt: new Date().toISOString() });
    setReplies((r) => ({ ...r, [postId]: "" }));
    toast.success(pick("Réponse envoyée anonymement", "تم إرسال الرد بشكل مجهول", "Reply sent anonymously"));
  };

  return (
    <div>
      <PageHeader
        title={pick("Espace anonyme — modération RH", "الفضاء المجهول — إدارة الموارد البشرية", "Anonymous Space — HR Moderation")}
        subtitle={pick("Feedback protégé par token, sans identification possible.", "آراء محمية برمز مميز، بدون تحديد الهوية.", "Token-protected feedback, no identification possible.")}
      />
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">{pick("Tous", "الكل", "All")} ({posts.length})</TabsTrigger>
          <TabsTrigger value="unanswered">{pick("Sans réponse", "بدون رد", "Unanswered")}</TabsTrigger>
          <TabsTrigger value="urgent">{pick("Urgents", "عاجل", "Urgent")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filtered.map((p, i) => {
          const cat = catMap[p.category];
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5 rounded-2xl">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="gap-1">{cat.emoji} {pick(cat.fr, cat.ar, cat.en)}</Badge>
                    <Badge className={`${sevMap[p.severity]} border-0`}>
                      {pick(p.severity === "high" ? "Haute" : p.severity === "medium" ? "Moyenne" : "Faible",
                             p.severity === "high" ? "مرتفع" : p.severity === "medium" ? "متوسط" : "منخفض",
                             p.severity)}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground">· {p.token}</span>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">{p.createdAt}</div>
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">{p.content}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> {p.upvotes}</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {p.replies.length}</span>
                </div>

                {p.replies.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {p.replies.map((r) => (
                      <div key={r.id} className="rounded-xl bg-brand-50 border border-brand/15 p-3">
                        <div className="text-[11px] font-medium text-brand mb-1">{r.from === "hr" ? "RH" : pick("Anonyme", "مجهول", "Anonymous")}</div>
                        <div className="text-sm">{r.content}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <Textarea
                    value={replies[p.id] ?? ""}
                    onChange={(e) => setReplies((r) => ({ ...r, [p.id]: e.target.value }))}
                    placeholder={pick("Répondre de manière confidentielle…", "الرد بسرية…", "Reply confidentially…")}
                    className="rounded-xl min-h-[60px]"
                  />
                  <Button onClick={() => handleReply(p.id)} className="gradient-brand text-white border-0 self-end"><Send className="w-4 h-4" /></Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
