import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Trash2, Check, Sparkles } from 'lucide-react';
import { approveReview, deleteReview } from '../../store/slices/productsSlice';

export const AdminReviews = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  // Aggregate all reviews across products
  const allReviews = [];
  products.forEach((p) => {
    (p.reviews || []).forEach((r) => {
      allReviews.push({ ...r, productName: p.name, productId: p.id });
    });
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          {t('admin.reviewsTitle') || 'Sharhlar Moderatsiyasi'}
        </h1>
        <p className="text-muted" style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>
          {t('admin.reviewsSubtitle') || 'Mijozlar tomonidan qoldirilgan fikrlar va ularni tasdiqlash'}
        </p>
      </div>

      <div className="glass-panel" style={{ borderRadius: 'var(--radius-3xl)', overflow: 'hidden' }}>
        {allReviews.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Sparkles size={28} style={{ margin: '0 auto 0.75rem', color: 'var(--color-gold-400)', opacity: 0.5 }} />
            <p>{t('admin.reviewsNoReviews') || 'Hozircha hech qanday sharhlar mavjud emas.'}</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem' }}>{t('admin.reviewsColModel') || 'Model'}</th>
                  <th style={{ padding: '1rem' }}>{t('admin.reviewsColAuthor') || 'Muallif'}</th>
                  <th style={{ padding: '1rem' }}>{t('admin.reviewsColRating') || 'Baho'}</th>
                  <th style={{ padding: '1rem' }}>{t('admin.reviewsColComment') || 'Sharh'}</th>
                  <th style={{ padding: '1rem' }}>{t('admin.reviewsColStatus') || 'Holat'}</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>{t('admin.reviewsColActions') || 'Amallar'}</th>
                </tr>
              </thead>
              <tbody>
                {allReviews.map((rev) => (
                  <tr key={rev.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '1rem', color: 'var(--color-gold-400)', fontWeight: 600, maxWidth: '200px' }}>
                      {rev.productName}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{rev.author}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--color-gold-400)' }}>
                        {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', maxWidth: '280px', fontStyle: 'italic' }}>
                      "{rev.comment}"
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`status-pill ${rev.status === 'approved' ? 'status-delivered' : 'status-pending'}`}>
                        {rev.status === 'approved'
                          ? (t('admin.reviewsStatusApproved') || 'Tasdiqlangan')
                          : (t('admin.reviewsStatusPending') || 'Kutilmoqda')}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        {rev.status !== 'approved' && (
                          <button
                            onClick={() => dispatch(approveReview({ productId: rev.productId, reviewId: rev.id }))}
                            className="btn-action-icon"
                            style={{ color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.3)' }}
                            title={t('admin.reviewsApprove') || 'Tasdiqlash'}
                          >
                            <Check size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => dispatch(deleteReview({ productId: rev.productId, reviewId: rev.id }))}
                          className="btn-action-icon btn-action-delete"
                          title={t('admin.reviewsDelete') || 'O‘chirish'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminReviews;
