import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, Banknote, Building2, CheckCircle2, Clock3, CreditCard, Eye, Loader2, Pause, Play, Plus, RefreshCw, Save, Settings2, TrendingUp, XCircle } from "lucide-react";
import { toast } from "sonner";
import { billingDb, money, type PaymentMethod } from "@/lib/billing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/superadmin/billing")({ component: SuperAdminBilling });

type PaymentOrder = {
  id: string; company_name: string; contact_name: string; contact_email: string; amount: number; currency: string;
  status: string; created_at: string; paid_at: string | null; proof_path: string | null; customer_reference: string | null;
  plans: { name: string } | null; payment_methods: { name: string; code: string } | null;
};

type Subscription = {
  id: string; space_id: string; status: string; starts_at: string; ends_at: string;
  spaces: { name: string; slug: string; subscription_status: string } | null; plans: { name: string } | null;
};

const paymentStatus: Record<string, { label: string; className: string }> = {
  awaiting_payment: { label: "En attente", className: "border-amber-500/30 bg-amber-500/10 text-amber-700" },
  under_review: { label: "À vérifier", className: "border-blue-500/30 bg-blue-500/10 text-blue-700" },
  paid: { label: "Payé", className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700" },
  rejected: { label: "Refusé", className: "border-destructive/30 bg-destructive/10 text-destructive" },
  refunded: { label: "Remboursé", className: "border-muted-foreground/30 bg-muted text-muted-foreground" },
};

function SuperAdminBilling() {
  const [orders, setOrders] = useState<PaymentOrder[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [methodDialog, setMethodDialog] = useState<Partial<PaymentMethod> | null>(null);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [orderResult, subscriptionResult, methodResult] = await Promise.all([
      billingDb.from("payment_orders").select("*, plans(name), payment_methods(name,code)").order("created_at", { ascending: false }),
      billingDb.from("company_subscriptions").select("*, spaces(name,slug,subscription_status), plans(name)").order("ends_at", { ascending: true }),
      billingDb.from("payment_methods").select("*").order("sort_order"),
    ]);
    if (orderResult.error || subscriptionResult.error || methodResult.error) toast.error(orderResult.error?.message || subscriptionResult.error?.message || methodResult.error?.message);
    setOrders((orderResult.data || []) as PaymentOrder[]);
    setSubscriptions((subscriptionResult.data || []) as Subscription[]);
    setMethods((methodResult.data || []) as PaymentMethod[]);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const analytics = useMemo(() => {
    const paid = orders.filter((order) => order.status === "paid");
    const revenueDzd = paid.filter((order) => order.currency === "DZD").reduce((sum, order) => sum + Number(order.amount), 0);
    const pending = orders.filter((order) => ["awaiting_payment", "under_review"].includes(order.status)).length;
    const inFourteenDays = Date.now() + 14 * 86400000;
    const expiring = subscriptions.filter((subscription) => subscription.status === "active" && new Date(subscription.ends_at).getTime() <= inFourteenDays).length;
    const months = Array.from({ length: 6 }, (_, offset) => {
      const date = new Date(); date.setMonth(date.getMonth() - (5 - offset));
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      return { key, label: date.toLocaleDateString("fr-DZ", { month: "short" }), value: paid.filter((order) => { const paidDate = new Date(order.paid_at || order.created_at); return `${paidDate.getFullYear()}-${paidDate.getMonth()}` === key && order.currency === "DZD"; }).reduce((sum, order) => sum + Number(order.amount), 0) };
    });
    return { revenueDzd, pending, expiring, active: subscriptions.filter((subscription) => subscription.status === "active").length, months };
  }, [orders, subscriptions]);

  const review = async (id: string, decision: "approve" | "reject" | "refund") => {
    const note = decision === "reject" ? window.prompt("Motif du refus (facultatif)") : null;
    const { error } = await billingDb.rpc("review_payment_order", { p_order_id: id, p_decision: decision, p_note: note });
    if (error) return toast.error(error.message);
    toast.success(decision === "approve" ? "Paiement accepté" : decision === "reject" ? "Paiement refusé" : "Remboursement enregistré");
    loadData();
  };

  const openProof = async (path: string) => {
    const { data, error } = await billingDb.storage.from("payment-proofs").createSignedUrl(path, 120);
    if (error || !data?.signedUrl) return toast.error(error?.message || "Justificatif indisponible");
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const setSubscriptionStatus = async (spaceId: string, status: "active" | "paused" | "cancelled") => {
    const { error } = await billingDb.rpc("set_company_subscription_status", { p_space_id: spaceId, p_status: status });
    if (error) return toast.error(error.message);
    toast.success(status === "active" ? "Abonnement réactivé" : status === "paused" ? "Abonnement mis en pause" : "Abonnement annulé");
    loadData();
  };

  const saveMethod = async () => {
    if (!methodDialog?.code || !methodDialog.name) return toast.error("Le code et le nom sont requis");
    setSaving(true);
    const payload = {
      code: methodDialog.code.toLowerCase().replace(/[^a-z0-9_]+/g, "_"), name: methodDialog.name,
      description: methodDialog.description || null, provider: methodDialog.provider || "manual", enabled: methodDialog.enabled ?? true,
      requires_proof: methodDialog.requires_proof ?? true, accepted_currencies: methodDialog.accepted_currencies || ["DZD"],
      instructions: methodDialog.instructions || null, public_config: methodDialog.public_config || {}, sort_order: methodDialog.sort_order ?? methods.length + 1,
    };
    const result = methodDialog.id ? await billingDb.from("payment_methods").update(payload).eq("id", methodDialog.id) : await billingDb.from("payment_methods").insert(payload);
    setSaving(false);
    if (result.error) return toast.error(result.error.message);
    toast.success("Moyen de paiement enregistré"); setMethodDialog(null); loadData();
  };

  const maxMonth = Math.max(...analytics.months.map((month) => month.value), 1);

  if (loading) return <div className="grid min-h-[60vh] place-items-center"><Loader2 className="h-7 w-7 animate-spin text-brand" /></div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center"><div><h1 className="text-2xl font-bold font-display">Paiements & abonnements</h1><p className="mt-1 text-sm text-muted-foreground">Revenus, validations, expirations et moyens de paiement.</p></div><div className="flex-1" /><Button variant="outline" size="sm" onClick={loadData}><RefreshCw className="me-2 h-4 w-4" />Actualiser</Button></div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={Banknote} label="Revenu encaissé" value={money(analytics.revenueDzd, "DZD")} tone="emerald" />
        <Metric icon={Clock3} label="Paiements à traiter" value={String(analytics.pending)} tone="amber" />
        <Metric icon={Building2} label="Abonnements actifs" value={String(analytics.active)} tone="blue" />
        <Metric icon={AlertTriangle} label="Expirent sous 14 jours" value={String(analytics.expiring)} tone="red" />
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="h-auto w-full justify-start overflow-x-auto bg-muted p-1 sm:w-auto">
          <TabsTrigger value="overview"><TrendingUp className="me-2 h-4 w-4" />Analyse</TabsTrigger>
          <TabsTrigger value="payments"><CreditCard className="me-2 h-4 w-4" />Paiements</TabsTrigger>
          <TabsTrigger value="companies"><Building2 className="me-2 h-4 w-4" />Entreprises</TabsTrigger>
          <TabsTrigger value="methods"><Settings2 className="me-2 h-4 w-4" />Méthodes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-5">
          <section className="border border-border bg-card p-5 rounded-lg"><div className="mb-6"><h2 className="font-semibold">Revenu DZD sur 6 mois</h2><p className="text-xs text-muted-foreground">Paiements confirmés uniquement</p></div><div className="grid h-56 grid-cols-6 items-end gap-3">{analytics.months.map((month) => <div key={month.key} className="flex h-full min-w-0 flex-col justify-end gap-2"><div className="truncate text-center text-[10px] text-muted-foreground">{month.value ? new Intl.NumberFormat("fr-DZ", { notation: "compact" }).format(month.value) : "0"}</div><div className="mx-auto w-full max-w-14 rounded-t-md bg-brand/85" style={{ height: `${Math.max(4, (month.value / maxMonth) * 170)}px` }} /><div className="truncate text-center text-xs text-muted-foreground">{month.label}</div></div>)}</div></section>
        </TabsContent>

        <TabsContent value="payments" className="mt-5">
          <section className="overflow-hidden border border-border bg-card rounded-lg"><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Entreprise</TableHead><TableHead>Plan</TableHead><TableHead>Méthode</TableHead><TableHead>Montant</TableHead><TableHead>Statut</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{orders.map((order) => { const status = paymentStatus[order.status] || { label: order.status, className: "" }; return <TableRow key={order.id}><TableCell><div className="font-medium">{order.company_name}</div><div className="text-xs text-muted-foreground">{order.contact_email}</div></TableCell><TableCell>{order.plans?.name || "-"}</TableCell><TableCell>{order.payment_methods?.name || "-"}</TableCell><TableCell className="font-medium">{money(Number(order.amount), order.currency)}</TableCell><TableCell><Badge variant="outline" className={status.className}>{status.label}</Badge></TableCell><TableCell className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString("fr-DZ")}</TableCell><TableCell><div className="flex justify-end gap-1">{order.proof_path && <Button variant="ghost" size="icon" title="Voir le reçu" onClick={() => openProof(order.proof_path!)}><Eye className="h-4 w-4" /></Button>}{["awaiting_payment", "under_review"].includes(order.status) && <><Button variant="ghost" size="icon" title="Refuser" className="text-destructive" onClick={() => review(order.id, "reject")}><XCircle className="h-4 w-4" /></Button><Button variant="ghost" size="icon" title="Accepter" className="text-emerald-600" onClick={() => review(order.id, "approve")}><CheckCircle2 className="h-4 w-4" /></Button></>}{order.status === "paid" && <Button variant="ghost" size="sm" onClick={() => review(order.id, "refund")}>Rembourser</Button>}</div></TableCell></TableRow>; })}</TableBody></Table></div>{orders.length === 0 && <Empty text="Aucun paiement enregistré" />}</section>
        </TabsContent>

        <TabsContent value="companies" className="mt-5">
          <section className="overflow-hidden border border-border bg-card rounded-lg"><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Entreprise</TableHead><TableHead>Plan</TableHead><TableHead>Début</TableHead><TableHead>Expiration</TableHead><TableHead>Statut</TableHead><TableHead className="text-right">Contrôle</TableHead></TableRow></TableHeader><TableBody>{subscriptions.map((subscription) => { const days = Math.ceil((new Date(subscription.ends_at).getTime() - Date.now()) / 86400000); return <TableRow key={subscription.id}><TableCell><div className="font-medium">{subscription.spaces?.name || "-"}</div><div className="text-xs text-muted-foreground">{subscription.spaces?.slug}</div></TableCell><TableCell>{subscription.plans?.name || "-"}</TableCell><TableCell>{new Date(subscription.starts_at).toLocaleDateString("fr-DZ")}</TableCell><TableCell><div>{new Date(subscription.ends_at).toLocaleDateString("fr-DZ")}</div><div className={`text-xs ${days <= 14 ? "text-amber-600" : "text-muted-foreground"}`}>{days > 0 ? `${days} jours restants` : "Expiré"}</div></TableCell><TableCell><Badge variant="outline">{subscription.status}</Badge></TableCell><TableCell><div className="flex justify-end gap-1">{subscription.status === "paused" ? <Button variant="ghost" size="icon" title="Réactiver" onClick={() => setSubscriptionStatus(subscription.space_id, "active")}><Play className="h-4 w-4 text-emerald-600" /></Button> : <Button variant="ghost" size="icon" title="Mettre en pause" onClick={() => setSubscriptionStatus(subscription.space_id, "paused")}><Pause className="h-4 w-4 text-amber-600" /></Button>}<Button variant="ghost" size="icon" title="Annuler" onClick={() => setSubscriptionStatus(subscription.space_id, "cancelled")}><XCircle className="h-4 w-4 text-destructive" /></Button></div></TableCell></TableRow>; })}</TableBody></Table></div>{subscriptions.length === 0 && <Empty text="Aucun abonnement actif" />}</section>
        </TabsContent>

        <TabsContent value="methods" className="mt-5 space-y-4">
          <div className="flex items-center"><div><h2 className="font-semibold">Moyens de paiement</h2><p className="text-xs text-muted-foreground">Activez, désactivez et configurez les informations visibles au client.</p></div><div className="flex-1" /><Button size="sm" onClick={() => setMethodDialog({ provider: "manual", enabled: true, requires_proof: true, accepted_currencies: ["DZD"], public_config: {} })}><Plus className="me-2 h-4 w-4" />Ajouter</Button></div>
          <div className="grid gap-3 lg:grid-cols-2">{methods.map((method) => <div key={method.id} className="flex items-center gap-4 border border-border bg-card p-4 rounded-lg"><div className="grid h-10 w-10 place-items-center rounded-md bg-muted"><CreditCard className="h-5 w-5 text-brand" /></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="font-medium">{method.name}</span><Badge variant="outline" className="text-[10px]">{method.provider}</Badge></div><p className="truncate text-xs text-muted-foreground">{method.description}</p><p className="mt-1 text-[10px] text-muted-foreground">{method.accepted_currencies.join(" · ")}</p></div><Switch checked={method.enabled} onCheckedChange={async (enabled) => { await billingDb.from("payment_methods").update({ enabled }).eq("id", method.id); loadData(); }} /><Button variant="ghost" size="icon" onClick={() => setMethodDialog(method)}><Settings2 className="h-4 w-4" /></Button></div>)}</div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!methodDialog} onOpenChange={(open) => !open && setMethodDialog(null)}><DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl"><DialogHeader><DialogTitle>{methodDialog?.id ? "Configurer le moyen de paiement" : "Nouveau moyen de paiement"}</DialogTitle></DialogHeader>{methodDialog && <div className="grid gap-4 py-3 sm:grid-cols-2"><div><Label>Nom</Label><Input value={methodDialog.name || ""} onChange={(event) => setMethodDialog({ ...methodDialog, name: event.target.value })} className="mt-1" /></div><div><Label>Code</Label><Input value={methodDialog.code || ""} disabled={!!methodDialog.id} onChange={(event) => setMethodDialog({ ...methodDialog, code: event.target.value })} className="mt-1" /></div><div><Label>Type</Label><select value={methodDialog.provider || "manual"} onChange={(event) => setMethodDialog({ ...methodDialog, provider: event.target.value as PaymentMethod["provider"] })} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="manual">Manuel</option><option value="chargily">Chargily</option><option value="paypal">PayPal</option><option value="external">Lien externe</option></select></div><div><Label>Devises (séparées par virgule)</Label><Input value={(methodDialog.accepted_currencies || []).join(", ")} onChange={(event) => setMethodDialog({ ...methodDialog, accepted_currencies: event.target.value.split(",").map((value) => value.trim().toUpperCase()).filter(Boolean) })} className="mt-1" /></div><div className="sm:col-span-2"><Label>Description</Label><Input value={methodDialog.description || ""} onChange={(event) => setMethodDialog({ ...methodDialog, description: event.target.value })} className="mt-1" /></div><div className="sm:col-span-2"><Label>Instructions client</Label><Textarea value={methodDialog.instructions || ""} onChange={(event) => setMethodDialog({ ...methodDialog, instructions: event.target.value })} className="mt-1" rows={4} /></div><div><Label>Titulaire du compte</Label><Input value={methodDialog.public_config?.account_name || ""} onChange={(event) => setMethodDialog({ ...methodDialog, public_config: { ...(methodDialog.public_config || {}), account_name: event.target.value } })} className="mt-1" /></div><div><Label>Numéro de compte / CCP</Label><Input value={methodDialog.public_config?.account_number || ""} onChange={(event) => setMethodDialog({ ...methodDialog, public_config: { ...(methodDialog.public_config || {}), account_number: event.target.value } })} className="mt-1" /></div><div className="sm:col-span-2"><Label>Lien de paiement public</Label><Input value={methodDialog.public_config?.payment_url || ""} onChange={(event) => setMethodDialog({ ...methodDialog, public_config: { ...(methodDialog.public_config || {}), payment_url: event.target.value } })} className="mt-1" placeholder="https://" /></div><label className="flex items-center gap-2 text-sm"><Switch checked={methodDialog.enabled ?? true} onCheckedChange={(enabled) => setMethodDialog({ ...methodDialog, enabled })} />Actif</label><label className="flex items-center gap-2 text-sm"><Switch checked={methodDialog.requires_proof ?? true} onCheckedChange={(requires_proof) => setMethodDialog({ ...methodDialog, requires_proof })} />Justificatif requis</label></div>}<DialogFooter><Button variant="outline" onClick={() => setMethodDialog(null)}>Annuler</Button><Button onClick={saveMethod} disabled={saving} className="bg-brand text-white">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="me-2 h-4 w-4" />Enregistrer</>}</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}

function Metric({ icon: Icon, label, value, tone }: { icon: typeof Banknote; label: string; value: string; tone: "emerald" | "amber" | "blue" | "red" }) {
  const styles = { emerald: "bg-emerald-500/10 text-emerald-600", amber: "bg-amber-500/10 text-amber-600", blue: "bg-blue-500/10 text-blue-600", red: "bg-red-500/10 text-red-600" };
  return <div className="flex items-center gap-4 border border-border bg-card p-4 rounded-lg"><div className={`grid h-11 w-11 shrink-0 place-items-center rounded-md ${styles[tone]}`}><Icon className="h-5 w-5" /></div><div className="min-w-0"><div className="truncate text-xs text-muted-foreground">{label}</div><div className="mt-1 truncate text-xl font-bold">{value}</div></div></div>;
}

function Empty({ text }: { text: string }) { return <div className="p-10 text-center text-sm text-muted-foreground">{text}</div>; }
