import { configureStore } from "@reduxjs/toolkit";
import walletsReducer from "./walletsSlice";
import chainReducer from "./chainSlice";

export const store = configureStore({
  reducer: {
    wallets: walletsReducer,
    chain: chainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
