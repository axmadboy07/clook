import { createSlice } from '@reduxjs/toolkit';
import i18n from '../../i18n';

const loadInitialLocale = () => {
  try {
    const savedLang = localStorage.getItem('chronos_language') || 'uz';
    const savedCurrency = localStorage.getItem('chronos_currency') || 'USD';
    return {
      language: savedLang,
      currency: savedCurrency, // 'USD' | 'EUR' | 'UZS'
      exchangeRates: {
        USD: 1,
        EUR: 0.92,
        UZS: 12850,
      },
    };
  } catch (e) {
    // Graceful fallback if localStorage is disabled or restricted
  }
  return {
    language: 'uz',
    currency: 'USD',
    exchangeRates: {
      USD: 1,
      EUR: 0.92,
      UZS: 12850,
    },
  };
};

const localeSlice = createSlice({
  name: 'locale',
  initialState: loadInitialLocale(),
  reducers: {
    setLanguage: (state, action) => {
      const lang = action.payload;
      state.language = lang;
      try {
        localStorage.setItem('chronos_language', lang);
        i18n.changeLanguage(lang);
      } catch (e) {
        // Safe catch
      }
    },

    setCurrency: (state, action) => {
      const curr = action.payload;
      state.currency = curr;
      try {
        localStorage.setItem('chronos_currency', curr);
      } catch (e) {
        // Safe catch
      }
    },

    toggleCurrency: (state) => {
      const currencies = ['USD', 'EUR', 'UZS'];
      const nextIndex = (currencies.indexOf(state.currency) + 1) % currencies.length;
      state.currency = currencies[nextIndex];
      try {
        localStorage.setItem('chronos_currency', state.currency);
      } catch (e) {
        // Safe catch
      }
    },
  },
});

export const { setLanguage, setCurrency, toggleCurrency } = localeSlice.actions;

// Currency Formatter Helper
export const formatPriceWithCurrency = (amountInUSD, currency = 'USD', rates = { USD: 1, EUR: 0.92, UZS: 12850 }) => {
  if (amountInUSD === undefined || amountInUSD === null || isNaN(amountInUSD)) {
    return '$0';
  }

  const rate = rates[currency] || 1;
  const converted = amountInUSD * rate;

  if (currency === 'UZS') {
    return `${Math.round(converted).toLocaleString('uz-UZ')} UZS`;
  }
  if (currency === 'EUR') {
    return `€${Math.round(converted).toLocaleString('de-DE')}`;
  }
  return `$${Math.round(converted).toLocaleString('en-US')}`;
};

export default localeSlice.reducer;
