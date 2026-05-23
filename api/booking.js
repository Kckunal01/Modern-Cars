import { supabaseServer } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const {
      name, phone, pincode, brand, model, year, area, date, time, services, message
    } = req.body;

    console.log("Received booking payload:", req.body);

    // 1. Insert Customer
    const fullAddressArea = `${area || ''} - ${pincode || ''}`.trim();
    const carModelStr = `${brand || ''} ${model || ''} ${year || ''}`.trim();

    const customerPayload = {
      full_name: name || 'Guest',
      phone: phone || '',
      email: null,
      city: fullAddressArea,
      car_model: carModelStr
    };

    console.log("Mapped customer payload:", customerPayload);

    const { data: customerData, error: customerError } = await supabaseServer
      .from('customers')
      .insert([customerPayload])
      .select()
      .single();

    if (customerError) {
      console.error("Supabase customer insert error:", customerError);
      return res.status(500).json({ success: false, message: 'Failed to save customer details.', error: customerError.message });
    }

    const customerId = customerData.id;

    // 2. Insert Booking
    const selectedServices = [];
    if (services) {
      if (services.seatCover) selectedServices.push('Seat Cover');
      if (services.premiumMatting) selectedServices.push('Premium Matting');
      if (services.steeringCover) selectedServices.push('Steering Cover');
      if (services.ambientLight) selectedServices.push('Ambient Light');
      if (services.specialMod) selectedServices.push('Special Modification');
    }
    
    let serviceStr = selectedServices.join(', ');
    if (!serviceStr) serviceStr = 'Doorstep Installation';
    if (message) serviceStr += ` | Note: ${message}`;

    const bookingPayload = {
      customer_id: customerId,
      service_name: serviceStr,
      booking_date: `${date} ${time}`,
      status: 'pending'
    };

    console.log("Mapped booking payload:", bookingPayload);

    const { data: bookingData, error: bookingError } = await supabaseServer
      .from('bookings')
      .insert([bookingPayload])
      .select()
      .single();

    if (bookingError) {
      console.error("Supabase booking insert error:", bookingError);
      return res.status(500).json({ success: false, message: 'Failed to save booking details.', error: bookingError.message });
    }

    console.log("Booking successfully created:", bookingData.id);
    return res.status(200).json({ success: true, bookingId: bookingData.id });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
}
