import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { LuxuryWatchCanvas } from './LuxuryWatchCanvas.jsx';

export const WristSimulatorModal = ({
  watch,
  isOpen,
  onClose,
}) => {
  const [wristSizeCm, setWristSizeCm] = useState(17.5); // 17.5 cm / ~6.9 inches (standard average)
  const [skinTone, setSkinTone] = useState('tan');
  const [sleeveType, setSleeveType] = useState('tuxedo');

  if (!isOpen || !watch) return null;

  const skinColors = {
    fair: '#f3d2c1',
    tan: '#d4a373',
    warm: '#b07d62',
    rich: '#58311f',
  };

  const sleeveStyles = {
    tuxedo: {
      label: 'Black Tie Tuxedo & French Cuff',
      outerBg: 'background-obsidian-950',
      borderStyle: '4px solid #e2e8f0',
      cufflink: true,
    },
    cashmere: {
      label: 'Charcoal Cashmere Knit',
      outerBg: '#1e293b',
      borderStyle: '2px solid #334155',
      cufflink: false,
    },
    linen: {
      label: 'Crisp White Linen Shirt',
      outerBg: '#f5f5f4',
      borderStyle: '2px solid #d6d3d1',
      cufflink: false,
    },
    bare: {
      label: 'Summer Bare Wrist (Casual)',
      outerBg: 'transparent',
      borderStyle: 'none',
      cufflink: false,
    },
  };

  const diameterNum = parseFloat(watch?.specs?.caseDiameter || '41');
  const wristWidthMm = (wristSizeCm * 10) / 2.7;
  const coveragePercent = Math.round((diameterNum / wristWidthMm) * 100);

  return (
    <AnimatePresence>
      <div className="modal-overlay" style={{ zIndex: 100 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="modal-backdrop"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="modal-content glass-panel"
          style={{
            maxWidth: '900px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            padding: 0,
            overflow: 'hidden',
            border: '1px solid var(--border-gold-subtle)'
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="btn-glass"
            style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 30, padding: '0.5rem', borderRadius: '50%' }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Left: Virtual Wrist Stage */}
          <div
            style={{
              background: 'radial-gradient(circle at center, #1a1714 0%, #08080a 100%)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '420px',
              position: 'relative',
              borderRight: '1px solid var(--border-subtle)'
            }}
          >
            {/* Wrist & Sleeve Visualizer Container */}
            <div style={{ position: 'relative', width: '280px', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Arm / Wrist Silhouette */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  backgroundColor: skinColors[skinTone],
                  width: `${(wristSizeCm / 17.5) * 180}px`,
                  borderRadius: '1.5rem',
                  boxShadow: '0 20px 30px rgba(0,0,0,0.5)',
                  transition: 'all 0.5s ease'
                }}
              >
                {/* Sleeve Overlay */}
                {sleeveType !== 'bare' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '110px',
                      borderRadius: '1.5rem 1.5rem 0 0',
                      backgroundColor: sleeveStyles[sleeveType].outerBg,
                      borderRight: sleeveStyles[sleeveType].borderStyle
                    }}
                  >
                    {sleeveStyles[sleeveType].cufflink && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          right: '16px',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-gold-400)',
                          border: '1px solid var(--color-gold-200)',
                          boxShadow: '0 0 10px rgba(212,175,55,0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#050507' }} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 3D Watch Floating Directly over the Wrist */}
              <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <LuxuryWatchCanvas
                  caseColor={watch?.threeDConfig?.caseColor || '#d4af37'}
                  bezelColor={watch?.threeDConfig?.bezelColor || '#b89228'}
                  dialColor={watch?.threeDConfig?.dialColor || '#0a0b0e'}
                  strapColor={watch?.threeDConfig?.strapColor || '#1a140f'}
                  isSkeleton={watch?.threeDConfig?.isSkeleton ?? true}
                  hasTourbillon={watch?.threeDConfig?.hasTourbillon ?? true}
                  metalness={watch?.threeDConfig?.metalness ?? 0.95}
                  roughness={watch?.threeDConfig?.roughness ?? 0.15}
                  autoRotate={false}
                  enableZoom={false}
                  floating={false}
                  cameraPosition={[0, 0, 6.8]}
                  fov={38}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Bottom Sizing Metrics Badge */}
            <div
              className="glass-pill"
              style={{
                marginTop: '1.5rem',
                padding: '0.75rem 1rem',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '340px'
              }}
            >
              <span className="text-secondary">
                Wrist Span: <strong className="gold-gradient-text">{wristSizeCm} cm</strong> ({((wristSizeCm * 0.3937)).toFixed(1)}")
              </span>
              <span style={{ color: 'var(--color-emerald-400)', fontWeight: 700 }}>
                {coveragePercent}% Wrist Presence
              </span>
            </div>
          </div>

          {/* Right: Controls & Sizing Guide */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-gold-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                  <Sparkles size={14} />
                  <span>Virtual Atelier Fitting</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)', margin: '0 0 0.25rem' }}>
                  Wrist Simulator
                </h3>
                <p className="text-muted" style={{ fontSize: '0.8rem', margin: 0 }}>
                  Evaluate how the <strong style={{ color: 'var(--text-primary)' }}>{watch?.specs?.caseDiameter || '41mm'}</strong> case sits across different wrist circumferences and sleeve attire.
                </p>
              </div>

              {/* 1. Wrist Size Slider */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span className="text-secondary">Wrist Circumference:</span>
                  <span className="gold-gradient-text" style={{ fontWeight: 700 }}>{wristSizeCm} cm</span>
                </div>
                <input
                  type="range"
                  min={15.0}
                  max={21.0}
                  step={0.5}
                  value={wristSizeCm}
                  onChange={(e) => setWristSizeCm(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-gold-400)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <span>15 cm (Petite)</span>
                  <span>17.5 cm (Avg)</span>
                  <span>21 cm (Broad)</span>
                </div>
              </div>

              {/* 2. Skin Tone Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  Skin Tone Profile
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {Object.keys(skinColors).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSkinTone(tone)}
                      style={{
                        flex: 1,
                        height: '2rem',
                        borderRadius: 'var(--radius-md)',
                        border: skinTone === tone ? '2px solid var(--color-gold-400)' : '2px solid transparent',
                        backgroundColor: skinColors[tone],
                        cursor: 'pointer',
                        transform: skinTone === tone ? 'scale(1.05)' : 'none',
                        boxShadow: skinTone === tone ? '0 0 10px rgba(212,175,55,0.4)' : 'none',
                        transition: 'all var(--transition-fast)'
                      }}
                      title={tone}
                    />
                  ))}
                </div>
              </div>

              {/* 3. Sleeve Attire */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  Attire / Sleeve Style
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {Object.keys(sleeveStyles).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSleeveType(type)}
                      className={`btn-glass ${sleeveType === type ? 'active-filter' : ''}`}
                      style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.75rem',
                        textAlign: 'left',
                        borderColor: sleeveType === type ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                        color: sleeveType === type ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                      }}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Dismiss / Confirmation */}
            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={onClose}
                className="btn-gold"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                Apply Fitted Specification
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WristSimulatorModal;
