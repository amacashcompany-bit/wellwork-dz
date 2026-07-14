-- Add trial duration to demo requests
ALTER TABLE public.demo_requests ADD COLUMN IF NOT EXISTS trial_duration_days int DEFAULT 30;

-- Add expiration date to spaces
ALTER TABLE public.spaces ADD COLUMN IF NOT EXISTS trial_expires_at timestamptz;

-- Create secure function to redeem token and create space
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
  v_request record;
  v_space_id uuid;
  v_expires_at timestamptz;
BEGIN
  -- 1. Validate token and get request details
  SELECT * INTO v_request 
  FROM public.demo_requests
  WHERE access_token = p_token
    AND status = 'approved'
    AND token_redeemed_at IS NULL
  LIMIT 1;

  IF v_request IS NULL THEN
    RAISE EXCEPTION 'Jeton invalide, expiré ou introuvable.';
  END IF;

  -- 2. Calculate expiration
  v_expires_at := now() + (COALESCE(v_request.trial_duration_days, 30) * interval '1 day');

  -- 3. Create Space
  INSERT INTO public.spaces (name, slug, owner_id, subscription_status, trial_expires_at)
  VALUES (p_name, p_slug, auth.uid(), 'trial', v_expires_at)
  RETURNING id INTO v_space_id;

  -- 4. Mark token as redeemed
  UPDATE public.demo_requests 
  SET token_redeemed_at = now() 
  WHERE id = v_request.id;

  -- 5. Add user to space
  INSERT INTO public.space_members (space_id, user_id)
  VALUES (v_space_id, auth.uid());

  -- 6. Grant hr_admin role
  INSERT INTO public.user_roles (space_id, user_id, role)
  VALUES (v_space_id, auth.uid(), 'hr_admin');

  -- 7. Update profile
  UPDATE public.profiles
  SET current_space_id = v_space_id
  WHERE id = auth.uid();

  RETURN jsonb_build_object(
    'space_id', v_space_id,
    'trial_expires_at', v_expires_at
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_trial_space(uuid, text, text) TO authenticated;
