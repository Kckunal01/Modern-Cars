console.log(
  'RESEND KEY EXISTS:',
  !!process.env.RESEND_API_KEY
);

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.FROM_EMAIL;

/* =========================
   CUSTOMER ORDER EMAIL
========================= */

export async function sendOrderConfirmationEmail(data) {
  try {
    console.log('ORDER EMAIL TRIGGERED');

    const response = await resend.emails.send({
      from: FROM_EMAIL,

      // TEMP
      to: [data.email],

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
      to: [data.email],

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
      to: [data.email],

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
      to: [data.email],

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
      to: [data.email],

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

export async function sendFeedbackRequest24h({ email, name, type, id }) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>We'd love your feedback!</h2>
      <p>Hi ${name || 'Customer'},</p>
      <p>Thank you for choosing Modern Cars. Your recent ${type} (ID: ${id}) has been completed.</p>
      <p>Could you please take a moment to share your feedback with us?</p>
      <br/>
      <p>— Modern Cars</p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: `Share your feedback on your Modern Cars ${type === 'order' ? 'Order' : 'Booking'}`,
    html
  });
}

export async function sendFeedbackReminder48h({ email, name, type, id }) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Friendly Reminder: Share your feedback</h2>
      <p>Hi ${name || 'Customer'},</p>
      <p>We recently completed your ${type} (ID: ${id}) and would love to know about your experience.</p>
      <p>If you haven't already, please take a quick minute to share your feedback.</p>
      <br/>
      <p>— Modern Cars</p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: `Reminder: Feedback for Modern Cars ${type === 'order' ? 'Order' : 'Booking'}`,
    html
  });
}

/* =========================
   ABANDONMENT EMAILS
========================= */

export async function sendCheckoutAbandonment1Hour({ email, name }) {
  const html = `
    <div style="font-family:'Helvetica Neue', Arial, sans-serif; max-width:600px; margin:auto; color:#1a1a1a; background:#ffffff;">
      <div style="background:#0d0d0d; padding:32px 40px; text-align:center;">
        <p style="color:#c0a060; font-size:13px; letter-spacing:3px; margin:0; font-weight:600;">
          MODERN CARS
        </p>
      </div>

      <div style="padding:48px 40px;">
        <h1 style="font-size:26px; font-weight:700; margin:0 0 16px; line-height:1.3;">
          Your order is waiting, ${name || 'there'}.
        </h1>

        <p style="color:#555; font-size:15px; line-height:1.7; margin:0 0 24px;">
          You started your Modern Cars order but didn’t complete checkout.
        </p>

        <p style="color:#555; font-size:15px; line-height:1.7; margin:0 0 32px;">
          Your selected upgrade is still available and your order can be completed in seconds.
        </p>

        <div style="text-align:center; margin:32px 0;">
          <a
            href="https://moderncars.in/checkout"
            style="background:#0d0d0d;color:#ffffff;text-decoration:none;padding:16px 40px;font-size:14px;font-weight:700;letter-spacing:2px;display:inline-block;"
          >
            COMPLETE YOUR ORDER
          </a>
        </div>

        <p style="color:#999;font-size:13px;margin:32px 0 0;border-top:1px solid #f0f0f0;padding-top:24px;">
          Questions?
          <a href="mailto:support@moderncars.in" style="color:#0d0d0d;">
            support@moderncars.in
          </a>
        </p>
      </div>
    </div>
  `;

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Your Modern Cars order is waiting',
    html
  });
}

export async function sendCheckoutAbandonment24Hour({ email, name }) {
  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; color: #1a1a1a; background: #ffffff;">
      <div style="background: #0d0d0d; padding: 32px 40px; text-align: center;">
        <p style="color: #c0a060; font-size: 13px; letter-spacing: 3px; margin: 0; font-weight: 600;">
          MODERN CARS
        </p>
      </div>

      <div style="padding: 48px 40px;">
        <h1 style="font-size: 26px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">
          Last chance, ${name || 'there'}.
        </h1>

        <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
          It has been a day. Your seat cover selection is still on our end, but we cannot guarantee availability much longer.
        </p>

        <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 32px;">
          If you are ready to make a decision, your cabin upgrade is one step away.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a
            href="https://moderncars.in/checkout"
            style="background:#0d0d0d;color:#ffffff;text-decoration:none;padding:16px 40px;font-size:14px;font-weight:700;letter-spacing:2px;display:inline-block;"
          >
            COMPLETE YOUR ORDER
          </a>
        </div>

        <p style="color:#999;font-size:13px;margin:32px 0 0;border-top:1px solid #f0f0f0;padding-top:24px;">
          Support:
          <a href="mailto:support@moderncars.in" style="color:#0d0d0d;">
            support@moderncars.in
          </a>
        </p>
      </div>
    </div>
  `;

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'We are saving your Modern Cars order!',
    html
  });
}

export async function sendBookingAbandonment1Hour({ email, name }) {
  const html = `
    <div style="font-family:'Helvetica Neue', Arial, sans-serif; max-width:600px; margin:auto; color:#1a1a1a; background:#ffffff;">
      <div style="background:#0d0d0d; padding:32px 40px; text-align:center;">
        <p style="color:#c0a060; font-size:13px; letter-spacing:3px; margin:0; font-weight:600;">
          MODERN CARS
        </p>
      </div>

      <div style="padding:48px 40px;">
        <h1 style="font-size:26px; font-weight:700; margin:0 0 16px; line-height:1.3;">
          Your installation slot is open, ${name || 'there'}.
        </h1>

        <p style="color:#555; font-size:15px; line-height:1.7; margin:0 0 24px;">
          You started booking a doorstep installation but did not confirm.
          Our technicians are available and your preferred time may still be open.
        </p>

        <p style="color:#555; font-size:15px; line-height:1.7; margin:0 0 32px;">
          Secure your slot before it fills up.
        </p>

        <div style="text-align:center; margin:32px 0;">
          <a
            href="https://moderncars.in/installation"
            style="background:#0d0d0d;color:#ffffff;text-decoration:none;padding:16px 40px;font-size:14px;font-weight:700;letter-spacing:2px;display:inline-block;"
          >
            BOOK YOUR SLOT
          </a>
        </div>
      </div>
    </div>
  `;

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Your Modern Cars slot is still available',
    html
  });
}

export async function sendBookingAbandonment24Hour({ email, name }) {
  const html = `
    <div style="font-family:'Helvetica Neue', Arial, sans-serif; max-width:600px; margin:auto; color:#1a1a1a; background:#ffffff;">
      <div style="background:#0d0d0d; padding:32px 40px; text-align:center;">
        <p style="color:#c0a060; font-size:13px; letter-spacing:3px; margin:0; font-weight:600;">
          MODERN CARS
        </p>
      </div>

      <div style="padding:48px 40px;">
        <h1 style="font-size:26px; font-weight:700; margin:0 0 16px; line-height:1.3;">
          Slots are filling up, ${name || 'there'}.
        </h1>

        <p style="color:#555; font-size:15px; line-height:1.7; margin:0 0 24px;">
          A day has passed since you considered a Modern Cars doorstep installation.
          Our calendar fills quickly and we cannot hold time indefinitely.
        </p>

        <div style="text-align:center; margin:32px 0;">
          <a
            href="https://moderncars.in/installation"
            style="background:#0d0d0d;color:#ffffff;text-decoration:none;padding:16px 40px;font-size:14px;font-weight:700;letter-spacing:2px;display:inline-block;"
          >
            BOOK YOUR SLOT
          </a>
        </div>
      </div>
    </div>
  `;

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Book your Modern Cars installation',
    html
  });
}