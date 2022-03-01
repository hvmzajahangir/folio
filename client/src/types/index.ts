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
export interface Result {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}
export interface SearchResultsProps {
  results: {
    bestMatches: [Result];
  };
}
export interface SearchResultTileProps {
  result: Result;
}

export interface AssetOverviewProps {
  "50DayMovingAverage": string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "200DayMovingAverage": string;
  Address: string;
  AnalystTargetPrice: string;
  AssetType: string;
  Beta: string;
  BookValue: string;
  CIK: string;
  Country: string;
  Currency: string;
  Description: string;
  DilutedEPSTTM: string;
  DividendDate: string;
  DividendPerShare: string;
  DividendYield: string;
  EBITDA: string;
  EPS: string;
  EVToEBITDA: string;
  EVToRevenue: string;
  ExDividendDate: string;
  Exchange: string;
  FiscalYearEnd: string;
  ForwardPE: string;
  GrossProfitTTM: string;
  Industry: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  Name: string;
  OperatingMarginTTM: string;
  PEGRatio: string;
  PERatio: string;
  PriceToBookRatio: string;
  PriceToSalesRatioTTM: string;
  ProfitMargin: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenuePerShareTTM: string;
  RevenueTTM: string;
  Sector: string;
  SharesOutstanding: string;
  Symbol: string;
  TrailingPE: string;
}

export interface AssetQuote {
  ["Global Quote"]: {
    "1. symbol": string;
    "2. open": string;
    "3. high": string;
    "4. low": string;
    "5. price": string;
    "6. volume": string;
    "7. latest trading day": string;
    "8. previous close": string;
    "9. change": string;
    "10. change percent": string;
  };
}
