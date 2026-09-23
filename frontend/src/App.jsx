import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// Layout & Global Drawers
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { CartDrawer } from './components/layout/CartDrawer.jsx';
import { WishlistDrawer } from './components/layout/WishlistDrawer.jsx';
import { ComparisonModal } from './components/common/ComparisonModal.jsx';
import { Preloader } from './components/common/Preloader.jsx';
import { SoundController } from './components/common/SoundController.jsx';
import { ConciergeLiveChat } from './components/common/ConciergeLiveChat.jsx';

// Storefront Pages
import { HomePage } from './pages/HomePage.jsx';
import { CatalogPage } from './pages/CatalogPage.jsx';
import { ProductDetailPage } from './pages/ProductDetailPage.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { CheckoutPage } from './pages/CheckoutPage.jsx';
import { AboutHeritagePage } from './pages/AboutHeritagePage.jsx';
import { ContactConciergePage } from './pages/ContactConciergePage.jsx';
import { ComparePage } from './pages/ComparePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { BlogPage } from './pages/BlogPage.jsx';
import { FAQPage } from './pages/FAQPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

// Admin Pages & Layout
import { AdminLayout } from './components/admin/AdminLayout.jsx';
import { AdminLoginPage } from './pages/admin/AdminLoginPage.jsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.jsx';
import { AdminProducts } from './pages/admin/AdminProducts.jsx';
import { AdminOrders } from './pages/admin/AdminOrders.jsx';
import { AdminUsers } from './pages/admin/AdminUsers.jsx';
import { AdminReviews } from './pages/admin/AdminReviews.jsx';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Protected Route for Storefront Users (Profile, Orders)
const UserProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

// Protected Route for Admin Central
const AdminProtectedRoute = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <AdminLayout />;
};

// Storefront Wrapper with Shared Navbar, Footer & Global Drawers
const StorefrontLayout = () => {
  const location = useLocation();
  const hideFooter = ['/login', '/register', '/signin', '/signup'].includes(location.pathname);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--text-primary)' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ flex: 1 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {!hideFooter && <Footer />}

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ComparisonModal />

      {/* Horological Escapement Audio & VIP Concierge */}
      <SoundController />
      <ConciergeLiveChat />
    </div>
  );
};

export function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="reviews" element={<AdminReviews />} />
          </Route>

          {/* Public Storefront Routes */}
          <Route element={<StorefrontLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/watch/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected User Routes */}
            <Route element={<UserProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="/heritage" element={<AboutHeritagePage />} />
            <Route path="/about" element={<AboutHeritagePage />} />
            <Route path="/contact" element={<ContactConciergePage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
