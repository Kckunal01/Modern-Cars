import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mc_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('mc_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('mc_cookie_consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <h4>We use cookies</h4>
        <p>
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="btn cookie-btn reject" onClick={handleReject}>Reject</button>
        <button className="btn cookie-btn accept" onClick={handleAccept}>Accept</button>
      </div>

      <style>{`
        .cookie-banner {
          position: fixed;
          bottom: 24px;
          left: 24px;
          right: 24px;
          max-width: 600px;
          margin: 0 auto;
          background-color: var(--accent-red);
          color: white;
          padding: 24px 32px;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(198, 40, 40, 0.3);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          z-index: 9999;
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .cookie-content h4 {
          margin: 0 0 8px;
          font-family: var(--font-heading);
          font-size: 1.2rem;
          color: white;
        }

        .cookie-content p {
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.5;
          opacity: 0.9;
        }

        .cookie-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        .cookie-btn {
          padding: 10px 20px;
          font-size: 0.85rem;
          border-radius: 8px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .cookie-btn.accept {
          background-color: white;
          color: var(--accent-red);
        }

        .cookie-btn.accept:hover {
          background-color: #f5f5f5;
          transform: translateY(-2px);
        }

        .cookie-btn.reject {
          background-color: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.4);
        }

        .cookie-btn.reject:hover {
          background-color: rgba(255,255,255,0.1);
        }

        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 640px) {
          .cookie-banner {
            flex-direction: column;
            align-items: flex-start;
            padding: 20px;
            bottom: 16px;
            left: 16px;
            right: 16px;
          }
          .cookie-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
