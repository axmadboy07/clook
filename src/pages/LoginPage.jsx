import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { login } from '../store/slices/authSlice';

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const redirectPath = location.state?.from?.pathname || '/profile';

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg(t('auth.fillAllFields') || 'Iltimos, email/telefon va parolni kiriting!');
      return;
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const user = users.find(
      (u) =>
        (u.email.toLowerCase() === cleanIdentifier || u.phone === cleanIdentifier) &&
        u.password === password
    );

    if (!user) {
      setErrorMsg(t('auth.invalidCredentials') || 'Email/telefon yoki parol noto‘g‘ri!');
      return;
    }

    if (user.isBanned) {
      setErrorMsg(t('auth.bannedAccount') || 'Sizning hisobingiz bloklangan. Administrator bilan bog‘laning.');
      return;
    }

    dispatch(login({ emailOrPhone: cleanIdentifier, password }));
    setSuccessMsg(t('auth.loginSuccess') || 'Tizimga muvaffaqiyatli kirdingiz! Yo‘naltirilmoqda...');
    
    setTimeout(() => {
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(redirectPath, { replace: true });
      }
    }, 400);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-panel"
        style={{ width: '100%', maxWidth: '440px', padding: 'clamp(1.5rem, 6vw, 2.5rem)', borderRadius: 'var(--radius-3xl)', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--border-gold-subtle)', boxShadow: 'var(--shadow-gold)' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-400)' }}>
            <Lock size={22} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {t('nav.login') || 'Kirish'}
          </h2>
          <p className="text-muted" style={{ fontSize: '0.8rem', margin: 0 }}>
            {t('auth.loginSubtitle') || 'CHRONOS shaxsiy kabinetingizga kiring'}
          </p>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', fontSize: '0.8rem', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', color: '#34d399', fontSize: '0.8rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="luxury-label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              {t('auth.emailOrPhone') || 'Email yoki Telefon raqam'}
            </label>
            <input
              type="text"
              required
              autoCapitalize="none"
              autoCorrect="off"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="masalan@aura.uz yoki +998 90 123 45 67"
              className="luxury-input"
            />
          </div>

          <div>
            <label className="luxury-label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              {t('auth.password') || 'Maxfiy parol'}
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="luxury-input"
            />
          </div>

          <button
            type="submit"
            className="btn btn-gold tap-target-44"
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', minHeight: '44px' }}
          >
            <span>{t('nav.login') || 'Kirish'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)' }}>
          <span>{t('auth.noAccount') || 'Hisobingiz yo‘qmi?'} </span>
          <Link to="/register" style={{ color: 'var(--color-gold-400)', fontWeight: 600, textDecoration: 'none', display: 'inline-block', padding: '0.25rem 0.5rem' }}>
            {t('nav.register') || 'Ro‘yxatdan o‘tish'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default LoginPage;
