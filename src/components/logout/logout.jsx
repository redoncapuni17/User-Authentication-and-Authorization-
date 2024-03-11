import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/index";
import { doSignOut } from "../firebase/auth";

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
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300  px-4 py-2 text-white font-medium transition-colors  rounded-lg "
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          <span>Logout</span>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Logout;
