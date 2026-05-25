import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  try {
    const { data: customer, error } = await supabase.from('customers').select('*').limit(1);
    console.log('Customer Columns:', customer && customer[0] ? Object.keys(customer[0]) : null);
    if (error) console.error('Error:', error);
  } catch (err) {
    console.error('Catch error:', err);
  }
}
run();
