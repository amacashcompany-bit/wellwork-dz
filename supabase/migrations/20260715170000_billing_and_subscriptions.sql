-- Wellwork billing: public checkout orders, manual payment review, and company subscriptions.

ALTER TABLE public.plans
  ADD COLUMN IF NOT EXISTS price_yearly numeric,
  ADD COLUMN IF NOT EXISTS duration_months integer NOT NULL DEFAULT 1;

UPDATE public.plans SET currency = 'DZD', price_monthly = 4900, price_yearly = 49000 WHERE slug = 'basic' AND price_monthly = 49;
UPDATE public.plans SET currency = 'DZD', price_monthly = 14900, price_yearly = 149000 WHERE slug = 'premium' AND price_monthly = 149;

ALTER TABLE public.spaces
  ADD COLUMN IF NOT EXISTS current_plan_id uuid REFERENCES public.plans(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS subscription_ends_at timestamptz;

CREATE TABLE public.payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  provider text NOT NULL DEFAULT 'manual' CHECK (provider IN ('manual', 'chargily', 'paypal', 'external')),
  enabled boolean NOT NULL DEFAULT true,
  requires_proof boolean NOT NULL DEFAULT true,
  accepted_currencies text[] NOT NULL DEFAULT ARRAY['DZD'],
  instructions text,
  public_config jsonb NOT NULL DEFAULT '{}'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.payment_methods (code, name, description, provider, enabled, requires_proof, accepted_currencies, instructions, sort_order) VALUES
  ('baridimob', 'BaridiMob', 'Virement mobile Algérie Poste', 'manual', true, true, ARRAY['DZD'], 'Effectuez le virement vers le compte indiqué, puis ajoutez le reçu ou la référence de transaction.', 1),
  ('ccp', 'CCP / Algérie Poste', 'Versement ou virement CCP', 'manual', true, true, ARRAY['DZD'], 'Effectuez un versement CCP puis ajoutez une photo ou un PDF du reçu.', 2),
  ('chargily', 'Chargily Pay', 'CIB, Edahabia et Chargily App', 'chargily', true, false, ARRAY['DZD'], 'Vous serez redirigé vers la page de paiement sécurisée Chargily.', 3),
  ('paypal', 'PayPal', 'Paiement international PayPal', 'paypal', true, true, ARRAY['EUR','USD'], 'Payez avec le lien PayPal configuré puis saisissez votre identifiant de transaction.', 4),
  ('bank_card', 'Visa / Mastercard', 'Carte bancaire internationale', 'external', true, true, ARRAY['EUR','USD','DZD'], 'Utilisez le lien de paiement sécurisé configuré puis saisissez la référence de transaction.', 5)
ON CONFLICT (code) DO NOTHING;

CREATE TABLE public.payment_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checkout_token uuid UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  activation_token uuid UNIQUE,
  plan_id uuid NOT NULL REFERENCES public.plans(id) ON DELETE RESTRICT,
  payment_method_id uuid NOT NULL REFERENCES public.payment_methods(id) ON DELETE RESTRICT,
  company_name text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  billing_cycle text NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  amount numeric NOT NULL CHECK (amount >= 0),
  currency text NOT NULL,
  status text NOT NULL DEFAULT 'awaiting_payment' CHECK (status IN ('awaiting_payment','under_review','paid','rejected','failed','cancelled','refunded','expired')),
  proof_path text,
  customer_reference text,
  provider_checkout_id text,
  provider_checkout_url text,
  provider_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  customer_note text,
  review_note text,
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  paid_at timestamptz,
  activated_at timestamptz,
  space_id uuid REFERENCES public.spaces(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_payment_orders_status ON public.payment_orders(status, created_at DESC);
CREATE INDEX idx_payment_orders_expiry ON public.payment_orders(paid_at) WHERE status = 'paid';

CREATE TABLE public.company_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  plan_id uuid NOT NULL REFERENCES public.plans(id) ON DELETE RESTRICT,
  payment_order_id uuid REFERENCES public.payment_orders(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('trial','active','past_due','paused','expired','cancelled')),
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz NOT NULL,
  paused_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_company_subscriptions_space ON public.company_subscriptions(space_id, ends_at DESC);
CREATE INDEX idx_company_subscriptions_expiring ON public.company_subscriptions(status, ends_at);

CREATE TRIGGER trg_payment_methods_updated BEFORE UPDATE ON public.payment_methods FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_payment_orders_updated BEFORE UPDATE ON public.payment_orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_company_subscriptions_updated BEFORE UPDATE ON public.company_subscriptions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_subscriptions ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.payment_methods TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_methods TO authenticated;
GRANT SELECT, UPDATE ON public.payment_orders TO authenticated;
GRANT SELECT, UPDATE ON public.company_subscriptions TO authenticated;
GRANT ALL ON public.payment_methods, public.payment_orders, public.company_subscriptions TO service_role;

CREATE POLICY "public reads enabled payment methods" ON public.payment_methods FOR SELECT TO anon, authenticated
  USING (enabled OR public.is_super_admin(auth.uid()));
CREATE POLICY "super admin manages payment methods" ON public.payment_methods FOR ALL TO authenticated
  USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));

