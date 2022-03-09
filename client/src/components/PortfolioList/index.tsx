import { ReactElement, Fragment } from "react";
import PortfolioTile from "./PortfolioTile";
import { PortfolioListProps } from "../../types";

export default function PortfolioList({
  portfolioSummary,
  batchedTokenData,
}: PortfolioListProps): ReactElement {
  const list: ReactElement[] = [];
  for (const key in portfolioSummary) {
    list.push(
      <PortfolioTile
        key={key}
        tokenData={batchedTokenData[key]}
        quantity={portfolioSummary[key]}
      />
    );
  }
  return <Fragment>{list.length && list}</Fragment>;
}
