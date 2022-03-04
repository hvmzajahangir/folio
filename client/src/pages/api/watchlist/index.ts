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
  if (req.method === "POST") return addToWatchlist(req, res);
  // Default for not allowed methods
  return res.status(405).json({ status: "method not allowed", result: null });
}

async function addToWatchlist(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { user_id, token_id }: WatchlistItem = req.body;
    const data = await supabase
      .from<WatchlistItem>("watchlist")
      .insert([{ user_id, token_id }])
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
