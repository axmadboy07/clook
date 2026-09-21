import { createSlice } from '@reduxjs/toolkit';

const INITIAL_USERS = [
  {
    id: 'user-admin',
    name: 'Admin Director',
    email: 'admin@chronos.uz',
    phone: '+998901234567',
    password: 'admin123',
    role: 'admin',
    joinedDate: '2026-01-01',
    addresses: [
      {
        id: 'addr-1',
        title: 'Tashkent Central Office',
        city: 'Toshkent',
        address: 'Amir Temur shoh ko‘chasi, 107-B',
        isDefault: true,
      },
    ],
  },
  {
    id: 'user-client-1',
    name: 'Alisher Navoiy',
    email: 'alisher@aura.uz',
    phone: '+998909876543',
    password: 'user123',
    role: 'user',
    joinedDate: '2026-04-12',
    addresses: [
      {
        id: 'addr-2',
        title: 'Uyim (Toshkent)',
        city: 'Toshkent',
        address: 'Chilonzor tumani, 9-mavze, 14-uy',
        isDefault: true,
      },
    ],
  },
];

const loadInitialState = () => {
  try {
    const saved = localStorage.getItem('chronos_auth_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        users: parsed.users || INITIAL_USERS,
        currentUser: parsed.currentUser || null,
        token: parsed.token || null,
        isAuthenticated: !!parsed.currentUser,
        isAdmin: parsed.currentUser?.role === 'admin',
      };
    }
  } catch (e) {
    // Graceful fallback
  }
  return {
    users: INITIAL_USERS,
    currentUser: null,
    token: null,
    isAuthenticated: false,
    isAdmin: false,
  };
};

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem(
      'chronos_auth_state',
      JSON.stringify({
        users: state.users,
        currentUser: state.currentUser,
        token: state.token,
      })
    );
  } catch (e) {
    // Safe catch
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    login: (state, action) => {
      const { emailOrPhone, password } = action.payload;
      const cleanIdentifier = (emailOrPhone || '').trim().toLowerCase();
      const user = state.users.find(
        (u) =>
          (u.email.toLowerCase() === cleanIdentifier || u.phone === cleanIdentifier) &&
          u.password === password
      );

      if (user) {
        state.currentUser = user;
        state.token = `jwt_${user.id}_${Date.now()}`;
        state.isAuthenticated = true;
        state.isAdmin = user.role === 'admin';
        saveToLocalStorage(state);
      }
    },
    register: (state, action) => {
      const userData = action.payload;
      const newUser = {
        id: `user-${Date.now()}`,
        role: 'user',
        joinedDate: new Date().toISOString().split('T')[0],
        addresses: userData.address
          ? [
              {
                id: `addr-${Date.now()}`,
                title: 'Asosiy manzil',
                city: userData.city || 'Toshkent',
                address: userData.address,
                isDefault: true,
              },
            ]
          : [],
        ...userData,
      };

      state.users.push(newUser);
      state.currentUser = newUser;
      state.token = `jwt_${newUser.id}_${Date.now()}`;
      state.isAuthenticated = true;
      state.isAdmin = false;
      saveToLocalStorage(state);
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      saveToLocalStorage(state);
    },
    updateProfile: (state, action) => {
      if (!state.currentUser) return;
      const updatedUser = { ...state.currentUser, ...action.payload };
      state.currentUser = updatedUser;
      state.users = state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
      saveToLocalStorage(state);
    },
    addAddress: (state, action) => {
      if (!state.currentUser) return;
      const newAddr = {
        id: `addr-${Date.now()}`,
        ...action.payload,
        isDefault: (state.currentUser.addresses || []).length === 0,
      };
      const addresses = [...(state.currentUser.addresses || []), newAddr];
      state.currentUser.addresses = addresses;
      state.users = state.users.map((u) =>
        u.id === state.currentUser.id ? { ...u, addresses } : u
      );
      saveToLocalStorage(state);
    },
    deleteAddress: (state, action) => {
      if (!state.currentUser) return;
      const addressId = action.payload;
      const addresses = (state.currentUser.addresses || []).filter((a) => a.id !== addressId);
      state.currentUser.addresses = addresses;
      state.users = state.users.map((u) =>
        u.id === state.currentUser.id ? { ...u, addresses } : u
      );
      saveToLocalStorage(state);
    },
    setDefaultAddress: (state, action) => {
      if (!state.currentUser) return;
      const addressId = action.payload;
      const addresses = (state.currentUser.addresses || []).map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      }));
      state.currentUser.addresses = addresses;
      state.users = state.users.map((u) =>
        u.id === state.currentUser.id ? { ...u, addresses } : u
      );
      saveToLocalStorage(state);
    },
    changePassword: (state, action) => {
      if (!state.currentUser) return;
      const { newPassword } = action.payload;
      state.currentUser.password = newPassword;
      state.users = state.users.map((u) =>
        u.id === state.currentUser.id ? { ...u, password: newPassword } : u
      );
      saveToLocalStorage(state);
    },
    toggleUserBan: (state, action) => {
      const userId = action.payload;
      state.users = state.users.map((u) =>
        u.id === userId ? { ...u, isBanned: !u.isBanned } : u
      );
      saveToLocalStorage(state);
    },
  },
});

export const {
  login,
  register,
  logout,
  updateProfile,
  addAddress,
  deleteAddress,
  setDefaultAddress,
  changePassword,
  toggleUserBan,
} = authSlice.actions;

export default authSlice.reducer;
