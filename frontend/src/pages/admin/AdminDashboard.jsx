import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  Sparkles,
  ChevronRight,
  Plus
} from 'lucide-react';
import { formatPriceWithCurrency } from '../../store/slices/localeSlice';

export const AdminDashboard = () => {
  const { t } = useTranslation();
  const orders = useSelector((state) => state.orders.items);
  const products = useSelector((state) => state.products.items);
  const users = useSelector((state) => state.auth.users);
  const { currency, exchangeRates } = useSelector((state) => state.locale);

  const formatPrice = (amount) => formatPriceWithCurrency(amount, currency, exchangeRates);

  const [activeChartTab, setActiveChartTab] = useState('revenue');
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmountUSD || 0), 0);
  const totalItemsCount = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'pending').length;

  // Monthly Sales Chart Data
  const monthlyData = [
    { month: t('admin.months.jan') || 'Yan', revenue: 24000, orders: 12 },
    { month: t('admin.months.feb') || 'Fev', revenue: 38000, orders: 19 },
    { month: t('admin.months.mar') || 'Mar', revenue: 31000, orders: 15 },
    { month: t('admin.months.apr') || 'Apr', revenue: 49000, orders: 24 },
    { month: t('admin.months.may') || 'May', revenue: 58000, orders: 28 },
    { month: t('admin.months.jun') || 'Iyun', revenue: 64000, orders: 32 },
    { month: t('admin.months.jul') || 'Iyul', revenue: 78000, orders: 39 },
    { month: t('admin.months.aug') || 'Avg', revenue: 92000, orders: 46 },
    { month: t('admin.months.sep') || 'Sen', revenue: 108000, orders: 54 },
  ];

  const maxVal = Math.max(...monthlyData.map((d) => d.revenue));

  const stats = [
    {
      title: t('admin.dashStatRevenue') || 'Umumiy Tushum',
      value: formatPrice(totalRevenue > 0 ? totalRevenue : 148500),
      subtext: t('admin.dashStatRevenueSub') || 'O‘tgan oyga nisbatan',
      badgeText: '+24.6%',
      icon: <DollarSign size={22} style={{ color: 'var(--color-emerald-400)' }} />,
      badgeClass: 'badge-emerald',
    },
    {
      title: t('admin.dashStatOrders') || 'Buyurtmalar Soni',
      value: `${orders.length}`,
      subtext: t('admin.dashStatOrdersSub') || 'Kutilayotgan',
      badgeText: `${pendingOrdersCount} ${t('admin.dashStatPending') || 'Kutilmoqda'}`,
      icon: <ShoppingBag size={22} style={{ color: 'var(--color-gold-400)' }} />,
      badgeClass: 'badge-gold',
    },
    {
      title: t('admin.dashStatWatches') || 'Katalogdagi Soatlar',
      value: `${inStockCount} / ${totalItemsCount}`,
      subtext: t('admin.dashStatWatchesSub') || 'Omborda mavjud',
      badgeText: t('admin.dashStatWatchesActive') || 'Faol',
      icon: <Package size={22} style={{ color: 'var(--color-gold-300)' }} />,
      badgeClass: 'badge-gold',
    },
    {
      title: t('admin.dashStatUsers') || 'Mijozlar Bazasi',
      value: `${users.length}`,
      subtext: t('admin.dashStatUsersSub') || 'Ro‘yxatdan o‘tgan',
      badgeText: t('admin.dashStatUsersWeek') || 'Ushbu haftada +4',
      icon: <Users size={22} style={{ color: 'var(--color-rosegold-400)' }} />,
      badgeClass: 'badge-amber',
    },
  ];

  const brandStats = [
    { name: 'Rolex', percentage: 35, color: '#e5be4e' },
    { name: 'Tissot', percentage: 22, color: '#f43f5e' },
    { name: 'Seiko', percentage: 18, color: '#10b981' },
    { name: 'Casio / G-Shock', percentage: 15, color: '#38bdf8' },
    { name: 'Others', percentage: 10, color: '#a855f7' },
  ];

  const getOrderStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return t('admin.statusPending') || 'Kutilmoqda';
      case 'processing':
        return t('admin.statusProcessing') || 'Jarayonda';
      case 'shipped':
        return t('admin.statusShipped') || 'Yetkazilmoqda';
      case 'delivered':
        return t('admin.statusDelivered') || 'Yetkazildi';
      case 'cancelled':
        return t('admin.statusCancelled') || 'Bekor qilindi';
      default:
        return status.toUpperCase();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          borderRadius: 'var(--radius-3xl)',
          border: '1px solid var(--border-gold-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: 'radial-gradient(circle at top right, rgba(212,175,55,0.12) 0%, var(--bg-obsidian-900) 100%)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-gold-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <Sparkles size={14} />
            <span>{t('admin.dashAnalyticsBadge') || 'CHRONOS REAL-TIME ATELIER INTELLIGENCE'}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {t('admin.dashTitle') || 'Horology Executive Dashboard'}
          </h1>
          <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>
            {t('admin.dashSubtitle') || 'Sotuvlar, buyurtmalar oqimi va xalqaro mijozlar operatsiyalari monitoringi'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            to="/admin/products"
            className="btn-gold"
            style={{ padding: '0.75rem 1.25rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem', textDecoration: 'none' }}
          >
            <Plus size={15} />
            <span>{t('admin.addProduct') || 'Yangi Mahsulot'}</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.title}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>
                  {stat.value}
                </h3>
              </div>

              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--bg-obsidian-950)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}>
              <span className="text-muted">{stat.subtext}</span>
              <span className={stat.badgeClass} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                {stat.badgeText}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts & Analytics Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Left: Interactive Sales Trend Chart */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-3xl)', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: '2 1 500px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} style={{ color: 'var(--color-gold-400)' }} />
                <span>{t('admin.dashSalesTrendTitle') || 'Savdo Dinamikasi & Tushum'}</span>
              </h3>
              <p className="text-muted" style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>
                {t('admin.dashSalesTrendSub') || 'Oylik daromad va buyurtmalar statistikasi'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setActiveChartTab('revenue')}
                className={`btn-glass ${activeChartTab === 'revenue' ? 'active-filter' : ''}`}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  borderColor: activeChartTab === 'revenue' ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                  color: activeChartTab === 'revenue' ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                }}
              >
                {t('admin.dashTabRevenue') || 'Daromad'}
              </button>
              <button
                onClick={() => setActiveChartTab('orders')}
                className={`btn-glass ${activeChartTab === 'orders' ? 'active-filter' : ''}`}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  borderColor: activeChartTab === 'orders' ? 'var(--color-gold-400)' : 'var(--border-subtle)',
                  color: activeChartTab === 'orders' ? 'var(--color-gold-300)' : 'var(--text-secondary)'
                }}
              >
                {t('admin.dashTabOrders') || 'Buyurtmalar'}
              </button>
            </div>
          </div>

          {/* Interactive Chart Canvas */}
          <div style={{ position: 'relative', paddingTop: '1.5rem' }}>
            {hoveredDataPoint && (
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(10, 11, 14, 0.95)',
                  border: '1px solid var(--color-gold-400)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-gold-300)',
                  boxShadow: 'var(--shadow-gold-glow)',
                  pointerEvents: 'none',
                  zIndex: 30
                }}
              >
                <strong>{hoveredDataPoint.month}:</strong>{' '}
                {activeChartTab === 'revenue'
                  ? formatPrice(hoveredDataPoint.revenue)
                  : `${hoveredDataPoint.orders} ta buyurtma`}
              </div>
            )}

            <div style={{ height: '16rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.65rem' }}>
              {monthlyData.map((data, idx) => {
                const val = activeChartTab === 'revenue' ? data.revenue : data.orders;
                const max = activeChartTab === 'revenue' ? maxVal : 60;
                const heightPercent = Math.max(12, Math.round((val / max) * 100));
                const isCurrent = idx === monthlyData.length - 1;

                return (
                  <div
                    key={data.month}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end', cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredDataPoint(data)}
                    onMouseLeave={() => setHoveredDataPoint(null)}
                  >
                    {/* Animated Bar with Glow */}
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '38px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        height: '100%',
                        border: isCurrent ? '1px solid var(--color-gold-400)' : '1px solid rgba(212, 175, 55, 0.2)',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                        style={{
                          width: '100%',
                          borderRadius: 'var(--radius-sm)',
                          background: isCurrent
                            ? 'linear-gradient(180deg, #fce7a4 0%, #e5be4e 50%, #b88628 100%)'
                            : 'linear-gradient(180deg, #d4a44c 0%, #966718 100%)',
                          boxShadow: isCurrent ? '0 0 20px rgba(229, 190, 78, 0.4)' : 'none'
                        }}
                      />
                    </div>

                    {/* Month Label */}
                    <span style={{ fontSize: '0.75rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? 'var(--color-gold-300)' : 'var(--text-muted)' }}>
                      {data.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Category / Brand Distribution */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-3xl)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem', flex: '1 1 300px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', margin: 0 }}>
              {t('admin.dashBrandShareTitle') || 'Brendlar Bo‘yicha Taqsimot'}
            </h3>
            <p className="text-muted" style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>
              {t('admin.dashBrandShareSub') || 'Umumiy savdodagi ulush'}
            </p>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {brandStats.map((brand) => (
                <div key={brand.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{brand.name}</span>
                    <span className="gold-gradient-text" style={{ fontWeight: 700 }}>{brand.percentage}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-obsidian-950)', borderRadius: '9999px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${brand.percentage}%` }}
                      transition={{ duration: 0.8 }}
                      style={{ height: '100%', backgroundColor: brand.color, borderRadius: '9999px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-xl)', fontSize: '0.75rem', border: '1px solid var(--border-gold-subtle)' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-gold-400)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Sparkles size={14} />
              <span>{t('admin.dashBestSellingModel') || 'Eng Ko‘p Sotilgan Model'}</span>
            </span>
            <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-primary)' }}>Rolex Cosmograph Daytona Gold (42 dona)</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Overview Table */}
      <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-3xl)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
              {t('admin.dashRecentOrdersTitle') || 'So‘nggi Buyurtmalar'}
            </h3>
            <p className="text-muted" style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>
              {t('admin.dashRecentOrdersSub') || 'Tizimga yangi kelib tushgan tranzaksiyalar'}
            </p>
          </div>

          <Link
            to="/admin/orders"
            style={{ fontSize: '0.75rem', color: 'var(--color-gold-400)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <span>{t('admin.dashViewAll') || 'Barchasini Ko‘rish'} ({orders.length})</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="admin-table-scroll">
          <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{t('admin.dashColOrderId') || 'ID'}</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{t('admin.dashColCustomer') || 'Mijoz'}</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{t('admin.dashColProduct') || 'Mahsulot'}</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{t('admin.dashColPaymentMethod') || 'To‘lov'}</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{t('admin.dashColTotal') || 'Summa'}</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{t('admin.dashColStatus') || 'Holat'}</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => {
                const isPending = order.orderStatus === 'pending';
                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--color-gold-400)', fontWeight: 700, whiteSpace: 'nowrap' }}>{order.id}</td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{order.customerName}</td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)', minWidth: '180px' }}>
                      {order.items[0]?.name} {order.items.length > 1 && `(+${order.items.length - 1})`}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{order.paymentMethod}</td>
                    <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                      {formatPrice(order.totalAmountUSD)}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      <span className={isPending ? 'badge-amber' : order.orderStatus === 'delivered' ? 'badge-emerald' : 'badge-gold'}>
                        {getOrderStatusLabel(order.orderStatus)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
