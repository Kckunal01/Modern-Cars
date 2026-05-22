"use client";
import React from 'react';
import { AppProvider, useAppContext } from '../context/AppContext';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import IntegrationsDashboard from './IntegrationsDashboard';

function BlockChecker({ children }) {
  const { isPermanentlyBlocked, setIsPermanentlyBlocked } = useAppContext();
  
  if (isPermanentlyBlocked) {
    return (
      <div className="blocked-overlay" style={{ padding: '40px', textAlign: 'center', marginTop: '100px' }}>
        <h1 style={{ color: 'var(--accent-red)', marginBottom: '16px' }}>Access Blocked</h1>
        <p style={{ maxWidth: '400px', margin: '0 auto 24px' }}>
          Too many automated submission requests detected. Access suspended temporarily for spam protection.
        </p>
        <button className="btn btn-primary" onClick={() => setIsPermanentlyBlocked(false)}>
          Verify I am Human
        </button>
      </div>
    );
  }
  
  return children;
}

export default function ClientWrapper({ children }) {
  return (
    <AppProvider>
      <BlockChecker>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <IntegrationsDashboard />
      </BlockChecker>
    </AppProvider>
  );
}
