import type { NextPage } from "next";
import DashboardLayout from "../../components/DashboardLayout";
import SearchResults from "../../components/SearchResults/";
import { useAppSelector } from "../../hooks/rtk";
import { useSearchSymbolQuery } from "../../services/alphaVantage";
import { selectSearchTerms } from "../../slices/searchSlice";

const Search: NextPage = () => {
  const searchTerms = useAppSelector(selectSearchTerms);
  const { data, error, isLoading } = useSearchSymbolQuery(searchTerms);
  return (
    <DashboardLayout>
      {!isLoading && <SearchResults results={data} />}
    </DashboardLayout>
  );
};

export default Search;
