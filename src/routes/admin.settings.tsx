import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Shield, Users2, Lock, Plug, Bell, Palette, Database,
  KeyRound, Copy, CheckCircle2, Globe, FileCheck2, Trash2, Plus,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Paramètres — QVT-Care" }] }),
  component: SettingsPage,
});

type TabKey = "organization" | "roles" | "security" | "anonymization" | "integrations" | "notifications" | "branding" | "data";

function SettingsPage() {
  const { pick } = useI18n();
  const [tab, setTab] = useState<TabKey>("organization");
  const isDark = useStore((s) => s.isDarkMode);
  const toggleDark = useStore((s) => s.toggleDarkMode);

  const tabs: { key: TabKey; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
    { key: "organization", icon: Building2, label: pick("Organisation", "المؤسسة", "Organization") },
    { key: "roles", icon: Users2, label: pick("Rôles & permissions", "الأدوار والصلاحيات", "Roles & permissions") },
    { key: "security", icon: Shield, label: pick("Sécurité & RGPD", "الأمان والامتثال", "Security & Compliance") },
    { key: "anonymization", icon: Lock, label: pick("Anonymisation", "التجهيل", "Anonymization") },
    { key: "integrations", icon: Plug, label: pick("Intégrations ERP/API", "التكامل", "Integrations") },
    { key: "notifications", icon: Bell, label: pick("Notifications", "الإشعارات", "Notifications") },
    { key: "branding", icon: Palette, label: pick("Apparence", "المظهر", "Appearance") },
    { key: "data", icon: Database, label: pick("Données", "البيانات", "Data") },
  ];

  return (
    <div>
      <PageHeader
        title={pick("Paramètres", "الإعدادات", "Settings")}
        subtitle={pick(
          "Gérer la configuration multi-tenant, la sécurité, les intégrations et la conformité (Loi 18-07).",
          "إدارة الإعدادات متعددة المستأجرين والأمان والتكامل والامتثال.",
          "Manage multi-tenant configuration, security, integrations and compliance."
        )}
      />

      <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/40 p-1 rounded-2xl mb-6">
          {tabs.map(({ key, icon: Icon, label }) => (
            <TabsTrigger key={key} value={key} className="rounded-xl gap-2 data-[state=active]:gradient-brand data-[state=active]:text-white">
              <Icon className="w-4 h-4" /> {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="organization"><OrganizationTab /></TabsContent>
        <TabsContent value="roles"><RolesTab /></TabsContent>
        <TabsContent value="security"><SecurityTab /></TabsContent>
        <TabsContent value="anonymization"><AnonymizationTab /></TabsContent>
        <TabsContent value="integrations"><IntegrationsTab /></TabsContent>
        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
        <TabsContent value="branding">
          <BrandingTab isDark={isDark} onToggleDark={toggleDark} />
        </TabsContent>
        <TabsContent value="data"><DataTab /></TabsContent>
      </Tabs>
    </div>
  );
}

/* ---------- Reusable UI ---------- */

function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-6 rounded-2xl border-border/60">
        <div className="mb-4">
          <h3 className="text-base font-semibold">{title}</h3>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <Separator className="mb-4" />
        {children}
      </Card>
    </motion.div>
  );
}

function ToggleRow({ title, desc, defaultChecked = false, checked, onCheckedChange }: {
  title: string; desc: string; defaultChecked?: boolean; checked?: boolean; onCheckedChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </div>
      {checked !== undefined
        ? <Switch checked={checked} onCheckedChange={onCheckedChange} />
        : <Switch defaultChecked={defaultChecked} />}
    </div>
  );
}

/* ---------- Organization ---------- */

function OrganizationTab() {
  const { pick } = useI18n();
  const tenant = useStore((s) => s.tenant);
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
      <SectionCard
        title={pick("Identité du tenant", "هوية المستأجر", "Tenant identity")}
        description={pick("Espace isolé et chiffré pour votre organisation.", "مساحة معزولة ومشفرة لمؤسستكم.", "Isolated, encrypted workspace for your organization.")}
      >
        <div className="space-y-4">
          <div><Label>{pick("Nom", "الاسم", "Name")}</Label><Input defaultValue={tenant} className="mt-1 rounded-xl" /></div>
          <div><Label>{pick("Identifiant tenant", "معرف المستأجر", "Tenant ID")}</Label>
            <div className="flex gap-2 mt-1">
              <Input readOnly value="tnt_2f9a-techdz" className="rounded-xl font-mono text-xs" />
              <Button variant="outline" size="icon" className="rounded-xl" onClick={() => { navigator.clipboard.writeText("tnt_2f9a-techdz"); toast.success(pick("Copié", "تم النسخ", "Copied")); }}><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
          <div><Label>{pick("Secteur", "القطاع", "Sector")}</Label>
            <Select defaultValue="tech">
              <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">{pick("Technologies", "التقنية", "Technology")}</SelectItem>
                <SelectItem value="bank">{pick("Banque & Finance", "بنوك ومالية", "Banking & Finance")}</SelectItem>
                <SelectItem value="health">{pick("Santé", "الصحة", "Healthcare")}</SelectItem>
                <SelectItem value="energy">{pick("Énergie", "الطاقة", "Energy")}</SelectItem>
                <SelectItem value="public">{pick("Secteur public", "القطاع العام", "Public sector")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>{pick("Effectif", "عدد الموظفين", "Headcount")}</Label><Input type="number" defaultValue={487} className="mt-1 rounded-xl" /></div>
        </div>
      </SectionCard>

      <SectionCard
        title={pick("Localisation & résidence des données", "الموقع ومسكن البيانات", "Locale & data residency")}
        description={pick("Conformité Loi 18-07 · hébergement Algérie / UE au choix.", "امتثال للقانون 18-07.", "Law 18-07 compliance · Algeria / EU hosting.")}
      >
        <div className="space-y-4">
          <div><Label>{pick("Langue par défaut", "اللغة الافتراضية", "Default language")}</Label>
            <Select defaultValue="fr">
              <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>{pick("Fuseau horaire", "المنطقة الزمنية", "Timezone")}</Label>
            <Select defaultValue="algiers">
              <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="algiers">Africa/Algiers (GMT+1)</SelectItem>
                <SelectItem value="paris">Europe/Paris (GMT+1/+2)</SelectItem>
                <SelectItem value="dubai">Asia/Dubai (GMT+4)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>{pick("Région d'hébergement", "منطقة الاستضافة", "Hosting region")}</Label>
            <Select defaultValue="dz">
              <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dz">🇩🇿 {pick("Algérie (souverain)", "الجزائر (سيادي)", "Algeria (sovereign)")}</SelectItem>
                <SelectItem value="eu">🇪🇺 {pick("Union Européenne", "الاتحاد الأوروبي", "European Union")}</SelectItem>
                <SelectItem value="onprem">🏢 {pick("On-premise / Cloud privé", "داخلي / سحابة خاصة", "On-premise / Private cloud")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Badge className="gap-1 bg-success/10 text-success border-0"><CheckCircle2 className="w-3 h-3" /> {pick("Loi 18-07 active", "القانون 18-07 مفعل", "Law 18-07 active")}</Badge>
            <Badge variant="secondary" className="gap-1"><Globe className="w-3 h-3" /> RGPD-ready</Badge>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

/* ---------- Roles & Permissions ---------- */

const seedRoles = [
  { name: "Super Admin", users: 2, color: "danger", perms: ["all"] },
  { name: "RH Manager", users: 5, color: "brand", perms: ["employees", "surveys", "alerts", "reports"] },
  { name: "Manager", users: 18, color: "teal", perms: ["dashboard", "team-view"] },
  { name: "Analyste QVT", users: 3, color: "warning", perms: ["reports", "burnout", "read"] },
  { name: "Employé", users: 459, color: "muted", perms: ["surveys", "feedback", "library"] },
];

const permMatrix = [
  { module: "Dashboard", roles: [true, true, true, true, false] },
  { module: "Employés", roles: [true, true, false, false, false] },
  { module: "Enquêtes", roles: [true, true, false, true, true] },
  { module: "Espace anonyme", roles: [true, true, false, false, true] },
  { module: "Burnout IA", roles: [true, true, false, true, false] },
  { module: "Alertes RPS", roles: [true, true, false, true, false] },
  { module: "Plans d'action", roles: [true, true, true, true, false] },
  { module: "Rapports & exports", roles: [true, true, false, true, false] },
  { module: "Paramètres", roles: [true, false, false, false, false] },
];

function RolesTab() {
  const { pick } = useI18n();
  return (
    <div className="space-y-6 max-w-6xl">
      <SectionCard
        title={pick("Rôles définis", "الأدوار المحددة", "Defined roles")}
        description={pick("Contrôle d'accès basé sur les rôles (RBAC).", "التحكم في الوصول القائم على الأدوار.", "Role-based access control (RBAC).")}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {seedRoles.map((r) => (
            <div key={r.name} className="rounded-xl border border-border/60 p-4 hover:border-brand/40 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{r.users} {pick("utilisateurs", "مستخدمين", "users")}</div>
                </div>
                <Badge variant="secondary" className="text-[10px]">{r.perms.length} perms</Badge>
              </div>
            </div>
          ))}
          <button className="rounded-xl border-2 border-dashed border-border/60 p-4 hover:border-brand hover:text-brand text-sm text-muted-foreground transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> {pick("Nouveau rôle", "دور جديد", "New role")}
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title={pick("Matrice de permissions", "مصفوفة الصلاحيات", "Permissions matrix")}
        description={pick("Vue croisée modules × rôles.", "عرض متقاطع للوحدات والأدوار.", "Cross-view of modules × roles.")}
      >
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b">
                <th className="py-2 pr-4 font-medium">{pick("Module", "الوحدة", "Module")}</th>
                {seedRoles.map((r) => <th key={r.name} className="py-2 px-2 text-center font-medium">{r.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {permMatrix.map((row) => (
                <tr key={row.module} className="border-b border-border/40 hover:bg-muted/30">
                  <td className="py-2.5 pr-4 font-medium">{row.module}</td>
                  {row.roles.map((v, i) => (
                    <td key={i} className="py-2.5 px-2 text-center">
                      <Switch defaultChecked={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

/* ---------- Security & Compliance ---------- */

function SecurityTab() {
  const { pick } = useI18n();
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
      <SectionCard
        title={pick("Authentification", "المصادقة", "Authentication")}
        description={pick("Politiques d'accès aux comptes.", "سياسات الوصول للحسابات.", "Account access policies.")}
      >
        <ToggleRow title={pick("Authentification à deux facteurs (2FA)", "مصادقة ثنائية", "Two-factor authentication (2FA)")} desc={pick("Obligatoire pour tous les administrateurs.", "إجبارية للمسؤولين.", "Required for all administrators.")} defaultChecked />
        <ToggleRow title="SSO / SAML 2.0" desc={pick("Azure AD, Okta, Google Workspace.", "الدخول الموحد.", "Azure AD, Okta, Google Workspace.")} defaultChecked />
        <ToggleRow title={pick("Verrouillage après 5 tentatives", "قفل بعد 5 محاولات", "Lock after 5 failed attempts")} desc={pick("Protection anti brute-force.", "حماية من الهجمات.", "Brute-force protection.")} defaultChecked />
        <div className="pt-3">
          <Label className="text-xs">{pick("Durée de session (minutes)", "مدة الجلسة", "Session duration (min)")}</Label>
          <Input type="number" defaultValue={30} className="mt-1 rounded-xl w-32" />
        </div>
      </SectionCard>

      <SectionCard
        title={pick("Chiffrement & confidentialité", "التشفير والسرية", "Encryption & confidentiality")}
        description={pick("Protection cryptographique des données.", "حماية تشفيرية للبيانات.", "Cryptographic data protection.")}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success" /> {pick("Chiffrement au repos AES-256", "تشفير AES-256", "AES-256 encryption at rest")}</div>
          <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success" /> {pick("TLS 1.3 en transit", "TLS 1.3 أثناء النقل", "TLS 1.3 in transit")}</div>
          <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success" /> {pick("Hachage des identifiants d'enquêtes (SHA-256)", "تجزئة معرفات الاستطلاع", "Survey ID hashing (SHA-256)")}</div>
          <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success" /> {pick("Séparation stricte des tenants", "فصل صارم للمستأجرين", "Strict tenant isolation")}</div>
        </div>
        <Separator className="my-4" />
        <ToggleRow title={pick("Journal d'audit détaillé", "سجل التدقيق التفصيلي", "Detailed audit log")} desc={pick("Trace tous les accès administrateurs.", "يسجل كل عمليات الوصول.", "Traces all admin accesses.")} defaultChecked />
        <ToggleRow title={pick("Rotation automatique des clés (90j)", "تدوير المفاتيح تلقائياً", "Auto key rotation (90d)")} desc={pick("Renouvellement des secrets tenant.", "تجديد أسرار المستأجر.", "Tenant secret renewal.")} defaultChecked />
      </SectionCard>

      <SectionCard
        title={pick("Conformité Loi 18-07", "الامتثال للقانون 18-07", "Law 18-07 compliance")}
        description={pick("Protection des personnes physiques dans le traitement des données.", "حماية الأشخاص في معالجة البيانات.", "Protection of individuals in data processing.")}
      >
        <ToggleRow title={pick("Registre des traitements", "سجل المعالجات", "Processing register")} desc={pick("Documentation des finalités de traitement.", "توثيق أغراض المعالجة.", "Documentation of processing purposes.")} defaultChecked />
        <ToggleRow title={pick("Consentement explicite", "الموافقة الصريحة", "Explicit consent")} desc={pick("Recueil du consentement à l'inscription.", "الحصول على الموافقة عند التسجيل.", "Consent capture at signup.")} defaultChecked />
        <ToggleRow title={pick("Droit à l'oubli", "الحق في النسيان", "Right to be forgotten")} desc={pick("Suppression sur demande sous 30j.", "الحذف عند الطلب خلال 30 يوم.", "Deletion on request within 30d.")} defaultChecked />
        <ToggleRow title={pick("Notification de violation (72h)", "إشعار الانتهاك (72 ساعة)", "Breach notification (72h)")} desc={pick("Alerte automatique à l'ARPCE.", "تنبيه تلقائي.", "Automatic ARPCE alert.")} defaultChecked />
      </SectionCard>

      <SectionCard
        title={pick("Politique de mots de passe", "سياسة كلمات المرور", "Password policy")}
        description={pick("Exigences minimales.", "المتطلبات الدنيا.", "Minimum requirements.")}
      >
        <ToggleRow title={pick("Minimum 12 caractères", "12 حرف على الأقل", "Minimum 12 characters")} desc={pick("Longueur recommandée NIST.", "طول موصى به.", "NIST-recommended length.")} defaultChecked />
        <ToggleRow title={pick("Caractères mixtes obligatoires", "أحرف مختلطة إلزامية", "Mixed characters required")} desc={pick("Majuscules, chiffres, symboles.", "أحرف كبيرة وأرقام ورموز.", "Uppercase, numbers, symbols.")} defaultChecked />
        <ToggleRow title={pick("Interdire mots de passe compromis", "منع كلمات مرور مسربة", "Block breached passwords")} desc={pick("Vérification HaveIBeenPwned.", "التحقق من التسريبات.", "HaveIBeenPwned check.")} defaultChecked />
        <ToggleRow title={pick("Renouvellement obligatoire (90j)", "تجديد إلزامي (90 يوم)", "Force renewal (90d)")} desc={pick("Pour les comptes admin.", "للحسابات الإدارية.", "For admin accounts.")} />
      </SectionCard>
    </div>
  );
}

/* ---------- Anonymization ---------- */

function AnonymizationTab() {
  const { pick } = useI18n();
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
      <SectionCard
        title={pick("Protection de l'identité", "حماية الهوية", "Identity protection")}
        description={pick("Garantit que RH ne peut pas identifier un répondant.", "يضمن عدم تحديد هوية المشاركين.", "Ensures HR cannot identify a respondent.")}
      >
        <ToggleRow title={pick("K-anonymat (k ≥ 6)", "التجهيل الجماعي (k ≥ 6)", "K-anonymity (k ≥ 6)")} desc={pick("Bloque tout affichage sous 6 répondants.", "يمنع العرض تحت 6 مشاركين.", "Blocks display below 6 respondents.")} defaultChecked />
        <ToggleRow title={pick("Bruit différentiel (ε=1.0)", "التشويش التفاضلي", "Differential privacy (ε=1.0)")} desc={pick("Ajoute du bruit statistique aux agrégats.", "يضيف تشويشاً إحصائياً.", "Adds statistical noise to aggregates.")} defaultChecked />
        <ToggleRow title={pick("Masquage géographique", "تعمية جغرافية", "Geographic masking")} desc={pick("Cache les petits sites (< 20 personnes).", "يخفي المواقع الصغيرة.", "Hides small sites (< 20 people).")} defaultChecked />
        <ToggleRow title={pick("Rotation des tokens de feedback", "تدوير رموز الملاحظات", "Feedback token rotation")} desc={pick("Renouvellement à chaque cycle.", "تجديد كل دورة.", "Renewed each cycle.")} defaultChecked />
      </SectionCard>

      <SectionCard
        title={pick("Rétention des données", "الاحتفاظ بالبيانات", "Data retention")}
        description={pick("Durées de conservation configurables.", "مدد قابلة للتكوين.", "Configurable retention periods.")}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
            <Label className="text-sm">{pick("Réponses d'enquêtes", "ردود الاستطلاعات", "Survey responses")}</Label>
            <Input type="number" defaultValue={24} className="w-24 rounded-xl" />
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
            <Label className="text-sm">{pick("Feedback anonyme", "الملاحظات المجهولة", "Anonymous feedback")}</Label>
            <Input type="number" defaultValue={12} className="w-24 rounded-xl" />
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
            <Label className="text-sm">{pick("Journaux d'audit", "سجلات التدقيق", "Audit logs")}</Label>
            <Input type="number" defaultValue={36} className="w-24 rounded-xl" />
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
            <Label className="text-sm">{pick("Alertes IA burnout", "تنبيهات الذكاء الاصطناعي", "AI burnout alerts")}</Label>
            <Input type="number" defaultValue={18} className="w-24 rounded-xl" />
          </div>
          <p className="text-[11px] text-muted-foreground pt-2">{pick("Durée en mois. Suppression automatique après échéance.", "المدة بالأشهر. حذف تلقائي بعد انتهاء الصلاحية.", "In months. Automatic deletion after expiry.")}</p>
        </div>
      </SectionCard>
    </div>
  );
}

/* ---------- Integrations ---------- */

const integrationList = [
  { key: "sap", name: "SAP SuccessFactors", desc: { fr: "Synchronisation employés, absentéisme, turnover.", ar: "مزامنة الموظفين والغياب والدوران.", en: "Employee sync, absenteeism, turnover." }, connected: true, color: "bg-blue-500" },
  { key: "oracle", name: "Oracle HCM Cloud", desc: { fr: "Import des données RH via API REST.", ar: "استيراد بيانات الموارد البشرية.", en: "HR data import via REST API." }, connected: true, color: "bg-red-500" },
  { key: "workday", name: "Workday", desc: { fr: "Import organigramme et compétences.", ar: "استيراد المخطط التنظيمي.", en: "Org chart & skills import." }, connected: false, color: "bg-orange-500" },
  { key: "teams", name: "Microsoft Teams", desc: { fr: "Notifications d'alertes et rappels d'enquêtes.", ar: "إشعارات التنبيهات.", en: "Alert notifications & survey reminders." }, connected: true, color: "bg-indigo-500" },
  { key: "slack", name: "Slack", desc: { fr: "Push des alertes RPS critiques.", ar: "دفع التنبيهات الحرجة.", en: "Push critical RPS alerts." }, connected: false, color: "bg-purple-500" },
  { key: "google", name: "Google Workspace", desc: { fr: "SSO et calendrier des campagnes.", ar: "الدخول الموحد.", en: "SSO & campaign calendar." }, connected: false, color: "bg-green-500" },
];

function IntegrationsTab() {
  const { pick } = useI18n();
  return (
    <div className="space-y-6 max-w-6xl">
      <SectionCard
        title={pick("Connecteurs ERP & outils", "موصلات ERP والأدوات", "ERP connectors & tools")}
        description={pick("Intégration bidirectionnelle avec vos systèmes existants.", "تكامل ثنائي الاتجاه.", "Bi-directional integration with existing systems.")}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {integrationList.map((i) => (
            <div key={i.key} className="rounded-xl border border-border/60 p-4 hover:border-brand/40 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className={`w-9 h-9 rounded-lg ${i.color} flex items-center justify-center text-white text-sm font-bold`}>{i.name[0]}</div>
                {i.connected
                  ? <Badge className="bg-success/10 text-success border-0 gap-1"><CheckCircle2 className="w-3 h-3" /> {pick("Connecté", "متصل", "Connected")}</Badge>
                  : <Badge variant="secondary">{pick("Non connecté", "غير متصل", "Not connected")}</Badge>}
              </div>
              <div className="text-sm font-semibold">{i.name}</div>
              <div className="text-xs text-muted-foreground mt-1 mb-3">{pick(i.desc.fr, i.desc.ar, i.desc.en)}</div>
              <Button size="sm" variant={i.connected ? "outline" : "default"} className={`w-full rounded-xl ${!i.connected && "gradient-brand text-white border-0"}`}>
                {i.connected ? pick("Configurer", "تكوين", "Configure") : pick("Connecter", "اتصال", "Connect")}
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title={pick("Clés API", "مفاتيح API", "API keys")}
        description={pick("Accès programmatique à votre tenant.", "الوصول البرمجي للمستأجر.", "Programmatic access to your tenant.")}
      >
        <div className="space-y-3">
          {[
            { name: "Production", key: "qvt_pk_live_••••••••7f2a", scope: "read/write", created: "12/06/2026" },
            { name: "Analytics", key: "qvt_pk_read_••••••••1c9e", scope: "read-only", created: "01/07/2026" },
          ].map((k) => (
            <div key={k.key} className="flex items-center gap-3 rounded-xl border border-border/60 p-3">
              <div className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center"><KeyRound className="w-4 h-4" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{k.name}</div>
                <div className="text-xs text-muted-foreground font-mono truncate">{k.key}</div>
              </div>
              <Badge variant="secondary">{k.scope}</Badge>
              <div className="text-xs text-muted-foreground hidden md:block">{k.created}</div>
              <Button size="sm" variant="ghost" className="rounded-xl text-danger hover:text-danger"><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
          <Button className="rounded-xl gradient-brand text-white border-0 gap-2"><Plus className="w-4 h-4" />{pick("Générer une clé", "إنشاء مفتاح", "Generate key")}</Button>
        </div>
      </SectionCard>

      <SectionCard
        title="Webhooks"
        description={pick("Envoi d'événements vers vos endpoints.", "إرسال الأحداث إلى نقاط النهاية.", "Send events to your endpoints.")}
      >
        <div className="space-y-3">
          <div><Label className="text-xs">{pick("URL de destination", "عنوان URL الوجهة", "Destination URL")}</Label>
            <Input placeholder="https://votre-erp.com/hooks/qvt" className="mt-1 rounded-xl font-mono text-xs" />
          </div>
          <div className="flex flex-wrap gap-2">
            {["burnout.alert", "survey.completed", "feedback.received", "action.updated"].map((e) => (
              <Badge key={e} variant="secondary" className="font-mono text-[11px]">{e}</Badge>
            ))}
          </div>
          <Button variant="outline" className="rounded-xl">{pick("Enregistrer", "حفظ", "Save")}</Button>
        </div>
      </SectionCard>
    </div>
  );
}

/* ---------- Notifications ---------- */

function NotificationsTab() {
  const { pick } = useI18n();
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
      <SectionCard title={pick("Canaux", "القنوات", "Channels")} description={pick("Où recevoir les notifications ?", "أين تتلقى الإشعارات؟", "Where to receive notifications?")}>
        <ToggleRow title="Email" desc={pick("hr@techdz.com", "بريد إلكتروني", "hr@techdz.com")} defaultChecked />
        <ToggleRow title="SMS" desc={pick("+213 5 55 12 34 56", "رسائل نصية", "+213 5 55 12 34 56")} />
        <ToggleRow title="Push (mobile)" desc={pick("Application QVT-Care mobile.", "تطبيق الجوال.", "QVT-Care mobile app.")} defaultChecked />
        <ToggleRow title="Microsoft Teams" desc={pick("Canal #qvt-alerts.", "قناة التنبيهات.", "#qvt-alerts channel.")} defaultChecked />
      </SectionCard>

      <SectionCard title={pick("Types d'événements", "أنواع الأحداث", "Event types")} description={pick("Sélectionnez ce qui déclenche une notification.", "اختر ما يشغل الإشعار.", "Select what triggers a notification.")}>
        <ToggleRow title={pick("Alerte burnout critique", "تنبيه احتراق حرج", "Critical burnout alert")} desc={pick("Score IA > 75.", "درجة > 75.", "AI score > 75.")} defaultChecked />
        <ToggleRow title={pick("Nouveau signalement anonyme", "بلاغ مجهول جديد", "New anonymous report")} desc={pick("Harcèlement, conflit, grief.", "تحرش، نزاع.", "Harassment, conflict, grievance.")} defaultChecked />
        <ToggleRow title={pick("Enquête terminée", "استطلاع مكتمل", "Survey completed")} desc={pick("Résultats disponibles.", "النتائج متاحة.", "Results available.")} defaultChecked />
        <ToggleRow title={pick("Rapport hebdomadaire", "تقرير أسبوعي", "Weekly report")} desc={pick("Chaque lundi 08:00.", "كل اثنين 08:00.", "Every Monday 8am.")} defaultChecked />
        <ToggleRow title={pick("Seuil de participation", "عتبة المشاركة", "Participation threshold")} desc={pick("< 60% sur un département.", "أقل من 60%.", "< 60% on a department.")} defaultChecked />
      </SectionCard>
    </div>
  );
}

/* ---------- Branding ---------- */

function BrandingTab({ isDark, onToggleDark }: { isDark: boolean; onToggleDark: () => void }) {
  const { pick } = useI18n();
  const [primary, setPrimary] = useState("#1E3A8A");
  const [accent, setAccent] = useState("#14B8A6");
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
      <SectionCard title={pick("Apparence", "المظهر", "Appearance")} description={pick("Thème et mode.", "السمة والوضع.", "Theme and mode.")}>
        <ToggleRow title={pick("Mode sombre", "الوضع الداكن", "Dark mode")} desc={pick("Interface en teintes profondes.", "واجهة داكنة.", "Deep-toned interface.")} checked={isDark} onCheckedChange={onToggleDark} />
        <ToggleRow title={pick("Densité compacte", "كثافة مضغوطة", "Compact density")} desc={pick("Réduit les espacements.", "يقلل التباعد.", "Reduces spacing.")} />
        <ToggleRow title={pick("Animations réduites", "تقليل الحركة", "Reduced motion")} desc={pick("Accessibilité — vestibulaire.", "لأسباب الوصولية.", "Vestibular accessibility.")} />
      </SectionCard>

      <SectionCard title={pick("Personnalisation tenant", "تخصيص المستأجر", "Tenant branding")} description={pick("Logo, couleurs et signature.", "الشعار والألوان.", "Logo, colors and signature.")}>
        <div className="space-y-4">
          <div>
            <Label className="text-xs">{pick("Couleur primaire", "اللون الأساسي", "Primary color")}</Label>
            <div className="flex gap-2 mt-1">
              <Input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} className="w-14 h-10 rounded-xl p-1" />
              <Input value={primary} onChange={(e) => setPrimary(e.target.value)} className="rounded-xl font-mono" />
            </div>
          </div>
          <div>
            <Label className="text-xs">{pick("Couleur accent", "لون التمييز", "Accent color")}</Label>
            <div className="flex gap-2 mt-1">
              <Input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="w-14 h-10 rounded-xl p-1" />
              <Input value={accent} onChange={(e) => setAccent(e.target.value)} className="rounded-xl font-mono" />
            </div>
          </div>
          <div>
            <Label className="text-xs">{pick("Logo (SVG/PNG)", "الشعار", "Logo (SVG/PNG)")}</Label>
            <div className="mt-1 rounded-xl border-2 border-dashed border-border/60 p-6 text-center text-xs text-muted-foreground hover:border-brand/40 cursor-pointer">
              {pick("Déposer ou cliquer pour téléverser", "اسحب أو انقر للتحميل", "Drop or click to upload")}
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

/* ---------- Data ---------- */

function DataTab() {
  const { pick } = useI18n();
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
      <SectionCard title={pick("Export & sauvegarde", "التصدير والنسخ الاحتياطي", "Export & backup")} description={pick("Récupérez vos données à tout moment.", "استرد بياناتك في أي وقت.", "Retrieve your data anytime.")}>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start rounded-xl gap-2"><FileCheck2 className="w-4 h-4" /> {pick("Exporter tous les employés (CSV)", "تصدير الموظفين", "Export all employees (CSV)")}</Button>
          <Button variant="outline" className="w-full justify-start rounded-xl gap-2"><FileCheck2 className="w-4 h-4" /> {pick("Exporter les résultats d'enquêtes (Excel)", "تصدير الاستطلاعات", "Export survey results (Excel)")}</Button>
          <Button variant="outline" className="w-full justify-start rounded-xl gap-2"><FileCheck2 className="w-4 h-4" /> {pick("Archive complète du tenant (ZIP)", "أرشيف المستأجر الكامل", "Full tenant archive (ZIP)")}</Button>
          <Separator className="my-2" />
          <ToggleRow title={pick("Sauvegarde chiffrée quotidienne", "نسخ احتياطي مشفر يومي", "Daily encrypted backup")} desc={pick("Conservée 90 jours.", "محفوظ لمدة 90 يوم.", "Retained 90 days.")} defaultChecked />
        </div>
      </SectionCard>

      <SectionCard title={pick("Zone dangereuse", "المنطقة الخطرة", "Danger zone")} description={pick("Actions irréversibles.", "إجراءات لا رجعة فيها.", "Irreversible actions.")}>
        <div className="space-y-3">
          <div className="rounded-xl border border-danger/30 bg-danger/5 p-4">
            <div className="font-medium text-sm text-danger mb-1">{pick("Réinitialiser toutes les enquêtes", "إعادة تعيين الاستطلاعات", "Reset all surveys")}</div>
            <p className="text-xs text-muted-foreground mb-3">{pick("Supprime définitivement les réponses. Ne peut être annulé.", "يحذف الردود نهائياً.", "Permanently deletes responses.")}</p>
            <Button variant="outline" size="sm" className="border-danger/40 text-danger hover:bg-danger/10 rounded-xl">{pick("Réinitialiser", "إعادة تعيين", "Reset")}</Button>
          </div>
          <div className="rounded-xl border border-danger/30 bg-danger/5 p-4">
            <div className="font-medium text-sm text-danger mb-1">{pick("Supprimer le tenant", "حذف المستأجر", "Delete tenant")}</div>
            <p className="text-xs text-muted-foreground mb-3">{pick("Suppression définitive dans 30 jours. Conforme Loi 18-07.", "حذف نهائي خلال 30 يوم.", "Definitive deletion within 30 days.")}</p>
            <Button variant="outline" size="sm" className="border-danger/40 text-danger hover:bg-danger/10 rounded-xl gap-2"><Trash2 className="w-4 h-4" />{pick("Supprimer définitivement", "حذف نهائي", "Delete permanently")}</Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
