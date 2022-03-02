import { ReactElement } from "react";
import {
  formatNumberDigits,
  formatChangePercentDigits,
} from "../../helpers/priceFormatting";

const AssetOverview = ({ assetOverview, assetQuote }: any): ReactElement => {
  const price: string = formatNumberDigits(assetQuote["05. price"], 2);
  const changePercent = formatChangePercentDigits(
    assetQuote["10. change percent"],
    2
  );
  return assetOverview && assetQuote ? (
    <>
      <div className="shadow-lg my-6 px-4 py-6 w-full bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-lg relative">
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-m text-gray-700 dark:text-white font-semibold">
              {assetOverview.Name}
            </p>
            <p className="text-sm text-gray-700 font-thin dark:text-white">
              {assetOverview.AssetType}
            </p>
          </div>
          <div className="flex justify-end pace-x-2">
            <p className="text-5xl text-black dark:text-white font-bold">
              ${price}
            </p>
            <span
              className={`${
                Number(changePercent) > 0 ? "text-green-500" : "text-red-500"
              } text-xl font-bold flex items-center ml-4`}
            >
              ({changePercent}%)
            </span>
          </div>
        </div>
      </div>
      <div className="shadow-lg px-4 py-6 w-full bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-lg relative">
        <div className="dark:text-white">
          <p className="mb-10 text-sm text-gray-700 font-medium dark:text-white">
            {assetOverview.Description}
          </p>
          <div className="flex items-center pb-2 mb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
            <p>Exchange</p>
            <div className="flex items-end text-xs">
              {assetOverview.Exchange}
            </div>
          </div>
          <div className="flex items-center pb-2 mb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
            <p>Country</p>
            <div className="flex items-end text-xs">
              {assetOverview.Country}
            </div>
          </div>
          <div className="flex items-center pb-2 mb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
            <p>Market Capitalization</p>
            <div className="flex items-end text-xs">
              {assetOverview.MarketCapitalization}
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
