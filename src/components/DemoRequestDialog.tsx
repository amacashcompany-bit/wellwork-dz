import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/hooks/useI18n";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ReactNode } from "react";

export function DemoRequestDialog({ trigger }: { trigger: ReactNode }) {
  const { pick } = useI18n();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const reset = () => {
    setCompanyName(""); setCompanyDescription(""); setContactName(""); setContactEmail(""); setContactPhone(""); setDone(false);
  };

  const submit = async () => {
    if (!companyName.trim() || !companyDescription.trim() || !contactName.trim() || !contactEmail.trim()) {
      toast.error(pick("Merci de remplir tous les champs obligatoires.", "يرجى تعبئة جميع الحقول المطلوبة.", "Please fill in all required fields."));
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("demo_requests").insert({
      company_name: companyName.trim(),
      company_description: companyDescription.trim(),
      contact_name: contactName.trim(),
      contact_email: contactEmail.trim(),
      contact_phone: contactPhone.trim() || null,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setDone(true);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg rounded-3xl">
        {!done ? (
          <>
            <DialogHeader>
              <DialogTitle>{pick("Demander une démo", "طلب عرض تجريبي", "Request a demo")}</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground -mt-2">
              {pick(
                "Décrivez votre entreprise. Notre équipe examine chaque demande et vous envoie un accès personnel si elle est approuvée.",
                "صف شركتك. يقوم فريقنا بمراجعة كل طلب ويرسل لك رمز وصول شخصي عند الموافقة.",
                "Tell us about your company. Our team reviews every request and emails you a personal access token if approved."
              )}
            </p>
            <div className="space-y-3 mt-2">
              <div>
                <Label>{pick("Nom de l'entreprise *", "اسم الشركة *", "Company name *")}</Label>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 rounded-xl" />
              </div>
              <div>
                <Label>{pick("Description de l'entreprise *", "وصف الشركة *", "Company description *")}</Label>
                <Textarea value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} rows={3}
                  placeholder={pick("Secteur, taille, besoins…", "القطاع، الحجم، الاحتياجات…", "Industry, size, needs…")} className="mt-1 rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{pick("Votre nom *", "اسمك *", "Your name *")}</Label>
                  <Input value={contactName} onChange={(e) => setContactName(e.target.value)} className="mt-1 rounded-xl" />
                </div>
                <div>
                  <Label>{pick("Téléphone", "الهاتف", "Phone")}</Label>
                  <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="mt-1 rounded-xl" />
                </div>
              </div>
              <div>
                <Label>{pick("Email professionnel *", "البريد المهني *", "Work email *")}</Label>
                <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="mt-1 rounded-xl" />
              </div>
              <Button onClick={submit} disabled={busy} className="w-full gradient-brand text-white border-0 h-11 mt-2">
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : pick("Envoyer la demande", "إرسال الطلب", "Send request")}
              </Button>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-leaf mx-auto mb-4" />
            <h3 className="text-lg font-semibold">{pick("Demande envoyée !", "تم إرسال الطلب!", "Request sent!")}</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
              {pick(
                "Notre équipe va examiner votre demande. Si elle est approuvée, vous recevrez un email avec votre jeton d'accès à la démo.",
                "سيقوم فريقنا بمراجعة طلبك. عند الموافقة، ستتلقى بريدًا إلكترونيًا يحتوي على رمز الوصول إلى العرض التجريبي.",
                "Our team will review your request. If approved, you'll get an email with your demo access token."
              )}
            </p>
            <Button variant="outline" className="mt-6 rounded-full" onClick={() => setOpen(false)}>
              {pick("Fermer", "إغلاق", "Close")}
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
