import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../contexts/authContext";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function ListOfJoinUsers({ onClose, congressName, congress }) {
  const { currentUser } = useAuth();
  const [allJoinUsers, setAllJoinUsers] = useState([]);
  const [animation, setAnimation] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchAllJoinUsers = async () => {
      try {
        if (!currentUser || !currentUser.uid) {
          console.error("No user or user ID available.");
          return;
        }

        const userDocRef = doc(db, "congress", congress.id);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          if (userData.users) {
            setAllJoinUsers(userData.users);
            setAnimation(true); // Open modal when data is fetched
          } else {
            console.log("No joined User data found for this Congress.");
          }
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching joined Users: ", error);
      }
    };

    if (currentUser) {
      fetchAllJoinUsers();
    }
  }, [currentUser]);

  const downloadUsers = () => {
    // Create a CSV file content
    const csvContent =
      "data:text/csv;charset=utf-8," +
      allJoinUsers.map((user) => `${user.name}    ${user.email}`).join("\n");

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "joined_users.csv");
    document.body.appendChild(link);

    // Trigger the download
    link.click();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50 transition-opacity  ${
        animation ? "opacity-100" : "opacity-0" // Apply opacity transition based on isOpen state
      }`}
    >
      <div className="bg-white p-6 rounded-lg  w-1/2 ">
        <h1 className="text-2xl font-bold ">
          <span
            className={`${
              congress.type === "passive"
                ? "text-red-500 decoration-gray-800 line-through "
                : "text-green-500"
            } `}
          >
            {congressName}
          </span>{" "}
          list
        </h1>
        <div className="flex justify-end  mb-2 ">
          <button
            className="text-sm text-orange-500 bg-orange-100 px-3 rounded"
            onClick={downloadUsers}
          >
            Download
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allJoinUsers.length > 0 ? (
              allJoinUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-default">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  Joiners List is Empty
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListOfJoinUsers;
