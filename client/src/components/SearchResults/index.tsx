import { ReactElement, Fragment } from "react";
import SearchResultTile from "./SearchResultTile";
import { useAppSelector } from "../../hooks/rtk";
import { selectSearchTerms } from "../../slices/searchSlice";
import { SearchResultsProps } from "../../types";

export default function SearchResults({
  results,
}: SearchResultsProps): ReactElement {
  const searchTerms = useAppSelector(selectSearchTerms);
  return (
    <Fragment>
      <h1 className="text-lg font-semibold my-4">
        Search Results for "{searchTerms}"
      </h1>
      <div className="overflow-auto relative bg-white dark:bg-slate-800 dark:highlight-white/5 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y dark:divide-slate-200/5">
        {/* Display individual result tiles if response array is not empty */}
        {results?.bestMatches.length
          ? results.bestMatches.map((result) => {
              console.log(result);
              return (
                <SearchResultTile result={result} key={result["1. symbol"]} />
              );
            })
          : "Ooops, could not find any ticker. Try another one!"}
      </div>
    </Fragment>
  );
}
