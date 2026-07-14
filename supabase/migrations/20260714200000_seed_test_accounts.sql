DO $$
DECLARE
  v_space_id uuid;
  v_admin_uid uuid;
  v_emp_uid uuid;
BEGIN
  -- 1. Resolve or Create the Company Admin (company@gmail.com / company2027) first so we have an owner_id for the space
  SELECT id INTO v_admin_uid FROM auth.users WHERE email = 'company@gmail.com';
  IF v_admin_uid IS NULL THEN
    v_admin_uid := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', v_admin_uid, 'authenticated', 'authenticated',
      'company@gmail.com', crypt('company2027', gen_salt('bf', 10)), now(), now(),
      '{"provider": "email", "providers": ["email"]}', '{"full_name": "Company Admin"}', false, now(), now()
    );

    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), v_admin_uid, jsonb_build_object('sub', v_admin_uid::text, 'email', 'company@gmail.com'),
      'email', v_admin_uid::text, now(), now(), now()
    );
  ELSE
    -- Reset password
    UPDATE auth.users SET encrypted_password = crypt('company2027', gen_salt('bf', 10)), email_confirmed_at = now() WHERE id = v_admin_uid;
  END IF;

  -- 2. Create the default space 'TechDZ' if it doesn't exist, using v_admin_uid as the owner_id
  SELECT id INTO v_space_id FROM public.spaces WHERE slug = 'techdz';
  IF v_space_id IS NULL THEN
    v_space_id := gen_random_uuid();
    INSERT INTO public.spaces (id, name, slug, subscription_status, owner_id)
    VALUES (v_space_id, 'TechDZ', 'techdz', 'active', v_admin_uid);
  END IF;

  -- Ensure Company Admin space membership and profiles
  INSERT INTO public.profiles (id, full_name, current_space_id)
  VALUES (v_admin_uid, 'Company Admin', v_space_id)
  ON CONFLICT (id) DO UPDATE SET current_space_id = v_space_id;

  INSERT INTO public.space_members (space_id, user_id)
  VALUES (v_space_id, v_admin_uid)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_roles (user_id, space_id, role)
  VALUES (v_admin_uid, v_space_id, 'hr_admin')
  ON CONFLICT (user_id, space_id, role) DO NOTHING;


  -- 3. Create the Employee (employee1@gmail.com / employee2027)
  SELECT id INTO v_emp_uid FROM auth.users WHERE email = 'employee1@gmail.com';
  IF v_emp_uid IS NULL THEN
    v_emp_uid := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', v_emp_uid, 'authenticated', 'authenticated',
      'employee1@gmail.com', crypt('employee2027', gen_salt('bf', 10)), now(), now(),
      '{"provider": "email", "providers": ["email"]}', '{"full_name": "Employee One"}', false, now(), now()
    );

    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), v_emp_uid, jsonb_build_object('sub', v_emp_uid::text, 'email', 'employee1@gmail.com'),
      'email', v_emp_uid::text, now(), now(), now()
    );
  ELSE
    -- Reset password
    UPDATE auth.users SET encrypted_password = crypt('employee2027', gen_salt('bf', 10)), email_confirmed_at = now() WHERE id = v_emp_uid;
  END IF;

  -- Ensure Employee space membership and profiles
  INSERT INTO public.profiles (id, full_name, current_space_id)
  VALUES (v_emp_uid, 'Employee One', v_space_id)
  ON CONFLICT (id) DO UPDATE SET current_space_id = v_space_id;

  INSERT INTO public.space_members (space_id, user_id)
  VALUES (v_space_id, v_emp_uid)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_roles (user_id, space_id, role)
  VALUES (v_emp_uid, v_space_id, 'employee')
  ON CONFLICT (user_id, space_id, role) DO NOTHING;

  -- Ensure employees profile in public.employees
  INSERT INTO public.employees (space_id, user_id, full_name, email)
  VALUES (v_space_id, v_emp_uid, 'Employee One', 'employee1@gmail.com')
  ON CONFLICT DO NOTHING;

  -- Generate vault pseudonym for this employee immediately
  PERFORM public.get_or_create_pseudonym(v_emp_uid, v_space_id);

END $$;
