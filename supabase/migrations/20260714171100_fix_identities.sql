DO $$
DECLARE
  v_user_id uuid;
BEGIN
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'wellwork@company.dz';
  
  IF v_user_id IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM auth.identities WHERE user_id = v_user_id) THEN
      INSERT INTO auth.identities (
        id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), v_user_id, jsonb_build_object('sub', v_user_id::text, 'email', 'wellwork@company.dz'),
        'email', v_user_id::text, now(), now(), now()
      );
    END IF;
  END IF;
END $$;
