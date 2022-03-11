import { ReactElement } from "react";
import { SearchResultTileProps } from "../../../types";
import { useRouter } from "next/router";

export default function SearchResultTile({
  result,
}: SearchResultTileProps): ReactElement {
  const router = useRouter();
  const handleOnClick = (id: string) => {
    // Pass id for token overview component in '/token'
    router.push({
      pathname: "/token",
      query: { id },
    });
  };
  return (
    <div
      className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-700"
      onClick={() => handleOnClick(result.id)}
    >
      <img className="w-6 h-6 rounded-full" src={result.large} />
      <div className="flex flex-col">
        <strong className="text-slate-200 text-sm font-medium">
          {result.symbol}
        </strong>
        <span className="text-slate-400 text-sm font-medium">
          {result.name}
        </span>
      </div>
    </div>
  );
}
