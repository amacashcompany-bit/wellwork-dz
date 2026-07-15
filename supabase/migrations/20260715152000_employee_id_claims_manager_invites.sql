-- Employee accounts claim a company-issued roster ID. The private claim ledger
-- is intentionally not readable by tenant admins, so login identities cannot
-- be mapped back to named employee records.

ALTER TABLE public.employees
  ADD COLUMN IF NOT EXISTS employee_code text;

WITH ranked AS (
  SELECT id, row_number() OVER (ORDER BY created_at, id) AS position
  FROM public.employees
  WHERE employee_code IS NULL
)
UPDATE public.employees e
SET employee_code = 'EMP-' || lpad((1000 + ranked.position)::text, 4, '0')
FROM ranked
WHERE e.id = ranked.id;

-- Preserve the ID already displayed by the TechDZ demo roster.
UPDATE public.employees e
SET employee_code = 'EMP-0142'
WHERE e.id = (
  SELECT employee.id
  FROM public.employees employee
  JOIN public.spaces space ON space.id = employee.space_id
  WHERE space.slug = 'techdz'
  ORDER BY employee.created_at
  LIMIT 1
);

ALTER TABLE public.employees
  ALTER COLUMN employee_code SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS employees_employee_code_unique
  ON public.employees (upper(employee_code));

CREATE TABLE IF NOT EXISTS public.employee_account_claims (
  employee_id uuid PRIMARY KEY REFERENCES public.employees(id) ON DELETE CASCADE,
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  claimed_at timestamptz NOT NULL DEFAULT now()
);

REVOKE ALL ON public.employee_account_claims FROM PUBLIC;
REVOKE ALL ON public.employee_account_claims FROM anon;
REVOKE ALL ON public.employee_account_claims FROM authenticated;
GRANT ALL ON public.employee_account_claims TO service_role;

-- Preserve existing employee links privately, then remove them from the roster
-- table that HR users can read.
INSERT INTO public.employee_account_claims (employee_id, space_id, user_id)
SELECT id, space_id, user_id
FROM public.employees
WHERE user_id IS NOT NULL
ON CONFLICT DO NOTHING;

UPDATE public.employees SET user_id = NULL WHERE user_id IS NOT NULL;

CREATE OR REPLACE FUNCTION public.claim_employee_id(p_employee_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_employee public.employees%ROWTYPE;
  v_existing_claim public.employee_account_claims%ROWTYPE;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT * INTO v_employee
  FROM public.employees
  WHERE upper(employee_code) = upper(trim(p_employee_code))
    AND status = 'active'
  FOR UPDATE
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Identifiant salarie invalide.';
  END IF;

  SELECT * INTO v_existing_claim
  FROM public.employee_account_claims
  WHERE employee_id = v_employee.id OR user_id = v_user_id
  LIMIT 1;

  IF FOUND THEN
    IF v_existing_claim.employee_id = v_employee.id
       AND v_existing_claim.user_id = v_user_id THEN
      RETURN jsonb_build_object('space_id', v_employee.space_id, 'role', 'employee');
    END IF;
    RAISE EXCEPTION 'Identifiant salarie invalide ou deja utilise.';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = v_user_id
      AND (space_id IS DISTINCT FROM v_employee.space_id OR role <> 'employee')
  ) THEN
    RAISE EXCEPTION 'Ce compte est deja rattache a un autre espace.';
  END IF;

  INSERT INTO public.employee_account_claims (employee_id, space_id, user_id)
  VALUES (v_employee.id, v_employee.space_id, v_user_id);

  INSERT INTO public.space_members (space_id, user_id)
  VALUES (v_employee.space_id, v_user_id)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_roles (space_id, user_id, role)
  VALUES (v_employee.space_id, v_user_id, 'employee')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.profiles (id, current_space_id)
  VALUES (v_user_id, v_employee.space_id)
  ON CONFLICT (id) DO UPDATE
    SET current_space_id = EXCLUDED.current_space_id,
        updated_at = now();

  PERFORM public.get_or_create_pseudonym(v_user_id, v_employee.space_id);

  RETURN jsonb_build_object('space_id', v_employee.space_id, 'role', 'employee');
END;
$$;

