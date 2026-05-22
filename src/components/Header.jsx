"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { id: '/', label: 'HOME' },
    { id: '/seat-covers', label: 'SEAT COVERS' },
    { id: '/installation', label: 'DOORSTEP EXPERIENCE' },
    { id: '/about', label: 'ABOUT US' }
  ];

  return (
    <header className="global-header">
      <div className="header-container container">
        <Link href="/" className="header-logo">
          <img src="/Assets/removed.png" alt="Modern Cars Logo" className="header-logo-img" />
        </Link>

        <nav className="header-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.id}
                  className={pathname === link.id ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a
            href="https://wa.me/9335456465"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-icon-btn"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .global-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 90px;
          background-color: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .header-logo {
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .header-logo:hover {
          transform: scale(1.03);
        }

        .header-logo-img {
          height: 64px;
          width: auto;
        }

        .header-nav {
          flex-grow: 1;
          display: flex;
          justify-content: center;
        }

        .header-nav ul {
          display: flex;
          gap: 48px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .header-nav a {
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-primary);
          text-decoration: none;
          padding: 8px 0;
          position: relative;
          transition: color 0.3s ease;
        }

        .header-nav a:hover,
        .header-nav a.active {
          color: var(--accent-red);
        }

        .header-nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: var(--accent-red);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .header-nav a:hover::after,
        .header-nav a.active::after {
          width: 100%;
        }

        .whatsapp-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: var(--white);
          color: var(--accent-red);
          border: 1.5px solid rgba(198, 40, 40, 0.15);
          box-shadow: 0 4px 12px rgba(198, 40, 40, 0.08);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
        }

        .whatsapp-icon-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 16px rgba(198, 40, 40, 0.15);
          background-color: var(--accent-red);
          color: var(--white);
        }

        @media (max-width: 1000px) {
          .header-nav ul { gap: 20px; }
          .header-nav a { font-size: 0.75rem; }
          .header-logo-img { height: 36px; }
        }

        @media (max-width: 768px) {
          .header-nav { display: none; }
        }
      `}</style>
    </header>
  );
}
