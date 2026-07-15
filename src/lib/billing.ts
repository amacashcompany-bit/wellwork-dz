/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/integrations/supabase/client";

// Billing tables are introduced by the latest migration. Keep the temporary cast
// isolated here until the generated Supabase types are refreshed from production.
export const billingDb = supabase as any;

export type BillingPlan = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  price_monthly: number | null;
  price_yearly: number | null;
  currency: string;
  features: string[];
  highlighted: boolean;
  is_demo: boolean;
};

export type PaymentMethod = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  provider: "manual" | "chargily" | "paypal" | "external";
  enabled: boolean;
  requires_proof: boolean;
  accepted_currencies: string[];
  instructions: string | null;
  public_config: Record<string, string>;
  sort_order: number;
};

export type PublicPaymentOrder = {
  id: string;
  company_name: string;
  status: "awaiting_payment" | "under_review" | "paid" | "rejected" | "failed" | "cancelled" | "refunded" | "expired";
  amount: number;
  currency: string;
  billing_cycle: "monthly" | "yearly";
  customer_reference: string | null;
  provider_checkout_url: string | null;
  activation_token: string | null;
  created_at: string;
  plan: { id: string; name: string; slug: string };
  method: Pick<PaymentMethod, "code" | "name" | "instructions" | "public_config" | "requires_proof">;
};

export function money(amount: number | null, currency: string) {
  if (amount === null) return "Sur devis";
  return new Intl.NumberFormat("fr-DZ", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}
