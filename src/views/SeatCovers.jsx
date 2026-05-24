"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppContext } from '../context/AppContext';
import { carBrands, getModelsForBrand, getYearsForModel } from '../data/carData';

export default function SeatCovers() {
  const router = useRouter();
  const { setSelectedIdentity } = useAppContext();
  
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSeatIdentity, setSelectedSeatIdentity] = useState('');

  const identities = [
    { id: 'stealth', name: 'STEALTH', desc: 'Bold. Minimal. Powerful.', img: '/Assets/Stealth.png' },
    { id: 'signature', name: 'SIGNATURE', desc: 'Timeless. Elegant. Balanced.', img: '/Assets/Signature.png' },
    { id: 'vintage', name: 'VINTAGE', desc: 'Understated. Rich. Classy.', img: '/Assets/Vintage.png' },
    { id: 'minimal', name: 'MINIMAL', desc: 'Clean. Simple. Sophisticated.', img: '/Assets/Minimal.png' }
  ];

  const canCheckout = selectedBrand && selectedModel && selectedYear && selectedSeatIdentity;

  const handleCheckout = () => {
    if (!canCheckout) return;
    const selected = identities.find(i => i.id === selectedSeatIdentity) || identities[0];
    setSelectedIdentity({ ...selected, brand: selectedBrand, model: selectedModel, year: selectedYear });
    router.push('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeItems = ['30+ YEARS EXPERIENCE', 'PAN INDIA DELIVERY', 'ASSURED FIT', 'DIY OR DOORSTEP INSTALLATION', 'PREMIUM INTERIOR IDENTITY', 'EASY RETURNS', 'WHATSAPP SUPPORT', '30+ YEARS EXPERIENCE', 'PAN INDIA DELIVERY', 'ASSURED FIT', 'DIY OR DOORSTEP INSTALLATION', 'PREMIUM INTERIOR IDENTITY', 'EASY RETURNS', 'WHATSAPP SUPPORT'];

  const availableModels = selectedBrand ? getModelsForBrand(selectedBrand) : [];
  const availableYears = (selectedBrand && selectedModel) ? getYearsForModel(selectedBrand, selectedModel) : [];

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
    setSelectedYear('');
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
    setSelectedYear('');
  };

  return (
    <div className="seat-covers-page" style={{ paddingTop: '72px' }}>

      {/* Choose Your Identity */}
      <section id="identities" className="identity-section" style={{ padding: '80px 0' }}>
        <div className="container text-center" style={{ marginBottom: '48px' }}>
          <h2 className="identity-heading">Choose Your <span className="text-red">Identity</span></h2>
        </div>

        <div className="container">
          <div className="identity-grid">
            {identities.map((id, index) => (
              <div key={index} className="identity-card" onClick={() => {
                router.push(`/seat-covers/${id.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
                <Image src={id.img} alt={id.name} layout="fill" objectFit="cover" />
                <div className="identity-card-overlay">
                  <div>
                    <h3>{id.name}</h3>
                    <p>{id.desc}</p>
                  </div>
                  <div className="identity-arrow">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find Your Fit */}
      <section className="find-fit-section container" style={{ paddingBottom: '16px' }}>
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem' }}>Find Your <span className="text-red">Fit</span></h2>
        </div>

        <div className="find-fit-card" style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px', borderRadius: '12px', backgroundColor: '#fff', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '20px', alignItems: 'end' }}>
            <div>
              <label className="field-label">Select Brand</label>
              <select className="input-field" value={selectedBrand} onChange={handleBrandChange}>
                <option value="">Choose Brand</option>
                {Object.keys(carBrands).map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Select Model</label>
              <select className="input-field" value={selectedModel} onChange={handleModelChange} disabled={!selectedBrand}>
                <option value="">Choose Model</option>
                {availableModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Select Year</label>
              <select className="input-field" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} disabled={!selectedModel}>
                <option value="">Choose Year</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Select Identity</label>
              <select className="input-field" value={selectedSeatIdentity} onChange={(e) => setSelectedSeatIdentity(e.target.value)}>
                <option value="">Choose Identity</option>
                {identities.map((id) => (
                  <option key={id.id} value={id.id}>{id.name}</option>
                ))}
              </select>
            </div>
            <button
              className={`btn ${canCheckout ? 'btn-primary' : 'btn-disabled'}`}
              style={{ padding: '14px 32px' }}
              onClick={handleCheckout}
              disabled={!canCheckout}
            >
              CONTINUE <span style={{ marginLeft: '6px' }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Rolling Marquee Trust Strip */}
      <section className="marquee-strip" style={{ margin: '40px 0' }}>
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-dot">●</span>
            </span>
          ))}
        </div>
      </section>

      {/* Better Interiors. Better Experience. */}
      <section className="better-section container" style={{ paddingBottom: '100px' }}>
        <div className="better-grid">
          <div className="better-img-col">
            <Image src="/Assets/sc1.png" alt="Better Interiors" width={600} height={400} style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }} />
          </div>
          <div className="better-text-col">
            <span className="eyebrow text-red">BUILT FOR BETTER DRIVING</span>
            <h2 style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '24px' }}>Better Interiors.<br/>Better Experience.</h2>
            <p className="text-secondary" style={{ maxWidth: '400px', marginBottom: '32px', lineHeight: 1.7, fontSize: '1.05rem' }}>
              Modern Cars seat covers are crafted to create cleaner, more desirable interiors through minimal design, better fitment and premium practicality.
            </p>

            <div className="better-stats">
              <div className="bs-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--accent-red)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <div><strong>30+</strong><span>Years Legacy</span></div>
              </div>
              <div className="bs-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--accent-red)" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div><strong>PAN India</strong><span>Delivery</span></div>
              </div>
              <div className="bs-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--accent-red)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <div><strong>1000+</strong><span>Installations</span></div>
              </div>
              <div className="bs-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--accent-red)" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <div><strong>Premium</strong><span>Fitment</span></div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                router.push('/installation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ marginTop: '32px' }}
            >
              DOORSTEP EXPERIENCE <span style={{ marginLeft: '6px' }}>→</span>
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .sc-hero { padding: 48px 0 40px; }
        .sc-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          align-items: center;
          gap: 40px;
        }
        .sc-features {
          display: flex;
          gap: 28px;
          margin-bottom: 32px;
        }
        .sc-feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .field-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: 0.03em;
        }

        .btn-disabled {
          padding: 14px 32px;
          background-color: #ccc;
          color: #888;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: not-allowed;
          letter-spacing: 0.05em;
        }

        .identity-heading {
          font-size: 2.4rem;
        }

        .identity-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .identity-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 3/4;
          transition: box-shadow 0.3s ease;
        }

        .identity-card:hover {
          box-shadow: 0px 0px 10px 5px rgba(255, 0, 0, 0.5);
        }

        .identity-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .identity-card:hover img {
          transform: scale(1.1) rotate(1deg);
        }

        .identity-card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 32px 24px;
          background: linear-gradient(transparent, rgba(0,0,0,0.85));
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .identity-card-overlay h3 {
          color: #fff;
          font-size: 1.4rem;
          margin-bottom: 4px;
        }

        .identity-card-overlay p {
          color: rgba(255,255,255,0.75);
          font-size: 0.8rem;
        }
        
        .identity-arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        
        .identity-card:hover .identity-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Marquee */
        .marquee-strip {
          background-color: #111;
          color: #fff;
          padding: 16px 0;
          overflow: hidden;
        }
        .marquee-track {
          display: flex;
          white-space: nowrap;
          align-items: center;
          animation: marquee-scroll 5s linear infinite;
        }
        .marquee-item {
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
        }
        .marquee-dot {
          color: var(--accent-red);
          margin: 0 40px; /* half of 80px gap */
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }@keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Better Section */
        .better-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .better-stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 16px;
        }

        .bs-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
        }

        .bs-item strong {
          display: block;
          font-size: 1rem;
        }

        .bs-item span {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .sc-hero-grid { grid-template-columns: 1fr; text-align: center; }
          .sc-features { justify-content: center; }
          .identity-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .identity-section { padding: 40px 0 !important; }
          .identity-heading { font-size: 1.7rem; }
          .find-fit-card > div { grid-template-columns: 1fr !important; }
          .better-grid { grid-template-columns: 1fr; gap: 32px; }
          .better-stats { grid-template-columns: 1fr 1fr; }
          .better-section { padding-bottom: 60px !important; }
          .identity-card-overlay h3 { font-size: 1.1rem; }
          .identity-card-overlay p { font-size: 0.72rem; }
          .identity-card-overlay { padding: 20px 14px; }
        }
        @media (max-width: 480px) {
          .identity-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .identity-card { aspect-ratio: 2/3; }
          .identity-heading { font-size: 1.4rem; }
          .find-fit-card { padding: 20px 16px !important; }
          .better-section > div { font-size: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}
