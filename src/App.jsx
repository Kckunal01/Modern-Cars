import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SeatCovers from './pages/SeatCovers';
import Checkout from './pages/Checkout';
import Installation from './pages/Installation';
import About from './pages/About';
import TrackOrder from './pages/TrackOrder';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsConditions from './pages/TermsConditions';
import IntegrationsDashboard from './components/IntegrationsDashboard';
import CookieBanner from './components/CookieBanner';
import IdentityStealth from './pages/IdentityStealth';
import IdentitySignature from './pages/IdentitySignature';
import IdentityMinimal from './pages/IdentityMinimal';
import IdentityVintage from './pages/IdentityVintage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedIdentity, setSelectedIdentity] = useState(null);
  
  // Rate Limiting Policy State
  const [formSubmissionTimes, setFormSubmissionTimes] = useState([]);
  const [isPermanentlyBlocked, setIsPermanentlyBlocked] = useState(false);

  // Sync hash routing on load & hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = [
        'home', 'seat-covers', 'checkout', 'installation', 'about',
        'track-order', 'privacy-policy', 'refund-policy', 'terms',
        'stealth', 'signature', 'minimal', 'vintage'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Form Submission Rate-Limiter (Spam Protection)
  const incrementFormSubmissions = () => {
    const now = Date.now();
    const timeWindow = 60 * 1000; // 60 seconds
    
    const activeSubmissions = formSubmissionTimes.filter(time => now - time < timeWindow);
    
    if (activeSubmissions.length >= 3) {
      const secondsLeft = Math.ceil((timeWindow - (now - activeSubmissions[0])) / 1000);
      if (activeSubmissions.length >= 5) {
        setIsPermanentlyBlocked(true);
      }
      return { allowed: false, secondsLeft };
    }

    const updatedSubmissions = [...activeSubmissions, now];
    setFormSubmissionTimes(updatedSubmissions);
    
    return { allowed: true };
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'seat-covers':
        return <SeatCovers setCurrentPage={setCurrentPage} setSelectedIdentity={setSelectedIdentity} />;
      case 'checkout':
        return <Checkout setCurrentPage={setCurrentPage} selectedIdentity={selectedIdentity} incrementFormSubmissions={incrementFormSubmissions} />;
      case 'installation':
        return <Installation incrementFormSubmissions={incrementFormSubmissions} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'track-order':
        return <TrackOrder />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'refund-policy':
        return <RefundPolicy />;
      case 'terms':
        return <TermsConditions />;
      case 'stealth':
        return <IdentityStealth setCurrentPage={setCurrentPage} setSelectedIdentity={setSelectedIdentity} />;
      case 'signature':
        return <IdentitySignature setCurrentPage={setCurrentPage} setSelectedIdentity={setSelectedIdentity} />;
      case 'minimal':
        return <IdentityMinimal setCurrentPage={setCurrentPage} setSelectedIdentity={setSelectedIdentity} />;
      case 'vintage':
        return <IdentityVintage setCurrentPage={setCurrentPage} setSelectedIdentity={setSelectedIdentity} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

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

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {renderActivePage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      <CookieBanner />

      {/* Hidden integrations/security inspector dashboard overlay */}
      <IntegrationsDashboard />
    </>
  );
}
