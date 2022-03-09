import type { NextPage } from "next";
import { Fragment, useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import SearchResults from "../../components/SearchResults/";
import LoadingSpinner from "../../components/LoadingSpinner";
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
      {isLoading ? (
        <div className="flex flex-row justify-center my-32">
          <LoadingSpinner />
        </div>
      ) : (
        <Fragment>
          <h1 className="text-lg font-semibold my-4">
            Search Results for "{searchTerms}"
          </h1>
          <SearchResults results={data} searchTerms={searchTerms} />
        </Fragment>
      )}
    </DashboardLayout>
  );
};

export default Search;
