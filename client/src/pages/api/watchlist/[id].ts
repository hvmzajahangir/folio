import type { NextApiRequest, NextApiResponse } from "next";
import { WatchlistItem } from "../../../types";
import { supabase } from "../../../lib/supabaseClient";

type Data = {
  status: string;
  result: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") return getWatchlist(req, res);
  if (req.method === "DELETE") return deleteFromWatchlist(req, res);
  // Default for not allowed methods
  return res.status(405).json({ status: "method not allowed", result: null });
}

async function getWatchlist(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    // Get all watchlist items for this specific user id
    const userId = req.query.id;
    const data = await supabase
      .from<WatchlistItem>("watchlist")
      .select()
      .filter("user_id", "eq", userId);
    // Could not retrieve, raise error
    if (data.error) throw new Error(data.error.message);
    return res.status(200).json({ status: "ok", result: data.body });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error - could not retrieve watchlist from database",
      result: null,
    });
  }
}

async function deleteFromWatchlist(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // Remove item by watchlist ID
    const watchlistId = req.query.id;
    const data = await supabase
      .from<WatchlistItem>("watchlist")
      .delete()
      .match({ id: watchlistId });
    // Could not retrieve, raise error
    if (data.error) throw new Error(data.error.message);
    return res.status(200).json({ status: "ok", result: data.body });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error - could not delete watchlist item from database",
      result: null,
    });
  }
}
