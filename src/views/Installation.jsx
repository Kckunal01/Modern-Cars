"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { getMinDate, carBrands } from '../data/carData';

export default function Installation({ incrementFormSubmissions }) {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', pincode: '', brand: '', model: '', year: '', area: '', date: '', time: '', message: '', whatsappContact: true,
    services: { seatCover: false, premiumMatting: false, steeringCover: false, ambientLight: false, specialMod: false }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const brands = Object.keys(carBrands);
  const models = formData.brand ? Object.keys(carBrands[formData.brand].models) : [];
  const years = (formData.brand && formData.model && carBrands[formData.brand].models[formData.model]) 
    ? carBrands[formData.brand].models[formData.model].years 
    : [];

  const getTomorrowDate = () => getMinDate(1);
  const fetchAvailableSlots = useCallback(async (selectedDate) => {
  if (!selectedDate) {
    setAvailableSlots([]);
    return;
  }

  try {
    setIsLoadingSlots(true);

    const res = await fetch(
      `/api/available-slots?date=${selectedDate}`
    );

    const data = await res.json();

    const slots = data.availableSlots || [];

    setAvailableSlots(slots);

    setFormData(prev => {
      if (prev.time && !slots.includes(prev.time)) {
        return {
          ...prev,
          time: ''
        };
      }

      return prev;
    });
  } catch (err) {
    console.error('Slot fetch failed:', err);
    setAvailableSlots([]);
  } finally {
    setIsLoadingSlots(false);
  }
}, []);

  const validateForm = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Required';
    if (!formData.phone.match(/^[0-9]{10}$/)) e.phone = 'Valid 10-digit number required';
    if (!formData.email.trim() || !formData.email.includes('@')) e.email = 'Valid email required';
    if (!formData.city.trim()) e.city = 'Required';
    if (!formData.brand) e.brand = 'Required';
    if (!formData.model) e.model = 'Required';
    if (!formData.year) e.year = 'Required';
    if (!formData.date) e.date = 'Required';
    if (!formData.time) e.time = 'Required';
    return e;
  };

  const isFormValid = Object.keys(validateForm()).length === 0;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'brand') {
  next.model = '';
  next.year = '';
}

if (name === 'model') {
  next.year = '';
}

// reset slot when date changes
if (name === 'date') {
  next.time = '';
}
      return next;
    });
    if (error) setError(null);
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleServiceChange = (service) => {
  setFormData(prev => ({
    ...prev,
    services: {
      ...prev.services,
      [service]: !prev.services[service]
    }
  }));
};

