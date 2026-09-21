import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  ShoppingBag,
  Heart,
  Search,
  Scale,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Clock,
  User,
  LogOut,
  ArrowRight
} from 'lucide-react';

import { selectCartTotalCount, toggleCartDrawer } from '../../store/slices/cartSlice';
import { selectWishlistItems, toggleWishlistDrawer } from '../../store/slices/wishlistSlice';
import { selectCompareItems, toggleCompareModal } from '../../store/slices/compareSlice';
import { setLanguage, toggleCurrency, formatPriceWithCurrency } from '../../store/slices/localeSlice';
import { logout } from '../../store/slices/authSlice';
import { selectAllProducts } from '../../store/slices/productsSlice';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langDropdown, setLangDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  // Redux state
  const totalCartCount = useSelector(selectCartTotalCount);
  const wishlistItems = useSelector(selectWishlistItems);
  const compareItems = useSelector(selectCompareItems);
  const { currentUser, isAuthenticated, isAdmin } = useSelector((state) => state.auth);
  const { language, currency, exchangeRates } = useSelector((state) => state.locale);
  const products = useSelector(selectAllProducts);

  const wishlistCount = wishlistItems.length;
  const compareCount = compareItems.length;

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (lng) => {
    dispatch(setLanguage(lng));
    setLangDropdown(false);
  };

  const languages = [
    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const currentLangObj = languages.find((l) => l.code === (language || i18n.language)) || languages[0];

  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.catalog'), path: '/catalog' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.faq'), path: '/faq' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Ribbon */}
      <div className="bg-obsidian-900 border-b border-platinum-subtle" style={{ background: 'var(--bg-obsidian-900)', borderBottom: '1px solid var(--border-platinum-subtle)', padding: '0.45rem 1rem', textAlign: 'center', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', color: 'var(--color-platinum-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-gold-400)', display: 'inline-block' }} />
        <span>O‘zbekiston bo‘ylab bepul inkassator yetkazib berish va 5 yillik rasmiy kafolat</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span style={{ color: 'var(--color-gold-400)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <Sparkles size={12} />
          <span>Promokod: <strong style={{ color: '#ffffff' }}>AURA10</strong> (10% VIP chegirma)</span>
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          
          {/* Brand Logo */}
          <Link to="/" className="brand-logo">
            <div className="brand-logo-icon">
              <Clock size={20} />
            </div>
            <div>
              <span className="brand-logo-text">CHRONOS</span>
              <span style={{ display: 'block', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--color-gold-400)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                Haute Horlogerie
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link-item ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="nav-actions">
            
            {/* 1. Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="glass-pill"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.65rem', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--color-platinum-200)', cursor: 'pointer' }}
                title="Select Language"
              >
                <span>{currentLangObj.flag}</span>
                <span>{currentLangObj.code.toUpperCase()}</span>
                <ChevronDown size={12} />
              </button>

              <AnimatePresence>
                {langDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="glass-panel"
                    style={{ position: 'absolute', right: 0, marginTop: '0.5rem', width: '140px', padding: '0.35rem', zIndex: 50, background: 'var(--bg-obsidian-900)' }}
                  >
                    {languages.map((lng) => (
                      <button
                        key={lng.code}
                        onClick={() => handleLanguageChange(lng.code)}
                        style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-sm)', color: language === lng.code ? 'var(--color-gold-400)' : 'var(--color-platinum-300)', background: language === lng.code ? 'rgba(212, 164, 76, 0.1)' : 'transparent', cursor: 'pointer' }}
                      >
                        <span>{lng.flag}</span>
                        <span>{lng.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Currency Switcher Button */}
            <button
              onClick={() => dispatch(toggleCurrency())}
              className="glass-pill"
              style={{ padding: '0.4rem 0.65rem', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--color-gold-300)', cursor: 'pointer' }}
              title="Toggle Currency"
            >
              {currency === 'UZS' ? "UZS (so'm)" : currency === 'EUR' ? 'EUR (€)' : 'USD ($)'}
            </button>

            {/* 3. Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="icon-button"
              title="Qidiruv"
            >
              <Search size={16} />
            </button>

            {/* 4. Compare Trigger */}
            <button
              onClick={() => dispatch(toggleCompareModal(true))}
              className="icon-button"
              title="Taqqoslash"
            >
              <Scale size={16} />
              {compareCount > 0 && (
                <span className="badge-count" style={{ background: 'var(--color-amber-500)' }}>
                  {compareCount}
                </span>
              )}
            </button>

            {/* 5. Wishlist Trigger */}
            <button
              onClick={() => dispatch(toggleWishlistDrawer(true))}
              className="icon-button"
              title="Istaklar ro‘yxati"
            >
              <Heart size={16} />
              {wishlistCount > 0 && (
                <span className="badge-count" style={{ background: '#e11d48' }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* 6. Shopping Cart Trigger */}
            <button
              onClick={() => dispatch(toggleCartDrawer(true))}
              className="icon-button"
              style={{ borderColor: 'var(--border-gold-medium)', color: 'var(--color-gold-300)', background: 'rgba(212, 164, 76, 0.15)' }}
              title="Savat"
            >
              <ShoppingBag size={16} />
              {totalCartCount > 0 && (
                <span className="badge-count" style={{ background: 'var(--color-gold-400)', color: '#000' }}>
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* 7. User Authentication Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="icon-button"
                  style={{ borderColor: 'var(--color-gold-400)', color: 'var(--color-gold-300)' }}
                  title="Mening hisobim"
                >
                  <User size={16} />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn-outline-gold"
                  style={{ padding: '0.4rem 0.85rem' }}
                >
                  <User size={13} />
                  <span>{t('nav.login')}</span>
                </Link>
              )}

              <AnimatePresence>
                {userDropdown && isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="glass-panel"
                    style={{ position: 'absolute', right: 0, marginTop: '0.5rem', width: '200px', padding: '0.5rem', zIndex: 50, background: 'var(--bg-obsidian-900)' }}
                  >
                    <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-platinum-subtle)' }}>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-platinum-100)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {currentUser?.name}
                      </p>
                      <p style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-gold-400)' }}>
                        {currentUser?.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdown(false)}
                      style={{ display: 'block', padding: '0.5rem 0.75rem', fontSize: '0.75rem', color: 'var(--color-platinum-300)' }}
                    >
                      {t('nav.profile')} & {t('nav.orders')}
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setUserDropdown(false)}
                        style={{ display: 'block', padding: '0.5rem 0.75rem', fontSize: '0.75rem', color: 'var(--color-amber-400)', fontWeight: 700 }}
                      >
                        ⚡ {t('nav.adminPanel')}
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        dispatch(logout());
                        setUserDropdown(false);
                      }}
                      style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.75rem', color: 'var(--color-red-400)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                    >
                      <LogOut size={13} />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="icon-button"
              style={{ display: 'none' }}
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      {/* Real-time Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            style={{ alignItems: 'flex-start', paddingTop: '6rem' }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content"
              style={{ maxWidth: '640px', padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-platinum-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                  <Search size={22} style={{ color: 'var(--color-gold-400)', flexShrink: 0 }} />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('filters.search')}
                    style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.125rem' }}
                  />
                </div>
                <button onClick={() => setSearchOpen(false)} style={{ color: 'var(--color-platinum-400)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              {/* Quick Results */}
              <div style={{ marginTop: '1rem', maxHeight: '50vh', overflowY: 'auto' }}>
                {searchQuery.trim() === '' ? (
                  <div style={{ padding: '1.5rem 0', textAlign: 'center', fontSize: '0.875rem' }}>
                    <p style={{ fontStyle: 'italic', color: 'var(--color-platinum-400)', marginBottom: '0.75rem' }}>Trenddagi qidiruvlar</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
                      {['Rolex Daytona', 'Tissot PRX', 'Seiko Diver', 'G-Shock Carbon'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="glass-pill"
                          style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem', color: 'var(--color-gold-300)', cursor: 'pointer' }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((watch) => (
                    <div
                      key={watch.id}
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(`/watch/${watch.id}`);
                      }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'background 0.2s', borderBottom: '1px solid var(--border-platinum-subtle)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                          src={watch.images[0]}
                          alt={watch.name}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-platinum-subtle)' }}
                        />
                        <div>
                          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-platinum-100)' }}>{watch.name}</h4>
                          <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-platinum-400)' }}>{watch.brand} • {watch.caseMaterial}</p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-gold-400)', fontSize: '0.9375rem' }}>
                          {formatPrice(watch.price)}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem', color: 'var(--color-platinum-400)', justifyContent: 'flex-end' }}>
                          <span>Ko‘rish</span>
                          <ArrowRight size={10} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '2rem 0', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-platinum-400)' }}>
                    "{searchQuery}" bo‘yicha soatlar topilmadi.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
