import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase.js';

export async function POST(req) {
  try {
    const { trackingId } = await req.json();

    if (!trackingId) {
      return NextResponse.json({ success: false, message: 'Tracking ID is required' }, { status: 400 });
    }

    console.log("Looking up tracking ID:", trackingId);

    // Query orders and join customers to get the name
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select(`
        tracking_id,
        status,
        created_at,
        order_type,
        fulfillment_type,
        booking_id,
        customers ( full_name, car_model )
      `)
      .eq('tracking_id', trackingId)
      .single();

    if (orderError || !orderData) {
      console.error("Supabase tracking lookup error:", orderError);
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    let bookingDate = null;
    let bookingTime = null;

    if (orderData.fulfillment_type === 'doorstep' && orderData.booking_id) {
      const { data: bookingData } = await supabase
        .from('bookings')
        .select('booking_date')
        .eq('id', orderData.booking_id)
        .single();
      
      if (bookingData && bookingData.booking_date) {
        const parts = bookingData.booking_date.split(' ');
        if (parts.length > 1) {
          bookingDate = parts[0];
          bookingTime = parts.slice(1).join(' ');
        } else {
          bookingDate = bookingData.booking_date;
        }
      }
    }

    const order = {
      trackingId: orderData.tracking_id,
      status: orderData.status,
      fulfillmentType: orderData.fulfillment_type || 'standard',
      createdAt: orderData.created_at,
      customerName: orderData.customers?.full_name || 'Guest',
      product: orderData.order_type,
      vehicle: orderData.customers?.car_model || 'Unknown Vehicle',
      bookingDate,
      bookingTime
    };

    return NextResponse.json({ success: true, order }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
