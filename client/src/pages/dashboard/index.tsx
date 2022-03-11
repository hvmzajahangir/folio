import type { NextPage } from "next";
import { useState, useEffect, Fragment } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import PortfolioHighlights from "../../components/PortfolioHighlights";
import PortfolioList from "../../components/PortfolioList/";
import LoadingSpinner from "../../components/LoadingSpinner/";
import { useGetPortfolioQuery } from "../../services/folio";
import { useGetBatchedTokenDataQuery } from "../../services/coingecko";
import { useAuth } from "../../context/Auth";
import { PortfolioSummary } from "../../types";
import * as money from "../../helpers/moneyCalculations";

const Dashboard: NextPage = () => {
  const { user } = useAuth();
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary>(
    {}
  );
  const [skip, setSkip] = useState<boolean>(true);
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const [portfolioValue, setportfolioValue] = useState<string>("-");
  const { data: batchedTokenData, isLoading: isBatchedTokenDataLoading } =
    useGetBatchedTokenDataQuery(tokenIds, { skip });
  const { data: portfolio, isLoading: isPortfolioLoading } =
    useGetPortfolioQuery(user?.id!);

  useEffect(() => {
    if (!isPortfolioLoading && portfolio) {
      // Create an object aggregating total execution quantity (buy quantity - sell quantity)
      // for each token in a user's list of portfolio trades
      let tokenList: Set<string> = new Set();
      const result: PortfolioSummary = {};
      let addOrSubtract: number = 0;
      for (const trade of portfolio) {
        if (!tokenList.has(trade.token_id)) tokenList.add(trade.token_id);
        if (trade.trade_type === "Buy") {
          addOrSubtract = trade.execution_quantity;
        }
        if (trade.trade_type === "Sell") {
          addOrSubtract = -trade.execution_quantity;
        }
        result[trade.token_id] = (result[trade.token_id] || 0) + addOrSubtract;
      }
      if (tokenList.size) {
        setPortfolioSummary(result);
        setTokenIds(Array.from(tokenList));
        setSkip(false);
      }

      // Calculate portfolio value
      if (!isBatchedTokenDataLoading && batchedTokenData) {
        let currentPortfolioValue = 0;
        let currentTokenHoldingsValue: number = 0;
        for (const key in batchedTokenData) {
          currentTokenHoldingsValue = money.multiplyQuantityAndPrice(
            batchedTokenData[key].currentPrice,
            result[key]
          );
          currentPortfolioValue = money.sumMoney(
            currentPortfolioValue,
            currentTokenHoldingsValue
          );
        }
        setportfolioValue(money.formatMoney(currentPortfolioValue));
      }
    }
  }, [portfolio, batchedTokenData]);
  return (
    <DashboardLayout>
      {!isBatchedTokenDataLoading && !isPortfolioLoading ? (
        <Fragment>
          <PortfolioHighlights portfolioValue={portfolioValue} />
          <div className="overflow-auto relative flex flex-col">
            <h1 className="text-lg font-semibold mt-4 mb-4">Your Tokens</h1>
            {batchedTokenData && portfolioSummary ? (
              <PortfolioList
                portfolioSummary={portfolioSummary}
                batchedTokenData={batchedTokenData}
              />
            ) : (
              <p className="my-6 font-thin text-center">
                It looks empty here. Try searching for a token and then track a
                trade!
              </p>
            )}
          </div>
        </Fragment>
      ) : (
        <div className="flex flex-row justify-center my-32">
          <LoadingSpinner />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
