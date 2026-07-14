
-- Invites: hr_admin generates unique codes to onboard managers/employees
CREATE TABLE public.space_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  code text NOT NULL UNIQUE,
  role app_role NOT NULL CHECK (role IN ('manager','employee')),
  department_id uuid REFERENCES public.departments(id) ON DELETE SET NULL,
  full_name text,
  email text,
  expires_at timestamptz,
  used_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  used_at timestamptz,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.space_invites TO authenticated;
GRANT ALL ON public.space_invites TO service_role;

ALTER TABLE public.space_invites ENABLE ROW LEVEL SECURITY;

-- HR admins manage invites in their space
CREATE POLICY "hr_admins manage invites"
  ON public.space_invites FOR ALL
  USING (public.has_role(auth.uid(), space_id, 'hr_admin') OR public.is_super_admin(auth.uid()))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin') OR public.is_super_admin(auth.uid()));

-- Authenticated users can look up an invite by exact code (needed to redeem)
CREATE POLICY "auth users can read invite to redeem"
  ON public.space_invites FOR SELECT
  TO authenticated
  USING (used_by IS NULL AND (expires_at IS NULL OR expires_at > now()));

CREATE TRIGGER trg_space_invites_updated BEFORE UPDATE ON public.space_invites
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Manager scoped permissions (which modules an hr_admin grants to a manager)
CREATE TABLE public.manager_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (space_id, user_id, module)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.manager_permissions TO authenticated;
GRANT ALL ON public.manager_permissions TO service_role;

ALTER TABLE public.manager_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "hr_admins manage manager permissions"
  ON public.manager_permissions FOR ALL
  USING (public.has_role(auth.uid(), space_id, 'hr_admin') OR public.is_super_admin(auth.uid()))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin') OR public.is_super_admin(auth.uid()));

CREATE POLICY "managers read own permissions"
  ON public.manager_permissions FOR SELECT
  USING (user_id = auth.uid());

-- Redeem invite atomically (bypasses RLS for the specific code)
CREATE OR REPLACE FUNCTION public.redeem_space_invite(_code text)
RETURNS TABLE (space_id uuid, role app_role)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_invite public.space_invites%ROWTYPE;
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  SELECT * INTO v_invite FROM public.space_invites
    WHERE code = _code AND used_by IS NULL
      AND (expires_at IS NULL OR expires_at > now())
    LIMIT 1;

  IF NOT FOUND THEN RAISE EXCEPTION 'invalid or expired invite'; END IF;

  INSERT INTO public.space_members (space_id, user_id) VALUES (v_invite.space_id, v_uid)
    ON CONFLICT DO NOTHING;
  INSERT INTO public.user_roles (user_id, space_id, role) VALUES (v_uid, v_invite.space_id, v_invite.role)
    ON CONFLICT DO NOTHING;
  INSERT INTO public.profiles (id, current_space_id) VALUES (v_uid, v_invite.space_id)
    ON CONFLICT (id) DO UPDATE SET current_space_id = EXCLUDED.current_space_id;

  IF v_invite.role = 'employee' AND v_invite.full_name IS NOT NULL THEN
    INSERT INTO public.employees (space_id, user_id, full_name, email, department_id)
      VALUES (v_invite.space_id, v_uid, v_invite.full_name, v_invite.email, v_invite.department_id)
      ON CONFLICT DO NOTHING;
  END IF;

  UPDATE public.space_invites SET used_by = v_uid, used_at = now() WHERE id = v_invite.id;

  RETURN QUERY SELECT v_invite.space_id, v_invite.role;
END; $$;

GRANT EXECUTE ON FUNCTION public.redeem_space_invite(text) TO authenticated;

-- Manager check helper
CREATE OR REPLACE FUNCTION public.has_manager_permission(_user_id uuid, _space_id uuid, _module text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_user_id, _space_id, 'hr_admin')
      OR public.is_super_admin(_user_id)
      OR EXISTS (SELECT 1 FROM public.manager_permissions
                  WHERE user_id = _user_id AND space_id = _space_id AND module = _module);
$$;
