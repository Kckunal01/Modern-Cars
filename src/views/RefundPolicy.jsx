import React from 'react';

export default function RefundPolicy() {
  return (
    <div style={{ padding: '100px 0 80px', backgroundColor: '#fafafa' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', fontFamily: "'Times New Roman', serif", marginBottom: '8px' }}>Refund Policy</h1>
          <div className="title-line" style={{ width: '50px', margin: '12px auto' }}></div>
          <h2 style={{ fontStyle: 'italic', fontSize: '1.8rem', fontWeight: 400, fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>Drive Better <span className="text-red">India</span></h2>
          <span style={{ fontSize: '0.8rem', color: '#aaa', display: 'block', marginTop: '16px' }}>Last Updated: 16 May, 2025</span>
        </div>

        <div className="policy-card">
          <div className="ps"><h3>1. General Policy</h3><p>We offer refunds only in cases where the product is defective, damaged, incorrect or services are not delivered as committed. Refunds are not applicable for change of mind or personal preference.</p></div>
          <hr/>
          <div className="ps"><h3>2. Eligibility for Refund</h3><p>You are eligible for a refund if:</p>
          <ul className="rl"><li>The product received is damaged, defective or incorrect.</li><li>The wrong item was delivered.</li><li>The service was not completed as committed.</li><li>You notify us within 48 hours of delivery or scheduled service.</li></ul>
          <p style={{ color: '#999', fontSize: '0.85rem' }}>Please share clear images/videos and your order details for quick resolution.</p></div>
          <hr/>
          <div className="ps"><h3>3. Non-Refundable Cases</h3><p>Refunds are not applicable in the following cases:</p>
          <ul className="rl"><li>Change of mind or preference after order confirmation.</li><li>Products that have been installed, used or show signs of usage.</li><li>Minor variations in color, texture or design due to material characteristics.</li><li>Custom or personalized orders.</li></ul></div>
          <hr/>
          <div className="ps"><h3>4. Refund Process</h3><p>Once your request is approved:</p>
          <ul className="rl"><li>We will inspect the issue (if required).</li><li>The refund will be processed to the original payment method.</li><li>Refunds are typically processed within 5-7 business days after approval.</li></ul></div>
          <hr/>
          <div className="ps"><h3>5. Service-Related Refunds</h3><p>If a scheduled service is cancelled by us or not completed due to our fault, a full refund or reschedule option will be provided.</p></div>
          <hr/>
          <div className="ps"><h3>6. How to Raise a Refund Request</h3><p>To raise a refund request, please contact our support team within 48 hours of delivery or scheduled service with your order ID and issue details.</p></div>
          <hr/>
          <div className="ps"><h3>7. Policy Updates</h3><p>We may update this Refund Policy from time to time. Any changes will be reflected on this page.</p></div>
        </div>
      </div>
      <style>{`
        .policy-card { background: #fff; border: 1px solid #eee; border-radius: 14px; padding: 48px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
        .ps { margin-bottom: 8px; }
        .ps h3 { font-family: 'Times New Roman', serif; font-size: 1.4rem; margin-bottom: 12px; }
        .ps p { font-size: 0.9rem; line-height: 1.7; margin-bottom: 8px; }
        hr { border: 0; border-top: 1px solid #eee; margin: 28px 0; }
        .rl { list-style: none; padding: 0; }
        .rl li { position: relative; padding-left: 14px; margin-bottom: 6px; font-size: 0.85rem; }
        .rl li::before { content: '•'; color: var(--accent-red); position: absolute; left: 0; }
        @media (max-width: 768px) { .policy-card { padding: 24px; } }
      `}</style>
    </div>
  );
}
