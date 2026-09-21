import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  User,
  ShoppingBag,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Package,
  Plus,
  Trash2,
  LogOut,
  Save,
  Lock,
  Mail,
  Phone,
  Check,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Heart,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  CheckCheck
} from 'lucide-react';
import {
  logout,
  updateProfile,
  addAddress,
  deleteAddress,
  setDefaultAddress,
  changePassword
} from '../store/slices/authSlice';
import { addToCart } from '../store/slices/cartSlice';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { formatPriceWithCurrency } from '../store/slices/localeSlice';

export const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, isAuthenticated } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'wishlist' | 'settings'
  const [orderFilter, setOrderFilter] = useState('all');

  // Profile settings state
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Address modal/form state
  const [newAddrCity, setNewAddrCity] = useState('Toshkent');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrTitle, setNewAddrTitle] = useState('Uy');
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  if (!isAuthenticated || !currentUser) {
    return (
      <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel"
          style={{ padding: '2.5rem', borderRadius: 'var(--radius-3xl)', maxWidth: '440px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid var(--border-gold-subtle)', boxShadow: 'var(--shadow-gold)' }}
        >
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: 'var(--color-gold-400)' }}>
            <User size={30} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {t('profile.pleaseLogin') || 'Iltimos, hisobingizga kiring'}
            </h2>
            <p className="text-muted" style={{ fontSize: '0.8rem', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
              {t('profile.loginPrompt') || 'Bespoke soatlaringiz buyurtmalar tarixi, manzillar va profil sozlamalarini boshqarish uchun shaxsiy kabinetingizga kiring.'}
            </p>
          </div>
          <Link
            to="/login"
            className="btn btn-gold"
            style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none' }}
          >
            <span>{t('nav.login') || 'Kirish'}</span>
            <ChevronRight size={14} />
          </Link>
        </motion.div>
      </div>
    );
  }

  const allOrders = orders.filter(
    (order) =>
      order.userId === currentUser.id ||
      order.customerEmail === currentUser.email ||
      order.customerPhone === currentUser.phone
  );

  const filteredOrders = allOrders.filter((order) => {
    if (orderFilter === 'all') return true;
    return order.status === orderFilter || order.orderStatus === orderFilter;
  });

  const totalSpent = allOrders.reduce((sum, order) => sum + (order.totalUSD || order.totalAmountUSD || 0), 0);

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(currentUser.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaving(true);
    dispatch(updateProfile({ name: profileName, phone: profilePhone }));
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 400);
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (currentUser.password && oldPassword !== currentUser.password) {
      setPassError(t('profile.oldPassWrong') || 'Amaldagi parol noto‘g‘ri kiritildi!');
      return;
    }
    if (newPassword.length < 6) {
      setPassError(t('auth.passwordLength') || 'Yangi parol kamida 6 ta belgidan iborat bo‘lishi shart!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError(t('auth.passwordsMismatch') || 'Yangi parollar bir-biriga mos kelmadi!');
      return;
    }

    setIsChangingPass(true);
    dispatch(changePassword({ newPassword }));
    setTimeout(() => {
      setIsChangingPass(false);
      setPassSuccess(t('profile.passSuccess') || 'Parolingiz muvaffaqiyatli yangilandi!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(''), 4000);
    }, 400);
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddrStreet.trim()) return;
    dispatch(addAddress({
      title: newAddrTitle,
      city: newAddrCity,
      address: newAddrStreet,
    }));
    setNewAddrStreet('');
    setShowAddAddr(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '85vh', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--text-primary)', padding: '2.5rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Profile Luxury Header Card */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-3xl)', border: '1px solid var(--border-gold-subtle)', boxShadow: 'var(--shadow-gold)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', border: '2px solid var(--color-gold-400)', boxShadow: 'var(--shadow-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-400)', fontSize: '1.75rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {currentUser.name}
                </h1>
                <span className="status-pill status-delivered" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <ShieldCheck size={12} />
                  <span>{currentUser.role === 'admin' ? 'CHRONOS Director' : 'VIP Connoisseur'}</span>
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.5rem', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Mail size={14} style={{ color: 'var(--color-gold-400)' }} />
                  {currentUser.email}
                </span>
                {currentUser.phone && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Phone size={14} style={{ color: 'var(--color-gold-400)' }} />
                    {currentUser.phone}
                  </span>
                )}
                <button
                  onClick={handleCopyUserId}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}
                  title="ID dan nusxa olish"
                >
                  {copiedId ? <CheckCheck size={13} style={{ color: '#34d399' }} /> : <Copy size={13} />}
                  <span>ID: {currentUser.id?.slice(0, 10)}...</span>
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}
            >
              <LogOut size={14} />
              <span>{t('auth.logout') || 'Chiqish'}</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stat Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-2xl)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(212,175,55,0.1)', color: 'var(--color-gold-400)' }}>
              <ShoppingBag size={22} />
            </div>
            <div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>{t('profile.totalOrders') || 'Jami Buyurtmalar'}</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>{allOrders.length}</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-2xl)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>{t('profile.totalSpent') || 'Xaridlar Qiymati'}</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-gold-400)' }}>{formatPrice(totalSpent)}</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-2xl)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171' }}>
              <Heart size={22} />
            </div>
            <div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>{t('profile.savedItems') || 'Saralangan Soatlar'}</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>{wishlistItems.length}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', overflowX: 'auto' }}>
          {[
            { id: 'orders', label: t('profile.tabOrders') || 'Buyurtmalar tarixi', icon: ShoppingBag, count: allOrders.length },
            { id: 'addresses', label: t('profile.tabAddresses') || 'Yetkazib berish manzillari', icon: MapPin, count: currentUser.addresses?.length || 0 },
            { id: 'wishlist', label: t('profile.tabWishlist') || 'Saralanganlar', icon: Heart, count: wishlistItems.length },
            { id: 'settings', label: t('profile.tabSettings') || 'Profil sozlamalari', icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn ${isActive ? 'btn-gold' : 'btn-outline'}`}
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-full)', backgroundColor: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.1)' }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div>
          {/* TAB: ORDERS */}
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {allOrders.length === 0 ? (
                <div className="glass-panel" style={{ padding: '3.5rem 1.5rem', borderRadius: 'var(--radius-3xl)', textAlign: 'center' }}>
                  <ShoppingBag size={36} style={{ color: 'var(--color-gold-400)', opacity: 0.4, margin: '0 auto 1rem' }} />
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    {t('profile.noOrdersYet') || 'Hozircha buyurtmalar mavjud emas'}
                  </h3>
                  <p className="text-muted" style={{ fontSize: '0.8rem', margin: '0.5rem 0 1.5rem' }}>
                    {t('profile.exploreToOrder') || 'AURA & CHRONOS hashamatli vaqt asarlari katalogini ko‘rib chiqing.'}
                  </p>
                  <Link to="/catalog" className="btn btn-gold" style={{ padding: '0.6rem 1.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{t('nav.catalog') || 'Katalogga o‘tish'}</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                        <div>
                          <span style={{ color: 'var(--color-gold-400)', fontWeight: 700, fontSize: '0.9rem' }}>#{order.id}</span>
                          <span className="text-muted" style={{ fontSize: '0.75rem', marginLeft: '0.75rem' }}>
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '2026'}
                          </span>
                        </div>
                        <div>
                          <span className={`status-pill ${order.status === 'delivered' ? 'status-delivered' : 'status-pending'}`}>
                            {order.status?.toUpperCase() || 'DELIVERED'}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {(order.items || []).map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              {item.imageUrl && (
                                <img src={item.imageUrl} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--border-subtle)' }} />
                              )}
                              <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>{item.quantity || 1} x {formatPrice(item.price)}</div>
                              </div>
                            </div>
                            <div style={{ fontWeight: 600, color: 'var(--color-gold-400)', fontSize: '0.85rem' }}>
                              {formatPrice((item.price || 0) * (item.quantity || 1))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem', fontSize: '0.85rem' }}>
                        <span className="text-muted">{t('profile.orderTotal') || 'Jami to‘lov'}:</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-gold-400)' }}>
                          {formatPrice(order.totalUSD || order.totalAmountUSD || 0)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  {t('profile.savedAddresses') || 'Saqlangan manzillar'}
                </h3>
                <button
                  onClick={() => setShowAddAddr(!showAddAddr)}
                  className="btn btn-gold"
                  style={{ padding: '0.4rem 0.9rem', fontSize: '0.75rem' }}
                >
                  <Plus size={14} />
                  <span>{t('profile.addAddressBtn') || 'Yangi manzil'}</span>
                </button>
              </div>

              {showAddAddr && (
                <form onSubmit={handleAddAddressSubmit} className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--color-gold-500)' }}>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-gold-400)' }}>{t('profile.addNewAddress') || 'Yangi yetkazib berish manzili'}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label className="luxury-label">{t('profile.addressTitle') || 'Nom (masalan: Uy, Ofis)'}</label>
                      <input
                        type="text"
                        required
                        value={newAddrTitle}
                        onChange={(e) => setNewAddrTitle(e.target.value)}
                        className="luxury-input"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label className="luxury-label">{t('profile.city') || 'Shahar'}</label>
                      <input
                        type="text"
                        required
                        value={newAddrCity}
                        onChange={(e) => setNewAddrCity(e.target.value)}
                        className="luxury-input"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="luxury-label">{t('profile.streetAddress') || 'Ko‘cha, xonadon, mo‘ljal'}</label>
                    <input
                      type="text"
                      required
                      value={newAddrStreet}
                      onChange={(e) => setNewAddrStreet(e.target.value)}
                      className="luxury-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button type="button" onClick={() => setShowAddAddr(false)} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>
                      {t('common.cancel') || 'Bekor qilish'}
                    </button>
                    <button type="submit" className="btn btn-gold" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>
                      {t('common.save') || 'Saqlash'}
                    </button>
                  </div>
                </form>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {(currentUser.addresses || []).map((addr) => (
                  <div key={addr.id} className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-2xl)', border: addr.isDefault ? '1px solid var(--color-gold-400)' : '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{addr.title}</span>
                        {addr.isDefault && (
                          <span className="status-pill status-delivered" style={{ fontSize: '0.65rem' }}>
                            {t('profile.default') || 'Asosiy'}
                          </span>
                        )}
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                        <div>{addr.city}</div>
                        <div>{addr.address}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                      {!addr.isDefault && (
                        <button
                          onClick={() => dispatch(setDefaultAddress(addr.id))}
                          className="btn btn-outline"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem' }}
                        >
                          {t('profile.makeDefault') || 'Asosiy qilish'}
                        </button>
                      )}
                      <button
                        onClick={() => dispatch(deleteAddress(addr.id))}
                        className="btn-action-icon btn-action-delete"
                        style={{ marginLeft: 'auto' }}
                        title="O‘chirish"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {wishlistItems.length === 0 ? (
                <div className="glass-panel" style={{ padding: '3.5rem 1.5rem', borderRadius: 'var(--radius-3xl)', textAlign: 'center' }}>
                  <Heart size={36} style={{ color: '#f87171', opacity: 0.4, margin: '0 auto 1rem' }} />
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    {t('profile.emptyWishlist') || 'Saralangan soatlar ro‘yxati bo‘sh'}
                  </h3>
                  <p className="text-muted" style={{ fontSize: '0.8rem', margin: '0.5rem 0 1.5rem' }}>
                    {t('profile.wishlistPrompt') || 'Yoqtirgan eksklyuziv soatlaringizni yurakcha belgisi orqali saqlang.'}
                  </p>
                  <Link to="/catalog" className="btn btn-gold" style={{ padding: '0.6rem 1.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{t('nav.catalog') || 'Katalogga o‘tish'}</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {wishlistItems.map((watch) => (
                    <div key={watch.id} className="glass-panel" style={{ borderRadius: 'var(--radius-2xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                      <img src={watch.imageUrl || watch.images?.[0]} alt={watch.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: '0.75rem' }}>
                        <div>
                          <div className="text-muted" style={{ fontSize: '0.7rem' }}>{watch.brand}</div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{watch.name}</div>
                          <div style={{ color: 'var(--color-gold-400)', fontWeight: 700, fontSize: '1rem', marginTop: '0.25rem' }}>
                            {formatPrice(watch.price)}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => {
                              dispatch(addToCart({ ...watch, quantity: 1 }));
                              dispatch(removeFromWishlist(watch.id));
                            }}
                            className="btn btn-gold"
                            style={{ flex: 1, padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                          >
                            <ShoppingBag size={13} />
                            <span>{t('catalog.addToCart') || 'Savatga'}</span>
                          </button>
                          <button
                            onClick={() => dispatch(removeFromWishlist(watch.id))}
                            className="btn-action-icon btn-action-delete"
                            title="O‘chirish"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {/* Profile Details Form */}
              <form onSubmit={handleSaveProfile} className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={18} style={{ color: 'var(--color-gold-400)' }} />
                  <span>{t('profile.accountDetails') || 'Hisob ma’lumotlari'}</span>
                </h3>

                {saveSuccess && (
                  <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', color: '#34d399', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} />
                    <span>{t('profile.savedSuccess') || 'Ma’lumotlar muvaffaqiyatli saqlandi!'}</span>
                  </div>
                )}

                <div>
                  <label className="luxury-label">{t('auth.fullName') || 'To‘liq ism'}</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="luxury-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label className="luxury-label">{t('auth.phone') || 'Telefon raqam'}</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="luxury-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label className="luxury-label">{t('auth.email') || 'Email manzil'}</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="luxury-input"
                    style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn btn-gold"
                  style={{ alignSelf: 'flex-start', padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
                >
                  <Save size={14} />
                  <span>{isSaving ? (t('common.saving') || 'Saqlanmoqda...') : (t('common.save') || 'Saqlash')}</span>
                </button>
              </form>

              {/* Change Password Form */}
              <form onSubmit={handleChangePasswordSubmit} className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <KeyRound size={18} style={{ color: 'var(--color-gold-400)' }} />
                  <span>{t('profile.changePassword') || 'Parolni o‘zgartirish'}</span>
                </h3>

                {passError && (
                  <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', fontSize: '0.8rem' }}>
                    {passError}
                  </div>
                )}

                {passSuccess && (
                  <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', color: '#34d399', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} />
                    <span>{passSuccess}</span>
                  </div>
                )}

                <div>
                  <label className="luxury-label">{t('profile.oldPassword') || 'Amaldagi parol'}</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showOldPass ? 'text' : 'password'}
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="luxury-input"
                      style={{ width: '100%', paddingRight: '2.5rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPass(!showOldPass)}
                      style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      {showOldPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="luxury-label">{t('profile.newPassword') || 'Yangi parol'}</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="luxury-input"
                      style={{ width: '100%', paddingRight: '2.5rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="luxury-label">{t('auth.confirmPassword') || 'Yangi parolni tasdiqlang'}</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="luxury-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isChangingPass}
                  className="btn btn-gold"
                  style={{ alignSelf: 'flex-start', padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
                >
                  <Lock size={14} />
                  <span>{isChangingPass ? (t('common.saving') || 'O‘zgartirilmoqda...') : (t('profile.updatePasswordBtn') || 'Parolni yangilash')}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
