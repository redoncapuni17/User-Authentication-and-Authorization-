import { useState } from "react";
import Login from "./components/auth/login";
import { SignUp } from "./components/auth/signup";

function App() {
  const [showSignUp, setShowSignUp] = useState(true);

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="min-h-screen bg-violet-50 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8  ">
      <h1 className="text-center text-3xl font-extrabold text-gray-900 ">
        Welcome
      </h1>
      <div className="sm:mx-auto sm:w-full sm:max-w-md  ">
        {showSignUp ? (
          <Login openForm={toggleForm} />
        ) : (
          <SignUp openForm={toggleForm} />
        )}
      </div>
    </div>
  );
}

export default App;
