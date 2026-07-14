CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Create the Keys table (Isolated)
CREATE TABLE IF NOT EXISTS public.blind_vault_keys (
  space_id uuid PRIMARY KEY REFERENCES public.spaces(id) ON DELETE CASCADE,
  hmac_salt text NOT NULL
);

REVOKE ALL ON public.blind_vault_keys FROM PUBLIC;
REVOKE ALL ON public.blind_vault_keys FROM authenticated;
REVOKE ALL ON public.blind_vault_keys FROM anon;
GRANT ALL ON public.blind_vault_keys TO service_role;

-- 2. Create the Mappings table
CREATE TABLE IF NOT EXISTS public.blind_vault_mappings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pseudonym_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (space_id, user_id),
  UNIQUE (space_id, pseudonym_id)
);

ALTER TABLE public.blind_vault_mappings ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.blind_vault_mappings TO authenticated;
GRANT ALL ON public.blind_vault_mappings TO service_role;

-- HR Admins can view the mappings to see who joined the space
CREATE POLICY "hr_admins read vault mappings" ON public.blind_vault_mappings FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin') OR public.is_super_admin(auth.uid()));

-- Users can view their own mapping
CREATE POLICY "users read own mapping" ON public.blind_vault_mappings FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- 3. Function to get or create pseudonym
CREATE OR REPLACE FUNCTION public.get_or_create_pseudonym(p_user_id uuid, p_space_id uuid)
RETURNS text
SECURITY DEFINER SET search_path = public LANGUAGE plpgsql AS $$
DECLARE
  v_salt text;
  v_pseudo text;
  v_email text;
BEGIN
  -- check existing mapping
  SELECT pseudonym_id INTO v_pseudo FROM public.blind_vault_mappings
    WHERE user_id = p_user_id AND space_id = p_space_id;
  
  IF v_pseudo IS NOT NULL THEN
    RETURN v_pseudo;
  END IF;

  -- Get or generate salt
  SELECT hmac_salt INTO v_salt FROM public.blind_vault_keys WHERE space_id = p_space_id;
  IF v_salt IS NULL THEN
    v_salt := gen_random_uuid()::text;
    INSERT INTO public.blind_vault_keys (space_id, hmac_salt) VALUES (p_space_id, v_salt);
  END IF;

  -- Compute HMAC pseudonym
  SELECT email INTO v_email FROM auth.users WHERE id = p_user_id;
  v_pseudo := encode(hmac(v_email || p_space_id::text, v_salt::bytea, 'sha256'), 'hex');

  -- Insert mapping
  INSERT INTO public.blind_vault_mappings (space_id, user_id, pseudonym_id)
  VALUES (p_space_id, p_user_id, v_pseudo)
  ON CONFLICT DO NOTHING;

  RETURN v_pseudo;
END;
$$;
GRANT EXECUTE ON FUNCTION public.get_or_create_pseudonym TO authenticated;

-- Drop RLS policies that depend on user_id before altering the column
DROP POLICY IF EXISTS "user reads own participation" ON public.survey_participation;
DROP POLICY IF EXISTS "user inserts own participation" ON public.survey_participation;

-- 4. Convert survey_participation to use pseudonym_id for privacy
ALTER TABLE public.survey_participation DROP CONSTRAINT survey_participation_user_id_fkey;
ALTER TABLE public.survey_participation RENAME COLUMN user_id TO pseudonym_id_uuid;
ALTER TABLE public.survey_participation ADD COLUMN pseudonym_id text;

-- (Safe to truncate since this is a new feature)
TRUNCATE TABLE public.survey_participation;

ALTER TABLE public.survey_participation DROP COLUMN pseudonym_id_uuid;
ALTER TABLE public.survey_participation ALTER COLUMN pseudonym_id SET NOT NULL;
ALTER TABLE public.survey_participation ADD UNIQUE (survey_id, pseudonym_id);

-- Update RLS for survey_participation

CREATE POLICY "user reads own participation" ON public.survey_participation FOR SELECT TO authenticated
  USING (
    pseudonym_id = public.get_or_create_pseudonym(auth.uid(), (SELECT space_id FROM public.surveys WHERE id = survey_id))
  );
CREATE POLICY "user inserts own participation" ON public.survey_participation FOR INSERT TO authenticated
  WITH CHECK (
    pseudonym_id = public.get_or_create_pseudonym(auth.uid(), (SELECT space_id FROM public.surveys WHERE id = survey_id))
  );

-- 5. Update redeem_space_invite to create the pseudonym mapping immediately on join
CREATE OR REPLACE FUNCTION public.redeem_space_invite(_code text)
RETURNS TABLE (space_id uuid, role app_role)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_invite public.space_invites%ROWTYPE;
  v_uid uuid := auth.uid();
  v_pseudo text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  SELECT * INTO v_invite FROM public.space_invites
    WHERE code = _code AND used_by IS NULL
      AND (expires_at IS NULL OR expires_at > now())
    LIMIT 1;

  IF NOT FOUND THEN RAISE EXCEPTION 'invalid or expired invite'; END IF;

  -- Create vault pseudonym mapping FIRST
  v_pseudo := public.get_or_create_pseudonym(v_uid, v_invite.space_id);

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
