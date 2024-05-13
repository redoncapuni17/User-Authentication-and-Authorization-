import React, { Suspense, lazy, useState } from "react";

import { FaUserFriends } from "react-icons/fa";
import AdminDashboard from "./adminDashboard";

import { MdDashboard } from "react-icons/md";
import { NavBar } from "../../navbar.jsx";
import { SideBar } from "../../sidebar.jsx";

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
    <div className="  ">
      <NavBar
        toggleSidebar={toggleSidebar}
        userData={userData}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex">
        <SideBar
          isSidebarOpen={isSidebarOpen}
          handleDashboard={handleDashboard}
          showDashboard={showDashboard}
          showUser={showUser}
          handleUser={handleUser}
          item={"Dashboard"}
          item2={"All User"}
          route={"/home/dashboard"}
          icon={
            <MdDashboard
              className={`w-5 h-5 text-gray-500 transition duration-75 ${
                showDashboard ? "dark:text-gray-100" : "dark:text-gray-500"
              } group-hover:text-gray-900 dark:group-hover:text-white`}
            />
          }
          icon2={
            <FaUserFriends
              className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 ${
                showUser ? "dark:text-gray-100" : "dark:text-gray-500"
              } group-hover:text-gray-900 dark:group-hover:text-white`}
            />
          }
        />
        <main className="flex flex-1   ">
          {showDashboard && <AdminDashboard currentUser={userData} />}

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
