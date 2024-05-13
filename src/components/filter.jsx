import React from "react";

function Filter({ setFilterType, filterType }) {
  return (
    <form className="max-w-sm w-32 ">
      <select
        id="countries"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="">Filter</option>
        <option value="active">By Active</option>
        <option value="passive">By Passive</option>
      </select>
    </form>
  );
}

export default Filter;
