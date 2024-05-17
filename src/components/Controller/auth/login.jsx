import React, { useState } from "react";
import { doSignInWithEmailAndPassword } from "../../Model/auth";
import { useAuth } from "../../../contexts/authContext";
import LoginUI from "../../View/loginView";

function Login() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/home"); // Navigate to the home page after successful login
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
    setIsSigningIn(false);
  };

  return (
    <LoginUI
      userLoggedIn={userLoggedIn}
      onSubmit={onSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errorMessage={errorMessage}
      isSigningIn={isSigningIn}
    />
  );
}

export default Login;
