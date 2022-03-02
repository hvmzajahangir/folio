import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AssetQuote } from "../types";

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
      transformResponse: (response: any) => {
        response.bestMatches = response.bestMatches.filter(
          (asset: any) => asset["4. region"] == "United States"
        );
        return response;
      },
    }),
    getAssetOverview: builder.query({
      query: (symbol) =>
        `/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`,
    }),
    getAssetDailyTimeSeries: builder.query({
      query: (symbol) =>
        `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`,
    }),
    getAssetQuote: builder.query<AssetQuote, string | string[] | undefined>({
      query: (symbol) =>
        `/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`,
    }),
  }),
});

export const {
  useSearchSymbolQuery,
  useGetAssetOverviewQuery,
  useGetAssetDailyTimeSeriesQuery,
  useGetAssetQuoteQuery,
} = alphaVantageApi;
