import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL: string | undefined =
  process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_BASE_URL;

const API_KEY: string | undefined =
  process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

export const alphaVantageApi = createApi({
  reducerPath: "alphaVantageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    searchSymbol: builder.query({
      query: (keywords) =>
        `/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`,
    }),
  }),
});

export const { useSearchSymbolQuery } = alphaVantageApi;
