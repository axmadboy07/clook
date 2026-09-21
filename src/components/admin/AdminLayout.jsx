import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  MessageSquare,
  LogOut,
  ExternalLink,
  Clock,
  Menu,
  X,
  Bell,
  ChevronDown,
  Sparkles,
  ChevronLeft,
  Trash2,
  CheckCheck
} from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { toggleCurrency, setLanguage } from '../../store/slices/localeSlice';
import { deleteNotification, clearAllNotifications, markAllAsRead } from '../../store/slices/notificationsSlice';

export const AdminLayout = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentCurrency = useSelector((state) => state.locale.currency);
  const notifications = useSelector((state) => state.notifications.items);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const languages = [
    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const currentLangObj = languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    dispatch(setLanguage(code));
    setLangDropdown(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const navItems = [
    { label: t('admin.dashboard') || 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { label: t('admin.products') || 'Mahsulotlar', icon: <Package size={20} />, path: '/admin/products' },
    { label: t('admin.orders') || 'Buyurtmalar', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { label: t('admin.users') || 'Foydalanuvchilar', icon: <Users size={20} />, path: '/admin/users' },
    { label: t('admin.reviews') || 'Sharhlar', icon: <MessageSquare size={20} />, path: '/admin/reviews' },
  ];

  return (
    <div className="admin-layout" style={{ height: '100vh', width: '100vw', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
      
      {/* Desktop Animated Sidebar */}
      <aside
        style={{
          width: sidebarCollapsed ? '5rem' : '17rem',
          padding: sidebarCollapsed ? '1rem 0.5rem' : '1.5rem',
          backgroundColor: 'rgba(10, 11, 14, 0.95)',
          borderRight: '1px solid var(--border-gold-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'width 0.3s ease, padding 0.3s ease',
          zIndex: 30,
          flexShrink: 0
        }}
        className="admin-desktop-sidebar"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Logo Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <Link 
              to="/admin/dashboard" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', position: 'relative' }}
            >
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gold-400)', background: 'radial-gradient(circle at center, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-gold-glow)' }}>
                <Clock size={20} style={{ color: 'var(--color-gold-400)' }} />
              </div>
              
              {!sidebarCollapsed && (
                <div style={{ overflow: 'hidden' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.2em', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', textTransform: 'uppercase' }}>
                    CHRONOS
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-amber-400)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.25rem', textTransform: 'uppercase' }}>
                    <Sparkles size={10} />
                    <span>ADMIN CENTRAL</span>
                  </span>
                </div>
              )}
            </Link>

            {!sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="btn-glass tap-target-44"
                style={{ width: '2.5rem', height: '2.5rem', padding: 0, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Sidebar-ni yopish"
              >
                <ChevronLeft size={16} />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`btn-glass ${isActive ? 'active-filter' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    gap: sidebarCollapsed ? 0 : '0.75rem',
                    padding: sidebarCollapsed ? '0.75rem 0' : '0.75rem 1rem',
                    borderRadius: 'var(--radius-xl)',
                    textDecoration: 'none',
                    borderColor: isActive ? 'var(--color-gold-400)' : 'transparent',
                    backgroundColor: isActive ? 'rgba(212,175,55,0.15)' : 'transparent',
                    color: isActive ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span style={{ color: isActive ? 'var(--color-gold-400)' : 'inherit', display: 'flex' }}>
                    {item.icon}
                  </span>

                  {!sidebarCollapsed && (
                    <span style={{ fontSize: '0.8rem', fontWeight: isActive ? 700 : 500, whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Quick Controls & User Profile */}
        <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link
            to="/"
            target="_blank"
            className="btn-glass"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'space-between',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              fontSize: '0.75rem'
            }}
            title={sidebarCollapsed ? (t('admin.goToStore') || 'Do‘konga o‘tish') : undefined}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ExternalLink size={15} />
              {!sidebarCollapsed && <span>{t('admin.goToStore') || 'Do‘konga o‘tish'}</span>}
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="btn-glass"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              gap: '0.5rem',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-ruby-400)',
              fontSize: '0.75rem'
            }}
            title={sidebarCollapsed ? (t('admin.logout') || 'Chiqish') : undefined}
          >
            <LogOut size={16} />
            {!sidebarCollapsed && <span>{t('admin.logout') || 'Chiqish'}</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-nav-backdrop"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-nav-drawer"
              style={{
                width: '80vw',
                maxWidth: '300px',
                backgroundColor: 'var(--bg-obsidian-900)',
                borderRight: '1px solid var(--border-gold-subtle)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 100
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(212,175,55,0.1)' }}>
                      <Clock size={18} style={{ color: 'var(--color-gold-400)' }} />
                    </div>
                    <div>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.15em' }}>CHRONOS</span>
                      <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--color-amber-400)' }}>EXECUTIVE ADMIN</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="tap-target-44 btn-glass"
                    style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-full)' }}
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`btn-glass tap-target-44 ${isActive ? 'active-filter' : ''}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-xl)',
                          textDecoration: 'none',
                          color: isActive ? 'var(--color-gold-300)' : 'var(--text-secondary)',
                          backgroundColor: isActive ? 'rgba(212,175,55,0.15)' : 'transparent',
                          borderColor: isActive ? 'var(--color-gold-400)' : 'transparent'
                        }}
                      >
                        <span style={{ color: isActive ? 'var(--color-gold-400)' : 'inherit' }}>{item.icon}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <Link
                  to="/"
                  target="_blank"
                  className="btn-glass tap-target-44"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-lg)', textDecoration: 'none', fontSize: '0.8rem' }}
                >
                  <ExternalLink size={16} />
                  <span>{t('admin.goToStore') || 'Do‘konga o‘tish'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-glass tap-target-44"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-lg)', color: 'var(--color-ruby-400)', fontSize: '0.8rem' }}
                >
                  <LogOut size={16} />
                  <span>{t('admin.logout') || 'Chiqish'}</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Admin Content Viewport */}
      <div className="admin-content-viewport" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%', overflow: 'hidden' }}>
        
        {/* Top Floating Glass Header */}
        <header
          className="admin-header"
          style={{
            padding: '0.75rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(10, 11, 14, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            zIndex: 20,
            minHeight: '64px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Mobile menu trigger (Mobile only <= 1024px) */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="btn-glass tap-target-44 admin-mobile-menu-btn"
              style={{ width: '44px', height: '44px', padding: 0, borderRadius: 'var(--radius-lg)', alignItems: 'center', justifyContent: 'center' }}
              title="Menu"
            >
              <Menu size={18} />
            </button>

            {/* Desktop collapse trigger (Desktop only > 1024px) */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="btn-glass tap-target-44 admin-desktop-toggle-btn"
              style={{ width: '2.5rem', height: '2.5rem', padding: 0, borderRadius: 'var(--radius-lg)', alignItems: 'center', justifyContent: 'center' }}
              title={sidebarCollapsed ? "Sidebar-ni ochish" : "Sidebar-ni yopish"}
            >
              <Menu size={17} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-emerald-400)', flexShrink: 0 }}></span>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, whiteSpace: 'nowrap' }}>
                  CHRONOS COMMAND
                </h2>
                <span className="hidden sm:block" style={{ fontSize: '0.6rem', color: 'var(--color-gold-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {t('admin.systemStatus') || 'Barcha tizimlar faol'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Currency switcher */}
            <button
              onClick={() => dispatch(toggleCurrency())}
              className="btn-glass tap-target-44"
              style={{ minWidth: '44px', height: '44px', padding: '0 0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-300)' }}
            >
              {currentCurrency}
            </button>

            {/* Language Switcher */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="btn-glass tap-target-44"
                style={{ height: '44px', padding: '0 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <span>{currentLangObj.flag}</span>
                <span className="hidden sm:inline">{currentLangObj.code.toUpperCase()}</span>
                <ChevronDown size={12} style={{ transform: langDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              <AnimatePresence>
                {langDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="glass-panel"
                    style={{
                      position: 'absolute',
                      right: 0,
                      marginTop: '0.5rem',
                      width: '8.5rem',
                      padding: '0.25rem',
                      borderRadius: 'var(--radius-lg)',
                      zIndex: 50,
                      border: '1px solid var(--border-gold-subtle)',
                      backgroundColor: 'var(--bg-obsidian-900)'
                    }}
                  >
                    {languages.map((lng) => (
                      <button
                        key={lng.code}
                        onClick={() => changeLanguage(lng.code)}
                        className="tap-target-44"
                        style={{
                          width: '100%',
                          minHeight: '44px',
                          textAlign: 'left',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: 'transparent',
                          border: 'none',
                          color: i18n.language === lng.code ? 'var(--color-gold-400)' : 'var(--text-secondary)',
                          fontWeight: i18n.language === lng.code ? 700 : 400,
                          cursor: 'pointer'
                        }}
                      >
                        <span>{lng.flag}</span>
                        <span>{lng.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="btn-glass tap-target-44"
                style={{ width: '44px', height: '44px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', position: 'relative' }}
                title={t('admin.notifications') || 'Bildirishnomalar'}
              >
                <Bell size={16} />
                {notifications.length > 0 && (
                  <span style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-amber-400)' }}></span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="glass-panel"
                    style={{
                      position: 'absolute',
                      right: 0,
                      marginTop: '0.5rem',
                      width: 'min(92vw, 20rem)',
                      borderRadius: 'var(--radius-xl)',
                      padding: '1rem',
                      zIndex: 50,
                      border: '1px solid var(--border-gold-subtle)',
                      backgroundColor: 'rgba(10, 11, 14, 0.96)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      boxShadow: 'var(--shadow-gold)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{t('admin.notifications') || 'Bildirishnomalar'}</span>
                        <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(212,175,55,0.15)', color: 'var(--color-gold-300)', fontWeight: 700 }}>
                          {notifications.length}
                        </span>
                      </div>

                      {notifications.length > 0 && (
                        <button
                          onClick={() => dispatch(clearAllNotifications())}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-ruby-400)',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.2rem 0.4rem',
                            borderRadius: 'var(--radius-md)'
                          }}
                          title="Barcha xabarlarni o‘chirish"
                        >
                          <Trash2 size={12} />
                          <span>Tozalash</span>
                        </button>
                      )}
                    </div>

                    <div className="admin-table-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '16rem', overflowY: 'auto', paddingRight: '2px' }}>
                      {notifications.length === 0 ? (
                        <div style={{ padding: '1.75rem 0.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <Bell size={24} style={{ margin: '0 auto 0.5rem', color: 'var(--color-gold-400)', opacity: 0.4 }} />
                          <p style={{ margin: 0 }}>Hech qanday bildirishnoma yo‘q</p>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className="glass-panel"
                            style={{
                              padding: '0.65rem 0.75rem',
                              borderRadius: 'var(--radius-lg)',
                              fontSize: '0.75rem',
                              display: 'flex',
                              alignItems: 'flex-start',
                              justifyContent: 'space-between',
                              gap: '0.5rem',
                              border: '1px solid rgba(255,255,255,0.06)'
                            }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0, flex: 1 }}>
                              <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.4, wordBreak: 'break-word' }}>{n.text}</p>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{n.time}</span>
                            </div>
                            <button
                              onClick={() => dispatch(deleteNotification(n.id))}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                padding: '0.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 'var(--radius-sm)',
                                flexShrink: 0
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ruby-400)')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                              title="O‘chirish"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin Profile Pill (Sleek Redesigned Gold Badge) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-gold-subtle)',
                background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.12) 0%, rgba(10, 11, 14, 0.85) 100%)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fce7a4 0%, #d4af37 50%, #8c6d23 100%)',
                  color: '#06070a',
                  fontWeight: 800,
                  fontFamily: 'var(--font-serif)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.45)',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  flexShrink: 0
                }}
              >
                {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="hidden sm:flex" style={{ flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: '0.78rem', color: '#ffffff', lineHeight: 1.2 }}>
                  {currentUser?.name || 'Admin'}
                </span>
                <span style={{ fontSize: '0.62rem', color: 'var(--color-gold-400)', fontWeight: 600, letterSpacing: '0.05em' }}>
                  {t('admin.superAdmin') || 'Bosh Boshqaruvchi'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="admin-main-scroll" style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <Outlet />
        </main>

        {/* Mobile Admin Bottom Navigation Bar */}
        <nav className="admin-mobile-bottom-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-mobile-bottom-nav-item tap-target-44 ${isActive ? 'active' : ''}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AdminLayout;
