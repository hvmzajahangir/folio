import { ReactElement } from "react";
import { ChildrenProps } from "../../types";

const PortfolioHighlights = ({
  portfolioValue,
}: {
  portfolioValue: string;
}): ReactElement => {
  return (
    // Structuring as a grid to allow displaying further stats in the future
    <div className="grid gap-6 my-8 md:grid-cols-1 xl:grid-cols-1">
      <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-xs">
        <div className="p-3 mr-4 text-green-100 bg-green-500 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-400">
            Portfolio balance
          </p>
          <p className="text-lg font-semibold text-gray-200">
            {portfolioValue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHighlights;
