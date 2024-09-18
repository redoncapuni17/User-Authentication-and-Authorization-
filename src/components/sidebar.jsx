import React from "react";

import { Link } from "react-router-dom";
import Logout from "./logout";

export function SideBar({
  isSidebarOpen,
  handleDashboard,
  showDashboard,
  showUser,
  handleUser,
  item,
  item2,
  route,
  icon,
  icon2,
}) {
  return (
    <aside
      className={`${
        isSidebarOpen
          ? "w-44 h-98  absolute dark:bg-gray-800   sm:w-56 z-10 opacity-90  sm:opacity-100 "
          : "hidden"
      } bg-white border-r sm:relative border-gray-200 sm:translate-x-0  `}
    >
      <ul className="space-y-2 font-medium h-5/6  px-3 pb-4 pt-5">
        <li className={showDashboard ? "bg-gray-700 rounded-lg" : ""}>
          <Link
            to={route}
            onClick={handleDashboard}
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            {icon}
            <span className="ms-3">{item}</span>
          </Link>
        </li>

        <li className={showUser ? "bg-gray-700 rounded-lg" : ""}>
          <Link
            to="/home/users"
            onClick={handleUser}
            className="flex items-center  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            {icon2}

            <span className="flex-1 ms-3 whitespace-nowrap">{item2}</span>
          </Link>
        </li>
      </ul>
      <div className="px-3 ">
        <Logout />
      </div>
    </aside>
  );
}
export default SideBar;
