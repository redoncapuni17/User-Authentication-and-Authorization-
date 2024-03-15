import React from "react";
import { useAuth } from "../../contexts/authContext/index";

function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="text-2xl font-bold py-5 px-2 ">
      Hello{" "}
      {currentUser.displayName ? currentUser.displayName : currentUser.email},
      you are now logged in.
    </div>
  );
}
export default Home;
