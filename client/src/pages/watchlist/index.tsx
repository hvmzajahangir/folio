import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/DashboardLayout";
import WatchlistTile from "../../components/WatchlistTile";
import { useGetWatchlistQuery } from "../../services/folio";
import {
  useGetPricesQuery,
  useGetBatchedTokenDataQuery,
} from "../../services/coingecko";
import { TokenPrices } from "../../types";

const Watchlist: NextPage = () => {
  const user = supabase.auth.user();
  const [skip, setSkip] = useState<boolean>(true);
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const watchlist = useGetWatchlistQuery(user?.id!);
  const prices = useGetBatchedTokenDataQuery(tokenIds, { skip });

  useEffect(() => {
    if (watchlist.data) {
      watchlist.data.map((token) =>
        setTokenIds((prev) => [...prev, token.token_id])
      );
      setSkip(false);
    }
  }, [watchlist]);

  return (
    <DashboardLayout>
      {watchlist.isLoading ? (
        <p>Loading...</p>
      ) : watchlist.data?.length && prices.data ? (
        watchlist.data.map((item) => {
          return (
            <WatchlistTile
              data={item}
              price={prices.data![item.token_id]}
              key={item.id}
            />
          );
        })
      ) : (
        <div className="flex flex-row justify-center my-32">
          <p>Your watchlist is empty, try adding something</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Watchlist;
