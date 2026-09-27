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
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';

import { selectCartTotalCount, toggleCartDrawer, addToCart } from '../../store/slices/cartSlice';
import { selectWishlistItems, toggleWishlistDrawer } from '../../store/slices/wishlistSlice';
import { selectCompareItems, setCompareModalOpen, toggleCompareModal } from '../../store/slices/compareSlice';
import { setLanguage, toggleCurrency, toggleTheme, formatPriceWithCurrency } from '../../store/slices/localeSlice';
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
  const { language, currency, theme, exchangeRates } = useSelector((state) => state.locale);
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
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.caseMaterial && p.caseMaterial.toLowerCase().includes(q)) ||
          (p.movement && p.movement.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.collection && p.collection.toLowerCase().includes(q))
        );
      })
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
      <div
        className="bg-obsidian-900 border-b border-platinum-subtle"
        style={{
          background: 'var(--bg-obsidian-900)',
          borderBottom: '1px solid var(--border-platinum-subtle)',
          padding: '0.4rem 0.75rem',
          textAlign: 'center',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-platinum-300)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          lineHeight: 1.3
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-gold-400)', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '90vw' }}>
          O‘zbekiston bo‘ylab bepul inkassator yetkazib berish va 5 yillik kafolat
        </span>
        <span className="hide-on-mobile" style={{ opacity: 0.4 }}>|</span>
        <span className="hide-on-mobile" style={{ color: 'var(--color-gold-400)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <Sparkles size={12} />
          <span>Promokod: <strong style={{ color: '#ffffff' }}>AURA10</strong> (-10% VIP)</span>
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="brand-logo-icon">
              <Clock size={20} />
            </div>
            <div>
              <span className="brand-logo-text">CHRONOS</span>
              <span style={{ display: 'block', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--color-gold-400)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
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
            
            {/* 1. Language Switcher Dropdown (Desktop only) */}
            <div className="relative hide-on-mobile">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="glass-pill"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.65rem', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--color-platinum-200)', cursor: 'pointer', minHeight: '38px' }}
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

            {/* 2. Currency Switcher Button (Desktop only) */}
            <button
              onClick={() => dispatch(toggleCurrency())}
              className="glass-pill hide-on-mobile"
              style={{ padding: '0.4rem 0.65rem', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--color-gold-300)', cursor: 'pointer', minHeight: '38px' }}
              title="Toggle Currency"
            >
              {currency === 'UZS' ? "UZS (so'm)" : currency === 'EUR' ? 'EUR (€)' : 'USD ($)'}
            </button>

            {/* 2.5 Theme Switcher Button (Desktop & Mobile) */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="icon-button"
              title={theme === 'dark' ? "Yorug' rejim (Light Mode)" : "Tungi rejim (Dark Mode)"}
              aria-label="Mavzuni almashtirish"
            >
              {theme === 'dark' ? (
                <Sun size={17} style={{ color: 'var(--color-gold-400)' }} />
              ) : (
                <Moon size={17} style={{ color: 'var(--color-platinum-100)' }} />
              )}
            </button>

            {/* 3. Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="icon-button"
              title="Qidiruv"
            >
              <Search size={17} />
            </button>

            {/* 4. Compare Trigger */}
            <button
              onClick={() => dispatch(setCompareModalOpen(true))}
              className="icon-button hide-on-mobile"
              title="Taqqoslash"
            >
              <Scale size={17} />
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
              <Heart size={17} />
              {wishlistCount > 0 && (
                <span className="badge-count" style={{ background: '#e11d48', color: '#fff' }}>
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
              <ShoppingBag size={17} />
              {totalCartCount > 0 && (
                <span className="badge-count" style={{ background: 'var(--color-gold-400)', color: '#000' }}>
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* 7. User Authentication Dropdown */}
            <div className="relative hide-on-mobile">
              {isAuthenticated ? (
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="icon-button"
                  style={{ borderColor: 'var(--color-gold-400)', color: 'var(--color-gold-300)' }}
                  title="Mening hisobim"
                >
                  <User size={17} />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn-outline-gold"
                  style={{ padding: '0.4rem 0.85rem', minHeight: '38px' }}
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

            {/* 8. Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="icon-button show-on-mobile-flex"
              style={{ borderColor: mobileMenuOpen ? 'var(--color-gold-400)' : 'var(--border-platinum-subtle)' }}
              title="Menyu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} style={{ color: 'var(--color-gold-400)' }} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-nav-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="mobile-nav-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-platinum-subtle)', marginBottom: '1.25rem' }}>
                <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div className="brand-logo-icon" style={{ width: '36px', height: '36px' }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="brand-logo-text" style={{ fontSize: '1.1rem' }}>CHRONOS</span>
                    <span style={{ display: 'block', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--color-gold-400)' }}>Atelier Genève</span>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="icon-button"
                  style={{ minWidth: '40px', minHeight: '40px', width: '40px', height: '40px' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.5rem' }}>
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight size={15} style={{ opacity: isActive ? 1 : 0.4 }} />
                    </Link>
                  );
                })}
              </div>

              {/* Compare Quick Link (Mobile) */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  dispatch(toggleCompareModal(true));
                }}
                className="mobile-nav-link"
                style={{ marginBottom: '1rem', width: '100%', textAlign: 'left', background: 'transparent' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Scale size={16} style={{ color: 'var(--color-gold-400)' }} />
                  <span>{t('compare.title') || 'Taqqoslash'}</span>
                </span>
                {compareCount > 0 && (
                  <span className="badge-count" style={{ position: 'static', background: 'var(--color-amber-500)', color: '#000' }}>
                    {compareCount}
                  </span>
                )}
              </button>

              {/* User Account / Auth Section */}
              <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-xl)' }}>
                {isAuthenticated ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold-400), var(--color-amber-700))', color: '#000', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>
                        {currentUser?.name?.charAt(0) || 'U'}
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-platinum-100)', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {currentUser?.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-gold-400)', fontFamily: 'var(--font-mono)' }}>
                          {currentUser?.email}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isAdmin ? '1fr 1fr' : '1fr', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="btn-glass"
                        style={{ fontSize: '0.75rem', padding: '0.5rem', textAlign: 'center' }}
                      >
                        {t('nav.profile')}
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="btn-glass"
                          style={{ fontSize: '0.75rem', padding: '0.5rem', textAlign: 'center', color: 'var(--color-amber-400)', borderColor: 'rgba(245, 158, 11, 0.4)' }}
                        >
                          ⚡ Admin
                        </Link>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        dispatch(logout());
                        setMobileMenuOpen(false);
                      }}
                      style={{ fontSize: '0.75rem', color: 'var(--color-red-400)', padding: '0.4rem 0', display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
                    >
                      <LogOut size={13} />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-platinum-300)', margin: 0 }}>
                      VIP xaridlar va buyurtmalar tarixini kuzatish uchun kiring:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="btn-gold"
                        style={{ fontSize: '0.75rem', padding: '0.6rem 0.5rem', textAlign: 'center' }}
                      >
                        {t('nav.login')}
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="btn-outline-gold"
                        style={{ fontSize: '0.75rem', padding: '0.6rem 0.5rem', textAlign: 'center' }}
                      >
                        {t('nav.register')}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Language & Currency Controls inside Drawer */}
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-platinum-subtle)' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-platinum-400)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                  Til & Valyuta
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => handleLanguageChange(lng.code)}
                      className="glass-pill"
                      style={{
                        flex: 1,
                        padding: '0.45rem 0.25rem',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        borderColor: (language || i18n.language) === lng.code ? 'var(--color-gold-400)' : 'var(--border-platinum-subtle)',
                        background: (language || i18n.language) === lng.code ? 'rgba(212, 164, 76, 0.2)' : 'transparent',
                        color: (language || i18n.language) === lng.code ? 'var(--color-gold-300)' : 'var(--color-platinum-300)'
                      }}
                    >
                      <span>{lng.flag}</span> <span>{lng.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => dispatch(toggleCurrency())}
                  className="glass-pill"
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    color: 'var(--color-gold-300)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>Valyuta:</span>
                  <strong style={{ color: 'var(--color-platinum-100)' }}>
                    {currency === 'UZS' ? "UZS (so'm)" : currency === 'EUR' ? 'EUR (€)' : 'USD ($)'}
                  </strong>
                </button>

                {/* Theme Mode Toggle in Drawer */}
                <div style={{ marginTop: '0.65rem' }}>
                  <button
                    onClick={() => dispatch(toggleTheme())}
                    className="glass-pill"
                    style={{
                      width: '100%',
                      padding: '0.55rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      color: 'var(--color-platinum-200)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      border: '1px solid var(--border-gold-subtle)'
                    }}
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun size={15} style={{ color: 'var(--color-gold-400)' }} />
                        <span>Yorug‘ rejim (Light Mode)</span>
                      </>
                    ) : (
                      <>
                        <Moon size={15} style={{ color: 'var(--color-gold-600)' }} />
                        <span>Tungi rejim (Dark Mode)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            style={{ alignItems: 'flex-start', paddingTop: '4.5rem', zIndex: 120 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content glass-panel"
              style={{
                maxWidth: '720px',
                padding: '1.5rem',
                borderRadius: 'var(--radius-3xl)',
                border: '1px solid var(--border-gold-medium)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 30px rgba(212, 164, 76, 0.15)',
                background: 'var(--modal-bg, var(--bg-obsidian-900))',
                backdropFilter: 'blur(20px)'
              }}
            >
              {/* Search Bar Input */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-2xl)',
                  backgroundColor: 'var(--glass-pill-bg)',
                  border: '1px solid var(--border-gold-subtle)',
                  gap: '0.75rem'
                }}
              >
                <Search size={22} style={{ color: 'var(--color-gold-400)', flexShrink: 0 }} />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Soat nomi, brendi, materiali yoki mexanizmi bo‘yicha qidiring..."
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--color-platinum-100)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-platinum-300)',
                      cursor: 'pointer'
                    }}
                    title="Tozalash"
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  onClick={() => setSearchOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-platinum-400)',
                    cursor: 'pointer',
                    padding: '0.25rem'
                  }}
                  title="Yopish"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Quick Tags / Trending Filters */}
              <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-gold-400)', fontFamily: 'var(--font-mono)', marginRight: '0.25rem' }}>
                  TEZKOR FILTR:
                </span>
                {['Rolex', 'Tissot', 'Seiko', 'Casio', 'Citizen', 'Turbiyon', 'Titanium', 'Avtomatik'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="glass-pill"
                    style={{
                      padding: '0.25rem 0.65rem',
                      fontSize: '0.72rem',
                      color: searchQuery.toLowerCase() === tag.toLowerCase() ? 'var(--color-gold-400)' : 'var(--color-platinum-300)',
                      borderColor: searchQuery.toLowerCase() === tag.toLowerCase() ? 'var(--color-gold-400)' : 'var(--border-platinum-subtle)',
                      background: searchQuery.toLowerCase() === tag.toLowerCase() ? 'rgba(212, 164, 76, 0.15)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Results Container */}
              <div style={{ marginTop: '1.25rem', maxHeight: '55vh', overflowY: 'auto', paddingRight: '0.25rem' }}>
                {searchQuery.trim() !== '' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0 0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-platinum-400)' }}>
                      Qidiruv natijalari: <strong style={{ color: 'var(--color-gold-300)' }}>{searchResults.length} ta soat topildi</strong>
                    </span>
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-gold-400)',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <span>Katalogda to‘liq ko‘rish</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                )}

                {searchQuery.trim() === '' ? (
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-platinum-400)', marginBottom: '0.75rem', paddingLeft: '0.25rem' }}>
                      🔥 Ommabop modellarni ko‘rish:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {products.slice(0, 4).map((watch) => (
                        <div
                          key={watch.id}
                          onClick={() => {
                            setSearchOpen(false);
                            navigate(`/watch/${watch.id}`);
                          }}
                          className="glass-panel-hover"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.65rem 0.85rem',
                            borderRadius: 'var(--radius-xl)',
                            cursor: 'pointer',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid var(--border-platinum-subtle)',
                            gap: '1rem'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <img
                              src={watch.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'}
                              alt={watch.name}
                              style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-platinum-subtle)', backgroundColor: '#000' }}
                            />
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span className="badge-gold" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>{watch.brand}</span>
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-platinum-100)', margin: 0 }}>{watch.name}</h4>
                              </div>
                              <p style={{ fontSize: '0.72rem', color: 'var(--color-platinum-400)', margin: '0.2rem 0 0 0' }}>
                                {watch.movement} • {watch.caseMaterial}
                              </p>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-gold-400)', fontSize: '0.95rem' }}>
                              {formatPrice(watch.price)}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.68rem', color: 'var(--color-platinum-400)', justifyContent: 'flex-end', marginTop: '0.15rem' }}>
                              <span>Ko‘rish</span>
                              <ArrowRight size={10} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {searchResults.map((watch) => (
                      <div
                        key={watch.id}
                        onClick={() => {
                          setSearchOpen(false);
                          navigate(`/watch/${watch.id}`);
                        }}
                        className="glass-panel-hover"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-xl)',
                          cursor: 'pointer',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-platinum-subtle)',
                          gap: '1rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <img
                            src={watch.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'}
                            alt={watch.name}
                            style={{ width: '52px', height: '52px', objectFit: 'contain', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-platinum-subtle)', backgroundColor: '#000' }}
                          />
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                              <span className="badge-gold" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>{watch.brand}</span>
                              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-platinum-100)', margin: 0 }}>{watch.name}</h4>
                            </div>
                            <p style={{ fontSize: '0.72rem', color: 'var(--color-platinum-400)', margin: '0.2rem 0 0 0' }}>
                              {watch.movement} • {watch.caseMaterial} • {watch.category}
                            </p>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-gold-400)', fontSize: '0.95rem' }}>
                            {formatPrice(watch.price)}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.68rem', color: 'var(--color-platinum-400)', justifyContent: 'flex-end', marginTop: '0.15rem' }}>
                            <span>Batafsil</span>
                            <ArrowRight size={10} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '3rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-platinum-400)' }}>
                      <Search size={22} />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-platinum-200)', margin: 0 }}>
                      "{searchQuery}" bo‘yicha hech qanday soat topilmadi
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-platinum-400)', maxWidth: '320px', margin: 0 }}>
                      Iltimos, so‘rovni boshqacha yozib ko‘ring yoki barcha modellarni ko‘rish uchun katalog sahifasiga o‘ting.
                    </p>
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        navigate('/catalog');
                      }}
                      className="btn-gold"
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem', marginTop: '0.25rem' }}
                    >
                      Barcha Soatlarni Ko‘rish
                    </button>
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
