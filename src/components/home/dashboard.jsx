import React, { useState } from "react";
import EventForm from "./eventForm";
import Congress from "./congressAdmin";
import CongresUser from "./congresUser";

export default function Dashboard({ userData }) {
  const [congressLists, setCongressLists] = useState([]);

  const addCongress = (newCongress) => {
    setCongressLists([...congressLists, newCongress]);
  };

  return (
    <div className="w-full justify-center">
      {userData ? (
        userData.role === "admin" ? (
          <main>
            <header className="flex p-5">
              <div className="flex w-full h-36 bg-gradient-to-r from-gray-600 to-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="sm:flex sm:items-center px-6 py-4  ">
                  <div className="text-center sm:text-left sm:flex-grow  ">
                    <h2 className="text-3xl font-bold text-gray-100 mb-2">
                      Welcome, {userData.name}!
                    </h2>
                    <p className="text-sm text-gray-300">
                      Here's your personalized dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </header>
            <section className="flex p-5">
              <section className="w-5/12 border-r-2 border-gray-200">
                <p className="w-96 border-b-2 border-gray-200">
                  Create your Congress
                </p>
                <EventForm addCongress={addCongress} />
              </section>
              <section className="w-3/4 px-2">
                <p className="w-full border-b-2 border-gray-200">
                  Created Congress
                </p>
                <Congress congressLists={congressLists} />
              </section>
            </section>
          </main>
        ) : (
          <main className="flex flex-col">
            <header className="flex p-5">
              <div className="flex w-full h-36 bg-gradient-to-r from-gray-600 to-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="sm:flex sm:items-center px-6 py-4  ">
                  <div className="text-center sm:text-left sm:flex-grow  ">
                    <h2 className="text-3xl font-bold text-gray-100 mb-2">
                      Welcome, {userData.name}!
                    </h2>
                    <p className="text-sm text-gray-300">
                      Here's your personalized dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </header>
            <span className="flex justify-center text-3xl font-bold ">
              Click on the Congress Card to Join
            </span>
            <CongresUser />
          </main>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
