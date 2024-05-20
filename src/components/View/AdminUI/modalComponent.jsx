import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

export default function ModalComponent({
  allJoinUsers,
  animation,
  congress,
  congressName,
  downloadUsers,
  onClose,
}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50 transition-opacity ${
        animation ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white p-6 rounded-lg w-1/2 h-96">
        <h1 className="text-2xl font-bold">
          <span
            className={`${
              congress.type === "passive"
                ? "text-red-500 decoration-gray-800 line-through border-l-4 border-red-500 pl-2"
                : "text-green-500 border-l-4 border-green-500 pl-2"
            }`}
          >
            {congressName}
          </span>{" "}
          list
        </h1>
        <div className="flex justify-end mb-2">
          <button
            className="flex items-center gap-1 text-sm text-orange-500 bg-orange-100 px-3 py-1 rounded hover:bg-orange-200 duration-200 shadow-sm"
            onClick={downloadUsers}
          >
            Download
            <AiOutlineDownload className="text-base" />
          </button>
        </div>
        <div className="border overflow-y-auto no-scrollbar h-60">
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
        </div>
        <div className="mt-2 flex justify-end ">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded duration-300 shadow-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
