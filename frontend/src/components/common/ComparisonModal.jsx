import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { X, Scale, Trash2, ShoppingBag, Plus, Sparkles, ArrowRight } from 'lucide-react';
import { setCompareModalOpen, removeFromCompare, clearCompare, addToCompare } from '../../store/slices/compareSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { formatPriceWithCurrency } from '../../store/slices/localeSlice';
import { selectAllProducts } from '../../store/slices/productsSlice';

export const ComparisonModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { items, isCompareModalOpen } = useSelector((state) => state.compare);
  const { currency, exchangeRates } = useSelector((state) => state.locale);
  const products = useSelector(selectAllProducts);

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const specRows = [
    { label: 'Brend', key: 'brand' },
    { label: 'Mexanizm turi', key: 'movement' },
    { label: 'Narxi', render: (w) => formatPrice(w.price) },
    { label: 'Korpus materiali', key: 'caseMaterial' },
    { label: 'Tasma materiali', key: 'strapMaterial' },
    { label: 'Siferblat rangi', key: 'dialColor' },
    { label: 'Korpus diametri', render: (w) => w.specs?.caseDiameter || '40.0 mm' },
    { label: 'Qalinligi', render: (w) => w.specs?.caseThickness || '12.0 mm' },
    { label: 'Suvga chidamlilik', render: (w) => w.specs?.waterResistance || '100 m' },
    { label: 'Quvvat zaxirasi', render: (w) => w.specs?.powerReserve || '48 Soat' },
    { label: 'Turbiyon', render: (w) => (w.threeDConfig?.hasTourbillon ? 'Bor (Flying 60s)' : 'Standart balans') },
  ];

  const suggestedWatches = products.filter((p) => !items.some((i) => i.id === p.id)).slice(0, 3);

  return (
    <AnimatePresence>
      {isCompareModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(setCompareModalOpen(false))}
          className="modal-backdrop"
          style={{ zIndex: 120, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="modal-content glass-panel"
            style={{
              maxWidth: '1020px',
              width: '100%',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              border: '1px solid var(--border-gold-medium)',
              backgroundColor: 'var(--modal-bg, var(--bg-obsidian-900))',
              borderRadius: 'var(--radius-3xl)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 164, 76, 0.15)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.15rem 1.5rem', borderBottom: '1px solid var(--border-gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.15)', color: 'var(--color-gold-400)', border: '1px solid var(--border-gold-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Scale size={19} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-platinum-100)', margin: 0 }}>
                    Soatlarni Taqqoslash Matritsasi ({items.length}/4)
                  </h3>
                  <p style={{ fontSize: '0.7rem', color: 'var(--color-gold-400)', margin: '0.1rem 0 0 0', fontFamily: 'var(--font-mono)' }}>
                    CHRONOS Comparison Matrix
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {items.length > 0 && (
                  <button
                    onClick={() => dispatch(clearCompare())}
                    className="btn-glass"
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', color: 'var(--color-ruby-400)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Trash2 size={13} />
                    <span>Tozalash</span>
                  </button>
                )}
                <button
                  onClick={() => dispatch(setCompareModalOpen(false))}
                  className="icon-button"
                  style={{ minWidth: '38px', minHeight: '38px', width: '38px', height: '38px' }}
                  title="Yopish"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
              {items.length === 0 ? (
                <div style={{ padding: '3rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div
                      style={{
                        position: 'absolute',
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(212,164,76,0.3) 0%, transparent 70%)',
                        filter: 'blur(8px)'
                      }}
                    />
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(212,164,76,0.1)', border: '1px solid var(--border-gold-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-400)', position: 'relative', zIndex: 1 }}>
                      <Scale size={28} />
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-platinum-100)', margin: '0 0 0.35rem 0' }}>
                      Taqqoslanuvchi soatlar hozircha tanlanmagan
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-platinum-400)', maxWidth: '28rem', margin: '0 auto', lineHeight: 1.5 }}>
                      Bir vaqtning o‘zida 4 tagacha soatning mexanizm turi, materiali, suvga chidamliligi va narxlarini yonma-yon solishtiring.
                    </p>
                  </div>

                  {/* Quick Add Suggestions */}
                  {suggestedWatches.length > 0 && (
                    <div style={{ width: '100%', maxWidth: '520px', marginTop: '0.5rem', textAlign: 'left' }}>
                      <p style={{ fontSize: '0.72rem', color: 'var(--color-gold-400)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                        BIR ZUMDA TAQQOSLASH UCHUN QO‘SHING:
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {suggestedWatches.map((w) => (
                          <div
                            key={w.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.6rem 0.85rem',
                              borderRadius: 'var(--radius-xl)',
                              backgroundColor: 'var(--glass-pill-bg)',
                              border: '1px solid var(--border-platinum-subtle)',
                              gap: '0.75rem'
                            }}
                          >
                            <img
                              src={w.images?.[0]}
                              alt={w.name}
                              style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--product-img-bg)' }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-platinum-100)', margin: 0 }}>
                                {w.name}
                              </p>
                              <span style={{ fontSize: '0.72rem', color: 'var(--color-gold-400)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                                {formatPrice(w.price)} • {w.brand}
                              </span>
                            </div>
                            <button
                              onClick={() => dispatch(addToCompare(w))}
                              className="btn-gold"
                              style={{ padding: '0.35rem 0.75rem', fontSize: '0.72rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                            >
                              <Plus size={13} />
                              <span>Taqqoslashga</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      dispatch(setCompareModalOpen(false));
                      navigate('/catalog');
                    }}
                    className="btn-outline-gold"
                    style={{ padding: '0.7rem 1.75rem', fontSize: '0.8rem', marginTop: '0.5rem' }}
                  >
                    Katalogni Ko‘rish
                  </button>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-platinum-subtle)' }}>
                        <th style={{ padding: '1rem', color: 'var(--color-gold-400)', fontWeight: 600, width: '12rem', textAlign: 'left', backgroundColor: 'var(--glass-pill-bg)' }}>
                          Xususiyatlar
                        </th>
                        {items.map((watch) => (
                          <th key={watch.id} style={{ padding: '1rem', minWidth: '190px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                              <img
                                src={watch.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'}
                                alt={watch.name}
                                style={{ width: '5.5rem', height: '5.5rem', objectFit: 'contain', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-platinum-subtle)', backgroundColor: 'var(--product-img-bg)' }}
                              />
                              <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-platinum-100)', margin: 0 }}>
                                {watch.name}
                              </p>
                              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.25rem' }}>
                                <button
                                  onClick={() => dispatch(addToCart({ watch, quantity: 1 }))}
                                  className="btn-gold"
                                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                >
                                  <ShoppingBag size={12} />
                                  <span>Savatga</span>
                                </button>
                                <button
                                  onClick={() => dispatch(removeFromCompare(watch.id))}
                                  className="btn-glass"
                                  style={{ padding: '0.35rem 0.5rem', color: 'var(--color-ruby-400)' }}
                                  title="O‘chirish"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {specRows.map((row) => (
                        <tr key={row.label} style={{ borderBottom: '1px solid var(--border-platinum-subtle)' }}>
                          <td style={{ padding: '0.85rem 1rem', color: 'var(--color-platinum-400)', fontWeight: 600, backgroundColor: 'var(--glass-pill-bg)' }}>
                            {row.label}
                          </td>
                          {items.map((watch) => (
                            <td key={`${watch.id}-${row.label}`} style={{ padding: '0.85rem 1rem', color: 'var(--color-platinum-100)', textAlign: 'center' }}>
                              {row.render ? row.render(watch) : watch[row.key] || '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer with full page link */}
            {items.length > 0 && (
              <div style={{ padding: '0.85rem 1.5rem', borderTop: '1px solid var(--border-platinum-subtle)', backgroundColor: 'var(--bg-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-platinum-400)' }}>
                  Yana {4 - items.length} tagacha soat qo‘sha olasiz
                </span>
                <button
                  onClick={() => {
                    dispatch(setCompareModalOpen(false));
                    navigate('/compare');
                  }}
                  className="btn-outline-gold"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <span>To‘liq sahifaga o‘tish</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComparisonModal;
