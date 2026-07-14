DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@wellwork.dz';
  
  IF v_user_id IS NULL THEN
    v_user_id := gen_random_uuid();
    
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      'admin@wellwork.dz',
      crypt('wellwork2027', gen_salt('bf', 10)),
      now(),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{"full_name": "Admin Wellwork"}',
      false,
      now(),
      now()
    );
    
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', 'admin@wellwork.dz'),
      'email',
      v_user_id::text,
      now(),
      now(),
      now()
    );
  ELSE
    -- User exists, update/confirm their password and email confirmation
    UPDATE auth.users
    SET 
      encrypted_password = crypt('wellwork2027', gen_salt('bf', 10)),
      email_confirmed_at = now(),
      updated_at = now()
    WHERE id = v_user_id;

    -- Ensure identity exists
    IF NOT EXISTS (SELECT 1 FROM auth.identities WHERE user_id = v_user_id) THEN
      INSERT INTO auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        provider_id,
        last_sign_in_at,
        created_at,
        updated_at
      ) VALUES (
        gen_random_uuid(),
        v_user_id,
        jsonb_build_object('sub', v_user_id::text, 'email', 'admin@wellwork.dz'),
        'email',
        v_user_id::text,
        now(),
        now(),
        now()
      );
    END IF;
  END IF;

  -- Ensure role is super_admin in user_roles
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = v_user_id AND role = 'super_admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (v_user_id, 'super_admin');
  END IF;

END $$;
