import { ReactElement } from "react";
import PortfolioTile from "./PortfolioTile";

export default function PortfolioList(): ReactElement {
  return (
    <div className="overflow-auto relative flex flex-col">
      <PortfolioTile />
      <PortfolioTile />
      <PortfolioTile />
      <PortfolioTile />
      <PortfolioTile />
      <PortfolioTile />
      <PortfolioTile />
      <PortfolioTile />
    </div>
  );
}
