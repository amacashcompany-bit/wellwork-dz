-- Delete spaces first to satisfy foreign key constraints
DELETE FROM public.spaces WHERE slug = 'techdz';

-- Clean up manually created users
DELETE FROM auth.users WHERE email IN ('company@gmail.com', 'employee1@gmail.com', 'admin@wellwork.dz');
