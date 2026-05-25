import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ checkout_started_at: new Date().toISOString() })
      .eq('id', '1') // fake ID or first ID
      .select();
    console.log('Update result:', data, error);
  } catch (err) {
    console.error('Error:', err);
  }
}
run();
