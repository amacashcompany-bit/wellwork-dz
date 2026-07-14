-- Restore profile names modified during password/identity debugging
UPDATE public.profiles
SET full_name = 'Master Admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'testwellwork1784059183767@gmail.com');

UPDATE public.profiles
SET full_name = 'Company Admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'company@gmail.com');
