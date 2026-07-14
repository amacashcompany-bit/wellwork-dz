-- Delete manually seeded employee user before trying API signup
DELETE FROM auth.users WHERE email = 'employee1@gmail.com';
