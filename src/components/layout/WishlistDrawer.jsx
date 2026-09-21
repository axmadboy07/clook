import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

import {
  selectWishlistItems,
  selectIsWishlistDrawerOpen,
  toggleWishlistDrawer,
  removeFromWishlist,
} from '../../store/slices/wishlistSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { formatPriceWithCurrency } from '../../store/slices/localeSlice';

export const WishlistDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const items = useSelector(selectWishlistItems);
  const isWishlistDrawerOpen = useSelector(selectIsWishlistDrawerOpen);
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const handleMoveToVault = (watch) => {
    dispatch(addToCart({ watch, quantity: 1 }));
    dispatch(removeFromWishlist(watch.id));
  };

  return (
    <AnimatePresence>
      {isWishlistDrawerOpen && (
        <div className="drawer-backdrop" onClick={() => dispatch(toggleWishlistDrawer(false))}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={18} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-platinum-100)' }}>
                    {t('wishlist.title')} ({items.length})
                  </h3>
                  <p style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-platinum-400)' }}>
                    CHRONOS Vault
                  </p>
                </div>
              </div>
              <button
                onClick={() => dispatch(toggleWishlistDrawer(false))}
                className="icon-button"
                style={{ minWidth: '44px', minHeight: '44px', width: '44px', height: '44px' }}
                title="Yopish"
              >
                <X size={20} />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="drawer-body">
              {items.length === 0 ? (
                <div style={{ padding: '4rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(244, 63, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f43f5e' }}>
                    <Heart size={28} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-platinum-200)' }}>
                    {t('wishlist.empty')}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-platinum-400)', maxWidth: '240px' }}>
                    {t('wishlist.emptySub')}
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {items.map((watch) => (
                    <motion.div
                      key={watch.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="glass-panel"
                      style={{ padding: '1rem', display: 'flex', gap: '1rem', position: 'relative' }}
                    >
                      <img
                        src={watch.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'}
                        alt={watch.name}
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-platinum-subtle)', flexShrink: 0 }}
                      />

                      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-platinum-100)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '0.5rem' }}>
                            {watch.name}
                          </h4>
                          <button
                            onClick={() => dispatch(removeFromWishlist(watch.id))}
                            style={{ color: 'var(--color-platinum-500)', cursor: 'pointer', padding: '0.2rem' }}
                            title={t('wishlist.remove')}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <p style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-platinum-400)' }}>
                          {watch.collection || watch.category}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                          <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-gold-400)', fontSize: '0.875rem' }}>
                            {formatPrice(watch.price)}
                          </span>

                          <button
                            onClick={() => handleMoveToVault(watch)}
                            className="btn-outline-gold"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.6875rem' }}
                          >
                            <ShoppingBag size={12} />
                            <span>{t('wishlist.addToCart')}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="drawer-footer">
                <button
                  onClick={() => {
                    dispatch(toggleWishlistDrawer(false));
                    navigate('/catalog');
                  }}
                  className="btn-gold"
                  style={{ width: '100%' }}
                >
                  <span>{t('cart.browseBtn')}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
