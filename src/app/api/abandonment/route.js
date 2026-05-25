import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase.js';

export async function POST(req) {
  try {
    const { email, type, name, phone } = await req.json();
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const now = new Date().toISOString();
    let customerId;

    // Check if customer exists by email
    const { data: existingCustomer, error: findError } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (findError) {
      console.error('Find customer error:', findError);
      return NextResponse.json({ success: false, error: findError.message }, { status: 500 });
    }

    if (existingCustomer && existingCustomer.length > 0) {
      customerId = existingCustomer[0].id;
      const updateData = {};
      if (name) updateData.full_name = name;
      if (phone) updateData.phone = phone;

      if (type === 'checkout') {
        updateData.checkout_started_at = now;
        updateData.checkout_completed = false;
        updateData.checkout_1h_sent = false;
        updateData.checkout_24h_sent = false;
      } else if (type === 'booking') {
        updateData.booking_started_at = now;
        updateData.booking_completed = false;
        updateData.booking_1h_sent = false;
        updateData.booking_24h_sent = false;
      }

      const { error: updateError } = await supabase
        .from('customers')
        .update(updateData)
        .eq('id', customerId);

      if (updateError) {
        console.error('Update error in abandonment start:', updateError);
        return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
      }
    } else {
      const insertData = {
        email,
        full_name: name || 'Customer',
        phone: phone || '',
      };

      if (type === 'checkout') {
        insertData.checkout_started_at = now;
        insertData.checkout_completed = false;
        insertData.checkout_1h_sent = false;
        insertData.checkout_24h_sent = false;
      } else if (type === 'booking') {
        insertData.booking_started_at = now;
        insertData.booking_completed = false;
        insertData.booking_1h_sent = false;
        insertData.booking_24h_sent = false;
      }

      const { data: newCustomer, error: insertError } = await supabase
        .from('customers')
        .insert([insertData])
        .select()
        .single();

      if (insertError) {
        console.error('Insert error in abandonment start:', insertError);
        return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
      }
      customerId = newCustomer.id;
    }

    return NextResponse.json({ success: true, customerId }, { status: 200 });
  } catch (err) {
    console.error('Abandonment start API error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
