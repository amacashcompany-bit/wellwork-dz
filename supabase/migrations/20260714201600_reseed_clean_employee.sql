-- Restore Master Admin name
UPDATE public.profiles
SET full_name = 'Master Admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'testwellwork1784059183767@gmail.com');

-- Delete old stale employee user to start fresh
DELETE FROM auth.users WHERE email = 'employee1@gmail.com';

-- Seed employee1@gmail.com cleanly
DO $$
DECLARE
  v_emp_uid uuid := '88888888-8888-4888-a888-888888888888';
  v_password_hash text;
BEGIN
  -- Generate bcrypt password hash for 'employee2027' using crypt
  v_password_hash := extensions.crypt('employee2027', extensions.gen_salt('bf', 10));

  -- 1. Insert into auth.users
  INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    is_sso_user,
    is_anonymous
  ) VALUES (
    v_emp_uid,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'employee1@gmail.com',
    v_password_hash,
    now(),
    '{"provider": "email", "providers": ["email"]}'::jsonb,
    json_build_object(
      'sub', v_emp_uid::text,
      'email', 'employee1@gmail.com',
      'email_verified', true,
      'phone_verified', false,
      'full_name', 'Employee One'
    )::jsonb,
    false,
    now(),
    now(),
    false,
    false
  );

  -- 2. Insert into auth.identities
  INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    v_emp_uid,
    v_emp_uid::text,
    json_build_object(
      'sub', v_emp_uid::text,
      'email', 'employee1@gmail.com',
      'email_verified', true,
      'phone_verified', false
    )::jsonb,
    'email',
    now(),
    now(),
    now()
  );
END $$;
