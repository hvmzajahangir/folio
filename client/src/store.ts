import { configureStore } from "@reduxjs/toolkit";
import { coingeckoApi } from "./services/coingecko";
import { setupListeners } from "@reduxjs/toolkit/query";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    // State
    search: searchReducer,
    // Services
    [coingeckoApi.reducerPath]: coingeckoApi.reducer,
  },
  // Enable caching, invalidation, polling and other rtk-query features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coingeckoApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
