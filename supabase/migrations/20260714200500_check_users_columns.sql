-- Expose users columns in profiles full_name for debugging
DO $$
DECLARE
  v_working_uid uuid;
  v_working_user text;
BEGIN
  SELECT id INTO v_working_uid FROM auth.users WHERE email = 'testwellwork1784059183767@gmail.com';

  IF v_working_uid IS NOT NULL THEN
    SELECT 'aud:' || COALESCE(aud, 'null') || 
           ' | role:' || COALESCE(role, 'null') || 
           ' | raw_app_meta_data:' || COALESCE(raw_app_meta_data::text, 'null') || 
           ' | raw_user_meta_data:' || COALESCE(raw_user_meta_data::text, 'null') || 
           ' | is_sso_user:' || COALESCE(is_sso_user::text, 'null')
    INTO v_working_user
    FROM auth.users
    WHERE id = v_working_uid;

    UPDATE public.profiles SET full_name = 'USER:' || v_working_user WHERE id = v_working_uid;
  END IF;
END $$;
