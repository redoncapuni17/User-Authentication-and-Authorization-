import React from "react";
import { TbLogout2 } from "react-icons/tb";

export default function LogoutView({ userLoggedIn, handleNavigate }) {
  return (
    <div className="px-2">
      {userLoggedIn ? (
        <button
          onClick={handleNavigate}
          className="flex items-center justify-between gap-3"
        >
          <TbLogout2
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 
             group-hover:text-gray-900 dark:group-hover:text-white"
          />
          <span>Logout</span>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
