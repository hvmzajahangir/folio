import { ReactElement } from "react";
import { WatchlistTileProps } from "../../../types";
import { useRouter } from "next/router";
import { useDeleteWatchlistItemMutation } from "../../../services/folio";
import {
  formatNumberDigits,
  formatPercentChangeDigits,
} from "../../../helpers/priceFormatting";

const WatchlistTile = ({ data, price }: WatchlistTileProps): ReactElement => {
  const router = useRouter();
  const [deleteWatchlistItem] = useDeleteWatchlistItemMutation();
  async function deleteItem(itemId: number) {
    await deleteWatchlistItem(itemId);
  }
  const handleOnClick = (id: string) => {
    router.push({
      pathname: "/token",
      query: { id },
    });
  };
  return (
    <div
      className="shadow-lg my-6 px-4 py-4 w-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-lg relative cursor-pointer"
      onClick={() => handleOnClick(data.token_id)}
    >
      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-2xl text-white font-semibold">
            {price.symbol.toUpperCase()}
          </p>
          <p className="text-xl text-white font-thin">{price.name}</p>
        </div>
        <div className="flex justify-end pace-x-2 items-center">
          <p className="text-2xl text-white font-bold">
            ${formatNumberDigits(price.currentPrice, 2)}
          </p>
          {price.priceChangePercentage24h && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchlistTile;
