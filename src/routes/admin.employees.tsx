import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { useI18n } from "@/hooks/useI18n";
import { useStore } from "@/store/useStore";

export const Route = createFileRoute("/admin/employees")({
  head: () => ({ meta: [{ title: "Employés — QVT-Care" }] }),
  component: EmployeesPage,
});

function EmployeesPage() {
  const { pick, t } = useI18n();
  const employees = useStore((s) => s.employees);
  const departments = useStore((s) => s.departments);
  const [q, setQ] = useState("");
  const [dept, setDept] = useState<string>("all");
  const [risk, setRisk] = useState<string>("all");

  const filtered = useMemo(() => employees.filter((e) => {
    const matchesQ = !q || [e.name, e.nameAr, e.department, e.role, e.code].some((v) => v.toLowerCase().includes(q.toLowerCase()));
    const matchesDept = dept === "all" || e.department === dept;
    const matchesRisk = risk === "all" || e.riskLevel === risk;
    return matchesQ && matchesDept && matchesRisk;
  }), [employees, q, dept, risk]);

  return (
    <div>
      <PageHeader
        title={pick("Employés & Départements", "الموظفون والأقسام", "Employees & Departments")}
        subtitle={pick("Vue consolidée des scores QVT par personne et par équipe.", "عرض موحّد لدرجات QVT للأفراد والفرق.", "Consolidated QVT scores per person and per team.")}
      />

      <Tabs defaultValue="employees">
        <TabsList>
          <TabsTrigger value="employees">{pick("Employés", "الموظفون", "Employees")} ({employees.length})</TabsTrigger>
          <TabsTrigger value="departments">{pick("Départements", "الأقسام", "Departments")} ({departments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="mt-4">
          <Card className="p-4 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search")} className="ps-9 rounded-xl" />
              </div>
              <Select value={dept} onValueChange={setDept}>
                <SelectTrigger className="w-full md:w-48 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all")}</SelectItem>
                  {departments.map((d) => <SelectItem key={d.id} value={d.name}>{pick(d.name, d.nameAr, d.name)}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={risk} onValueChange={setRisk}>
                <SelectTrigger className="w-full md:w-48 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all")}</SelectItem>
                  <SelectItem value="low">{t("riskLow")}</SelectItem>
                  <SelectItem value="medium">{t("riskMedium")}</SelectItem>
                  <SelectItem value="high">{t("riskHigh")}</SelectItem>
                  <SelectItem value="critical">{t("riskCritical")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{pick("Employé", "الموظف", "Employee")}</TableHead>
                    <TableHead>{pick("Département", "القسم", "Department")}</TableHead>
                    <TableHead>{pick("Rôle", "الدور", "Role")}</TableHead>
                    <TableHead className="w-40">{pick("Score QVT", "درجة QVT", "QVT Score")}</TableHead>
                    <TableHead>{pick("Risque", "الخطر", "Risk")}</TableHead>
                    <TableHead>{pick("Dernier sondage", "آخر استبيان", "Last survey")}</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((e, i) => (
                    <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b hover:bg-brand-50/40 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={e.avatar} alt="" className="w-9 h-9 rounded-full bg-muted" />
                          <div>
                            <div className="font-medium text-sm">{pick(e.name, e.nameAr, e.name)}</div>
                            <div className="text-xs text-muted-foreground">{e.code}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="secondary">{pick(e.department, e.departmentAr, e.department)}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{pick(e.role, e.roleAr, e.role)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={e.qvtScore} className="h-1.5 flex-1" />
                          <span className="text-xs font-medium w-9 text-end">{e.qvtScore}%</span>
                        </div>
                      </TableCell>
                      <TableCell><RiskBadge level={e.riskLevel} /></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{e.lastSurveyDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-8 h-8"><MoreHorizontal className="w-4 h-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>{t("view")}</DropdownMenuItem>
                            <DropdownMenuItem>{pick("Envoyer un sondage", "إرسال استبيان", "Send survey")}</DropdownMenuItem>
                            <DropdownMenuItem>{pick("Planifier un entretien", "جدولة مقابلة", "Schedule meeting")}</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {departments.map((d, i) => (
              <motion.div key={d.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-5 rounded-2xl hover:shadow-elegant transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold">{pick(d.name, d.nameAr, d.name)}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{d.headcount} {pick("personnes", "أشخاص", "people")} · {d.manager}</div>
                    </div>
                    <RiskBadge level={d.riskLevel} />
                  </div>
                  <div className="space-y-3 mt-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{pick("Score QVT moyen", "متوسط QVT", "Avg QVT")}</span><span className="font-medium">{d.avgQvtScore}%</span></div>
                      <Progress value={d.avgQvtScore} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{pick("Niveau de stress", "مستوى الضغط", "Stress")}</span><span className="font-medium">{d.stressLevel}%</span></div>
                      <Progress value={d.stressLevel} className="h-1.5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60">
                    <div className="text-xs text-muted-foreground">{d.actionCount} {pick("actions en cours", "إجراءات جارية", "actions in progress")}</div>
                    <Button variant="ghost" size="sm">{t("details")}</Button>
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
