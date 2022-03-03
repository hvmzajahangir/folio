import type { NextPage } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/DashboardLayout";
import AssetOverview from "../../components/AssetOverview";
import { useGetTokenDataQuery } from "../../services/coingecko";

const Asset: NextPage = () => {
  const router = useRouter();
  const id: string = router.query.id as string;
  const { data, error, isLoading } = useGetTokenDataQuery(id);
  return (
    <DashboardLayout>
      {isLoading ? <p>Loading...</p> : data && <AssetOverview data={data} />}
    </DashboardLayout>
  );
};

export default Asset;
