import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/index";
import { doSignOut } from "../firebase/auth";
import { TbLogout2 } from "react-icons/tb";

function Logout() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <div className="px-2">
      {userLoggedIn ? (
        <button
          onClick={() => {
            doSignOut().then(() => {
              navigate("/login");
            });
          }}
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

export default Logout;
