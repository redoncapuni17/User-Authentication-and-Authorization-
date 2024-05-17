import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/index";
import { doSignOut } from "../Model/auth";

import LogoutView from "../View/logoutView";

function Logout() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const handleNavigate = () => {
    doSignOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <LogoutView userLoggedIn={userLoggedIn} handleNavigate={handleNavigate} />
  );
}

export default Logout;
