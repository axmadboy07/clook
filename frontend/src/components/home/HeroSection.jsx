import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  ArrowRight,
  Sparkles,
  Activity,
  Maximize2,
  ChevronDown
} from 'lucide-react';
import { HeroWatch3D } from '../3d/HeroWatch3D.jsx';
import { formatPriceWithCurrency } from '../../store/slices/localeSlice';

export const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  const [activeMaterial, setActiveMaterial] = useState('gold');

  const materialConfigs = {
    gold: {
      name: '18K Royal Gold',
      caseColor: '#d4af37',
      bezelColor: '#b89228',
      dialColor: '#0a0b0e',
      handColor: '#f7edbf',
      strapColor: '#1c130d',
      isSkeleton: true,
      hasTourbillon: true,
      metalness: 0.95,
      roughness: 0.15,
      price: 34500,
      badge: 'Haute Horlogerie',
    },
    rosegold: {
      name: '18K Imperial Rose',
      caseColor: '#b76e79',
      bezelColor: '#d9949a',
      dialColor: '#0a1931',
      handColor: '#fce7e9',
      strapColor: '#121826',
      isSkeleton: false,
      hasTourbillon: false,
      metalness: 0.98,
      roughness: 0.12,
      price: 42000,
      badge: 'Astronomical QP',
    },
    titanium: {
      name: 'Grade 5 Titanium',
      caseColor: '#8a929e',
      bezelColor: '#12141a',
      dialColor: '#0e1118',
      handColor: '#e5c158',
      strapColor: '#181920',
      isSkeleton: false,
      hasTourbillon: false,
      metalness: 0.85,
      roughness: 0.3,
      price: 18900,
      badge: 'Hi-Beat Chrono',
    },
    ceramic: {
      name: 'Midnight Ceramic',
      caseColor: '#121417',
      bezelColor: '#0a0b0d',
      dialColor: '#060709',
      handColor: '#d9949a',
      strapColor: '#15171d',
      isSkeleton: false,
      hasTourbillon: true,
      metalness: 0.4,
      roughness: 0.25,
      price: 27800,
      badge: 'Stealth Edition',
    },
  };

  const activeConfig = materialConfigs[activeMaterial];
  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '3rem 0 4.5rem' }}>
      {/* Background ambient lighting gradients */}
      <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.02) 50%, transparent 80%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(183,110,121,0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="site-container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Hero Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-pill"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content', padding: '0.4rem 0.85rem', color: 'var(--color-gold-300)', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 600, borderColor: 'var(--border-gold-subtle)' }}
            >
              <Sparkles size={14} style={{ color: 'var(--color-gold-400)' }} />
              <span>{t('hero.badge') || 'GENÈVE HAUTE HORLOGERIE'}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.5vw, 4.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                color: 'var(--color-platinum-100)',
                margin: 0
              }}
            >
              {t('hero.title1') || 'Timeless Precision.'} <br />
              <span className="gold-gradient-text">{t('hero.title2') || 'Sculpted in Solid Gold.'}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '34rem', margin: 0, color: 'var(--color-platinum-400)' }}
            >
              {t('hero.subtitle') || 'Explore our hand-chamfered mechanical tourbillons and high-complication calibres, individually crafted in Geneva ateliers.'}
            </motion.p>

            {/* Quick Hero Material Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ paddingTop: '0.5rem' }}
            >
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.6rem', color: 'var(--color-platinum-400)' }}>
                {t('hero.previewAlloy') || 'Precious Metal Variant:'} <strong className="gold-gradient-text" style={{ fontWeight: 700 }}>{activeConfig.name}</strong>
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {Object.keys(materialConfigs).map((key) => {
                  const cfg = materialConfigs[key];
                  const isSelected = activeMaterial === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveMaterial(key)}
                      className={`glass-pill ${isSelected ? 'active-filter' : ''}`}
                      style={{
                        padding: '0.45rem 0.85rem',
                        fontSize: '0.78125rem',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: isSelected ? 600 : 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        borderRadius: 'var(--radius-full)',
                        borderColor: isSelected ? 'var(--color-gold-400)' : 'var(--border-platinum-subtle)',
                        backgroundColor: isSelected ? 'rgba(212,175,55,0.18)' : 'rgba(255,255,255,0.03)',
                        color: isSelected ? 'var(--color-gold-300)' : 'var(--color-platinum-300)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: cfg.caseColor,
                          boxShadow: isSelected ? `0 0 8px ${cfg.caseColor}` : 'none',
                          border: '1px solid rgba(255,255,255,0.4)'
                        }}
                      />
                      <span>{cfg.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Hero CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', paddingTop: '0.5rem' }}
            >
              <button
                onClick={() => scrollToSection('collection-section')}
                className="btn-gold"
                style={{ padding: '0.85rem 2rem', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span>{t('hero.shopNow') || 'Explore Collection'}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate('/watch/rolex-submariner-gold')}
                className="btn-glass"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Maximize2 size={15} />
                <span>{t('hero.customizer') || 'Atelier Customizer'}</span>
              </button>
            </motion.div>

            {/* Three Pillar Metric Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-platinum-subtle)',
                marginTop: '0.5rem'
              }}
            >
              <div>
                <div className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.35rem' }}>380+</div>
                <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-sans)', color: 'var(--color-platinum-400)', marginTop: '0.2rem' }}>{t('hero.hoursFinish') || 'Hours per Calibre'}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-platinum-100)' }}>±1s/day</div>
                <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-sans)', color: 'var(--color-platinum-400)', marginTop: '0.2rem' }}>{t('hero.precision') || 'Chronometer Precision'}</div>
              </div>
              <div>
                <div className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.35rem' }}>5 Yrs</div>
                <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-sans)', color: 'var(--color-platinum-400)', marginTop: '0.2rem' }}>{t('hero.warranty') || 'Geneva Warranty'}</div>
              </div>
            </motion.div>
          </div>

          {/* Right Hero 3D Interactive Stage */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '520px', height: '100%' }}>
            
            {/* Ambient circular frame rings */}
            <div style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.2)', animation: 'spin 40s linear infinite', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.08)', pointerEvents: 'none' }} />

            {/* Interactive 3D Canvas */}
            <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 10 }}>
              <HeroWatch3D currentWatchConfig={activeConfig} />
            </div>

            {/* Interactive hint floating badge */}
            <div
              className="glass-pill"
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                zIndex: 20,
                fontSize: '0.7rem',
                color: 'var(--color-gold-300)',
                padding: '0.35rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                pointerEvents: 'none'
              }}
            >
              <Activity size={13} style={{ color: 'var(--color-gold-400)' }} />
              <span>Interactive 3D • Mouse Parallax</span>
            </div>

            {/* Top Left Floating Spec Tag */}
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '0.5rem',
                zIndex: 20,
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-gold-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem'
              }}
            >
              <span style={{ fontSize: '0.65rem', color: 'var(--color-gold-400)', textTransform: 'uppercase' }}>{activeConfig.badge}</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{activeConfig.name}</span>
              <span className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.8rem' }}>{formatPrice(activeConfig.price)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Scroll Down Indicator */}
      <button
        onClick={() => scrollToSection('collection-section')}
        style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-muted)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        <span>{t('featured.badge') || 'Collection'}</span>
        <ChevronDown size={16} />
      </button>
    </section>
  );
};

export default HeroSection;
