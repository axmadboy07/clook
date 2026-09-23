import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { login } from '../../store/slices/authSlice';

export const AdminLoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('admin@chronos.uz');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const actionResult = dispatch(login({ email, password }));
    if (actionResult.payload && actionResult.payload.success) {
      if (actionResult.payload.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(t('admin.loginNoPermission') || 'Admin huquqi yo‘q');
      }
    } else {
      setErrorMsg(actionResult.payload?.message || 'Login yoki parol xato');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-obsidian-950)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '28rem',
          padding: '2.5rem',
          borderRadius: 'var(--radius-3xl)',
          border: '1px solid var(--border-gold-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          backgroundColor: 'rgba(10, 11, 14, 0.9)'
        }}
      >
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: 'var(--radius-2xl)', backgroundColor: 'rgba(212,175,55,0.15)', border: '1px solid var(--color-gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-300)', boxShadow: 'var(--shadow-gold-glow)' }}>
            <ShieldCheck size={28} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {t('admin.loginPortalTitle') || 'Executive Command'}
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-gold-400)', margin: 0 }}>
            {t('admin.loginPortalSubtitle') || 'CHRONOS Boshqaruv Markazi'}
          </p>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--color-ruby-400)', fontSize: '0.75rem', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t('admin.loginEmailLabel') || 'Admin Email'}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="luxury-input"
              style={{ padding: '0.65rem 0.85rem', fontSize: '0.8rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t('admin.loginPasswordLabel') || 'Xavfsizlik Kaliti'}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="luxury-input"
              style={{ padding: '0.65rem 0.85rem', fontSize: '0.8rem' }}
            />
          </div>

          <button
            type="submit"
            className="btn-gold"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
          >
            <span>{t('admin.loginBtn') || 'Kirish'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontSize: '0.75rem' }}>
          <Link to="/" style={{ color: 'var(--color-gold-400)', textDecoration: 'none' }}>
            {t('admin.loginBackToStore') || 'Do‘konga qaytish'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
