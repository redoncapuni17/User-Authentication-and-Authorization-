import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterView({
  userLoggedIn,
  onSubmit,
  name,
  setName,
  email,
  setEmail,
  isRegistering,
  password,
  setPassword,
  role,
  setRole,
  errorMessage,
}) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
      {userLoggedIn && navigate("/home")}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative py-10 bg-white shadow-lg sm:rounded-3xl sm:p-16">
          <div className="w-72 mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                <span className="border-b-2 border-blue-500">Cre</span>ate a New
                Account
              </h1>
            </div>

            <form
              onSubmit={onSubmit}
              className="py-3 space-y-4 animate-fade-left"
            >
              <div className="relative">
                <label className="text-sm text-gray-600 font-bold">Name</label>
                <input
                  type="name"
                  autoComplete="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                />
              </div>
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
                  disabled={isRegistering}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                />
              </div>

              <div className="relative">
                <label className="text-sm text-gray-600 font-bold">Role</label>
                <select
                  disabled
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className=" w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
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
          </div>
          <div className="text-sm text-center">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-center text-sm hover:underline font-bold"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
