import type { NextPage } from "next";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import SearchResults from "../../components/SearchResults/";
import { useSearchTokenQuery } from "../../services/coingecko";
import { useRouter } from "next/router";

const Search: NextPage = () => {
  const router = useRouter();
  const searchTerms: string = router.query.query as string;
  const [skip, setSkip] = useState<boolean>(true);
  const { data, error, isLoading } = useSearchTokenQuery(searchTerms, { skip });
  useEffect(() => {
    if (searchTerms && searchTerms.trim().length > 1 && !Number(searchTerms)) {
      setSkip(false);
    }
  }, []);
  return (
    <DashboardLayout>
      <h1 className="text-lg font-semibold my-4">
        Search Results for "{searchTerms}"
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <SearchResults results={data} searchTerms={searchTerms} />
      )}
    </DashboardLayout>
  );
};

export default Search;
