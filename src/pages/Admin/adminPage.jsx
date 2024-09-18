import React, { Suspense, lazy, useState } from "react";

import { FaUserFriends } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import AdminDashboard from "../Admin/adminDashboard.jsx";
import NavBar from "../../components/navbar.jsx";
import SideBar from "../../components/sidebar.jsx";

const LazyListOfUser = lazy(() => import("./listofUsers.jsx"));

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
    <div className=" flex flex-col ">
      <NavBar
        toggleSidebar={toggleSidebar}
        userData={userData}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex  ">
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

        <main className="flex flex-1  ">
          {showDashboard && <AdminDashboard currentUser={userData} />}

          {showUser && (
            <Suspense fallback={<p>Loading...</p>}>
              <LazyListOfUser currentUser={userData}  />
            </Suspense>
          )}
        </main>
      </div>
    </div>
  );
}
