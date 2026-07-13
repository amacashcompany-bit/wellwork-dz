import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, BookOpen, PlayCircle, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";

const cats = ["all", "burnout", "ergonomics", "anxiety", "mindfulness", "nutrition", "sleep", "remote", "leadership"] as const;

export function LibraryPage() {
  const { pick, t } = useI18n();
  const content = useStore((s) => s.wellnessContent);
  const toggle = useStore((s) => s.toggleBookmark);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = content.filter((c) => (cat === "all" || c.category === cat) && (!q || [c.title, c.titleAr, c.description].some((v) => v.toLowerCase().includes(q.toLowerCase()))));

  return (
    <div>
      <PageHeader
        title={pick("Bibliothèque bien-être", "المكتبة الرقمية", "Wellness Library")}
        subtitle={pick("Articles et vidéos pour prendre soin de soi au quotidien.", "مقالات وفيديوهات للاعتناء بنفسك يومياً.", "Articles and videos to care for yourself daily.")}
      />

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search")} className="ps-9 rounded-xl" />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${cat === c ? "gradient-brand text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
          >
            {c === "all" ? pick("Tous", "الكل", "All") : c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="rounded-2xl overflow-hidden hover:shadow-elegant transition-all group cursor-pointer h-full flex flex-col">
              <div className="aspect-video relative overflow-hidden" style={{ background: c.coverGradient }}>
                <div className="absolute inset-0 flex items-center justify-center opacity-90">
                  {c.type === "video" ? <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" /> : <BookOpen className="w-10 h-10 text-white/90 drop-shadow" />}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggle(c.id); }}
                  className="absolute top-2 end-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center"
                >
                  <Bookmark className={`w-4 h-4 ${c.isBookmarked ? "fill-brand text-brand" : "text-muted-foreground"}`} />
                </button>
                <Badge className="absolute bottom-2 start-2 bg-white/90 text-ink border-0 text-[10px] uppercase">{c.category}</Badge>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="font-semibold text-sm leading-snug">{pick(c.title, c.titleAr, c.title)}</div>
                <div className="text-xs text-muted-foreground mt-1.5 line-clamp-2 flex-1">{pick(c.description, c.descriptionAr, c.description)}</div>
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <span>{c.readTime}</span>
                  <Button variant="ghost" size="sm" className="text-brand h-7 px-2">{pick("Lire", "قراءة", "Read")} →</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
