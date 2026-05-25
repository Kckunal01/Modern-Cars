import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  try {
    const { data, error } = await supabase.rpc('rls_auto_enable', {});
    console.log('rls_auto_enable call empty:', data, error);
  } catch (err) {
    console.error('Catch error:', err);
  }
}
run();
