import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchResult, TokenData } from "../types";

const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_COINGECKO_API_BASE_URL || "";
console.log(API_BASE_URL);

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
  }),
});

export const { useSearchTokenQuery, useGetTokenDataQuery } = coingeckoApi;
