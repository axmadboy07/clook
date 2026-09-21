import { createSlice } from '@reduxjs/toolkit';
import { WATCHES } from '../../data/watches';

const STORAGE_KEY = 'chronos_products_state_v4';

const loadInitialProducts = () => {
  try {
    // Clear legacy keys if present
    ['chronos_products_state', 'chronos_products_state_v2', 'chronos_products_state_v3'].forEach((k) => {
      try { localStorage.removeItem(k); } catch(e) {}
    });

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge with current WATCHES images to ensure verified luxury watch photos are displayed
        return parsed.map((item) => {
          const defaultWatch = WATCHES.find((w) => w.id === item.id);
          if (defaultWatch && defaultWatch.images) {
            return {
              ...item,
              images: defaultWatch.images
            };
          }
          return item;
        });
      }
    }
  } catch (e) {
    // Graceful fallback
  }
  return WATCHES;
};

const saveProductsToLocalStorage = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    // Safe catch
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: loadInitialProducts(),
    selectedCategory: 'All Timepieces',
    searchQuery: '',
    sortOption: 'featured',
    selectedBrand: 'all',
    selectedMaterial: 'all',
    priceRange: [0, 50000],
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setSelectedMaterial: (state, action) => {
      state.selectedMaterial = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    addProduct: (state, action) => {
      const newProduct = {
        id: `watch-${Date.now()}`,
        rating: 5.0,
        reviewsCount: 0,
        reviews: [],
        inStock: true,
        stockCount: 5,
        ...action.payload,
      };
      state.items.unshift(newProduct);
      saveProductsToLocalStorage(state.items);
    },
    updateProduct: (state, action) => {
      const updated = action.payload;
      state.items = state.items.map((p) => (p.id === updated.id ? { ...p, ...updated } : p));
      saveProductsToLocalStorage(state.items);
    },
    deleteProduct: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((p) => p.id !== id);
      saveProductsToLocalStorage(state.items);
    },
    toggleStock: (state, action) => {
      const id = action.payload;
      state.items = state.items.map((p) =>
        p.id === id ? { ...p, inStock: !p.inStock } : p
      );
      saveProductsToLocalStorage(state.items);
    },
    approveReview: (state, action) => {
      const { productId, reviewId } = action.payload;
      state.items = state.items.map((p) => {
        if (p.id !== productId) return p;
        const reviews = (p.reviews || []).map((r) =>
          r.id === reviewId ? { ...r, status: 'approved' } : r
        );
        return { ...p, reviews };
      });
      saveProductsToLocalStorage(state.items);
    },
    deleteReview: (state, action) => {
      const { productId, reviewId } = action.payload;
      state.items = state.items.map((p) => {
        if (p.id !== productId) return p;
        const reviews = (p.reviews || []).filter((r) => r.id !== reviewId);
        return { ...p, reviews, reviewsCount: Math.max(0, (p.reviewsCount || 1) - 1) };
      });
      saveProductsToLocalStorage(state.items);
    },
    addProductReview: (state, action) => {
      const { productId, review } = action.payload;
      state.items = state.items.map((p) => {
        if (p.id !== productId) return p;
        const newReview = {
          id: `rev-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          status: 'pending',
          verifiedBuyer: true,
          ...review,
        };
        const reviews = [newReview, ...(p.reviews || [])];
        return { ...p, reviews, reviewsCount: (p.reviewsCount || 0) + 1 };
      });
      saveProductsToLocalStorage(state.items);
    },
    resetToDefaultProducts: (state) => {
      state.items = WATCHES;
      saveProductsToLocalStorage(WATCHES);
    },
    resetFilters: (state) => {
      state.selectedCategory = 'All Timepieces';
      state.searchQuery = '';
      state.sortOption = 'featured';
      state.selectedBrand = 'all';
      state.selectedMaterial = 'all';
      state.priceRange = [0, 50000];
    },
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  setSortOption,
  setSelectedBrand,
  setSelectedMaterial,
  setPriceRange,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleStock,
  approveReview,
  deleteReview,
  addProductReview,
  resetToDefaultProducts,
  resetFilters,
} = productsSlice.actions;

export const selectAllProducts = (state) => state.products.items;
export const selectProductById = (id) => (state) =>
  state.products.items.find((p) => p.id === id);

export default productsSlice.reducer;
