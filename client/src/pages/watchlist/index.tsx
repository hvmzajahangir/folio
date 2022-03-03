import type { NextPage } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/DashboardLayout";
import AssetTile from "../../components/AssetTile";

const Watchlist: NextPage = () => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <AssetTile type="watchlist" />
    </DashboardLayout>
  );
};

export default Watchlist;
