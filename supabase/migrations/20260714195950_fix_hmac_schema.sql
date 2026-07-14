CREATE OR REPLACE FUNCTION public.get_or_create_pseudonym(p_user_id uuid, p_space_id uuid)
RETURNS text
SECURITY DEFINER SET search_path = public, extensions LANGUAGE plpgsql AS $$
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

  -- Compute HMAC pseudonym with explicit bytea cast and search_path including extensions
  SELECT email INTO v_email FROM auth.users WHERE id = p_user_id;
  v_pseudo := encode(hmac((v_email || p_space_id::text)::bytea, v_salt::bytea, 'sha256'), 'hex');

  -- Insert mapping
  INSERT INTO public.blind_vault_mappings (space_id, user_id, pseudonym_id)
  VALUES (p_space_id, p_user_id, v_pseudo)
  ON CONFLICT DO NOTHING;

  RETURN v_pseudo;
END;
$$;
