import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div style={{ padding: '100px 0 80px', backgroundColor: '#fafafa' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', fontFamily: "'Times New Roman', serif", marginBottom: '8px' }}>Privacy Policy</h1>
          <div className="title-line" style={{ width: '50px', margin: '12px auto' }}></div>
          <h2 style={{ fontStyle: 'italic', fontSize: '1.8rem', fontWeight: 400, fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>Drive Better <span className="text-red">India</span></h2>
          <strong style={{ display: 'block', marginBottom: '16px' }}>Your privacy matters. Your data stays protected.</strong>
          <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Last Updated: 16 May, 2025</span>
        </div>

        <div className="policy-card">
          <div className="ps"><h3>1. Information We Collect</h3><p>We only collect information necessary to process orders, provide support and improve customer experience.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', margin: '16px 0' }}>
            <ul className="rl"><li>Name</li><li>Phone number</li><li>Address & pincode</li></ul>
            <ul className="rl"><li>Vehicle details (brand/model/year)</li><li>Order details</li></ul>
            <ul className="rl"><li>WhatsApp communication</li><li>Appointment preferences</li><li>Service preferences</li></ul>
          </div>
          <p style={{ color: '#999', fontSize: '0.85rem' }}>We do not collect unnecessary personal information.</p></div>
          <hr/>
          <div className="ps"><h3>2. How We Use Information</h3><p>We use collected information to:</p>
          <ul className="il"><li>Process orders</li><li>Schedule doorstep appointments</li><li>Provide tracking updates</li><li>Contact customers via WhatsApp or phone</li><li>Improve fitment and customer experience</li><li>Resolve support issues</li><li>Enhance our products and services</li></ul></div>
          <hr/>
          <div className="ps"><h3>3. Payments & Security</h3><p>Payment information is securely processed through trusted third-party payment providers. Modern Cars does not store card or banking credentials.</p></div>
          <hr/>
          <div className="ps"><h3>4. WhatsApp & Communication</h3><p>By placing an order or submitting a service request, you may receive:</p>
          <ul className="il"><li>Order confirmations</li><li>Service updates</li><li>Installation scheduling</li><li>Customer support communication</li></ul><p style={{ color: '#999', fontSize: '0.85rem' }}>We do not spam.</p></div>
          <hr/>
          <div className="ps"><h3>5. Sharing Information</h3><p>We do not sell customer information. Information may only be shared with trusted logistics, service or payment partners when required to fulfill an order or appointment.</p></div>
          <hr/>
          <div className="ps"><h3>6. Cookies & Analytics</h3><p>We may use analytics and cookies to improve website performance, understand customer journeys and enhance user experience.</p></div>
          <hr/>
          <div className="ps"><h3>7. Customer Rights</h3><p>Customers may request:</p>
          <ul className="il"><li>Information correction</li><li>Data deletion (where applicable)</li><li>Communication preference updates</li></ul><p>We respect your rights and take all reasonable steps to protect your data.</p></div>
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
