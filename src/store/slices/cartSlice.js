import { createSlice } from '@reduxjs/toolkit';

const loadInitialCart = () => {
  try {
    const saved = localStorage.getItem('chronos_cart_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        items: parsed.items || [],
        isCartDrawerOpen: false,
        couponCode: parsed.couponCode || parsed.discountCode || '',
        discountCode: parsed.discountCode || parsed.couponCode || '',
        discountPercentage: parsed.discountPercentage || parsed.discountPercent || 0,
        discountPercent: parsed.discountPercent || parsed.discountPercentage || 0,
        vaultPackaging: parsed.vaultPackaging || false,
      };
    }
  } catch (e) {
    // Graceful fallback
  }
  return {
    items: [],
    isCartDrawerOpen: false,
    couponCode: '',
    discountCode: '',
    discountPercentage: 0,
    discountPercent: 0,
    vaultPackaging: false,
  };
};

const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem(
      'chronos_cart_state',
      JSON.stringify({
        items: state.items,
        couponCode: state.couponCode,
        discountCode: state.discountCode,
        discountPercentage: state.discountPercentage,
        discountPercent: state.discountPercent,
        vaultPackaging: state.vaultPackaging,
      })
    );
  } catch (e) {
    // Safe catch
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadInitialCart(),
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      const watch = payload.watch || payload;
      const customConfig = payload.customConfig;
      const quantity = payload.quantity || 1;
      
      const itemKey = payload.key || `${watch.id}-${customConfig?.caseMaterial || watch.caseMaterial || ''}-${customConfig?.strapMaterial || watch.strapMaterial || ''}-${customConfig?.dialColor || watch.dialColor || ''}`;
      
      const existingIndex = state.items.findIndex((item) => item.key === itemKey || (item.id && item.id === watch.id && !customConfig));

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          key: itemKey,
          id: watch.id,
          name: watch.name,
          price: watch.price,
          brand: watch.brand,
          imageUrl: watch.imageUrl || watch.images?.[0],
          watch: watch,
          quantity,
          customConfig: customConfig || {
            caseMaterial: watch.caseMaterial,
            strapMaterial: watch.strapMaterial,
            dialColor: watch.dialColor,
          },
          addedAt: Date.now(),
        });
      }

      state.isCartDrawerOpen = true;
      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      const identifier = action.payload;
      state.items = state.items.filter((item) => item.key !== identifier && item.id !== identifier);
      saveCartToLocalStorage(state);
    },

    updateQuantity: (state, action) => {
      const { key, id, quantity } = action.payload;
      const targetId = key || id;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.key !== targetId && item.id !== targetId);
      } else {
        const item = state.items.find((item) => item.key === targetId || item.id === targetId);
        if (item) {
          item.quantity = quantity;
        }
      }
      saveCartToLocalStorage(state);
    },

    toggleCartDrawer: (state, action) => {
      if (typeof action.payload === 'boolean') {
        state.isCartDrawerOpen = action.payload;
      } else {
        state.isCartDrawerOpen = !state.isCartDrawerOpen;
      }
    },

    setCartDrawerOpen: (state, action) => {
      state.isCartDrawerOpen = !!action.payload;
    },

    clearCart: (state) => {
      state.items = [];
      state.couponCode = '';
      state.discountCode = '';
      state.discountPercentage = 0;
      state.discountPercent = 0;
      saveCartToLocalStorage(state);
    },

    applyCoupon: (state, action) => {
      const { code, percentage } = action.payload;
      state.couponCode = code;
      state.discountCode = code;
      state.discountPercentage = percentage;
      state.discountPercent = percentage;
      saveCartToLocalStorage(state);
    },

    removeCoupon: (state) => {
      state.couponCode = '';
      state.discountCode = '';
      state.discountPercentage = 0;
      state.discountPercent = 0;
      saveCartToLocalStorage(state);
    },

    toggleVaultPackaging: (state) => {
      state.vaultPackaging = !state.vaultPackaging;
      saveCartToLocalStorage(state);
    },

    applyDiscount: (state, action) => {
      const code = (action.payload || '').trim().toUpperCase();
      let percent = 0;
      if (code === 'CHRONOS10' || code === 'VIP10' || code === 'AURA10') {
        percent = 10;
      } else if (code === 'ROYAL15') {
        percent = 15;
      } else if (code === 'AURA20' || code === 'GENEVA20') {
        percent = 20;
      }
      if (percent > 0) {
        state.couponCode = code;
        state.discountCode = code;
        state.discountPercentage = percent;
        state.discountPercent = percent;
      }
      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleCartDrawer,
  setCartDrawerOpen,
  clearCart,
  applyCoupon,
  removeCoupon,
  toggleVaultPackaging,
  applyDiscount,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectIsCartDrawerOpen = (state) => state.cart.isCartDrawerOpen;
export const selectCartTotalCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, item) => {
    const price = item.price || item.watch?.price || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

export const selectCartDiscount = (state) => {
  const subtotal = selectCartSubtotal(state);
  const percent = state.cart.discountPercentage || state.cart.discountPercent || 0;
  return (subtotal * percent) / 100;
};

export const selectCartFinalTotal = (state) => {
  const subtotal = selectCartSubtotal(state);
  const discount = selectCartDiscount(state);
  return Math.max(0, subtotal - discount);
};

export default cartSlice.reducer;
