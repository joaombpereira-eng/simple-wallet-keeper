import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoredWallet } from "../hooks/useWalletManager";

const STORAGE_KEY = "wallets";

const getInitialWallets = (): StoredWallet[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

type WalletState = {
  list: StoredWallet[];
};

const initialState: WalletState = {
  list: getInitialWallets(),
};

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    addWallet(state, action: PayloadAction<StoredWallet>) {
      state.list.push(action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.list));
    },
    updateWallet(
      state,
      action: PayloadAction<{ index: number; wallet: StoredWallet }>
    ) {
      state.list[action.payload.index] = action.payload.wallet;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.list));
    },
    setLoading(
      state,
      action: PayloadAction<{ index: number; loading: boolean }>
    ) {
      state.list[action.payload.index].loading = action.payload.loading;
    },
  },
});

export const { addWallet, updateWallet, setLoading } = walletsSlice.actions;
export default walletsSlice.reducer;
