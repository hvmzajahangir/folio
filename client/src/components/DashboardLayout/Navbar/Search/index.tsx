import { ReactElement, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/rtk";
import { setSearchTerms as setSliceSearchTerms } from "../../../../slices/searchSlice";

const Search = (): ReactElement => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [searchTerms, setSearchTerms] = useState<string>("");
  const handleOnChange = (e: FormEvent<HTMLInputElement>): void => {
    setSearchTerms(e.currentTarget.value);
  };
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setSliceSearchTerms(searchTerms));
    setSearchTerms("");
    router.push("/search");
  };
  return (
    <div className="flex justify-center flex-1 lg:mr-32">
      <form
        className="relative w-full max-w-xl mr-6 focus-within:text-purple-500"
        onSubmit={handleOnSubmit}
      >
        <div className="absolute inset-y-0 flex items-center pl-2">
          <svg
            className="w-4 h-4 cursor-pointer"
            aria-hidden="true"
            fill="#fff"
            viewBox="0 0 20 20"
            onClick={handleOnSubmit}
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          className="w-full pl-8 pr-2 rounded bg-gray-500 hover:bg-gray-400 placeholder-slate-200 text-slate-200 form-input"
          type="text"
          placeholder="Search symbol"
          aria-label="Search"
          value={searchTerms}
          onChange={handleOnChange}
        />
      </form>
    </div>
  );
};

export default Search;
