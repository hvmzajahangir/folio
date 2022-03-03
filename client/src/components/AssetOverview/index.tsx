import { ReactElement } from "react";
import { AssetOverviewProps } from "../../types";
import {
  formatNumberDigits,
  formatPercentChangeDigits,
} from "../../helpers/priceFormatting";

const AssetOverview = ({ data }: AssetOverviewProps): ReactElement => {
  return data ? (
    <>
      <div className="shadow-lg my-6 px-4 py-6 w-full bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-lg relative">
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-m text-gray-700 dark:text-white font-semibold">
              {data.name} ({data.symbol.toUpperCase()})
            </p>
          </div>
          <div className="flex justify-end pace-x-2">
            <p className="text-5xl text-black dark:text-white font-bold">
              ${formatNumberDigits(data.market_data.current_price.usd, 2)}
            </p>
            <span
              className={`${
                data.market_data.price_change_percentage_24h_in_currency.usd > 0
                  ? "text-green-500"
                  : "text-red-500"
              } text-xl font-bold flex items-center ml-4`}
            >
              (
              {formatPercentChangeDigits(
                data.market_data.price_change_percentage_24h_in_currency.usd,
                2
              )}
              %)
            </span>
          </div>
        </div>
      </div>
      <div className="shadow-lg px-4 py-6 w-full bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-lg relative">
        <div className="dark:text-white">
          <div className="flex items-center pb-2 mb-8 text-m">
            <p className="text-m text-gray-700 dark:text-white">
              {data.description.en}
            </p>
          </div>
          <div className="flex items-center pb-2 mb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
            <p>Market Capitalization</p>
            <div className="flex items-end text-xs">
              {data.market_data.market_cap.usd}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p className="my-6">
      Ooops, cannot find information on this assetOverview...
    </p>
  );
};

export default AssetOverview;
