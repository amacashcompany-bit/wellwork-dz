-- Return the signed-in user's persisted company context in one RLS-safe call.
-- This avoids treating an individual failed client query as "no company space".
CREATE OR REPLACE FUNCTION public.get_my_space()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_space_id uuid;
  v_space_name text;
  v_space_slug text;
  v_roles jsonb;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT p.current_space_id INTO v_space_id
  FROM public.profiles p
  WHERE p.id = v_user_id;

  -- Ignore a stale profile pointer. Membership or ownership is authoritative.
  IF v_space_id IS NOT NULL AND NOT EXISTS (
    SELECT 1
    FROM public.spaces s
    WHERE s.id = v_space_id
      AND (
        s.owner_id = v_user_id
        OR EXISTS (
          SELECT 1 FROM public.space_members sm
          WHERE sm.space_id = s.id AND sm.user_id = v_user_id
        )
      )
  ) THEN
    v_space_id := NULL;
  END IF;

  IF v_space_id IS NULL THEN
    SELECT sm.space_id INTO v_space_id
    FROM public.space_members sm
    WHERE sm.user_id = v_user_id
    ORDER BY sm.joined_at
    LIMIT 1;
  END IF;

  -- Recover older trial spaces whose membership/profile write was incomplete.
  IF v_space_id IS NULL THEN
    SELECT s.id INTO v_space_id
    FROM public.spaces s
    WHERE s.owner_id = v_user_id
    ORDER BY s.created_at
    LIMIT 1;
  END IF;

  IF v_space_id IS NOT NULL THEN
    INSERT INTO public.profiles (id, current_space_id)
    VALUES (v_user_id, v_space_id)
    ON CONFLICT (id) DO UPDATE
      SET current_space_id = EXCLUDED.current_space_id,
          updated_at = now();

    INSERT INTO public.space_members (space_id, user_id)
    SELECT v_space_id, v_user_id
    WHERE EXISTS (
      SELECT 1 FROM public.spaces s
      WHERE s.id = v_space_id AND s.owner_id = v_user_id
    )
    ON CONFLICT DO NOTHING;

    SELECT s.name, s.slug INTO v_space_name, v_space_slug
    FROM public.spaces s
    WHERE s.id = v_space_id;
  END IF;

  SELECT COALESCE(jsonb_agg(DISTINCT ur.role::text), '[]'::jsonb) INTO v_roles
  FROM public.user_roles ur
  WHERE ur.user_id = v_user_id
    AND (ur.space_id = v_space_id OR ur.space_id IS NULL);

  RETURN jsonb_build_object(
    'spaceId', v_space_id,
    'spaceName', v_space_name,
    'spaceSlug', v_space_slug,
    'roles', v_roles
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_my_space() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_my_space() TO authenticated;

-- Persist every company link even if an older account is missing its profile row.
CREATE OR REPLACE FUNCTION public.create_trial_space(
  p_token uuid,
  p_name text,
  p_slug text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_request record;
  v_space_id uuid;
  v_expires_at timestamptz;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT * INTO v_request
  FROM public.demo_requests
  WHERE access_token = p_token
    AND status = 'approved'
    AND token_redeemed_at IS NULL
  FOR UPDATE
  LIMIT 1;

  IF v_request IS NULL THEN
    RAISE EXCEPTION 'Jeton invalide, expire ou introuvable.';
  END IF;

  v_expires_at := now() + (COALESCE(v_request.trial_duration_days, 30) * interval '1 day');

  INSERT INTO public.spaces (name, slug, owner_id, subscription_status, trial_expires_at)
  VALUES (p_name, p_slug, v_user_id, 'trial', v_expires_at)
  RETURNING id INTO v_space_id;

  INSERT INTO public.space_members (space_id, user_id)
  VALUES (v_space_id, v_user_id)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_roles (space_id, user_id, role)
  VALUES (v_space_id, v_user_id, 'hr_admin')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.profiles (id, current_space_id)
  VALUES (v_user_id, v_space_id)
  ON CONFLICT (id) DO UPDATE
    SET current_space_id = EXCLUDED.current_space_id,
        updated_at = now();

  UPDATE public.demo_requests
  SET token_redeemed_at = now()
  WHERE id = v_request.id;

  RETURN jsonb_build_object(
    'space_id', v_space_id,
    'trial_expires_at', v_expires_at
  );
END;
$$;

REVOKE ALL ON FUNCTION public.create_trial_space(uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_trial_space(uuid, text, text) TO authenticated;
