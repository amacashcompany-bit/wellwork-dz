import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, Copy, Loader2, X } from "lucide-react";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/hooks/useI18n";
import { useAuth, useMySpace, hasRole } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { approveDemoRequestFn, rejectDemoRequestFn } from "@/lib/demoDecision.functions";

export const Route = createFileRoute("/admin/demo-requests")({
  head: () => ({ meta: [{ title: "Demandes de démo — WellWork" }] }),
  component: DemoRequestsPage,
});

type DemoRequest = Database["public"]["Tables"]["demo_requests"]["Row"];

function DemoRequestsPage() {
  const { pick } = useI18n();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { info, loading: spaceLoading } = useMySpace();
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const isSuperAdmin = hasRole(info?.roles ?? [], "super_admin");

  useEffect(() => {
    if (authLoading || spaceLoading) return;
    if (!user || !isSuperAdmin) {
      navigate({ to: "/admin/dashboard", replace: true });
    }
  }, [authLoading, spaceLoading, user, isSuperAdmin, navigate]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("demo_requests").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRequests(data ?? []);
    setLoading(false);
  };

  useEffect(() => { if (isSuperAdmin) load(); }, [isSuperAdmin]);

  const approve = async (r: DemoRequest) => {
    setBusyId(r.id);
    const { data: sess } = await supabase.auth.getSession();
    const accessToken = sess.session?.access_token;
    if (!accessToken) { setBusyId(null); return toast.error(pick("Session expirée", "انتهت الجلسة", "Session expired")); }
    try {
      const result = await approveDemoRequestFn({ data: { requestId: r.id, accessToken } });
      toast.success(result.emailSent
        ? pick("Demande approuvée, email envoyé.", "تم قبول الطلب، تم إرسال البريد.", "Request approved, email sent.")
        : pick("Demande approuvée. Email non envoyé (fournisseur non configuré) — copiez le jeton ci-dessous.", "تم قبول الطلب. لم يتم إرسال البريد — انسخ الرمز أدناه.", "Request approved. Email not sent (no provider configured yet) — copy the token below."));
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e));
    }
    setBusyId(null);
  };

  const reject = async (r: DemoRequest) => {
    setBusyId(r.id);
    const { data: sess } = await supabase.auth.getSession();
    const accessToken = sess.session?.access_token;
    if (!accessToken) { setBusyId(null); return toast.error(pick("Session expirée", "انتهت الجلسة", "Session expired")); }
    try {
      await rejectDemoRequestFn({ data: { requestId: r.id, accessToken, reason: undefined } });
      toast.success(pick("Demande refusée", "تم رفض الطلب", "Request rejected"));
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e));
    }
    setBusyId(null);
  };

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    toast.success(pick("Jeton copié", "تم نسخ الرمز", "Token copied"));
  };

  if (authLoading || spaceLoading || loading) {
    return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 animate-spin text-brand" /></div>;
  }

  const pending = requests.filter((r) => r.status === "pending");
  const reviewed = requests.filter((r) => r.status !== "pending");

  const Row = ({ r }: { r: DemoRequest }) => (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-4 rounded-2xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="font-semibold flex items-center gap-2">
              {r.company_name}
              <Badge variant={r.status === "pending" ? "secondary" : r.status === "approved" ? "default" : "destructive"}>
                {r.status === "pending" ? pick("En attente", "قيد الانتظار", "Pending") : r.status === "approved" ? pick("Approuvée", "مقبولة", "Approved") : pick("Refusée", "مرفوضة", "Rejected")}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{r.contact_name} · {r.contact_email}{r.contact_phone ? ` · ${r.contact_phone}` : ""}</div>
            <p className="text-sm mt-2 max-w-xl">{r.company_description}</p>
            {r.access_token && (
              <button onClick={() => copyToken(r.access_token!)} className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono bg-muted px-2 py-1 rounded-lg hover:bg-muted/70">
                <Copy className="w-3 h-3" /> {r.access_token}
              </button>
            )}
          </div>
          {r.status === "pending" && (
            <div className="flex gap-2 shrink-0">
              <Button size="sm" variant="outline" className="rounded-full" disabled={busyId === r.id} onClick={() => reject(r)}>
                {busyId === r.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4 me-1" />} {pick("Refuser", "رفض", "Reject")}
              </Button>
              <Button size="sm" className="rounded-full gradient-brand border-0" disabled={busyId === r.id} onClick={() => approve(r)}>
                {busyId === r.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 me-1" />} {pick("Approuver", "قبول", "Approve")}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div>
      <PageHeader
        title={pick("Demandes de démo", "طلبات العرض التجريبي", "Demo requests")}
        subtitle={pick("Examinez chaque demande avant d'accorder un accès à la démo.", "راجع كل طلب قبل منح الوصول إلى العرض التجريبي.", "Review each request before granting demo access.")}
      />
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">{pick("En attente", "قيد الانتظار", "Pending")} ({pending.length})</TabsTrigger>
          <TabsTrigger value="reviewed">{pick("Traitées", "معالجة", "Reviewed")} ({reviewed.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-4 space-y-3">
          {pending.length === 0 && <p className="text-sm text-muted-foreground">{pick("Aucune demande en attente.", "لا توجد طلبات قيد الانتظار.", "No pending requests.")}</p>}
          {pending.map((r) => <Row key={r.id} r={r} />)}
        </TabsContent>
        <TabsContent value="reviewed" className="mt-4 space-y-3">
          {reviewed.map((r) => <Row key={r.id} r={r} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
