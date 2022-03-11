import { ReactElement, Fragment } from "react";
import SearchResultTile from "./SearchResultTile";
import { SearchResultsProps } from "../../types";

export default function SearchResults({
  results,
  searchTerms,
}: SearchResultsProps): ReactElement {
  return (
    <div className="overflow-auto relative bg-slate-800 highlight-white/5 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y divide-slate-200/5">
      {/* Display individual result tiles if response array is not empty */}
      {results?.length
        ? results.map((result) => {
            return <SearchResultTile result={result} key={result.id} />;
          })
        : searchTerms
        ? `Oops, can't find any token for ${searchTerms}...`
        : "Please enter a valid query..."}
    </div>
  );
}
