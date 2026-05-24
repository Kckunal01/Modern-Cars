import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase.js';
import { timeSlots } from '../../../data/carData';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        {
          availableSlots: timeSlots
        },
        { status: 200 }
      );
    }

    const { data, error } = await supabase
      .from('bookings')
      .select('booking_time')
      .eq('booking_date', date)
      .neq('status', 'cancelled');

    if (error) {
      console.error(
        'Available slots fetch error:',
        error
      );

      return NextResponse.json(
        {
          availableSlots: timeSlots
        },
        { status: 200 }
      );
    }

    const bookedSlots =
      data?.map(item => item.booking_time) || [];

    const availableSlots = timeSlots.filter(
      slot => !bookedSlots.includes(slot)
    );

    return NextResponse.json(
      { availableSlots },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      'Available slots API error:',
      error
    );

    return NextResponse.json(
      {
        availableSlots: timeSlots
      },
      { status: 200 }
    );
  }
}