import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/index";
import { doSignOut } from "../Model/auth";

import { TbLogout2 } from "react-icons/tb";

function Logout() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const handleNavigate = () => {
    doSignOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      {userLoggedIn ? (
        <button
          onClick={handleNavigate}
          className="flex w-full p-2 gap-2 border border-red-900 items-center  cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          <TbLogout2 className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span>Logout</span>
        </button>
      ) : null}
    </>
  );
}

export default Logout;
