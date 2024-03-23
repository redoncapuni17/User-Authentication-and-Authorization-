// ListOfUser.js

import { useEffect, useState } from "react";

import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ListOfUser({ currentUser }) {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        const usersList = [];
        usersSnapshot.forEach((doc) => {
          usersList.push({ uid: doc.id, ...doc.data() });
        });
        setAllUsers(usersList);
      } catch (error) {
        console.log("Error getting users: ", error);
      }
    };

    if (currentUser) {
      fetchAllUsers();
    }
  }, [currentUser]);

  return (
    <div className="h-screen w-full p-4 ">
      <h2 className="text-xl font-semibold mb-4">Users List</h2>
      <div className=" flex  justify-between p-4">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="text"
              className="w-80 px-10 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Search branch name..."
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-indigo-500 rounded-lg  hover:bg-indigo-600 focus:ring-4 focus:outline-none "
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </form>
        <label className="w-28 flex justify-center items-center bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300">
          Filter
        </label>
      </div>
      <ul>
        {allUsers.map((user) => (
          <li
            key={user.uid}
            className="flex items-center justify-between py-2 border-b"
          >
            <span className="text-gray-800">{user.name}</span>
            <span className="text-gray-500">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
