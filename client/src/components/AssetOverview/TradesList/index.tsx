import { ReactElement, Fragment } from "react";
import TradeRow from "./TradeRow";
import { TradesListProps } from "../../../types";

export default function TradesList({
  tokenTrades,
}: TradesListProps): ReactElement {
  return (
    <table className="border-collapse table-fixed w-full text-sm">
      <thead>
        <tr>
          <th className="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
            Date
          </th>
          <th className="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
            Type
          </th>
          <th className="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
            Execution
          </th>
          <th className="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left"></th>
        </tr>
      </thead>
      <tbody className="bg-slate-800">
        {tokenTrades.map((trade) => (
          <TradeRow key={trade.id} trade={trade} />
        ))}
      </tbody>
    </table>
  );
}
