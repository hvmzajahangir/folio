import type { NextPage } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/DashboardLayout";
import AssetOverview from "../../components/AssetOverview";
import {
  useGetAssetOverviewQuery,
  useGetAssetQuoteQuery,
} from "../../services/alphaVantage";

const Asset: NextPage = () => {
  const router = useRouter();
  const symbol: string | string[] | undefined = router.query.symbol;
  const assetOverview = useGetAssetOverviewQuery(symbol);
  const assetQuote = useGetAssetQuoteQuery(symbol);
  return (
    <DashboardLayout>
      {!assetQuote.isLoading && !assetOverview.isLoading ? (
        <AssetOverview
          assetOverview={assetOverview.data}
          assetQuote={assetQuote.data?.["Global Quote"]}
        />
      ) : (
        "Loading"
      )}
    </DashboardLayout>
  );
};

export default Asset;
