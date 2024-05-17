import React from "react";
import { VscLoading } from "react-icons/vsc";

function UserCongress({ filteredCongressData, handleClickCongress, loading }) {
  return (
    <>
      {loading ? (
        <div className=" absolute top-36 left-1/2   ">
          <VscLoading className="animate-spin text-3xl" />
        </div>
      ) : (
        filteredCongressData.map((congress) => (
          <section
            key={congress.id}
            className={`flex p-3 w-24 h-16 sm:w-28 md:w-40 lg:w-48 sm:h-16 md:h-28 justify-center ${
              congress.type === "passive"
                ? "border border-red-300 bg-gradient-to-r from-red-100 to-red-200 line-through"
                : "border border-blue-300"
            } items-center  bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-md hover:scale-105 transition-all cursor-pointer`}
            onClick={() => handleClickCongress(congress)}
          >
            <span className="text-lg">{congress.name}</span>
          </section>
        ))
      )}
    </>
  );
}

export default UserCongress;
