import { FC } from "react";

const LoadingSpinner: FC = () => {
  return (
    <div className="bg-gradient-to-r from-black to-gray-900 flex items-center justify-center min-h-screen text-white">
      <div className="flex justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
