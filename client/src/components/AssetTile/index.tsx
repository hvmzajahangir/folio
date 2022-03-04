import { ReactElement } from "react";
import { AssetTileProps } from "../../types";
import { useRouter } from "next/router";
import {
  formatNumberDigits,
  formatPercentChangeDigits,
} from "../../helpers/priceFormatting";

const AssetTile = ({ data, type, price }: AssetTileProps): ReactElement => {
  const router = useRouter();
  return (
    <div className="shadow-lg my-6 px-4 py-6 w-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-lg relative">
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-m text-gray-700 dark:text-white font-semibold">
            {price.symbol.toUpperCase()}
          </p>
          <p className="text-sm text-gray-700 font-thin dark:text-white">
            {price.name}
          </p>
        </div>
        <div className="flex justify-end pace-x-2">
          <p className="text-5xl text-black dark:text-white font-bold">
            ${formatNumberDigits(price.currentPrice, 2)}
          </p>
          <span
            className={`${
              price.priceChangePercentage24h > 0
                ? "text-green-500"
                : "text-red-500"
            } text-xl font-bold flex items-center ml-4`}
          >
            ({formatPercentChangeDigits(price.priceChangePercentage24h, 2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default AssetTile;
