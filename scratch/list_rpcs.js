import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  try {
    const { data, error } = await supabase.rpc('get_my_rpcs'); // let's try a random name or check if there is an error
    console.log('RPC check:', data, error);
    
    // We can query pg_proc using postgrest by querying a view or table if we have bypassrls/service_role!
    // But since the service_role key can query any table, we can query pg_proc!
    const { data: functions, error: funcErr } = await supabase
      .from('pg_proc')
      .select('proname')
      .limit(10);
    console.log('Functions:', functions, funcErr);
  } catch (err) {
    console.error('Error:', err);
  }
}
run();
