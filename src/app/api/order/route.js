import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase.js';

import {
  sendOrderConfirmationEmail,
  sendBookingConfirmationEmail
} from '../../../lib/email.js';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name, phone, email, address, pincode, city, state, addDoorstep,
      doorstepDate, doorstepTime, identity, brand, model, year,
      total, paymentMethod
    } = body;

    // Backend validation (critical)
    if (!name || !phone || !email || !address || !pincode || !city || !state || !brand || !model || !year || !identity) {
      return NextResponse.json({ success: false, message: 'Please complete all required fields.' }, { status: 400 });
    }
    if (addDoorstep && (!doorstepDate || !doorstepTime)) {
      return NextResponse.json({ success: false, message: 'Please complete all required fields.' }, { status: 400 });
    }

    console.log("Received order payload:", body);

    // 1. Insert Customer
    const fullAddressCity =
  `${city}, ${state} - ${pincode}\n${address}`.trim();

const carModelStr =
  `${brand} ${model} ${year}`.trim();

const customerPayload = {
  full_name: name,
  phone,
  email,
  city: fullAddressCity,
  car_model: carModelStr
};
    
    console.log("Mapped customer payload:", customerPayload);

    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .insert([customerPayload])
      .select()
      .single();

    if (customerError) {
      console.error("Supabase customer insert error:", customerError);
      return NextResponse.json(
        { success: false, message: 'Failed to save customer details.', error: customerError.message },
        { status: 500 }
      );
    }

    const customerId = customerData.id;

    // 2. Insert Booking if Doorstep selected
    let bookingId = null;
    if (addDoorstep) {
      const bookingPayload = {
        customer_id: customerId,
        service_name: `Doorstep Experience - ${identity}`,
        booking_date: doorstepDate,
        booking_time: doorstepTime,
        status: 'pending'
      };

      console.log("Mapped booking payload:", bookingPayload);

      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert([bookingPayload])
        .select()
        .single();

      if (bookingError) {
        console.error("Supabase booking insert error:", bookingError);
      } else {
        bookingId = bookingData.id;
      }
    }

    // 3. Insert Order
    const orderIdStr = 'MC' + Math.floor(1000 + Math.random() * 9000);
    
    // Generate tracking ID
    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const suffix = Math.floor(1000 + Math.random() * 9000);
    const trackingIdStr = `MC-${dateStr}-${suffix}`;

   const orderPayload = {
  customer_id: customerId,
  order_id: orderIdStr,
  amount: total || 0,

  payment_method:
    paymentMethod === 'online'
      ? 'online'
      : 'cod',

  payment_status:
    paymentMethod === 'online'
      ? 'paid'
      : 'pending',

  tracking_id: trackingIdStr,
  status: 'Order Placed',
  order_type: identity,
  fulfillment_type:
    addDoorstep
      ? 'doorstep'
      : 'standard',

  booking_id: bookingId
};

    console.log("Mapped order payload:", orderPayload);

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([orderPayload])
      .select()
      .single();

    if (orderError) {
      console.error("Supabase order insert error:", orderError);
      return NextResponse.json(
        { success: false, message: 'Failed to save order details.', error: orderError.message },
        { status: 500 }
      );
    }

    console.log("Order successfully created:", orderIdStr, "Tracking ID:", trackingIdStr);

    // Send Confirmation Email
    console.log('CALLING ORDER EMAIL FUNCTION');
    console.log('EMAIL BEING SENT TO:', email);
    await sendOrderConfirmationEmail({
  email,
  name,
  trackingId: trackingIdStr,
  identity,
  brand,
  model,
  year,
  fulfillmentType: addDoorstep
    ? 'Doorstep Experience'
    : 'Standard Delivery',
});
if (addDoorstep) {
  await sendBookingConfirmationEmail({
    email,
    name,
    brand,
    model,
    year,
    doorstepDate,
    doorstepTime,
  });
}

    return NextResponse.json({ success: true, orderId: orderIdStr, trackingId: trackingIdStr }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
