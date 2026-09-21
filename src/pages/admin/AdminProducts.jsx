import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  X,
  Sparkles,
  Package,
  Layers,
  Star,
  Check,
  RotateCcw,
  ShoppingBag,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  toggleStock,
  resetToDefaultProducts
} from '../../store/slices/productsSlice';
import { formatPriceWithCurrency } from '../../store/slices/localeSlice';
import { BRANDS, CATEGORIES } from '../../data/watches';

export const AdminProducts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);
  const { currency, exchangeRates } = useSelector((state) => state.locale);
  const orders = useSelector((state) => state.orders.items);

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('All');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    brand: 'Rolex',
    category: 'Luxury Tourbillon',
    price: 15000,
    originalPrice: 18000,
    caseMaterial: '18K Yellow Gold',
    strapMaterial: 'Alligator Leather',
    movement: 'Automatic',
    dialColor: 'Midnight Sun Gold',
    gender: 'Men',
    stockCount: 10,
    inStock: true,
    tagline: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    details: {
      caseDiameter: '42mm',
      waterResistance: '100m / 10 ATM',
      powerReserve: '72 Hours',
      crystal: 'Sapphire Glass',
    }
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrandFilter === 'All' || item.brand === selectedBrandFilter;
    return matchesSearch && matchesBrand;
  });

  const handleOpenAdd = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      brand: 'Rolex',
      category: 'Luxury Tourbillon',
      price: 15000,
      originalPrice: 18000,
      caseMaterial: '18K Yellow Gold',
      strapMaterial: 'Alligator Leather',
      movement: 'Automatic',
      dialColor: 'Midnight Sun Gold',
      gender: 'Men',
      stockCount: 10,
      inStock: true,
      tagline: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      details: {
        caseDiameter: '42mm',
        waterResistance: '100m / 10 ATM',
        powerReserve: '72 Hours',
        crystal: 'Sapphire Glass',
      }
    });
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProductId(prod.id);
    setFormData({
      name: prod.name || '',
      brand: prod.brand || 'Rolex',
      category: prod.category || 'Luxury Tourbillon',
      price: prod.price || 0,
      originalPrice: prod.originalPrice || prod.price || 0,
      caseMaterial: prod.caseMaterial || '18K Yellow Gold',
      strapMaterial: prod.strapMaterial || 'Alligator Leather',
      movement: prod.movement || 'Automatic',
      dialColor: prod.dialColor || 'Midnight Sun Gold',
      gender: prod.gender || 'Men',
      stockCount: prod.stockCount || 10,
      inStock: prod.inStock !== false,
      tagline: prod.tagline || '',
      description: prod.description || '',
      imageUrl: prod.imageUrl || prod.images?.[0] || '',
      details: prod.details || {
        caseDiameter: '42mm',
        waterResistance: '100m / 10 ATM',
        powerReserve: '72 Hours',
        crystal: 'Sapphire Glass',
      }
    });
    setIsDrawerOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingProductId) {
      dispatch(updateProduct({ id: editingProductId, ...formData }));
      showToast(t('admin.productsToastUpdated') || 'Mahsulot muvaffaqiyatli tahrirlandi');
    } else {
      dispatch(addProduct(formData));
      showToast(t('admin.productsToastAdded') || 'Yangi shoh asar kolleksiyaga qo‘shildi');
    }
    setIsDrawerOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setDeleteConfirmId(null);
    showToast(t('admin.productsToastDeleted') || 'Mahsulot katalogdan o‘chirildi');
  };

  const totalValue = products.reduce((acc, p) => acc + (p.price * (p.stockCount || 1)), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '1.5rem',
              right: '1.5rem',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'rgba(10, 10, 12, 0.95)',
              border: '1px solid var(--color-gold-500)',
              color: 'var(--color-gold-300)',
              boxShadow: 'var(--shadow-gold)'
            }}
          >
            <CheckCircle2 size={18} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Stats Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {t('admin.productsTitle') || 'Vaqt Asarlari Katalogi (CRUD)'}
          </h1>
          <p className="text-muted" style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>
            {t('admin.productsSubtitle') || 'Barcha hashamatli soat modellari, narxlari va zaxiralarini boshqarish'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => {
              if (window.confirm(t('admin.productsResetConfirm') || 'Barcha mahsulotlarni birlamchi holatga qaytarishni xohlaysizmi?')) {
                dispatch(resetToDefaultProducts());
                showToast(t('admin.productsToastReset') || 'Birlamchi ma’lumotlar tiklandi');
              }
            }}
            className="btn btn-outline"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
          >
            <RotateCcw size={14} />
            <span>{t('admin.productsResetBtn') || 'Standartga Qaytarish'}</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="btn btn-gold"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
          >
            <Plus size={16} />
            <span>{t('admin.productsAddBtn') || 'Yangi Soat Qo‘shish'}</span>
          </button>
        </div>
      </div>

      {/* Quick KPI Stat Pills */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-gold-400)' }}>
            <Package size={22} />
          </div>
          <div>
            <div className="text-muted" style={{ fontSize: '0.7rem' }}>{t('admin.totalModels') || 'Jami Modellar'}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{products.length}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}>
            <Layers size={22} />
          </div>
          <div>
            <div className="text-muted" style={{ fontSize: '0.7rem' }}>{t('admin.inStockTotal') || 'Ombordagi Zaxira'}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#34d399' }}>
              {products.reduce((acc, p) => acc + (p.stockCount || 0), 0)} {t('admin.units') || 'dona'}
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(192, 192, 192, 0.1)', color: 'var(--color-platinum-300)' }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <div className="text-muted" style={{ fontSize: '0.7rem' }}>{t('admin.inventoryValue') || 'Umumiy Inventar Qiymati'}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-gold-400)' }}>{formatPrice(totalValue)}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-2xl)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '360px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('admin.searchProducts') || 'Model, brend yoki kategoriya...'}
            className="luxury-input"
            style={{ width: '100%', paddingLeft: '2.5rem', paddingBlock: '0.5rem', fontSize: '0.8rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto' }}>
          <button
            onClick={() => setSelectedBrandFilter('All')}
            className={`btn ${selectedBrandFilter === 'All' ? 'btn-gold' : 'btn-outline'}`}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
          >
            {t('common.all') || 'Barchasi'}
          </button>
          {BRANDS?.slice(0, 5).map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrandFilter(b)}
              className={`btn ${selectedBrandFilter === b ? 'btn-gold' : 'btn-outline'}`}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-panel" style={{ borderRadius: 'var(--radius-3xl)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem' }}>{t('admin.tableProduct') || 'Mahsulot'}</th>
                <th style={{ padding: '1rem' }}>{t('admin.tableBrand') || 'Brend'}</th>
                <th style={{ padding: '1rem' }}>{t('admin.tablePrice') || 'Narx'}</th>
                <th style={{ padding: '1rem' }}>{t('admin.tableStock') || 'Ombor & Holat'}</th>
                <th style={{ padding: '1rem' }}>{t('admin.tableMovement') || 'Mexanizm'}</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>{t('admin.tableAction') || 'Amal'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => (
                <tr key={prod.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={prod.imageUrl || prod.images?.[0]}
                        alt={prod.name}
                        style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--border-subtle)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{prod.name}</div>
                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>{prod.category}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--color-gold-400)', fontWeight: 600 }}>{prod.brand}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{formatPrice(prod.price)}</td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => dispatch(toggleStock(prod.id))}
                      className={`status-pill ${prod.inStock ? 'status-delivered' : 'status-cancelled'}`}
                      style={{ cursor: 'pointer', border: 'none' }}
                      title={t('admin.toggleStockTip') || 'Zaxira holatini o‘zgartirish uchun bosing'}
                    >
                      {prod.inStock ? `${t('admin.inStock') || 'Mavjud'} (${prod.stockCount || 1})` : (t('admin.outOfStock') || 'Tugagan')}
                    </button>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{prod.movement || 'Automatic'}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="btn-action-icon btn-action-view"
                        title={t('admin.edit') || 'Tahrirlash'}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(prod.id)}
                        className="btn-action-icon btn-action-delete"
                        title={t('admin.delete') || 'O‘chirish'}
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
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)', padding: '1rem' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel"
              style={{ maxWidth: '400px', width: '100%', padding: '1.5rem', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
            >
              <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                {t('admin.deleteConfirmTitle') || 'Mahsulotni o‘chirish'}
              </h3>
              <p className="text-muted" style={{ fontSize: '0.8rem', margin: '0.5rem 0 1.25rem' }}>
                {t('admin.deleteConfirmDesc') || 'Haqiqatan ham bu soatni katalogdan o‘chirib tashlamoqchimisiz?'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button onClick={() => setDeleteConfirmId(null)} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                  {t('common.cancel') || 'Bekor qilish'}
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="btn"
                  style={{ backgroundColor: '#ef4444', color: '#fff', padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                >
                  {t('common.delete') || 'O‘chirish'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add / Edit Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="glass-panel"
              style={{ width: '100%', maxWidth: '520px', height: '100%', overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                  {editingProductId ? (t('admin.editWatch') || 'Soatni Tahrirlash') : (t('admin.addWatch') || 'Yangi Soat Qo‘shish')}
                </h2>
                <button onClick={() => setIsDrawerOpen(false)} className="btn-action-icon">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="luxury-label">{t('admin.formName') || 'Model Nomi'}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="luxury-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label className="luxury-label">{t('admin.formBrand') || 'Brend'}</label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="luxury-input"
                      style={{ width: '100%' }}
                    >
                      {BRANDS?.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="luxury-label">{t('admin.formCategory') || 'Kategoriya'}</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="luxury-input"
                      style={{ width: '100%' }}
                    >
                      {CATEGORIES?.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label className="luxury-label">{t('admin.formPriceUSD') || 'Narx ($ USD)'}</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="luxury-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label className="luxury-label">{t('admin.formStock') || 'Zaxira Soni'}</label>
                    <input
                      type="number"
                      value={formData.stockCount}
                      onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                      className="luxury-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="luxury-label">{t('admin.formImageURL') || 'Rasm Havolasi (URL)'}</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="luxury-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label className="luxury-label">{t('admin.formCaseMaterial') || 'Korpus Materiali'}</label>
                    <input
                      type="text"
                      value={formData.caseMaterial}
                      onChange={(e) => setFormData({ ...formData, caseMaterial: e.target.value })}
                      className="luxury-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label className="luxury-label">{t('admin.formStrapMaterial') || 'Tasma'}</label>
                    <input
                      type="text"
                      value={formData.strapMaterial}
                      onChange={(e) => setFormData({ ...formData, strapMaterial: e.target.value })}
                      className="luxury-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="luxury-label">{t('admin.formDescription') || 'Tavsif'}</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="luxury-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setIsDrawerOpen(false)} className="btn btn-outline" style={{ padding: '0.5rem 1.25rem' }}>
                    {t('common.cancel') || 'Bekor qilish'}
                  </button>
                  <button type="submit" className="btn btn-gold" style={{ padding: '0.5rem 1.5rem' }}>
                    {editingProductId ? (t('common.save') || 'Saqlash') : (t('common.create') || 'Yaratish')}
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
export default AdminProducts;
