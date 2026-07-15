import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Copy, Loader2, ShieldCheck, Trash2, UserCog, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useMySpace, hasRole } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/admin/team")({
  head: () => ({ meta: [{ title: "Équipe & invitations — WellWork" }] }),
  component: TeamPage,
});

type Invite = { id: string; code: string; role: "manager"; full_name: string | null; email: string | null; used_by: string | null; used_at: string | null; expires_at: string | null; created_at: string };
type MemberRow = { user_id: string; full_name: string | null; role: "manager" | "hr_admin"; email: string | null };

const MODULES: { key: string; label: string }[] = [
  { key: "employees", label: "Employés" },
  { key: "surveys", label: "Enquêtes" },
  { key: "alerts", label: "Alertes" },
  { key: "actions", label: "Plans d'action" },
  { key: "library", label: "Bibliothèque" },
  { key: "events", label: "Événements" },
  { key: "messages", label: "Messages" },
  { key: "reports", label: "Rapports" },
  { key: "erp", label: "ERP / KPI" },
];

function generateCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = (n: number) => Array.from({ length: n }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `WW-${rand(4)}-${rand(4)}`;
}

function TeamPage() {
  const { user } = useAuth();
  const { info } = useMySpace();
  const canManage = hasRole(info?.roles ?? [], ["hr_admin", "super_admin"]);
  const spaceId = info?.spaceId ?? null;

  const [invites, setInvites] = useState<Invite[]>([]);
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!spaceId) return;
    setLoading(true);
    const [{ data: inv }, { data: roleRows }] = await Promise.all([
      supabase.from("space_invites").select("*").eq("space_id", spaceId).eq("role", "manager").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role").eq("space_id", spaceId).in("role", ["manager", "hr_admin"]),
    ]);
    setInvites((inv ?? []) as Invite[]);

    const uids = Array.from(new Set((roleRows ?? []).map((r) => r.user_id)));
    let profilesById: Record<string, { full_name: string | null }> = {};
    if (uids.length) {
      const { data: profs } = await supabase.from("profiles").select("id, full_name").in("id", uids);
      profilesById = Object.fromEntries((profs ?? []).map((p) => [p.id, p]));
    }
    setMembers((roleRows ?? []).map((r) => ({
      user_id: r.user_id,
      role: r.role as MemberRow["role"],
      full_name: profilesById[r.user_id]?.full_name ?? null,
      email: null,
    })));
    setLoading(false);
  }, [spaceId]);

  useEffect(() => { load(); }, [load]);

  const createInvite = async () => {
    if (!spaceId || !user) return;
    setBusy(true);
    const code = generateCode();
    const { error } = await supabase.from("space_invites").insert({
      space_id: spaceId,
      code,
      role: "manager",
      full_name: fullName.trim() || null,
      email: email.trim() || null,
      created_by: user.id,
      expires_at: new Date(Date.now() + 30 * 864e5).toISOString(),
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    setFullName(""); setEmail("");
    toast.success(`Code créé : ${code}`);
    load();
  };

  const revokeInvite = async (id: string) => {
    const { error } = await supabase.from("space_invites").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Invitation supprimée");
    load();
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copié");
  };

  const activeInvites = useMemo(() => invites.filter((i) => !i.used_by), [invites]);
  const usedInvites = useMemo(() => invites.filter((i) => i.used_by), [invites]);
  const managers = useMemo(() => members.filter((m) => m.role === "manager"), [members]);

  if (!canManage) {
    return <div className="p-8 text-muted-foreground">Vous n'avez pas accès à la gestion d'équipe. Contactez votre RH.</div>;
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center"><UserCog className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl font-bold font-display">Équipe & invitations</h1>
            <p className="text-sm text-muted-foreground">Créez des codes uniques pour vos managers RH et gérez leurs permissions.</p>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="invites">
        <TabsList>
          <TabsTrigger value="invites">Codes d'invitation</TabsTrigger>
          <TabsTrigger value="managers">Managers & permissions</TabsTrigger>
          <TabsTrigger value="members">Membres</TabsTrigger>
        </TabsList>

        <TabsContent value="invites" className="space-y-4 mt-4">
          <Card className="p-5">
            <div className="font-semibold mb-3 flex items-center gap-2"><UserPlus className="w-4 h-4 text-brand" /> Créer une invitation manager</div>
            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <Label>Nom complet (optionnel)</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1" placeholder="Ex. Sara Benali" />
              </div>
              <div>
                <Label>Email (optionnel)</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" placeholder="sara@entreprise.dz" />
              </div>
              <div className="flex items-end">
                <Button onClick={createInvite} disabled={busy} className="w-full gradient-brand border-0">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Générer un code"}
                </Button>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">Chaque code manager est unique, à usage unique, et expire dans 30 jours.</p>
          </Card>

          <Card className="p-5">
            <div className="font-semibold mb-3">Invitations actives ({activeInvites.length})</div>
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-brand" /> : activeInvites.length === 0 ? (
              <div className="text-sm text-muted-foreground">Aucune invitation active.</div>
            ) : (
              <div className="space-y-2">
                {activeInvites.map((inv) => (
                  <div key={inv.id} className="flex items-center gap-3 p-3 rounded-xl border bg-card">
                    <Badge>Manager</Badge>
                    <code className="font-mono text-sm font-semibold tracking-wider">{inv.code}</code>
                    <div className="text-sm text-muted-foreground flex-1 truncate">{inv.full_name || inv.email || "—"}</div>
                    <div className="text-[11px] text-muted-foreground">Expire {inv.expires_at ? new Date(inv.expires_at).toLocaleDateString() : "—"}</div>
                    <Button size="sm" variant="outline" onClick={() => copyCode(inv.code)}><Copy className="w-3.5 h-3.5" /></Button>
                    <Button size="sm" variant="outline" onClick={() => revokeInvite(inv.id)}><Trash2 className="w-3.5 h-3.5 text-danger" /></Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {usedInvites.length > 0 && (
            <Card className="p-5">
              <div className="font-semibold mb-3 text-sm text-muted-foreground">Invitations utilisées ({usedInvites.length})</div>
              <div className="space-y-1 text-sm">
                {usedInvites.slice(0, 20).map((inv) => (
                  <div key={inv.id} className="flex items-center gap-3 text-muted-foreground">
                    <code className="font-mono text-xs">{inv.code}</code>
                    <span>{inv.full_name || inv.email || "—"}</span>
                    <span className="text-[11px]">Utilisé {inv.used_at ? new Date(inv.used_at).toLocaleDateString() : ""}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="managers" className="mt-4 space-y-4">
          {managers.length === 0 ? (
            <Card className="p-6 text-sm text-muted-foreground">Aucun manager pour l'instant — invitez-en un depuis l'onglet <strong>Codes d'invitation</strong>.</Card>
          ) : managers.map((m) => spaceId && <ManagerPermissions key={m.user_id} spaceId={spaceId} member={m} />)}
        </TabsContent>

        <TabsContent value="members" className="mt-4">
          <Card className="p-5">
            <div className="font-semibold mb-3">Équipe de gestion ({members.length})</div>
            {members.length === 0 ? <div className="text-sm text-muted-foreground">Aucun membre.</div> : (
              <div className="space-y-2">
                {members.map((m) => (
                  <div key={m.user_id + m.role} className="flex items-center gap-3 p-2.5 rounded-lg border">
                    <Badge variant={m.role === "hr_admin" ? "default" : "secondary"}>
                      {m.role === "hr_admin" ? "RH Admin" : "Manager"}
                    </Badge>
                    <div className="text-sm">{m.full_name || m.user_id.slice(0, 8)}</div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ManagerPermissions({ spaceId, member }: { spaceId: string; member: MemberRow }) {
  const [perms, setPerms] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("manager_permissions").select("module").eq("space_id", spaceId).eq("user_id", member.user_id);
    setPerms(new Set((data ?? []).map((p) => p.module)));
    setLoading(false);
  }, [spaceId, member.user_id]);

  useEffect(() => { load(); }, [load]);

  const toggle = async (module: string, checked: boolean) => {
    if (checked) {
      const { error } = await supabase.from("manager_permissions").insert({ space_id: spaceId, user_id: member.user_id, module });
      if (error) return toast.error(error.message);
      setPerms((p) => new Set(p).add(module));
    } else {
      const { error } = await supabase.from("manager_permissions").delete().eq("space_id", spaceId).eq("user_id", member.user_id).eq("module", module);
      if (error) return toast.error(error.message);
      setPerms((p) => { const n = new Set(p); n.delete(module); return n; });
    }
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-brand/20 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-brand" /></div>
        <div>
          <div className="font-semibold">{member.full_name || member.user_id.slice(0, 8)}</div>
          <div className="text-xs text-muted-foreground">Manager · définissez ses modules accessibles</div>
        </div>
      </div>
      {loading ? <Loader2 className="w-4 h-4 animate-spin text-brand" /> : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {MODULES.map((m) => (
            <label key={m.key} className="flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer hover:bg-muted/50">
              <Checkbox checked={perms.has(m.key)} onCheckedChange={(v) => toggle(m.key, !!v)} />
              <span className="text-sm">{m.label}</span>
            </label>
          ))}
        </div>
      )}
    </Card>
  );
}
