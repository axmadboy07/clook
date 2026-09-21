import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Gift,
  Lock
} from 'lucide-react';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  toggleVaultPackaging
} from '../store/slices/cartSlice';
import { formatPriceWithCurrency } from '../store/slices/localeSlice';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    items,
    couponCode,
    discountPercentage,
    vaultPackaging
  } = useSelector((state) => state.cart);

  const { currency, exchangeRates } = useSelector((state) => state.locale);
  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);

  const subtotal = items.reduce((sum, item) => sum + item.watch.price * item.quantity, 0);
  const discount = (subtotal * (discountPercentage || 0)) / 100;
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const code = couponInput.trim().toUpperCase();
    if (code === 'AURA10') {
      dispatch(applyCoupon({ code: 'AURA10', percentage: 10 }));
      setCouponMsg({ success: true, message: '10% VIP Courtesy Applied!' });
      setCouponInput('');
    } else if (code === 'ROYAL15') {
      dispatch(applyCoupon({ code: 'ROYAL15', percentage: 15 }));
      setCouponMsg({ success: true, message: '15% Royal Collector Courtesy Applied!' });
      setCouponInput('');
    } else if (code === 'GENEVA20') {
      dispatch(applyCoupon({ code: 'GENEVA20', percentage: 20 }));
      setCouponMsg({ success: true, message: '20% Geneva Patron Courtesy Applied!' });
      setCouponInput('');
    } else {
      setCouponMsg({ success: false, message: 'Invalid or expired invitation code.' });
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', backgroundColor: 'var(--bg-obsidian-950)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '440px', padding: '3rem 2rem', borderRadius: 'var(--radius-3xl)', border: '1px solid var(--border-gold-subtle)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', color: 'var(--color-gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-gold-glow)' }}>
            <ShoppingBag size={36} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
              Your Horology Vault is Empty
            </h2>
            <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Explore our Haute Horlogerie collections and discover bespoke timepieces tailored in 18K solid gold, titanium, and forged carbon.
            </p>
          </div>
          <Link
            to="/catalog"
            className="btn-gold"
            style={{ padding: '0.85rem 2rem', fontSize: '0.75rem', textDecoration: 'none' }}
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-obsidian-950)', padding: '3rem 0 5rem' }}>
      <div className="site-container">
        
        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--border-gold-subtle)', paddingBottom: '1.5rem', marginBottom: '2.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-400)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
              Haute Horlogerie Acquisition
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Your Timepiece Vault ({items.length})
            </h1>
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="btn-glass"
            style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', color: 'var(--color-ruby-400)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <Trash2 size={14} />
            <span>Empty Vault</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {/* Left: Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map((item, index) => (
              <motion.div
                key={`${item.watch.id}-${index}`}
                layout
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-2xl)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', minWidth: '240px' }}>
                  <img
                    src={item.watch.images?.[0]}
                    alt={item.watch.name}
                    style={{ width: '6rem', height: '6rem', objectFit: 'contain', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', flexShrink: 0 }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-gold-400)' }}>
                      {item.watch.collection || item.watch.category}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>
                      {item.watch.name}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.selectedCaseMaterial && <p style={{ margin: 0 }}>Case: {item.selectedCaseMaterial}</p>}
                      {item.selectedStrapMaterial && <p style={{ margin: 0 }}>Strap: {item.selectedStrapMaterial}</p>}
                      {item.customEngraving && (
                        <p style={{ margin: 0, color: 'var(--color-emerald-400)', fontStyle: 'italic' }}>
                          Engraving: "{item.customEngraving}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {/* Quantity Control */}
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-obsidian-950)' }}>
                    <button
                      onClick={() => dispatch(updateQuantity({ index, quantity: item.quantity - 1 }))}
                      className="btn-glass"
                      style={{ padding: '0.35rem 0.6rem', border: 'none' }}
                    >
                      <Minus size={13} />
                    </button>
                    <span style={{ padding: '0 0.75rem', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(updateQuantity({ index, quantity: item.quantity + 1 }))}
                      className="btn-glass"
                      style={{ padding: '0.35rem 0.6rem', border: 'none' }}
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'right' }}>
                    <div className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem' }}>
                      {formatPrice(item.watch.price * item.quantity)}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      {formatPrice(item.watch.price)} each
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => dispatch(removeFromCart(index))}
                    className="btn-glass"
                    style={{ padding: '0.5rem', color: 'var(--color-ruby-400)', borderRadius: '50%' }}
                    title="Remove from vault"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Courier Security Highlights */}
            <div className="glass-pill" style={{ padding: '1.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} style={{ color: 'var(--color-gold-400)' }} />
                <span>Complimentary Armored Courier with Lloyd's of London Underwriting</span>
              </div>
              <span style={{ color: 'var(--color-emerald-400)', fontWeight: 700 }}>100% Insured</span>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-3xl)', border: '1px solid var(--border-gold-subtle)', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'rgba(10, 11, 14, 0.95)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', margin: 0 }}>
                Acquisition Summary
              </h3>

              {/* Complimentary Wooden Vault Packaging */}
              <div
                onClick={() => dispatch(toggleVaultPackaging())}
                className="glass-pill"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  borderColor: vaultPackaging ? 'var(--color-gold-400)' : 'var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Gift size={16} style={{ color: 'var(--color-gold-400)' }} />
                  <span style={{ color: 'var(--text-primary)' }}>Geneva Lacquered Wooden Vault</span>
                </div>
                <span style={{ color: 'var(--color-emerald-400)', fontWeight: 700 }}>FREE</span>
              </div>

              {/* Coupon Code Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  VIP Privilege Invitation Code
                </label>
                {couponCode ? (
                  <div className="glass-pill" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', fontSize: '0.75rem' }}>
                    <span className="gold-gradient-text" style={{ fontWeight: 700 }}>
                      {couponCode} ({discountPercentage}% Courtesy)
                    </span>
                    <button onClick={() => dispatch(removeCoupon())} style={{ background: 'transparent', border: 'none', color: 'var(--color-ruby-400)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.75rem' }}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. AURA10"
                      className="luxury-input"
                      style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.75rem', textTransform: 'uppercase' }}
                    />
                    <button
                      type="submit"
                      className="btn-glass"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', color: 'var(--color-gold-300)' }}
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg && !couponCode && (
                  <p style={{ fontSize: '0.7rem', color: couponMsg.success ? 'var(--color-emerald-400)' : 'var(--color-ruby-400)', margin: 0 }}>
                    {couponMsg.message}
                  </p>
                )}
              </div>

              {/* Cost Calculations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-secondary">Horology Subtotal</span>
                  <span style={{ color: 'var(--text-primary)' }}>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-emerald-400)' }}>
                    <span>VIP Courtesy ({discountPercentage}%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-secondary">Armored Insured Courier</span>
                  <span style={{ color: 'var(--color-emerald-400)', fontWeight: 700 }}>Complimentary</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem' }}>
                  <span style={{ color: 'var(--text-primary)' }}>Total Investment</span>
                  <span className="gold-gradient-text">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="btn-gold"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Lock size={15} />
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
