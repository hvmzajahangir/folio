import { useState, useEffect, ReactElement } from "react";
import type { NextPage } from "next";
import { supabase } from "../../lib/supabaseClient";
import DashboardLayout from "../../components/DashboardLayout";
import List from "../../components/Watchlist";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useGetWatchlistQuery } from "../../services/folio";
import { useGetBatchedTokenDataQuery } from "../../services/coingecko";

const Watchlist: NextPage = () => {
  const user = supabase.auth.user();
  const [skip, setSkip] = useState<boolean>(true);
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const { data: watchlist, isFetching: isWatchlistFetching } =
    useGetWatchlistQuery(user?.id!);
  const { data: prices, isFetching: isPricesFetching } =
    useGetBatchedTokenDataQuery(tokenIds, { skip });

  useEffect(() => {
    // Set list of of watchlist ids to feed into the getBatchedTokenDataQuery
    if (watchlist) {
      watchlist.map((token) =>
        setTokenIds((prev) => [...prev, token.token_id])
      );
      setSkip(false);
    }
  }, [watchlist]);

  let list: ReactElement = (
    <div className="flex flex-row justify-center my-32">
      <p>Ooops, something went wrong. Try refreshing the page...</p>
    </div>
  );

  if (isWatchlistFetching || isPricesFetching) {
    list = (
      <div className="flex flex-row justify-center my-32">
        <LoadingSpinner />
      </div>
    );
  }
  if (!isWatchlistFetching && !isPricesFetching && watchlist && prices)
    list = (
      <div className="mt-4">
        <List watchlist={watchlist} prices={prices} />
      </div>
    );

  return <DashboardLayout>{list}</DashboardLayout>;
};

export default Watchlist;
