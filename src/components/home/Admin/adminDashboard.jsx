import { Suspense, lazy, useEffect, useState } from "react";
import EventForm from "./eventForm";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
const LazyCongressAdmin = lazy(() => import("./congressAdmin"));

export default function AdminDashboard({ userData }) {
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
            <form className="flex items-center  w-96">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                <input
                  type="text"
                  className="w-96 px-10 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  placeholder="Search branch name..."
                  value={searchInput}
                  onChange={handleFilteredInput}
                />
              </div>
            </form>
            <Suspense fallback={<p>Loading Congress...</p>}>
              <LazyCongressAdmin congressLists={filteredCongressLists} />
            </Suspense>
          </section>
        </section>
      </main>
    </div>
  );
}
