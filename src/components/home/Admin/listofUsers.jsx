import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ListOfUser({ currentUser }) {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredTable, setFilteredTable] = useState([]);

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

  useEffect(() => {
    // Filter by search input
    const filteredData = allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Filter further by selected congress

    setFilteredTable(filteredData);
  }, [searchInput, allUsers]);

  const handleFilteredInput = (e) => {
    setSearchInput(e.target.value);
  };

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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="text"
              className="w-80 px-10 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
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
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
              Joined Congress
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTable.map(
            (user) =>
              user.role !== "admin" && (
                <tr key={user.uid}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.uid}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinCongress
                      ? user.joinCongress
                          .map((congress) => congress.name)
                          .join(", ")
                      : "No join yet"}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
