import { User } from "@supabase/supabase-js";
import { ReactNode } from "react";
export interface AuthContextState {
  signIn: Function;
  signOut: Function;
  user: User | null | undefined;
  isLoading: boolean;
}

export interface PrivateRouteProps {
  protectedRoutes?: Array<string>;
  authRoutes?: Array<string>;
  children?: ReactNode;
}

export interface ChildrenProps {
  children?: ReactNode;
}
export interface SearchState {
  searchTerms: string;
}

// Coingecko API
export interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export interface TokenData {
  id: string;
  symbol: string;
  name: string;
  description: {
    [key: string]: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_cap_rank: number;
  market_data: any;
  last_updated: string;
}

// Search
export interface SearchResultsProps {
  results: [SearchResult] | undefined;
  searchTerms: string;
}

export interface SearchResultTileProps {
  result: SearchResult;
}

export interface TokenOverviewProps {
  data: TokenData | undefined;
  tokenTrades: Trade[];
}

// NEXT API Controllers
export interface WatchlistItem {
  id?: number;
  user_id: string;
  token_id: string;
  created_at?: Date;
}

// Folio API
export interface WatchlistResponse {
  status: string;
  result: WatchlistItem | [WatchlistItem] | null;
}

export interface TokenPrice {
  usd: number;
  usd_24h_change: number;
  last_updated_at: number;
}

export interface TokenPrices {
  [key: string]: TokenPrice;
}
export interface BatchedTokenDataItem {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  lastUpdated: string;
}
export interface BatchedTokenData {
  [key: string]: BatchedTokenDataItem;
}

export interface TradeRequestBody {
  user_id: string;
  token_id: string;
  execution_quantity: number;
  execution_price: number;
  execution_total: number;
  trade_type: string;
}

export interface Trade {
  id: string;
  user_id: string;
  token_id: string;
  execution_quantity: number;
  execution_price: number;
  execution_total: number;
  trade_type: string;
  created_at: string;
}

export interface TradeBody {
  user_id: string;
  token_id: string;
  execution_quantity: number;
  execution_price: number;
  execution_total: number;
  trade_type: string;
}

export type TradeResponse = {
  status: string;
  result: Trade | [Trade] | null;
};

export type GetPortfolioResponse = Trade[];
export interface AddTradeModalProps {
  setShowModal: Function;
  data: TokenData;
  tokenTrades: Trade[];
}

export interface WatchlistProps {
  watchlist: [WatchlistItem];
  prices: BatchedTokenData;
}

export interface WatchlistTileProps {
  data: WatchlistItem;
  price: BatchedTokenDataItem;
}

export interface TradesListProps {
  tokenTrades: Trade[];
}

export interface TradeRowProps {
  trade: Trade;
}

export interface PortfolioSummary {
  [key: string]: number;
}
export interface PortfolioListProps {
  portfolioSummary: PortfolioSummary;
  batchedTokenData: BatchedTokenData;
}

export interface PortfolioTileProps {
  quantity: number;
  tokenData: BatchedTokenDataItem;
}

export interface AlertProps {
  alertType: string;
  alertMessage: string;
}

export interface AlertTypeClasses {
  [key: string]: string;
}
