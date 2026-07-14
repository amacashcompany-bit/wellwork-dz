DO $$
DECLARE
  v_admin_uid uuid;
  v_user_email text;
BEGIN
  SELECT id INTO v_admin_uid FROM auth.users WHERE email = 'testwellwork1784059183767@gmail.com';
  
  IF v_admin_uid IS NOT NULL THEN
    SELECT email INTO v_user_email FROM auth.users WHERE email = 'employee1@gmail.com';
    
    UPDATE public.profiles 
    SET full_name = 'EXISTS:' || COALESCE(v_user_email, 'NOT_FOUND')
    WHERE id = v_admin_uid;
  END IF;
END $$;
