import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Heart,
  Scale,
  Eye,
  ShoppingBag,
  Star,
  Check,
  RotateCcw
} from 'lucide-react';
import { TiltCard } from './TiltCard.jsx';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { addToCompare, removeFromCompare } from '../../store/slices/compareSlice';
import { formatPriceWithCurrency } from '../../store/slices/localeSlice';
import { LuxuryWatchCanvas } from '../3d/LuxuryWatchCanvas.jsx';

export const ProductCard = ({ watch, onQuickView }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [is3DMode, setIs3DMode] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const compareItems = useSelector((state) => state.compare.items);
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  const wishlisted = wishlistItems.some((item) => item.id === watch.id);
  const compared = compareItems.some((item) => item.id === watch.id);

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ watch, quantity: 1 }));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(watch));
  };

  const handleToggleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (compared) {
      dispatch(removeFromCompare(watch.id));
    } else {
      dispatch(addToCompare(watch));
    }
  };

  return (
    <TiltCard maxTilt={5} className="h-full">
      <div className="product-card glass-panel glass-panel-hover" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
        
        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 20, display: 'flex', flexDirection: 'column', gap: '0.375rem', pointerEvents: 'none' }}>
          {watch.limitedEdition && (
            <span
              className="badge-gold"
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                backgroundColor: 'rgba(8, 10, 14, 0.88)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(212, 175, 55, 0.6)',
                color: 'var(--color-gold-300)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
                padding: '0.2rem 0.5rem',
                borderRadius: '9999px'
              }}
            >
              Limited Edition {watch.editionCount ? `(${watch.editionCount})` : ''}
            </span>
          )}
          {watch.isNewArrival && !watch.limitedEdition && (
            <span
              className="badge-amber"
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                backgroundColor: 'rgba(8, 10, 14, 0.88)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(245, 158, 11, 0.6)',
                color: '#fbbf24',
                boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
                padding: '0.2rem 0.5rem',
                borderRadius: '9999px'
              }}
            >
              New Calibre
            </span>
          )}
        </div>

        {/* Floating Quick Action Icons Stack (Top-Right) */}
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 20, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {/* 3D Interactive Mode Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIs3DMode(!is3DMode);
            }}
            style={{
              width: '2.1rem',
              height: '2.1rem',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: is3DMode ? 'rgba(212, 175, 55, 0.95)' : 'rgba(8, 10, 14, 0.88)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: is3DMode ? '1px solid var(--color-gold-300)' : '1px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
              cursor: 'pointer',
              color: is3DMode ? '#000' : 'var(--color-gold-300)',
              transition: 'all 0.25s ease'
            }}
            title={is3DMode ? '2D Photo' : '3D WebGL'}
          >
            <RotateCcw
              size={14}
              style={{
                transform: is3DMode ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.5s ease'
              }}
            />
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            style={{
              width: '2.1rem',
              height: '2.1rem',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: wishlisted ? 'rgba(244, 63, 94, 0.9)' : 'rgba(8, 10, 14, 0.88)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: wishlisted ? '1px solid #fb7185' : '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
              cursor: 'pointer',
              color: wishlisted ? '#ffffff' : '#ffffff',
              transition: 'all 0.25s ease'
            }}
            title={wishlisted ? (t('wishlist.remove') || 'Istaklardan o‘chirish') : (t('wishlist.title') || 'Istaklarga qo‘shish')}
          >
            <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Compare Button */}
          <button
            type="button"
            onClick={handleToggleCompare}
            style={{
              width: '2.1rem',
              height: '2.1rem',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: compared ? 'rgba(212, 175, 55, 0.9)' : 'rgba(8, 10, 14, 0.88)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: compared ? '1px solid var(--color-gold-300)' : '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
              cursor: 'pointer',
              color: compared ? '#000' : '#ffffff',
              transition: 'all 0.25s ease'
            }}
            title={t('compare.title') || 'Taqqoslama'}
          >
            <Scale size={14} />
          </button>

          {/* Quick View Button */}
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(watch);
              }}
              style={{
                width: '2.1rem',
                height: '2.1rem',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(8, 10, 14, 0.88)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                cursor: 'pointer',
                color: '#ffffff',
                transition: 'all 0.25s ease'
              }}
              title={t('product.quickView') || 'Tezkor ko‘rish'}
            >
              <Eye size={14} />
            </button>
          )}
        </div>

        {/* Media Container (Image or Realtime 3D Canvas) */}
        <div
          onClick={() => navigate(`/watch/${watch.id}`)}
          style={{
            position: 'relative',
            width: '100%',
            height: '260px',
            overflow: 'hidden',
            cursor: 'pointer',
            backgroundColor: '#0a0b0e',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          {is3DMode ? (
            <div style={{ width: '100%', height: '100%' }} onClick={(e) => e.stopPropagation()}>
              <LuxuryWatchCanvas
                caseColor={watch.threeDConfig?.caseColor || '#d4af37'}
                bezelColor={watch.threeDConfig?.bezelColor || '#d4af37'}
                dialColor={watch.threeDConfig?.dialColor || '#0a0b0e'}
                handColor={watch.threeDConfig?.handColor || '#f7edbf'}
                strapColor={watch.threeDConfig?.strapColor || '#1c130d'}
                isSkeleton={watch.threeDConfig?.isSkeleton || false}
                hasTourbillon={watch.threeDConfig?.hasTourbillon || false}
                metalness={watch.threeDConfig?.metalness ?? 0.9}
                roughness={watch.threeDConfig?.roughness ?? 0.15}
                autoRotate={true}
                enableZoom={false}
                floating={true}
                fov={38}
                className="w-full h-full"
              />
              <div
                className="glass-pill"
                style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.65rem',
                  color: 'var(--color-gold-400)',
                  padding: '0.2rem 0.5rem',
                  pointerEvents: 'none'
                }}
              >
                3D WebGL View
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              <img
                src={watch.images?.[0] || 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?auto=format&fit=crop&w=1200&q=80'}
                alt={watch.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?auto=format&fit=crop&w=1200&q=80';
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div style={{ padding: '1.15rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem', minWidth: 0, width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', gap: '0.5rem' }}>
              <span className="badge-gold" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {watch.collection || watch.category}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-gold-400)', flexShrink: 0 }}>
                <Star size={11} fill="currentColor" />
                <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-primary)' }}>{watch.rating}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>({watch.reviewsCount})</span>
              </div>
            </div>

            <Link
              to={`/watch/${watch.id}`}
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block'
              }}
              title={watch.name}
            >
              {watch.name}
            </Link>

            <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0, minHeight: '2rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {watch.tagline || watch.description}
            </p>

            {/* Quick Horology Key Specs Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', paddingTop: '0.25rem' }}>
              <span className="glass-pill" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>
                {watch.movement}
              </span>
              <span className="glass-pill" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>
                {watch.specs?.caseDiameter || '40.0 mm'}
              </span>
              <span className="glass-pill" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>
                {watch.caseMaterial?.split(' ')?.[0] || 'Titanium'}
              </span>
            </div>
          </div>

          {/* Pricing & Add to Cart Action */}
          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginTop: 'auto', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ minWidth: 0, flex: '1 1 auto', overflow: 'hidden' }}>
              <span className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap', display: 'block', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {formatPrice(watch.price)}
              </span>
              {watch.originalPrice && (
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textDecoration: 'line-through', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {formatPrice(watch.originalPrice)}
                </span>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleAddToCart}
              className={justAdded ? 'btn-gold' : 'btn-gold'}
              style={{
                padding: '0.5rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                flexShrink: 0,
                whiteSpace: 'nowrap',
                backgroundColor: justAdded ? 'var(--color-emerald-500)' : undefined,
                color: justAdded ? '#000' : undefined
              }}
            >
              {justAdded ? (
                <>
                  <Check size={14} />
                  <span>Qo‘shildi</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={14} />
                  <span>SAVATGA</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default ProductCard;
