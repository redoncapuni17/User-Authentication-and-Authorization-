import CongresUser from "./congresUser.jsx";
import { Suspense, lazy, useEffect, useState } from "react";

import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function UserDashboard({ currentUser }) {
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
  return (
    <div className="w-full justify-center">
      <main className="flex flex-col">
        <header className="flex p-5">
          <div className="flex w-full h-36 bg-gradient-to-r from-gray-600 to-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="sm:flex sm:items-center px-6 py-4  ">
              <div className="text-center sm:text-left sm:flex-grow  ">
                <h2 className="text-3xl font-bold text-gray-100 mb-2">
                  Welcome, {currentUser.name}!
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

        <CongresUser congressData={congressLists} currentUser={currentUser} />
      </main>
    </div>
  );
}
