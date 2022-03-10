import { ReactElement, useState, useEffect } from "react";
import { TokenOverviewProps, WatchlistItem } from "../../types";
import AddTradeModal from "./AddTradeModal";
import TradesList from "./TradesList";
import {
  useGetWatchlistQuery,
  useAddWatchlistItemMutation,
  useDeleteWatchlistItemMutation,
} from "../../services/folio";
import { useAuth } from "../../context/Auth";
import {
  formatNumberDigits,
  formatPercentChangeDigits,
} from "../../helpers/priceFormatting";

const TokenOverview = ({
  data,
  tokenTrades,
}: TokenOverviewProps): ReactElement => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // Check if this token is already part of the user's watchlist
  const [watchlistStatus, setWatchlistStatus] = useState<string>("Loading...");
  const [watchlistOnClick, setWatchlistOnClick] = useState<string>("loading");
  const [watchlistItemId, setWatchlistItemId] = useState<number | undefined>();
  const { data: watchlist, isLoading: isWatchlistLoading } =
    useGetWatchlistQuery(user?.id!);
  const [deleteWatchlistItem] = useDeleteWatchlistItemMutation();
  const [addWatchlistItem] = useAddWatchlistItemMutation();

  useEffect(() => {
    if (isWatchlistLoading) setWatchlistStatus("Loading...");
    if (!isWatchlistLoading) {
      const watchlistItem: WatchlistItem | undefined = watchlist?.length
        ? watchlist.find((item) => item.token_id === data?.id)
        : undefined;
      setWatchlistItemId(watchlistItem?.id);
      if (watchlistItem) {
        setWatchlistStatus("Remove from Watchlist");
        setWatchlistOnClick("delete");
      } else {
        setWatchlistStatus("Add to Watchlist");
        setWatchlistOnClick("add");
      }
    }
  }, [watchlist]);

  function deleteFromWatchlist() {
    deleteWatchlistItem(watchlistItemId!);
  }

  function addToWatchlist() {
    addWatchlistItem({ user_id: user?.id!, token_id: data?.id! });
  }

  return data ? (
    <div className="flex flex-col mt-6">
      <div className="self-end">
        <button
          className="relative inline-flex items-center justify-center p-0.5 s mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:ring-blue-800"
          onClick={() => {
            if (watchlistOnClick === "add") addToWatchlist();
            if (watchlistOnClick === "delete") deleteFromWatchlist();
          }}
        >
          <span
            className={`relative px-5 py-2 transition-all ease-in duration-75 bg-gray-900 rounded-md ${
              watchlistOnClick === "delete"
                ? "bg-opacity-0"
                : "group-hover:bg-opacity-0"
            }`}
          >
            {watchlistStatus}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
        >
          Add Trade
        </button>
      </div>
      {showModal && (
        <AddTradeModal
          setShowModal={setShowModal}
          data={data}
          tokenTrades={tokenTrades}
        />
      )}
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
              )
            </span>
          </div>
        </div>
      </div>
      {/* <div className="shadow-lg px-4 py-6 w-full bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-lg relative">
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
      </div> */}
      <div className="shadow-lg px-4 py-6 w-full relative">
        <h1 className="text-lg font-semibold mt-4 mb-12">Your Trades</h1>
        <TradesList tokenTrades={tokenTrades} />
      </div>
    </div>
  ) : (
    <p className="my-6">Ooops, cannot find information on this token...</p>
  );
};

export default TokenOverview;
