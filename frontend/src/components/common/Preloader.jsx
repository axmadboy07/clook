import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        // Realistic variable ticking speed
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--bg-obsidian-950)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            userSelect: 'none'
          }}
        >
          {/* Subtle Ambient Gold Glow */}
          <div
            style={{
              position: 'absolute',
              width: '24rem',
              height: '24rem',
              backgroundColor: 'rgba(212,175,55,0.08)',
              borderRadius: '50%',
              filter: 'blur(80px)',
              pointerEvents: 'none'
            }}
          />

          {/* Rotating Horology Mechanism Graphic */}
          <div style={{ position: 'relative', width: '9rem', height: '9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
            {/* Outer Gear Ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px dashed rgba(212,175,55,0.4)',
                animation: 'spin 20s linear infinite'
              }}
            />

            {/* Inner Counter-Rotating Gear Ring */}
            <div
              style={{
                position: 'absolute',
                inset: '0.75rem',
                borderRadius: '50%',
                border: '1px solid rgba(212,175,55,0.3)',
                animation: 'spin 15s linear infinite reverse'
              }}
            />

            {/* Tourbillon Center Core */}
            <div
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, rgba(212,175,55,0.2) 0%, var(--bg-obsidian-900) 100%)',
                border: '1px solid var(--color-gold-400)',
                boxShadow: '0 0 20px rgba(212,175,55,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Clock size={32} style={{ color: 'var(--color-gold-400)', animation: 'spin 4s linear infinite' }} />
            </div>

            {/* Orbiting Satellite Indicator */}
            <div
              style={{
                position: 'absolute',
                width: '0.625rem',
                height: '0.625rem',
                borderRadius: '50%',
                backgroundColor: 'var(--color-gold-300)',
                boxShadow: '0 0 10px rgba(212,175,55,0.8)',
                transform: `rotate(${progress * 3.6}deg) translateY(-60px)`
              }}
            />
          </div>

          {/* Brand Title */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.3em', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', margin: 0 }}>
              Aura Horology
            </h1>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--color-gold-400)', marginTop: '0.5rem' }}>
              Genève • Haute Horlogerie
            </p>
          </div>

          {/* Precision Progress Bar */}
          <div style={{ width: '16rem', maxWidth: '100%' }}>
            <div style={{ height: '3px', width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--color-gold-600), var(--color-gold-400), var(--color-gold-200))',
                  boxShadow: '0 0 10px rgba(212,175,55,0.5)',
                  width: `${progress}%`
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.5rem', letterSpacing: '0.1em' }}>
              <span>CALIBRATING 3D ATELIER</span>
              <span style={{ color: 'var(--color-gold-400)', fontWeight: 700 }}>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
