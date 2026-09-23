import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ContactConciergePage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Tourbillon Bespoke Commission',
    location: 'Geneva Salon (Rue du Rhône)',
    preferredDate: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const salons = [
    {
      city: 'Genève (Maison Mère)',
      country: 'Shveytsariya',
      flag: '🇨🇭',
      badge: 'Bosh Manifaktura',
      address: 'Rue du Rhône 42, 1204 Genève, Switzerland',
      phone: '+41 22 819 9000',
      hours: 'Dush – Shanba: 10:00 – 19:00 (Faqat oldindan yozilish orqali)',
    },
    {
      city: 'London (New Bond Street)',
      country: 'Buyuk Britaniya',
      flag: '🇬🇧',
      badge: 'Mayfair Flagship',
      address: '144 New Bond St, Mayfair, London W1S 2PF, UK',
      phone: '+44 20 7493 8800',
      hours: 'Dush – Shanba: 10:00 – 18:00',
    },
    {
      city: 'Dubai (DIFC Gate)',
      country: 'BAA',
      flag: '🇦🇪',
      badge: 'DIFC VIP Lounge',
      address: 'Gate Village Building 3, DIFC, Dubai, UAE',
      phone: '+971 4 362 7000',
      hours: 'Har kuni: 11:00 – 21:00',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-obsidian-950)', padding: '3rem 0 5rem' }}>
      {/* Header */}
      <div className="site-container" style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-pill"
          style={{ padding: '0.4rem 0.85rem', color: 'var(--color-gold-300)', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--border-gold-subtle)' }}
        >
          <Sparkles size={14} style={{ color: 'var(--color-gold-400)' }} />
          <span>VIP CONCIERGE & SALON DESK</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}
        >
          Private Horological Inquiries
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted"
          style={{ fontSize: '1rem', maxWidth: '36rem', margin: 0, lineHeight: 1.6 }}
        >
          Schedule a private champagne consultation at one of our global salons or initiate a bespoke complication commission with our master watchmakers.
        </motion.p>
      </div>

      {/* Main Reservation Form Section */}
      <div className="site-container" style={{ maxWidth: '52rem', marginBottom: '5rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-3xl)', border: '1px solid var(--border-gold-subtle)', backgroundColor: 'rgba(10, 11, 14, 0.9)' }}>
          {submitted ? (
            <div style={{ padding: '4rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: 'var(--color-emerald-400)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>
                Concierge Dossier Dispatched
              </h3>
              <p className="text-muted" style={{ fontSize: '0.85rem', maxWidth: '24rem', margin: 0, lineHeight: 1.5 }}>
                A Senior Horological Director will review your inquiry and contact you via secure VIP channel within 2 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-glass"
                style={{ padding: '0.65rem 1.5rem', fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--color-gold-300)' }}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0 }}>
                  Reserve Salon Appointment or Commission
                </h3>
                <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.25rem', margin: 0 }}>
                  Confidential & Priority Concierge Routing
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ismingizni kiriting"
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Private Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alexander@domain.com"
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>VIP Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+41 22 819 9000"
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Preferred Salon Location</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    <option value="Geneva Salon">Geneva Salon (Rue du Rhône)</option>
                    <option value="Zurich Salon">Zurich (Bahnhofstrasse)</option>
                    <option value="London Salon">London (New Bond Street)</option>
                    <option value="Dubai Salon">Dubai (DIFC Gate)</option>
                    <option value="Tokyo Salon">Tokyo (Ginza Six)</option>
                    <option value="New York Salon">New York (Madison Avenue)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Inquiry Nature</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    <option value="Tourbillon Bespoke Commission">Tourbillon Bespoke Commission</option>
                    <option value="Private Salon Viewing">Private Salon Viewing & Tasting</option>
                    <option value="Meteorite Dial Allocation">Meteorite Dial Allocation</option>
                    <option value="Vintage Calibre Restoration">Vintage Calibre Restoration</option>
                    <option value="Corporate / Royal Fleet Commission">Corporate / Royal Fleet Commission</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Preferred Viewing Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Specific Calibre Requirements</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please note any specific alloy, gemstone setting, or custom engraving requests..."
                  className="luxury-input"
                  style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ paddingTop: '0.5rem' }}>
                <button
                  type="submit"
                  className="btn-gold"
                  style={{ width: '100%', padding: '0.9rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Send size={15} />
                  <span>Transmit VIP Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* International Private Salons Full-Width Grid Section */}
      {/* International Private Salons (Top 3 Flagships) */}
      <div className="site-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ borderBottom: '1px solid var(--border-gold-subtle)', paddingBottom: '1rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.6rem', color: 'var(--color-platinum-100)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MapPin size={22} style={{ color: 'var(--color-gold-400)' }} />
              <span>Xalqaro Flagment Salonlar</span>
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-platinum-400)', margin: '0.25rem 0 0' }}>
              Shaxsiy qabul va eksklyuziv soat namunalarini ko‘rish uchun xususiy atelyelarimiz
            </p>
          </div>
          <span className="glass-pill" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--color-gold-300)', padding: '0.35rem 0.85rem' }}>
            🇨🇭 Genève • 🇬🇧 London • 🇦🇪 Dubai
          </span>
        </div>

        {/* 3 Luxury Flagship Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {salons.map((salon) => (
            <div
              key={salon.city}
              className="glass-panel"
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border-platinum-subtle)',
                backgroundColor: 'rgba(14, 16, 23, 0.95)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.5rem',
                transition: 'all var(--transition-normal)',
                boxShadow: 'var(--shadow-card)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-gold-medium)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-gold-subtle)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-platinum-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span className="badge-gold" style={{ fontSize: '0.6875rem' }}>{salon.badge}</span>
                  <span style={{ fontSize: '1.25rem' }}>{salon.flag}</span>
                </div>

                <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--color-platinum-100)', margin: '0 0 1rem 0' }}>
                  {salon.city}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--color-platinum-200)', margin: 0, lineHeight: 1.5 }}>
                    <MapPin size={16} style={{ color: 'var(--color-gold-400)', flexShrink: 0, marginTop: '3px' }} />
                    <span>{salon.address}</span>
                  </p>
                  
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-gold-300)', fontWeight: 600, margin: 0 }}>
                    <Phone size={15} style={{ color: 'var(--color-gold-400)', flexShrink: 0 }} />
                    <a href={`tel:${salon.phone.replace(/\s+/g, '')}`} style={{ color: 'inherit' }}>{salon.phone}</a>
                  </p>

                  <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.78125rem', color: 'var(--color-platinum-400)', margin: 0, lineHeight: 1.4 }}>
                    <Clock size={15} style={{ color: 'var(--color-gold-400)', flexShrink: 0, marginTop: '2px' }} />
                    <span>{salon.hours}</span>
                  </p>
                </div>
              </div>

              <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-platinum-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.725rem', color: 'var(--color-platinum-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  VIP Rezervatsiya
                </span>
                
                <a
                  href={`tel:${salon.phone.replace(/\s+/g, '')}`}
                  className="btn-outline-gold"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.75rem' }}
                >
                  <span>Qabulga Yozilish</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactConciergePage;

