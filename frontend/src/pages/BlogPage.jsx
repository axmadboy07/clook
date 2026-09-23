import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  User,
  Tag,
  X,
  CheckCircle2,
  Share2,
  Search,
  Bookmark,
  Calendar,
  Eye,
  Award
} from 'lucide-react';

export const BlogPage = () => {
  const { t } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { id: 'All', label: 'Barcha Maqolalar' },
    { id: 'Haute Horlogerie', label: 'Haute Horlogerie' },
    { id: 'Ekspert Maslahati', label: 'Ekspert Maslahati' },
    { id: 'Parvarishlash', label: 'Parvarishlash' },
    { id: 'Tarix & Meros', label: 'Tarix & Meros' },
  ];

  const articles = [
    {
      id: 'tourbillon-mechanics-guide',
      title: 'Flying Tourbillon Qanday Ishlaydi: Gravitatsiyani Yengish Sanʼati',
      excerpt: 'Shveytsariyaning eng murakkab mexanizmi — 60 soniyali uchuvchi turbiyonning yaratilish tarixi va uning zamonaviy soatsozlikdagi ahamiyati.',
      author: 'Antoine de l’Aura',
      authorRole: 'Master Horologist',
      date: '12-Avgust, 2026',
      category: 'Haute Horlogerie',
      readTime: '6 daqiqa',
      views: '4.8k',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        '1801-yilda Abraham-Louis Breguet tomonidan patentlangan',
        'Gravitatsiya ta’sirida balans g‘ildiragidagi noaniqlikni yo‘qotadi',
        'Bir daqiqada o‘z o‘qi atrofida to‘liq 360 daraja aylanadi',
        'Har bir qismi mikroskop ostida qo‘lda silliqlanadi (Anglage)'
      ],
      content: [
        'Mexanik soatlar olamida turbiyon (Tourbillon — fransuzcha «uyurma») eng murakkab va nufuzli mexanizmlardan biri hisoblanadi. U dastlab cho‘ntak soatlarida gravitatsiya kuchi sabab yuzaga keladigan vaqt siljishlarini kompensatsiya qilish uchun yaratilgan.',
        'Klassik turbiyonda balans g‘ildiragi va anker mexanizmi aylanuvchi maxsus karkas (kareta) ichiga joylashtiriladi. Zamonaviy «Flying Tourbillon» (Uchuvchi turbiyon) esa yuqori ko‘prikka ega bo‘lmaganligi sababli, go‘yo havoda muallaq aylanayotgandek ko‘rinadi.',
        'CHRONOS kolleksiyasidagi turbiyon modellar 28,800 vph chastotada ishlaydi va 72 soatlik quvvat zaxirasiga ega. Ushbu soatlar har bir sohibiga nafaqat aniq vaqtni, balki inson dahosining muhandislik cho‘qqisini taqdim etadi.'
      ]
    },
    {
      id: 'original-vs-fake-watches',
      title: 'Haqiqiy Shveytsariya Soatini Qalbaki Modeldan Qanday Farqlash Mumkin?',
      excerpt: 'Mikroskop ostida anglyaj pardozlash, siferblat bosmasi va kalibr chastotasini tekshirish bo‘yicha professional ekspert maslahatlari.',
      author: 'Jean-Marc Vacher',
      authorRole: 'Chief Authentication Specialist',
      date: '28-Iyul, 2026',
      category: 'Ekspert Maslahati',
      readTime: '8 daqiqa',
      views: '7.2k',
      image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Siferblatdagi mikro-tipografiya va bo‘yoq qatlamining tekisligi',
        'Sekund mili harakati (Silliq 8 tebranish / soniya yoki sakrovchi harakat)',
        'Og‘irlik va korpus qotishmasi (316L / 904L zanglamas po‘lat yoki 18K oltin)',
        'Safir oyna (Sapphire Crystal) akslantirishga qarshi qoplamasi'
      ],
      content: [
        'Bugungi kunda soat bozorida replika va qalbaki nusxalar juda ko‘paygan. Biroq, haqiqiy Shveytsariya mahsulotlarini aniqlashning qat’iy mezonlari mavjud.',
        'Birinchi navbatda — sekund mili harakati. Asl mexanik soatlarda sekund mili bir soniyada 6 dan 8 martagacha tebranadi, bu esa unga favqulodda silliq sirg‘alish bag‘ishlaydi. Kvarts soatlarda esa sekund mili soniyasiga bir marta qat’iy sakraydi.',
        'Ikkinchi mezon — og‘irlik va korpus sifati. Asl lyuks soatlarda og‘ir va qimmatbaho metallar, safir oynalar qo‘llaniladi. Oyna yuzasiga tomizilgan suv tomchisi yoyilib ketmasdan bir joyda sharcha bo‘lib turishi uning haqiqiy safir ekanligini tasdiqlaydi.',
        'CHRONOS do‘konidagi barcha soatlar rasmiy xalqaro kafolat pasporti va seriya raqami bilan taqdim etiladi.'
      ]
    },
    {
      id: 'automatic-watch-maintenance',
      title: 'Mexanik va Avtomatik Soatlarga To‘g‘ri G‘amxo‘rlik Qilish Qoidalari',
      excerpt: 'Magnit maydonlaridan himoya qilish, 5 yillik servis moylash va suvga chidamlilik xususiyatlarini saqlash qo‘llanmasi.',
      author: 'Philippe Laurent',
      authorRole: 'Master Restorer',
      date: '04-Iyun, 2026',
      category: 'Parvarishlash',
      readTime: '5 daqiqa',
      views: '3.9k',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Har 4-5 yilda to‘liq profilaktik servis (Overhaul)',
        'Smartfon va noutbuklar yonida magnitlanishdan saqlash',
        'Vaqtni 21:00 dan 03:00 oralig‘ida sanasini qo‘lda o‘zgartirmaslik',
        'Issiq sauna va dushda rezina zichlagichlar zararlanishining oldini olish'
      ],
      content: [
        'Avtomatik soat — bu yuzlab mitti tishli g‘ildiraklar, prujinalar va yoqut toshlar (jewels) uyg‘unligida ishlovchi tirik mexanizm. Uni avloddan-avlodga meros qilib qoldirish uchun bir necha oddiy qoidalarga rioya qilish kifoya.',
        'Kechki soat 21:00 dan 03:00 gacha bo‘lgan vaqt oralig‘ida taqvim (sana) mexanizmi avtomatik ulanish holatida bo‘ladi. Bu vaqtda sanani qo‘lda majburiy burash tishli mexanizmlarni sindirishi mumkin.',
        'Shuningdek, soatni magnit maydonlaridan (kuchli dinamiklar, magnitli sumka qisqichlari) uzoqroq tutish lozim. Magnitlangan soat kutilmaganda juda tez yoki sekin yura boshlaydi. Agar shunday holat yuz bersa, CHRONOS servis markazida demagnetizatsiya qilish mumkin.'
      ]
    },
    {
      id: 'geneva-seal-metrology',
      title: 'Poinçon de Genève: Shveytsariya Sifat Tamg‘asining 12 Qoidasi',
      excerpt: 'Jeneva muhri nima uchun dunyodagi eng qat’iy sifat standarti hisoblanadi va unga erishish uchun qanday 12 talab bajarilishi shart?',
      author: 'Clara Dubois',
      authorRole: 'Horology Historian',
      date: '18-May, 2026',
      category: 'Tarix & Meros',
      readTime: '7 daqiqa',
      views: '5.4k',
      image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        '1886-yildan beri Jeneva kantoni qonuni bilan himoyalangan',
        'Faqat Jeneva kantonida yig‘ilgan va sozlangan kalibrlarga beriladi',
        'Har bir qirrasi 45 gradus burchak ostida sayqallangan (Chamfered)',
        'Aniq yurish va xatolik darajasi 7 kunlik uzluksiz sinovdan o‘tadi'
      ],
      content: [
        'Poinçon de Genève (Jeneva muhri) — soatsozlik dunyosidagi eng nufuzli va qadimiy rasmiy sertifikatdir. U nafaqat mexanizmning aniqligini, balki uning har bir detalining estetik mukammalligini kafolatlaydi.',
        'Ushbu muhrni olish uchun kalibrdagi har bir po‘lat detal qo‘lda pardozlangan bo‘lishi, vintlar boshchasi silliqlangan va faska olingan bo‘lishi shart. Boshqa hech bir sanoat standarti bunday qat’iy talablarni qo‘ymaydi.',
        'CHRONOS atelyesi ushbu ko‘p asrlik an’analarga sodiq qolgan holda, har bir unikal kompozitsiyada mukammallikni ta’minlaydi.'
      ]
    }
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleShare = (e, art) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/blog#' + art.id);
      setCopiedId(art.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--color-platinum-100)', padding: '3.5rem 0 6rem' }}>
      <div className="site-container">
        
        {/* Editorial Header */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="glass-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.9rem', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--color-gold-300)', borderColor: 'var(--border-gold-subtle)' }}>
            <Sparkles size={14} style={{ color: 'var(--color-gold-400)' }} />
            <span>HOROLOGIYA JURNALI & MAQOLALAR</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: 'var(--color-platinum-100)' }}>
            Vaqt Sanʼati & <span className="gold-gradient-text">Ilmi</span>
          </h1>

          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--color-platinum-400)', margin: 0 }}>
            Klassik Shveytsariya soatsozlik sirlari, yuqori murakkablikdagi turbiyon kalibrlari va ekspert maslahatlari to‘plami.
          </p>

          {/* Search Bar */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '32rem', marginTop: '0.5rem' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gold-400)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Maqola mavzusi yoki kalit so‘z bo‘yicha qidiring..."
              className="luxury-input"
              style={{ paddingLeft: '2.75rem', paddingRight: '1rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-obsidian-900)' }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`glass-pill ${active ? 'active-filter' : ''}`}
                style={{
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
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Featured Main Story */}
        {filteredArticles.length > 0 && selectedCategory === 'All' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedArticle(filteredArticles[0])}
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--border-gold-subtle)',
              marginBottom: '3.5rem',
              cursor: 'pointer',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
              background: 'linear-gradient(145deg, rgba(16, 18, 26, 0.95), rgba(10, 11, 15, 0.98))'
            }}
          >
            <div style={{ width: '100%', height: '320px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-platinum-subtle)' }}>
              <img
                src={filteredArticles[0].image}
                alt={filteredArticles[0].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--color-gold-400)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                <span className="badge-gold">{filteredArticles[0].category}</span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-platinum-400)' }}>
                  <Clock size={13} />
                  <span>{filteredArticles[0].readTime}</span>
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-platinum-400)' }}>
                  <Eye size={13} />
                  <span>{filteredArticles[0].views}</span>
                </span>
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 700, lineHeight: 1.25, color: 'var(--color-platinum-100)', margin: 0 }}>
                {filteredArticles[0].title}
              </h2>

              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-platinum-300)', margin: 0 }}>
                {filteredArticles[0].excerpt}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-platinum-subtle)', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold-500), var(--color-gold-700))', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>
                    {filteredArticles[0].author.charAt(0)}
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-platinum-200)' }}>{filteredArticles[0].author}</span>
                    <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--color-gold-400)' }}>{filteredArticles[0].authorRole}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-gold"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.75rem' }}
                >
                  <span>Batafsil o‘qish</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Article Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredArticles.map((art, idx) => (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedArticle(art)}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-platinum-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)'
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--border-gold-medium)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border-platinum-subtle)')}
            >
              <div>
                <div style={{ width: '100%', height: '220px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-platinum-subtle)', marginBottom: '1.25rem' }}>
                  <img
                    src={art.image}
                    alt={art.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span className="badge-gold">{art.category}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', color: 'var(--color-platinum-400)' }}>
                    <Clock size={12} />
                    <span>{art.readTime}</span>
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3, color: 'var(--color-platinum-100)', marginBottom: '0.6rem' }}>
                  {art.title}
                </h3>

                <p style={{ fontSize: '0.8125rem', lineHeight: 1.55, color: 'var(--color-platinum-400)', margin: 0 }}>
                  {art.excerpt}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid var(--border-platinum-subtle)', marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.725rem', color: 'var(--color-platinum-400)' }}>
                  <Calendar size={13} style={{ color: 'var(--color-gold-400)' }} />
                  <span>{art.date}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={(e) => handleShare(e, art)}
                    style={{ padding: '0.35rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: copiedId === art.id ? 'var(--color-emerald-400)' : 'var(--color-platinum-300)', cursor: 'pointer', border: 'none' }}
                    title={copiedId === art.id ? 'Havola nusxalandi!' : 'Ulashish'}
                  >
                    {copiedId === art.id ? <CheckCircle2 size={15} /> : <Share2 size={15} />}
                  </button>

                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78125rem', fontWeight: 600, color: 'var(--color-gold-400)' }}>
                    <span>O‘qish</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ fontSize: '1rem', color: 'var(--color-platinum-400)' }}>
              Ushbu qidiruv bo‘yicha hech qanday maqola topilmadi.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="btn-outline-gold"
              style={{ marginTop: '1rem' }}
            >
              Barcha maqolalarni ko‘rsatish
            </button>
          </div>
        )}
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              backgroundColor: 'rgba(6, 7, 10, 0.88)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '50rem',
                maxHeight: '88vh',
                overflowY: 'auto',
                padding: '2rem',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border-gold-medium)',
                backgroundColor: 'var(--bg-obsidian-900)',
                boxShadow: 'var(--shadow-dark-2xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              {/* Modal Top Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-platinum-subtle)', paddingBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="badge-gold">{selectedArticle.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-platinum-400)' }}>• {selectedArticle.readTime} o‘qish</span>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  style={{ padding: '0.4rem', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: 'var(--color-platinum-200)', border: 'none', cursor: 'pointer' }}
                  title="Yopish"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cover Image */}
              <div style={{ width: '100%', height: '280px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-platinum-subtle)', position: 'relative' }}>
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,7,10,0.85) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', right: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.78125rem' }}>
                  <span style={{ color: 'var(--color-platinum-200)' }}>Muallif: <strong className="gold-gradient-text">{selectedArticle.author}</strong> ({selectedArticle.authorRole})</span>
                  <span style={{ color: 'var(--color-platinum-400)' }}>{selectedArticle.date}</span>
                </div>
              </div>

              {/* Title & Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, lineHeight: 1.25, color: 'var(--color-platinum-100)', margin: 0 }}>
                  {selectedArticle.title}
                </h2>

                {/* Highlights Callout */}
                {selectedArticle.highlights && (
                  <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: 'rgba(212, 164, 76, 0.08)', border: '1px solid var(--border-gold-subtle)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <span style={{ color: 'var(--color-gold-300)', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award size={16} style={{ color: 'var(--color-gold-400)' }} />
                      <span>Ekspert Qaydlari & Xususiyatlar:</span>
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8125rem', color: 'var(--color-platinum-200)' }}>
                      {selectedArticle.highlights.map((h, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <CheckCircle2 size={15} style={{ color: 'var(--color-gold-400)', flexShrink: 0, marginTop: '2px' }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Paragraphs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-platinum-200)' }}>
                  {selectedArticle.content.map((p, i) => (
                    <p key={i} style={{ margin: 0 }}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Bottom Footer Action */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid var(--border-platinum-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-platinum-400)' }}>CHRONOS Haute Horlogerie Journal</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="btn-gold"
                  style={{ padding: '0.65rem 1.5rem', fontSize: '0.78125rem' }}
                >
                  Tushunarli / Yopish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
