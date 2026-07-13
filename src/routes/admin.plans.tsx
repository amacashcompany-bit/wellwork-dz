import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, X, GripVertical, Star } from "lucide-react";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/hooks/useI18n";
import { useAuth, useMySpace, hasRole } from "@/hooks/useAuth";
import { usePlans, type Plan } from "@/hooks/usePlans";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/plans")({
  head: () => ({ meta: [{ title: "Plans tarifaires — WellWork" }] }),
  component: PlansAdminPage,
});

type DraftPlan = Omit<Plan, "id" | "created_at" | "updated_at"> & { id?: string };

const emptyDraft: DraftPlan = {
  slug: "",
  name: "",
  tagline: "",
  price_monthly: 0,
  currency: "EUR",
  is_demo: false,
  max_employees: null,
  features: [],
  highlighted: false,
  active: true,
  sort_order: 0,
};

function PlansAdminPage() {
  const { pick } = useI18n();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { info, loading: spaceLoading } = useMySpace();
  const { plans, loading, refetch } = usePlans({ includeInactive: true });
  const [editing, setEditing] = useState<DraftPlan | null>(null);
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authLoading || spaceLoading) return;
    if (!user || !hasRole(info?.roles ?? [], "super_admin")) {
      navigate({ to: "/admin/dashboard", replace: true });
    }
  }, [authLoading, spaceLoading, user, info, navigate]);

  const startEdit = (plan?: Plan) => {
    if (plan) {
      setEditing({ ...plan });
      setFeaturesText(((plan.features as string[]) ?? []).join("\n"));
    } else {
      setEditing({ ...emptyDraft, sort_order: plans.length });
      setFeaturesText("");
    }
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.slug.trim() || !editing.name.trim()) {
      toast.error(pick("Le slug et le nom sont obligatoires.", "المعرف والاسم مطلوبان.", "Slug and name are required."));
      return;
    }
    setSaving(true);
    const features = featuresText.split("\n").map((l) => l.trim()).filter(Boolean);
    const payload = { ...editing, features };
    const { id, ...rest } = payload;
    const { error } = id
      ? await supabase.from("plans").update(rest).eq("id", id)
      : await supabase.from("plans").insert(rest);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(pick("Plan enregistré", "تم حفظ الخطة", "Plan saved"));
    setEditing(null);
    refetch();
  };

  const remove = async (plan: Plan) => {
    if (!confirm(pick(`Supprimer le plan "${plan.name}" ?`, `حذف الخطة "${plan.name}"؟`, `Delete plan "${plan.name}"?`))) return;
    const { error } = await supabase.from("plans").delete().eq("id", plan.id);
    if (error) return toast.error(error.message);
    toast.success(pick("Plan supprimé", "تم حذف الخطة", "Plan deleted"));
    refetch();
  };

  const toggleActive = async (plan: Plan) => {
    const { error } = await supabase.from("plans").update({ active: !plan.active }).eq("id", plan.id);
    if (error) return toast.error(error.message);
    refetch();
  };

  if (authLoading || spaceLoading || loading) {
    return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 animate-spin text-brand" /></div>;
  }

  return (
    <div>
      <PageHeader
        title={pick("Plans tarifaires", "الخطط التسعيرية", "Pricing plans")}
        subtitle={pick("Gérez les offres affichées publiquement et leurs fonctionnalités.", "إدارة العروض المعروضة للجمهور ومزاياها.", "Manage the publicly displayed offers and their features.")}
        actions={<Button onClick={() => startEdit()} className="rounded-full gradient-brand border-0"><Plus className="w-4 h-4 me-1" />{pick("Nouveau plan", "خطة جديدة", "New plan")}</Button>}
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {plans.sort((a, b) => a.sort_order - b.sort_order).map((plan, i) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className={`p-5 rounded-2xl h-full flex flex-col ${!plan.active ? "opacity-50" : ""} ${plan.highlighted ? "border-brand ring-1 ring-brand/40" : ""}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <div className="font-semibold">{plan.name}</div>
                    {plan.highlighted && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{plan.tagline}</div>
                </div>
                {plan.is_demo && <Badge variant="secondary">{pick("Démo", "تجريبي", "Demo")}</Badge>}
              </div>
              <div className="mt-3 text-2xl font-bold">
                {plan.price_monthly == null ? pick("Sur devis", "عرض مخصص", "Custom") : `${plan.price_monthly}€ /mois`}
              </div>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground flex-1">
                {((plan.features as string[]) ?? []).slice(0, 5).map((f, idx) => <li key={idx}>• {f}</li>)}
                {((plan.features as string[]) ?? []).length > 5 && <li className="italic">+{((plan.features as string[]).length - 5)} …</li>}
              </ul>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/60">
                <div className="flex items-center gap-2">
                  <Switch checked={plan.active} onCheckedChange={() => toggleActive(plan)} />
                  <span className="text-xs text-muted-foreground">{plan.active ? pick("Actif", "نشط", "Active") : pick("Masqué", "مخفي", "Hidden")}</span>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => startEdit(plan)}>{pick("Modifier", "تعديل", "Edit")}</Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => remove(plan)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <Card onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editing.id ? pick("Modifier le plan", "تعديل الخطة", "Edit plan") : pick("Nouveau plan", "خطة جديدة", "New plan")}</h3>
              <Button size="icon" variant="ghost" onClick={() => setEditing(null)}><X className="w-4 h-4" /></Button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Slug</Label><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="mt-1 rounded-xl" /></div>
                <div><Label>{pick("Nom", "الاسم", "Name")}</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="mt-1 rounded-xl" /></div>
              </div>
              <div><Label>{pick("Accroche", "الوصف الموجز", "Tagline")}</Label><Input value={editing.tagline ?? ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} className="mt-1 rounded-xl" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>{pick("Prix mensuel (vide = sur devis)", "السعر الشهري (فارغ = مخصص)", "Monthly price (empty = custom)")}</Label>
                  <Input type="number" value={editing.price_monthly ?? ""} onChange={(e) => setEditing({ ...editing, price_monthly: e.target.value === "" ? null : Number(e.target.value) })} className="mt-1 rounded-xl" />
                </div>
                <div><Label>{pick("Employés max (vide = illimité)", "الحد الأقصى للموظفين (فارغ = غير محدود)", "Max employees (empty = unlimited)")}</Label>
                  <Input type="number" value={editing.max_employees ?? ""} onChange={(e) => setEditing({ ...editing, max_employees: e.target.value === "" ? null : Number(e.target.value) })} className="mt-1 rounded-xl" />
                </div>
              </div>
              <div><Label>{pick("Fonctionnalités (une par ligne)", "المزايا (واحدة في كل سطر)", "Features (one per line)")}</Label>
                <Textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} rows={6} className="mt-1 rounded-xl" />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><Switch checked={editing.is_demo} onCheckedChange={(v) => setEditing({ ...editing, is_demo: v })} /><Label>{pick("Plan démo (accès protégé par jeton)", "خطة تجريبية (محمية برمز وصول)", "Demo plan (token-gated)")}</Label></div>
                <div className="flex items-center gap-2"><Switch checked={editing.highlighted} onCheckedChange={(v) => setEditing({ ...editing, highlighted: v })} /><Label>{pick("Mis en avant", "مميز", "Highlighted")}</Label></div>
              </div>
              <Button onClick={save} disabled={saving} className="w-full gradient-brand text-white border-0 h-11 mt-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : pick("Enregistrer", "حفظ", "Save")}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
