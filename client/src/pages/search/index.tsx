import type { NextPage } from "next";
import DashboardLayout from "../../components/DashboardLayout";
import SearchResults from "../../components/SearchResults/";
import { useAppSelector } from "../../hooks/rtk";
import { useSearchTokenQuery } from "../../services/coingecko";
import { selectSearchTerms } from "../../slices/searchSlice";

const Search: NextPage = () => {
  const searchTerms = useAppSelector(selectSearchTerms);
  const { data, error, isLoading } = useSearchTokenQuery(searchTerms);
  return (
    <DashboardLayout>
      <h1 className="text-lg font-semibold my-4">
        Search Results for "{searchTerms}"
      </h1>
      {isLoading ? <p>Loading...</p> : <SearchResults results={data} />}
    </DashboardLayout>
  );
};

export default Search;
