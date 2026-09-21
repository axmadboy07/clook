import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Gift,
  CheckCircle2
} from 'lucide-react';

import {
  selectCartItems,
  selectIsCartDrawerOpen,
  selectCartSubtotal,
  selectCartDiscount,
  selectCartFinalTotal,
  toggleCartDrawer,
  removeFromCart,
  updateQuantity,
  applyDiscount,
} from '../../store/slices/cartSlice';
import { formatPriceWithCurrency } from '../../store/slices/localeSlice';

export const CartDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const items = useSelector(selectCartItems);
  const isCartDrawerOpen = useSelector(selectIsCartDrawerOpen);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectCartDiscount);
  const total = useSelector(selectCartFinalTotal);
  const discountCode = useSelector((state) => state.cart.discountCode);
  const discountPercent = useSelector((state) => state.cart.discountPercent);
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    dispatch(applyDiscount(couponInput));
    if (['CHRONOS10', 'VIP10', 'AURA20', 'AURA10'].includes(couponInput.trim().toUpperCase())) {
      setCouponMessage('Promokod muvaffaqiyatli qo‘llanildi!');
      setCouponInput('');
    } else {
      setCouponMessage('Yaroqsiz promokod!');
    }
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="drawer-backdrop" onClick={() => dispatch(toggleCartDrawer(false))}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(212, 164, 76, 0.15)', color: 'var(--color-gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-platinum-100)' }}>
                    {t('cart.title')} ({items.length})
                  </h3>
                  <p style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-platinum-400)' }}>
                    CHRONOS Vault
                  </p>
                </div>
              </div>
              <button
                onClick={() => dispatch(toggleCartDrawer(false))}
                className="icon-button"
                style={{ minWidth: '44px', minHeight: '44px', width: '44px', height: '44px' }}
                title="Yopish"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Courier & Security Guarantee Banner */}
            <div style={{ background: 'var(--bg-obsidian-950)', padding: '0.6rem 1.5rem', borderBottom: '1px solid var(--border-platinum-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-gold-400)' }}>
                <ShieldCheck size={14} />
                {t('cart.freeShipping')}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-emerald-400)' }}>
                <CheckCircle2 size={12} />
                {t('details.globalWarranty')}
              </span>
            </div>

            {/* Items List */}
            <div className="drawer-body">
              {items.length === 0 ? (
                <div style={{ padding: '4rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(212, 164, 76, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-400)' }}>
                    <ShoppingBag size={28} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-platinum-200)' }}>
                    {t('cart.empty')}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-platinum-400)', maxWidth: '240px' }}>
                    {t('cart.emptySub')}
                  </p>
                  <button
                    onClick={() => {
                      dispatch(toggleCartDrawer(false));
                      navigate('/catalog');
                    }}
                    className="btn-gold"
                    style={{ marginTop: '0.5rem' }}
                  >
                    {t('cart.browseBtn')}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {items.map((item) => (
                    <motion.div
                      key={item.key}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="glass-panel"
                      style={{ padding: '1rem', display: 'flex', gap: '1rem', position: 'relative' }}
                    >
                      {/* Watch thumbnail */}
                      <img
                        src={item.watch?.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'}
                        alt={item.watch?.name}
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-platinum-subtle)', flexShrink: 0 }}
                      />

                      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-platinum-100)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '0.5rem' }}>
                            {item.watch?.name}
                          </h4>
                          <button
                            onClick={() => dispatch(removeFromCart(item.key))}
                            style={{ color: 'var(--color-platinum-500)', cursor: 'pointer', padding: '0.2rem' }}
                            title="O'chirish"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Specs Chosen */}
                        <div style={{ fontSize: '0.6875rem', color: 'var(--color-platinum-400)', fontFamily: 'var(--font-mono)' }}>
                          {item.customConfig?.caseMaterial && (
                            <p><span style={{ color: 'var(--color-gold-400)' }}>Korpus:</span> {item.customConfig.caseMaterial}</p>
                          )}
                          {item.customConfig?.strapMaterial && (
                            <p><span style={{ color: 'var(--color-gold-400)' }}>Tasma:</span> {item.customConfig.strapMaterial}</p>
                          )}
                        </div>

                        {/* Quantity & Price */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-platinum-medium)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-obsidian-950)' }}>
                            <button
                              onClick={() => dispatch(updateQuantity({ key: item.key, quantity: item.quantity - 1 }))}
                              style={{ padding: '0.2rem 0.5rem', color: 'var(--color-platinum-300)', cursor: 'pointer' }}
                            >
                              <Minus size={11} />
                            </button>
                            <span style={{ padding: '0 0.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => dispatch(updateQuantity({ key: item.key, quantity: item.quantity + 1 }))}
                              style={{ padding: '0.2rem 0.5rem', color: 'var(--color-platinum-300)', cursor: 'pointer' }}
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-gold-400)', fontSize: '0.875rem' }}>
                            {formatPrice((item.watch?.price || 0) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {items.length > 0 && (
              <div className="drawer-footer" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Coupon Code Section */}
                <div>
                  {discountCode ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(212, 164, 76, 0.1)', border: '1px solid var(--border-gold-medium)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: 'var(--color-gold-300)' }}>{discountCode} ({discountPercent}% VIP)</span>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Promokod (masalan: AURA10)"
                        className="luxury-input"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.75rem', textTransform: 'uppercase' }}
                      />
                      <button type="submit" className="btn-outline-gold" style={{ padding: '0.45rem 0.85rem' }}>
                        {t('cart.applyCoupon')}
                      </button>
                    </form>
                  )}
                  {couponMessage && !discountCode && (
                    <p style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-amber-400)', marginTop: '0.25rem' }}>
                      {couponMessage}
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-platinum-400)' }}>
                    <span>{t('cart.subtotal')}</span>
                    <span style={{ color: 'var(--color-platinum-100)' }}>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-emerald-400)' }}>
                      <span>{t('cart.discount')} ({discountPercent}%)</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-platinum-400)' }}>
                    <span>{t('cart.shipping')}</span>
                    <span style={{ color: 'var(--color-emerald-400)' }}>0 so'm (Bepul)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700, paddingTop: '0.5rem', borderTop: '1px solid var(--border-platinum-subtle)', color: 'var(--color-platinum-100)' }}>
                    <span>{t('cart.total')}</span>
                    <span style={{ color: 'var(--color-gold-400)' }}>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    onClick={() => {
                      dispatch(toggleCartDrawer(false));
                      navigate('/cart');
                    }}
                    className="btn-glass"
                  >
                    {t('cart.viewVault')}
                  </button>
                  <button
                    onClick={() => {
                      dispatch(toggleCartDrawer(false));
                      navigate('/checkout');
                    }}
                    className="btn-gold"
                  >
                    <span>{t('cart.checkoutBtn')}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
