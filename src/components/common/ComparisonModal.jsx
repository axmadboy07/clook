import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { X, Scale, Trash2, ShoppingBag } from 'lucide-react';
import { toggleCompareModal, removeFromCompare, clearCompare } from '../../store/slices/compareSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { formatPriceWithCurrency } from '../../store/slices/localeSlice';

export const ComparisonModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { items, isCompareModalOpen } = useSelector((state) => state.compare);
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  if (!isCompareModalOpen) return null;

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const specRows = [
    { label: t('compare.brand') || 'Brand', key: 'brand' },
    { label: t('compare.movement') || 'Movement', key: 'movement' },
    { label: t('compare.price') || 'Price', render: (w) => formatPrice(w.price) },
    { label: t('compare.case') || 'Case Material', key: 'caseMaterial' },
    { label: t('product.strapMaterial') || 'Strap Material', key: 'strapMaterial' },
    { label: t('product.dialColor') || 'Dial Color', key: 'dialColor' },
    { label: t('details.caseDiameter') || 'Case Diameter', render: (w) => w.specs?.caseDiameter || '40.0 mm' },
    { label: t('details.caseThickness') || 'Case Thickness', render: (w) => w.specs?.caseThickness || '12.0 mm' },
    { label: t('details.waterResistance') || 'Water Resistance', render: (w) => w.specs?.waterResistance || '100 m' },
    { label: t('details.powerReserve') || 'Power Reserve', render: (w) => w.specs?.powerReserve || '48 Hours' },
  ];

  return (
    <AnimatePresence>
      <div className="modal-overlay" style={{ zIndex: 100 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(toggleCompareModal(false))}
          className="modal-backdrop"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="modal-content glass-panel"
          style={{
            maxWidth: '1100px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            overflow: 'hidden',
            border: '1px solid var(--border-gold-subtle)'
          }}
        >
          {/* Header */}
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-obsidian-950)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', color: 'var(--color-gold-400)', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scale size={20} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                  {t('compare.title') || 'Taqqoslama'}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
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
                  <span>{t('wishlist.remove') || 'Tozalash'}</span>
                </button>
              )}
              <button
                onClick={() => dispatch(toggleCompareModal(false))}
                className="btn-glass"
                style={{ padding: '0.5rem', borderRadius: '50%' }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body content */}
          <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
            {items.length === 0 ? (
              <div style={{ padding: '5rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <Scale size={48} style={{ color: 'var(--text-muted)' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                  {t('compare.empty') || 'Taqqoslanuvchi soatlar yo‘q'}
                </h4>
                <p className="text-muted" style={{ fontSize: '0.8rem', maxWidth: '24rem', margin: 0 }}>
                  {t('compare.emptySub') || 'Katalogdan soatlarni taqqoslash uchun qo‘shing.'}
                </p>
                <button
                  onClick={() => {
                    dispatch(toggleCompareModal(false));
                    navigate('/catalog');
                  }}
                  className="btn-gold"
                  style={{ padding: '0.65rem 1.5rem', fontSize: '0.75rem' }}
                >
                  {t('cart.browseBtn') || 'Katalogni ko‘rish'}
                </button>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <th style={{ padding: '1rem', color: 'var(--color-gold-400)', fontWeight: 600, width: '12rem', textAlign: 'left' }}>
                        {t('compare.specs') || 'Xususiyatlar'}
                      </th>
                      {items.map((watch) => (
                        <th key={watch.id} style={{ padding: '1rem', minWidth: '180px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <img
                              src={watch.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'}
                              alt={watch.name}
                              style={{ width: '5rem', height: '5rem', objectFit: 'contain', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}
                            />
                            <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0 }}>
                              {watch.name}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button
                                onClick={() => dispatch(addToCart({ watch, quantity: 1 }))}
                                className="btn-gold"
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                              >
                                <ShoppingBag size={12} />
                                <span>{t('wishlist.addToCart') || 'Savatga'}</span>
                              </button>
                              <button
                                onClick={() => dispatch(removeFromCompare(watch.id))}
                                className="btn-glass"
                                style={{ padding: '0.35rem', color: 'var(--color-ruby-400)' }}
                                title="Remove"
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
                      <tr key={row.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          {row.label}
                        </td>
                        {items.map((watch) => (
                          <td key={`${watch.id}-${row.label}`} style={{ padding: '0.85rem 1rem', color: 'var(--text-primary)', textAlign: 'center' }}>
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ComparisonModal;
