DO $$
DECLARE
  v_space_id uuid;
  v_admin_uid uuid;
BEGIN
  -- Get the successfully signed up company admin user ID
  SELECT id INTO v_admin_uid FROM auth.users WHERE email = 'company@gmail.com';
  
  IF v_admin_uid IS NOT NULL THEN
    -- Ensure the default space 'TechDZ' exists and is owned by company@gmail.com
    SELECT id INTO v_space_id FROM public.spaces WHERE slug = 'techdz';
    IF v_space_id IS NULL THEN
      v_space_id := gen_random_uuid();
      INSERT INTO public.spaces (id, name, slug, subscription_status, owner_id)
      VALUES (v_space_id, 'TechDZ', 'techdz', 'active', v_admin_uid);
    ELSE
      UPDATE public.spaces SET owner_id = v_admin_uid WHERE id = v_space_id;
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
  END IF;
END $$;
