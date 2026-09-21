import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Building2,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Printer,
  Check,
  Smartphone,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { clearCart } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/ordersSlice';
import { formatPriceWithCurrency } from '../store/slices/localeSlice';

export const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const couponCode = useSelector((state) => state.cart.couponCode);
  const discountPercentage = useSelector((state) => state.cart.discountPercentage);
  const { currency, exchangeRates } = useSelector((state) => state.locale);
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth);

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const discountAmount = (subtotal * (discountPercentage || 0)) / 100;
  const total = subtotal - discountAmount;

  const [currentStep, setCurrentStep] = useState('shipping'); // 'shipping' | 'payment' | 'confirmation'
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '+998 ',
    email: currentUser?.email || '',
    city: currentUser?.addresses?.[0]?.city || 'Toshkent shahri',
    address: currentUser?.addresses?.[0]?.address || '',
    paymentMethod: 'Payme',
    cardNumber: '8600 1234 5678 9012',
    cardExpiry: '12/28',
    smsCode: '',
    specialInstructions: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (cartItems.length === 0 && currentStep !== 'confirmation') {
      navigate('/cart');
    }
  }, [cartItems, currentStep, navigate]);

  const validateShipping = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = t('checkout.errFullName') || 'Ism kiritilishi shart';
    if (!formData.phone.trim() || formData.phone.length < 9) errs.phone = t('checkout.errPhone') || 'Telefon raqam kiritilishi shart';
    if (!formData.email.trim()) errs.email = t('checkout.errEmail') || 'Email kiritilishi shart';
    if (!formData.address.trim()) errs.address = t('checkout.errAddress') || 'Manzil kiritilishi shart';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setCurrentStep('payment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderData = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      userId: currentUser?.id || 'guest',
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingCity: formData.city,
      shippingAddress: formData.address,
      paymentMethod: formData.paymentMethod,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl || item.images?.[0],
      })),
      subtotalUSD: subtotal,
      discountUSD: discountAmount,
      totalUSD: total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      dispatch(createOrder(orderData));
      setCompletedOrder(orderData);
      dispatch(clearCart());
      setIsProcessing(false);
      setCurrentStep('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F5D77F', '#E5E4E2', '#FFFFFF'],
        });
      } catch (e) {
        // Confetti fallback
      }
    }, 1200);
  };

  return (
    <div style={{ minHeight: '85vh', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--text-primary)', padding: '2.5rem 1rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {[
            { id: 'shipping', num: '1', label: t('checkout.stepShipping') || 'Yetkazib berish' },
            { id: 'payment', num: '2', label: t('checkout.stepPayment') || 'Xavfsiz To‘lov' },
            { id: 'confirmation', num: '3', label: t('checkout.stepConfirm') || 'Tasdiqlash' },
          ].map((step, idx) => {
            const isActive = currentStep === step.id;
            const isPassed =
              (currentStep === 'payment' && step.id === 'shipping') ||
              (currentStep === 'confirmation' && (step.id === 'shipping' || step.id === 'payment'));

            return (
              <React.Fragment key={step.id}>
                {idx > 0 && (
                  <div style={{ width: '40px', height: '2px', backgroundColor: isPassed ? 'var(--color-gold-400)' : 'var(--border-subtle)' }} />
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: isActive || isPassed ? 'var(--color-gold-400)' : 'rgba(255,255,255,0.05)',
                      color: isActive || isPassed ? 'var(--bg-obsidian-950)' : 'var(--text-muted)',
                      border: '1px solid ' + (isActive || isPassed ? 'var(--color-gold-400)' : 'var(--border-subtle)')
                    }}
                  >
                    {isPassed ? <Check size={14} /> : step.num}
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--color-gold-300)' : 'var(--text-muted)' }}>
                    {step.label}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* STEP 1 & 2: SHIPPING / PAYMENT GRID */}
        {currentStep !== 'confirmation' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Left Column: Form Steps */}
            <div>
              {currentStep === 'shipping' && (
                <form onSubmit={handleProceedToPayment} className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-3xl)', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--border-gold-subtle)' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', margin: 0, color: 'var(--text-primary)' }}>
                    {t('checkout.shippingDetails') || 'Yetkazib berish ma’lumotlari'}
                  </h2>

                  <div>
                    <label className="luxury-label">{t('auth.fullName') || 'To‘liq ismingiz *'}</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Alisher Navoiy"
                      className="luxury-input"
                      style={{ width: '100%' }}
                    />
                    {formErrors.fullName && <div style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.fullName}</div>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label className="luxury-label">{t('auth.phone') || 'Telefon *'}</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+998 90 123 45 67"
                        className="luxury-input"
                        style={{ width: '100%' }}
                      />
                      {formErrors.phone && <div style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.phone}</div>}
                    </div>
                    <div>
                      <label className="luxury-label">{t('auth.email') || 'Email *'}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="masalan@aura.uz"
                        className="luxury-input"
                        style={{ width: '100%' }}
                      />
                      {formErrors.email && <div style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.email}</div>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label className="luxury-label">{t('auth.city') || 'Shahar'}</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="luxury-input"
                        style={{ width: '100%' }}
                      >
                        <option value="Toshkent shahri">Toshkent shahri</option>
                        <option value="Samarqand">Samarqand</option>
                        <option value="Buxoro">Buxoro</option>
                        <option value="Farg‘ona">Farg‘ona</option>
                        <option value="Andijon">Andijon</option>
                        <option value="Namangan">Namangan</option>
                        <option value="Navoiy">Navoiy</option>
                      </select>
                    </div>
                    <div>
                      <label className="luxury-label">{t('auth.address') || 'Manzil *'}</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Ko‘cha, uy raqami"
                        className="luxury-input"
                        style={{ width: '100%' }}
                      />
                      {formErrors.address && <div style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.address}</div>}
                    </div>
                  </div>

                  <div>
                    <label className="luxury-label">{t('checkout.notes') || 'Kuryer yoki maxsus ko‘rsatmalar'}</label>
                    <textarea
                      rows={2}
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                      placeholder="Masalan: VIP xavfsiz qutida keltirilsin..."
                      className="luxury-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gold"
                    style={{ padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
                  >
                    <span>{t('checkout.continuePayment') || 'To‘lovga o‘tish'}</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}

              {currentStep === 'payment' && (
                <form onSubmit={handleCompleteOrder} className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-3xl)', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--border-gold-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', margin: 0, color: 'var(--text-primary)' }}>
                      {t('checkout.selectPayment') || 'To‘lov usulini tanlang'}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setCurrentStep('shipping')}
                      className="btn btn-outline"
                      style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      <ArrowLeft size={13} />
                      <span>{t('common.back') || 'Orqaga'}</span>
                    </button>
                  </div>

                  {/* Payment Method Selector */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    {['Payme', 'Click', 'Visa / MC'].map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                        className={`btn ${formData.paymentMethod === method ? 'btn-gold' : 'btn-outline'}`}
                        style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem', textAlign: 'center' }}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  {/* Mock Card Input */}
                  <div>
                    <label className="luxury-label">{t('checkout.cardNumber') || 'Karta raqami'}</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="luxury-input"
                        style={{ width: '100%', paddingLeft: '2.5rem' }}
                      />
                      <CreditCard size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gold-400)' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label className="luxury-label">{t('checkout.cardExpiry') || 'Amal qilish muddati'}</label>
                      <input
                        type="text"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="luxury-input"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label className="luxury-label">{t('checkout.cvv') || 'CVC / CVV'}</label>
                      <input
                        type="password"
                        defaultValue="777"
                        maxLength={3}
                        className="luxury-input"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', fontSize: '0.75rem', color: 'var(--color-gold-300)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={18} />
                    <span>{t('checkout.secure256') || '256-bit shifrlangan xavfsiz VIP to‘lov shlyuzi'}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn btn-gold"
                    style={{ padding: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{t('checkout.processing') || 'To‘lov amalga oshirilmoqda...'}</span>
                      </>
                    ) : (
                      <>
                        <Lock size={15} />
                        <span>{t('checkout.payNow') || 'To‘lovni tasdiqlash'} ({formatPrice(total)})</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Order Summary Card */}
            <div>
              <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-3xl)', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', margin: 0, color: 'var(--text-primary)' }}>
                  {t('cart.orderSummary') || 'Buyurtma xulosasi'} ({cartItems.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '240px', overflowY: 'auto' }}>
                  {cartItems.map((item) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src={item.imageUrl || item.images?.[0]} alt={item.name} style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                          <div className="text-muted" style={{ fontSize: '0.7rem' }}>{item.quantity || 1} x {formatPrice(item.price)}</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--color-gold-400)', fontSize: '0.8rem' }}>
                        {formatPrice((item.price || 0) * (item.quantity || 1))}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-muted">{t('cart.subtotal') || 'Oraliq summa'}:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                      <span>{t('cart.discount') || 'Chegirma'} ({discountPercentage}%):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-muted">{t('cart.shipping') || 'VIP Yetkazish'}:</span>
                    <span style={{ color: '#34d399', fontWeight: 600 }}>{t('common.free') || 'Bepul (VIP)'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-gold-400)' }}>
                    <span>{t('cart.total') || 'Jami to‘lov'}:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMATION / SUCCESS */}
        {currentStep === 'confirmation' && completedOrder && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel"
            style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-3xl)', maxWidth: '640px', margin: '0 auto', textAlign: 'center', border: '1px solid var(--border-gold-subtle)', boxShadow: 'var(--shadow-gold)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
          >
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
              <CheckCircle2 size={32} />
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {t('checkout.orderSuccessTitle') || 'Xaridingiz uchun tashakkur!'}
              </h2>
              <p className="text-muted" style={{ fontSize: '0.85rem', margin: '0.5rem 0 0 0' }}>
                {t('checkout.orderSuccessDesc') || 'Sizning buyurtmangiz muvaffaqiyatli qabul qilindi va mutaxassislarimiz uni tayyorlashga kirishdilar.'}
              </p>
            </div>

            <div className="glass-panel" style={{ width: '100%', padding: '1.25rem', borderRadius: 'var(--radius-xl)', textAlign: 'left', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">{t('checkout.orderNumber') || 'Buyurtma raqami'}:</span>
                <span style={{ color: 'var(--color-gold-400)', fontWeight: 700 }}>#{completedOrder.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">{t('checkout.customer') || 'Mijoz'}:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{completedOrder.customerName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">{t('checkout.paidAmount') || 'To‘langan summa'}:</span>
                <span style={{ color: 'var(--color-gold-400)', fontWeight: 700 }}>{formatPrice(completedOrder.totalUSD)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/profile" className="btn btn-gold" style={{ padding: '0.6rem 1.5rem', textDecoration: 'none' }}>
                {t('profile.viewOrders') || 'Buyurtmalarimga o‘tish'}
              </Link>
              <Link to="/catalog" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', textDecoration: 'none' }}>
                {t('checkout.continueShopping') || 'Xaridni davom ettirish'}
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default CheckoutPage;
