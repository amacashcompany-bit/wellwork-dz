import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, CheckCircle2, Clock3, CreditCard, ExternalLink, FileUp, Landmark, Loader2, RefreshCw, ShieldCheck, WalletCards, XCircle } from "lucide-react";
import { toast } from "sonner";
import logoMark from "@/assets/brand/wellwork-logo-mark.png";
import baridiMobLogo from "@/assets/payments/baridimob.png";
import algeriePosteLogo from "@/assets/payments/algerie-poste.png";
import chargilyLogo from "@/assets/payments/chargily.webp";
import { billingDb, type BillingPlan, type PaymentMethod, type PublicPaymentOrder, money } from "@/lib/billing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/checkout")({
  ssr: false,
  head: () => ({ meta: [{ title: "Paiement sécurisé - Wellwork" }] }),
  component: CheckoutPage,
});

const statusCopy = {
  awaiting_payment: ["Paiement en attente", "Ajoutez votre justificatif ou ouvrez la page de paiement."],
  under_review: ["Vérification en cours", "Votre paiement a été envoyé. Notre équipe va le contrôler."],
  paid: ["Paiement accepté", "Votre accès entreprise est prêt."],
  rejected: ["Paiement refusé", "Vérifiez les informations puis contactez le support."],
  failed: ["Paiement échoué", "Vous pouvez réessayer avec le même dossier."],
  cancelled: ["Paiement annulé", "Cette demande a été annulée."],
  refunded: ["Paiement remboursé", "Le remboursement a été enregistré."],
  expired: ["Paiement expiré", "Créez une nouvelle demande de paiement."],
} as const;

function MethodMark({ code }: { code: string }) {
  if (code === "baridimob") return <img src={baridiMobLogo} alt="BaridiMob" className="h-10 w-16 object-contain" />;
  if (code === "ccp") return <img src={algeriePosteLogo} alt="Algérie Poste" className="h-11 w-12 object-contain" />;
  if (code === "chargily") return <img src={chargilyLogo} alt="Chargily Pay" className="h-11 w-11 rounded-md object-cover" />;
  if (code === "paypal") return <span className="text-lg font-bold text-[#003087]">Pay<span className="text-[#009cde]">Pal</span></span>;
  return <CreditCard className="h-7 w-7 text-brand" />;
}

