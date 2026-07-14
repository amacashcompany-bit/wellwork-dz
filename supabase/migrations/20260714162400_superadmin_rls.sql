-- Add super admin bypass to spaces view
CREATE POLICY "super_admin can view all spaces" ON public.spaces FOR SELECT TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- Also allow super admins to update any space (e.g., to suspend it, though suspension logic isn't fully spec'd yet)
CREATE POLICY "super_admin can update all spaces" ON public.spaces FOR UPDATE TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- Let super admins view all profiles
CREATE POLICY "super_admin can view all profiles" ON public.profiles FOR SELECT TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- Let super admins view all user_roles
CREATE POLICY "super_admin can view all user_roles" ON public.user_roles FOR SELECT TO authenticated
  USING (public.is_super_admin(auth.uid()));
