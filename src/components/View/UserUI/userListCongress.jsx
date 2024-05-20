import React from "react";
import { VscLoading } from "react-icons/vsc";

function UserCongress({
  filteredCongressData,
  handleClickCongress,
  loading,
  hasMore,
  fetchData,
}) {
  return (
    <div className="relative w-full  h-96 bg-slate-50  sm:h-96 md:h-96 sm:overflow-scroll text-neutral-600 ">
      {loading && !filteredCongressData.length ? (
        <div className="absolute top-36 left-1/2 transform -translate-x-1/2">
          <VscLoading className="animate-spin text-3xl" />
        </div>
      ) : (
        <>
          <div className="grid sm:grid md:grid lg:grid grid-flow-row gap-5  grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  p-3 ">
            {filteredCongressData.map((congress) => (
              <li
                key={congress.id}
                className={`flex p-3 w-24 h-16 sm:w-28 md:w-40 lg:w-48 sm:h-16 md:h-28 justify-center animate-show-component ${
                  congress.type === "passive"
                    ? "border border-red-300 bg-gradient-to-r from-red-100 to-red-200 line-through"
                    : "border border-blue-300"
                } items-center bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-md hover:scale-105 transition-all cursor-pointer`}
                onClick={() => handleClickCongress(congress)}
              >
                <span className="text-lg">{congress.name}</span>
              </li>
            ))}
          </div>

          {hasMore && (
            <div className="flex  z-50 m-3">
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 duration-300"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    More
                    <VscLoading className="animate-spin text-xl" />
                  </span>
                ) : (
                  "More"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserCongress;
