import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  WatchlistItem,
  WatchlistResponse,
  Trade,
  TradeBody,
  TradeResponse,
  GetPortfolioResponse,
} from "../types";

const API_BASE_URL: string = process.env.NEXT_PUBLIC_FOLIO_API_BASE_URL || "";

export const folioApi = createApi({
  reducerPath: "folioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Watchlist", "Portfolio"],
  endpoints: (builder) => ({
    getWatchlist: builder.query<[WatchlistItem], string>({
      query: (userId) => `/watchlist/${userId}`,
      providesTags: ["Watchlist"],
      transformResponse: (response: any) => {
        return response.result;
      },
    }),
    deleteWatchlistItem: builder.mutation<WatchlistResponse, number>({
      query: (id) => ({
        url: `/watchlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Watchlist"],
    }),
    addWatchlistItem: builder.mutation<WatchlistResponse, WatchlistItem>({
      query: (body) => ({
        url: `/watchlist`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Watchlist"],
    }),
    getPortfolio: builder.query<GetPortfolioResponse, string>({
      query: (userId) => `/portfolio/${userId}`,
      transformResponse: (response: { result: GetPortfolioResponse }) => {
        return response.result;
      },
      providesTags: ["Portfolio"],
    }),
    addTrade: builder.mutation<TradeResponse, TradeBody>({
      query: (body) => ({
        url: `/portfolio`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Portfolio"],
    }),
    deleteTrade: builder.mutation<TradeResponse, string>({
      query: (tradeId) => ({
        url: `/portfolio/${tradeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Portfolio"],
    }),
  }),
});

export const {
  useGetWatchlistQuery,
  useDeleteWatchlistItemMutation,
  useAddWatchlistItemMutation,
  useGetPortfolioQuery,
  useAddTradeMutation,
  useDeleteTradeMutation,
} = folioApi;
