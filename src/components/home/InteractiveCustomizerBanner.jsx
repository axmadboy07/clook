import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Sliders, ShoppingBag, ArrowRight } from 'lucide-react';
import { LuxuryWatchCanvas } from '../3d/LuxuryWatchCanvas.jsx';
import { addToCart } from '../../store/slices/cartSlice';
import { formatPriceWithCurrency } from '../../store/slices/localeSlice';
import { WATCHES } from '../../data/watches.js';

const METALS = [
  { id: 'yellow-gold', label: '18K Yellow Gold', caseColor: '#d4af37', bezelColor: '#b89228', metalness: 0.95, roughness: 0.15, priceDelta: 0 },
  { id: 'rose-gold', label: '18K Rose Gold', caseColor: '#b76e79', bezelColor: '#9d5b65', metalness: 0.95, roughness: 0.18, priceDelta: 2500 },
  { id: 'titanium', label: 'Grade 5 Titanium', caseColor: '#8a929e', bezelColor: '#5a626e', metalness: 0.85, roughness: 0.35, priceDelta: -5000 },
  { id: 'ceramic', label: 'Midnight Ceramic', caseColor: '#121417', bezelColor: '#1c1e24', metalness: 0.08, roughness: 0.55, priceDelta: -2000 },
  { id: 'platinum', label: '950 Pure Platinum', caseColor: '#e2e8f0', bezelColor: '#cbd5e1', metalness: 0.98, roughness: 0.10, priceDelta: 8000 },
];

const DIALS = [
  { id: 'obsidian-black', label: 'Obsidian Black', color: '#0a0b0e', handColor: '#f7edbf' },
  { id: 'midnight-sun-gold', label: 'Midnight Sun Gold', color: '#d4af37', handColor: '#11141a' },
  { id: 'deep-ocean-blue', label: 'Deep Ocean Blue', color: '#0a1931', handColor: '#f7edbf' },
  { id: 'royal-emerald', label: 'Royal Emerald', color: '#06261c', handColor: '#f7edbf' },
  { id: 'crimson-ruby', label: 'Crimson Ruby', color: '#4a0e17', handColor: '#f7edbf' },
];

const STRAPS = [
  { id: 'alligator', label: 'Noir Alligator', color: '#1c130d', metalness: 0.08, roughness: 0.82 },
  { id: 'matching-bracelet', label: 'Matching Gold Bracelet', isMatchingCase: true },
  { id: 'rubber', label: 'Navy Sport Rubber', color: '#0f172a', metalness: 0.02, roughness: 0.92 },
  { id: 'milanese', label: 'Milanese Mesh', color: '#94a3b8', metalness: 0.96, roughness: 0.22 },
];

