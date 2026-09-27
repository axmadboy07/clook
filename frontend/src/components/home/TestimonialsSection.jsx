import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading.jsx';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "The hand-beveled anglage and the flying tourbillon cage on the Royal Tourbillon I rival anything coming out of the most revered independent Geneva ateliers.",
      author: "Julian V. Rothschild",
      role: "Horology Collector & Patron",
      location: "Zurich, Switzerland",
      timepiece: "AURA Royal Tourbillon I",
      stars: 5,
    },
    {
      quote: "The interactive 3D bespoke customizer was what drew me in, but the physical weight of the 18K solid rose gold and the aventurine moon phase is pure magic.",
      author: "Elena Rostova",
      role: "Fine Watch Connoisseur",
      location: "Monaco",
      timepiece: "AURA Celestial Perpetual Moon",
      stars: 5,
    },
    {
      quote: "Grade 5 titanium with split-seconds chrono action that clicks like a fine vault lock. The courier arrived in an armored vehicle directly to my estate.",
      author: "Marcus Sterling",
      role: "Motorsport Director",
      location: "London, UK",
      timepiece: "AURA Chrono Velocity Ti",
      stars: 5,
    },
  ];

  return (
    <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, var(--bg-obsidian-950) 0%, var(--bg-obsidian-900) 50%, var(--bg-obsidian-950) 100%)', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border-gold-subtle)' }}>
      <div className="site-container" style={{ position: 'relative', zIndex: 10 }}>
        <SectionHeading
          subtitle="Collector Accolades"
          title="Voice of Haute Connoisseurs"
          description="Read accounts from collectors and horology patrons who entrust their most cherished moments to AURA mechanical calibres."
        />

        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Rating stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-gold-400)' }}>
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                <p className="text-muted" style={{ fontSize: '0.85rem', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                  "{item.quote}"
                </p>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <span>{item.author}</span>
                    <CheckCircle2 size={13} style={{ color: 'var(--color-emerald-400)' }} />
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                    {item.role} • {item.location}
                  </p>
                  <p className="gold-gradient-text" style={{ fontSize: '0.7rem', margin: '0.25rem 0 0' }}>
                    Acquired: {item.timepiece}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Private Salon Invitation Box */}
        <div
          className="glass-panel"
          style={{
            marginTop: '4rem',
            padding: 'clamp(2rem, 5vw, 3rem)',
            borderRadius: 'var(--radius-3xl)',
            border: '1px solid var(--border-gold-subtle)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            background: 'radial-gradient(circle at center, rgba(212,175,55,0.1) 0%, var(--bg-obsidian-900) 100%)'
          }}
        >
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--color-gold-400)' }}>
            GENÈVE • ZURICH • DUBAI • LONDON • TOKYO
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Request a Private Viewing Salon Appointment
          </h3>
          <p className="text-muted" style={{ fontSize: '0.9rem', maxWidth: '36rem', margin: 0 }}>
            Experience our Master Calibres with your dedicated Horology Concierge over vintage champagne.
          </p>
          <div style={{ paddingTop: '0.5rem' }}>
            <a
              href="/contact"
              className="btn-gold"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2.25rem',
                fontSize: '0.75rem',
                textDecoration: 'none'
              }}
            >
              Book VIP Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
