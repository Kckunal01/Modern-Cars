"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const navigateTo = (page) => {
    router.push(`/${page === 'home' ? '' : page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const testimonials = [
    { stars: 5, quote: "The fit is absolutely perfect and the quality is top-notch. Feels like OEM.", name: "Amit Sharma", car: "Hyundai Creta 2024" },
    { stars: 5, quote: "Great material, neat stitching and installation was super smooth. Highly recommended!", name: "Rohit Verma", car: "Maruti Brezza 2023" },
    { stars: 5, quote: "Upgraded the entire look of my car interior. Worth every single penny!", name: "Neha Singh", car: "Kia Seltos 2024" },
    { stars: 5, quote: "Beautiful stealth covers with flawless red stitching. Premium quality all around.", name: "Vikram Reddy", car: "Mahindra Thar 2023" },
    { stars: 5, quote: "Doorstep installation was seamless. The team was professional and the result is stunning.", name: "Priya Kapoor", car: "Tata Nexon 2024" },
    { stars: 5, quote: "Completely transformed the vibe of my driving experience. The vintage look is phenomenal.", name: "Kunal Gupta", car: "Honda City 2022" },
    { stars: 5, quote: "Very impressed with the hassle-free doorstep service and the final look. Fantastic job!", name: "Ananya Desai", car: "MG Hector 2023" }
  ];

  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!trackRef.current || isDragging) return;
      const track = trackRef.current;
      const slideWidth = track.clientWidth / 3;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: slideWidth, behavior: 'smooth' });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handlePrev = () => {
    if (trackRef.current) trackRef.current.scrollBy({ left: -(trackRef.current.clientWidth / 3), behavior: 'smooth' });
  };
  
  const handleNext = () => {
    if (trackRef.current) trackRef.current.scrollBy({ left: (trackRef.current.clientWidth / 3), behavior: 'smooth' });
  };

  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const stopDrag = () => setIsDragging(false);

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  // Marquee items
  const marqueeItems = ['7 DAY RETURN', 'PAN INDIA DELIVERY', 'ASSURED GUARANTEE', '7 DAY RETURN', 'PAN INDIA DELIVERY', 'ASSURED GUARANTEE', '7 DAY RETURN', 'PAN INDIA DELIVERY', 'ASSURED GUARANTEE', '7 DAY RETURN', 'PAN INDIA DELIVERY', 'ASSURED GUARANTEE'];

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-text-block">
            <h2 className="hero-brand">
              <span className="text-red">MODERN </span>CARS
            </h2>
            <span className="hero-tagline">DRIVE BETTER INDIA</span>
            <div className="title-line" style={{ width: '40px', margin: '16px 0' }}></div>

            <h1 className="hero-main-title">
              Because every journey<br/>deserves <span className="text-red">better interiors.</span>
            </h1>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-num text-red">30+</span>
                <span className="stat-label">Years of<br/>Experience</span>
              </div>
              <div className="stat">
                <span className="stat-num text-red">100K+</span>
                <span className="stat-label">Happy<br/>Customers</span>
              </div>
              <div className="stat">
                <span className="stat-num text-red">4.9★</span>
                <span className="stat-label">Average<br/>Rating</span>
              </div>
            </div>

            <button className="btn btn-primary hero-btn" onClick={() => navigateTo('about')}>
              ABOUT US <span style={{ marginLeft: '6px' }}>→</span>
            </button>
          </div>

          <div className="hero-image-col">
            <Image src="/Assets/h1.png" alt="Modern Cars Hero" className="hero-img" width={800} height={600} priority />
          </div>
        </div>
      </section>

      {/* Rolling Marquee Trust Strip */}
      <section className="marquee-strip">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-dot">●</span>
            </span>
          ))}
        </div>
      </section>

      {/* Upgrade Identity */}
      <section className="upgrade-section container">
        <div className="upgrade-grid shadow-box">
          <div className="upgrade-image-box">
            <img src="/Assets/Si4.png" alt="Seat Cover Identity" />
          </div>
          <div className="upgrade-text-box">
            <span className="eyebrow text-red">SEAT COVERS</span>
            <h2 className="upgrade-title">Upgrade Your<br/>Identity.</h2>
            <p className="upgrade-desc">Our seat covers blend style, comfort and durability to give your car the interior it deserves. Find the identity that matches your personality.</p>
            <div style={{ marginTop: '48px' }}>
              <button className="btn btn-primary" onClick={() => navigateTo('seat-covers')}>
                CHOOSE YOUR IDENTITY <span style={{ marginLeft: '6px' }}>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="testimonials-heading">LOVED BY DRIVERS</h2>
          <div className="title-line" style={{ width: '40px', margin: '12px auto 48px' }}></div>

          <div className="testimonials-carousel">
            <button className="nav-btn prev" onClick={handlePrev} aria-label="Previous">‹</button>
            <div 
              className="testimonials-window" 
              ref={trackRef}
              onMouseDown={startDrag}
              onMouseLeave={stopDrag}
              onMouseUp={stopDrag}
              onMouseMove={onDrag}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div className="testimonials-track">
                {testimonials.map((t, i) => (
                  <div key={i} className="testimonial-slide">
                    <div className="testimonial-card">
                      <div className="stars">{'★'.repeat(t.stars)}</div>
                      <p className="quote">"{t.quote}"</p>
                      <strong className="author-name">{t.name}</strong>
                      <span className="author-car">{t.car}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="nav-btn next" onClick={handleNext} aria-label="Next">›</button>
          </div>
        </div>
      </section>

      {/* Doorstep CTA */}
      <section className="doorstep-section container">
        <div className="doorstep-grid">
          <div className="doorstep-text-box">
            <span className="eyebrow text-red">DOORSTEP EXPERIENCE</span>
            <h2>We come to you.<br/><span className="text-red">You relax.</span></h2>
            <ul className="checklist">
              <li><svg viewBox="0 0 24 24" className="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>Professional installation at your location</li>
              <li><svg viewBox="0 0 24 24" className="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>Trained experts & quality check</li>
              <li><svg viewBox="0 0 24 24" className="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>Hassle-free experience</li>
              <li><svg viewBox="0 0 24 24" className="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>Save time, enjoy comfort</li>
            </ul>
            <button className="btn btn-primary" onClick={() => navigateTo('installation')}>
              BOOK NOW <span style={{ marginLeft: '6px' }}>→</span>
            </button>
          </div>
          <div className="doorstep-img-box" style={{ width: '100%', maxWidth: '520px', marginRight: 'auto', marginLeft: '0' }}>
            <Image src="/Assets/h3.png" alt="Doorstep Upgrade" width={800} height={600} priority style={{ width: '100%', height: 'auto', borderRadius: '16px' }} />
          </div>
        </div>
      </section>

      <style>{`
        h3 { font-size: 1.5rem; }
        /* Hero */
        .hero-section {
          padding: 90px 0 40px;
          background-color: #FDFDFD;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          align-items: center;
          gap: 40px;
        }

        .hero-text-block {
          max-width: 500px;
        }

        .hero-brand {
          font-family: var(--font-heading);
          font-size: 3.4rem;
          letter-spacing: -0.04em;
          margin-bottom: 4px;
        }

        .hero-tagline {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 8px;
        }

        .hero-main-title {
          font-size: 2.8rem;
          line-height: 1.15;
          margin-bottom: 32px;
        }

        .hero-stats {
          display: flex;
          gap: 48px;
          margin-bottom: 40px;
          border-left: 3px solid var(--accent-red);
          padding-left: 24px;
        }

        .stat-num {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 700;
          display: block;
        }

        .stat-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.3;
          display: block;
          font-weight: 500;
        }

        .hero-btn {
          font-size: 0.95rem;
          padding: 16px 36px;
        }

        .hero-image-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-img {
          width: 100%;
          max-height: 560px;
          object-fit: contain;
          border-radius: 16px;
        }

        /* Marquee */
        .marquee-strip {
          background-color: #111;
          color: #fff;
          padding: 16px 0;
          overflow: hidden;
          position: relative;
        }

        .marquee-track {
          display: flex;
          white-space: nowrap;
          align-items: center;
          animation: marquee-scroll 20s linear infinite;
        }

        .marquee-item {
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .marquee-dot {
          color: var(--accent-red);
          margin: 0 40px;
          font-size: 0.6em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Upgrade */
        .upgrade-section {
          padding: 50px 24px;
        }

        .shadow-box {
          background-color: var(--white);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.04);
          overflow: hidden;
        }

        .upgrade-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
        }

        .upgrade-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .upgrade-text-box {
          padding: 64px 72px;
        }

        .upgrade-title {
          font-size: 2.8rem;
          margin-bottom: 20px;
          line-height: 1.1;
        }

        .upgrade-desc {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .testimonials-section {
          padding: 60px 24px 20px;
          overflow: hidden;
          max-width: 1600px;
          margin: 0 auto;
        }

        .testimonials-heading {
          text-align: center;
          font-size: 2.4rem;
          letter-spacing: 0.08em;
          font-weight: 800;
        }

        .testimonials-carousel {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .testimonials-window {
          flex-grow: 1;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        
        .testimonials-window::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }

        .testimonials-track {
          display: flex;
          width: max-content;
        }

        .testimonial-slide {
          width: calc((100% - 32px) / 3);
          max-width: 380px;
          min-width: 300px;
          scroll-snap-align: start;
          box-sizing: border-box;
          padding: 10px;
          flex-shrink: 0;
        }

        .testimonial-card {
          background-color: var(--white);
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.04);
          text-align: center;
          height: 100%;
        }

        .stars {
          color: var(--accent-red);
          margin-bottom: 16px;
          font-size: 18px;
          letter-spacing: 2px;
        }

        .quote {
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .author-name {
          display: block;
          font-weight: 800;
          font-size: 1.05rem;
          margin-bottom: 4px;
        }

        .author-car {
          display: block;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .nav-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          font-size: 1.6rem;
          cursor: pointer;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .nav-btn:hover {
          background-color: var(--bg-secondary);
          transform: scale(1.05);
        }

        .doorstep-section {
          padding: 10px 24px 80px;
          max-width: 1300px;
          margin: 0 auto;
        }

        .doorstep-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: center;
          background-color: var(--bg-secondary);
          padding: 48px 36px;
          border-radius: 24px;
          justify-items: start;
        }

        .doorstep-text-box h2 {
          font-size: 3rem;
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .checklist { margin-bottom: 32px; list-style: none; padding: 0; }

        .checklist li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.05rem;
          margin-bottom: 14px;
          font-weight: 500;
        }

        .check-icon {
          width: 18px;
          height: 18px;
          stroke: var(--accent-red);
          stroke-width: 3;
          fill: none;
          flex-shrink: 0;
        }

        .doorstep-image-box img {
          width: 100%;
          border-radius: 16px;
        }

        .eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 12px;
        }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; }
          .hero-text-block { max-width: 100%; margin: 0 auto; }
          .hero-stats { justify-content: center; }
          .upgrade-grid, .doorstep-grid { grid-template-columns: 1fr; gap: 32px; }
          .upgrade-text-box { padding: 40px 24px; }
          .testimonial-slide { min-width: 100%; }
          .nav-btn { display: none; }
          .doorstep-grid { padding: 32px 20px; }
        }
      `}</style>
    </div>
  );
}
