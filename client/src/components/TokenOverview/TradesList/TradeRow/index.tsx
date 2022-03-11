import { ReactElement } from "react";
import { TradeRowProps } from "../../../../types";
import { useDeleteTradeMutation } from "../../../../services/folio";
import { formatDateString } from "../../../../helpers/dateFormatting";
import { formatMoney } from "../../../../helpers/moneyCalculations";

export default function TradeRow({ trade }: TradeRowProps): ReactElement {
  const [deleteTrade] = useDeleteTradeMutation();
  return (
    <tr>
      <td className="border-b border-slate-700 p-4 pl-8 text-slate-400">
        <span>{formatDateString(trade.created_at)}</span>
      </td>
      <td className="border-b border-slate-700 p-4 pl-8 text-slate-400">
        <span>{trade.trade_type.toUpperCase()}</span>
      </td>
      <td className="border-b border-slate-700 p-4 pl-8 text-slate-400">
        <span>
          {trade.execution_quantity} @ {formatMoney(trade.execution_price)}
        </span>
      </td>
      <td className="border-b border-slate-700 p-4 pl-8 text-slate-400">
        <span>{formatMoney(trade.execution_total)}</span>
        <button
          className="ml-12 text-red-500"
          onClick={() => deleteTrade(trade.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
