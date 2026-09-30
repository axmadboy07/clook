import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import localeReducer from './slices/localeSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import notificationsReducer from './slices/notificationsSlice';
import compareReducer from './slices/compareSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    locale: localeReducer,
    products: productsReducer,
    orders: ordersReducer,
    notifications: notificationsReducer,
    compare: compareReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Automatic real-time synchronization with PostgreSQL backend & Swagger
import('../api').then(({ cartApi, wishlistApi }) => {
  let prevCartItems = null;
  let prevWishlistItems = null;
  let syncTimeout = null;

  store.subscribe(() => {
    try {
      const state = store.getState();
      const currentCart = state.cart?.items;
      const currentWishlist = state.wishlist?.items;
      const currentUser = state.auth?.currentUser;
      const userId = currentUser?.id || currentUser?.email || 7;

      if (currentCart !== prevCartItems || currentWishlist !== prevWishlistItems) {
        const cartChanged = currentCart !== prevCartItems;
        const wishChanged = currentWishlist !== prevWishlistItems;
        prevCartItems = currentCart;
        prevWishlistItems = currentWishlist;

        clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
          if (cartChanged && Array.isArray(currentCart)) {
            cartApi.sync(currentCart, userId).catch(() => {});
          }
          if (wishChanged && Array.isArray(currentWishlist)) {
            wishlistApi.sync(currentWishlist, userId).catch(() => {});
          }
        }, 400);
      }
    } catch (e) {
      // safe catch
    }
  });
}).catch(() => {});

export default store;
