import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, ShieldCheck, Award, Sparkles, MapPin, Mail, Phone, Send } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      {/* Subtle gold glow accent line */}
      <div style={{ position: 'absolute', top: 0, left: '25%', right: '25%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-gold-400), transparent)' }} />

      {/* Brand Values Highlights Bar */}
      <div className="footer-trust-bar">
        <div className="container">
          <div className="footer-trust-grid">
            <div className="trust-item">
              <div className="trust-icon-circle">
                <Award size={18} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-platinum-100)' }}>
                  {t('details.genevaSeal')}
                </h4>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-platinum-400)', marginTop: '0.15rem' }}>
                  {t('features.swissPrecisionDesc')}
                </p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-circle">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-platinum-100)' }}>
                  {t('details.globalWarranty')}
                </h4>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-platinum-400)', marginTop: '0.15rem' }}>
                  {t('features.handcraftedDesc')}
                </p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-circle">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-platinum-100)' }}>
                  {t('hero.customizer')}
                </h4>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-platinum-400)', marginTop: '0.15rem' }}>
                  {t('details.laserNotice')}
                </p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-circle">
                <Clock size={18} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-platinum-100)' }}>
                  {t('features.secureDelivery')}
                </h4>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-platinum-400)', marginTop: '0.15rem' }}>
                  {t('features.secureDeliveryDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '1.5rem' }}>
        <div className="footer-main-grid">
          
          {/* Brand Info & Contacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-gold-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212, 164, 76, 0.2)' }}>
                <Clock size={16} style={{ color: 'var(--color-gold-400)' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.2em', fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-platinum-100)', textTransform: 'uppercase' }}>
                CHRONOS
              </span>
            </Link>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-platinum-400)', lineHeight: 1.6 }}>
              {t('footer.tagline')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-platinum-400)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={13} style={{ color: 'var(--color-gold-400)', flexShrink: 0 }} />
                <span>{t('footer.tashkent')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={13} style={{ color: 'var(--color-gold-400)', flexShrink: 0 }} />
                <span>support@chronos.uz</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={13} style={{ color: 'var(--color-gold-400)', flexShrink: 0 }} />
                <span>{t('footer.phone')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-300)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              {t('footer.quickLinks')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
              <li>
                <Link to="/catalog" style={{ color: 'var(--color-platinum-400)', transition: 'color 0.2s' }}>
                  {t('nav.catalog')}
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--color-platinum-400)', transition: 'color 0.2s' }}>
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" style={{ color: 'var(--color-platinum-400)', transition: 'color 0.2s' }}>
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link to="/faq" style={{ color: 'var(--color-platinum-400)', transition: 'color 0.2s' }}>
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'var(--color-platinum-400)', transition: 'color 0.2s' }}>
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-300)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              {t('footer.categories')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
              <li><Link to="/catalog?brand=Rolex" style={{ color: 'var(--color-platinum-400)' }}>Rolex</Link></li>
              <li><Link to="/catalog?brand=Tissot" style={{ color: 'var(--color-platinum-400)' }}>Tissot</Link></li>
              <li><Link to="/catalog?brand=Seiko" style={{ color: 'var(--color-platinum-400)' }}>Seiko</Link></li>
              <li><Link to="/catalog?brand=Casio" style={{ color: 'var(--color-platinum-400)' }}>Casio & G-Shock</Link></li>
              <li><Link to="/catalog?brand=Citizen" style={{ color: 'var(--color-platinum-400)' }}>Citizen</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-300)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              {t('footer.contactUs')}
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-platinum-400)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              {t('features.conciergeDesc')}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(t('details.addedToVault'));
              }}
              style={{ position: 'relative' }}
            >
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="luxury-input"
                style={{ paddingRight: '2.5rem', fontSize: '0.75rem' }}
              />
              <button
                type="submit"
                style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gold-400)', padding: '0.25rem', cursor: 'pointer' }}
                title="Yuborish"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="footer-bottom-bar">
          <p>© 2026 CHRONOS. {t('footer.rights')}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>CHRONOS VIP Atelier</span>
            <span>•</span>
            <span>Geneva, Tokyo & Tashkent</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
