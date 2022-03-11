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

  const tokenName: string | undefined = data?.name;
  const tokenSymbol: string | undefined = data?.symbol;
  const priceChangePercentage24h: number | undefined =
    data?.market_data.price_change_percentage_24h_in_currency.usd;
  const currentPrice: number | undefined = data?.market_data.current_price.usd;

  const [watchlistStatus, setWatchlistStatus] = useState<string>("Loading...");
  const [watchlistOnClick, setWatchlistOnClick] = useState<string>("loading");
  const [watchlistItemId, setWatchlistItemId] = useState<number | undefined>();
  const { data: watchlist, isFetching: isWatchlistFetching } =
    useGetWatchlistQuery(user?.id!);
  const [deleteWatchlistItem] = useDeleteWatchlistItemMutation();
  const [addWatchlistItem] = useAddWatchlistItemMutation();

  useEffect(() => {
    // Check if this token is already part of the user's watchlist
    if (isWatchlistFetching) setWatchlistStatus("Loading...");
    if (!isWatchlistFetching) {
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
  }, [watchlist, isWatchlistFetching]);

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
      <div className="shadow-lg my-4 py-8 px-4 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-lg relative">
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="text-2xl text-white font-semibold">
              {tokenName} ({tokenSymbol?.toUpperCase()})
            </p>
          </div>
          <div className="flex justify-end pace-x-2 items-center">
            <p className="text-2xl text-white font-bold">
              ${currentPrice ? formatNumberDigits(currentPrice, 2) : "-"}
            </p>
            {priceChangePercentage24h && (
              <span className="flex items-center ml-4">
                <p
                  className={`p-1 text-xs font-bold ${
                    priceChangePercentage24h > 0
                      ? `bg-emerald-400/75`
                      : `bg-rose-500/75`
                  } rounded`}
                >
                  {formatPercentChangeDigits(priceChangePercentage24h, 2)}%
                </p>
              </span>
            )}
          </div>
        </div>
      </div>
      {/* <div className="shadow-lg px-4 py-6 w-full bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-lg relative">
        <div>
          <div className="flex items-center pb-2 mb-8 text-m">
            <p className="text-m text-white">
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