function CheckoutPage() {
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [planId, setPlanId] = useState("");
  const [methodCode, setMethodCode] = useState("");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderToken, setOrderToken] = useState("");
  const [order, setOrder] = useState<PublicPaymentOrder | null>(null);
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [proof, setProof] = useState<File | null>(null);

  const loadOrder = useCallback(async (token: string) => {
    const { data, error } = await billingDb.rpc("get_payment_order", { p_checkout_token: token });
    if (error || !data) return toast.error(error?.message || "Paiement introuvable");
    setOrder(data as PublicPaymentOrder);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedPlan = params.get("plan") || "";
    const requestedOrder = params.get("order") || "";
    Promise.all([
      billingDb.from("plans").select("*").eq("active", true).order("sort_order"),
      billingDb.from("payment_methods").select("*").eq("enabled", true).order("sort_order"),
    ]).then(([planResult, methodResult]) => {
      const availablePlans = ((planResult.data || []) as BillingPlan[]).filter((plan) => !plan.is_demo && plan.price_monthly !== null);
      setPlans(availablePlans);
      setMethods((methodResult.data || []) as PaymentMethod[]);
      setPlanId(availablePlans.some((plan) => plan.id === requestedPlan) ? requestedPlan : availablePlans[0]?.id || "");
      setLoading(false);
    });
    if (requestedOrder) {
      setOrderToken(requestedOrder);
      loadOrder(requestedOrder);
    }
  }, [loadOrder]);

  useEffect(() => {
    if (!orderToken || order?.status === "paid" || order?.status === "rejected") return;
    const timer = window.setInterval(() => loadOrder(orderToken), 6000);
    return () => window.clearInterval(timer);
  }, [loadOrder, order?.status, orderToken]);

  const selectedPlan = plans.find((plan) => plan.id === planId);
  const selectedMethod = methods.find((method) => method.code === methodCode);
  const compatibleMethods = useMemo(() => methods.filter((method) => selectedPlan && method.accepted_currencies.includes(selectedPlan.currency.toUpperCase())), [methods, selectedPlan]);
  const amount = billingCycle === "yearly" ? selectedPlan?.price_yearly ?? ((selectedPlan?.price_monthly || 0) * 12) : selectedPlan?.price_monthly;

  useEffect(() => {
    if (!compatibleMethods.some((method) => method.code === methodCode)) setMethodCode(compatibleMethods[0]?.code || "");
  }, [compatibleMethods, methodCode]);

  const startCheckout = async () => {
    if (!selectedPlan || !selectedMethod || !companyName.trim() || !contactName.trim() || !email.includes("@")) return toast.error("Complétez les informations de l'entreprise.");
    setBusy(true);
    const { data, error } = await billingDb.rpc("create_payment_order", {
      p_plan_id: selectedPlan.id,
      p_method_code: selectedMethod.code,
      p_company_name: companyName,
      p_contact_name: contactName,
      p_contact_email: email,
      p_contact_phone: phone,
      p_billing_cycle: billingCycle,
    });
    if (error) { setBusy(false); return toast.error(error.message); }
    const token = data.checkout_token as string;
    setOrderToken(token);
    window.history.replaceState({}, "", `/checkout?order=${token}`);
    await loadOrder(token);

    if (selectedMethod.provider === "chargily" && Number(data.amount) > 0) {
      const result = await billingDb.functions.invoke("create-chargily-checkout", { body: { orderToken: token } });
      setBusy(false);
      if (result.error || !result.data?.url) return toast.error(result.data?.error || result.error?.message || "Chargily n'est pas encore configuré.");
      window.location.assign(result.data.url);
      return;
    }
    setBusy(false);
  };

  const submitProof = async () => {
    if (!orderToken || (!proof && !reference.trim())) return toast.error("Ajoutez un reçu ou une référence de transaction.");
    setBusy(true);
    let proofPath: string | null = null;
    if (proof) {
      const extension = proof.name.split(".").pop()?.toLowerCase() || "bin";
      proofPath = `${orderToken}/${crypto.randomUUID()}.${extension}`;
      const { error } = await billingDb.storage.from("payment-proofs").upload(proofPath, proof, { contentType: proof.type, upsert: false });
      if (error) { setBusy(false); return toast.error(error.message); }
    }
    const { error } = await billingDb.rpc("submit_payment_proof", { p_checkout_token: orderToken, p_proof_path: proofPath, p_reference: reference, p_note: note });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Paiement envoyé pour vérification");
    loadOrder(orderToken);
  };

  if (loading) return <div className="grid min-h-screen place-items-center bg-background"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>;

  if (order) {
    const [title, description] = statusCopy[order.status];
    const isFinalSuccess = order.status === "paid" && order.activation_token;
    const config = order.method.public_config || {};
    return (
      <div className="min-h-screen bg-background px-4 py-8 text-foreground sm:py-12">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="mb-8 flex items-center justify-center gap-2"><img src={logoMark} alt="Wellwork" className="h-9 w-9" /><span className="font-display font-bold">Wellwork</span></Link>
          <div className="border border-border bg-card p-5 shadow-sm sm:p-8 rounded-lg">
            <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center">
              <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${isFinalSuccess ? "bg-emerald-500/10 text-emerald-600" : order.status === "rejected" ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"}`}>
                {isFinalSuccess ? <CheckCircle2 /> : order.status === "rejected" ? <XCircle /> : <Clock3 />}
              </div>
              <div className="min-w-0 flex-1"><h1 className="text-xl font-bold">{title}</h1><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>
              <Badge variant="outline">{order.plan.name}</Badge>
            </div>

            <div className="grid gap-4 py-6 sm:grid-cols-3">
              <div><div className="text-xs text-muted-foreground">Entreprise</div><div className="mt-1 font-medium">{order.company_name}</div></div>
              <div><div className="text-xs text-muted-foreground">Montant</div><div className="mt-1 font-medium">{money(order.amount, order.currency)}</div></div>
              <div><div className="text-xs text-muted-foreground">Méthode</div><div className="mt-1 font-medium">{order.method.name}</div></div>
            </div>

            {isFinalSuccess ? (
              <div className="border-t border-border pt-6 text-center">
                <ShieldCheck className="mx-auto h-8 w-8 text-brand" />
                <h2 className="mt-3 font-semibold">Créez maintenant le compte administrateur</h2>
                <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">Le paiement est validé. Cette étape associera votre abonnement à votre espace entreprise.</p>
                <a href={`/activate?token=${order.activation_token}`}><Button className="mt-5 bg-brand text-white">Créer mon espace <ExternalLink className="ms-2 h-4 w-4" /></Button></a>
              </div>
            ) : order.status === "awaiting_payment" ? (
              <div className="space-y-5 border-t border-border pt-6">
                <div className="flex items-start gap-3 rounded-md border border-border bg-muted/30 p-4"><Landmark className="mt-0.5 h-5 w-5 text-brand" /><div><div className="font-medium">Instructions</div><p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{order.method.instructions}</p>{config.account_name && <p className="mt-3 text-sm"><strong>Titulaire :</strong> {config.account_name}</p>}{config.account_number && <p className="text-sm"><strong>Compte :</strong> {config.account_number}</p>}</div></div>
                {order.provider_checkout_url && <a href={order.provider_checkout_url}><Button className="w-full bg-brand text-white">Ouvrir la page de paiement <ExternalLink className="ms-2 h-4 w-4" /></Button></a>}
                {config.payment_url && <a href={config.payment_url} target="_blank" rel="noreferrer"><Button className="w-full bg-brand text-white">Payer maintenant <ExternalLink className="ms-2 h-4 w-4" /></Button></a>}
                {order.method.requires_proof && (
                  <div className="grid gap-4">
                    <div><Label>Référence de transaction</Label><Input value={reference} onChange={(event) => setReference(event.target.value)} className="mt-1" placeholder="Ex. 45892173" /></div>
                    <div><Label>Reçu (image ou PDF, 5 Mo max.)</Label><label className="mt-1 flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border bg-background text-sm text-muted-foreground hover:border-brand"><FileUp className="h-5 w-5" />{proof ? proof.name : "Choisir le justificatif"}<input type="file" accept="image/png,image/jpeg,image/webp,application/pdf" className="sr-only" onChange={(event) => setProof(event.target.files?.[0] || null)} /></label></div>
                    <div><Label>Note (facultatif)</Label><Textarea value={note} onChange={(event) => setNote(event.target.value)} className="mt-1" /></div>
                    <Button onClick={submitProof} disabled={busy} className="bg-brand text-white">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Envoyer pour vérification"}</Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="border-t border-border pt-6 text-center"><Button variant="outline" onClick={() => loadOrder(orderToken)}><RefreshCw className="me-2 h-4 w-4" />Actualiser</Button></div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border"><div className="mx-auto flex h-16 max-w-6xl items-center px-4"><Link to="/" className="flex items-center gap-2"><img src={logoMark} alt="Wellwork" className="h-9 w-9" /><span className="font-display font-bold">Wellwork</span></Link><div className="flex-1" /><div className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-brand" />Paiement sécurisé</div></div></header>
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_360px] lg:py-12">
        <section className="space-y-8">
          <div><h1 className="text-2xl font-bold font-display sm:text-3xl">Finaliser votre abonnement</h1><p className="mt-2 text-sm text-muted-foreground">Choisissez votre plan et votre moyen de paiement avant de créer le compte administrateur.</p></div>
          <div><h2 className="mb-3 text-sm font-semibold">1. Votre plan</h2><div className="grid gap-3 sm:grid-cols-2">{plans.map((plan) => <button key={plan.id} onClick={() => setPlanId(plan.id)} className={`border p-4 text-start rounded-lg ${plan.id === planId ? "border-brand bg-brand/5" : "border-border bg-card"}`}><div className="flex items-start justify-between gap-3"><div><div className="font-semibold">{plan.name}</div><div className="mt-1 text-xs text-muted-foreground">{plan.tagline}</div></div>{plan.id === planId && <Check className="h-5 w-5 text-brand" />}</div><div className="mt-4 font-bold">{money(plan.price_monthly, plan.currency)}<span className="text-xs font-normal text-muted-foreground"> / mois</span></div></button>)}</div></div>
          <div><div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-semibold">2. Moyen de paiement</h2><div className="flex rounded-md border border-border p-0.5"><button onClick={() => setBillingCycle("monthly")} className={`px-3 py-1 text-xs rounded-sm ${billingCycle === "monthly" ? "bg-brand text-white" : "text-muted-foreground"}`}>Mensuel</button><button onClick={() => setBillingCycle("yearly")} className={`px-3 py-1 text-xs rounded-sm ${billingCycle === "yearly" ? "bg-brand text-white" : "text-muted-foreground"}`}>Annuel</button></div></div><div className="grid gap-3 sm:grid-cols-2">{compatibleMethods.map((method) => <button key={method.id} onClick={() => setMethodCode(method.code)} className={`flex min-h-20 items-center gap-4 border p-3 text-start rounded-lg ${method.code === methodCode ? "border-brand bg-brand/5" : "border-border bg-card"}`}><span className="grid h-12 w-16 shrink-0 place-items-center"><MethodMark code={method.code} /></span><span className="min-w-0"><span className="block text-sm font-semibold">{method.name}</span><span className="mt-0.5 block text-xs text-muted-foreground">{method.description}</span></span></button>)}</div>{compatibleMethods.length === 0 && <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-700">Aucune méthode ne prend actuellement en charge {selectedPlan?.currency}.</div>}</div>
          <div><h2 className="mb-3 text-sm font-semibold">3. Entreprise</h2><div className="grid gap-4 border border-border bg-card p-4 rounded-lg sm:grid-cols-2"><div className="sm:col-span-2"><Label>Nom de l'entreprise</Label><Input value={companyName} onChange={(event) => setCompanyName(event.target.value)} className="mt-1" /></div><div><Label>Nom du contact</Label><Input value={contactName} onChange={(event) => setContactName(event.target.value)} className="mt-1" /></div><div><Label>Téléphone</Label><Input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-1" placeholder="+213" /></div><div className="sm:col-span-2"><Label>Email de facturation</Label><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1" /></div></div></div>
        </section>
        <aside className="lg:sticky lg:top-8 lg:self-start"><div className="border border-border bg-card p-5 shadow-sm rounded-lg"><div className="flex items-center gap-2 font-semibold"><WalletCards className="h-5 w-5 text-brand" />Récapitulatif</div><div className="my-5 space-y-3 border-y border-border py-4 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Plan</span><span>{selectedPlan?.name}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Période</span><span>{billingCycle === "yearly" ? "12 mois" : "1 mois"}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Paiement</span><span>{selectedMethod?.name || "-"}</span></div></div><div className="flex items-end justify-between"><span className="text-sm text-muted-foreground">Total</span><span className="text-2xl font-bold">{money(amount ?? null, selectedPlan?.currency || "DZD")}</span></div><Button onClick={startCheckout} disabled={busy || !selectedMethod} className="mt-5 w-full bg-brand text-white">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continuer vers le paiement"}</Button><div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" />Aucune donnée de carte stockée par Wellwork</div></div></aside>
      </main>
    </div>
  );
}
