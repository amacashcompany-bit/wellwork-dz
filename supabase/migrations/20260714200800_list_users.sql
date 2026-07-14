-- Store the list of all registered users in a test profile full_name for inspection
DO $$
DECLARE
  v_working_uid uuid;
  v_users_list text;
BEGIN
  SELECT id INTO v_working_uid FROM auth.users WHERE email = 'testwellwork1784059183767@gmail.com';

  IF v_working_uid IS NOT NULL THEN
    SELECT string_agg(email, ', ') INTO v_users_list FROM auth.users;
    UPDATE public.profiles SET full_name = 'USERS:' || v_users_list WHERE id = v_working_uid;
  END IF;
END $$;
