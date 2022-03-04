import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WatchlistItem, WatchlistResponse } from "../types";

const API_BASE_URL: string = process.env.NEXT_PUBLIC_FOLIO_API_BASE_URL || "";

export const folioApi = createApi({
  reducerPath: "folioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Watchlist"],
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
  }),
});

export const { useGetWatchlistQuery, useDeleteWatchlistItemMutation } =
  folioApi;
