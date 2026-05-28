import { create } from 'zustand';
import { CapitalGains, Holding } from '../types';

export type SortField = 'asset' | 'holdings' | 'averageBuyPrice' | 'currentPrice' | 'stcg' | 'ltcg';
export type SortOrder = 'asc' | 'desc';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

interface TaxStore {
  holdings: Holding[];
  originalGains: CapitalGains | null;
  sellAmounts: Record<string, number>; // id -> amount
  searchQuery: string;
  sortField: SortField;
  sortOrder: SortOrder;
  userProfile: UserProfile;
  
  // Actions
  setHoldings: (holdings: Holding[]) => void;
  setOriginalGains: (gains: CapitalGains) => void;
  setSellAmount: (id: string, amount: number) => void;
  selectAllHoldings: () => void;
  deselectAllHoldings: () => void;
  setSearchQuery: (query: string) => void;
  setSort: (field: SortField) => void;
  setUserProfile: (profile: UserProfile) => void;
}

export const useTaxStore = create<TaxStore>((set, get) => ({
  holdings: [],
  originalGains: null,
  sellAmounts: {},
  searchQuery: "",
  sortField: "asset",
  sortOrder: "asc",
  userProfile: {
    firstName: "Alex",
    lastName: "Investor",
    email: "alex@harvest.io"
  },

  setHoldings: (holdings) => set({ holdings }),
  
  setOriginalGains: (originalGains) => set({ originalGains }),

  setSellAmount: (id, amount) => set((state) => {
    const newAmounts = { ...state.sellAmounts };
    if (amount <= 0) {
      delete newAmounts[id];
    } else {
      newAmounts[id] = amount;
    }
    return { sellAmounts: newAmounts };
  }),

  selectAllHoldings: () => set((state) => {
    const newAmounts: Record<string, number> = {};
    state.holdings.forEach(h => {
      newAmounts[h.id] = h.holdings.totalHoldings;
    });
    return { sellAmounts: newAmounts };
  }),

  deselectAllHoldings: () => set({ sellAmounts: {} }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setSort: (field) => set((state) => {
    if (state.sortField === field) {
      return { sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' };
    }
    return { sortField: field, sortOrder: 'desc' };
  }),
  
  setUserProfile: (profile) => set({ userProfile: profile })
}));
