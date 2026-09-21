import { useSelector, useDispatch } from 'react-redux';
import { setCurrency, toggleCurrency, formatPriceWithCurrency } from './slices/localeSlice';

export interface CurrencyStore {
  currency: string;
  exchangeRates: Record<string, number>;
  setCurrency: (currency: string) => void;
  toggleCurrency: () => void;
  formatPrice: (amount: number) => string;
}

export const useCurrencyStore = (): CurrencyStore => {
  const dispatch = useDispatch();
  const { currency, exchangeRates } = useSelector((state: any) => state.locale);

  return {
    currency,
    exchangeRates,
    setCurrency: (curr: string) => dispatch(setCurrency(curr)),
    toggleCurrency: () => dispatch(toggleCurrency()),
    formatPrice: (amount: number) => formatPriceWithCurrency(amount, currency, exchangeRates),
  };
};

export default useCurrencyStore;
