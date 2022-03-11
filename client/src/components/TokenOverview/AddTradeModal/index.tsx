import { ReactElement, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { AddTradeModalProps, Trade } from "../../../types";
import { useAuth } from "../../../context/Auth";
import { useAddTradeMutation } from "../../../services/folio";
import { multiplyQuantityAndPrice } from "../../../helpers/moneyCalculations";
import Alert from "../../Alert";

const tradeType = ["Buy", "Sell"];

const AddTradeModal = ({
  setShowModal,
  data,
  tokenTrades,
}: AddTradeModalProps): ReactElement => {
  const { user } = useAuth();
  const [tradeTypeSelection, setTradeTypeSelection] = useState<string>(
    tradeType[0]
  );
  const [executionQuantity, setExecutionQuantity] = useState<string>("");
  const [executionPrice, setExecutionPrice] = useState<string>(
    data.market_data.current_price.usd
  );
  const [alertMessage, setAlertMessage] = useState<string>("");

  const [addTrade] = useAddTradeMutation();

  const handleAddTrade = async () => {
    const quantity = Number(executionQuantity);
    const price = Number(executionPrice);
    const totalOwnedTokenQuantity =
      calculateTotalOwnedTokenQuantity(tokenTrades);
    const isValidQuantity: boolean =
      typeof quantity === "number" && quantity > 0;
    const isValidPrice: boolean = typeof price === "number" && price > 0;
    if (isValidQuantity && isValidPrice) {
      if (tradeTypeSelection === "Sell" && quantity > totalOwnedTokenQuantity)
        setAlertMessage(
          `You're trying to sell more than you currently own (${totalOwnedTokenQuantity} ${data.symbol.toUpperCase()}).`
        );
      else {
        addTrade({
          user_id: user?.id!,
          token_id: data.id,
          execution_quantity: quantity,
          execution_price: price,
          execution_total: multiplyQuantityAndPrice(quantity, price),
          trade_type: tradeTypeSelection,
        });
        setShowModal(false);
      }
    } else setAlertMessage(`Please enter a valid quantity and price.`);
  };

  const calculateTotalOwnedTokenQuantity = (tokenTrades: Trade[]): number => {
    if (!tokenTrades.length) return 0;
    let totalBuyQuantity: number = 0;
    let totalSellQuantity: number = 0;
    tokenTrades.forEach((trade) => {
      if (trade.trade_type === "Buy")
        totalBuyQuantity += trade.execution_quantity;
      if (trade.trade_type === "Sell")
        totalSellQuantity += trade.execution_quantity;
    });
    return totalBuyQuantity - totalSellQuantity;
  };

  return (
    <Fragment>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/90">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-gray-700 via-gray-900 to-black outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Trade To Portfolio</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <label>Quantity ({data.symbol.toUpperCase()})</label>
              <input
                className="mt-4 mb-6 w-full rounded bg-gray-500 hover:bg-gray-600 placeholder-slate-200 text-slate-200"
                type="text"
                value={executionQuantity}
                onChange={(e) => setExecutionQuantity(e.target.value)}
                placeholder="Enter quantity"
                autoComplete="off"
              />
              <label>Price ($)</label>
              <input
                className="mt-4 mb-4 w-full rounded bg-gray-500 hover:bg-gray-600 placeholder-slate-200 text-slate-200"
                type="text"
                value={executionPrice}
                onChange={(e) => setExecutionPrice(e.target.value)}
                placeholder="Enter price in USD"
                autoComplete="off"
              />
              {alertMessage && (
                <div className="mb-4">
                  <Alert alertType="warning" alertMessage={alertMessage} />
                </div>
              )}
              <Listbox
                value={tradeTypeSelection}
                onChange={setTradeTypeSelection}
              >
                <div className="relative mt-4 mb-4">
                  <Listbox.Button className="relative w-full py-2.5 pl-3 pr-10 text-left bg-gray-800 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{tradeTypeSelection}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {tradeType.map((type, typeIdx) => (
                        <Listbox.Option
                          key={typeIdx}
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active ? "text-white bg-gray-700" : "text-white"
                            }`
                          }
                          value={type}
                        >
                          {({ selected }) => (
                            <Fragment>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {type}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </Fragment>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleAddTrade}
              >
                Add Trade
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </Fragment>
  );
};

export default AddTradeModal;
