import React from 'react';

export default function About({ setCurrentPage }) {
  return (
    <div className="about-page" style={{ paddingTop: '72px' }}>

      {/* Top Hero */}
      <section className="container" style={{ padding: '60px 0 80px' }}>
        <div className="about-hero-grid">
          <div className="about-text-col">
            <h1 className="hero-brand"><span className="text-red">MODERN </span>CARS</h1>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--text-secondary)', display: 'block', marginBottom: '16px' }}>DRIVE BETTER INDIA</span>
            <div className="title-line" style={{ width: '60px', marginBottom: '32px' }}></div>

            <div style={{ fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '440px' }}>
              <p style={{ marginBottom: '20px' }}>Modern Cars is a design led automotive interiors brand built on 30+ years of experience in the automotive industry.</p>
              <p>From a family run business in Lucknow to a pan India brand, our mission remains the same — to create better interiors through minimal design, premium materials and perfect fitment.</p>
            </div>
          </div>
          <div className="about-image-col">
            <img src="/Assets/Au1.jpeg" alt="Modern Cars" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container" style={{ paddingBottom: '80px' }}>
        <div className="about-stats-row">
          <div className="about-stat">
            <span className="about-stat-num text-red">30+</span>
            <span className="about-stat-label">Years of<br/>Experience</span>
          </div>
          <div className="about-stat-divider"></div>
          <div className="about-stat">
            <span className="about-stat-num text-red">100K+</span>
            <span className="about-stat-label">Happy<br/>Customers</span>
          </div>
          <div className="about-stat-divider"></div>
          <div className="about-stat">
            <span className="about-stat-num text-red">4.9★</span>
            <span className="about-stat-label">Average<br/>Rating</span>
          </div>
        </div>
      </section>

      <style>{`
        .about-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 64px;
          align-items: center;
        }
        .hero-brand {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          letter-spacing: -0.04em;
          margin-bottom: 4px;
        }
        .about-tagline {
          font-weight: 700;
          font-size: 1.15rem;
          background: linear-gradient(135deg, var(--accent-red), #111);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.5;
        }
        .about-image-col {
          height: 520px;
          border-radius: 24px;
          overflow: hidden;
        }

        /* Stats Row */
        .about-stats-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 64px;
          background-color: #fff;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 20px;
          padding: 56px 80px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.04);
        }
        .about-stat {
          text-align: center;
        }
        .about-stat-num {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 800;
          display: block;
          margin-bottom: 8px;
        }
        .about-stat-label {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 500;
          line-height: 1.4;
          display: block;
        }
        .about-stat-divider {
          width: 1px;
          height: 60px;
          background-color: rgba(0,0,0,0.08);
        }

        @media (max-width: 900px) {
          .about-hero-grid { grid-template-columns: 1fr; }
          .about-image-col { height: 360px; }
          .about-stats-row { flex-direction: column; gap: 32px; padding: 40px 24px; }
          .about-stat-divider { width: 60px; height: 1px; }
        }
      `}</style>
    </div>
  );
}
