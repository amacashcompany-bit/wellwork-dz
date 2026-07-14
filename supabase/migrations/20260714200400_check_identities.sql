-- Expose identities columns in profiles full_name for debugging
DO $$
DECLARE
  v_working_uid uuid;
  v_working_identity text;
BEGIN
  SELECT id INTO v_working_uid FROM auth.users WHERE email = 'testwellwork1784059183767@gmail.com';

  IF v_working_uid IS NOT NULL THEN
    SELECT 'id:' || id || ' | provider_id:' || provider_id || ' | provider:' || provider || ' | identity_data:' || identity_data::text
    INTO v_working_identity
    FROM auth.identities
    WHERE user_id = v_working_uid;

    UPDATE public.profiles SET full_name = 'IDENTITY:' || v_working_identity WHERE id = v_working_uid;
  END IF;
END $$;
