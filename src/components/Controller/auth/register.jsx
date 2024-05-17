import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../Model/auth";
import RegisterView from "../../View/registerView";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("user"); // Default role is user

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(name, email, password, role);
        navigate("/home");
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
    setIsRegistering(false);
  };

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/home");
    }
  }, [userLoggedIn, navigate]);

  return (
    <RegisterView
      userLoggedIn={userLoggedIn}
      onSubmit={onSubmit}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      isRegistering={isRegistering}
      password={password}
      setPassword={setPassword}
      role={role}
      setRole={setRole}
      errorMessage={errorMessage}
    />
  );
};

export default Register;
