import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  'Modern Cars <support@moderncars.in>';

export async function sendOrderConfirmationEmail({
  email,
  name,
  trackingId,
  identity,
  brand,
  model,
  year,
  fulfillmentType,
}) {
  try {
    
    const response = await resend.emails.send({
      from: FROM_EMAIL,

      // TEMPORARY DEBUG
      // replace back to [email] after it works
      to: [email],

      subject: 'Your Modern Cars Order is Confirmed',

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>Order Confirmed</h2>

          <p>Hi ${name || 'Customer'},</p>

          <p>Thank you for choosing Modern Cars.</p>

          <h3>Order Details</h3>

          <p><strong>Tracking ID:</strong> ${trackingId}</p>
          <p><strong>Seat Cover:</strong> ${identity}</p>
          <p><strong>Vehicle:</strong> ${brand} ${model} ${year}</p>
          <p><strong>Fulfillment Type:</strong> ${fulfillmentType}</p>

          <p>
  You can track your order anytime using your tracking ID.
</p>

<p>
  <a
    href="https://moderncars.in/track-order"
    style="
      display:inline-block;
      padding:12px 20px;
      background:#111;
      color:#fff;
      text-decoration:none;
      border-radius:8px;
      margin-top:10px;
    "
  >
    Track My Order
  </a>
</p>

<p>
  Tracking ID:
  <strong>${trackingId}</strong>
</p>

          <p>
            Support:
            <a href="mailto:support@moderncars.in">
              support@moderncars.in
            </a>
          </p>

          <br />

          <p>— Modern Cars</p>
        </div>
      `,
    });

    console.log('ORDER EMAIL RESPONSE:', response);
  } catch (err) {
    console.error('ORDER EMAIL FAILED FULL ERROR:', err);
  }
}

export async function sendBookingConfirmationEmail({
  email,
  name,
  brand,
  model,
  year,
  doorstepDate,
  doorstepTime,
}) {
  try {

    const response = await resend.emails.send({
      from: FROM_EMAIL,

      // TEMPORARY DEBUG
      // replace back to [email] after it works
      to: [email],

      subject: 'Your Modern Cars Installation is Confirmed',

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>Installation Confirmed</h2>

          <p>Hi ${name || 'Customer'},</p>

          <p>
            Your Modern Cars doorstep experience is scheduled.
          </p>

          <h3>Booking Details</h3>

          <p><strong>Date:</strong> ${doorstepDate}</p>
          <p><strong>Time:</strong> ${doorstepTime}</p>
          <p><strong>Vehicle:</strong> ${brand} ${model} ${year}</p>

          <p>
            Please ensure your vehicle is available at the scheduled time.
          </p>

          <p>
            Support:
            <a href="mailto:support@moderncars.in">
              support@moderncars.in
            </a>
          </p>

          <br />

          <p>— Modern Cars</p>
        </div>
      `,
    });

    console.log('BOOKING EMAIL RESPONSE:', response);
  } catch (err) {
    console.error('BOOKING EMAIL FAILED FULL ERROR:', err);
  }
}