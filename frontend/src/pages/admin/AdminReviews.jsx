import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Sparkles, Star, Check, Trash2, Plus, MessageSquare } from 'lucide-react';
import { approveReview, deleteReview, addProductReview } from '../../store/slices/productsSlice';
import { reviewsApi } from '../../api';

export const AdminReviews = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rawProducts = useSelector((state) => state.products?.items);
  const products = Array.isArray(rawProducts) ? rawProducts : [];

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState('');

  // Aggregate all reviews across products
  const allReviews = [];
  products.forEach((p) => {
    (Array.isArray(p?.reviews) ? p.reviews : []).forEach((r) => {
      allReviews.push({ ...r, productName: p.name, productId: p.id });
    });
  });

  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim() || !selectedProductId) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      rating: Number(rating),
      date: new Date().toISOString().split('T')[0],
      comment: commentText.trim(),
      status: 'approved',
      verifiedBuyer: true
    };

    dispatch(addProductReview({ productId: selectedProductId, review: newRev }));

    try {
      const prodNumericId = parseInt(String(selectedProductId).replace(/\D/g, ''), 10) || 1;
      await reviewsApi.create({
        product_id: prodNumericId,
        user_id: 1,
        rating: Number(rating),
        comment: commentText.trim()
      }).catch(() => {});
    } catch (e) {}

    setAuthorName('');
    setCommentText('');
    setAddModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {t('admin.reviewsTitle') || 'Sharhlar Moderatsiyasi'}
          </h1>
          <p className="text-muted" style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>
            {t('admin.reviewsSubtitle') || 'Mijozlar tomonidan qoldirilgan fikrlar va ularni tasdiqlash'}
          </p>
        </div>

        <button
          onClick={() => {
            if (!selectedProductId && products.length > 0) setSelectedProductId(products[0].id);
            setAddModalOpen(true);
          }}
          className="btn-gold"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', fontSize: '0.8rem', borderRadius: 'var(--radius-xl)' }}
        >
          <Plus size={16} />
          <span>{t('admin.addReviewBtn') || 'Yangi Sharh Qo‘shish'}</span>
        </button>
      </div>

      <div className="glass-panel" style={{ borderRadius: 'var(--radius-3xl)', overflow: 'hidden' }}>
        {allReviews.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Sparkles size={28} style={{ margin: '0 auto 0.75rem', color: 'var(--color-gold-400)', opacity: 0.5 }} />
            <p>{t('admin.reviewsNoReviews') || 'Hozircha hech qanday sharhlar mavjud emas.'}</p>
          </div>
        ) : (
          <div className="admin-table-scroll">
            <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{t('admin.reviewsColModel') || 'Model'}</th>
                  <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{t('admin.reviewsColAuthor') || 'Muallif'}</th>
                  <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{t('admin.reviewsColRating') || 'Baho'}</th>
                  <th style={{ padding: '1rem' }}>{t('admin.reviewsColComment') || 'Sharh'}</th>
                  <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{t('admin.reviewsColStatus') || 'Holat'}</th>
                  <th style={{ padding: '1rem', textAlign: 'right', whiteSpace: 'nowrap' }}>{t('admin.reviewsColActions') || 'Amallar'}</th>
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
                          onClick={async () => {
                            try {
                              const numericId = parseInt(String(rev.id).replace(/\D/g, ''), 10);
                              if (numericId) await reviewsApi.delete(numericId).catch(() => {});
                            } catch(e) {}
                            dispatch(deleteReview({ productId: rev.productId, reviewId: rev.id }));
                          }}
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

      {/* Admin Add Review Modal */}
      <AnimatePresence>
        {addModalOpen && (
          <div className="modal-overlay" style={{ zIndex: 100 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddModalOpen(false)}
              className="modal-backdrop"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content glass-panel"
              style={{
                maxWidth: '460px',
                padding: '1.75rem',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border-gold-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                backgroundColor: 'rgba(15, 17, 23, 0.95)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={20} style={{ color: 'var(--color-gold-400)' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                  {t('admin.addReviewModalTitle') || 'Yangi Sharh Kiritish'}
                </h3>
              </div>

              <form onSubmit={handleCreateReview} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {t('admin.selectProduct') || 'Soat Modeli'}
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.75rem', fontSize: '0.8rem', backgroundColor: 'var(--bg-obsidian-950)' }}
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {t('admin.authorName') || 'Muallif (Mijoz ismi)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Masalan: Julian V. Rothschild"
                    className="luxury-input"
                    style={{ padding: '0.55rem 0.75rem', fontSize: '0.8rem' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {t('admin.rating') || 'Baho (Yulduzcha)'}
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[5, 4, 3, 2, 1].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className={`btn-glass ${rating === num ? 'btn-gold' : ''}`}
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                      >
                        {num} ★
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {t('admin.commentText') || 'Sharh Matni'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Soat haqida fikr..."
                    className="luxury-input"
                    style={{ padding: '0.55rem 0.75rem', fontSize: '0.8rem', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setAddModalOpen(false)}
                    className="btn-glass"
                    style={{ flex: 1, padding: '0.6rem' }}
                  >
                    {t('common.cancel') || 'Bekor qilish'}
                  </button>
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ flex: 1, padding: '0.6rem' }}
                  >
                    {t('common.save') || 'Qo‘shish'}
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
export default AdminReviews;
