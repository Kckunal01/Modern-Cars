console.log(
  'RESEND KEY EXISTS:',
  !!process.env.RESEND_API_KEY
);

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/*
TEMP DEBUG MODE

Using Resend sandbox sender.

Sandbox limitation:
Emails can ONLY go to:

moderncars24@gmail.com

Later after domain verification:
change FROM_EMAIL back to:

'Modern Cars <support@moderncars.in>'

and restore:
to: [data.email]
*/
const FROM_EMAIL = 'onboarding@resend.dev';

// TEMP TEST EMAIL
const TEST_EMAIL = 'moderncars24@gmail.com';

/* =========================
   CUSTOMER ORDER EMAIL
========================= */

export async function sendOrderConfirmationEmail(data) {
  try {
    console.log('ORDER EMAIL TRIGGERED');

    const response = await resend.emails.send({
      from: FROM_EMAIL,

      // TEMP
      to: [TEST_EMAIL],

      subject: 'Order Confirmed - Modern Cars',

      html: `
        <h1>Order Confirmed</h1>

        <p>Order email system works.</p>

        <p>
          <strong>Customer:</strong>
          ${data?.name || 'Unknown'}
        </p>

        <p>
          <strong>Email:</strong>
          ${data?.email || 'N/A'}
        </p>
      `,
    });

    console.log(
      'ORDER EMAIL RESPONSE:',
      response
    );

    return response;
  } catch (err) {
    console.error(
      'ORDER EMAIL FAILED FULL ERROR:',
      err
    );

    return null;
  }
}

/* =========================
   CUSTOMER BOOKING EMAIL
========================= */

export async function sendBookingConfirmationEmail(data) {
  try {
    console.log('BOOKING EMAIL TRIGGERED');

    const response = await resend.emails.send({
      from: FROM_EMAIL,

      // TEMP
      to: [TEST_EMAIL],

      subject: 'Booking Confirmed - Modern Cars',

      html: `
        <h1>Booking Confirmed</h1>

        <p>Booking email system works.</p>

        <p>
          <strong>Customer:</strong>
          ${data?.name || 'Unknown'}
        </p>

        <p>
          <strong>Email:</strong>
          ${data?.email || 'N/A'}
        </p>
      `,
    });

    console.log(
      'BOOKING EMAIL RESPONSE:',
      response
    );

    return response;
  } catch (err) {
    console.error(
      'BOOKING EMAIL FAILED FULL ERROR:',
      err
    );

    return null;
  }
}

/* =========================
   ADMIN ORDER ALERT
========================= */

export async function sendAdminOrderAlert() {
  try {
    console.log(
      'ADMIN ORDER ALERT TRIGGERED'
    );

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TEST_EMAIL],

      subject: 'ADMIN ORDER TEST',

      html: `
        <h1>Admin Order Alert Works</h1>

        <p>
          Modern Cars admin order alert
          triggered.
        </p>
      `,
    });

    console.log(
      'ADMIN ORDER RESPONSE:',
      response
    );

    return response;
  } catch (err) {
    console.error(
      'ADMIN ORDER FAILED FULL ERROR:',
      err
    );

    return null;
  }
}

/* =========================
   ADMIN BOOKING ALERT
========================= */

export async function sendAdminBookingAlert() {
  try {
    console.log(
      'ADMIN BOOKING ALERT TRIGGERED'
    );

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TEST_EMAIL],

      subject: 'ADMIN BOOKING TEST',

      html: `
        <h1>Admin Booking Alert Works</h1>

        <p>
          Modern Cars admin booking alert
          triggered.
        </p>
      `,
    });

    console.log(
      'ADMIN BOOKING RESPONSE:',
      response
    );

    return response;
  } catch (err) {
    console.error(
      'ADMIN BOOKING FAILED FULL ERROR:',
      err
    );

    return null;
  }
}

/* =========================
   TEST EMAIL
========================= */

export async function testAdminEmail() {
  try {
    console.log('TEST EMAIL TRIGGERED');

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TEST_EMAIL],

      subject: 'TEST EMAIL - MODERN CARS',

      html: `
        <h1>It Works</h1>

        <p>
          Resend pipeline is working.
        </p>
      `,
    });

    console.log(
      'TEST EMAIL RESPONSE:',
      response
    );

    return response;
  } catch (err) {
    console.error(
      'TEST EMAIL FAILED FULL ERROR:',
      err
    );

    return null;
  }
}

export async function send24HourReminderEmail({
  email,
  name,
  bookingDate,
  bookingTime,
  vehicle,
  serviceName
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Upcoming Installation Reminder (24 Hours)</h2>
      <p>Hi ${name || 'Customer'},</p>
      <p>This is a friendly reminder that your Modern Cars installation appointment is scheduled for tomorrow.</p>
      <h3>Booking Details</h3>
      <p><strong>Service:</strong> ${serviceName || 'Installation'}</p>
      <p><strong>Date:</strong> ${bookingDate}</p>
      <p><strong>Time:</strong> ${bookingTime}</p>
      <p><strong>Vehicle:</strong> ${vehicle || 'N/A'}</p>
      <p>Please make sure the vehicle is available. If you need to make changes, please contact support.</p>
      <p>Support: <a href="mailto:support@moderncars.in">support@moderncars.in</a></p>
      <br/>
      <p>— Modern Cars</p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: `Reminder: Installation Scheduled for Tomorrow - ${bookingTime}`,
    html
  });
}

export async function send2HourReminderEmail({
  email,
  name,
  bookingDate,
  bookingTime,
  vehicle,
  serviceName
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Upcoming Installation Reminder (2 Hours)</h2>
      <p>Hi ${name || 'Customer'},</p>
      <p>Our team will be arriving in approximately 2 hours for your scheduled installation appointment.</p>
      <h3>Booking Details</h3>
      <p><strong>Service:</strong> ${serviceName || 'Installation'}</p>
      <p><strong>Date:</strong> ${bookingDate}</p>
      <p><strong>Time:</strong> ${bookingTime}</p>
      <p><strong>Vehicle:</strong> ${vehicle || 'N/A'}</p>
      <p>Please ensure that your vehicle is parked in an accessible location for the installation team.</p>
      <p>Support: <a href="mailto:support@moderncars.in">support@moderncars.in</a></p>
      <br/>
      <p>— Modern Cars</p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: `Reminder: Installation in 2 Hours - ${bookingTime}`,
    html
  });
}