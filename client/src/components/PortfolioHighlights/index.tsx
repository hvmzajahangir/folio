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
      <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            Portfolio balance
          </p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {portfolioValue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHighlights;
