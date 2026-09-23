import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeading = ({
  subtitle,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  const textAlign = align === 'center' ? 'center' : align === 'right' ? 'right' : 'left';
  const margin = align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : '0 auto 0 0';

  return (
    <div style={{ maxWidth: '48rem', textAlign, margin }} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
          marginBottom: '0.75rem'
        }}
      >
        <span style={{ width: '2rem', height: '1px', backgroundColor: 'var(--color-gold-400)' }}></span>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold-400)' }}>
          {subtitle}
        </span>
        <span style={{ width: '2rem', height: '1px', backgroundColor: 'var(--color-gold-400)' }}></span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          margin: '0 0 0.75rem 0'
        }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted"
          style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            maxWidth: '38rem',
            margin: align === 'center' ? '0 auto' : '0'
          }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
