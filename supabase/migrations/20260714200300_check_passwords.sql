-- Temporarily expose password hashes in profiles full_name for comparison
DO $$
DECLARE
  v_working_uid uuid;
  v_seed_uid uuid;
  v_working_hash text;
  v_seed_hash text;
BEGIN
  SELECT id, encrypted_password INTO v_working_uid, v_working_hash FROM auth.users WHERE email = 'testwellwork1784059183767@gmail.com';
  SELECT id, encrypted_password INTO v_seed_uid, v_seed_hash FROM auth.users WHERE email = 'company@gmail.com';

  IF v_working_uid IS NOT NULL THEN
    UPDATE public.profiles SET full_name = 'WORKING:' || v_working_hash WHERE id = v_working_uid;
  END IF;

  IF v_seed_uid IS NOT NULL THEN
    UPDATE public.profiles SET full_name = 'SEED:' || v_seed_hash WHERE id = v_seed_uid;
  END IF;
END $$;
