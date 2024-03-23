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
          className="flex gap-2  items-center"
        >
          <svg
            className="w-5 h-5"
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
