DO $$
DECLARE
  v_admin_uid uuid;
  v_emp_uid uuid;
  v_super_admin_uid uuid;
BEGIN
  -- 1. Fix company@gmail.com
  SELECT id INTO v_admin_uid FROM auth.users WHERE email = 'company@gmail.com';
  IF v_admin_uid IS NOT NULL THEN
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_build_object(
      'sub', v_admin_uid::text,
      'email', 'company@gmail.com',
      'email_verified', true,
      'phone_verified', false,
      'full_name', 'Company Admin'
    )
    WHERE id = v_admin_uid;

    UPDATE auth.identities
    SET provider_id = v_admin_uid::text,
        identity_data = jsonb_build_object(
          'sub', v_admin_uid::text,
          'email', 'company@gmail.com',
          'email_verified', true,
          'phone_verified', false
        )
    WHERE user_id = v_admin_uid;
  END IF;

  -- 2. Fix employee1@gmail.com
  SELECT id INTO v_emp_uid FROM auth.users WHERE email = 'employee1@gmail.com';
  IF v_emp_uid IS NOT NULL THEN
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_build_object(
      'sub', v_emp_uid::text,
      'email', 'employee1@gmail.com',
      'email_verified', true,
      'phone_verified', false,
      'full_name', 'Employee One'
    )
    WHERE id = v_emp_uid;

    UPDATE auth.identities
    SET provider_id = v_emp_uid::text,
        identity_data = jsonb_build_object(
          'sub', v_emp_uid::text,
          'email', 'employee1@gmail.com',
          'email_verified', true,
          'phone_verified', false
        )
    WHERE user_id = v_emp_uid;
  END IF;

  -- 3. Fix admin@wellwork.dz (Super Admin)
  SELECT id INTO v_super_admin_uid FROM auth.users WHERE email = 'admin@wellwork.dz';
  IF v_super_admin_uid IS NOT NULL THEN
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_build_object(
      'sub', v_super_admin_uid::text,
      'email', 'admin@wellwork.dz',
      'email_verified', true,
      'phone_verified', false,
      'full_name', 'Super Admin'
    )
    WHERE id = v_super_admin_uid;

    UPDATE auth.identities
    SET provider_id = v_super_admin_uid::text,
        identity_data = jsonb_build_object(
          'sub', v_super_admin_uid::text,
          'email', 'admin@wellwork.dz',
          'email_verified', true,
          'phone_verified', false
        )
    WHERE user_id = v_super_admin_uid;
  END IF;
END $$;
