import React, { useState } from "react";
import { doSignInWithEmailAndPassword } from "../../Model/auth";
import { useAuth } from "../../contexts/authContext";
import { Link, Navigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12 ">
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <main className="relative py-3 sm:max-w-xl sm:mx-auto ">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl "></div>

        <div className="relative  py-10 bg-white shadow-lg sm:rounded-3xl sm:p-16  ">
          <div className="w-72 mx-auto  ">
            <div>
              <h1 className="text-2xl font-semibold">
                <span className="border-b-2 border-blue-500">We</span>
                lcome Back
              </h1>
            </div>

            <form
              onSubmit={onSubmit}
              className="py-3 space-y-4 animate-fade-left"
            >
              <div className="relative">
                <label className="text-sm text-gray-600 font-bold">Email</label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                />
              </div>

              <div className="relative">
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
                  onChange={(e) => setPassword(e.target.value)}
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
          </div>
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
}

export default Login;
