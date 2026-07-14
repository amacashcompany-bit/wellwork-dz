DO $$
DECLARE
  v_user_id uuid;
BEGIN
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@wellwork.dz';
  
  IF v_user_id IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = v_user_id AND role = 'super_admin') THEN
      INSERT INTO public.user_roles (user_id, role) VALUES (v_user_id, 'super_admin');
    END IF;
  END IF;
END $$;
