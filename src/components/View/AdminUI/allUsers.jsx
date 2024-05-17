import React from "react";
import Search from "../search";

export default function AllUsers({
  filteredTable,
  handleMouseEnter,
  handleMouseLeave,
  setSearchInput,
  hoveredCongress,
  searchInput,
}) {
  return (
    <div className=" w-full p-4 h-98 overflow-auto ">
      <h2 className="text-3xl font-semibold mb-4 cursor-default">Users List</h2>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="relative w-full flex items-center  md:w-80 mb-4 md:mb-0  ">
          <Search setSearchInput={setSearchInput} searchInput={searchInput} />
        </div>
      </div>
      <div className="overflow-y-scroll shadow-2xl  no-scrollbar rounded-lg border border-gray-300 pb-44">
        <table className="min-w-full divide-y divide-gray-200   ">
          <thead className="bg-gray-200 ">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
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
          <tbody className="bg-white divide-y  divide-gray-200 overflow-y-auto">
            {filteredTable.map(
              (user) =>
                user.role !== "admin" && (
                  <tr key={user.uid} className="even:dark:bg-gray-100 ">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-default border-b ">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                      {user.uid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                      {user.role}
                    </td>
                    <td
                      className="relative px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b"
                      onMouseEnter={() => handleMouseEnter(user.joinCongress)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {user.joinCongress ? (
                        <div className=" truncate w-28 cursor-pointer ">
                          {user.joinCongress
                            .map((congress) => congress.name)
                            .join(", ")}
                          {hoveredCongress &&
                            user.joinCongress === hoveredCongress && (
                              <div className="absolute bg-white border rounded p-2 shadow-md font-medium z-20">
                                <ul>
                                  {hoveredCongress.map((congress) => (
                                    <li key={congress.id}>- {congress.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      ) : (
                        "No join yet"
                      )}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
