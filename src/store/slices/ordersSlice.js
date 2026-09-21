import { createSlice } from '@reduxjs/toolkit';

const INITIAL_ORDERS = [
  {
    id: 'UZ-892104',
    userId: 'user-client-1',
    customerName: 'Alisher Navoiy',
    phone: '+998909876543',
    email: 'alisher@aura.uz',
    city: 'Toshkent',
    address: 'Chilonzor tumani, 9-mavze, 14-uy',
    items: [
      {
        id: 'tissot-prx-rosegold',
        name: 'Tissot PRX Powermatic 80',
        brand: 'Tissot',
        price: 950,
        quantity: 1,
        selectedCaseMaterial: '18K Rose Gold',
        selectedStrapMaterial: 'Titanium Link',
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    totalAmountUSD: 950,
    paymentMethod: 'Payme',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    createdAt: '2026-08-15 14:30',
    notes: 'Kuryer qo‘ng‘iroq qilib kelsin.',
  },
  {
    id: 'UZ-541290',
    userId: 'user-client-1',
    customerName: 'Alisher Navoiy',
    phone: '+998909876543',
    email: 'alisher@aura.uz',
    city: 'Toshkent',
    address: 'Chilonzor tumani, 9-mavze, 14-uy',
    items: [
      {
        id: 'gshock-mtg-carbon',
        name: 'Casio G-Shock MT-G Carbon Titanium',
        brand: 'G-Shock',
        price: 1450,
        quantity: 1,
        selectedCaseMaterial: 'Stealth Carbon',
        selectedStrapMaterial: 'Rubber Sport',
        image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    totalAmountUSD: 1450,
    paymentMethod: 'Click',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    createdAt: '2026-09-08 10:15',
    notes: 'Tezkor yetkazib berish.',
  },
];

const loadInitialOrders = () => {
  try {
    const saved = localStorage.getItem('chronos_orders_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // Graceful fallback
  }
  return INITIAL_ORDERS;
};

const saveOrdersToLocalStorage = (orders) => {
  try {
    localStorage.setItem('chronos_orders_state', JSON.stringify(orders));
  } catch (e) {
    // Safe catch
  }
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: loadInitialOrders(),
  },
  reducers: {
    createOrder: (state, action) => {
      const orderData = action.payload;
      const orderId = `UZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder = {
        id: orderId,
        createdAt: new Date().toLocaleString('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        orderStatus: 'pending',
        paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'pending' : 'paid',
        ...orderData,
      };

      state.items.unshift(newOrder);
      saveOrdersToLocalStorage(state.items);
    },

    updateOrderStatus: (state, action) => {
      const { orderId, newStatus } = action.payload;
      state.items = state.items.map((o) =>
        o.id === orderId ? { ...o, orderStatus: newStatus } : o
      );
      saveOrdersToLocalStorage(state.items);
    },

    updatePaymentStatus: (state, action) => {
      const { orderId, newPaymentStatus } = action.payload;
      state.items = state.items.map((o) =>
        o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o
      );
      saveOrdersToLocalStorage(state.items);
    },

    deleteOrder: (state, action) => {
      const orderId = action.payload;
      state.items = state.items.filter((o) => o.id !== orderId);
      saveOrdersToLocalStorage(state.items);
    },
  },
});

export const { createOrder, updateOrderStatus, updatePaymentStatus, deleteOrder } =
  ordersSlice.actions;

export const selectAllOrders = (state) => state.orders.items;
export const selectUserOrders = (userId) => (state) =>
  state.orders.items.filter((o) => o.userId === userId);

export default ordersSlice.reducer;
