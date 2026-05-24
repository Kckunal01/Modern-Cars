"use client";
import React, { useState, useEffect } from 'react';
import { getPrice, timeSlots, getMinDate } from '../data/carData';
import { useAppContext } from '../context/AppContext';


export default function Checkout({ setCurrentPage, selectedIdentity: identityProp, incrementFormSubmissions }) {
  const ctx = useAppContext();
  // Prefer prop (SPA mode) → context → localStorage (Next.js navigation mode)
  const [identity, setIdentityState] = useState(() => {
    if (identityProp) return identityProp;
    if (ctx?.selectedIdentity) return ctx.selectedIdentity;
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('mc_identity');
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return { id: 'stealth', name: 'Stealth Identity', img: '/Assets/Stealth.png', brand: 'Hyundai', model: 'Creta', year: '' };
  });

  // Re-sync if context updates (SPA mode)
  useEffect(() => {
    if (ctx?.selectedIdentity) setIdentityState(ctx.selectedIdentity);
  }, [ctx?.selectedIdentity]);

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', pincode: '', city: '', state: ''
  });
  const [addDoorstep, setAddDoorstep] = useState(false);
  const [doorstepDate, setDoorstepDate] = useState('');
  const [doorstepTime, setDoorstepTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedTrackingId, setCompletedTrackingId] = useState(null);

  const isLucknow = formData.city.toLowerCase().trim() === 'lucknow';

  const validateForm = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Required';
    if (!formData.phone.match(/^[0-9]{10}$/)) e.phone = 'Valid 10-digit number required';
    if (!formData.email.trim() || !formData.email.includes('@')) e.email = 'Valid email required';
    if (!formData.address.trim()) e.address = 'Required';
    if (!formData.pincode.match(/^[0-9]{6}$/)) e.pincode = 'Valid 6-digit pincode required';
    if (!formData.city.trim()) e.city = 'Required';
    if (!formData.state.trim()) e.state = 'Required';
    if (addDoorstep) {
      if (!doorstepDate) e.doorstepDate = 'Required';
      if (!doorstepTime) e.doorstepTime = 'Required';
    }
    return e;
  };

  const isFormValid = Object.keys(validateForm()).length === 0;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (incrementFormSubmissions) {
      const { allowed, secondsLeft } = incrementFormSubmissions();
      if (!allowed) { alert(`Too many requests. Wait ${secondsLeft}s.`); return; }
    }
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsSubmitting(true);
    
    const orderPayload = { 
      ...formData, 
      addDoorstep, 
      doorstepDate, 
      doorstepTime, 
      identity: identity.name,
      brand: identity.brand,
      model: identity.model,
      year: identity.year,
      baseFare,
      discount,
      total,
      paymentMethod
    };

    // Backend API (Vercel Serverless Function)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify(orderPayload),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setIsSubmitting(false);
        setCompletedTrackingId(data.trackingId);
      } else {
        setIsSubmitting(false);
        console.error("Supabase Order Insert Failed:", data);
        setErrors({ submit: data.message || 'Failed to place order. Please try again.' });
      }
    } catch (err) {
      console.error("Order API error:", err);
      setIsSubmitting(false);
      setErrors({ submit: 'Network error. Please try again later.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    if (name === 'city' && value.toLowerCase().trim() !== 'lucknow') setAddDoorstep(false);
  };


  const baseFare = getPrice(identity.id, identity.brand, identity.model);
  const doorstepCost = addDoorstep ? 1500 : 0;
  const discount = Math.round(baseFare * 0.05); // 5% discount
  const codFee = paymentMethod === 'cod' ? 500 : 0;
  const taxes = Math.round((baseFare - discount + doorstepCost) * 0.18);
  const shipping = 0;
  const total = baseFare - discount + taxes + doorstepCost + shipping + codFee;

  if (completedTrackingId) {
    return (
      <div className="checkout-page text-center" style={{ padding: '140px 20px', minHeight: '80vh', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '64px 40px', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px' }}>✓</div>
          <h1 style={{ marginBottom: '12px', fontSize: '2rem' }}>Order Confirmed</h1>
          <p style={{ color: '#777', marginBottom: '8px' }}>Tracking ID: <strong style={{ color: 'var(--accent-red)', fontSize: '1.1rem' }}>{completedTrackingId}</strong></p>
          <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '28px' }}>Save this ID to track your order.</p>
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }} onClick={() => { window.location.href = '/'; }}>BROWSE MORE</button>
          <button className="btn" style={{ width: '100%', background: 'transparent', border: '1px solid #ddd', color: '#555', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }} onClick={() => { window.location.href = '/track-order'; }}>Track Your Order</button>
        </div>
      </div>
    );
  }



  return (
    <div className="checkout-page" style={{ padding: '100px 0 120px', backgroundColor: '#fafafa' }}>
      <div className="container">

        <div className="text-center" style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '2.4rem' }}>Complete <span className="text-red">Your Order</span></h1>
          <p style={{ color: '#888', marginTop: '8px' }}>Provide your details below to finalize your cabin upgrade.</p>
        </div>

        <div className="checkout-grid">

          {/* Form */}
          <div>
            <form onSubmit={handlePlaceOrder}>

              {errors.submit && (
                <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600', fontSize: '0.9rem' }}>
                  {errors.submit}
                </div>
              )}
              {/* Contact Info */}
              <div className="form-card">
                <h3 className="form-card-title">Contact Information</h3>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="field-label">Full Name <span className="text-red">*</span></label>
                    <input type="text" name="name" className={`input-field${errors.name ? ' error' : ''}`} placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label className="field-label">Phone Number <span className="text-red">*</span></label>
                    <input type="tel" name="phone" className={`input-field${errors.phone ? ' error' : ''}`} placeholder="10-digit mobile number" maxLength="10" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="field-label">Email Address <span className="text-red">*</span></label>
                  <input type="email" name="email" className={`input-field${errors.email ? ' error' : ''}`} placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <p style={{ fontSize: '0.72rem', color: '#999', marginTop: '4px' }}>Order updates will be sent via WhatsApp and Email.</p>
              </div>

              {/* Delivery Address */}
              <div className="form-card">
                <h3 className="form-card-title">Delivery Address</h3>
                <div className="form-group">
                  <label className="field-label">Address <span className="text-red">*</span></label>
                  <input type="text" name="address" className={`input-field${errors.address ? ' error' : ''}`} placeholder="House No, Building, Street" value={formData.address} onChange={handleChange} />
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>
                <div className="form-group">
                  <label className="field-label">Pincode <span className="text-red">*</span></label>
                  <input type="text" name="pincode" className={`input-field${errors.pincode ? ' error' : ''}`} placeholder="6-digit pincode" maxLength="6" value={formData.pincode} onChange={handleChange} />
                  {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="field-label">City <span className="text-red">*</span></label>
                    <input type="text" name="city" className={`input-field${errors.city ? ' error' : ''}`} placeholder="City" value={formData.city} onChange={handleChange} />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label className="field-label">State <span className="text-red">*</span></label>
                    <input type="text" name="state" className={`input-field${errors.state ? ' error' : ''}`} placeholder="State" value={formData.state} onChange={handleChange} />
                    {errors.state && <span className="error-text">{errors.state}</span>}
                  </div>
                </div>
              </div>

              {/* Doorstep Upsell */}
              <div className="form-card" style={{ borderColor: isLucknow && addDoorstep ? 'var(--accent-red)' : undefined }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 className="form-card-title" style={{ margin: 0 }}>Doorstep Experience</h3>
                  <span style={{ fontWeight: 700, color: 'var(--accent-red)', fontSize: '1rem' }}>+ ₹1,500</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '16px' }}>Professional installation at your location. <strong style={{ color: 'var(--accent-red)' }}>Only available in Lucknow.</strong></p>

                {isLucknow ? (
                  <>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', marginBottom: '16px' }}>
                      <input type="checkbox" checked={addDoorstep} onChange={(e) => setAddDoorstep(e.target.checked)} style={{ accentColor: 'var(--accent-red)', width: '18px', height: '18px' }} />
                      Add Doorstep Installation
                    </label>
                    {addDoorstep && (
                      <div className="form-row-2">
                        <div className="form-group">
                          <label className="field-label">Preferred Date <span className="text-red">*</span></label>
                          <input type="date" className={`input-field${errors.doorstepDate ? ' error' : ''}`} min={getMinDate(4)} value={doorstepDate} onChange={(e) => setDoorstepDate(e.target.value)} />
                          {errors.doorstepDate && <span className="error-text">{errors.doorstepDate}</span>}
                        </div>
                        <div className="form-group">
                          <label className="field-label">Available Time (11am - 7pm) <span className="text-red">*</span></label>
                          <select className={`input-field${errors.doorstepTime ? ' error' : ''}`} value={doorstepTime} onChange={(e) => setDoorstepTime(e.target.value)}>
                            <option value="">Select Time</option>
                            {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          {errors.doorstepTime && <span className="error-text">{errors.doorstepTime}</span>}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '0.85rem' }}>Enter "Lucknow" as your city to unlock this option.</div>
                )}
              </div>

              {/* Payment Method */}
              <div className="form-card" style={{ marginTop: '24px' }}>
                <h3 className="form-card-title">Payment Method</h3>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '12px', cursor: 'pointer', backgroundColor: paymentMethod === 'online' ? '#fafafa' : '#fff' }}>
                  <input type="radio" name="paymentMethod" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} style={{ accentColor: 'var(--accent-red)' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Razorpay</div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Cards, UPI, NetBanking, Wallets</div>
                  </div>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid #eee', borderRadius: '8px', cursor: 'pointer', backgroundColor: paymentMethod === 'cod' ? '#fafafa' : '#fff' }}>
                  <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} style={{ accentColor: 'var(--accent-red)' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Cash on Delivery (+ ₹500 Token)</div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>A token payment of ₹500 will be collected now to confirm your order.</div>
                  </div>
                </label>
              </div>

            </form>
          </div>

          {/* Order Summary */}
          <div style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
            <div className="form-card">
              <h3 className="form-card-title">Order Summary</h3>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #eee' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5', flexShrink: 0 }}>
                  <img src={identity.img || '/Assets/Stealth.png'} alt={identity.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>{identity.name || 'Stealth Identity'}</h4>
                  <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>{identity.brand} {identity.model} ({identity.year})</p>
                </div>
              </div>

              <div className="summary-row">
                <span>Base Fare</span>
                <strong style={{ textDecoration: 'line-through', color: '#999', marginRight: '8px' }}>₹ {baseFare.toLocaleString()}</strong>
                <strong>₹ {(baseFare - discount).toLocaleString()}</strong>
              </div>
              <div className="summary-row" style={{ color: 'green' }}>
                <span>Online Discount (5%)</span>
                <strong>– ₹ {discount.toLocaleString()}</strong>
              </div>
              <div className="summary-row"><span>Taxes (18%)</span><strong>₹ {taxes.toLocaleString()}</strong></div>
              {addDoorstep && <div className="summary-row"><span>Doorstep Experience</span><strong>₹ {doorstepCost.toLocaleString()}</strong></div>}
              {paymentMethod === 'cod' && <div className="summary-row text-red"><span>COD Token Fee</span><strong>₹ 500</strong></div>}
              <div className="summary-row"><span>Shipping</span><strong className="text-red">Free</strong></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '16px', marginTop: '16px' }}>
                <strong style={{ fontSize: '1.15rem' }}>{paymentMethod === 'cod' ? 'To Pay Now' : 'Total'}</strong>
                <strong style={{ fontSize: '1.15rem' }}>₹ {paymentMethod === 'cod' ? '500' : total.toLocaleString()}</strong>
              </div>

              <button className="btn" style={{ width: '100%', padding: '16px', marginTop: '24px', backgroundColor: paymentMethod === 'online' ? '#3395FF' : '#FFC439', color: paymentMethod === 'online' ? '#fff' : '#003087', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: (!isFormValid || isSubmitting) ? 0.6 : 1 }} onClick={handlePlaceOrder} disabled={isSubmitting || !isFormValid}>
                {isSubmitting ? 'PROCESSING...' : (paymentMethod === 'online' ? 'Pay with Razorpay' : 'Confirm Order (COD)')}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#999', marginTop: '12px' }}>🔒 Secure 256-bit SSL encryption</p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .checkout-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .form-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 32px;
          margin-bottom: 24px;
          transition: border-color 0.3s ease;
        }
        .form-card-title {
          font-size: 1.1rem;
          font-family: var(--font-heading);
          margin-bottom: 20px;
        }
        .form-group { margin-bottom: 16px; }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field-label { display: block; font-size: 0.75rem; font-weight: 600; margin-bottom: 6px; }
        .input-field.error { border-color: var(--accent-red); background-color: rgba(198,40,40,0.02); }
        .error-text { color: var(--accent-red); font-size: 0.72rem; margin-top: 4px; display: block; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.9rem; }
        .summary-row span { color: #888; }
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
