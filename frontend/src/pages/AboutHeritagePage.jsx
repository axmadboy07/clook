import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Award, Compass, Gem, Sparkles } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading.jsx';

export const AboutHeritagePage = () => {
  const milestones = [
    {
      year: '1785',
      title: 'Founding in Vallée de Joux',
      description: 'Master horologist Antoine de l’Aura establishes the first high-mountain atelier in Le Brassus, specializing in perpetual calendar church regulators.',
    },
    {
      year: '1892',
      title: 'First Grand Tourbillon Pocket Calibre',
      description: 'Awarded the Grand Prix at the Paris Universal Exposition for an uncompensated balance cage resisting magnetic fields.',
    },
    {
      year: '1968',
      title: 'Hi-Beat Column-Wheel Chronograph',
      description: 'Pioneering ultra-fast 36,000 vph movements for high-altitude aviation and maritime navigators.',
    },
    {
      year: '2012',
      title: 'Introduction of Monolithic Zirconia Ceramic',
      description: 'Developing diamond-sintered ceramic cases with zero thermal expansion and scratch resistance.',
    },
    {
      year: '2026',
      title: 'The Digital Atelier & Spatial Horology Era',
      description: 'Integrating real-time 3D parametric configurators with classical Swiss hand-chamfered finishing for worldwide collectors.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-obsidian-950)', padding: '3rem 0 5rem' }}>
      {/* Hero Header */}
      <div className="site-container" style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-pill"
          style={{ padding: '0.4rem 0.85rem', color: 'var(--color-gold-300)', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--border-gold-subtle)' }}
        >
          <Sparkles size={14} style={{ color: 'var(--color-gold-400)' }} />
          <span>ESTABLISHED 1785 • GENÈVE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}
        >
          Two Centuries of <br />
          <span className="gold-gradient-text">Unyielding Horology.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted"
          style={{ fontSize: '1rem', maxWidth: '36rem', margin: 0, lineHeight: 1.6 }}
        >
          From high-alpine Swiss workshops in the Vallée de Joux to our modern Geneva salons, AURA represents the absolute pinnacle of classical mechanical art.
        </motion.p>
      </div>

      {/* Main Heritage Timeline */}
      <div className="site-container" style={{ maxWidth: '48rem', marginBottom: '5rem' }}>
        <SectionHeading
          subtitle="Chronicle of Excellence"
          title="Horological Evolution"
          description="Key moments that defined our legacy of mechanical precision."
        />

        <div style={{ marginTop: '3.5rem', position: 'relative', borderLeft: '2px solid var(--color-gold-400)', marginLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {milestones.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{ position: 'relative', paddingLeft: '2rem' }}
            >
              {/* Year Marker Pin */}
              <div
                style={{
                  position: 'absolute',
                  left: '-9px',
                  top: '0.4rem',
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-obsidian-950)',
                  border: '2px solid var(--color-gold-400)',
                  boxShadow: 'var(--shadow-gold-glow)'
                }}
              />

              {/* Year Tag */}
              <span className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.5rem', display: 'block', marginBottom: '0.25rem' }}>
                {item.year}
              </span>

              {/* Card */}
              <div className="glass-panel glass-panel-hover" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                  {item.title}
                </h3>
                <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Atelier Craftsmanship Breakdown */}
      <div id="craftsmanship" className="site-container" style={{ paddingTop: '4rem', borderTop: '1px solid var(--border-subtle)' }}>
        <SectionHeading
          subtitle="The Ateliers"
          title="Masters Behind the Calibres"
          description="Every component is polished, beveled, and regulated by hand in our Geneva workshop."
        />

        <div style={{ marginTop: '3.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel glass-panel-hover" style={{ padding: '2rem', borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-400)' }}>
              <Gem size={22} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
              Gentian Wood Mirror Polish
            </h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              Before final casing, our master finishers buff all steel pinion teeth with alpine gentian wood paste to remove microscopic friction.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover" style={{ padding: '2rem', borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-400)' }}>
              <Compass size={22} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
              5-Position Chronometric Regulation
            </h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              Calibres are tested across dial-up, dial-down, crown-left, crown-up, and crown-right positions for 360 hours under thermal swings.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover" style={{ padding: '2rem', borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-400)' }}>
              <Award size={22} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
              Perpetual Heritage Archive
            </h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              Every serial number is permanently handwritten into our leather-bound ledger vaults, guaranteeing lifetime restoration for generations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHeritagePage;
