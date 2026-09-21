import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Filter,
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  ShieldCheck,
  Truck,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { ProductCard } from '../components/common/ProductCard.jsx';
import { QuickViewModal } from '../components/common/QuickViewModal.jsx';
import { formatPriceWithCurrency } from '../store/slices/localeSlice';
import { BRANDS, CATEGORIES } from '../data/watches.js';

export const CatalogPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currency, exchangeRates } = useSelector((state) => state.locale);
  const products = useSelector((state) => state.products.items);

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  // Filters State
  const initialBrand = searchParams.get('brand') || searchParams.get('collection') || 'All Brands';
  const [selectedBrand, setSelectedBrand] = useState(initialBrand === 'All' ? 'All Brands' : initialBrand);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovement, setSelectedMovement] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState(75000);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [quickViewWatch, setQuickViewWatch] = useState(null);

  useEffect(() => {
    const brandParam = searchParams.get('brand') || searchParams.get('collection');
    if (brandParam) {
      setSelectedBrand(brandParam === 'All' ? 'All Brands' : brandParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileFilterOpen]);

  const movements = ['All', 'Automatic', 'Solar Quartz', 'Tourbillon', 'Quartz Chronograph', 'Perpetual Calendar'];
  const materials = [
    'All',
    '18K Yellow Gold',
    '18K Rose Gold',
    'Titanium Grade 5',
    'Stainless Steel 316L',
    'Midnight Ceramic',
    'Platinum 950',
    'Forged Carbon',
    'Stealth Carbon',
  ];
  const genders = [
    { id: 'All', label: 'Barchasi' },
    { id: 'Men', label: 'Erkaklar' },
    { id: 'Women', label: 'Ayollar' },
    { id: 'Unisex', label: 'Uniseks' },
  ];

  // Filtered & Sorted Watches
  const filteredWatches = useMemo(() => {
    return products.filter((watch) => {
      // Brand match
      if (
        selectedBrand !== 'All Brands' &&
        selectedBrand !== 'All' &&
        watch.brand !== selectedBrand &&
        watch.collection !== selectedBrand
      ) {
        return false;
      }
      // Category match
      if (
        selectedCategory !== 'All Categories' &&
        selectedCategory !== 'All' &&
        watch.category !== selectedCategory &&
        watch.collection !== selectedCategory
      ) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          (watch.name && watch.name.toLowerCase().includes(query)) ||
          (watch.brand && watch.brand.toLowerCase().includes(query)) ||
          (watch.category && watch.category.toLowerCase().includes(query)) ||
          (watch.collection && watch.collection.toLowerCase().includes(query)) ||
          (watch.caseMaterial && watch.caseMaterial.toLowerCase().includes(query)) ||
          (watch.specs?.caliber && watch.specs.caliber.toLowerCase().includes(query));
        if (!matches) return false;
      }
      // Movement match
      if (selectedMovement !== 'All' && watch.movement !== selectedMovement) {
        return false;
      }
      // Material match
      if (selectedMaterial !== 'All' && watch.caseMaterial !== selectedMaterial) {
        return false;
      }
      // Gender match
      if (selectedGender !== 'All' && watch.gender !== selectedGender) {
        return false;
      }
      // In-stock match
      if (onlyInStock && watch.inStock === false) {
        return false;
      }
      // Price limit
      if (watch.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });
  }, [products, selectedBrand, selectedCategory, searchQuery, selectedMovement, selectedMaterial, selectedGender, onlyInStock, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedBrand('All Brands');
    setSelectedCategory('All Categories');
    setSearchQuery('');
    setSelectedMovement('All');
    setSelectedMaterial('All');
    setSelectedGender('All');
    setOnlyInStock(false);
    setMaxPrice(75000);
    setSortBy('featured');
    setSearchParams({});
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedBrand !== 'All Brands' && selectedBrand !== 'All') count++;
    if (selectedCategory !== 'All Categories' && selectedCategory !== 'All') count++;
    if (searchQuery.trim() !== '') count++;
    if (selectedMovement !== 'All') count++;
    if (selectedMaterial !== 'All') count++;
    if (selectedGender !== 'All') count++;
    if (onlyInStock) count++;
    if (maxPrice < 75000) count++;
    return count;
  }, [selectedBrand, selectedCategory, searchQuery, selectedMovement, selectedMaterial, selectedGender, onlyInStock, maxPrice]);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-obsidian-950)', padding: '2rem 0 4rem' }}>
      <div className="site-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Top Header & VIP Mini Ribbon */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid var(--border-gold-subtle)', paddingBottom: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-gold-400)' }}>
              <Sparkles size={14} />
              <span>{t('hero.badge') || 'GENÈVE HAUTE HORLOGERIE'}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {t('nav.catalog') || 'Katalog'} — {t('brands.title') || 'Pret-a-Porter & Haute Horlogerie'}
            </h1>
            <p className="text-muted" style={{ fontSize: '0.85rem', maxWidth: '44rem', margin: 0 }}>
              {t('brands.subtitle') || 'Har bir brend uchun sertifikatlangan asl va eksklyuziv soatlar to‘plami'}. Rolex, Casio, Seiko, Tissot, G-Shock, Citizen, Fossil, Diesel, Michael Kors, Daniel Wellington.
            </p>
          </div>

          {/* Quick VIP Guarantee Pill */}
          <div className="glass-pill" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', fontSize: '0.75rem', color: 'var(--color-gold-300)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <ShieldCheck size={14} style={{ color: 'var(--color-gold-400)' }} />
              <span>5 Yillik Xalqaro Kafolat</span>
            </div>
            <span style={{ color: 'var(--border-subtle)' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Truck size={14} style={{ color: 'var(--color-gold-400)' }} />
              <span>Toshkentda 3 soatda VIP yetkazish</span>
            </div>
          </div>
        </div>

        {/* Brand Bar (Sleek Horizontal Scrollable Tabs) */}
        <div style={{ position: 'relative', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              paddingTop: '0.25rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {BRANDS.map((brand) => {
              const isAll = brand === 'All Brands';
              const active = selectedBrand === brand || (isAll && (selectedBrand === 'All' || selectedBrand === 'All Brands'));
              const label = isAll ? (t('filters.allBrands') || 'Barcha Brendlar') : brand;

              return (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: active ? 700 : 500,
                    whiteSpace: 'nowrap',
                    borderRadius: 'var(--radius-full)',
                    border: active ? '1px solid var(--color-gold-400)' : '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: active ? 'rgba(212, 164, 76, 0.22)' : 'rgba(15, 18, 25, 0.85)',
                    color: active ? '#ffffff' : 'var(--color-platinum-200)',
                    boxShadow: active ? '0 0 16px rgba(212, 164, 76, 0.35)' : '0 2px 8px rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    flexShrink: 0
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Horizontal Search & Controls Container */}
        <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border-gold-subtle)' }}>
          
          {/* Main Controls Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 240px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('filters.search') || 'Soat nomi, brend yoki material bo‘yicha qidiring...'}
                className="luxury-input"
                style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: searchQuery ? '2.25rem' : '0.85rem', paddingBlock: '0.6rem', fontSize: '0.8rem' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div style={{ width: 'auto', minWidth: '180px' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="luxury-input"
                style={{ width: '100%', paddingBlock: '0.6rem', fontSize: '0.8rem' }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All Categories' ? (t('filters.allCategories') || 'Barcha Kategoriyalar') : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Toggle Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className={`btn-glass ${isFilterExpanded || hasActiveFilters ? 'active-filter' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1rem',
                  fontSize: '0.75rem',
                  borderColor: isFilterExpanded ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                  color: isFilterExpanded ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                }}
              >
                <SlidersHorizontal size={14} style={{ color: 'var(--color-gold-400)' }} />
                <span>{t('filters.title') || 'Filtrlar'}</span>
                {activeFilterCount > 0 && (
                  <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'var(--color-gold-500)', color: '#000', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {activeFilterCount}
                  </span>
                )}
                {isFilterExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* Sort By Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="luxury-input"
                  style={{ paddingBlock: '0.6rem', fontSize: '0.8rem' }}
                >
                  <option value="featured">{t('filters.sortFeatured') || 'Tavsiya etilgan'}</option>
                  <option value="price-asc">{t('filters.sortPriceAsc') || 'Arzondan qimmatga'}</option>
                  <option value="price-desc">{t('filters.sortPriceDesc') || 'Qimmatdan arzonga'}</option>
                  <option value="rating">{t('filters.sortRating') || 'Reyting bo‘yicha'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Expandable Horizontal Filter Row */}
          <AnimatePresence>
            {isFilterExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: 'hidden', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
                  
                  {/* Price Range Slider */}
                  <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--color-gold-400)', fontWeight: 700, textTransform: 'uppercase' }}>
                        {t('filters.priceRange') || 'NARX'}:
                      </span>
                      <span className="gold-gradient-text" style={{ fontWeight: 700 }}>{formatPrice(maxPrice)}</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={75000}
                      step={250}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--color-gold-400)', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      <span>{formatPrice(50)}</span>
                      <span>{formatPrice(75000)}</span>
                    </div>
                  </div>

                  {/* Movement Type */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-gold-400)', textTransform: 'uppercase' }}>
                      {t('product.movement') || 'MEXANIZM'}
                    </label>
                    <select
                      value={selectedMovement}
                      onChange={(e) => setSelectedMovement(e.target.value)}
                      className="luxury-input"
                      style={{ width: '100%', fontSize: '0.75rem', paddingBlock: '0.45rem' }}
                    >
                      {movements.map((mov) => (
                        <option key={mov} value={mov}>
                          {mov === 'All' ? 'Barcha mexanizmlar' : mov}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Case Material */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-gold-400)', textTransform: 'uppercase' }}>
                      {t('product.caseMaterial') || 'MATERIAL'}
                    </label>
                    <select
                      value={selectedMaterial}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      className="luxury-input"
                      style={{ width: '100%', fontSize: '0.75rem', paddingBlock: '0.45rem' }}
                    >
                      {materials.map((mat) => (
                        <option key={mat} value={mat}>
                          {mat === 'All' ? 'Barcha materiallar' : mat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Gender */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-gold-400)', textTransform: 'uppercase' }}>
                      {t('filters.allGenders') || 'JINS'}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.25rem' }}>
                      {genders.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setSelectedGender(g.id)}
                          className={`btn-glass ${selectedGender === g.id ? 'active-filter' : ''}`}
                          style={{
                            padding: '0.35rem 0.2rem',
                            fontSize: '0.65rem',
                            textAlign: 'center',
                            borderColor: selectedGender === g.id ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                            color: selectedGender === g.id ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                          }}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability Toggle & Reset */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => setOnlyInStock(!onlyInStock)}
                      className={`btn-glass ${onlyInStock ? 'active-filter' : ''}`}
                      style={{
                        padding: '0.45rem 0.75rem',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        borderColor: onlyInStock ? 'var(--color-emerald-500)' : 'var(--border-subtle)',
                        color: onlyInStock ? 'var(--color-emerald-400)' : 'var(--text-secondary)'
                      }}
                    >
                      <CheckCircle2 size={13} style={{ color: onlyInStock ? 'var(--color-emerald-400)' : 'var(--text-muted)' }} />
                      <span>Mavjud</span>
                    </button>

                    {hasActiveFilters && (
                      <button
                        onClick={resetFilters}
                        style={{ background: 'transparent', border: 'none', color: 'var(--color-gold-400)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <RotateCcw size={12} />
                        <span>Tozalash</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Catalog Results Bar */}
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-xl)', fontSize: '0.8rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span className="text-secondary">Natijalar:</span>
            <strong className="gold-gradient-text" style={{ fontSize: '1rem' }}>{filteredWatches.length}</strong>
            <span className="text-secondary">ta Shveysariya va premium soat</span>
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-gold-400)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'underline' }}
            >
              <RotateCcw size={12} />
              <span>{t('filters.clearFilters') || 'Filtrlarni tozalash'}</span>
            </button>
          )}
        </div>

        {/* Full-Width Watch Product Grid */}
        {filteredWatches.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-3xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', color: 'var(--color-gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Filter size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
              {t('filters.noResults') || 'Hech narsa topilmadi'}
            </h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', maxWidth: '24rem', margin: 0 }}>
              Qidiruv talablaringizga mos keluvchi soatlar topilmadi. Filtr parametrlarini o‘zgartiring yoki tozalang.
            </p>
            <button
              onClick={resetFilters}
              className="btn-gold"
              style={{ padding: '0.65rem 1.5rem', fontSize: '0.75rem' }}
            >
              {t('filters.clearFilters') || 'Filtrlarni tozalash'}
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            {filteredWatches.map((watch) => (
              <ProductCard
                key={watch.id}
                watch={watch}
                onQuickView={(w) => setQuickViewWatch(w)}
              />
            ))}
          </div>
        )}

        {/* Full-Width VIP Concierge & Chronos Warranty Card Banner */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-3xl)', border: '1px solid var(--border-gold-subtle)', marginTop: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: 'var(--color-gold-400)', flexShrink: 0 }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>5 Yillik Shveysariya Kafolati</h4>
                <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.25rem', lineHeight: 1.5, margin: 0 }}>
                  Barcha modellar zavod autentifikatsiya sertifikati va xalqaro pasporti bilan taqdim etiladi.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: 'var(--color-gold-400)', flexShrink: 0 }}>
                <Truck size={24} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>VIP Ekspress Yetkazib Berish</h4>
                <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.25rem', lineHeight: 1.5, margin: 0 }}>
                  Toshkent bo‘ylab 3 soat ichida, butun O‘zbekiston viloyatlariga 24 soatda maxsus kuryer bilan bepul.
                </p>
              </div>
            </div>

            <div className="glass-panel" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem 1.25rem', borderRadius: 'var(--radius-2xl)' }}>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-gold-400)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'block' }}>24/7 VIP KONYSERJ</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Mutaxassis Maslahati</span>
              </div>
              <a
                href="tel:+998901234567"
                className="btn-gold"
                style={{ padding: '0.6rem 1rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', whiteSpace: 'nowrap' }}
              >
                <PhoneCall size={14} />
                <span>+998 (90) 123-45-67</span>
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        watch={quickViewWatch}
        onClose={() => setQuickViewWatch(null)}
      />
    </div>
  );
};

export default CatalogPage;
