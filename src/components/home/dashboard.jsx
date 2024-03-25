import React, { useEffect, useState, lazy, Suspense } from "react";
import EventForm from "./Admin/eventForm";
// import CongressAdmin from "./Admin/congressAdmin";
import CongresUser from "./User/congresUser";
import { CiSearch } from "react-icons/ci";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
const LazyCongressAdmin = lazy(() => import("./Admin/congressAdmin"));

export default function Dashboard({ userData }) {
  const [congressLists, setCongressLists] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCongressLists, setFilteredCongressLists] = useState([]);

  // Function to fetch congress data from Firestore
  const fetchCongressData = async () => {
    try {
      const congressCollection = collection(db, "congress");
      const congressSnapshot = await getDocs(congressCollection);
      const congressData = congressSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCongressLists(congressData);
    } catch (error) {
      console.error("Error fetching congress data: ", error);
    }
  };

  useEffect(() => {
    // Fetch congress data when the component mounts
    fetchCongressData();
  }, []);

  useEffect(() => {
    // Filter congress list based on search input
    const filteredCongress = congressLists.filter((congress) =>
      congress.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredCongressLists(filteredCongress);
  }, [searchInput, congressLists]);

  const addCongress = (newCongress) => {
    setCongressLists([newCongress, ...congressLists]);
  };

  const handleFilteredInput = (e) => {
    setSearchInput(e.target.value);
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
            <section className="flex p-5  ">
              <section className="w-5/12 border-r-2 border-gray-200">
                <EventForm addCongress={addCongress} adminUid={userData} />
              </section>
              <section className="w-3/4 px-2 ">
                <div className="flex w-96  bg-white  rounded-lg shadow-lg  items-center p-2 mb-5">
                  <CiSearch className="text-slate-500 border-r-2 text-2xl" />
                  <input
                    type="text"
                    placeholder="Search Congress "
                    className="bg-transparent border-none h-full w-full ml-5 text-lg focus:outline-none"
                    onChange={handleFilteredInput}
                    value={searchInput}
                  />
                </div>
                <Suspense fallback={<p>Loading Congress...</p>}>
                  <LazyCongressAdmin congressLists={filteredCongressLists} />
                </Suspense>
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
            <span className="flex justify-center text-3xl font-bold mb-2">
              Click on the Congress Card to Join
            </span>

            <CongresUser congressData={congressLists} currentUser={userData} />
          </main>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
