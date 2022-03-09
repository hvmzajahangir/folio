import type { NextApiRequest, NextApiResponse } from "next";
import { TradeRequestBody, Trade } from "../../../types";
import { supabase } from "../../../lib/supabaseClient";

type Data = {
  status: string;
  result: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") return addToPortfolio(req, res);
  // Default for not allowed methods
  return res.status(405).json({ status: "method not allowed", result: null });
}

async function addToPortfolio(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const {
      user_id,
      token_id,
      execution_price,
      execution_quantity,
      execution_total,
      trade_type,
    }: TradeRequestBody = req.body;
    const data = await supabase
      .from<Trade>("portfolio_trades")
      .insert([
        {
          user_id,
          token_id,
          execution_price,
          execution_quantity,
          execution_total,
          trade_type,
        },
      ])
      .single();
    // Could not insert, raise error
    if (data.error) throw new Error(data.error.message);
    return res.status(201).json({ status: "created", result: data.body });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error - could not add to the database", result: null });
  }
}
