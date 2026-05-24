import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase.js';
import { sendFeedbackRequest24h, sendFeedbackReminder48h } from '../../../../lib/email.js';

export async function GET(req) {
  try {
    // Vercel / External cron secret verification
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const results = {
      orders: { found: 0, sent24h: 0, sent48h: 0, errors: [] },
      bookings: { found: 0, sent24h: 0, sent48h: 0, errors: [] }
    };

    // 1. Process Orders: status = 'Delivered', feedback_submitted = false
    const { data: orders, error: ordersErr } = await supabase
      .from('orders')
      .select(`
        id,
        order_id,
        status,
        tracking_updated_at,
        feedback_submitted,
        feedback_24h_sent,
        feedback_48h_sent,
        customers (
          full_name,
          email
        )
      `)
      .eq('status', 'Delivered')
      .eq('feedback_submitted', false)
      .or('feedback_24h_sent.eq.false,feedback_48h_sent.eq.false');

    if (ordersErr) {
      console.error('Supabase query error in orders feedback:', ordersErr);
      results.orders.errors.push(ordersErr.message);
    } else if (orders) {
      results.orders.found = orders.length;
      for (const order of orders) {
        try {
          if (!order.tracking_updated_at) continue;
          const completedAt = new Date(order.tracking_updated_at);
          if (isNaN(completedAt.getTime())) continue;

          const diffMs = now.getTime() - completedAt.getTime();
          const diffHours = diffMs / (1000 * 60 * 60);
          const customer = order.customers;
          if (!customer || !customer.email) continue;

          // 24h feedback request
          if (!order.feedback_24h_sent && diffHours >= 24) {
            await sendFeedbackRequest24h({
              email: customer.email,
              name: customer.full_name,
              type: 'order',
              id: order.order_id || order.id
            });

            const { error: updateErr } = await supabase
              .from('orders')
              .update({ feedback_24h_sent: true })
              .eq('id', order.id);

            if (updateErr) {
              console.error(`Failed to update feedback_24h_sent flag for order ${order.id}:`, updateErr);
              results.orders.errors.push({ id: order.id, error: updateErr.message });
            } else {
              results.orders.sent24h++;
            }
          }
          // 48h feedback reminder (only if 24h was already sent)
          if (order.feedback_24h_sent && !order.feedback_48h_sent && diffHours >= 48) {
            await sendFeedbackReminder48h({
              email: customer.email,
              name: customer.full_name,
              type: 'order',
              id: order.order_id || order.id
            });

            const { error: updateErr } = await supabase
              .from('orders')
              .update({ feedback_48h_sent: true })
              .eq('id', order.id);

            if (updateErr) {
              console.error(`Failed to update feedback_48h_sent flag for order ${order.id}:`, updateErr);
              results.orders.errors.push({ id: order.id, error: updateErr.message });
            } else {
              results.orders.sent48h++;
            }
          }
        } catch (err) {
          console.error(`Error processing feedback for order ID ${order.id}:`, err);
          results.orders.errors.push({ id: order.id, error: err.message });
        }
      }
    }

    // 2. Process Bookings: status = 'Completed', feedback_submitted = false
    const { data: bookings, error: bookingsErr } = await supabase
      .from('bookings')
      .select(`
        id,
        status,
        updated_at,
        feedback_submitted,
        feedback_24h_sent,
        feedback_48h_sent,
        customers (
          full_name,
          email
        )
      `)
      .eq('status', 'Completed')
      .eq('feedback_submitted', false)
      .or('feedback_24h_sent.eq.false,feedback_48h_sent.eq.false');

    if (bookingsErr) {
      console.error('Supabase query error in bookings feedback:', bookingsErr);
      results.bookings.errors.push(bookingsErr.message);
    } else if (bookings) {
      results.bookings.found = bookings.length;
      for (const booking of bookings) {
        try {
          if (!booking.updated_at) continue;
          const completedAt = new Date(booking.updated_at);
          if (isNaN(completedAt.getTime())) continue;

          const diffMs = now.getTime() - completedAt.getTime();
          const diffHours = diffMs / (1000 * 60 * 60);
          const customer = booking.customers;
          if (!customer || !customer.email) continue;

          // 24h feedback request
          if (!booking.feedback_24h_sent && diffHours >= 24) {
            await sendFeedbackRequest24h({
              email: customer.email,
              name: customer.full_name,
              type: 'booking',
              id: booking.id
            });

            const { error: updateErr } = await supabase
              .from('bookings')
              .update({ feedback_24h_sent: true })
              .eq('id', booking.id);

            if (updateErr) {
              console.error(`Failed to update feedback_24h_sent flag for booking ${booking.id}:`, updateErr);
              results.bookings.errors.push({ id: booking.id, error: updateErr.message });
            } else {
              results.bookings.sent24h++;
            }
          }
          // 48h feedback reminder (only if 24h was already sent)
          if (booking.feedback_24h_sent && !booking.feedback_48h_sent && diffHours >= 48) {
            await sendFeedbackReminder48h({
              email: customer.email,
              name: customer.full_name,
              type: 'booking',
              id: booking.id
            });

            const { error: updateErr } = await supabase
              .from('bookings')
              .update({ feedback_48h_sent: true })
              .eq('id', booking.id);

            if (updateErr) {
              console.error(`Failed to update feedback_48h_sent flag for booking ${booking.id}:`, updateErr);
              results.bookings.errors.push({ id: booking.id, error: updateErr.message });
            } else {
              results.bookings.sent48h++;
            }
          }
        } catch (err) {
          console.error(`Error processing feedback for booking ID ${booking.id}:`, err);
          results.bookings.errors.push({ id: booking.id, error: err.message });
        }
      }
    }

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (error) {
    console.error('CRON ROUTE ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
