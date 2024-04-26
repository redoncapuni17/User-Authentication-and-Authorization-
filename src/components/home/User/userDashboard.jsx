import { Suspense, lazy, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
const LazyCongressUser = lazy(() => import("./congresUser"));

export default function UserDashboard({ currentUser }) {
  const [congressLists, setCongressLists] = useState([]);

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

  return (
    <div className="w-full justify-center">
      <main className="flex flex-col">
        <header className="flex p-5">
          <div className="flex px-6 py-4 w-full bg-gradient-to-r from-gray-600 to-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="sm:flex sm:items-center px-6 py-4">
              <div className="text-center sm:text-left sm:flex-grow font-mono">
                <h2 className="text-3xl font-bold text-gray-100 mb-2 cursor-default">
                  Welcome, {currentUser.name}!
                </h2>
                <p className="text-sm text-gray-300">
                  Here's your personalized dashboard.
                </p>
              </div>
            </div>
          </div>
        </header>
        <span className="flex justify-center px-5 text-3xl font-bold mb-2 cursor-default">
          Click on the Congress Card to Join
        </span>

        <Suspense fallback={<p>Loading...</p>}>
          <LazyCongressUser
            congressData={congressLists}
            currentUser={currentUser}
          />
        </Suspense>
      </main>
    </div>
  );
}
