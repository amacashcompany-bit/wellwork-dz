import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";

const typeMap = {
  workshop: { fr: "Atelier", ar: "ورشة", en: "Workshop", cls: "bg-brand/10 text-brand" },
  training: { fr: "Formation", ar: "تكوين", en: "Training", cls: "bg-primary/10 text-primary" },
  wellness: { fr: "Bien-être", ar: "رفاهية", en: "Wellness", cls: "bg-success/10 text-success" },
  awareness: { fr: "Sensibilisation", ar: "توعية", en: "Awareness", cls: "bg-warning/15 text-warning" },
} as const;

export function EventsPage() {
  const { pick, t } = useI18n();
  const events = useStore((s) => s.events);
  const register = useStore((s) => s.registerForEvent);

  return (
    <div>
      <PageHeader
        title={pick("Événements & formations", "الفعاليات والتكوين", "Events & Training")}
        subtitle={pick("Ateliers santé mentale, formations RPS, séances bien-être.", "ورش الصحة النفسية والتكوينات وجلسات الرفاهية.", "Mental health workshops, RPS training, wellness sessions.")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {events.map((e, i) => {
          const type = typeMap[e.type];
          const full = e.registered >= e.capacity;
          return (
            <motion.div key={e.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5 rounded-2xl hover:shadow-elegant transition-all h-full flex flex-col">
                <Badge className={`${type.cls} border-0 self-start`}>{pick(type.fr, type.ar, type.en)}</Badge>
                <div className="mt-3 font-semibold text-base leading-snug">{pick(e.title, e.titleAr, e.title)}</div>
                <p className="text-xs text-muted-foreground mt-1 flex-1">{e.description}</p>
                <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5" /> {e.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {e.time}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {pick(e.location, e.locationAr, e.location)}</div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {e.registered}/{e.capacity}</span>
                    <span className="font-medium">{Math.round((e.registered / e.capacity) * 100)}%</span>
                  </div>
                  <Progress value={(e.registered / e.capacity) * 100} className="h-1.5" />
                </div>
                <Button
                  disabled={full}
                  onClick={() => { register(e.id); toast.success(pick("Inscription confirmée !", "تم التسجيل!", "Registration confirmed!")); }}
                  className="mt-4 gradient-brand text-white border-0"
                >
                  {full ? pick("Complet", "مكتمل", "Full") : t("register")}
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
