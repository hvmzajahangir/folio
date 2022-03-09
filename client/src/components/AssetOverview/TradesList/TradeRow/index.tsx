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
        {formatDateString(trade.created_at)}
      </td>
      <td className="border-b border-slate-700 p-4 pl-8 text-slate-400">
        {trade.trade_type.toUpperCase()}
      </td>
      <td className="border-b border-slate-700 p-4 pl-8 text-slate-400">
        {trade.execution_quantity} @ {formatMoney(trade.execution_total)}
      </td>
      <td className="border-b border-slate-700 text-red-500">
        <button onClick={() => deleteTrade(trade.id)}>Delete</button>
      </td>
    </tr>
  );
}
