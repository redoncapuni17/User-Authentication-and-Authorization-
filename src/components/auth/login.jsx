import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignInWithEmailAndPassword } from "../firebase/auth";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

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
    <div className="w-full h-screen flex justify-center items-center border border-red-500  ">
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <main className="w-96 ">
        <div className="w-96 text-gray-600 space-y-5 p-10 shadow-xl border rounded-xl ">
          <div className="text-center">
            <div className="mt-2">
              <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">
                Welcome Back
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-5 animate-fade-left">
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
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-200"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-bold">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-200"
              />
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                isSigningIn
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
              }`}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to={"/register"} className="hover:underline font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
