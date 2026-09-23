import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  Search,
  MessageSquare,
  Truck,
  CreditCard,
  ShieldCheck,
  Layers,
  Clock,
  PhoneCall,
  CheckCircle2,
  X
} from 'lucide-react';

export const FAQPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'Barcha Savollar', icon: HelpCircle },
    { id: 'shipping', label: 'Yetkazib Berish', icon: Truck },
    { id: 'payment', label: 'To‘lov & Narxlar', icon: CreditCard },
    { id: 'warranty', label: 'Kafolat & Asillik', icon: ShieldCheck },
    { id: 'customizer', label: '3D Kastomizatsiya', icon: Layers },
  ];

  const faqs = [
    {
      id: 'shipping-time',
      category: 'shipping',
      q: 'O‘zbekiston bo‘ylab yetkazib berish muddati va narxi qanday?',
      a: 'Barcha soatlar O‘zbekiston bo‘ylab (Toshkent va barcha viloyatlar markazlariga) mutlaqo BEPUL yetkazib beriladi. Toshkent shahri ichida 3–24 soat ichida, viloyatlarga esa 24–48 soat ichida maxsus zirhlangan inkassator kuryerlik xizmati orqali xavfsiz yetkaziladi.',
      tag: 'Bepul Inkassator'
    },
    {
      id: 'payment-methods',
      category: 'payment',
      q: 'Qanday to‘lov turlari mavjud va xavfsizlik qanday taʼminlanadi?',
      a: 'Siz buyurtmangiz uchun Payme, Click, Uzcard, Humo, Visa, Mastercard orqali 100% xavfsiz onlayn to‘lashingiz yoki soatni kuryerdan to‘liq tekshirib qabul qilib olganingizdan so‘ng naqd pulda to‘lashingiz mumkin.',
      tag: 'Onlayn / Naqd'
    },
    {
      id: 'authenticity-warranty',
      category: 'warranty',
      q: 'Barcha soatlar 100% originalmi va qanday kafolat beriladi?',
      a: 'Ha, CHRONOS platformasidagi barcha soatlar Shveytsariya, Yaponiya va Germaniyaning rasmiy manifakturalaridan to‘g‘ridan-to‘g‘ri keltiriladi. Har bir soatga xalqaro ishlab chiqaruvchi pasporti, hologrammali seriya raqami va 5 yillik rasmiy servis kafolati taqdim etiladi.',
      tag: '5 Yillik Kafolat'
    },
    {
      id: 'bespoke-3d-engraving',
      category: 'customizer',
      q: '3D Moslashtirish (Bespoke Customizer) va lazerli gravyura qanday ishlaydi?',
      a: 'Siz saytimizda soatning korpusi (18K Sariq Oltin, Pushti Oltin, 5-darajali Titan, Keramika), tasmasi va siferblat rangini real vaqtda 3D ko‘rinishda tanlashingiz mumkin. Shuningdek, soat orqa qopqog‘iga bepul o‘zingizning ismingiz yoki maxsus esdalik yozuvini (30 tagacha belgi) yuqori aniqlikdagi shveysar lazeri bilan o‘yib yozdirishingiz mumkin.',
      tag: 'Individual 3D'
    },
    {
      id: 'guest-checkout',
      category: 'payment',
      q: 'Ro‘yxatdan o‘tmasdan (Guest Checkout) tezkor xarid qilish mumkinmi?',
      a: 'Albatta! Siz ro‘yxatdan o‘tmasdan shunchaki ismingiz, telefon raqamingiz va manzilingizni kiritish orqali 30 soniyada tezkor buyurtma rasmiylashtirishingiz mumkin. Konsyerj xizmatimiz darhol siz bilan bog‘lanadi.',
      tag: 'Tezkor Buyurtma'
    },
    {
      id: 'wrist-sizing',
      category: 'warranty',
      q: 'Soat o‘lchami bilagimga to‘g‘ri kelishini qanday bilsam bo‘ladi?',
      a: 'Har bir soat sahifasida "Virtual Wrist Fitting" (Bilakda sinab ko‘rish) simulyatori mavjud. Slayder orqali bilagingiz aylanasi (15 sm dan 21 sm gacha) va kiyinish uslubingizni tanlab, soat qanday mutanosib turishini oldindan 3D da ko‘rishingiz mumkin.',
      tag: 'Virtual Fit'
    },
    {
      id: 'return-policy',
      category: 'warranty',
      q: 'Soat yoqmasa yoki mos kelmasa qaytarish mumkinmi?',
      a: 'Ha, soat yetkazib berilgan kundan boshlab 14 kun ichida, agar u kiyilmagan va himoya plyonkalari butun holatda bo‘lsa, uni boshqa modelga bepul almashtirishingiz yoki to‘lovni 100% qaytarib olishingiz mumkin.',
      tag: '14 Kun Kafolat'
    }
  ];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch =
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.tag.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--color-platinum-100)', padding: '3.5rem 0 6rem' }}>
      <div className="site-container" style={{ maxWidth: '58rem' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="glass-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.9rem', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--color-gold-300)', borderColor: 'var(--border-gold-subtle)' }}>
            <HelpCircle size={14} style={{ color: 'var(--color-gold-400)' }} />
            <span>YORDAM MARKAZI & SAVOL-JAVOBLAR</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: 'var(--color-platinum-100)' }}>
            Ko‘p Beriladigan <span className="gold-gradient-text">Savollar</span>
          </h1>

          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--color-platinum-400)', maxWidth: '34rem', margin: 0 }}>
            Mijozlarimiz eng ko‘p qiziqadigan yetkazib berish, to‘lovlar, 3D kastomizatsiya va 5 yillik kafolat bo‘yicha batafsil javoblar.
          </p>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '34rem', marginTop: '0.5rem' }}>
            <Search size={16} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gold-400)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Savolingiz bo‘yicha qidiring (masalan: yetkazish, kafolat, Payme, gravyura)..."
              className="luxury-input"
              style={{ paddingLeft: '3rem', paddingRight: searchTerm ? '2.5rem' : '1.25rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-obsidian-900)', fontSize: '0.85rem' }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--color-platinum-400)', cursor: 'pointer' }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`glass-pill ${active ? 'active-filter' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1.15rem',
                  fontSize: '0.78125rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: active ? 600 : 500,
                  borderRadius: 'var(--radius-full)',
                  borderColor: active ? 'var(--color-gold-400)' : 'var(--border-platinum-subtle)',
                  backgroundColor: active ? 'rgba(212, 164, 76, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                  color: active ? 'var(--color-gold-300)' : 'var(--color-platinum-300)',
                  boxShadow: active ? 'var(--shadow-gold-subtle)' : 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <IconComp size={14} style={{ color: active ? 'var(--color-gold-400)' : 'var(--color-platinum-400)' }} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion FAQ List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="glass-panel"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  border: isOpen ? '1px solid var(--border-gold-medium)' : '1px solid var(--border-platinum-subtle)',
                  backgroundColor: isOpen ? 'rgba(16, 18, 25, 0.95)' : 'rgba(12, 14, 19, 0.8)',
                  overflow: 'hidden',
                  transition: 'all var(--transition-normal)'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span className="badge-gold" style={{ fontSize: '0.65rem' }}>{faq.tag}</span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: isOpen ? 'var(--color-gold-300)' : 'var(--color-platinum-100)', lineHeight: 1.35 }}>
                      {faq.q}
                    </span>
                  </div>

                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isOpen ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <ChevronDown
                      size={16}
                      style={{
                        color: isOpen ? 'var(--color-gold-400)' : 'var(--color-platinum-400)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        padding: '0 1.5rem 1.5rem',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-sans)',
                        lineHeight: 1.65,
                        color: 'var(--color-platinum-300)',
                        borderTop: '1px solid var(--border-platinum-subtle)',
                        paddingTop: '1rem'
                      }}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <p style={{ fontSize: '1rem', color: 'var(--color-platinum-400)' }}>
              "{searchTerm}" so‘rovi bo‘yicha javob topilmadi.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              className="btn-outline-gold"
              style={{ marginTop: '1rem' }}
            >
              Barcha savollarni ko‘rsatish
            </button>
          </div>
        )}

        {/* Still Have Questions Banner */}
        <div
          className="glass-panel"
          style={{
            marginTop: '4rem',
            padding: '2.5rem 2rem',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--border-gold-subtle)',
            background: 'linear-gradient(135deg, rgba(212, 164, 76, 0.1) 0%, rgba(10, 11, 15, 0.95) 100%)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold-400), var(--color-gold-600))', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={22} />
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-platinum-100)', margin: 0 }}>
            Boshqa Savolingiz Bormi?
          </h3>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-platinum-300)', maxWidth: '30rem', margin: 0, lineHeight: 1.5 }}>
            Bizning VIP konsyerj jamoamiz 24/7 rejimida istalgan savolingizga javob berishga va eksklyuziv konsultatsiya taqdim etishga tayyor.
          </p>

          <Link
            to="/contact"
            className="btn-gold"
            style={{ marginTop: '0.5rem', padding: '0.85rem 2rem' }}
          >
            <PhoneCall size={15} />
            <span>VIP Konsyerj Bilan Bog‘lanish</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
