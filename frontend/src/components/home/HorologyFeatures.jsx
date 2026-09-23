import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Award, Zap, Sparkles } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading.jsx';

export const HorologyFeatures = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Sparkles size={24} style={{ color: 'var(--color-gold-400)' }} />,
      title: t('features.swissPrecision') || 'Swiss Certified Precision',
      description: t('features.swissPrecisionDesc') || 'Hand-assembled in Geneva under the strictest horological standards.',
    },
    {
      icon: <Award size={24} style={{ color: 'var(--color-gold-400)' }} />,
      title: t('features.handcrafted') || 'Master Handcrafted Finishes',
      description: t('features.handcraftedDesc') || 'Every bevel, screw, and bridge is polished by master artisans.',
    },
    {
      icon: <Shield size={24} style={{ color: 'var(--color-gold-400)' }} />,
      title: t('features.secureDelivery') || 'Armored Insured Delivery',
      description: t('features.secureDeliveryDesc') || 'Dispatched via secure Brink’s courier with 100% full-value insurance.',
    },
    {
      icon: <Zap size={24} style={{ color: 'var(--color-gold-400)' }} />,
      title: t('features.concierge') || '24/7 VIP Horology Concierge',
      description: t('features.conciergeDesc') || 'Direct access to certified master watchmakers and salon advisers.',
    },
  ];

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-obsidian-950)', position: 'relative', overflow: 'hidden' }}>
      <div className="site-container" style={{ position: 'relative', zIndex: 10 }}>
        <SectionHeading
          subtitle={t('features.title') || 'AURA Guarantee'}
          title={t('features.subtitle') || 'Standards of Haute Horlogerie'}
          description={t('hero.subtitle') || 'Unrivaled excellence in modern high watchmaking.'}
        />

        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {feat.icon}
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                {feat.title}
              </h3>

              <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorologyFeatures;
