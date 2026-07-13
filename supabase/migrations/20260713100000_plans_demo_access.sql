-- =========================================
-- PRICING PLANS + DEMO ACCESS REQUESTS
-- =========================================
-- Design notes:
--   * `plans` are managed exclusively by super_admin (Basic / Premium / Enterprise / Free Demo, etc.)
--     with a JSON feature list so the admin can add/remove features per plan without a migration.
--   * A prospect cannot self-serve the demo: they submit a `demo_requests` row (company name,
--     description, contact email) while UNAUTHENTICATED. The platform owner (super_admin) reviews
--     it and approves or rejects. Approval mints a single-use `access_token`, e-mailed to the
--     requester (see the `send-demo-decision` edge function proposed alongside this migration).
--   * The access token is redeemed once at signup time to unlock the Free Demo plan for a new space.

CREATE TYPE public.demo_request_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,                 -- 'free_demo' | 'basic' | 'premium' | 'enterprise' | custom
  name text NOT NULL,
  tagline text,
  price_monthly numeric,                     -- null = "Contact us" (enterprise)
  currency text NOT NULL DEFAULT 'EUR',
  is_demo boolean NOT NULL DEFAULT false,    -- true = the gated "Free Demo" plan
  max_employees int,                         -- null = unlimited
  features jsonb NOT NULL DEFAULT '[]'::jsonb, -- ["Feature A", "Feature B", ...]
  highlighted boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.plans TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.plans TO authenticated;
GRANT ALL ON public.plans TO service_role;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can view active plans" ON public.plans FOR SELECT TO anon, authenticated
  USING (active = true OR public.is_super_admin(auth.uid()));
CREATE POLICY "super_admin manages plans" ON public.plans FOR ALL TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));
CREATE TRIGGER trg_plans_updated BEFORE UPDATE ON public.plans FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.plans (slug, name, tagline, price_monthly, is_demo, max_employees, features, highlighted, sort_order) VALUES
  ('free_demo', 'Démo gratuite', 'Pour découvrir la plateforme', 0, true, 25,
    '["1 espace de travail", "25 employés max", "Enquêtes QVT de base", "Tableau de bord standard", "Accès 30 jours", "Support par email"]'::jsonb, false, 0),
  ('basic', 'Basic', 'Pour les petites équipes', 49, false, 50,
    '["Jusqu''à 50 employés", "Enquêtes QVT illimitées", "Alertes automatiques", "Rapports mensuels", "Anonymat cryptographique", "Support par email"]'::jsonb, false, 1),
  ('premium', 'Premium', 'Pour les entreprises en croissance', 149, false, 300,
    '["Jusqu''à 300 employés", "Tout Basic, plus :", "IA burn-out prédictive", "Multi-département & RBAC avancé", "Rapports conformité Loi 18-07", "Intégration ERP", "Support prioritaire"]'::jsonb, true, 2),
  ('enterprise', 'Grandes entreprises', 'Sur mesure pour les grands groupes', NULL, false, NULL,
    '["Employés illimités", "Tout Premium, plus :", "Multi-tenant / multi-filiales", "SLA dédié & account manager", "SSO / SAML", "Déploiement personnalisé", "Support 24/7"]'::jsonb, false, 3);

-- =========================================
-- DEMO REQUESTS (public booking -> owner approval -> access token)
-- =========================================
CREATE TABLE public.demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  company_description text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  status public.demo_request_status NOT NULL DEFAULT 'pending',
  access_token uuid,                          -- minted on approval, redeemed once at signup
  token_redeemed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  rejection_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.demo_requests TO anon;
GRANT SELECT, INSERT, UPDATE ON public.demo_requests TO authenticated;
GRANT ALL ON public.demo_requests TO service_role;
CREATE INDEX idx_demo_requests_token ON public.demo_requests(access_token) WHERE access_token IS NOT NULL;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated visitors) can submit a demo request.
CREATE POLICY "anyone can submit a demo request" ON public.demo_requests FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'pending' AND access_token IS NULL AND reviewed_by IS NULL);

-- Only super_admin can list/review requests.
CREATE POLICY "super_admin reads demo requests" ON public.demo_requests FOR SELECT TO authenticated
  USING (public.is_super_admin(auth.uid()));
CREATE POLICY "super_admin reviews demo requests" ON public.demo_requests FOR UPDATE TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

CREATE TRIGGER trg_demo_requests_updated BEFORE UPDATE ON public.demo_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Security-definer RPC: validate + redeem a token at signup time, without exposing the
-- full demo_requests table (whose SELECT policy is locked to super_admin) to anonymous users.
CREATE OR REPLACE FUNCTION public.redeem_demo_access_token(_token uuid, _email text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_id uuid;
BEGIN
  SELECT id INTO v_id FROM public.demo_requests
    WHERE access_token = _token
      AND status = 'approved'
      AND token_redeemed_at IS NULL
      AND lower(contact_email) = lower(_email)
    LIMIT 1;
  IF v_id IS NULL THEN
    RETURN false;
  END IF;
  UPDATE public.demo_requests SET token_redeemed_at = now() WHERE id = v_id;
  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION public.redeem_demo_access_token(uuid, text) TO anon, authenticated;

-- Security-definer RPC: check token validity without redeeming (used by the /auth form
-- to gate sign-up before a Supabase account is even created).
CREATE OR REPLACE FUNCTION public.check_demo_access_token(_token uuid, _email text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.demo_requests
    WHERE access_token = _token
      AND status = 'approved'
      AND token_redeemed_at IS NULL
      AND lower(contact_email) = lower(_email)
  );
$$;
GRANT EXECUTE ON FUNCTION public.check_demo_access_token(uuid, text) TO anon, authenticated;
