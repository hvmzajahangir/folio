import { ReactElement } from "react";
import { WatchlistTileProps } from "../../types";
import { useRouter } from "next/router";
import { useDeleteWatchlistItemMutation } from "../../services/folio";
import {
  formatNumberDigits,
  formatPercentChangeDigits,
} from "../../helpers/priceFormatting";

const WatchlistTile = ({ data, price }: WatchlistTileProps): ReactElement => {
  const router = useRouter();
  const [deleteWatchlistItem] = useDeleteWatchlistItemMutation();
  async function deleteItem(itemId: number) {
    await deleteWatchlistItem(itemId);
  }
  return (
    <div className="shadow-lg my-6 px-4 pb-6 pt-2 w-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-lg relative">
      <div className="relative flex flex-row justify-end group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
        <div className="absolute bottom-0 flex flex-row justify-end hidden mr-6 mb-4 group-hover:flex">
          <span className="relative p-2 leading-none whitespace-no-wrap bg-white rounded">
            <p
              className="text-sm font-bold text-rose-500/75 hover:text-rose-500 cursor-pointer"
              onClick={() => deleteItem(data.id!)}
            >
              Remove
            </p>
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-2xl text-gray-700 dark:text-white font-semibold">
            {price.symbol.toUpperCase()}
          </p>
          <p className="text-xl text-gray-700 font-thin dark:text-white">
            {price.name}
          </p>
        </div>
        <div className="flex justify-end pace-x-2 items-center">
          <p className="text-2xl text-black dark:text-white font-bold">
            ${formatNumberDigits(price.currentPrice, 2)}
          </p>
          <span className="flex items-center ml-4">
            <p
              className={`p-1 text-xs font-bold ${
                price.priceChangePercentage24h > 0
                  ? `bg-emerald-400/75`
                  : `bg-rose-500/75`
              } rounded`}
            >
              {formatPercentChangeDigits(price.priceChangePercentage24h, 2)}%
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WatchlistTile;
