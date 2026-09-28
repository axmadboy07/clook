import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { contactApi } from '../api';

export const ContactConciergePage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Turbiyon Individual Buyurtmasi (Bespoke)',
    location: 'Geneva Salon (Rue du Rhône)',
    preferredDate: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactApi.sendInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        interest: formData.interest,
        location: formData.location,
        preferred_date: formData.preferredDate,
        message: formData.message.trim() || 'VIP Konsyerj va Shaxsiy Qabul Murojaati',
      });
    } catch (error) {
      console.warn('Contact Inquiry API warning (offline or demo mode):', error.message);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
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
          <span>VIP KONSYERJ VA SHAXSIY QABUL XIZMATI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}
        >
          Maxsus Soatsozlik Murojaatlari
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted"
          style={{ fontSize: '1rem', maxWidth: '38rem', margin: 0, lineHeight: 1.6 }}
        >
          Dunyo bo‘ylab flagman salonlarimizda shaxsiy konsultatsiya belgilang yoki bosh soatsozlarimiz bilan individual mexanizm va buyurtma loyihasini boshlang.
        </motion.p>
      </div>

      {/* Main Reservation Form Section */}
      <div className="site-container" style={{ maxWidth: '52rem', marginBottom: '5rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-3xl)', border: '1px solid var(--border-gold-subtle)', backgroundColor: 'var(--card-bg)' }}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ padding: '2rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
            >
              {/* Glowing Luxury Badge */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    width: '5.5rem',
                    height: '5.5rem',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212,164,76,0.35) 0%, rgba(52,211,153,0.1) 70%, transparent 100%)',
                    filter: 'blur(10px)',
                  }}
                />
                <div
                  style={{
                    width: '4.5rem',
                    height: '4.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 24, 20, 0.9)',
                    border: '1.5px solid var(--color-gold-400)',
                    color: 'var(--color-emerald-400)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 25px rgba(212,164,76,0.25), inset 0 0 15px rgba(52,211,153,0.15)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <CheckCircle2 size={36} style={{ color: 'var(--color-gold-400)' }} />
                </div>
              </div>

              {/* Title & Status */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span className="badge-gold" style={{ alignSelf: 'center', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                  DOSSYE #{Math.floor(100000 + Math.random() * 900000)} • QABUL QILINDI
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: 'var(--color-platinum-100)',
                    margin: 0,
                    background: 'linear-gradient(135deg, #FFF 30%, var(--color-gold-300) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  VIP Konsyerj Dossyesi Yuborildi
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    maxWidth: '32rem',
                    margin: '0 auto',
                    lineHeight: 1.6,
                    color: 'var(--color-platinum-300)',
                  }}
                >
                  Bosh soatsozlik direktori (Senior Horological Director) sizning shaxsiy talablaringizni ko‘rib chiqadi va <strong>2 soat ichida</strong> maxsus VIP kanal orqali siz bilan bog‘lanadi.
                </p>
              </div>

              {/* Inquiry Summary Ticket */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '34rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-gold-subtle)',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.825rem',
                  marginTop: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-platinum-subtle)', paddingBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--color-gold-300)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={14} /> Shaxsiy Murojaat Xulosasi
                  </span>
                  <span style={{ fontSize: '0.725rem', color: 'var(--color-emerald-400)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    ● Maxfiy ishlovda
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-platinum-500)', textTransform: 'uppercase' }}>Mijoz</span>
                    <span style={{ color: 'var(--color-platinum-100)', fontWeight: 600 }}>{formData.name || 'Hurmatli Mehmon'}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-platinum-500)', textTransform: 'uppercase' }}>Aloqa Raqami</span>
                    <span style={{ color: 'var(--color-platinum-100)' }}>{formData.phone || 'Keltirilmagan'}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-platinum-500)', textTransform: 'uppercase' }}>Yo‘nalish</span>
                    <span style={{ color: 'var(--color-gold-300)' }}>{formData.interest}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-platinum-500)', textTransform: 'uppercase' }}>Tanlangan Salon</span>
                    <span style={{ color: 'var(--color-platinum-100)' }}>{formData.location}</span>
                  </div>
                </div>

                {formData.preferredDate && (
                  <div style={{ paddingTop: '0.4rem', borderTop: '1px dashed var(--border-platinum-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem' }}>
                    <span style={{ color: 'var(--color-platinum-400)' }}>Rejalashtirilgan tashrif sanasi:</span>
                    <span style={{ color: 'var(--color-gold-300)', fontWeight: 600 }}>{formData.preferredDate}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      interest: 'Tourbillon Bespoke Commission',
                      location: 'Geneva Salon (Rue du Rhône)',
                      preferredDate: '',
                      message: '',
                    });
                  }}
                  className="btn-gold"
                  style={{ padding: '0.75rem 1.75rem', fontSize: '0.825rem' }}
                >
                  Yana Bir So‘rov Yuborish
                </button>

                <Link
                  to="/"
                  className="btn-outline-gold"
                  style={{ padding: '0.75rem 1.75rem', fontSize: '0.825rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                >
                  Bosh Sahifaga Qaytish
                </Link>

                <Link
                  to="/catalog"
                  className="btn-glass"
                  style={{ padding: '0.75rem 1.75rem', fontSize: '0.825rem', color: 'var(--color-platinum-200)', textDecoration: 'none' }}
                >
                  Kolleksiyani Ko‘rish
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0 }}>
                  Salon Qabuliga Yozilish yoki Maxsus Buyurtma Berish
                </h3>
                <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.25rem', margin: 0 }}>
                  Maxfiy va Imtiyozli VIP Konsyerj Yo‘naltiruvi
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>To‘liq Ismingiz *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ism va Familiyangiz"
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Shaxsiy Elektron Pochta *</label>
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
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>VIP Aloqa Telefoni *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^\d+\s\-()]/g, '');
                      setFormData({ ...formData, phone: val });
                    }}
                    placeholder="+998 90 123 45 67"
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tanlangan Salon Manzili</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    <option value="Geneva Salon (Rue du Rhône)">Jeneva Saloni (Rue du Rhône, Shveytsariya)</option>
                    <option value="Zurich Salon (Bahnhofstrasse)">Syurix Saloni (Bahnhofstrasse, Shveytsariya)</option>
                    <option value="London Salon (New Bond Street)">London Saloni (New Bond Street, Buyuk Britaniya)</option>
                    <option value="Dubai Salon (DIFC Gate)">Dubay Saloni (DIFC Gate, BAA)</option>
                    <option value="Tokyo Salon (Ginza Six)">Tokio Saloni (Ginza Six, Yaponiya)</option>
                    <option value="New York Salon (Madison Avenue)">Nyu-York Saloni (Madison Avenue, AQSH)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Murojaat Yo‘nalishi</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    <option value="Turbiyon Individual Buyurtmasi (Bespoke)">Turbiyon Individual Buyurtmasi (Bespoke)</option>
                    <option value="Xususiy Salon Ko‘rigi va Taqdimot">Xususiy Salon Ko‘rigi va Taqdimot</option>
                    <option value="Meteorit Siferblat Ajratmasi">Meteorit Siferblat Ajratmasi</option>
                    <option value="Noyob Vintage Kalibr Restavratsiyasi">Noyob Vintage Kalibr Restavratsiyasi</option>
                    <option value="Korporativ / Xususiy Kolleksiya Loyihasi">Korporativ / Xususiy Kolleksiya Loyihasi</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Rejalashtirilgan Tashrif Sanasi</label>
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
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Maxsus Kalibr va Gravirovka Istaklari</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Muayyan qotishma (platina, 18K oltin), qimmatbaho toshlar yoki shaxsiy gravirovka talablarini kiriting..."
                  className="luxury-input"
                  style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ paddingTop: '0.5rem' }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold"
                  style={{ width: '100%', padding: '0.9rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600, opacity: loading ? 0.8 : 1, cursor: loading ? 'wait' : 'pointer' }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Shifrlangan VIP Kanalga Uzatilmoqda...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>VIP Murojaatni Yuborish</span>
                    </>
                  )}
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
                backgroundColor: 'var(--card-bg)',
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

