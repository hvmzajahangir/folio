import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SearchResult,
  TokenData,
  TokenPrices,
  BatchedTokenData,
} from "../types";

const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_COINGECKO_API_BASE_URL || "";

export const coingeckoApi = createApi({
  reducerPath: "coingeckoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    searchToken: builder.query<[SearchResult], string>({
      query: (query) => `/search?query=${query}`,
      transformResponse: (response: any) => {
        return response.coins;
      },
    }),
    getTokenData: builder.query<TokenData, string>({
      query: (id) => `/coins/${id}`,
      transformResponse: (response: any) => {
        const transformedResponse = {
          id: response.id,
          symbol: response.symbol,
          name: response.name,
          description: response.description,
          image: response.image,
          market_cap_rank: response.market_cap_rank,
          market_data: response.market_data,
          last_updated: response.last_updated,
        };
        return transformedResponse;
      },
    }),
    getPrices: builder.query<TokenPrices, string[]>({
      query: (tokenIds) =>
        `/simple/price?ids=${tokenIds.join(
          "%2C"
        )}&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true`,
    }),
    getBatchedTokenData: builder.query<BatchedTokenData, string[]>({
      query: (tokenIds) =>
        `/coins/markets?vs_currency=usd&ids=${tokenIds.join(
          "%2C"
        )}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`,
      transformResponse: (response: any) => {
        const transformedResponse: BatchedTokenData = {};
        for (const tokenObject of response) {
          const {
            id,
            symbol,
            name,
            image,
            current_price,
            price_change_percentage_24h,
            last_updated,
          } = tokenObject;
          transformedResponse[id] = {
            id,
            symbol,
            name,
            image,
            currentPrice: current_price,
            priceChangePercentage24h: price_change_percentage_24h,
            lastUpdated: last_updated,
          };
        }

        return transformedResponse;
      },
    }),
  }),
});

export const {
  useSearchTokenQuery,
  useGetTokenDataQuery,
  useGetPricesQuery,
  useGetBatchedTokenDataQuery,
} = coingeckoApi;
