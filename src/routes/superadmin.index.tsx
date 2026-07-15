import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Users, AlertCircle, Loader2, Search, MoreHorizontal, Settings, ShieldCheck, Mail, CheckCircle2, XCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { sendAccessTokenEmail } from "@/lib/mailer";

export const Route = createFileRoute("/superadmin/")({
  head: () => ({ meta: [{ title: "Super Admin Dashboard — Wellwork" }] }),
  component: SuperAdminDashboard,
});

type SpaceInfo = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  subscription_status: string;
  owner_id: string;
  owner_email?: string;
  member_count?: number;
  trial_expires_at?: string;
};

type DemoRequest = {
  id: string;
  company_name: string;
  company_description: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  access_token?: string;
};

function SuperAdminDashboard() {
  const [tab, setTab] = useState<"spaces" | "demos">("spaces");
  
  const [spaces, setSpaces] = useState<SpaceInfo[]>([]);
  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ totalSpaces: 0, totalUsers: 0, activeSpaces: 0, pendingDemos: 0 });

  // Dialog State
  const [selectedDemo, setSelectedDemo] = useState<DemoRequest | null>(null);
  const [trialDuration, setTrialDuration] = useState("30");
  const [isApproving, setIsApproving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    
    // Fetch spaces
    const { data: spacesData, error: spacesError } = await supabase
      .from("spaces")
      .select("*")
      .order("created_at", { ascending: false });

    if (spacesError) {
      toast.error("Erreur de chargement des entreprises: " + spacesError.message);
    }

    // Fetch members count for each space
    const { data: membersData } = await supabase
      .from("space_members")
      .select("space_id, user_id");

    const membersBySpace = (membersData ?? []).reduce((acc, curr) => {
      acc[curr.space_id] = (acc[curr.space_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const enrichedSpaces = (spacesData ?? []).map(space => ({
      ...space,
      member_count: membersBySpace[space.id] || 0,
      owner_email: space.owner_id
    }));

    // Fetch demo requests
    const { data: requestsData } = await supabase
      .from("demo_requests")
      .select("*")
      .order("created_at", { ascending: false });

    setSpaces(enrichedSpaces);
    setDemoRequests(requestsData ?? []);
    setStats({
      totalSpaces: enrichedSpaces.length,
      totalUsers: new Set((membersData ?? []).map(m => m.user_id)).size,
      activeSpaces: enrichedSpaces.filter(s => s.subscription_status === 'active').length || enrichedSpaces.length,
      pendingDemos: (requestsData ?? []).filter(r => r.status === 'pending').length
    });
    
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const approveDemo = async () => {
    if (!selectedDemo) return;
    setIsApproving(true);
    
    // Generate UUID token
    const token = crypto.randomUUID();
    
    const { error } = await supabase
      .from("demo_requests")
      .update({
        status: "approved",
        access_token: token,
        trial_duration_days: parseInt(trialDuration) || 30,
        reviewed_at: new Date().toISOString()
      })
      .eq("id", selectedDemo.id);
      
    if (error) {
      setIsApproving(false);
      toast.error(error.message);
      return;
    }

    try {
      await sendAccessTokenEmail({ 
        data: { 
          email: selectedDemo.email, 
          companyName: selectedDemo.company_name, 
          token 
        } 
      });
      toast.success("Jeton généré et email envoyé avec succès !");
    } catch (err) {
      console.error(err);
      toast.warning("Jeton généré, mais l'envoi de l'email a échoué. Vérifiez vos identifiants Gmail.");
    }
    
    setIsApproving(false);
    setSelectedDemo(null);
    loadData();
  };

  const rejectDemo = async (id: string) => {
    const { error } = await supabase
      .from("demo_requests")
      .update({ status: "rejected", reviewed_at: new Date().toISOString() })
      .eq("id", id);
      
    if (error) return toast.error(error.message);
    toast.success("Demande rejetée.");
    loadData();
  };

  const filteredSpaces = spaces.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.slug.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredDemos = demoRequests.filter(d => 
    d.company_name.toLowerCase().includes(search.toLowerCase()) || 
    d.contact_email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-display">Vue d'ensemble de la plateforme</h1>
        <p className="text-sm text-muted-foreground mt-1">Gérez toutes les entreprises et surveillez l'activité globale.</p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-brand" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Entreprises</div>
              <div className="text-2xl font-bold">{loading ? "-" : stats.totalSpaces}</div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Utilisateurs</div>
              <div className="text-2xl font-bold">{loading ? "-" : stats.totalUsers}</div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Actifs</div>
              <div className="text-2xl font-bold">{loading ? "-" : stats.activeSpaces}</div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="p-6 rounded-2xl flex items-center gap-4 border-amber-500/30">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Demandes (Démo)</div>
              <div className="text-2xl font-bold">{loading ? "-" : stats.pendingDemos}</div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">
        <button 
          onClick={() => setTab("spaces")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'spaces' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Entreprises Inscrits
        </button>
        <button 
          onClick={() => setTab("demos")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${tab === 'demos' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Demandes de Démo
          {stats.pendingDemos > 0 && (
            <Badge variant="default" className="h-5 px-1.5 min-w-[20px] rounded-full bg-brand flex items-center justify-center text-[10px]">
              {stats.pendingDemos}
            </Badge>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === "spaces" ? (
          <motion.div key="spaces" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card className="p-1 rounded-2xl">
              <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border/40">
                <h2 className="font-semibold text-lg flex items-center gap-2">Comptes Entreprise</h2>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une entreprise..." className="ps-9 rounded-xl bg-muted/50 border-transparent focus-visible:bg-background" />
                </div>
              </div>

              {loading ? (
                <div className="p-12 flex justify-center items-center"><Loader2 className="w-8 h-8 animate-spin text-brand/50" /></div>
              ) : filteredSpaces.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground"><Building2 className="w-12 h-12 mx-auto mb-3 opacity-20" /><p>Aucune entreprise trouvée</p></div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/40 hover:bg-transparent">
                        <TableHead>Nom de l'entreprise</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Membres</TableHead>
                        <TableHead>Créé le</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSpaces.map((space, i) => (
                        <TableRow key={space.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">{space.name}</TableCell>
                          <TableCell><code className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">{space.slug}</code></TableCell>
                          <TableCell><Badge variant="secondary" className="font-medium">{space.member_count}</Badge></TableCell>
                          <TableCell className="text-sm text-muted-foreground">{new Date(space.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={space.subscription_status === 'active' ? 'default' : space.subscription_status === 'trial' ? 'secondary' : 'outline'} className={space.subscription_status === 'active' ? 'bg-emerald-500 hover:bg-emerald-600' : space.subscription_status === 'trial' ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' : ''}>
                              {space.subscription_status || 'active'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-xl">
                                <DropdownMenuItem className="cursor-pointer gap-2"><Settings className="w-4 h-4" /> Gérer l'espace</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"><AlertCircle className="w-4 h-4" /> Suspendre</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </motion.div>
        ) : (
          <motion.div key="demos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card className="p-1 rounded-2xl border-brand/20">
              <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border/40">
                <h2 className="font-semibold text-lg flex items-center gap-2">Demandes de Démo</h2>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une entreprise..." className="ps-9 rounded-xl bg-muted/50 border-transparent focus-visible:bg-background" />
                </div>
              </div>

              {loading ? (
                <div className="p-12 flex justify-center items-center"><Loader2 className="w-8 h-8 animate-spin text-brand/50" /></div>
              ) : filteredDemos.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground"><Mail className="w-12 h-12 mx-auto mb-3 opacity-20" /><p>Aucune demande de démo</p></div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/40 hover:bg-transparent">
                        <TableHead>Entreprise</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Demande</TableHead>
                        <TableHead>Jeton (Si approuvé)</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDemos.map((demo) => (
                        <TableRow key={demo.id} className="border-b border-border/40 hover:bg-muted/30">
                          <TableCell>
                            <div className="font-medium">{demo.company_name}</div>
                            <div className="text-xs text-muted-foreground">{new Date(demo.created_at).toLocaleDateString()}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{demo.contact_name}</div>
                            <div className="text-xs text-muted-foreground">{demo.contact_email}</div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground" title={demo.company_description}>
                            {demo.company_description}
                          </TableCell>
                          <TableCell>
                            {demo.access_token ? (
                              <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-brand">{demo.access_token}</code>
                            ) : <span className="text-muted-foreground text-xs">—</span>}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              demo.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                              demo.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                              'bg-destructive/10 text-destructive border-destructive/20'
                            }>
                              {demo.status === 'pending' ? 'En attente' : demo.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {demo.status === 'pending' && (
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => rejectDemo(demo.id)}>
                                  <XCircle className="w-3.5 h-3.5 me-1" /> Rejeter
                                </Button>
                                <Button size="sm" className="h-8 gradient-brand border-0" onClick={() => setSelectedDemo(demo)}>
                                  <CheckCircle2 className="w-3.5 h-3.5 me-1" /> Approuver
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={!!selectedDemo} onOpenChange={(open) => !open && setSelectedDemo(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Approuver la demande</DialogTitle>
            <DialogDescription>
              Vous allez générer un jeton d'accès pour <strong>{selectedDemo?.company_name}</strong>. Ce jeton devra leur être envoyé par email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Durée de l'essai (en jours)</Label>
              <Input type="number" value={trialDuration} onChange={(e) => setTrialDuration(e.target.value)} min="1" max="365" className="bg-muted/50" />
              <p className="text-xs text-muted-foreground">Une fois le jeton utilisé, l'espace sera actif pour cette durée.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedDemo(null)}>Annuler</Button>
            <Button onClick={approveDemo} disabled={isApproving} className="gradient-brand border-0">
              {isApproving ? <Loader2 className="w-4 h-4 animate-spin me-2" /> : <CheckCircle2 className="w-4 h-4 me-2" />}
              Approuver & Générer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
