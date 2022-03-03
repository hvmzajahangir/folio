import type { NextPage } from "next";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/DashboardLayout";
import AssetTile from "../../components/AssetTile";
import { useGetWatchlistQuery } from "../../services/folio";

const Watchlist: NextPage = () => {
  const router = useRouter();
  const user = supabase.auth.user();
  const { data, error, isLoading } = useGetWatchlistQuery(user?.id!);
  if (data) console.log(data);
  return (
    <DashboardLayout>
      {isLoading ? (
        <p>Loading...</p>
      ) : data?.length ? (
        data.map((item) => (
          <AssetTile type="watchlist" data={item} key={item.id} />
        ))
      ) : (
        <div className="flex flex-row justify-center my-32">
          <p>You watchlist is empty, try adding something</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Watchlist;
