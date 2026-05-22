import React from 'react';

export default function TrustBadges() {
  const reviews = [
    { name: "Aditya Sharma", car: "Hyundai Creta", rating: 5, text: "Excellent fitment! The Classic Tan gives it an ultra-premium OEM look. Highly recommend the Doorstep Installation." },
    { name: "Rahul Verma", car: "Mahindra Thar", rating: 5, text: "Went for the Stealth Black. Fabric feels super high quality, and it fits absolutely tight. No wrinkles anywhere." },
    { name: "Priya Nair", car: "Maruti Swift", rating: 5, text: "Fast checkout and neat work. The booking was synced to WhatsApp instantly, and the technician arrived exactly on time." }
  ];

  const badges = [
    { title: "Assured Fit", desc: "Tailored precisely for your car make, model, and year.", icon: "✓" },
    { title: "Doorstep Installation", desc: "Expert technicians install at your home or office.", icon: "⌂" },
    { title: "PAN India Shipping", desc: "Fast and secure delivery across all pin codes.", icon: "⛟" },
    { title: "Secure Checkout", desc: "Encrypted transactions with leading payment gateways.", icon: "🔒" }
  ];

  return (
    <div className="trust-container">
      {/* Badges Grid */}
      <div className="badges-grid mb-6">
        {badges.map((badge, index) => (
          <div key={index} className="badge-card premium-card">
            <div className="badge-icon-wrap">{badge.icon}</div>
            <h4 className="mb-1">{badge.title}</h4>
            <p className="font-sm">{badge.desc}</p>
          </div>
        ))}
      </div>

      {/* Real Installation Previews */}
      <div className="install-previews-section mb-6">
        <h3 className="text-center mb-1">Real Installation Previews</h3>
        <p className="text-center mb-4">See how our seat covers look inside our customers' cabins.</p>
        <div className="previews-grid">
          <div className="preview-card-wrap">
            <div className="preview-placeholder stealth">
              <span className="style-tag">STEALTH BLACK</span>
            </div>
            <div className="preview-meta">
              <span className="car-name">Mahindra XUV700</span>
              <span className="install-type">Installed in Delhi</span>
            </div>
          </div>
          <div className="preview-card-wrap">
            <div className="preview-placeholder classic">
              <span className="style-tag">CLASSIC TAN</span>
            </div>
            <div className="preview-meta">
              <span className="car-name">Hyundai Creta</span>
              <span className="install-type">Installed in Mumbai</span>
            </div>
          </div>
          <div className="preview-card-wrap">
            <div className="preview-placeholder minimalist">
              <span className="style-tag">MINIMALIST OEM+</span>
            </div>
            <div className="preview-meta">
              <span className="car-name">Tata Nexon</span>
              <span className="install-type">Installed in Bengaluru</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section">
        <h3 className="text-center mb-4">What Cabin Owners Say</h3>
        <div className="reviews-grid">
          {reviews.map((rev, index) => (
            <div key={index} className="review-card premium-card">
              <div className="rating-stars">{"★".repeat(rev.rating)}</div>
              <p className="review-text mb-3">"{rev.text}"</p>
              <div className="review-author">
                <strong>{rev.name}</strong>
                <span className="review-car">{rev.car} Owner</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trust-container {
          padding: 40px 0;
        }

        .badges-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .badge-card {
          text-align: center;
          padding: 24px !important;
          border-radius: var(--border-radius-md) !important;
        }

        .badge-icon-wrap {
          width: 48px;
          height: 48px;
          background: var(--accent-red-light);
          color: var(--accent-red);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 16px;
        }

        .previews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .preview-card-wrap {
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-soft);
          background-color: var(--card-bg);
          transition: var(--transition-smooth);
        }

        .preview-card-wrap:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
        }

        .preview-placeholder {
          height: 240px;
          width: 100%;
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: 16px;
          background-size: cover;
          background-position: center;
        }

        .preview-placeholder.stealth {
          background-color: #232329;
          background-image: radial-gradient(circle at 30% 20%, #3e3e46 0%, #151518 70%);
        }

        .preview-placeholder.classic {
          background-color: #795548;
          background-image: radial-gradient(circle at 30% 20%, #a1786a 0%, #4e342e 70%);
        }

        .preview-placeholder.minimalist {
          background-color: #D7CCC8;
          background-image: radial-gradient(circle at 30% 20%, #efebe9 0%, #bcaaa4 70%);
        }

        .style-tag {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          color: #FFFFFF;
          background: rgba(17, 17, 17, 0.4);
          backdrop-filter: blur(4px);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .preview-meta {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .car-name {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .install-type {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .review-card {
          padding: 24px !important;
          border-radius: var(--border-radius-md) !important;
        }

        .rating-stars {
          color: #FFB300;
          font-size: 1.1rem;
          margin-bottom: 12px;
        }

        .review-text {
          font-size: 0.95rem;
          font-style: italic;
          color: var(--text-secondary);
        }

        .review-author {
          display: flex;
          flex-direction: column;
          font-size: 0.85rem;
        }

        .review-author strong {
          color: var(--text-primary);
        }

        .review-car {
          color: var(--text-secondary);
          margin-top: 2px;
        }

        @media (max-width: 900px) {
          .badges-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .previews-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .reviews-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 500px) {
          .badges-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
