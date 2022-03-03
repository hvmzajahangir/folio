import { ReactElement } from "react";
import { AssetTileProps } from "../../types";

const AssetTile = ({ type }: AssetTileProps): ReactElement => {
  return (
    <div className="shadow-lg my-6 px-4 py-6 w-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-lg relative">
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-m text-gray-700 dark:text-white font-semibold">
            AAPL
          </p>
          <p className="text-sm text-gray-700 font-thin dark:text-white">
            Apple Inc - Common Stock
          </p>
        </div>
        <div className="flex justify-end pace-x-2">
          <p className="text-5xl text-black dark:text-white font-bold">$320</p>
          {/* <span
              className={`${
                Number(changePercent) > 0 ? "text-green-500" : "text-red-500"
              } text-xl font-bold flex items-center ml-4`}
            >
              ({changePercent}%)
            </span> */}
        </div>
      </div>
    </div>
  );
};

export default AssetTile;
