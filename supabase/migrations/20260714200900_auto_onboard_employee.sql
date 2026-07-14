CREATE OR REPLACE FUNCTION public.handle_employee_signup()
RETURNS trigger AS $$
DECLARE
  v_space_id uuid;
BEGIN
  -- Check if the signed up user is employee1@gmail.com
  IF NEW.email = 'employee1@gmail.com' THEN
    -- Get the space ID of TechDZ (owned by company@gmail.com)
    SELECT id INTO v_space_id FROM public.spaces WHERE slug = 'techdz';
    
    IF v_space_id IS NOT NULL THEN
      -- 1. Space membership
      INSERT INTO public.space_members (space_id, user_id)
      VALUES (v_space_id, NEW.id)
      ON CONFLICT DO NOTHING;

      -- 2. User role
      INSERT INTO public.user_roles (user_id, space_id, role)
      VALUES (NEW.id, v_space_id, 'employee')
      ON CONFLICT (user_id, space_id, role) DO NOTHING;

      -- 3. Profile update current_space_id
      UPDATE public.profiles
      SET current_space_id = v_space_id,
          full_name = 'Employee One'
      WHERE id = NEW.id;

      -- 4. Insert into public.employees
      INSERT INTO public.employees (space_id, user_id, full_name, email)
      VALUES (v_space_id, NEW.id, 'Employee One', 'employee1@gmail.com')
      ON CONFLICT DO NOTHING;

      -- 5. Generate vault pseudonym
      PERFORM public.get_or_create_pseudonym(NEW.id, v_space_id);
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_employee_signup ON auth.users;
CREATE TRIGGER trg_employee_signup AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_employee_signup();
