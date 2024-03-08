import { useState } from "react";

function Login({ openForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="mt-8 bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10 ">
      <form className=" space-y-6  animate-fade-left ">
        <h2 className=" text-3xl text-center mb-10 font-extrabold text-gray-900  animate-fade-left ">
          Log In
        </h2>

        <div>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log In
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          className="text-sm font-medium rounded-md text-gray-500 hover:text-gray-700  "
          onClick={openForm}
        >
          "Don't have an account? Sign up"
        </button>
      </div>
    </div>
  );
}

export default Login;
