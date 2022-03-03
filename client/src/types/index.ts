import { Session, User } from "@supabase/supabase-js";
import { ReactNode } from "react";

export interface Profile {
  id: string | null;
  username: string | null;
  website: string | null;
  avatar_url: string | null;
  updated_at: Date;
}

export interface AccountProps {
  session: Session;
}

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
}

export interface SearchResultTileProps {
  result: SearchResult;
}

export interface AssetOverviewProps {
  data: TokenData | undefined;
}

export interface AssetTileProps {
  type: string;
}
