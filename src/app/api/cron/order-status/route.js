import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase.js';

// Hardcoded status progression based on elapsed days since order creation
const STATUS_TIMELINE = [
  { maxDays: 1, status: 'Order Placed' },
  { maxDays: 2, status: 'Processing' },
  { maxDays: 4, status: 'Shipped' },

  // final automated state
  { maxDays: Infinity, status: 'Out for Delivery' },
];

// Status rank — never downgrade
const STATUS_RANK = {
  'Order Placed':    1,
  'Processing':      2,
  'Shipped':         3,
  'Out for Delivery':4,
  'Delivered':       5,
};

function computeTargetStatus(createdAt) {
  const now = Date.now();
  const created = new Date(createdAt).getTime();
  const elapsedDays = (now - created) / (1000 * 60 * 60 * 24);

  for (const tier of STATUS_TIMELINE) {
    if (elapsedDays < tier.maxDays) return tier.status;
  }
  return 'Out for Delivery';
}

export async function GET(req) {
  try {
    // Vercel cron auth guard
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all active auto-managed orders (not cancelled, auto_status_enabled true)
    const { data: orders, error } = await supabase
      .from('orders')
      .select('id, status, created_at, auto_status_enabled')
      .eq('auto_status_enabled', true)
      .neq('status', 'Cancelled')
      .neq('status', 'Delivered'); // Delivered = terminal, skip forever

    if (error) {
      console.error('Order status cron query error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const results = { total: orders?.length || 0, updated: 0, skipped: 0, errors: [] };

    for (const order of (orders || [])) {
      try {
        const targetStatus = computeTargetStatus(order.created_at);

        // Never downgrade status
        const currentRank = STATUS_RANK[order.status] || 0;
        const targetRank  = STATUS_RANK[targetStatus] || 0;

        if (targetRank <= currentRank) {
          results.skipped++;
          continue;
        }

        // Only write if status actually changes
        const { error: updateErr } = await supabase
          .from('orders')
          .update({ status: targetStatus })
          .eq('id', order.id);

        if (updateErr) {
          console.error(`Failed to update order ${order.id}:`, updateErr);
          results.errors.push({ id: order.id, error: updateErr.message });
        } else {
          console.log(`Order ${order.id}: ${order.status} → ${targetStatus}`);
          results.updated++;
        }
      } catch (itemErr) {
        console.error(`Error processing order ${order.id}:`, itemErr);
        results.errors.push({ id: order.id, error: itemErr.message });
      }
    }

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (err) {
    console.error('Order status cron fatal error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