REVOKE ALL ON FUNCTION public.claim_employee_id(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.claim_employee_id(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.list_company_employees()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_space_id uuid := public.current_space_id();
  v_result jsonb;
BEGIN
  IF v_user_id IS NULL OR v_space_id IS NULL OR NOT (
    public.has_role(v_user_id, v_space_id, 'hr_admin')
    OR public.is_super_admin(v_user_id)
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'id', e.id,
    'employeeCode', e.employee_code,
    'fullName', e.full_name,
    'email', e.email,
    'position', e.position,
    'status', e.status,
    'department', d.name,
    'createdAt', e.created_at
  ) ORDER BY e.created_at DESC), '[]'::jsonb)
  INTO v_result
  FROM public.employees e
  LEFT JOIN public.departments d ON d.id = e.department_id
  WHERE e.space_id = v_space_id;

  RETURN v_result;
END;
$$;

REVOKE ALL ON FUNCTION public.list_company_employees() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_company_employees() TO authenticated;

CREATE OR REPLACE FUNCTION public.create_company_employee(
  p_employee_code text,
  p_full_name text,
  p_email text,
  p_position text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_space_id uuid := public.current_space_id();
  v_code text := upper(trim(p_employee_code));
  v_employee_id uuid;
BEGIN
  IF v_user_id IS NULL OR v_space_id IS NULL OR NOT (
    public.has_role(v_user_id, v_space_id, 'hr_admin')
    OR public.is_super_admin(v_user_id)
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  IF v_code !~ '^[A-Z0-9][A-Z0-9-]{3,31}$' THEN
    RAISE EXCEPTION 'Format invalide. Exemple: EMP-0142';
  END IF;

  IF nullif(trim(p_full_name), '') IS NULL OR nullif(trim(p_email), '') IS NULL THEN
    RAISE EXCEPTION 'Le nom et email sont obligatoires.';
  END IF;

  INSERT INTO public.employees (space_id, employee_code, full_name, email, position)
  VALUES (
    v_space_id,
    v_code,
    trim(p_full_name),
    lower(trim(p_email)),
    nullif(trim(p_position), '')
  )
  RETURNING id INTO v_employee_id;

  RETURN jsonb_build_object('id', v_employee_id, 'employeeCode', v_code);
EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'Cet identifiant ou cet email existe deja.';
END;
$$;

REVOKE ALL ON FUNCTION public.create_company_employee(text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_company_employee(text, text, text, text) TO authenticated;

-- Invitation codes are reserved for managers. Historical used invitations are
-- retained, while unused employee invitations are retired.
DELETE FROM public.space_invites WHERE role = 'employee' AND used_by IS NULL;

CREATE OR REPLACE FUNCTION public.enforce_manager_invite()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.role <> 'manager' THEN
    RAISE EXCEPTION 'Invitation codes are reserved for managers.';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_manager_invite ON public.space_invites;
CREATE TRIGGER trg_enforce_manager_invite
BEFORE INSERT OR UPDATE OF role ON public.space_invites
FOR EACH ROW EXECUTE FUNCTION public.enforce_manager_invite();

CREATE OR REPLACE FUNCTION public.redeem_space_invite(_code text)
RETURNS TABLE (space_id uuid, role app_role)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invite public.space_invites%ROWTYPE;
  v_user_id uuid := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT * INTO v_invite
  FROM public.space_invites
  WHERE code = upper(trim(_code))
    AND role = 'manager'
    AND used_by IS NULL
    AND (expires_at IS NULL OR expires_at > now())
  FOR UPDATE
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Code manager invalide ou expire.';
  END IF;

  INSERT INTO public.space_members (space_id, user_id)
  VALUES (v_invite.space_id, v_user_id)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_roles (user_id, space_id, role)
  VALUES (v_user_id, v_invite.space_id, 'manager')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.profiles (id, current_space_id)
  VALUES (v_user_id, v_invite.space_id)
  ON CONFLICT (id) DO UPDATE
    SET current_space_id = EXCLUDED.current_space_id,
        updated_at = now();

  UPDATE public.space_invites
  SET used_by = v_user_id, used_at = now()
  WHERE id = v_invite.id;

  RETURN QUERY SELECT v_invite.space_id, 'manager'::app_role;
END;
$$;

REVOKE ALL ON FUNCTION public.redeem_space_invite(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.redeem_space_invite(text) TO authenticated;

-- Tenant admins do not need the account-to-pseudonym vault mapping.
DROP POLICY IF EXISTS "hr_admins read vault mappings" ON public.blind_vault_mappings;
