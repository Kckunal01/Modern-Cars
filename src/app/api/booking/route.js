import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase.js';
import { sendBookingConfirmationEmail } from '../../../lib/email.js';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      pincode,
      brand,
      model,
      year,
      area,
      date,
      time,
      services,
      message,
    } = body;

    console.log('Received booking payload:', body);

    // -----------------------------
    // Validation
    // -----------------------------
    if (
      !name ||
      !phone ||
      !email ||
      !brand ||
      !model ||
      !year ||
      !date ||
      !time
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please complete all required fields.',
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Prevent same user booking
    // same day
    // -----------------------------
    const { data: existingUserBooking } = await supabase
      .from('customers')
      .select('id, phone')
      .eq('phone', phone);

    if (existingUserBooking?.length) {
      const customerIds = existingUserBooking.map((c) => c.id);

      const { data: userBookings } = await supabase
        .from('bookings')
        .select('booking_date')
        .in('customer_id', customerIds)
        .eq('booking_date', date)
        .neq('status', 'cancelled');

      if (userBookings?.length) {
        return NextResponse.json(
          {
            success: false,
            message: 'You already booked a slot for this day.',
          },
          { status: 400 }
        );
      }
    }

    // -----------------------------
    // Prevent duplicate slot booking
    // -----------------------------
    const { data: existingSlot } = await supabase
      .from('bookings')
      .select('id')
      .eq('booking_date', date)
      .eq('booking_time', time)
      .neq('status', 'cancelled');

    if (existingSlot?.length) {
      return NextResponse.json(
        {
          success: false,
          message: 'This slot is already booked.',
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Insert customer
    // -----------------------------
    const fullAddressArea =
      `${area || ''} - ${pincode || ''}`.trim();

    const carModelStr =
      `${brand || ''} ${model || ''} ${year || ''}`.trim();

    const customerPayload = {
      full_name: name,
      phone,
      email,
      city: fullAddressArea,
      car_model: carModelStr,
    };

    console.log(
      'Mapped customer payload:',
      customerPayload
    );

    const {
      data: customerData,
      error: customerError,
    } = await supabase
      .from('customers')
      .insert([customerPayload])
      .select()
      .single();

    if (customerError) {
      console.error(
        'Supabase customer insert error:',
        customerError
      );

      return NextResponse.json(
        {
          success: false,
          message: 'Failed to save customer details.',
          error: customerError.message,
        },
        { status: 500 }
      );
    }

    const customerId = customerData.id;

    // -----------------------------
    // Build service list
    // -----------------------------
    const selectedServices = [];

    if (services) {
      if (services.seatCover)
        selectedServices.push('Seat Cover');

      if (services.premiumMatting)
        selectedServices.push('Premium Matting');

      if (services.steeringCover)
        selectedServices.push('Steering Cover');

      if (services.ambientLight)
        selectedServices.push('Ambient Light');

      if (services.specialMod)
        selectedServices.push('Special Modification');
    }

    let serviceStr = selectedServices.join(', ');

    if (!serviceStr) {
      serviceStr = 'Doorstep Installation';
    }

    if (message) {
      serviceStr += ` | Note: ${message}`;
    }

    // -----------------------------
    // Insert booking
    // -----------------------------
    const bookingPayload = {
      customer_id: customerId,
      service_name: serviceStr,
      booking_date: date,
      booking_time: time,
      status: 'pending',
    };

    console.log(
      'Mapped booking payload:',
      bookingPayload
    );

    const {
      data: bookingData,
      error: bookingError,
    } = await supabase
      .from('bookings')
      .insert([bookingPayload])
      .select()
      .single();

    if (bookingError) {
      console.error(
        'Supabase booking insert error:',
        bookingError
      );

      return NextResponse.json(
        {
          success: false,
          message: 'Failed to save booking details.',
          error: bookingError.message,
        },
        { status: 500 }
      );
    }

    console.log(
      'Booking successfully created:',
      bookingData.id
    );

    // -----------------------------
    // Send confirmation email
    // -----------------------------
    await sendBookingConfirmationEmail({
      email,
      name,
      brand,
      model,
      year,
      doorstepDate: date,
      doorstepTime: time,
    });

    return NextResponse.json(
      {
        success: true,
        bookingId: bookingData.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}