"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { id: '/', label: 'HOME' },
    { id: '/seat-covers', label: 'SEAT COVERS' },
    { id: '/installation', label: 'DOORSTEP EXPERIENCE' },
    { id: '/about', label: 'ABOUT US' },
    { id: '/track-order', label: 'TRACK ORDER' },
  ];

  return (
    <>
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

          {/* Desktop: WhatsApp icon */}
          <div className="header-actions desktop-only">
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

          {/* Mobile: Hamburger button */}
          <button
            className="mobile-menu-btn mobile-only"
            aria-label="Open Navigation"
            onClick={() => setDrawerOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <nav className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <img src="/Assets/removed.png" alt="Modern Cars Logo" className="drawer-logo" />
          <button className="drawer-close-btn" aria-label="Close" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>
        <ul className="drawer-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.id}
                className={pathname === link.id ? 'active' : ''}
                onClick={() => setDrawerOpen(false)}
              >
                {link.label}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </li>
          ))}
        </ul>
        <div className="drawer-footer">
          <a href="https://wa.me/9335456465" target="_blank" rel="noopener noreferrer" className="drawer-whatsapp-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </nav>

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

        /* Mobile hamburger button */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .mobile-menu-btn:hover {
          background: rgba(198,40,40,0.07);
        }

        .mobile-menu-btn span {
          display: block;
          width: 24px;
          height: 2px;
          background: #111;
          border-radius: 2px;
          transition: transform 0.3s;
        }

        /* Drawer overlay */
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 1100;
        }

        /* Slide-in drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 80vw;
          max-width: 320px;
          height: 100dvh;
          background: #fff;
          z-index: 1200;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -8px 0 40px rgba(0,0,0,0.14);
        }

        .mobile-drawer.open {
          transform: translateX(0);
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .drawer-logo {
          height: 44px;
          width: auto;
        }

        .drawer-close-btn {
          background: none;
          border: none;
          font-size: 1.4rem;
          cursor: pointer;
          color: #555;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .drawer-close-btn:hover {
          background: #f5f5f5;
        }

        .drawer-links {
          list-style: none;
          padding: 12px 0;
          margin: 0;
          flex-grow: 1;
          overflow-y: auto;
        }

        .drawer-links li a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #111;
          text-decoration: none;
          border-bottom: 1px solid #f5f5f5;
          transition: color 0.2s, background 0.2s;
        }

        .drawer-links li a.active,
        .drawer-links li a:hover {
          color: #C62828;
          background: rgba(198,40,40,0.04);
        }

        .drawer-footer {
          padding: 20px 24px;
          border-top: 1px solid #f0f0f0;
        }

        .drawer-whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px;
          background: #25D366;
          color: #fff;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .drawer-whatsapp-btn:hover {
          opacity: 0.88;
        }

        @media (max-width: 1000px) {
          .header-nav ul { gap: 20px; }
          .header-nav a { font-size: 0.75rem; }
          .header-logo-img { height: 36px; }
        }

        @media (max-width: 768px) {
          .header-nav { display: none; }
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
          .header-logo-img { height: 40px; }
          .global-header { height: 64px; }
        }

        .desktop-only { display: flex; }
        .mobile-only { display: none; }
      `}</style>
    </>
  );
}
