import React from "react";

function Header({ currentUser }) {
  return (
    <>
      <header className="flex">
        <div className="flex px-6 py-5 pb-7 w-full bg-gradient-to-r from-gray-600 to-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="sm:flex sm:items-center px-6 py-4">
            <div className="text-center sm:text-left sm:flex-grow font-mono">
              <h2 className="text-3xl font-bold text-gray-100  mb-2 cursor-default ">
                Welcome,
                <span className="text-red-500">{currentUser.name}</span>!
              </h2>
              <p className="text-sm text-gray-300">
                Here's your personalized dashboard.
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
