import { ReactElement, Fragment } from "react";
import WatchlistTile from "./WatchlistTile";
import { WatchlistProps } from "../../types";

export default function Watchlist({
  watchlist,
  prices,
}: WatchlistProps): ReactElement {
  return (
    <Fragment>
      {watchlist.length ? (
        watchlist.map((item) => {
          return (
            <WatchlistTile
              data={item}
              price={prices![item.token_id]}
              key={item.id}
            />
          );
        })
      ) : (
        <div className="flex flex-row justify-center my-32">
          <p>Your watchlist is empty, try adding something</p>
        </div>
      )}
    </Fragment>
  );
}