useEffect(() => {
  if (formData.date) {
    fetchAvailableSlots(formData.date);
  } else {
    setAvailableSlots([]);
  }
}, [formData.date, fetchAvailableSlots]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (incrementFormSubmissions) {
    const { allowed, secondsLeft } =
      incrementFormSubmissions();

    if (!allowed) {
      alert(
        `Too many requests. Wait ${secondsLeft}s.`
      );
      return;
    }
  }

  const errs = validateForm();

  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }

  setErrors({});
  setError(null);
  setIsSubmitting(true);

  try {
    const res = await fetch('/api/booking', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (res.ok && data.success) {
      // Refresh slot availability
      await fetchAvailableSlots(formData.date);

      // Clear selected slot
      setFormData(prev => ({
        ...prev,
        time: ''
      }));

      setIsSuccess(true);
    } else {
      console.error(
        'Supabase Booking Insert Failed:',
        data
      );

      setError(
        data.message ||
          'Failed to submit booking. Please try again.'
      );
    }
  } catch (err) {
    console.error(
      'Booking API error:',
      err
    );

    setError(
      'Network error. Please try again later.'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  if (isSuccess) {
    return (
      <div className="text-center" style={{ padding: '140px 20px', minHeight: '80vh', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '64px 40px', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px' }}>✓</div>
          <h1 style={{ marginBottom: '12px', fontSize: '2rem' }}>Booking Received</h1>
          <p style={{ color: '#777', marginBottom: '28px' }}>Our team will contact you shortly to confirm your appointment.</p>
          <button
  className="btn btn-primary"
  onClick={() => { window.location.href = '/'; }}
  style={{ marginBottom: '12px', width: '100%' }}
>
  BROWSE MORE
</button>
          <button
  className="btn"
  style={{ width: '100%', background: 'transparent', border: '1px solid #ddd', color: '#555', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}
  onClick={async () => {
    setIsSuccess(false);
    if (formData.date) await fetchAvailableSlots(formData.date);
  }}
>
  Book Another
</button>
        </div>
      </div>
    );
  }

  return (
    <div className="doorstep-page" style={{ paddingTop: '72px', backgroundColor: '#fafafa' }}>

      {/* Hero */}
      <section className="container" style={{ padding: '40px 0 48px' }}>
        <div className="ds-hero-grid">
          <div>
            <span className="eyebrow text-red">DOORSTEP EXPERIENCE</span>
            <h1 style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '20px' }}>Premium Comfort,<br/><span className="text-red">At Your Doorstep.</span></h1>
            <p style={{ color: '#777', fontSize: '1.05rem', maxWidth: '420px', marginBottom: '20px' }}>We bring premium interior upgrades directly to you — cleaner fitment, less hassle and a better driving experience.</p>
            <p style={{ color: 'var(--accent-red)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '32px' }}>Only available in Lucknow.</p>

            {/* Features - one row, small, red hollow icons */}
            <div className="ds-features-row">
              <div className="ds-feat">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent-red)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <div><strong>30+</strong><span>Years Experience</span></div>
              </div>
              <div className="ds-feat">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent-red)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <div><strong>Professional</strong><span>Installation</span></div>
              </div>
              <div className="ds-feat">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent-red)" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <div><strong>Premium</strong><span>Materials</span></div>
              </div>
              <div className="ds-feat">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent-red)" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
                <div><strong>Hassle</strong><span>Free</span></div>
              </div>
            </div>
          </div>
          <div className="ds-hero-img">
            <img src="/Assets/de1.png" alt="Doorstep Experience" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="container" style={{ paddingBottom: '100px' }}>
        <div className="form-wrapper">

          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="eyebrow text-red">BOOK YOUR EXPERIENCE</span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Upgrade Your Cabin Without Leaving Home.</h2>
            <p style={{ color: '#888' }}>Share your details and we'll handle the rest.</p>
          </div>

          <form onSubmit={handleSubmit}>

            {error && (
              <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontWeight: '600', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <div className="form-section">
              <label className="section-label">Personal Details</label>
              <div className="form-row-3">
                <div>
                  <input type="text" name="name" className={`input-field${errors.name ? ' error' : ''}`} placeholder="Full Name *" value={formData.name} required onChange={handleChange} />
                  {errors.name && <span style={{ color: 'var(--accent-red)', fontSize: '0.72rem', display: 'block', marginTop: '4px' }}>{errors.name}</span>}
                </div>
                <div>
                  <input type="tel" name="phone" className={`input-field${errors.phone ? ' error' : ''}`} placeholder="Phone Number *" value={formData.phone} required onChange={handleChange} />
                  {errors.phone && <span style={{ color: 'var(--accent-red)', fontSize: '0.72rem', display: 'block', marginTop: '4px' }}>{errors.phone}</span>}
                </div>
                <div>
                  <input type="email" name="email" className={`input-field${errors.email ? ' error' : ''}`} placeholder="Email Address *" value={formData.email} required onChange={handleChange} />
                  {errors.email && <span style={{ color: 'var(--accent-red)', fontSize: '0.72rem', display: 'block', marginTop: '4px' }}>{errors.email}</span>}
                </div>
              </div>
              <div className="form-row-3" style={{ marginTop: '16px' }}>
                <div>
                  <input type="text" name="city" className={`input-field${errors.city ? ' error' : ''}`} placeholder="City *" value={formData.city} required onChange={handleChange} />
                  {errors.city && <span style={{ color: 'var(--accent-red)', fontSize: '0.72rem', display: 'block', marginTop: '4px' }}>{errors.city}</span>}
                </div>
                <div>
                  <input type="text" name="pincode" className="input-field" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">Vehicle Details</label>
              <div className="form-row-3">
                <div>
                  <select name="brand" className={`input-field${errors.brand ? ' error' : ''}`} required value={formData.brand} onChange={handleChange}>
                    <option value="">Select Brand *</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {errors.brand && <span style={{ color: 'var(--accent-red)', fontSize: '0.72rem', display: 'block', marginTop: '4px' }}>{errors.brand}</span>}
                </div>
                <div>
                  <select name="model" className={`input-field${errors.model ? ' error' : ''}`} required value={formData.model} onChange={handleChange} disabled={!formData.brand}>
                    <option value="">Select Model *</option>
                    {models.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {errors.model && <span style={{ color: 'var(--accent-red)', fontSize: '0.72rem', display: 'block', marginTop: '4px' }}>{errors.model}</span>}
                </div>
                <div>
                  <select name="year" className={`input-field${errors.year ? ' error' : ''}`} required value={formData.year} onChange={handleChange} disabled={!formData.model}>
                    <option value="">Select Year *</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  {errors.year && <span style={{ color: 'var(--accent-red)', fontSize: '0.72rem', display: 'block', marginTop: '4px' }}>{errors.year}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">Appointment Details</label>
              <div className="form-row-3">
                <input type="text" name="area" className="input-field" placeholder="Area / Address" value={formData.area} onChange={handleChange} />
                <div>
                  <input type="date" name="date" className={`input-field${errors.date ? ' error' : ''}`} required min={getTomorrowDate()} value={formData.date} onChange={handleChange} />
                  {errors.date && <span style={{ color: 'var(--accent-red)', fontSize: '0.72rem', display: 'block', marginTop: '4px' }}>{errors.date}</span>}
                </div>
                <div>
                  <select
  name="time"
  className={`input-field${
    errors.time ? ' error' : ''
  }`}
  required
  onChange={handleChange}
  value={formData.time}
  disabled={
    isLoadingSlots ||
    !formData.date ||
    availableSlots.length === 0
  }
>
  <option value="">
    {isLoadingSlots
      ? 'Checking availability...'
      : availableSlots.length === 0
      ? 'No slots available'
      : 'Available Time *'}
  </option>

  {availableSlots.map((t) => (
    <option key={t} value={t}>
      {t}
    </option>
  ))}
</select>
                  {errors.time && <span style={{ color: 'var(--accent-red)', fontSize: '0.72rem', display: 'block', marginTop: '4px' }}>{errors.time}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">Services Wanted (Select any)</label>
              <div className="services-grid">
                {[
                  ['seatCover', 'Seat Cover'],
                  ['premiumMatting', 'Premium Matting'],
                  ['steeringCover', 'Steering Cover'],
                  ['ambientLight', 'Ambient Light'],
                  ['specialMod', 'Special Modification']
                ].map(([key, label]) => (
                  <label key={key} className={`service-chip${formData.services[key] ? ' active' : ''}`}>
                    <input type="checkbox" checked={formData.services[key]} onChange={() => handleServiceChange(key)} />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="info-banner">
              We will contact you shortly with the best options for your car.
            </div>

            <div className="form-section">
              <label className="section-label">Additional Message (Optional)</label>
              <textarea name="message" className="input-field" rows="3" placeholder="Tell us more about your requirement..." value={formData.message} onChange={handleChange} style={{ width: '100%', resize: 'vertical' }}></textarea>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
              <input type="checkbox" name="whatsappContact" checked={formData.whatsappContact} onChange={handleChange} style={{ accentColor: 'var(--accent-red)', width: '18px', height: '18px' }} />
              Contact me on WhatsApp
            </label>

            <div className="text-center" style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ padding: '16px 56px', fontSize: '1rem', opacity: isSubmitting ? 0.6 : 1 }}>
                {isSubmitting ? 'PROCESSING...' : 'Book My Experience'}
              </button>
            </div>

          </form>
        </div>
      </section>

      <style>{`
        .ds-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 48px;
          align-items: center;
        }
        .ds-hero-img { height: 380px; overflow: hidden; border-radius: 20px; }
        .ds-features-row {
          display: flex;
          gap: 24px;
        }
        .ds-feat {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ds-feat strong { display: block; font-size: 0.85rem; }
        .ds-feat span { display: block; font-size: 0.72rem; color: #888; }
        .eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; display: block; margin-bottom: 12px; }

        .form-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 16px;
          padding: 48px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        .form-section { margin-bottom: 24px; }
        .section-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        .form-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .services-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        .service-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #e0e0e0;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .service-chip:hover { border-color: #ccc; }
        .service-chip.active { border-color: var(--accent-red); background: rgba(198,40,40,0.03); }
        .service-chip input[type="checkbox"] { accent-color: var(--accent-red); width: 16px; height: 16px; }
        .info-banner {
          text-align: center;
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--accent-red);
          background: rgba(198,40,40,0.04);
          border: 1px solid rgba(198,40,40,0.1);
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
        }
        @media (max-width: 900px) {
          .ds-hero-grid { grid-template-columns: 1fr; }
          .ds-hero-img { height: 280px; }
          .ds-features-row { flex-wrap: wrap; }
          .form-row-3, .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
