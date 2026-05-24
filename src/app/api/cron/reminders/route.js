import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase.js';
import { send24HourReminderEmail, send2HourReminderEmail } from '../../../../lib/email.js';

function parseBookingDateTime(dateStr, timeStr) {
  const [year, month, day] = dateStr.split('-');
  const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) {
    return new Date(`${dateStr}T12:00:00+05:30`);
  }
  
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3].toUpperCase();
  
  if (ampm === 'PM' && hours < 12) {
    hours += 12;
  } else if (ampm === 'AM' && hours === 12) {
    hours = 0;
  }
  
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  
  return new Date(`${year}-${month}-${day}T${hoursStr}:${minutesStr}:00+05:30`);
}

export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    
    // YYYY-MM-DD from yesterday to limit database lookup efficiently
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' });
    const minDateStr = formatter.format(yesterday);

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        id,
        booking_date,
        booking_time,
        status,
        reminder_24h_sent,
        reminder_2h_sent,
        service_name,
        customers (
          full_name,
          phone,
          email,
          car_model
        )
      `)
      .neq('status', 'cancelled')
      .gte('booking_date', minDateStr)
      .or('reminder_24h_sent.eq.false,reminder_2h_sent.eq.false');

    if (error) {
      console.error('Supabase query error in reminders cron:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const results = {
      totalFound: bookings?.length || 0,
      sent24h: 0,
      sent2h: 0,
      errors: []
    };

    if (bookings && bookings.length > 0) {
      for (const booking of bookings) {
        try {
          if (!booking.booking_date || !booking.booking_time) continue;
          
          const customer = booking.customers;
          if (!customer || !customer.email) continue;

          const bookingTimeObj = parseBookingDateTime(booking.booking_date, booking.booking_time);
          const diffMs = bookingTimeObj.getTime() - now.getTime();
          const diffHours = diffMs / (1000 * 60 * 60);

          // 1. Send 24 Hour Reminder if within 24h
          if (!booking.reminder_24h_sent && diffHours > 0 && diffHours <= 24) {
            await send24HourReminderEmail({
              email: customer.email,
              name: customer.full_name,
              bookingDate: booking.booking_date,
              bookingTime: booking.booking_time,
              vehicle: customer.car_model,
              serviceName: booking.service_name
            });

            const { error: updateErr } = await supabase
              .from('bookings')
              .update({ reminder_24h_sent: true })
              .eq('id', booking.id);

            if (updateErr) {
              console.error(`Failed to update 24h flag for booking ${booking.id}:`, updateErr);
            } else {
              results.sent24h++;
            }
          }

          // 2. Send 2 Hour Reminder if within 2h
          if (!booking.reminder_2h_sent && diffHours > 0 && diffHours <= 2) {
            await send2HourReminderEmail({
              email: customer.email,
              name: customer.full_name,
              bookingDate: booking.booking_date,
              bookingTime: booking.booking_time,
              vehicle: customer.car_model,
              serviceName: booking.service_name
            });

            const { error: updateErr } = await supabase
              .from('bookings')
              .update({ reminder_2h_sent: true })
              .eq('id', booking.id);

            if (updateErr) {
              console.error(`Failed to update 2h flag for booking ${booking.id}:`, updateErr);
            } else {
              results.sent2h++;
            }
          }
        } catch (itemErr) {
          console.error(`Error processing booking ID ${booking.id}:`, itemErr);
          results.errors.push({ id: booking.id, error: itemErr.message });
        }
      }
    }

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (error) {
    console.error('CRON ROUTE ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
