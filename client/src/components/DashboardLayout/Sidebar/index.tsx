import { ReactElement } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../../../public/image/logo.png";

const Sidebar = (): ReactElement => {
  const router = useRouter();
  const path = router.pathname;
  const pushToRoute = (route: string) => {
    router.push(route);
  };
  const activeRouteClass =
    "inline-flex items-center w-full text-sm font-semibold text-gray-100 transition-colors duration-150 hover:text-gray-200";
  const routeClass =
    "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200";
  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-gradient-to-r from-gray-800 via-gray-900 to-black md:block flex-shrink-0">
      <div className="text-gray-400">
        <div
          className="relative mt-3 pl-2 pr-12 text-lg font-bold text-gray-200 cursor-pointer"
          onClick={() => {
            pushToRoute("/dashboard");
          }}
        >
          <Image
            src={logo}
            alt="folio logo"
            layout="responsive"
            placeholder="blur"
          />
        </div>
        <ul className="mt-6">
          <li
            className="relative px-6 py-3 cursor-pointer"
            onClick={() => {
              pushToRoute("/dashboard");
            }}
          >
            {path === "/dashboard" && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <a
              className={path === "/dashboard" ? activeRouteClass : routeClass}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
              <span className="ml-4">Portfolio</span>
            </a>
          </li>
        </ul>
        <ul>
          <li
            className="relative px-6 py-3 cursor-pointer"
            onClick={() => {
              pushToRoute("/watchlist");
            }}
          >
            {path === "/watchlist" && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <a
              className={path === "/watchlist" ? activeRouteClass : routeClass}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="ml-4">Watchlist</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
