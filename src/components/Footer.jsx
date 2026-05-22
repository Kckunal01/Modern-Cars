"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="global-footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand Col */}
          <div className="footer-col brand-col">
            <div className="footer-logo mb-2">
              <span style={{ fontSize: '2.4rem', fontFamily: 'var(--font-heading)', fontWeight: 500, letterSpacing: '-0.03em' }}><span style={{ color: 'var(--accent-red)' }}>M</span><span style={{ color: '#fff' }}>C</span></span>
            </div>
            <p className="footer-text mt-3">
              Modern Cars is a design-led automotive interiors brand focused on better fitment, cleaner aesthetics and a better driving experience.
            </p>
            <a href="https://www.instagram.com/drivebetterindia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram" style={{ color: '#E1306C', opacity: 1 }}>
              <svg viewBox="0 0 24 24" width="26" height="26" fill="#E1306C" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="#fff"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#fff"></line>
              </svg>
            </a>
          </div>

          {/* Main Menu */}
          <div className="footer-col">
            <h4>MAIN MENU</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/seat-covers">Seat Covers</Link></li>
              <li><Link href="/installation">Doorstep Experience</Link></li>
              <li><Link href="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>QUICK LINKS</h4>
            <ul>
              <li><Link href="/track-order">Track Order</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/refund-policy">Refund Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>CONTACT</h4>
            <ul className="contact-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <a href="tel:+919335456465">+91 93354 56465</a>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:moderncars24@gmail.com">moderncars24@gmail.com</a>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <a href="https://maps.app.goo.gl/EoJMVDppggPBbMzZ8" target="_blank" rel="noopener noreferrer">Modern Cars Store</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Modern Cars. All Rights Reserved.
        </div>
      </div>

      <style>{`
        .global-footer {
          background-color: var(--footer-bg);
          color: #A0A0A0;
          padding: 80px 0 24px;
          margin-top: auto;
          font-size: 0.95rem;
          font-family: var(--font-body, 'Inter', sans-serif);
          position: relative;
          overflow: hidden;
        }

        .global-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent-red), transparent);
          opacity: 0.3;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 64px;
          margin-bottom: 64px;
        }

        .footer-text {
          line-height: 1.7;
          margin-bottom: 24px;
          max-width: 320px;
          font-size: 1.05rem;
          transition: color 0.3s ease;
        }
        .footer-text:hover { color: #fff; }

        .social-link {
          color: var(--white);
          opacity: 0.7;
          display: inline-block;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-link:hover {
          opacity: 1;
          color: var(--accent-red);
          transform: translateY(-2px);
        }

        .footer-col h4 {
          color: var(--accent-red);
          font-size: 0.9rem;
          letter-spacing: 0.12em;
          margin-bottom: 24px;
          font-weight: 600;
          font-family: var(--font-heading, 'Outfit', sans-serif);
        }

        .footer-col ul {
          display: flex;
          flex-direction: column;
          gap: 16px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-col ul li a {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
          font-size: 1rem;
          font-weight: 400;
        }

        .footer-col a:hover {
          color: #fff;
          transform: translateX(4px);
        }

        .contact-list li a {
          color: rgba(255,255,255,0.7);
          transition: color 0.3s ease;
          text-decoration: none;
        }
        .contact-list li a:hover {
          color: #fff;
        }

        .contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          font-size: 1rem;
        }

        .contact-list svg {
          margin-top: 2px;
          color: var(--accent-red);
          flex-shrink: 0;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 48px; }
        }

        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </footer>
  );
}
