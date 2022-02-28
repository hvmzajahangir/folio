import { ReactElement } from "react";
import { SearchResultTileProps } from "../../../types";

export default function SearchResultTile({
  result,
}: SearchResultTileProps): ReactElement {
  return (
    <div
      className="flex items-center gap-4 p-4 cursor-pointer"
      onClick={() => console.log("hello")}
    >
      <img
        className="w-12 h-12 rounded-full"
        src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
      />
      <div className="flex flex-col">
        <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
          {result["1. symbol"]}
        </strong>
        <span className="text-slate-500 text-sm font-medium dark:text-slate-400">
          {result["4. region"]}
        </span>
        <span className="text-slate-500 text-sm font-medium dark:text-slate-400">
          {result["2. name"]}
        </span>
      </div>
    </div>
  );
}