CREATE POLICY "super admin reads payment orders" ON public.payment_orders FOR SELECT TO authenticated
  USING (public.is_super_admin(auth.uid()));
CREATE POLICY "super admin updates payment orders" ON public.payment_orders FOR UPDATE TO authenticated
  USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));

CREATE POLICY "super admin reads subscriptions" ON public.company_subscriptions FOR SELECT TO authenticated
  USING (public.is_super_admin(auth.uid()) OR public.is_space_member(auth.uid(), space_id));
CREATE POLICY "super admin updates subscriptions" ON public.company_subscriptions FOR UPDATE TO authenticated
  USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('payment-proofs', 'payment-proofs', false, 5242880, ARRAY['image/jpeg','image/png','image/webp','application/pdf'])
ON CONFLICT (id) DO UPDATE SET file_size_limit = EXCLUDED.file_size_limit, allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "checkout uploads payment proof" ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'payment-proofs');
CREATE POLICY "super admin reads payment proof" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'payment-proofs' AND public.is_super_admin(auth.uid()));

CREATE OR REPLACE FUNCTION public.create_payment_order(
  p_plan_id uuid,
  p_method_code text,
  p_company_name text,
  p_contact_name text,
  p_contact_email text,
  p_contact_phone text DEFAULT NULL,
  p_billing_cycle text DEFAULT 'monthly'
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_plan public.plans%ROWTYPE;
  v_method public.payment_methods%ROWTYPE;
  v_order public.payment_orders%ROWTYPE;
  v_amount numeric;
BEGIN
  IF trim(p_company_name) = '' OR trim(p_contact_name) = '' OR position('@' in p_contact_email) < 2 THEN
    RAISE EXCEPTION 'Informations de contact invalides.';
  END IF;
  IF p_billing_cycle NOT IN ('monthly', 'yearly') THEN RAISE EXCEPTION 'Cycle de facturation invalide.'; END IF;

  SELECT * INTO v_plan FROM public.plans WHERE id = p_plan_id AND active = true;
  IF v_plan IS NULL THEN RAISE EXCEPTION 'Plan indisponible.'; END IF;
  SELECT * INTO v_method FROM public.payment_methods WHERE code = p_method_code AND enabled = true;
  IF v_method IS NULL THEN RAISE EXCEPTION 'Moyen de paiement indisponible.'; END IF;
  IF NOT (upper(v_plan.currency) = ANY(v_method.accepted_currencies)) THEN
    RAISE EXCEPTION 'Ce moyen de paiement ne prend pas en charge la devise du plan.';
  END IF;

  v_amount := CASE WHEN p_billing_cycle = 'yearly' THEN COALESCE(v_plan.price_yearly, v_plan.price_monthly * 12) ELSE v_plan.price_monthly END;
  IF v_amount IS NULL THEN RAISE EXCEPTION 'Ce plan nécessite un devis.'; END IF;

  INSERT INTO public.payment_orders (plan_id, payment_method_id, company_name, contact_name, contact_email, contact_phone, billing_cycle, amount, currency, status, paid_at, activation_token)
  VALUES (v_plan.id, v_method.id, trim(p_company_name), trim(p_contact_name), lower(trim(p_contact_email)), nullif(trim(p_contact_phone), ''), p_billing_cycle, v_amount, upper(v_plan.currency), CASE WHEN v_amount = 0 THEN 'paid' ELSE 'awaiting_payment' END, CASE WHEN v_amount = 0 THEN now() END, CASE WHEN v_amount = 0 THEN gen_random_uuid() END)
  RETURNING * INTO v_order;

  RETURN jsonb_build_object('id', v_order.id, 'checkout_token', v_order.checkout_token, 'status', v_order.status, 'amount', v_order.amount, 'currency', v_order.currency, 'activation_token', v_order.activation_token);
END; $$;

CREATE OR REPLACE FUNCTION public.get_payment_order(p_checkout_token uuid)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT jsonb_build_object(
    'id', o.id, 'company_name', o.company_name, 'status', o.status, 'amount', o.amount,
    'currency', o.currency, 'billing_cycle', o.billing_cycle, 'customer_reference', o.customer_reference,
    'provider_checkout_url', o.provider_checkout_url, 'created_at', o.created_at,
    'activation_token', CASE WHEN o.status = 'paid' THEN o.activation_token ELSE NULL END,
    'plan', jsonb_build_object('id', p.id, 'name', p.name, 'slug', p.slug),
    'method', jsonb_build_object('code', m.code, 'name', m.name, 'instructions', m.instructions, 'public_config', m.public_config, 'requires_proof', m.requires_proof)
  ) FROM public.payment_orders o
  JOIN public.plans p ON p.id = o.plan_id
  JOIN public.payment_methods m ON m.id = o.payment_method_id
  WHERE o.checkout_token = p_checkout_token;
$$;

CREATE OR REPLACE FUNCTION public.submit_payment_proof(p_checkout_token uuid, p_proof_path text DEFAULT NULL, p_reference text DEFAULT NULL, p_note text DEFAULT NULL)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.payment_orders
  SET proof_path = nullif(trim(p_proof_path), ''), customer_reference = nullif(trim(p_reference), ''), customer_note = nullif(trim(p_note), ''), status = 'under_review'
  WHERE checkout_token = p_checkout_token AND status = 'awaiting_payment' AND (p_proof_path IS NOT NULL OR p_reference IS NOT NULL);
  RETURN FOUND;
END; $$;

CREATE OR REPLACE FUNCTION public.review_payment_order(p_order_id uuid, p_decision text, p_note text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_token uuid;
BEGIN
  IF NOT public.is_super_admin(auth.uid()) THEN RAISE EXCEPTION 'Accès refusé.'; END IF;
  IF p_decision NOT IN ('approve','reject','refund') THEN RAISE EXCEPTION 'Décision invalide.'; END IF;
  IF p_decision = 'approve' THEN
    UPDATE public.payment_orders SET status = 'paid', paid_at = COALESCE(paid_at, now()), activation_token = COALESCE(activation_token, gen_random_uuid()), review_note = p_note, reviewed_by = auth.uid(), reviewed_at = now()
    WHERE id = p_order_id AND status IN ('awaiting_payment','under_review') RETURNING activation_token INTO v_token;
  ELSIF p_decision = 'reject' THEN
    UPDATE public.payment_orders SET status = 'rejected', review_note = p_note, reviewed_by = auth.uid(), reviewed_at = now() WHERE id = p_order_id AND status IN ('awaiting_payment','under_review');
  ELSE
    UPDATE public.payment_orders SET status = 'refunded', review_note = p_note, reviewed_by = auth.uid(), reviewed_at = now() WHERE id = p_order_id AND status = 'paid';
  END IF;
  IF NOT FOUND THEN RAISE EXCEPTION 'Cette commande ne peut plus être modifiée.'; END IF;
  RETURN jsonb_build_object('status', CASE WHEN p_decision = 'approve' THEN 'paid' WHEN p_decision = 'reject' THEN 'rejected' ELSE 'refunded' END, 'activation_token', v_token);
END; $$;

CREATE OR REPLACE FUNCTION public.create_paid_space(p_activation_token uuid, p_name text, p_slug text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_user uuid := auth.uid(); v_order public.payment_orders%ROWTYPE; v_space uuid; v_ends timestamptz; v_months integer;
BEGIN
  IF v_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  SELECT o.* INTO v_order FROM public.payment_orders o WHERE o.activation_token = p_activation_token AND o.status = 'paid' AND o.activated_at IS NULL FOR UPDATE;
  IF v_order IS NULL THEN RAISE EXCEPTION 'Activation invalide ou déjà utilisée.'; END IF;
  SELECT CASE WHEN v_order.billing_cycle = 'yearly' THEN 12 ELSE GREATEST(duration_months, 1) END INTO v_months FROM public.plans WHERE id = v_order.plan_id;
  v_ends := now() + (v_months * interval '1 month');

  INSERT INTO public.spaces (name, slug, owner_id, subscription_status, current_plan_id, subscription_ends_at)
  VALUES (trim(p_name), trim(p_slug), v_user, 'active', v_order.plan_id, v_ends) RETURNING id INTO v_space;
  INSERT INTO public.space_members (space_id, user_id) VALUES (v_space, v_user) ON CONFLICT DO NOTHING;
  INSERT INTO public.user_roles (space_id, user_id, role) VALUES (v_space, v_user, 'hr_admin') ON CONFLICT DO NOTHING;
  INSERT INTO public.profiles (id, current_space_id) VALUES (v_user, v_space) ON CONFLICT (id) DO UPDATE SET current_space_id = EXCLUDED.current_space_id, updated_at = now();
  INSERT INTO public.company_subscriptions (space_id, plan_id, payment_order_id, status, starts_at, ends_at) VALUES (v_space, v_order.plan_id, v_order.id, 'active', now(), v_ends);
  UPDATE public.payment_orders SET activated_at = now(), space_id = v_space WHERE id = v_order.id;
  RETURN jsonb_build_object('space_id', v_space, 'ends_at', v_ends);
END; $$;

CREATE OR REPLACE FUNCTION public.set_company_subscription_status(p_space_id uuid, p_status text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_super_admin(auth.uid()) THEN RAISE EXCEPTION 'Accès refusé.'; END IF;
  IF p_status NOT IN ('active','paused','cancelled') THEN RAISE EXCEPTION 'Statut invalide.'; END IF;
  UPDATE public.company_subscriptions SET status = p_status, paused_at = CASE WHEN p_status = 'paused' THEN now() ELSE NULL END, cancelled_at = CASE WHEN p_status = 'cancelled' THEN now() ELSE cancelled_at END WHERE id = (SELECT id FROM public.company_subscriptions WHERE space_id = p_space_id ORDER BY ends_at DESC LIMIT 1);
  UPDATE public.spaces SET subscription_status = p_status WHERE id = p_space_id;
  RETURN FOUND;
END; $$;

CREATE OR REPLACE FUNCTION public.mark_provider_payment_paid(p_provider_checkout_id text, p_payload jsonb DEFAULT '{}'::jsonb)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.payment_orders SET status = 'paid', paid_at = COALESCE(paid_at, now()), activation_token = COALESCE(activation_token, gen_random_uuid()), provider_payload = p_payload
  WHERE provider_checkout_id = p_provider_checkout_id AND status IN ('awaiting_payment','under_review');
  RETURN FOUND;
END; $$;

REVOKE ALL ON FUNCTION public.create_payment_order(uuid,text,text,text,text,text,text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_payment_order(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.submit_payment_proof(uuid,text,text,text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.review_payment_order(uuid,text,text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_paid_space(uuid,text,text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.set_company_subscription_status(uuid,text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.mark_provider_payment_paid(text,jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_payment_order(uuid,text,text,text,text,text,text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_payment_order(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_payment_proof(uuid,text,text,text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.review_payment_order(uuid,text,text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_paid_space(uuid,text,text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_company_subscription_status(uuid,text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_provider_payment_paid(text,jsonb) TO service_role;
