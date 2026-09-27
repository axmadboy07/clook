import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArrowRight } from 'lucide-react';
import { WATCHES } from '../../data/watches.js';
import { ProductCard } from '../common/ProductCard.jsx';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { QuickViewModal } from '../common/QuickViewModal.jsx';

export const FeaturedCollection = () => {
  const { t } = useTranslation();
  const reduxProducts = useSelector((state) => state.products.items);
  const [selectedCollection, setSelectedCollection] = useState('All Timepieces');
  const [quickViewWatch, setQuickViewWatch] = useState(null);

  const displayList = reduxProducts && reduxProducts.length > 0 ? reduxProducts : WATCHES;

  const filteredWatches =
    selectedCollection === 'All Timepieces'
      ? displayList.slice(0, 6)
      : displayList.filter((w) => w.collection === selectedCollection || w.category === selectedCollection);

  return (
    <section id="collection-section" style={{ padding: 'clamp(3.5rem, 6vw, 6rem) 0', backgroundColor: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Accent Gradients */}
      <div style={{ position: 'absolute', top: '50%', right: 0, width: '24rem', height: '24rem', backgroundColor: 'rgba(212,175,55,0.04)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="site-container" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '100%' }}>
        <SectionHeading
          subtitle={t('featured.badge') || 'Haute Timepieces'}
          title={t('featured.title') || 'Featured Creations'}
          description={t('featured.subtitle') || 'A curated selection of our flagship horological achievements.'}
        />

        {/* Product Grid */}
        <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
          {filteredWatches.map((watch) => (
            <ProductCard
              key={watch.id}
              watch={watch}
              onQuickView={(w) => setQuickViewWatch(w)}
            />
          ))}
        </div>

        {/* Full Catalog Button */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Link
            to="/catalog"
            className="btn-glass"
            style={{
              padding: '0.9rem 2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              borderColor: 'var(--border-gold-subtle)',
              color: 'var(--color-gold-300)'
            }}
          >
            <span>{t('featured.viewAll') || 'View All Masterpieces'} ({displayList.length})</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        watch={quickViewWatch}
        onClose={() => setQuickViewWatch(null)}
      />
    </section>
  );
};

export default FeaturedCollection;
