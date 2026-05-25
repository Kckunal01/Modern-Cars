import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase.js';

import {
  sendBookingConfirmationEmail,
  sendAdminBookingAlert,
} from '../../../lib/email.js';

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

    console.log(
      'Received booking payload:',
      body
    );

    /* =========================
       VALIDATION
    ========================= */

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
          message:
            'Please complete all required fields.',
        },
        { status: 400 }
      );
    }

    /* =========================
       PREVENT SAME USER SAME DAY
    ========================= */

    const {
      data: existingUserBooking,
    } = await supabase
      .from('customers')
      .select('id, phone')
      .eq('phone', phone);

    if (existingUserBooking?.length) {
      const customerIds =
        existingUserBooking.map(
          (c) => c.id
        );

      const {
        data: userBookings,
      } = await supabase
        .from('bookings')
        .select('booking_date')
        .in(
          'customer_id',
          customerIds
        )
        .eq(
          'booking_date',
          date
        )
        .neq(
          'status',
          'cancelled'
        );

      if (userBookings?.length) {
        return NextResponse.json(
          {
            success: false,
            message:
              'You already booked a slot for this day.',
          },
          { status: 400 }
        );
      }
    }

    /* =========================
       PREVENT SLOT DUPLICATION
    ========================= */

    const {
      data: existingSlot,
    } = await supabase
      .from('bookings')
      .select('id')
      .eq(
        'booking_date',
        date
      )
      .eq(
        'booking_time',
        time
      )
      .neq(
        'status',
        'cancelled'
      );

    if (existingSlot?.length) {
      return NextResponse.json(
        {
          success: false,
          message:
            'This slot is already booked.',
        },
        { status: 400 }
      );
    }

    /* =========================
       CREATE CUSTOMER
    ========================= */

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
      booking_completed: true,
    };

    console.log(
      'Mapped customer payload:',
      customerPayload
    );

    // Find existing customer by email to update instead of duplicate insert
    const { data: existingCustomers, error: findCustErr } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .limit(1);

    let customerData, customerError;
    if (!findCustErr && existingCustomers && existingCustomers.length > 0) {
      const { data, error } = await supabase
        .from('customers')
        .update(customerPayload)
        .eq('id', existingCustomers[0].id)
        .select()
        .single();
      customerData = data;
      customerError = error;
    } else {
      const { data, error } = await supabase
        .from('customers')
        .insert([customerPayload])
        .select()
        .single();
      customerData = data;
      customerError = error;
    }

    if (customerError) {
      console.error(
        'Supabase customer insert/update error:',
        customerError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            'Failed to save customer details.',
          error:
            customerError.message,
        },
        { status: 500 }
      );
    }

    const customerId =
      customerData.id;

    /* =========================
       BUILD SERVICE STRING
    ========================= */

    const selectedServices =
      [];

    if (services) {
      if (services.seatCover)
        selectedServices.push(
          'Seat Cover'
        );

      if (
        services.premiumMatting
      )
        selectedServices.push(
          'Premium Matting'
        );

      if (
        services.steeringCover
      )
        selectedServices.push(
          'Steering Cover'
        );

      if (
        services.ambientLight
      )
        selectedServices.push(
          'Ambient Light'
        );

      if (services.specialMod)
        selectedServices.push(
          'Special Modification'
        );
    }

    let serviceStr =
      selectedServices.join(
        ', '
      );

    if (!serviceStr) {
      serviceStr =
        'Doorstep Installation';
    }

    if (message) {
      serviceStr +=
        ` | Note: ${message}`;
    }

    /* =========================
       CREATE BOOKING
    ========================= */

    const bookingPayload = {
      customer_id:
        customerId,
      service_name:
        serviceStr,
      booking_date:
        date,
      booking_time:
        time,
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
          message:
            'Failed to save booking details.',
          error:
            bookingError.message,
        },
        { status: 500 }
      );
    }

    console.log(
      'Booking successfully created:',
      bookingData.id
    );

    /* =========================
       CUSTOMER EMAIL
    ========================= */

    try {
      await sendBookingConfirmationEmail({
        email,
        name,
        brand,
        model,
        year,
        doorstepDate:
          date,
        doorstepTime:
          time,
      });
    } catch (e) {
      console.error(
        'Booking confirmation email failed:',
        e
      );
    }

    /* =========================
       ADMIN BOOKING ALERT
    ========================= */

    try {
      await sendAdminBookingAlert({
        bookingId:
          bookingData.id,
        name,
        phone,
        email,
        vehicle:
          carModelStr,
        bookingDate:
          date,
        bookingTime:
          time,
        services:
          serviceStr,
        notes:
          message ||
          'No notes',
      });
    } catch (e) {
      console.error(
        'Admin booking alert failed:',
        e
      );
    }

    /* =========================
       SUCCESS RESPONSE
    ========================= */

    return NextResponse.json(
      {
        success: true,
        bookingId:
          bookingData.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      'API Error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Internal Server Error',
        error:
          error.message,
      },
      { status: 500 }
    );
  }
}