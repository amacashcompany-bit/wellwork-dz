import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2, Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { billingDb } from "@/lib/billing";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/hooks/useI18n";

export const Route = createFileRoute("/superadmin/plans")({
  component: SuperAdminPlans,
});

type Plan = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  price_monthly: number | null;
  price_yearly: number | null;
  currency: string;
  duration_months: number;
  is_demo: boolean;
  highlighted: boolean;
  active: boolean;
  sort_order: number;
  features: string[];
};

function SuperAdminPlans() {
  const { t } = useI18n();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog State
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Partial<Plan> | null>(null);
  const [featuresText, setFeaturesText] = useState("");

  const loadPlans = useCallback(async () => {
    setLoading(true);
    const { data, error } = await billingDb
      .from("plans")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast.error("Erreur de chargement: " + error.message);
    } else {
      const parsedPlans = (data || []).map((p: any) => ({
        ...p,
        features: Array.isArray(p.features) ? p.features : [],
      }));
      setPlans(parsedPlans as Plan[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const handleOpenDialog = (plan?: Plan) => {
    if (plan) {
      setEditingPlan(plan);
      setFeaturesText((plan.features || []).join("\n"));
    } else {
      setEditingPlan({
        slug: "", name: "", tagline: "", price_monthly: 0, price_yearly: 0, currency: "DZD", duration_months: 1,
        is_demo: false, highlighted: false, active: true, sort_order: plans.length
      });
      setFeaturesText("");
    }
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!editingPlan?.slug || !editingPlan?.name) {
      toast.error("Le slug et le nom sont requis");
      return;
    }
    
    setSaving(true);
    const featuresArray = featuresText.split("\n").map(f => f.trim()).filter(Boolean);
    
    const planData = {
      ...editingPlan,
      features: featuresArray,
    };

    let error;
    if (editingPlan.id) {
      const res = await billingDb.from("plans").update(planData).eq("id", editingPlan.id);
      error = res.error;
    } else {
      const res = await billingDb.from("plans").insert(planData);
      error = res.error;
    }

    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Plan enregistré !");
      setIsOpen(false);
      loadPlans();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Supprimer ce plan définitivement ?")) return;
    const { error } = await billingDb.from("plans").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Plan supprimé");
      loadPlans();
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold font-display">{t("saManagePlans")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("saManagePlansDesc")}</p>
        </motion.div>
        <Button onClick={() => handleOpenDialog()} className="gradient-brand text-white border-0 shadow-glow">
          <Plus className="w-4 h-4 me-2" /> {t("saCreatePlan")}
        </Button>
      </div>

      <Card className="p-1 rounded-2xl">
        {loading ? (
          <div className="p-12 flex justify-center items-center"><Loader2 className="w-8 h-8 animate-spin text-brand/50" /></div>
        ) : plans.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">Aucun plan trouvé.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/40">
                  <TableHead>Ordre</TableHead>
                  <TableHead>{t("saPlanName")}</TableHead>
                  <TableHead>{t("saPriceMonthly")}</TableHead>
                  <TableHead>{t("saIsDemo")} ?</TableHead>
                  <TableHead>{t("saActive")} ?</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((p) => (
                  <TableRow key={p.id} className="border-b border-border/40 hover:bg-muted/30">
                    <TableCell className="font-mono text-xs">{p.sort_order}</TableCell>
                    <TableCell>
                      <div className="font-medium flex items-center gap-2">
                        {p.name}
                        {p.highlighted && <Badge className="bg-brand/10 text-brand text-[10px] h-4 px-1.5 border-brand/20">Mise en avant</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground">{p.slug}</div>
                    </TableCell>
                    <TableCell>
                      {p.price_monthly === null ? "Sur devis" : `${p.price_monthly} ${p.currency}/mois`}
                    </TableCell>
                    <TableCell>
                      {p.is_demo ? <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">{t("yes")}</Badge> : <span className="text-muted-foreground text-xs">{t("no")}</span>}
                    </TableCell>
                    <TableCell>
                      {p.active ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(p)} className="w-8 h-8 rounded-lg hover:bg-muted">
                          <Edit2 className="w-4 h-4 text-brand" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg hover:bg-destructive/10 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPlan?.id ? t("saEditPlan") : t("saCreatePlan")}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid gap-2">
              <Label>{t("saPlanName")}</Label>
              <Input value={editingPlan?.name || ""} onChange={e => setEditingPlan({ ...editingPlan, name: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Slug (identifiant unique)</Label>
              <Input value={editingPlan?.slug || ""} onChange={e => setEditingPlan({ ...editingPlan, slug: e.target.value })} />
            </div>
            <div className="grid gap-2 col-span-2">
              <Label>{t("saTagline")}</Label>
              <Input value={editingPlan?.tagline || ""} onChange={e => setEditingPlan({ ...editingPlan, tagline: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>{t("saPriceMonthly")}</Label>
              <Input type="number" value={editingPlan?.price_monthly ?? ""} onChange={e => setEditingPlan({ ...editingPlan, price_monthly: e.target.value ? Number(e.target.value) : null })} />
            </div>
            <div className="grid gap-2">
              <Label>{t("saCurrency")}</Label>
              <Input value={editingPlan?.currency || "DZD"} onChange={e => setEditingPlan({ ...editingPlan, currency: e.target.value.toUpperCase() })} />
            </div>
            <div className="grid gap-2">
              <Label>Prix annuel</Label>
              <Input type="number" value={editingPlan?.price_yearly ?? ""} onChange={e => setEditingPlan({ ...editingPlan, price_yearly: e.target.value ? Number(e.target.value) : null })} />
            </div>
            <div className="grid gap-2">
              <Label>Durée (mois)</Label>
              <Input type="number" min="1" value={editingPlan?.duration_months ?? 1} onChange={e => setEditingPlan({ ...editingPlan, duration_months: Math.max(1, Number(e.target.value)) })} />
            </div>
            <div className="grid gap-2">
              <Label>Ordre d'affichage</Label>
              <Input type="number" value={editingPlan?.sort_order ?? 0} onChange={e => setEditingPlan({ ...editingPlan, sort_order: Number(e.target.value) })} />
            </div>
            
            <div className="col-span-2 grid grid-cols-3 gap-4 pt-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={editingPlan?.active ?? false} onCheckedChange={(c) => setEditingPlan({ ...editingPlan, active: !!c })} />
                {t("saActive")}
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={editingPlan?.is_demo ?? false} onCheckedChange={(c) => setEditingPlan({ ...editingPlan, is_demo: !!c })} />
                {t("saIsDemo")}
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={editingPlan?.highlighted ?? false} onCheckedChange={(c) => setEditingPlan({ ...editingPlan, highlighted: !!c })} />
                {t("saHighlighted")}
              </label>
            </div>

            <div className="grid gap-2 col-span-2 mt-2">
              <Label>{t("saFeatures")}</Label>
              <Textarea 
                value={featuresText} 
                onChange={e => setFeaturesText(e.target.value)} 
                rows={6}
                placeholder="Tableau de bord standard&#10;Support par email"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>{t("cancel")}</Button>
            <Button onClick={handleSave} disabled={saving} className="gradient-brand text-white border-0">
              {saving && <Loader2 className="w-4 h-4 animate-spin me-2" />} {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
