import pg from 'pg';

const SUPABASE_DB_URL = "postgresql://postgres:Gani02750275%40%2F@db.yssuorvlptstvhtbwqmd.supabase.co:5432/postgres";

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Please provide an email address.");
    process.exit(1);
  }

  const client = new pg.Client(SUPABASE_DB_URL);
  await client.connect();

  const user = await client.query(`SELECT id FROM auth.users WHERE email = $1`, [email]);
  if (user.rows.length === 0) {
    console.error(`User with email ${email} not found.`);
    await client.end();
    return;
  }
  
  const userId = user.rows[0].id;

  const roleRes = await client.query(`SELECT * FROM public.user_roles WHERE user_id = $1 AND role = 'super_admin'`, [userId]);
  if (roleRes.rows.length === 0) {
    await client.query(`INSERT INTO public.user_roles (user_id, role) VALUES ($1, 'super_admin')`, [userId]);
    console.log(`Successfully elevated ${email} to super_admin!`);
  } else {
    console.log(`User ${email} is already a super_admin.`);
  }

  await client.end();
}

main().catch(console.error);
