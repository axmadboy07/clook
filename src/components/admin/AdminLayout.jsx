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
  ChevronLeft
} from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { toggleCurrency, setLanguage } from '../../store/slices/localeSlice';

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
    <div style={{ height: '100vh', width: '100vw', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
      
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
        className="hidden lg:flex"
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
                className="btn-glass"
                style={{ width: '2rem', height: '2rem', padding: 0, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Sidebar-ni yopish"
              >
                <ChevronLeft size={16} />
              </button>
            )}
          </div>

          {/* Navigation Links with Equalized Vertical Spacing */}
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

      {/* Main Admin Content Viewport */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%', overflow: 'hidden' }}>
        
        {/* Top Floating Glass Header */}
        <header
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(10, 11, 14, 0.8)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            zIndex: 20,
            minHeight: '72px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="btn-glass hidden lg:flex"
              style={{ width: '2.25rem', height: '2.25rem', padding: 0, borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={sidebarCollapsed ? "Sidebar-ni ochish" : "Sidebar-ni yopish"}
            >
              <Menu size={17} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-emerald-400)' }}></span>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                  CHRONOS EXECUTIVE COMMAND
                </h2>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-gold-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {t('admin.systemStatus') || 'Barcha tizimlar faol va barqaror'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Currency switcher */}
            <button
              onClick={() => dispatch(toggleCurrency())}
              className="btn-glass"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-300)' }}
            >
              {currentCurrency}
            </button>

            {/* Language Switcher */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="btn-glass"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              >
                <span>{currentLangObj.flag}</span>
                <span>{currentLangObj.code.toUpperCase()}</span>
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
                        style={{
                          width: '100%',
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
                className="btn-glass"
                style={{ padding: '0.5rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}
                title={t('admin.notifications') || 'Bildirishnomalar'}
              >
                <Bell size={16} />
                <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-amber-400)' }}></span>
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
                      width: '18rem',
                      borderRadius: 'var(--radius-xl)',
                      padding: '1rem',
                      zIndex: 50,
                      border: '1px solid var(--border-gold-subtle)',
                      backgroundColor: 'rgba(10, 11, 14, 0.95)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{t('admin.notifications') || 'Bildirishnomalar'}</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--color-gold-400)' }}>{t('admin.newNotifications') || 'Yangi xabarlar'}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '15rem', overflowY: 'auto' }}>
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="glass-panel"
                          style={{ padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-lg)', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}
                        >
                          <p style={{ margin: 0, color: 'var(--text-primary)' }}>{n.text}</p>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin Profile Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingLeft: '0.5rem', borderLeft: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold-500), var(--color-amber-700))', color: '#000', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                AD
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-primary)' }}>{currentUser?.name || 'Admin'}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-gold-400)' }}>{t('admin.superAdmin') || 'Bosh Boshqaruvchi'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main style={{ padding: '1.5rem 2rem', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
