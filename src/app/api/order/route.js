import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase.js';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name, phone, address, pincode, city, state, addDoorstep,
      doorstepDate, doorstepTime, identity, brand, model, year,
      total, paymentMethod
    } = body;

    console.log("Received order payload:", body);

    // 1. Insert Customer
    const fullAddressCity = `${city || ''}, ${state || ''} - ${pincode || ''}\n${address || ''}`.trim();
    const carModelStr = `${brand || ''} ${model || ''} ${year || ''}`.trim();

    const customerPayload = {
      full_name: name || 'Guest',
      phone: phone || '',
      email: null, // email not currently collected in checkout
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

    // 2. Insert Order
    const orderIdStr = 'MC' + Math.floor(1000 + Math.random() * 9000);
    const orderPayload = {
      customer_id: customerId,
      order_id: orderIdStr,
      amount: total || 0,
      payment_status: paymentMethod === 'online' ? 'paid' : 'pending',
      tracking_id: null,
      order_type: identity || 'Seat Cover'
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

    // 3. Optional: Insert Booking if Doorstep selected
    if (addDoorstep && doorstepDate && doorstepTime) {
      const bookingPayload = {
        customer_id: customerId,
        service_name: `Doorstep Experience - ${identity || 'Seat Cover'}`,
        booking_date: `${doorstepDate} ${doorstepTime}`,
        status: 'pending'
      };

      console.log("Mapped booking payload:", bookingPayload);

      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([bookingPayload]);

      if (bookingError) {
        console.error("Supabase booking insert error:", bookingError);
        // We do not fail the whole order if booking fails, just log it
      }
    }

    console.log("Order successfully created:", orderIdStr);
    return NextResponse.json({ success: true, orderId: orderIdStr }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
