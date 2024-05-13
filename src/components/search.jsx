import React from "react";
import { IoIosSearch } from "react-icons/io";

function Search({ setSearchInput, searchInput }) {
  return (
    <>
      <input
        type="text"
        className="w-full pl-4 pr-8 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        placeholder="Search by congress name..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <IoIosSearch className="absolute top-1/2 transform -translate-y-1/2 right-3 w-4 h-4 text-gray-500 dark:text-gray-400" />
    </>
  );
}

export default Search;
