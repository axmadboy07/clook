import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  ShoppingBag,
  Search,
  Printer,
  Eye,
  X,
  Sparkles,
  User,
  MapPin
} from 'lucide-react';
import { updateOrderStatus } from '../../store/slices/ordersSlice';
import { formatPriceWithCurrency } from '../../store/slices/localeSlice';

export const AdminOrders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.items);
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
    showToast(t('admin.ordersToastUpdated', { id: orderId, status: newStatus.toUpperCase() }) || `Buyurtma ${orderId} holati: ${newStatus.toUpperCase()}`);
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case 'pending':
        return 15;
      case 'processing':
        return 50;
      case 'shipped':
        return 80;
      case 'delivered':
        return 100;
      default:
        return 15;
    }
  };

  const getOrderStatusBadgeLabel = (status) => {
    switch (status) {
      case 'pending':
        return t('admin.statusPending') || 'Kutilmoqda';
      case 'processing':
        return t('admin.statusProcessing') || 'Jarayonda';
      case 'shipped':
        return t('admin.statusShipped') || 'Yetkazilmoqda';
      case 'delivered':
        return t('admin.statusDelivered') || 'Yetkazildi';
      default:
        return status.toUpperCase();
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesQuery =
      o.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone?.includes(searchQuery);
    const matchesStatus = selectedStatusFilter === 'All' || o.orderStatus === selectedStatusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel"
            style={{
              position: 'fixed',
              top: '1.5rem',
              right: '1.5rem',
              zIndex: 100,
              padding: '1rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-gold-subtle)',
              color: 'var(--color-gold-300)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(10, 11, 14, 0.95)'
            }}
          >
            <Sparkles size={16} />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '1.5rem',
          borderRadius: 'var(--radius-3xl)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={22} style={{ color: 'var(--color-gold-400)' }} />
            <span>{t('admin.ordersTitle') || 'Buyurtmalar Nazorati'}</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>
            {t('admin.ordersSubtitle') || 'Mijozlarning soat xaridlari, to‘lovlari va logistika statuslari'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge-gold" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}>
            {t('admin.ordersTotalCount', { count: orders.length }) || `Jami: ${orders.length} ta`}
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-2xl)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: '20rem', flex: '1 1 220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('admin.ordersSearchPlaceholder') || 'ID, mijoz yoki telefon bo‘yicha qidirish...'}
            className="luxury-input"
            style={{ width: '100%', paddingLeft: '2.5rem', paddingBlock: '0.5rem', fontSize: '0.8rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.4rem' }}>
          {[
            { key: 'All', label: t('admin.ordersFilterAll') || 'Barchasi' },
            { key: 'pending', label: t('admin.statusPending') || 'Kutilmoqda' },
            { key: 'processing', label: t('admin.statusProcessing') || 'Jarayonda' },
            { key: 'shipped', label: t('admin.statusShipped') || 'Yetkazilmoqda' },
            { key: 'delivered', label: t('admin.statusDelivered') || 'Yetkazildi' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedStatusFilter(key)}
              className={`btn-glass ${selectedStatusFilter === key ? 'active-filter' : ''}`}
              style={{
                padding: '0.4rem 0.75rem',
                fontSize: '0.75rem',
                whiteSpace: 'nowrap',
                borderColor: selectedStatusFilter === key ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                color: selectedStatusFilter === key ? 'var(--color-gold-300)' : 'var(--text-secondary)'
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List & Steppers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredOrders.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-3xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingBag size={36} style={{ color: 'var(--text-muted)' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
              {t('admin.ordersNoOrders') || 'Buyurtmalar topilmadi'}
            </h3>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isPending = order.orderStatus === 'pending';
            const progress = getStatusProgress(order.orderStatus);

            return (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel glass-panel-hover"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-3xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                {/* Order Top Bar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <span className="gold-gradient-text" style={{ fontWeight: 700, fontSize: '1rem' }}>{order.id}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({order.createdAt})</span>
                      <span className={isPending ? 'badge-amber' : order.orderStatus === 'delivered' ? 'badge-emerald' : 'badge-gold'}>
                        {getOrderStatusBadgeLabel(order.orderStatus)}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                      {t('admin.ordersCustomerLabel') || 'Mijoz:'} <strong style={{ color: 'var(--text-primary)' }}>{order.customerName}</strong> ({order.phone}) • {order.city}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>{t('admin.ordersTotalPayment') || 'JAMI TO‘LOV'}</span>
                      <span className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem' }}>
                        {formatPrice(order.totalAmountUSD)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="btn-glass tap-target-44"
                        style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)' }}
                        title={t('admin.ordersViewDetails') || 'Batafsil'}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="btn-glass tap-target-44"
                        style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)' }}
                        title={t('admin.ordersPrintReceipt') || 'Chek chiqarish'}
                      >
                        <Printer size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stepper Progress Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center', gap: '0.25rem', fontSize: '0.68rem' }}>
                    <span style={{ color: order.orderStatus === 'pending' ? 'var(--color-amber-400)' : 'var(--text-muted)', fontWeight: order.orderStatus === 'pending' ? 700 : 500 }}>
                      1. {t('admin.ordersStepReceived') || 'Qabul'}
                    </span>
                    <span style={{ color: order.orderStatus === 'processing' ? 'var(--color-amber-400)' : 'var(--text-muted)', fontWeight: order.orderStatus === 'processing' ? 700 : 500 }}>
                      2. {t('admin.ordersStepProcessing') || 'Tayyorlash'}
                    </span>
                    <span style={{ color: order.orderStatus === 'shipped' ? 'var(--color-gold-300)' : 'var(--text-muted)', fontWeight: order.orderStatus === 'shipped' ? 700 : 500 }}>
                      3. {t('admin.ordersStepCourier') || 'Kuryerda'}
                    </span>
                    <span style={{ color: order.orderStatus === 'delivered' ? 'var(--color-emerald-400)' : 'var(--text-muted)', fontWeight: order.orderStatus === 'delivered' ? 700 : 500 }}>
                      4. {t('admin.ordersStepDelivered') || 'Yetkazildi'}
                    </span>
                  </div>

                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-obsidian-950)', borderRadius: '9999px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                      style={{
                        height: '100%',
                        borderRadius: '9999px',
                        backgroundColor: order.orderStatus === 'delivered' ? 'var(--color-emerald-500)' : 'var(--color-gold-400)'
                      }}
                    />
                  </div>
                </div>

                {/* Order Items & Status Controls */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={order.items?.[0]?.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'}
                      alt="Product"
                      style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}
                    />
                    <div>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)', margin: 0, fontSize: '0.8rem' }}>{order.items?.[0]?.name}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>
                        {order.items?.[0]?.selectedCaseMaterial} × {order.items?.[0]?.quantity} {t('admin.ordersPcs') || 'dona'}
                        {order.items?.length > 1 && ` ${t('admin.ordersMoreItems', { count: order.items.length - 1 }) || `(+${order.items.length - 1} ta)`}`}
                      </p>
                    </div>
                  </div>

                  {/* Status Toggle Dropdown */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{t('admin.ordersChangeStatus') || 'Holatni o‘zgartirish:'}</span>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="luxury-input"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-300)', minWidth: '160px' }}
                    >
                      <option value="pending">{t('admin.ordersStatusPendingOpt') || 'Kutilmoqda (Pending)'}</option>
                      <option value="processing">{t('admin.ordersStatusProcessingOpt') || 'Tayyorlanmoqda (Processing)'}</option>
                      <option value="shipped">{t('admin.ordersStatusShippedOpt') || 'Kuryerga berildi (Shipped)'}</option>
                      <option value="delivered">{t('admin.ordersStatusDeliveredOpt') || 'Yetkazib berildi (Delivered)'}</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrderDetails && (
          <div className="modal-overlay" style={{ zIndex: 100 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-backdrop"
              onClick={() => setSelectedOrderDetails(null)}
            />
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="modal-content glass-panel"
              style={{
                maxWidth: '600px',
                padding: '2rem',
                borderRadius: 'var(--radius-3xl)',
                border: '1px solid var(--border-gold-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <div>
                  <span className="gold-gradient-text" style={{ fontWeight: 700, fontSize: '1.15rem', display: 'block' }}>{selectedOrderDetails.id}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sana: {selectedOrderDetails.createdAt}</span>
                </div>
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="btn-glass"
                  style={{ padding: '0.4rem', borderRadius: '50%' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.8rem' }}>
                <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: 'var(--color-gold-400)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <User size={14} />
                    <span>{t('admin.ordersModalCustomerInfo') || 'Mijoz ma’lumotlari'}</span>
                  </span>
                  <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0.25rem 0 0 0' }}>{selectedOrderDetails.customerName}</p>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{selectedOrderDetails.phone}</p>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>{selectedOrderDetails.email || t('admin.ordersModalNoEmail') || 'Email kiritilmagan'}</p>
                </div>

                <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: 'var(--color-gold-400)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <MapPin size={14} />
                    <span>{t('admin.ordersModalDeliveryAddress') || 'Yetkazib berish manzili'}</span>
                  </span>
                  <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0.25rem 0 0 0' }}>{selectedOrderDetails.city}</p>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{selectedOrderDetails.address}</p>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>{selectedOrderDetails.notes || t('admin.ordersModalNoNotes') || 'Qo‘shimcha izoh yo‘q'}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{t('admin.ordersModalPurchasedWatches') || 'Buyurtma qilingan soatlar:'}</span>
                {selectedOrderDetails.items?.map((item, idx) => (
                  <div key={idx} className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: '3rem', height: '3rem', objectFit: 'contain', borderRadius: 'var(--radius-md)' }} />
                      <div>
                        <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: 0, fontSize: '0.8rem' }}>{item.name}</p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>{item.selectedCaseMaterial} × {item.quantity} {t('admin.ordersPcs') || 'dona'}</p>
                      </div>
                    </div>
                    <span className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.9rem' }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="text-secondary" style={{ fontSize: '0.85rem' }}>{t('admin.ordersModalTotal') || 'Jami summa:'}</span>
                <span className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.5rem' }}>
                  {formatPrice(selectedOrderDetails.totalAmountUSD)}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOrders;
