import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WatchlistItem } from "../types";

const API_BASE_URL: string = process.env.NEXT_PUBLIC_FOLIO_API_BASE_URL || "";
console.log(API_BASE_URL);

export const folioApi = createApi({
  reducerPath: "folioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getWatchlist: builder.query<[WatchlistItem], string>({
      query: (userId) => `/watchlist/${userId}`,
      transformResponse: (response: any) => {
        return response.result;
      },
    }),
  }),
});

export const { useGetWatchlistQuery } = folioApi;
