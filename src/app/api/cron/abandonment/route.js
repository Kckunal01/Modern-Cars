import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase.js';
import {
  sendCheckoutAbandonment1Hour,
  sendCheckoutAbandonment24Hour,
  sendBookingAbandonment1Hour,
  sendBookingAbandonment24Hour
} from '../../../../lib/email.js';

export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');

    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const now = new Date();

    const results = {
      checkout: {
        found: 0,
        sent1h: 0,
        sent24h: 0,
        errors: []
      },
      booking: {
        found: 0,
        sent1h: 0,
        sent24h: 0,
        errors: []
      }
    };

    /* ==========================
       CHECKOUT ABANDONMENT
    ========================== */

    const {
      data: checkoutCustomers,
      error: checkoutErr
    } = await supabase
      .from('customers')
      .select('*')
      .not('checkout_started_at', 'is', null)
      .eq('checkout_completed', false)
      .or(
        'checkout_1h_sent.eq.false,checkout_24h_sent.eq.false'
      );

    if (checkoutErr) {
      console.error(
        'Checkout abandonment query error:',
        checkoutErr
      );

      results.checkout.errors.push(
        checkoutErr.message
      );
    } else if (checkoutCustomers?.length) {
      results.checkout.found =
        checkoutCustomers.length;

      for (const customer of checkoutCustomers) {
        try {
          const startedAt = new Date(
            customer.checkout_started_at
          );

          if (
            !customer.checkout_started_at ||
            isNaN(startedAt.getTime())
          ) {
            continue;
          }

          const diffHours =
            (now.getTime() -
              startedAt.getTime()) /
            (1000 * 60 * 60);

          // 1-HOUR EMAIL
          if (
            !customer.checkout_1h_sent &&
            diffHours >= 1
          ) {
            await sendCheckoutAbandonment1Hour({
              email: customer.email,
              name: customer.full_name
            });

            const { error } =
              await supabase
                .from('customers')
                .update({
                  checkout_1h_sent: true
                })
                .eq('id', customer.id);

            if (error) {
              results.checkout.errors.push({
                id: customer.id,
                error: error.message
              });
            } else {
              results.checkout.sent1h++;
            }

            // only 1 email per cron run
            continue;
          }

          // 24-HOUR EMAIL
          if (
            customer.checkout_1h_sent &&
            !customer.checkout_24h_sent &&
            diffHours >= 24
          ) {
            await sendCheckoutAbandonment24Hour({
              email: customer.email,
              name: customer.full_name
            });

            const { error } =
              await supabase
                .from('customers')
                .update({
                  checkout_24h_sent: true
                })
                .eq('id', customer.id);

            if (error) {
              results.checkout.errors.push({
                id: customer.id,
                error: error.message
              });
            } else {
              results.checkout.sent24h++;
            }
          }
        } catch (err) {
          console.error(
            `Checkout abandonment error for ${customer.id}`,
            err
          );

          results.checkout.errors.push({
            id: customer.id,
            error: err.message
          });
        }
      }
    }

    /* ==========================
       BOOKING ABANDONMENT
    ========================== */

    const {
      data: bookingCustomers,
      error: bookingErr
    } = await supabase
      .from('customers')
      .select('*')
      .not('booking_started_at', 'is', null)
      .eq('booking_completed', false)
      .or(
        'booking_1h_sent.eq.false,booking_24h_sent.eq.false'
      );

    if (bookingErr) {
      console.error(
        'Booking abandonment query error:',
        bookingErr
      );

      results.booking.errors.push(
        bookingErr.message
      );
    } else if (bookingCustomers?.length) {
      results.booking.found =
        bookingCustomers.length;

      for (const customer of bookingCustomers) {
        try {
          const startedAt = new Date(
            customer.booking_started_at
          );

          if (
            !customer.booking_started_at ||
            isNaN(startedAt.getTime())
          ) {
            continue;
          }

          const diffHours =
            (now.getTime() -
              startedAt.getTime()) /
            (1000 * 60 * 60);

          // 1-HOUR EMAIL
          if (
            !customer.booking_1h_sent &&
            diffHours >= 1
          ) {
            await sendBookingAbandonment1Hour({
              email: customer.email,
              name: customer.full_name
            });

            const { error } =
              await supabase
                .from('customers')
                .update({
                  booking_1h_sent: true
                })
                .eq('id', customer.id);

            if (error) {
              results.booking.errors.push({
                id: customer.id,
                error: error.message
              });
            } else {
              results.booking.sent1h++;
            }

            // only 1 email per cron run
            continue;
          }

          // 24-HOUR EMAIL
          if (
            customer.booking_1h_sent &&
            !customer.booking_24h_sent &&
            diffHours >= 24
          ) {
            await sendBookingAbandonment24Hour({
              email: customer.email,
              name: customer.full_name
            });

            const { error } =
              await supabase
                .from('customers')
                .update({
                  booking_24h_sent: true
                })
                .eq('id', customer.id);

            if (error) {
              results.booking.errors.push({
                id: customer.id,
                error: error.message
              });
            } else {
              results.booking.sent24h++;
            }
          }
        } catch (err) {
          console.error(
            `Booking abandonment error for ${customer.id}`,
            err
          );

          results.booking.errors.push({
            id: customer.id,
            error: err.message
          });
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        results
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      'Abandonment cron error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}