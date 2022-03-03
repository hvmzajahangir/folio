import { configureStore } from "@reduxjs/toolkit";
import { coingeckoApi } from "./services/coingecko";
import { folioApi } from "./services/folio";
import { setupListeners } from "@reduxjs/toolkit/query";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    // State
    search: searchReducer,
    // Services
    [coingeckoApi.reducerPath]: coingeckoApi.reducer,
    [folioApi.reducerPath]: folioApi.reducer,
  },
  // Enable caching, invalidation, polling and other rtk-query features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coingeckoApi.middleware, folioApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
