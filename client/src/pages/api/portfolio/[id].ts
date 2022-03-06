import type { NextApiRequest, NextApiResponse } from "next";
import { Trade } from "../../../types";
import { supabase } from "../../../lib/supabaseClient";

type Data = {
  status: string;
  result: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") return getPortfolio(req, res);
  if (req.method === "DELETE") return deleteTrade(req, res);
  // Default for not allowed methods
  return res.status(405).json({ status: "method not allowed", result: null });
}

async function getPortfolio(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    // Get all portfolio trades for this specific user id
    const userId = req.query.id;
    const data = await supabase
      .from<Trade>("portfolio_trades")
      .select()
      .filter("user_id", "eq", userId);
    // Could not retrieve, raise error
    if (data.error) throw new Error(data.error.message);
    return res.status(200).json({ status: "ok", result: data.body });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error - could not retrieve portfolio from database",
      result: null,
    });
  }
}

async function deleteTrade(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    // Remove trade from portfolio
    const tradeId = req.query.id;
    const data = await supabase
      .from<Trade>("portfolio_trades")
      .delete()
      .match({ id: tradeId });
    // Could not retrieve, raise error
    if (data.error) throw new Error(data.error.message);
    return res.status(200).json({ status: "ok", result: data.body });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error - could not delete portfolio trade from database",
      result: null,
    });
  }
}
