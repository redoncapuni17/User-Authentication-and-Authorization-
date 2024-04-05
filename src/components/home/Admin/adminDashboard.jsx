import React, { useState, useEffect, Suspense, lazy } from "react";

import { db } from "../../firebase/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
const LazyCongressAdmin = lazy(() => import("./congressAdmin"));
const LazyEventForm = lazy(() => import("./eventForm"));

export default function AdminDashboard({ currentUser }) {
  const [congressLists, setCongressLists] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCongressLists, setFilteredCongressLists] = useState([]);
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [editCongress, setEditCongress] = useState(null);

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
    fetchCongressData();
  }, []);

  // Delete Congress From Firebase Firestore
  const handleDeleteCongress = async (congressId) => {
    try {
      setCongressLists((prevCongressLists) =>
        prevCongressLists.filter((congress) => congress.id !== congressId)
      );
      const deletedCongressRef = doc(db, "congress", congressId);
      await deleteDoc(deletedCongressRef);

      setOpenDropDownMenu(false);

      console.log("Congress deleted successfully");
    } catch (error) {
      console.error("Error removing congress: ", error);
    }
  };

  // Find the current Congress for editing
  const handleEditCongress = (congressId) => {
    const selectedCongress = congressLists.find(
      (congress) => congress.id === congressId
    );
    setEditCongress(selectedCongress);
  };

  const updateCongressList = (updatedCongress) => {
    setCongressLists((prevCongressLists) => {
      // Find the index of the updated Congress in the array
      const index = prevCongressLists.findIndex(
        (congress) => congress.id === updatedCongress.id
      );
      // If the Congress is found, update it, otherwise just return the previous state
      if (index !== -1) {
        const updatedCongressList = [...prevCongressLists];
        updatedCongressList[index] = updatedCongress;
        return updatedCongressList;
      }
      return prevCongressLists;
    });
  };

  const filteredCongress = congressLists.filter((congress) =>
    congress.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const addCongress = (newCongress) => {
    setCongressLists([newCongress, ...congressLists]);
  };

  const handleFilteredInput = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    setFilteredCongressLists(filteredCongress);
  }, [searchInput, congressLists]);

  return (
    <div className="w-full  ">
      <main className="px-5 py-5 ">
        <header className="bg-gradient-to-r from-gray-600 to-gray-800 shadow-lg rounded-lg p-6 overflow-hidden">
          <div className="px-6 py-4 font-mono">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">
              Welcome, {currentUser.name}!
            </h2>
            <p className="text-sm text-gray-300">
              Here's your personalized dashboard.
            </p>
          </div>
        </header>
        <section className="flex flex-col md:flex-row ">
          <section className="w-full  sm:w-5/12 py-3 ">
            <Suspense fallback={<p>Loading...</p>}>
              <LazyEventForm
                addCongress={addCongress}
                adminUid={currentUser}
                editCongress={editCongress}
                updateCongressList={updateCongressList} // Pass the function to update congressLists
              />
            </Suspense>
          </section>
          <section className="w-full md:w-3/4 p-3">
            <div className="m-3">
              <form className="flex  items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    placeholder="Search by congress name..."
                    value={searchInput}
                    onChange={handleFilteredInput}
                  />
                  <svg
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                  </svg>
                </div>
              </form>
            </div>
            <Suspense fallback={<p>Loading Congress...</p>}>
              <LazyCongressAdmin
                congressLists={filteredCongressLists}
                handleDeleteCongress={handleDeleteCongress}
                openDropDownMenu={openDropDownMenu}
                setOpenDropDownMenu={setOpenDropDownMenu}
                handleEditCongress={handleEditCongress}
                updatedCongressLists={congressLists} // Pass updated congressLists
              />
            </Suspense>
          </section>
        </section>
      </main>
    </div>
  );
}
