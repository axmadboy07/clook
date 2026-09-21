import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { X, ShoppingBag, Heart, ArrowRight, Layers, Star } from 'lucide-react';
import { LuxuryWatchCanvas } from '../3d/LuxuryWatchCanvas.jsx';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { formatPriceWithCurrency } from '../../store/slices/localeSlice';

export const QuickViewModal = ({ watch, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [explodedView, setExplodedView] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  if (!watch) return null;

  const wishlisted = wishlistItems.some((item) => item.id === watch.id);
  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const handleAddAndClose = () => {
    dispatch(addToCart({ watch, quantity: 1 }));
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" style={{ zIndex: 100 }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="modal-backdrop"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="modal-content glass-panel"
          style={{
            maxWidth: '900px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            padding: 0,
            overflow: 'hidden',
            border: '1px solid var(--border-gold-subtle)'
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="btn-glass modal-close-btn tap-target-44"
            style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 30, width: '44px', height: '44px', padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Left: 3D Interactive Canvas */}
          <div
            style={{
              position: 'relative',
              background: 'radial-gradient(circle at center, #12141a 0%, #06070a 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              minHeight: '380px',
              borderRight: '1px solid var(--border-subtle)'
            }}
          >
            <LuxuryWatchCanvas
              caseColor={watch.threeDConfig?.caseColor || '#d4af37'}
              bezelColor={watch.threeDConfig?.bezelColor || '#d4af37'}
              dialColor={watch.threeDConfig?.dialColor || '#0a0b0e'}
              handColor={watch.threeDConfig?.handColor || '#f7edbf'}
              strapColor={watch.threeDConfig?.strapColor || '#1c130d'}
              isSkeleton={watch.threeDConfig?.isSkeleton || false}
              hasTourbillon={watch.threeDConfig?.hasTourbillon || false}
              exploded={explodedView}
              metalness={watch.threeDConfig?.metalness ?? 0.9}
              roughness={watch.threeDConfig?.roughness ?? 0.15}
              autoRotate={true}
              enableZoom={true}
              className="w-full h-full"
            />

            {/* Exploded movement toggle button */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 20
              }}
            >
              <span className="glass-pill" style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem' }}>
                Drag to orbit 360°
              </span>
              <button
                onClick={() => setExplodedView(!explodedView)}
                className={`btn-glass ${explodedView ? 'btn-gold' : ''}`}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  borderColor: explodedView ? 'var(--color-gold-400)' : 'var(--border-subtle)'
                }}
              >
                <Layers size={13} />
                <span>{explodedView ? 'Assemble View' : 'Exploded Calibre'}</span>
              </button>
            </div>
          </div>

          {/* Right: Specifications & Quick Action */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-gold-400)' }}>
                <span className="badge-gold">{watch.collection}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={13} fill="currentColor" />
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{watch.rating}</span>
                </div>
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>
                {watch.name}
              </h2>

              <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                {watch.description}
              </p>

              {/* Price Banner */}
              <div
                className="glass-panel"
                style={{
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-gold-subtle)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                    Haute Retail Value
                  </span>
                  <span className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.5rem' }}>
                    {formatPrice(watch.price)}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-emerald-400)', fontWeight: 700, display: 'block' }}>In Stock</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Geneva Ateliers Ready</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div className="glass-pill" style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>DIAMETER</span>
                  <span style={{ color: 'var(--text-primary)' }}>{watch.specs?.caseDiameter || '40.0 mm'}</span>
                </div>
                <div className="glass-pill" style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>CALIBRE</span>
                  <span style={{ color: 'var(--text-primary)' }}>{watch.specs?.caliber || 'AH-901'}</span>
                </div>
                <div className="glass-pill" style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>POWER RESERVE</span>
                  <span style={{ color: 'var(--text-primary)' }}>{watch.specs?.powerReserve || '72 Hours'}</span>
                </div>
                <div className="glass-pill" style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>WATER RESISTANCE</span>
                  <span style={{ color: 'var(--text-primary)' }}>{watch.specs?.waterResistance || '100 m'}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => dispatch(toggleWishlist(watch))}
                  className="btn-glass tap-target-44"
                  style={{
                    width: '44px',
                    height: '44px',
                    padding: 0,
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: wishlisted ? 'var(--color-rosegold-400)' : 'var(--border-subtle)',
                    color: wishlisted ? 'var(--color-rosegold-400)' : 'var(--text-secondary)'
                  }}
                  title={wishlisted ? 'Saved' : 'Wishlist'}
                >
                  <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>

                <button
                  onClick={handleAddAndClose}
                  className="btn-gold tap-target-44"
                  style={{
                    flex: 1,
                    minHeight: '44px',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem'
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Add to Vault</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  navigate(`/watch/${watch.id}`);
                }}
                className="btn-glass tap-target-44"
                style={{
                  width: '100%',
                  minHeight: '44px',
                  padding: '0.65rem',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.375rem'
                }}
              >
                <span>Complete 3D Atelier Customizer & Specs</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
