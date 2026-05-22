import React from 'react';

export default function TermsConditions() {
  return (
    <div style={{ padding: '100px 0 80px', backgroundColor: '#fafafa' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', fontFamily: "'Times New Roman', serif", marginBottom: '8px' }}>Terms & Conditions</h1>
          <div className="title-line" style={{ width: '50px', margin: '12px auto' }}></div>
          <h2 style={{ fontStyle: 'italic', fontSize: '1.8rem', fontWeight: 400, fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>Drive Better <span className="text-red">India</span></h2>
          <span style={{ fontSize: '0.8rem', color: '#aaa', display: 'block', marginTop: '16px' }}>Last Updated: 16 May, 2025</span>
        </div>

        <div className="policy-card">
          <div className="ps"><h3>1. General Terms</h3><p>By using the Modern Cars website, placing an order or booking a doorstep service, you agree to these terms and conditions. Modern Cars reserves the right to update products, pricing, service availability and policies when required.</p></div>
          <hr/>
          <div className="ps"><h3>2. Products & Services</h3><p>Modern Cars offers:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '12px 0' }}>
            <ul className="rl"><li>Premium seat covers</li><li>Interior styling products</li><li>Custom modification requests</li></ul>
            <ul className="rl"><li>Doorstep automotive services</li><li>Vehicle upgrade services</li></ul>
          </div>
          <p style={{ color: '#999', fontSize: '0.85rem' }}>Product visuals are intended for representation and minor variations in stitching, material, texture or finish may occur.</p></div>
          <hr/>
          <div className="ps"><h3>3. Orders & Confirmation</h3><p>Orders are considered confirmed after:</p>
          <ul className="rl"><li>Successful payment (if applicable)</li><li>Manual order confirmation by our team</li><li>Appointment confirmation for doorstep services</li></ul>
          <p>Modern Cars may contact customers for fitment confirmation, vehicle details or scheduling.</p></div>
          <hr/>
          <div className="ps"><h3>4. Pricing & Payments</h3><p>Prices shown may change without prior notice. Payment may be collected through:</p>
          <ul className="il"><li>Online payment methods</li><li>UPI</li><li>Partial advance payments</li><li>Cash (where applicable)</li></ul>
          <p style={{ color: '#999', fontSize: '0.85rem', marginTop: '8px' }}>Modern Cars does not store payment credentials.</p></div>
          <hr/>
          <div className="ps"><h3>5. Doorstep Experience Terms</h3><p>Doorstep services are currently available only in selected service areas. Customers are expected to:</p>
          <ul className="rl"><li>Provide accurate vehicle details</li><li>Ensure access to the vehicle</li><li>Provide a suitable installation location</li></ul>
          <p>Service timing may change due to traffic, weather or operational delays.</p></div>
          <hr/>
          <div className="ps"><h3>6. Shipping & Delivery</h3><p>Delivery timelines are estimated and may vary depending on:</p>
          <ul className="il"><li>Product availability</li><li>Customization requirements</li><li>Location</li><li>Courier delays</li></ul>
          <p style={{ marginTop: '8px' }}>Modern Cars will attempt timely updates wherever possible.</p></div>
          <hr/>
          <div className="ps"><h3>7. Returns & Refunds</h3><p>Refunds and replacements are governed by our Refund Policy. Minor material, color or stitching variation shall not qualify for refund unless product quality is defective.</p></div>
          <hr/>
          <div className="ps"><h3>8. Liability Limitation</h3><p>Modern Cars is not liable for:</p>
          <ul className="rl"><li>Delays caused by third parties</li><li>Incorrect customer-provided information</li><li>Installation limitations caused by vehicle condition</li><li>Minor visual differences between digital previews and physical products</li></ul></div>
          <hr/>
          <div className="ps"><h3>9. Intellectual Property</h3><p>All branding, visuals, website content and design assets belong to Modern Cars and may not be copied or reused without permission.</p></div>
          <hr/>
          <div className="ps"><h3>10. Policy Updates</h3><p>Modern Cars may update these terms periodically. Continued use of the website or services implies acceptance of revised terms.</p></div>
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
        .il { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 6px 20px; }
        .il li { position: relative; padding-left: 12px; font-size: 0.85rem; }
        .il li::before { content: '•'; color: var(--accent-red); position: absolute; left: 0; }
        @media (max-width: 768px) { .policy-card { padding: 24px; } .ps > div { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
