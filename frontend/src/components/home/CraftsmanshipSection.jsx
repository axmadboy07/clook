import React, { useState } from 'react';
import { Layers, ShieldCheck, Gem, Compass, Sparkles } from 'lucide-react';
import { LuxuryWatchCanvas } from '../3d/LuxuryWatchCanvas.jsx';
import { SectionHeading } from '../common/SectionHeading.jsx';

export const CraftsmanshipSection = () => {
  const [exploded, setExploded] = useState(false);

  return (
    <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, var(--bg-obsidian-950) 0%, var(--bg-obsidian-900) 50%, var(--bg-obsidian-950) 100%)', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border-gold-subtle)', borderBottom: '1px solid var(--border-gold-subtle)' }}>
      <div className="site-container" style={{ position: 'relative', zIndex: 10 }}>
        <SectionHeading
          subtitle="Haute Savoir-Faire"
          title="Deconstructed Perfection"
          description="Every AURA timepiece contains over 320 individually hand-chamfered components calibrated to micro-metric tolerances."
        />

        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          {/* Left: 3D Exploded View Canvas */}
          <div
            className="glass-panel"
            style={{
              borderRadius: 'var(--radius-3xl)',
              border: '1px solid var(--border-gold-subtle)',
              padding: '1.5rem',
              minHeight: '460px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Top Canvas Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 20 }}>
              <span className="glass-pill" style={{ fontSize: '0.75rem', color: 'var(--color-gold-400)', display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.35rem 0.75rem' }}>
                <Sparkles size={13} />
                <span>Calibre AH-901 Flying Tourbillon</span>
              </span>

              <button
                onClick={() => setExploded(!exploded)}
                className={`btn-glass ${exploded ? 'btn-gold' : ''}`}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  borderColor: exploded ? 'var(--color-gold-400)' : 'var(--border-subtle)'
                }}
              >
                <Layers size={13} />
                <span>{exploded ? 'Collapse Assembly' : 'Explode Calibre Components'}</span>
              </button>
            </div>

            {/* Interactive 3D Canvas */}
            <div style={{ width: '100%', height: '340px', margin: '0.5rem 0' }}>
              <LuxuryWatchCanvas
                caseColor="#d4af37"
                bezelColor="#b89228"
                dialColor="#0a0b0e"
                handColor="#f7edbf"
                strapColor="#1c130d"
                isSkeleton={true}
                hasTourbillon={true}
                exploded={exploded}
                metalness={0.95}
                roughness={0.15}
                autoRotate={true}
                enableZoom={true}
                className="w-full h-full"
              />
            </div>

            {/* Bottom Status bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span>Orbit with mouse or touch to inspect individual layers</span>
              <span className="gold-gradient-text" style={{ fontWeight: 600 }}>7 Mechanical Layers</span>
            </div>
          </div>

          {/* Right: Horological Craftsmanship Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel glass-panel-hover" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', color: 'var(--color-gold-400)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <Gem size={20} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                  Black Mirror Polishing & Anglage
                </h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                Internal bevels are rounded and polished to an absolute optical mirror finish using wooden pegs harvested from gentian roots in the Swiss Jura mountains.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', color: 'var(--color-gold-400)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <Compass size={20} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                  Free-Sprung Gyromax Balance
                </h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                Equipped with variable-inertia poising weights to resist gravitational anomalies and kinetic shocks, ensuring ISO 3159 chronometer certification.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', color: 'var(--color-gold-400)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <ShieldCheck size={20} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                  Poinçon de Genève Certified
                </h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                Awarded only to master timepieces assembled and regulated within the Canton of Geneva, honoring centuries of uninterrupted horological tradition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
