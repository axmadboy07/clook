import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { UserPlus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { register } from '../store/slices/authSlice';

export const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Toshkent shahri',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const redirectPath = location.state?.from?.pathname || '/profile';

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name.trim()) {
      setErrorMsg(t('auth.enterName') || 'Iltimos, to‘liq ismingizni kiriting!');
      return;
    }
    if (!formData.email.trim() || !validateEmail(formData.email.trim())) {
      setErrorMsg(t('auth.invalidEmail') || 'Iltimos, to‘g‘ri elektron pochta manzilini (email) kiriting!');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setErrorMsg(t('auth.invalidPhone') || 'Iltimos, to‘g‘ri telefon raqamingizni kiriting!');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMsg(t('auth.passwordLength') || 'Parol kamida 6 ta belgidan iborat bo‘lishi shart!');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg(t('auth.passwordsMismatch') || 'Kiritilgan parollar bir-biriga mos kelmadi!');
      return;
    }

    const cleanEmail = formData.email.trim().toLowerCase();
    const existing = users.find(
      (u) => u.email.toLowerCase() === cleanEmail || u.phone === formData.phone.trim()
    );
    if (existing) {
      setErrorMsg(t('auth.userExists') || 'Bu email yoki telefon raqami bilan hisob allaqachon mavjud!');
      return;
    }

    const { confirmPassword, ...dataToSave } = formData;
    dispatch(register(dataToSave));
    setSuccessMsg(t('auth.regSuccess') || "Muvaffaqiyatli ro'yxatdan o'tdingiz! Yo'naltirilmoqda...");
    
    setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 500);
  };

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-panel"
        style={{ width: '100%', maxWidth: '540px', padding: '2.5rem', borderRadius: 'var(--radius-3xl)', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid var(--border-gold-subtle)', boxShadow: 'var(--shadow-gold)' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-400)' }}>
            <UserPlus size={22} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {t('nav.register') || 'Ro‘yxatdan o‘tish'}
          </h2>
          <p className="text-muted" style={{ fontSize: '0.8rem', margin: 0 }}>
            {t('auth.regSubtitle') || 'CHRONOS Haute Horlogerie a’zolari klubiga qo‘shiling'}
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

        {/* Form */}
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="luxury-label">{t('auth.fullName') || 'To‘liq ism-sharifingiz *'}</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ismingizni kiriting"
              className="luxury-input"
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '0.75rem' }}>
            <div>
              <label className="luxury-label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                {t('auth.email') || 'Email manzil *'}
              </label>
              <input
                type="email"
                required
                autoCapitalize="none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="masalan@aura.uz"
                className="luxury-input"
              />
            </div>
            <div>
              <label className="luxury-label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                {t('auth.phone') || 'Telefon raqam *'}
              </label>
              <input
                type="tel"
                required
                inputMode="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+998 90 123 45 67"
                className="luxury-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '0.75rem' }}>
            <div>
              <label className="luxury-label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                {t('auth.city') || 'Shahar / Viloyat'}
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="luxury-input"
              >
                <option value="Toshkent shahri">Toshkent shahri</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Buxoro">Buxoro</option>
                <option value="Farg‘ona">Farg‘ona</option>
                <option value="Andijon">Andijon</option>
                <option value="Namangan">Namangan</option>
                <option value="Xorazm">Xorazm</option>
                <option value="Navoiy">Navoiy</option>
                <option value="Qashqadaryo">Qashqadaryo</option>
                <option value="Surxondaryo">Surxondaryo</option>
                <option value="Jizzax">Jizzax</option>
                <option value="Sirdaryo">Sirdaryo</option>
                <option value="Qoraqalpog‘iston">Qoraqalpog‘iston</option>
              </select>
            </div>
            <div>
              <label className="luxury-label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                {t('auth.address') || 'Yetkazish manzili *'}
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Amir Temur shox ko‘chasi, 14-uy"
                className="luxury-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '0.75rem' }}>
            <div>
              <label className="luxury-label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                {t('auth.password') || 'Maxfiy parol *'}
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Kamida 6 belgi"
                className="luxury-input"
              />
            </div>
            <div>
              <label className="luxury-label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                {t('auth.confirmPassword') || 'Parolni tasdiqlang *'}
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Parolni qayta tering"
                className="luxury-input"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-gold"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <span>{t('nav.register') || 'Ro‘yxatdan o‘tish'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <span>{t('auth.haveAccount') || 'Profilingiz bormi?'} </span>
          <Link to="/login" style={{ color: 'var(--color-gold-400)', fontWeight: 600, textDecoration: 'none' }}>
            {t('nav.login') || 'Kirish'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default RegisterPage;
