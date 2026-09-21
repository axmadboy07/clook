import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Heart,
  Scale,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Sparkles,
  Award,
  Star,
  ChevronRight,
  ArrowRight,
  PenTool,
  Check
} from 'lucide-react';
import { WATCHES } from '../data/watches.js';
import { LuxuryWatchCanvas } from '../components/3d/LuxuryWatchCanvas.jsx';
import { WristSimulatorModal } from '../components/3d/WristSimulatorModal.jsx';
import { ProductCard } from '../components/common/ProductCard.jsx';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { addToCompare, removeFromCompare } from '../store/slices/compareSlice';
import { formatPriceWithCurrency } from '../store/slices/localeSlice';
import { addProductReview } from '../store/slices/productsSlice';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const products = useSelector((state) => state.products.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const compareItems = useSelector((state) => state.compare.items);
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  const watch =
    products.find((w) => w.id === id || (id === 'seiko-prospex-alpinist' && w.id === 'seiko-prospex-master-diver')) ||
    WATCHES.find((w) => w.id === id || (id === 'seiko-prospex-alpinist' && w.id === 'seiko-prospex-master-diver')) ||
    products[0] ||
    WATCHES[0];

  const getMaterialLabel = (mat) => t(`details.materials.${mat}`, { defaultValue: mat });
  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  // Customizer state
  const [selectedCaseMaterial, setSelectedCaseMaterial] = useState(watch?.caseMaterial || '18K Yellow Gold');
  const [selectedStrapMaterial, setSelectedStrapMaterial] = useState(watch?.strapMaterial || 'Alligator Leather');
  const [selectedDialColor, setSelectedDialColor] = useState(watch?.dialColor || 'Obsidian Black');
  const [customEngraving, setCustomEngraving] = useState('');
  const [explodedView, setExplodedView] = useState(false);
  const [wristModalOpen, setWristModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');
  const [justAdded, setJustAdded] = useState(false);

  // Review Form state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(watch?.reviews || []);

  const wishlisted = wishlistItems.some((item) => item.id === watch?.id);
  const compared = compareItems.some((item) => item.id === watch?.id);

  // Reset choices when watch changes
  useEffect(() => {
    if (watch) {
      setSelectedCaseMaterial(watch.caseMaterial);
      setSelectedStrapMaterial(watch.strapMaterial);
      setSelectedDialColor(watch.dialColor);
      setReviewsList(watch.reviews || []);
      setCustomEngraving('');
      setExplodedView(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, watch]);

  const caseColorMap = {
    '18K Yellow Gold': '#d4af37',
    '18K Rose Gold': '#b76e79',
    'Titanium Grade 5': '#8a929e',
    'Stealth Carbon': '#22252a',
    'Midnight Ceramic': '#121417',
    'Platinum 950': '#e2e8f0',
    'Forged Carbon': '#1c2024',
    'Stainless Steel 316L': '#cbd5e1',
    'Resin / Carbon Core Guard': '#1e293b',
  };

  const dialColorMap = {
    'Obsidian Black': '#0a0b0e',
    'Midnight Sun Gold': '#d4af37',
    'Royal Emerald': '#06261c',
    'Deep Ocean Blue': '#0a1931',
    'Crimson Ruby': '#4a0e17',
    'Meteorite Grey': '#475569',
    'Skeleton Crystal': '#0f1117',
  };

  const strapColorMap = {
    'Alligator Leather': '#1c130d',
    'Titanium Link': '#8a929e',
    '18K Gold Bracelet': caseColorMap[selectedCaseMaterial] || '#d4af37',
    'Rubber Sport': '#0f172a',
    'Milanese Mesh': '#94a3b8',
    'Ceramic Link': '#15171d',
  };

  const priceDelta =
    selectedCaseMaterial === '18K Rose Gold'
      ? 2500
      : selectedCaseMaterial === 'Platinum 950'
      ? 8000
      : selectedCaseMaterial === 'Titanium Grade 5'
      ? -3000
      : selectedCaseMaterial === 'Midnight Ceramic'
      ? -2000
      : 0;

  const currentPrice = (watch?.price || 0) + priceDelta;

  const handleAddToCart = () => {
    dispatch(addToCart({
      watch,
      quantity: 1,
      customOptions: {
        caseMaterial: selectedCaseMaterial,
        strapMaterial: selectedStrapMaterial,
        dialColor: selectedDialColor,
        engraving: customEngraving.trim() || undefined,
      }
    }));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment,
      verifiedBuyer: true,
    };
    const updated = [newRev, ...reviewsList];
    setReviewsList(updated);
    dispatch(addProductReview({ productId: watch.id, review: newRev }));
    setReviewModalOpen(false);
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  const relatedWatches = (products.length > 0 ? products : WATCHES)
    .filter((w) => w.id !== watch?.id)
    .slice(0, 3);

  if (!watch) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-obsidian-950)', padding: '2rem 0 5rem' }}>
      {/* Breadcrumb Navigation */}
      <div className="site-container" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t('details.home') || 'Asosiy'}</Link>
          <ChevronRight size={12} />
          <Link to="/catalog" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t('details.collections') || 'To‘plamlar'}</Link>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--color-gold-400)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '18rem' }}>{watch.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="site-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem' }}>
          
          {/* Left: 3D WebGL Realtime Canvas & Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              className="glass-panel"
              style={{
                position: 'relative',
                width: '100%',
                height: '560px',
                borderRadius: 'var(--radius-3xl)',
                border: '1px solid var(--border-gold-subtle)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                background: 'radial-gradient(circle at center, #12141a 0%, #06070a 100%)'
              }}
            >
              {/* Top Status & Explode Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 20, flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.35rem 0.75rem' }}>
                  <Sparkles size={12} />
                  <span>{t('details.realTime3d') || '3D Real-Vaqt'}</span>
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => setWristModalOpen(true)}
                    className="btn-glass"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', color: 'var(--color-gold-300)' }}
                  >
                    <span>{t('details.virtualWristFitting') || 'Virtual Qo‘lga Taqing'}</span>
                  </button>

                  <button
                    onClick={() => setExplodedView(!explodedView)}
                    className={`btn-glass ${explodedView ? 'btn-gold' : ''}`}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.35rem 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      borderColor: explodedView ? 'var(--color-gold-400)' : 'var(--border-subtle)'
                    }}
                  >
                    <Layers size={14} />
                    <span>{explodedView ? (t('details.assembleView') || 'Yig‘ish') : (t('details.explodeCalibre') || 'Qismlarga Ajratish')}</span>
                  </button>
                </div>
              </div>

              {/* Central 3D Canvas */}
              <div style={{ width: '100%', height: '100%', margin: 'auto 0', cursor: 'grab' }}>
                <LuxuryWatchCanvas
                  caseColor={caseColorMap[selectedCaseMaterial] || '#d4af37'}
                  bezelColor={caseColorMap[selectedCaseMaterial] || '#d4af37'}
                  dialColor={dialColorMap[selectedDialColor] || '#0a0b0e'}
                  strapColor={strapColorMap[selectedStrapMaterial] || '#1c130d'}
                  handColor="#f7edbf"
                  isSkeleton={watch.threeDConfig?.isSkeleton || false}
                  hasTourbillon={watch.threeDConfig?.hasTourbillon || false}
                  exploded={explodedView}
                  metalness={watch.threeDConfig?.metalness ?? 0.9}
                  roughness={watch.threeDConfig?.roughness ?? 0.15}
                  autoRotate={false}
                  enableZoom={true}
                  className="w-full h-full"
                />
              </div>

              {/* Bottom Interactive Guidance */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', zIndex: 20 }}>
                <span>{t('details.orbitHint') || 'Sichqoncha yoki barmoq bilan 360° aylantiring'}</span>
                <span className="gold-gradient-text" style={{ fontWeight: 600 }}>{watch.specs?.caliber || 'Calibre Chronos'}</span>
              </div>
            </div>

            {/* Micro Gallery Thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {(watch.images || []).map((img, idx) => (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{ height: '6rem', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <img
                    src={img}
                    alt={`${watch.name} view ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Customization Atelier & Purchasing Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-gold-400)', marginBottom: '0.5rem' }}>
                <span className="badge-gold">{watch.collection || watch.category}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Star size={13} fill="currentColor" />
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{watch.rating}</span>
                  <span style={{ color: 'var(--text-muted)' }}>({reviewsList.length} {t('details.tabReviews') || 'Sharhlar'})</span>
                </div>
              </div>

              <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
                {watch.name}
              </h1>

              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6, marginTop: '0.5rem', margin: 0 }}>
                {watch.description}
              </p>
            </div>

            {/* Price & Stock Card */}
            <div
              className="glass-panel"
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border-gold-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                  {t('details.investment') || 'NARX'}
                </span>
                <div className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '2rem' }}>
                  {formatPrice(currentPrice)}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--color-emerald-400)', fontWeight: 700 }}>
                  <CheckCircle2 size={13} />
                  {watch.stockCount || 5} {t('details.available') || 'dona mavjud'}
                </span>
                <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {t('details.insuredCourier') || 'Sug‘urtalangan yetkazib berish'}
                </span>
              </div>
            </div>

            {/* BESPOKE CUSTOMIZATION CONTROLS */}
            <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border-subtle)' }}>
              
              {/* 1. Case Alloy Selection */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {t('details.selectCase') || 'Korpus metalli:'} <strong className="gold-gradient-text">{getMaterialLabel(selectedCaseMaterial)}</strong>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
                  {['18K Yellow Gold', '18K Rose Gold', 'Titanium Grade 5', 'Midnight Ceramic', 'Platinum 950'].map((mat) => {
                    const active = selectedCaseMaterial === mat;
                    return (
                      <button
                        key={mat}
                        onClick={() => setSelectedCaseMaterial(mat)}
                        className={`btn-glass ${active ? 'active-filter' : ''}`}
                        style={{
                          padding: '0.45rem 0.65rem',
                          fontSize: '0.7rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          borderColor: active ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                          backgroundColor: active ? 'rgba(212,175,55,0.15)' : undefined,
                          color: active ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                        }}
                      >
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: caseColorMap[mat],
                            border: '1px solid rgba(255,255,255,0.3)',
                            flexShrink: 0
                          }}
                        />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{getMaterialLabel(mat)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Dial Color */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {t('details.dialFace') || 'Siferblat rangi:'} <strong className="gold-gradient-text">{getMaterialLabel(selectedDialColor)}</strong>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Obsidian Black', 'Midnight Sun Gold', 'Deep Ocean Blue', 'Royal Emerald', 'Crimson Ruby'].map((col) => {
                    const active = selectedDialColor === col;
                    return (
                      <button
                        key={col}
                        onClick={() => setSelectedDialColor(col)}
                        className={`btn-glass ${active ? 'active-filter' : ''}`}
                        style={{
                          padding: '0.4rem 0.75rem',
                          fontSize: '0.7rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          borderColor: active ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                          backgroundColor: active ? 'rgba(212,175,55,0.15)' : undefined,
                          color: active ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                        }}
                      >
                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: dialColorMap[col]
                          }}
                        />
                        <span>{getMaterialLabel(col)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Strap Material */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {t('details.strapBracelet') || 'Tasma / Bilaguzuk:'} <strong className="gold-gradient-text">{getMaterialLabel(selectedStrapMaterial)}</strong>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Alligator Leather', '18K Gold Bracelet', 'Rubber Sport', 'Milanese Mesh'].map((strap) => {
                    const active = selectedStrapMaterial === strap;
                    return (
                      <button
                        key={strap}
                        onClick={() => setSelectedStrapMaterial(strap)}
                        className={`btn-glass ${active ? 'active-filter' : ''}`}
                        style={{
                          padding: '0.4rem 0.75rem',
                          fontSize: '0.7rem',
                          borderColor: active ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                          backgroundColor: active ? 'rgba(212,175,55,0.15)' : undefined,
                          color: active ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                        }}
                      >
                        <span>{getMaterialLabel(strap)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Personalized Laser Engraving */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <PenTool size={13} style={{ color: 'var(--color-gold-400)' }} />
                  <span>{t('details.laserEngraving') || 'Lazer Gravirovka (Tekin)'}</span>
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={customEngraving}
                  onChange={(e) => setCustomEngraving(e.target.value)}
                  placeholder={t('details.laserPlaceholder') || 'Masalan: INITIALS & DATE (MAX 30 BELGI)'}
                  className="luxury-input"
                  style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.75rem', textTransform: 'uppercase' }}
                />
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {t('details.laserNotice') || 'Orqa safir oynaga lazer bilan o‘yib yoziladi'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => dispatch(toggleWishlist(watch))}
                  className="btn-glass"
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-xl)',
                    borderColor: wishlisted ? 'var(--color-rosegold-400)' : 'var(--border-subtle)',
                    color: wishlisted ? 'var(--color-rosegold-400)' : 'var(--text-secondary)'
                  }}
                  title={wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                >
                  <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>

                <button
                  onClick={() => {
                    if (compared) {
                      dispatch(removeFromCompare(watch.id));
                    } else {
                      dispatch(addToCompare(watch));
                    }
                  }}
                  className="btn-glass"
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-xl)',
                    borderColor: compared ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                    color: compared ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                  }}
                  title={compared ? 'In Comparison' : 'Compare Specifications'}
                >
                  <Scale size={20} />
                </button>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAddToCart}
                  className="btn-gold"
                  style={{
                    flex: 1,
                    padding: '0.85rem 1.5rem',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: justAdded ? 'var(--color-emerald-500)' : undefined,
                    color: justAdded ? '#000' : undefined
                  }}
                >
                  {justAdded ? (
                    <>
                      <Check size={18} />
                      <span>{t('details.addedToVault') || 'Savatga qo‘shildi'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>{t('details.acquire') || 'Savatga Qo‘shish'}</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Guarantees list */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <ShieldCheck size={14} style={{ color: 'var(--color-gold-400)' }} />
                  <span>{t('details.globalWarranty') || '5 Yillik Xalqaro Kafolat'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Award size={14} style={{ color: 'var(--color-gold-400)' }} />
                  <span>{t('details.genevaSeal') || 'Poinçon de Genève Standarti'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="site-container" style={{ marginTop: '4rem' }}>
        <div style={{ borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '2rem' }}>
          <button
            onClick={() => setActiveTab('specs')}
            style={{
              paddingBottom: '1rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'specs' ? '2px solid var(--color-gold-400)' : '2px solid transparent',
              color: activeTab === 'specs' ? 'var(--color-gold-400)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'specs' ? 700 : 400,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            {t('details.tabSpecs') || 'Texnik Parametrlar'}
          </button>

          <button
            onClick={() => setActiveTab('story')}
            style={{
              paddingBottom: '1rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'story' ? '2px solid var(--color-gold-400)' : '2px solid transparent',
              color: activeTab === 'story' ? 'var(--color-gold-400)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'story' ? 700 : 400,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            {t('details.tabStory') || 'Tarix & San’at'}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            style={{
              paddingBottom: '1rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'reviews' ? '2px solid var(--color-gold-400)' : '2px solid transparent',
              color: activeTab === 'reviews' ? 'var(--color-gold-400)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'reviews' ? 700 : 400,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            {t('details.tabReviews') || 'Mijozlar Fikri'} ({reviewsList.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div style={{ padding: '2rem 0' }}>
          {activeTab === 'specs' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                  {t('details.caseAndCrystal') || 'Korpus va Shisha'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                    <span className="text-secondary">{t('details.caseDiameter') || 'Korpus Diametri'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{watch.specs?.caseDiameter || '40.0 mm'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                    <span className="text-secondary">{t('details.caseThickness') || 'Korpus Qalinligi'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{watch.specs?.caseThickness || '12.0 mm'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                    <span className="text-secondary">{t('details.waterResistance') || 'Suv O‘tkazmaslik'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{watch.specs?.waterResistance || '100 m'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                    <span className="text-secondary">{t('details.crystalMaterial') || 'Shisha Turi'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{watch.specs?.crystal || 'Sapphire Crystal'}</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                  {t('details.mechCalibre') || 'Mexanik Kalibr'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                    <span className="text-secondary">{t('details.calibreCode') || 'Kalibr Kodi'}</span>
                    <span className="gold-gradient-text" style={{ fontWeight: 700 }}>{watch.specs?.caliber || 'Swiss Automatic'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                    <span className="text-secondary">{t('details.powerReserve') || 'Zaxira Quvvati'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{watch.specs?.powerReserve || '48 Hours'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                    <span className="text-secondary">{t('details.frequency') || 'Chastotasi'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{watch.specs?.frequency || '28,800 vph'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                    <span className="text-secondary">{t('details.jewelBearings') || 'Toshlar Soni'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{watch.specs?.jewels ?? 24} {t('details.syntheticRubies') || 'Rubin'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'story' && (
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-3xl)', maxWidth: '56rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {t('details.craftedIn') || 'Geneva Ustaxonasining Asli'}
              </h3>
              <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                {watch.story || watch.description}
              </p>
              <div className="glass-pill" style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--color-gold-300)' }}>
                {t('details.craftCert') || 'Har bir model Shveysariya Xronometr Nazorati (COSC) tomonidan sinovdan o‘tgan.'}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {t('details.collectorImpressions') || 'Kolleksionerlar Fikri'}
                  </h3>
                  <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0 }}>
                    {t('details.authenticatedOwners') || 'Tasdiqlangan egalar'}
                  </p>
                </div>
                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="btn-glass"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', color: 'var(--color-gold-300)' }}
                >
                  {t('details.writeCollectorReview') || 'Sharh Qoldirish'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                        <span>{rev.author}</span>
                        {rev.verifiedBuyer && <CheckCircle2 size={13} style={{ color: 'var(--color-emerald-400)' }} />}
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                    </div>
                    <div style={{ display: 'flex', color: 'var(--color-gold-400)' }}>
                      {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-muted" style={{ fontSize: '0.8rem', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Timepieces */}
      <div className="site-container" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-400)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
              {t('details.curatedSelection') || 'Tavsiya Etiladigan'}
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {t('details.relatedTitle') || 'O‘xshash Boshqa Modellar'}
            </h3>
          </div>
          <Link
            to="/catalog"
            style={{ fontSize: '0.75rem', color: 'var(--color-gold-400)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <span>{t('details.viewAll') || 'Barchasini ko‘rish'}</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {relatedWatches.map((w) => (
            <ProductCard key={w.id} watch={w} />
          ))}
        </div>
      </div>

      {/* Virtual Wrist Try-on Modal */}
      <WristSimulatorModal
        watch={watch}
        isOpen={wristModalOpen}
        onClose={() => setWristModalOpen(false)}
      />

      {/* Review Submission Modal */}
      <AnimatePresence>
        {reviewModalOpen && (
          <div className="modal-overlay" style={{ zIndex: 100 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReviewModalOpen(false)}
              className="modal-backdrop"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content glass-panel"
              style={{
                maxWidth: '440px',
                padding: '1.75rem',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border-gold-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                {t('details.shareImpression') || 'Fikringizni Ulashing'}
              </h3>
              <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t('details.yourNameHandle') || 'Ismingiz'}</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Jasur Aliyev"
                    className="luxury-input"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t('details.rating') || 'Baho'}</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[5, 4, 3, 2, 1].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNewReviewRating(num)}
                        className={`btn-glass ${newReviewRating === num ? 'btn-gold' : ''}`}
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                      >
                        {num} ★
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t('details.yourCommentary') || 'Sharhingiz'}</label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder={t('details.commentaryPlaceholder') || 'Soat sifati, yetkazilishi haqida...'}
                    className="luxury-input"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', resize: 'vertical' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="btn-glass"
                    style={{ flex: 1, padding: '0.6rem' }}
                  >
                    {t('details.cancel') || 'Bekor qilish'}
                  </button>
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ flex: 1, padding: '0.6rem' }}
                  >
                    {t('details.publish') || 'Chop etish'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;
