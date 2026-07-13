import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/hooks/useI18n";

export const Route = createFileRoute("/employee/help")({
  head: () => ({ meta: [{ title: "Aide & Anonymat — QVT-Care" }] }),
  component: HelpPage,
});

function HelpPage() {
  const { pick } = useI18n();
  const guarantees = [
    pick("Aucune IP n'est stockée", "لا يتم تخزين IP", "No IP is stored"),
    pick("Aucun email lié à vos réponses", "لا بريد إلكتروني مرتبط", "No email tied to your answers"),
    pick("Hachage cryptographique SHA-256 côté client", "تجزئة SHA-256 على العميل", "Client-side SHA-256 hashing"),
    pick("Agrégation en groupes ≥ 6 obligatoire", "التجميع في مجموعات ≥ 6", "Mandatory aggregation in groups of ≥ 6"),
    pick("Conforme à la Loi algérienne 18-07 sur la protection des données", "متوافق مع القانون 18-07", "Compliant with Algerian Law 18-07"),
  ];
  const faqs = [
    { q: pick("Qui voit mes réponses ?", "من يرى إجاباتي؟", "Who sees my answers?"),
      a: pick("Personne individuellement. Toutes les réponses sont fusionnées en statistiques anonymes.", "لا أحد بشكل فردي. تُدمج كل الإجابات في إحصائيات مجهولة.", "Nobody individually. Answers merge into anonymous statistics.") },
    { q: pick("Puis-je récupérer un message envoyé ?", "هل أستطيع استرجاع رسالة أرسلتها؟", "Can I retrieve a sent message?"),
      a: pick("Oui, avec votre code REF-XXXXX. Sans ce code, aucune récupération n'est possible.", "نعم بواسطة رمز REF-XXXXX. بدونه لا يمكن الاسترجاع.", "Yes, with your REF-XXXXX code. Without it, no retrieval is possible.") },
    { q: pick("Comment le RH répond-il sans me connaître ?", "كيف يرد الموارد البشرية دون معرفتي؟", "How does HR reply without knowing me?"),
      a: pick("Le RH répond au token, pas à vous. La conversation reste toujours anonyme.", "الموارد البشرية ترد على الرمز، لا عليك. تبقى المحادثة مجهولة.", "HR replies to the token, not to you. The thread stays anonymous.") },
  ];

  return (
    <div>
      <PageHeader title={pick("Aide & Anonymat", "المساعدة والخصوصية", "Help & Anonymity")} subtitle={pick("Tout ce qu'il faut savoir sur votre protection.", "كل ما يجب معرفته عن حمايتك.", "Everything to know about your protection.")} />

      <Card className="p-6 rounded-2xl mb-6 gradient-hero border-brand/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl gradient-brand flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-white" /></div>
          <div>
            <div className="font-semibold">{pick("Vos garanties", "ضماناتك", "Your guarantees")}</div>
            <div className="text-xs text-muted-foreground">{pick("5 protections activées par défaut", "5 حمايات مفعلة افتراضياً", "5 protections enabled by default")}</div>
          </div>
        </div>
        <ul className="space-y-2">
          {guarantees.map((g, i) => (
            <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /> {g}</li>
          ))}
        </ul>
      </Card>

      <Card className="p-6 rounded-2xl">
        <div className="font-semibold mb-4">FAQ</div>
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`}>
              <AccordionTrigger className="text-sm">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
