import React, { Suspense, lazy, useState } from "react";
import Logout from "../../logout/logout";

const LazyAdminDashboard = lazy(() => import("./adminDashboard"));
const LazyListOfUser = lazy(() => import("./listofUsers"));

export default function AdminPage({
  userData,
  showUser,
  handleUser,
  showDashboard,
  handleDashboard,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className=" bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-gray-500 dark:text-white focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              >
                {isSidebarOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white cursor-default">
                Home Page
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="text-white cursor-default">
                  You are <span className="text-red-500 ">{userData.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside
          className={`${
            isSidebarOpen
              ? "w-44 h-dvh absolute dark:bg-gray-800   sm:w-56 z-10 opacity-90  sm:opacity-100"
              : "hidden"
          } bg-white border-r  sm:relative border-gray-200 sm:translate-x-0  `}
        >
          <div className="px-3 pb-4 pt-5  ">
            <ul className="space-y-2 font-medium">
              <li
                onClick={handleDashboard}
                className={showDashboard ? "bg-gray-700 rounded-lg" : ""}
              >
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className={`w-5 h-5 text-gray-500 transition duration-75 ${
                      showDashboard
                        ? "dark:text-gray-100"
                        : "dark:text-gray-500"
                    } group-hover:text-gray-900 dark:group-hover:text-white`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>

              <li
                className={showUser ? "bg-gray-700 rounded-lg" : ""}
                onClick={handleUser}
              >
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 ${
                      showUser ? "dark:text-gray-100" : "dark:text-gray-500"
                    } group-hover:text-gray-900 dark:group-hover:text-white`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <Logout />
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <main className="flex flex-1">
          {showDashboard && (
            <Suspense fallback={<p>Loading...</p>}>
              <LazyAdminDashboard currentUser={userData} />
            </Suspense>
          )}

          {showUser && (
            <Suspense fallback={<p>Loading...</p>}>
              <LazyListOfUser currentUser={userData} />
            </Suspense>
          )}
        </main>
      </div>
    </div>
  );
}
