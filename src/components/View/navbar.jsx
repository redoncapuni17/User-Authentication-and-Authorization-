import React from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineBars } from "react-icons/ai";

export function NavBar({ toggleSidebar, userData, isSidebarOpen }) {
  return (
    <nav className="flex items-center justify-between bg-slate-800 px-5 py-2  ">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-100">
          {isSidebarOpen ? (
            <IoMdClose className="text-2xl" />
          ) : (
            <AiOutlineBars className="text-2xl" />
          )}
        </button>
        <h1 className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white cursor-default">
          Home Page
        </h1>
      </div>
      <div className="flex items-center text-white cursor-default">
        You are,&nbsp;
        <span className={`${userData.role === "admin" ? " text-red-500" : ""}`}>
          {userData.role}
        </span>
      </div>
    </nav>
  );
}
