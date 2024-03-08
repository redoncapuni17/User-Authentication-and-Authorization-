import React, { useState } from "react";

export function SignUp({ openForm }) {
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignUpPassword] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const handleSignupEmail = (e) => {
    setSignupEmail(e.target.value);
    console.log(e.target.value);
  };

  const handleSignupPassword = (e) => {
    setSignUpPassword(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
      <form className="space-y-6 animate-fade-right">
        <h2 className="text-3xl text-center mb-10 font-extrabold text-gray-900 animate-fade-right ">
          Sign Up
        </h2>
        <div>
          <input
            name="signup-name"
            type="text"
            autoComplete="name"
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Name"
            value={name}
            onChange={handleName}
          />
        </div>
        <div>
          <input
            name="signup-email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Email"
            value={signupEmail}
            onChange={handleSignupEmail}
          />
        </div>
        <div>
          <input
            name="signup-password"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Password"
            value={signupPassword}
            onChange={handleSignupPassword}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <button
          type="button"
          className="text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 "
          onClick={openForm} // Corrected onClick event handler
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
}
