import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/DashboardLayout";
import TokenOverview from "../../components/TokenOverview";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useGetTokenDataQuery } from "../../services/coingecko";
import { useGetPortfolioQuery } from "../../services/folio";
import { useAuth } from "../../context/Auth";
import { Trade } from "../../types";

const Asset: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const tokenId: string = router.query.id as string;
  const [tokenTrades, setTokenTrades] = useState<Trade[]>([]);

  const { data: token, isLoading: tokenIsLoading } =
    useGetTokenDataQuery(tokenId);
  const { data: portfolio, isLoading: portfolioIsLoading } =
    useGetPortfolioQuery(user?.id!);

  useEffect(() => {
    if (!portfolioIsLoading && portfolio) {
      const trades: Trade[] = portfolio.filter(
        (trade) => trade.token_id === tokenId
      );
      setTokenTrades(trades);
    }
  }, [portfolio]);

  return (
    <DashboardLayout>
      {tokenIsLoading ? (
        <div className="flex flex-row justify-center my-32">
          <LoadingSpinner />
        </div>
      ) : (
        token && <TokenOverview data={token} tokenTrades={tokenTrades} />
      )}
    </DashboardLayout>
  );
};

export default Asset;
