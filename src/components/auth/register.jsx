import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";

const Register = () => {
  const navigate = useNavigate(); // Corrected from Navigate

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate("/home"); // Navigate to the home page after successful registration
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
    setIsRegistering(false);
  };

  return (
    <>
      {userLoggedIn && navigate("/home")}
      <main className="w-full h-screen flex self-center place-content-center place-items-center">
        <div className="w-96 text-gray-600 space-y-5 p-10 shadow-xl border rounded-xl   ">
          <div className="text-center mb-6 ">
            <div className="mt-2">
              <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">
                Create a New Account
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4 animate-fade-left">
            <div>
              <label className="text-sm text-gray-600 font-bold">Name</label>
              <input
                type="name"
                autoComplete="name"
                placeholder="Name"
                value={name}
                onChange={handleName}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-bold">Email</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
                value={email}
                onChange={handleEmail}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-bold">
                Password
              </label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            {errorMessage && (
              <span className="text-red-600 text-sm font-bold">
                {errorMessage}
              </span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                isRegistering
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
              }`}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <div className="text-sm text-center">
            Already have an account? {"   "}
            <Link
              to={"/login"}
              className="text-center text-sm hover:underline font-bold"
            >
              Continue
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
