"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppContext } from '../context/AppContext';
import './IdentityCommon.css';
import { carBrands, getPrice } from '../data/carData';

export default function IdentityStealth() {
  const router = useRouter();
  const { setSelectedIdentity } = useAppContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/Assets/S1.png', '/Assets/S2.png', '/Assets/S3.png', '/Assets/S4.png'];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const brands = Object.keys(carBrands);
  const models = brand ? Object.keys(carBrands[brand].models) : [];
  const years = (brand && model && carBrands[brand].models[model]) ? carBrands[brand].models[model].years : [];

  const price = (brand && model) ? getPrice('stealth', brand, model) : 9499;


  const slideWidth = () => trackRef.current ? trackRef.current.offsetWidth / 3 : 0;

  const handlePrev = () => {
    const newIdx = slideIndex === 0 ? slides.length - 1 : slideIndex - 1;
    setSlideIndex(newIdx);
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${newIdx * slideWidth()}px)`;
  };

  const handleNext = () => {
    const newIdx = (slideIndex + 1) % slides.length;
    setSlideIndex(newIdx);
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${newIdx * slideWidth()}px)`;
  };

  const handleCheckout = () => {
    if (!brand || !model || !year) {
      alert("Please select Brand, Model, and Year");
      return;
    }
    const selection = { id: 'stealth', name: 'STEALTH', brand, model, year, img: '/Assets/Stealth.png' };
    if (setSelectedIdentity) setSelectedIdentity(selection);
    if (typeof window !== 'undefined') localStorage.setItem('mc_identity', JSON.stringify(selection));
    router.push('/checkout');
    window.scrollTo(0, 0);
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Stealth Seat Cover",
    "image": "https://moderncars.in/Assets/Stealth.png",
    "description": "Sharp. Understated. Powerful. Built for darker cabins, quieter personalities and modern interiors.",
    "brand": {
      "@type": "Brand",
      "name": "Modern Cars"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://moderncars.in/identity-stealth",
      "priceCurrency": "INR",
      "price": "9499",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="identity-page-wrapper theme-stealth" style={{ paddingTop: '72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      {/* Hero */}
      <section className="id-hero-carousel">
        {slides.map((src, index) => (
          <img key={index} src={src} alt={`Stealth ${index}`} className={`id-hero-slide ${index === currentSlide ? 'active' : ''}`} />
        ))}
        <div className="id-hero-overlay-arrow" onClick={() => router.push('/seat-covers')}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
        <div className="id-hero-indicators">
          {slides.map((_, i) => (
            <div key={i} className={`id-indicator ${i === currentSlide ? 'active' : ''}`} />
          ))}
        </div>
      </section>

      {/* Header */}
      <section className="id-header-section">
        <h1 className="id-title">S T E A L T H</h1>
        <p className="id-subtitle">Sharp. Understated. Powerful.<br/>Built for darker cabins, quieter personalities and modern interiors.</p>
      </section>

      {/* Trust Row */}
      <div className="id-trust-row">
        <div className="id-trust-item">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          <div className="id-trust-text"><strong>ASSURED FIT</strong>Tailored for your car</div>
        </div>
        <div className="id-trust-item">
          <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          <div className="id-trust-text"><strong>DIY OR INSTALLED</strong>Your choice, your comfort</div>
        </div>
        <div className="id-trust-item">
          <svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          <div className="id-trust-text"><strong>PAN INDIA DELIVERY</strong>Delivered to your doorstep</div>
        </div>
        <div className="id-trust-item">
          <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
          <div className="id-trust-text"><strong>AIRBAG COMPATIBLE</strong>Engineered for safety</div>
        </div>
      </div>

      {/* Cabin Section */}
      <section className="id-cabin-section">
        <div className="id-cabin-content">
          <h3>THE UNDERCOVER CABIN</h3>
          <h2>Inspired by tailored<br/>black suits and quiet<br/>authority.</h2>
          <div style={{ width: '40px', height: '2px', background: 'var(--border)', marginBottom: '32px' }} />
          <p>Clean lines. Deeper tones.<br/>A cabin that speaks without saying a word.</p>
          <div className="id-cabin-tags">
            UNDERSTATED <span>•</span> SHARP <span>•</span> CONTROLLED
          </div>
        </div>
        <div className="id-cabin-image">
          <Image src="/Assets/Stealth.png" alt="Stealth Cabin" width={600} height={400} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
        </div>
      </section>

      {/* Materials */}
      <section className="id-materials-section">
        <h3>CRAFTED FOR BETTER DRIVING</h3>
        <h2>Premium Materials. Purposeful Design.</h2>
        <div className="id-materials-grid">
          <div className="id-material-card">
            <img src="/Assets/SM1.png" alt="Stealth Material 1" />
          </div>
          <div className="id-material-card">
            <img src="/Assets/SM2.png" alt="Stealth Material 2" />
          </div>
          <div className="id-material-card">
            <img src="/Assets/SM3.png" alt="Stealth Material 3" />
          </div>
        </div>
      </section>

      {/* Configurator */}
      <section className="id-configurator-wrapper">
        <div className="id-config-box">
          <div className="id-config-left">
            <div className="id-form-row">
              <div className="id-form-group">
                <label>SELECT BRAND</label>
                <select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(''); setYear(''); }}>
                  <option value="">Choose Brand</option>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="id-form-group">
                <label>SELECT MODEL</label>
                <select value={model} onChange={(e) => { setModel(e.target.value); setYear(''); }} disabled={!brand}>
                  <option value="">Choose Model</option>
                  {models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="id-form-group">
                <label>SELECT YEAR</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} disabled={!model}>
                  <option value="">Choose Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>
          
          <div className="id-config-right">
            <div className="id-price-label">STARTING AT</div>
            <div className="id-price-value">₹{price.toLocaleString('en-IN')}</div>
            <div className="id-price-sub">Inclusive of all taxes</div>
            <button className="id-checkout-btn" onClick={handleCheckout}>
              MOVE TO CHECKOUT
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
