import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Activity, Sliders } from 'lucide-react';
import { horologyAudio } from '../../utils/audioEngine';

export const SoundController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedVph, setSelectedVph] = useState(21600);

  const toggleAudio = () => {
    const active = horologyAudio.toggle();
    setIsPlaying(active);
  };

  const handleVphChange = (vph) => {
    setSelectedVph(vph);
    horologyAudio.setFrequency(vph);
  };

  useEffect(() => {
    return () => {
      horologyAudio.stop();
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 40, userSelect: 'none' }}>
      {/* Expanded Frequency Control Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-panel"
            style={{
              marginBottom: '0.75rem',
              padding: '1rem',
              borderRadius: 'var(--radius-xl)',
              width: '16rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              backgroundColor: 'rgba(10, 11, 14, 0.95)',
              border: '1px solid var(--border-gold-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-400)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Activity size={13} />
                <span>Calibre Heartbeat</span>
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                {isPlaying ? 'ACTIVE' : 'MUTED'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Escapement Frequency:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem' }}>
                {[
                  { vph: 21600, label: '21.6K (3Hz)' },
                  { vph: 28800, label: '28.8K (4Hz)' },
                  { vph: 36000, label: '36K (5Hz)' },
                ].map((item) => (
                  <button
                    key={item.vph}
                    onClick={() => handleVphChange(item.vph)}
                    className="btn-glass"
                    style={{
                      padding: '0.375rem 0.25rem',
                      fontSize: '0.65rem',
                      borderColor: selectedVph === item.vph ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                      backgroundColor: selectedVph === item.vph ? 'rgba(212,175,55,0.15)' : undefined,
                      color: selectedVph === item.vph ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.3 }}>
              Procedural audio simulating mechanical jewel impact inside solid gold casing.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Toggle Button */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.375rem',
          borderRadius: '9999px',
          border: '1px solid var(--border-gold-subtle)',
          backgroundColor: 'rgba(10, 11, 14, 0.9)'
        }}
      >
        <button
          onClick={toggleAudio}
          style={{
            padding: '0.625rem',
            borderRadius: '9999px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            background: isPlaying ? 'linear-gradient(135deg, var(--color-gold-500), var(--color-gold-700))' : 'transparent',
            color: isPlaying ? '#000' : 'var(--text-secondary)'
          }}
          title={isPlaying ? 'Mute Mechanical Ticking' : 'Listen to Swiss Escapement Heartbeat'}
        >
          {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          
          {/* Animated Visualizer Sound Waves */}
          {isPlaying && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '14px', paddingRight: '4px' }}>
              {[0.4, 0.9, 0.6, 1.0, 0.5].map((h, idx) => (
                <motion.span
                  key={idx}
                  animate={{ scaleY: [h, 1.2, 0.3, h] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: idx * 0.1,
                  }}
                  style={{ width: '2px', height: '100%', backgroundColor: '#000', borderRadius: '9999px', transformOrigin: 'bottom' }}
                />
              ))}
            </div>
          )}
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn-glass"
          style={{ padding: '0.5rem', borderRadius: '50%', width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Adjust Frequency & Escapement"
        >
          <Sliders size={14} style={{ color: menuOpen ? 'var(--color-gold-400)' : 'var(--text-secondary)' }} />
        </button>
      </div>
    </div>
  );
};

export default SoundController;
