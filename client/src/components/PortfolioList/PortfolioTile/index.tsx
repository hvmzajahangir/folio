import { ReactElement } from "react";
import { PortfolioTileProps } from "../../../types";
import { useRouter } from "next/router";
import * as money from "../../../helpers/moneyCalculations";

const PortfolioTile = ({
  tokenData,
  quantity,
}: PortfolioTileProps): ReactElement => {
  const router = useRouter();
  const totaTokenValue = money.multiplyQuantityAndPrice(
    quantity,
    tokenData.currentPrice
  );
  const handleOnClick = (id: string) => {
    // Pass id for token overview component in '/token'
    router.push({
      pathname: "/token",
      query: { id },
    });
  };
  return (
    <div
      className="shadow-lg my-4 py-4 px-4 w-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-lg relative cursor-pointer"
      onClick={() => handleOnClick(tokenData.id)}
    >
      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-2xl text-gray-700 dark:text-white font-semibold">
            {tokenData.name}
          </p>
        </div>
        <div className="flex justify-end pace-x-2 items-center">
          <div className="flex flex-col text-right">
            <p className="text-2xl font-bold text-white">
              {`${quantity} ${tokenData.symbol.toUpperCase()}`}
            </p>
            <p className="text-xl font-thin text-white">
              {money.formatMoney(totaTokenValue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTile;
