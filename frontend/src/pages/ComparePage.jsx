import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Scale, Trash2, ShoppingBag, Plus } from 'lucide-react';
import { removeFromCompare, clearCompare, addToCompare } from '../store/slices/compareSlice';
import { addToCart } from '../store/slices/cartSlice';
import { formatPriceWithCurrency } from '../store/slices/localeSlice';
import { WATCHES } from '../data/watches.js';

export const ComparePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.compare.items);
  const products = useSelector((state) => state.products.items);
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const specRows = [
    { label: 'Kolleksiya / Brend', key: 'brand' },
    { label: 'Mexanizm turi', key: 'movement' },
    { label: 'Narxi', render: (w) => formatPrice(w.price) },
    { label: 'Korpus materiali', key: 'caseMaterial' },
    { label: 'Tasma materiali', key: 'strapMaterial' },
    { label: 'Siferblat qoplamasi', key: 'dialColor' },
    { label: 'Korpus diametri', render: (w) => w.specs?.caseDiameter || '40.0 mm' },
    { label: 'Korpus qalinligi', render: (w) => w.specs?.caseThickness || '12.0 mm' },
    { label: 'Suvga chidamlilik', render: (w) => w.specs?.waterResistance || '100 m' },
    { label: 'Quvvat zaxirasi', render: (w) => w.specs?.powerReserve || '48 Soat' },
    { label: 'Chastota', render: (w) => w.specs?.frequency || '28,800 vph' },
    { label: 'Kalibr kodi', render: (w) => w.specs?.caliber || 'Swiss Calibre' },
    { label: 'Toshlar soni (Jewels)', render: (w) => `${w.specs?.jewels ?? 24} Sintetik Yoqut` },
    { label: 'Shisha', render: (w) => w.specs?.crystal || 'Safir billur' },
    { label: 'Turbiyon', render: (w) => (w.threeDConfig?.hasTourbillon ? 'Bor (Flying 60s)' : 'Standart Gyromax balans') },
    { label: 'Cheklangan nashr (Limited)', render: (w) => (w.limitedEdition ? `Ha (${w.editionCount} dona)` : 'Doimiy ishlab chiqarish') },
  ];

  const allAvailable = products.length > 0 ? products : WATCHES;
  const availableToAdd = allAvailable.filter((w) => !items.some((i) => i.id === w.id));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-obsidian-950)', padding: '3rem 0 5rem' }}>
      <div className="site-container">
        
        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--border-gold-subtle)', paddingBottom: '1.5rem', marginBottom: '2.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-gold-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <Scale size={14} />
              <span>HOROLOGIK TAQQOSLASH MATRITSASI</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--text-primary)', margin: '0.25rem 0 0 0' }}>
              Soatlar Texnik Xususiyatlarini Taqqoslash
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearCompare())}
              className="btn-glass"
              style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', color: 'var(--color-ruby-400)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
            >
              <Trash2 size={14} />
              <span>Matritsani Tozalash</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-3xl)', maxWidth: '36rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', border: '1px solid var(--border-gold-subtle)' }}>
            <Scale size={48} style={{ color: 'var(--text-muted)' }} />
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
                Taqqoslanuvchi Soatlar Tanlanmagan
              </h2>
              <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                Katalogdan 4 tagacha soatni tanlab, korpus o‘lchamlari, turbiyon murakkabliklari, quvvat zaxirasi va qimmatbaho qotishmalarini yonma-yon solishtiring.
              </p>
            </div>
            <Link
              to="/catalog"
              className="btn-gold"
              style={{ padding: '0.85rem 2rem', fontSize: '0.75rem', textDecoration: 'none' }}
            >
              Kolleksiyalarni Ko‘rish
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Quick Add Bar */}
            {items.length < 4 && availableToAdd.length > 0 && (
              <div className="glass-pill" style={{ padding: '1rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.75rem' }}>
                <span className="text-secondary">
                  Yana {4 - items.length} tagacha soat qo‘shishingiz mumkin:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {availableToAdd.slice(0, 3).map((w) => (
                    <button
                      key={w.id}
                      onClick={() => dispatch(addToCompare(w))}
                      className="btn-glass"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-gold-300)' }}
                    >
                      <Plus size={12} />
                      <span>{w.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Matrix Table */}
            <div className="glass-panel" style={{ borderRadius: 'var(--radius-3xl)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-obsidian-950)' }}>
                      <th style={{ padding: '1.5rem', width: '14rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.7rem', verticalAlign: 'top', textAlign: 'left' }}>
                        Specification
                      </th>
                      {items.map((watch) => (
                        <th key={watch.id} style={{ padding: '1.5rem', minWidth: '220px', verticalAlign: 'top', textAlign: 'left' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>
                            <button
                              onClick={() => dispatch(removeFromCompare(watch.id))}
                              className="btn-glass"
                              style={{ position: 'absolute', top: 0, right: 0, padding: '0.35rem', borderRadius: '50%', color: 'var(--color-ruby-400)' }}
                              title="Remove from comparison"
                            >
                              <Trash2 size={14} />
                            </button>
                            <img
                              src={watch.images?.[0]}
                              alt={watch.name}
                              style={{ width: '100%', height: '11rem', objectFit: 'contain', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}
                            />
                            <div>
                              <span style={{ fontSize: '0.65rem', color: 'var(--color-gold-400)', display: 'block' }}>
                                {watch.collection || watch.category}
                              </span>
                              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                                {watch.name}
                              </h3>
                            </div>
                            <div className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem' }}>
                              {formatPrice(watch.price)}
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button
                                onClick={() => navigate(`/watch/${watch.id}`)}
                                className="btn-glass"
                                style={{ flex: 1, padding: '0.5rem', fontSize: '0.7rem' }}
                              >
                                3D Atelier
                              </button>
                              <button
                                onClick={() => dispatch(addToCart({ watch, quantity: 1 }))}
                                className="btn-gold"
                                style={{ flex: 1, padding: '0.5rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                              >
                                <ShoppingBag size={12} />
                                <span>Add to Vault</span>
                              </button>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {specRows.map((row, idx) => (
                      <tr key={row.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                        <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                          {row.label}
                        </td>
                        {items.map((watch) => (
                          <td key={`${watch.id}-${row.label}`} style={{ padding: '1rem 1.5rem', color: 'var(--text-primary)' }}>
                            {row.render ? row.render(watch) : watch[row.key] || '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
