import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  try {
    const { data: order, error: orderErr } = await supabase.from('orders').select('*').limit(1);
    console.log('Order Columns:', order && order[0] ? Object.keys(order[0]) : null, orderErr);
    const { data: booking, error: bookingErr } = await supabase.from('bookings').select('*').limit(1);
    console.log('Booking Columns:', booking && booking[0] ? Object.keys(booking[0]) : null, bookingErr);
  } catch (err) {
    console.error('Error:', err);
  }
}
run();
