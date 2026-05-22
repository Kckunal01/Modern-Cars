"use client";
import React, { useState } from 'react';

const VALID_ORDERS = {
  'MC1024': { product: 'Seat Cover Order – Stealth Identity', vehicle: 'Hyundai Creta 2024', status: 'Order Received', date: 'May 16, 2025 • 10:30 AM', step: 1, est: '3 – 5 Days' },
  'MC2048': { product: 'Seat Cover Order – Signature', vehicle: 'Kia Seltos 2023', status: 'Ready for Dispatch', date: 'May 14, 2025 • 2:15 PM', step: 2, est: '1 – 2 Days' },
  'MC3072': { product: 'Doorstep Experience – Full Interior', vehicle: 'Maruti Brezza 2024', status: 'Out for Delivery', date: 'May 12, 2025 • 9:00 AM', step: 3, est: 'Today' },
  'MC4096': { product: 'Seat Cover Order – Vintage', vehicle: 'Mahindra Thar 2023', status: 'Delivered / Installed', date: 'May 10, 2025 • 11:45 AM', step: 4, est: 'Completed' },
  'MC5120': { product: 'Seat Cover Order – Minimal', vehicle: 'Tata Nexon 2024', status: 'Order Received', date: 'May 18, 2025 • 4:20 PM', step: 1, est: '4 – 6 Days' }
};

const STEPS = [
  'Order Received',
  'Ready for Dispatch',
  'Out for Delivery / Installation Scheduled',
  'Delivered / Installed'
];

export default function TrackOrder() {
  const [inputValue, setInputValue] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    const id = inputValue.trim().toUpperCase();
    setError('');
    setOrderData(null);

    if (!id) { setError('Please enter an Order ID.'); return; }
    if (VALID_ORDERS[id]) {
      setOrderData({ id, ...VALID_ORDERS[id] });
    } else {
      setError(`Order "${id}" not found. Please check the ID and try again.`);
    }
  };

  return (
    <div className="track-page" style={{ padding: '100px 0 120px', backgroundColor: '#fafafa' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div className="text-center" style={{ marginBottom: '48px' }}>
          <span className="eyebrow text-red">TRACK ORDER</span>
          <div className="title-line" style={{ width: '40px', margin: '8px auto 16px' }}></div>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '12px' }}>Follow Your <span className="text-red">Cabin Upgrade.</span></h1>
          <p style={{ color: '#888', fontSize: '1rem' }}>Track your order, shipping progress or installation status in one place.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '20px', fontSize: '0.78rem', fontWeight: 600, color: '#888' }}>
            <span><span className="text-red" style={{ marginRight: '6px' }}>●</span>SEAT COVERS</span>
            <span><span className="text-red" style={{ marginRight: '6px' }}>●</span>DOORSTEP EXPERIENCE</span>
            <span><span className="text-red" style={{ marginRight: '6px' }}>●</span>CUSTOMISATION</span>
          </div>
        </div>

        {/* Search Card */}
        <div className="track-card text-center">
          <h3 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Enter Order ID</h3>
          <form onSubmit={handleTrack}>
            <input
              type="text"
              className="input-field"
              placeholder="Enter order ID (e.g. MC1024)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ maxWidth: '400px', width: '100%', textAlign: 'center', margin: '0 auto 20px', display: 'block' }}
            />
            {error && <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>{error}</p>}
            <button type="submit" className="btn btn-primary" style={{ padding: '12px 36px' }}>
              Track My Order <span style={{ marginLeft: '6px' }}>→</span>
            </button>
          </form>
        </div>

        {/* Result */}
        {orderData && (
          <div className="track-card" style={{ marginTop: '32px' }}>
            <div className="result-grid">
              <div>
                <span className="result-label">ORDER DETAILS</span>
                <h3 style={{ marginBottom: '4px' }}>{orderData.product}</h3>
                <p style={{ color: '#888', marginBottom: '24px', fontSize: '0.9rem' }}>{orderData.vehicle}</p>

                <span className="result-label">CURRENT STATUS</span>
                <div className="status-badge">{orderData.status}</div>

                <span className="result-label" style={{ marginTop: '20px' }}>ESTIMATED COMPLETION</span>
                <div style={{ color: 'var(--accent-red)', fontWeight: 700, fontSize: '1.1rem' }}>{orderData.est}</div>
              </div>

              <div className="timeline-col">
                {STEPS.map((step, i) => (
                  <div key={i} className={`tl-step${i < orderData.step ? ' completed' : ''}${i === orderData.step - 1 ? ' active' : ''}`}>
                    <div className="tl-dot">{i < orderData.step ? '✓' : ''}</div>
                    <div>
                      <strong style={{ display: 'block', marginBottom: '2px', fontSize: '0.9rem' }}>{step}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#aaa' }}>{i === orderData.step - 1 ? orderData.date : (i < orderData.step ? 'Completed' : 'Upcoming')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .track-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 14px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        .result-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }
        .result-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #aaa;
          margin-bottom: 8px;
        }
        .status-badge {
          display: inline-block;
          background: rgba(198,40,40,0.06);
          color: var(--accent-red);
          padding: 10px 16px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 16px;
        }
        .timeline-col {
          border-left: 2px solid #eee;
          padding-left: 28px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          position: relative;
        }
        .tl-step {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          position: relative;
        }
        .tl-dot {
          position: absolute;
          left: -39px;
          top: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #ddd;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: white;
        }
        .tl-step.completed .tl-dot,
        .tl-step.active .tl-dot {
          background: var(--accent-red);
          border-color: var(--accent-red);
        }
        .eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          display: block;
        }
        @media (max-width: 768px) {
          .result-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
