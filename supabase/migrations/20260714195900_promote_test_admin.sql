DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Find the successfully signed up test user
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'testwellwork1784059183767@gmail.com';
  
  IF v_user_id IS NOT NULL THEN
    -- Confirm the email to ensure they can sign in immediately without clicking any links
    UPDATE auth.users
    SET 
      email_confirmed_at = now(),
      updated_at = now()
    WHERE id = v_user_id;

    -- Elevate to super_admin in user_roles
    IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = v_user_id AND role = 'super_admin') THEN
      INSERT INTO public.user_roles (user_id, role) VALUES (v_user_id, 'super_admin');
    END IF;
  END IF;
END $$;
