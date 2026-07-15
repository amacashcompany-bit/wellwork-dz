import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Plus, Search, ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/hooks/useI18n";
import { useMySpace } from "@/hooks/useAuth";
import { useStore } from "@/store/useStore";

export const Route = createFileRoute("/admin/employees")({
  head: () => ({ meta: [{ title: "Employés — WellWork" }] }),
  component: EmployeesPage,
});

type CompanyEmployee = {
  id: string;
  employeeCode: string;
  fullName: string;
  email: string;
  position: string | null;
  department: string | null;
  status: "active" | "on_leave" | "inactive";
  createdAt: string;
};

type RpcResult = PromiseLike<{ data: unknown; error: { message: string } | null }>;

function parseEmployees(data: unknown): CompanyEmployee[] {
  if (!Array.isArray(data)) return [];
  return data.filter((value): value is CompanyEmployee => {
    if (!value || typeof value !== "object") return false;
    const row = value as Record<string, unknown>;
    return typeof row.id === "string" && typeof row.employeeCode === "string" && typeof row.fullName === "string";
  });
}

function EmployeesPage() {
  const { pick, t } = useI18n();
  const departments = useStore((state) => state.departments);
  const { info } = useMySpace();
  const [employees, setEmployees] = useState<CompanyEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const loadEmployees = useCallback(async () => {
    if (!info?.spaceId) return;
    setLoading(true);
    const listEmployees = supabase.rpc.bind(supabase) as unknown as (
      functionName: "list_company_employees",
    ) => RpcResult;
    const { data, error } = await listEmployees("list_company_employees");
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setEmployees(parseEmployees(data));
  }, [info?.spaceId]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const createEmployee = async () => {
    if (!employeeCode.trim() || !fullName.trim() || !email.trim()) return;
    setBusy(true);
    const createRosterEmployee = supabase.rpc.bind(supabase) as unknown as (
      functionName: "create_company_employee",
      args: { p_employee_code: string; p_full_name: string; p_email: string; p_position: string | null },
    ) => RpcResult;
    const { error } = await createRosterEmployee("create_company_employee", {
      p_employee_code: employeeCode.trim().toUpperCase(),
      p_full_name: fullName.trim(),
      p_email: email.trim(),
      p_position: position.trim() || null,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setEmployeeCode("");
    setFullName("");
    setEmail("");
    setPosition("");
    toast.success("Salarié ajouté au registre");
    loadEmployees();
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return employees;
    return employees.filter((employee) =>
      [employee.employeeCode, employee.fullName, employee.email, employee.position ?? "", employee.department ?? ""]
        .some((value) => value.toLowerCase().includes(needle)),
    );
  }, [employees, query]);

  return (
    <div>
      <PageHeader
        title={pick("Employés & Départements", "الموظفون والأقسام", "Employees & Departments")}
        subtitle={pick("Registre salarié et identifiants d'accès privés.", "سجل الموظفين ومعرفات الوصول الخاصة.", "Employee roster and private access IDs.")}
      />

      <Tabs defaultValue="employees">
        <TabsList>
          <TabsTrigger value="employees">{pick("Employés", "الموظفون", "Employees")} ({employees.length})</TabsTrigger>
          <TabsTrigger value="departments">{pick("Départements", "الأقسام", "Departments")} ({departments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="mt-4 space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-4 h-4 text-brand" />
              <h2 className="font-semibold">{pick("Ajouter un salarié", "إضافة موظف", "Add employee")}</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <div>
                <Label>{pick("Identifiant", "المعرف", "Employee ID")}</Label>
                <Input value={employeeCode} onChange={(event) => setEmployeeCode(event.target.value.toUpperCase())} placeholder="EMP-0142" className="mt-1 font-mono" />
              </div>
              <div>
                <Label>{pick("Nom complet", "الاسم الكامل", "Full name")}</Label>
                <Input value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>{pick("Poste", "المنصب", "Position")}</Label>
                <Input value={position} onChange={(event) => setPosition(event.target.value)} className="mt-1" />
              </div>
              <div className="flex items-end">
                <Button onClick={createEmployee} disabled={busy || !employeeCode.trim() || !fullName.trim() || !email.trim()} className="w-full">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4 me-2" />{pick("Ajouter", "إضافة", "Add")}</>}
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("search")} className="ps-9" />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-brand" />
                {pick("L'activation du compte reste confidentielle", "يبقى تفعيل الحساب سرياً", "Account activation remains private")}
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{pick("Identifiant", "المعرف", "Employee ID")}</TableHead>
                    <TableHead>{pick("Employé", "الموظف", "Employee")}</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>{pick("Poste", "المنصب", "Position")}</TableHead>
                    <TableHead>{pick("Département", "القسم", "Department")}</TableHead>
                    <TableHead>{pick("Statut", "الحالة", "Status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={6} className="h-24 text-center"><Loader2 className="w-5 h-5 animate-spin text-brand mx-auto" /></TableCell></TableRow>
                  ) : filtered.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">{pick("Aucun salarié dans ce registre.", "لا يوجد موظفون في هذا السجل.", "No employees in this roster.")}</TableCell></TableRow>
                  ) : filtered.map((employee, index) => (
                    <motion.tr key={employee.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.02 }} className="border-b hover:bg-muted/40">
                      <TableCell><code className="font-mono font-semibold text-brand">{employee.employeeCode}</code></TableCell>
                      <TableCell className="font-medium">{employee.fullName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{employee.email}</TableCell>
                      <TableCell className="text-sm">{employee.position || "—"}</TableCell>
                      <TableCell><Badge variant="secondary">{employee.department || "—"}</Badge></TableCell>
                      <TableCell><Badge variant={employee.status === "active" ? "default" : "outline"}>{employee.status}</Badge></TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {departments.map((department, index) => (
              <motion.div key={department.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Card className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-brand/10 flex items-center justify-center rounded-md"><Users className="w-4 h-4 text-brand" /></div>
                    <div>
                      <div className="font-semibold">{pick(department.name, department.nameAr, department.name)}</div>
                      <div className="text-xs text-muted-foreground">{department.headcount} {pick("personnes", "أشخاص", "people")}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
