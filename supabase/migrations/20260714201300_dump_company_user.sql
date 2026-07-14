DO $$
DECLARE
  v_admin_uid uuid;
  v_user_json text;
  v_identity_json text;
BEGIN
  SELECT id INTO v_admin_uid FROM auth.users WHERE email = 'testwellwork1784059183767@gmail.com';
  
  IF v_admin_uid IS NOT NULL THEN
    -- Dump user
    SELECT row_to_json(u)::text INTO v_user_json FROM auth.users u WHERE email = 'company@gmail.com';
    -- Dump identity
    SELECT row_to_json(i)::text INTO v_identity_json FROM auth.identities i WHERE user_id = (SELECT id FROM auth.users WHERE email = 'company@gmail.com');
    
    UPDATE public.profiles 
    SET full_name = 'USER:' || COALESCE(v_user_json, 'null') || ' | IDENTITY:' || COALESCE(v_identity_json, 'null')
    WHERE id = v_admin_uid;
  END IF;
END $$;