export const InteractiveCustomizerBanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  const baseWatch = WATCHES[0];

  const [selectedMetalId, setSelectedMetalId] = useState('yellow-gold');
  const [selectedDialId, setSelectedDialId] = useState('obsidian-black');
  const [selectedStrapId, setSelectedStrapId] = useState('alligator');

  const currentMetal = METALS.find((m) => m.id === selectedMetalId) || METALS[0];
  const currentDial = DIALS.find((d) => d.id === selectedDialId) || DIALS[0];
  const currentStrap = STRAPS.find((s) => s.id === selectedStrapId) || STRAPS[0];

  const activeCaseColor = currentMetal.caseColor;
  const activeBezelColor = currentMetal.bezelColor;
  const activeMetalness = currentMetal.metalness;
  const activeRoughness = currentMetal.roughness;

  const activeDialColor = currentDial.color;
  const activeHandColor = currentDial.handColor;

  const activeStrapColor = currentStrap.isMatchingCase ? currentMetal.caseColor : (currentStrap.color || '#1c130d');
  const activeStrapMetalness = currentStrap.isMatchingCase ? currentMetal.metalness : (currentStrap.metalness ?? 0.1);
  const activeStrapRoughness = currentStrap.isMatchingCase ? currentMetal.roughness : (currentStrap.roughness ?? 0.8);

  const calculatedPrice = baseWatch.price + currentMetal.priceDelta;
  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const handleBespokeOrder = () => {
    dispatch(addToCart({
      watch: baseWatch,
      quantity: 1,
      customOptions: {
        caseMaterial: currentMetal.label,
        strapMaterial: currentStrap.label,
        dialColor: currentDial.label,
      }
    }));
  };

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-obsidian-950)', position: 'relative', overflow: 'hidden' }}>
      <div className="site-container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          className="glass-panel"
          style={{
            borderRadius: 'var(--radius-3xl)',
            border: '1px solid var(--border-gold-subtle)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Left Column: 3D Live Render Studio */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
              <div style={{ width: '100%', height: '340px' }}>
                <LuxuryWatchCanvas
                  caseColor={activeCaseColor}
                  bezelColor={activeBezelColor}
                  dialColor={activeDialColor}
                  handColor={activeHandColor}
                  strapColor={activeStrapColor}
                  strapRoughness={activeStrapRoughness}
                  strapMetalness={activeStrapMetalness}
                  metalness={activeMetalness}
                  roughness={activeRoughness}
                  isSkeleton={true}
                  hasTourbillon={true}
                  autoRotate={true}
                  enableZoom={true}
                  className="w-full h-full"
                />
              </div>

              <div
                className="glass-pill"
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  fontSize: '0.75rem',
                  padding: '0.5rem 1rem'
                }}
              >
                <span className="text-secondary">Real-Time WebGL Shader Engine</span>
                <span className="gold-gradient-text" style={{ fontWeight: 700 }}>{formatPrice(calculatedPrice)}</span>
              </div>
            </div>

            {/* Right Column: Interactive Configuration Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold-400)', marginBottom: '0.5rem' }}>
                  <Sliders size={14} />
                  <span>Atelier Bespoke Studio</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
                  Tailor Your Masterpiece
                </h2>
                <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                  Configure precious metals, grand feu enamel dial colors, and openworked complications in real-time.
                </p>
              </div>

              {/* 1. Case Precious Alloy Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  1. Case Alloy & Finish
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {METALS.map((m) => {
                    const active = selectedMetalId === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMetalId(m.id)}
                        className={`btn-glass ${active ? 'active-filter' : ''}`}
                        style={{
                          padding: '0.4rem 0.75rem',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          borderColor: active ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                          backgroundColor: active ? 'rgba(212,175,55,0.15)' : undefined,
                          color: active ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                        }}
                      >
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: m.caseColor,
                            border: '1px solid rgba(255,255,255,0.3)',
                            flexShrink: 0
                          }}
                        />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Dial Color Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  2. Dial Face Treatment
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {DIALS.map((d) => {
                    const active = selectedDialId === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDialId(d.id)}
                        className={`btn-glass ${active ? 'active-filter' : ''}`}
                        style={{
                          padding: '0.4rem 0.75rem',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          borderColor: active ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                          backgroundColor: active ? 'rgba(212,175,55,0.15)' : undefined,
                          color: active ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                        }}
                      >
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: d.color,
                            border: '1px solid rgba(255,255,255,0.3)',
                            flexShrink: 0
                          }}
                        />
                        <span>{d.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Strap Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  3. Strap & Clasp
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {STRAPS.map((s) => {
                    const active = selectedStrapId === s.id;
                    const swatchColor = s.isMatchingCase ? activeCaseColor : (s.color || '#1c130d');
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedStrapId(s.id)}
                        className={`btn-glass ${active ? 'active-filter' : ''}`}
                        style={{
                          padding: '0.4rem 0.75rem',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          borderColor: active ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                          backgroundColor: active ? 'rgba(212,175,55,0.15)' : undefined,
                          color: active ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                        }}
                      >
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: swatchColor,
                            border: '1px solid rgba(255,255,255,0.3)',
                            flexShrink: 0
                          }}
                        />
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  onClick={handleBespokeOrder}
                  className="btn-gold"
                  style={{
                    flex: '1 1 200px',
                    padding: '0.9rem 1.5rem',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Reserve This Bespoke Configuration</span>
                </button>

                <button
                  onClick={() => navigate('/watch/aura-tourbillon-gold')}
                  className="btn-glass"
                  style={{
                    padding: '0.9rem 1.25rem',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.375rem'
                  }}
                >
                  <span>Full Atelier View</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCustomizerBanner;
