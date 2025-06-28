import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chain, CHAINS } from "../contants/chain";

type WalletState = {
  selectedChain: Chain;
};

const initialState: WalletState = {
  selectedChain: CHAINS[2],
};

const chainSlice = createSlice({
  name: "chain",
  initialState,
  reducers: {
    setChain(state, action: PayloadAction<Chain>) {
      state.selectedChain = action.payload;
    },
  },
});

export const { setChain } = chainSlice.actions;
export default chainSlice.reducer;
