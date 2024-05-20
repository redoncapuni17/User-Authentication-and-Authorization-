import { Suspense, lazy, useState } from "react";
import { MdEventAvailable } from "react-icons/md";
import UserDashboard from "./userDashboard";
import { NavBar } from "../../View/navbar";
import { SideBar } from "../../View/sidebar";
import { LuLayoutDashboard } from "react-icons/lu";

const LazyListOfCongress = lazy(() => import("./listofCongress"));

export default function UserPage({
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
      <NavBar
        toggleSidebar={toggleSidebar}
        userData={userData}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex ">
        <SideBar
          isSidebarOpen={isSidebarOpen}
          handleDashboard={handleDashboard}
          showDashboard={showDashboard}
          showUser={showUser}
          handleUser={handleUser}
          item={"Dashboard"}
          item2={"MyCongress"}
          route={"/home/dashboard"}
          icon={
            <LuLayoutDashboard
              className={`w-5 h-5 text-gray-500 transition duration-75 ${
                showDashboard ? "dark:text-gray-100" : "dark:text-gray-500"
              } group-hover:text-gray-900 dark:group-hover:text-white`}
            />
          }
          icon2={
            <MdEventAvailable
              className={`w-5 h-5 text-gray-500 transition duration-75 ${
                showUser ? "dark:text-gray-100" : "dark:text-gray-500"
              } group-hover:text-gray-900 dark:group-hover:text-white`}
            />
          }
        />
        <main className="flex w-full  ">
          {showDashboard && <UserDashboard currentUser={userData} />}

          {showUser && (
            <Suspense fallback={<p>Loading...</p>}>
              <LazyListOfCongress currentUser={userData} />
            </Suspense>
          )}
        </main>
      </div>
    </div>
  );
}
