CREATE OR REPLACE FUNCTION delete_my_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid;
BEGIN
  v_uid := auth.uid();
  
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- The deletion cascades to profiles, user_roles, employee_profiles etc.
  -- This will fail with a foreign key violation if the user is the owner of a space (spaces.owner_id is RESTRICT)
  DELETE FROM auth.users WHERE id = v_uid;
END;
$$;

-- Grant execution to authenticated users
GRANT EXECUTE ON FUNCTION delete_my_account() TO authenticated;
