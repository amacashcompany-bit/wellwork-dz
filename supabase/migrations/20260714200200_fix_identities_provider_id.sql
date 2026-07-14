DO $$
DECLARE
  v_admin_uid uuid;
  v_emp_uid uuid;
  v_super_admin_uid uuid;
BEGIN
  -- 1. Fix company@gmail.com
  SELECT id INTO v_admin_uid FROM auth.users WHERE email = 'company@gmail.com';
  IF v_admin_uid IS NOT NULL THEN
    UPDATE auth.identities
    SET provider_id = 'company@gmail.com',
        updated_at = now()
    WHERE user_id = v_admin_uid;
  END IF;

  -- 2. Fix employee1@gmail.com
  SELECT id INTO v_emp_uid FROM auth.users WHERE email = 'employee1@gmail.com';
  IF v_emp_uid IS NOT NULL THEN
    UPDATE auth.identities
    SET provider_id = 'employee1@gmail.com',
        updated_at = now()
    WHERE user_id = v_emp_uid;
  END IF;

  -- 3. Fix admin@wellwork.dz (Super Admin)
  SELECT id INTO v_super_admin_uid FROM auth.users WHERE email = 'admin@wellwork.dz';
  IF v_super_admin_uid IS NOT NULL THEN
    UPDATE auth.identities
    SET provider_id = 'admin@wellwork.dz',
        updated_at = now()
    WHERE user_id = v_super_admin_uid;
  END IF;
END $$;
