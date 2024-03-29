import { FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

export default function ListOfCongress({ currentUser }) {
  const [allCongress, setAllCongress] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredTable, setFilteredTable] = useState([]);

  useEffect(() => {
    const fetchAllCongress = async () => {
      try {
        const usersRef = collection(db, "congress");
        const usersSnapshot = await getDocs(usersRef);
        const congressList = [];
        usersSnapshot.forEach((doc) => {
          congressList.push({ uid: doc.id, ...doc.data() });
        });
        setAllCongress(congressList);
      } catch (error) {
        console.log("Error getting users: ", error);
      }
    };

    if (currentUser) {
      fetchAllCongress();
    }
  }, [currentUser]);

  const handleDeleteCongress = async (congress) => {
    console.log("Congress to be deleted:", congress); // Debugging statement

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        joinedCongress: arrayRemove({
          id: congress.id,
          name: congress.name,
        }),
      });
      console.log("Joined congress deleted successfully");
    } catch (error) {
      console.error("Error deleting congress: ", error);
    }
  };

  useEffect(() => {
    // Filter by search input
    const filteredData = allCongress.filter((congress) =>
      congress.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredTable(filteredData);
  }, [searchInput, allCongress]);

  const handleFilteredInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="h-screen w-full p-4">
      <h2 className="text-xl font-semibold mb-4">Congress Lists</h2>
      <div className="flex justify-between p-4">
        <form className="flex items-center w-96">
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
              className="w-80 px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Search branch name..."
              value={searchInput}
              onChange={handleFilteredInput}
            />
          </div>
        </form>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Congress Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Contact Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              End Time
            </th>
            <th className=" py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTable.map((congress) => (
            <tr key={congress.uid}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                {congress.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {congress.address}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {congress.contactInfo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {congress.startTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {congress.endTime}
              </td>
              <td>
                <FaTrash
                  className="mr-2 text-red-500 cursor-pointer hover:text-red-400"
                  onClick={() => handleDeleteCongress(congress)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
