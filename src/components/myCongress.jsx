import React from "react";
import Search from "./search";
import { FaTrash } from "react-icons/fa";

function MyCongress({
  searchInput,
  setSearchInput,
  filteredTable,
  handleDeleteCongressFromUser,
}) {
  return (
    <div className="h-screen w-full p-4 ">
      <h2 className="text-2xl font-semibold mb-4 cursor-default ">
        Joined Congress Details
      </h2>
      <div className="flex justify-between  py-4">
        <div className="relative w-full flex items-center  md:w-80 mb-4 md:mb-0 ">
          <Search searchInput={searchInput} setSearchInput={setSearchInput} />
        </div>
      </div>
      <div className=" h-3/4 overflow-y-scroll shadow-2xl  no-scrollbar rounded-lg border border-gray-300 ">
        <table className="min-w-full divide-y divide-gray-200   ">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Congress Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Date
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
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTable === undefined || filteredTable.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-xl text-center text-gray-500"
                >
                  No joined congress data found for the user.
                </td>
              </tr>
            ) : (
              filteredTable.map((congress) => (
                <tr key={congress.id} className="even:dark:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 cursor-default">
                    {congress.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {congress.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {congress.date}
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
                      onClick={() => handleDeleteCongressFromUser(congress)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyCongress;
