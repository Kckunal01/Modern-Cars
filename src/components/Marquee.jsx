import React from 'react';

export default function Marquee() {
  const textItems = [
    "7-Day Return",
    "PAN India Shipping",
    "Assured Quality",
    "DIY or Doorstep Installation",
    "Trusted Automotive Experience"
  ];

  // Repeat items to fill space and guarantee seamless transitions
  const repeatedItems = [...textItems, ...textItems, ...textItems, ...textItems];

  return (
    <section className="marquee-section">
      <div className="marquee-container">
        <div className="marquee-track">
          {repeatedItems.map((item, index) => (
            <div key={index} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <span className="marquee-dot">•</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-section {
          background-color: var(--text-primary);
          color: var(--bg-primary);
          padding: 16px 0;
          overflow: hidden;
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .marquee-container {
          display: flex;
          width: 100%;
          overflow: hidden;
        }

        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          padding: 0 24px;
        }

        .marquee-text {
          font-family: var(--font-heading);
          font-weight: 500;
          font-size: 0.95rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .marquee-dot {
          margin-left: 48px;
          color: var(--accent-red);
          font-size: 1.2rem;
        }

        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
