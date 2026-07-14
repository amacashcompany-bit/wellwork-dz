import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://yssuorvlptstvhtbwqmd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzc3VvcnZscHRzdHZodGJ3cW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5MzI4OTYsImV4cCI6MjA5OTUwODg5Nn0.lXLI_GiytfOk4ORbY0u7He9Cdrhgf8zZDcsFqWd1qw0";

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  // Login as admin
  await supabase.auth.signInWithPassword({
    email: "testwellwork1784059183767@gmail.com",
    password: "wellwork2027"
  });

  // Query auth.users details by putting them in profiles temporarily
  const { error } = await supabase.rpc('get_user_debug_info', { target_email: 'company@gmail.com' });
  if (error) {
    // If RPC doesn't exist, we can use a custom migration to dump it
    console.error("RPC failed:", error.message);
  }
}

main();
