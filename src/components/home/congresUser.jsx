import { useState } from "react";

export default function CongresUser() {
  const [clickCongress, setClickCongress] = useState(false);
  const [joinCongress, setJoinCongress] = useState(false);

  const handleClickCongress = () => {
    setClickCongress(!clickCongress);
    setJoinCongress(false);
  };

  const handleJoinCongress = () => {
    setJoinCongress(!joinCongress);
    setClickCongress(false);
  };

  return (
    <div className=" flex p-2 mt-5">
      {clickCongress ? (
        joinCongress ? (
          <div className="w-96 h-96 flex justify-center items-center text-3xl  border-r-2 border-gray-300 text-slate-400  ">
            No Join
          </div>
        ) : (
          <div className="w-96 h-96 p-5 justify-center  border-r-2 border-gray-300 ">
            <section className="w-full flex justify-center h-52 border border-red-600 rounded-md">
              Card1
            </section>
            <div className="flex justify-center gap-4 mt-3">
              <button
                onClick={handleJoinCongress}
                type="button"
                className=" w-28 text-white bg-indigo-500 hover:bg-indigo-600 transition duration-300 font-medium rounded-lg text-sm  py-2 text-center me-2 "
              >
                Join
              </button>
              <button
                onClick={handleJoinCongress}
                className="hover:text-slate-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="w-96 h-96 flex justify-center items-center text-3xl  border-r-2 border-gray-300 text-slate-400  ">
          No Join
        </div>
      )}
      <div className=" grid grid-flow-row gap-2 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-5/6 p-3">
        <section
          onClick={handleClickCongress}
          className="flex justify-center items-center rounded-md w-56 h-36 border border-blue-600 hover:scale-105 transition-all cursor-pointer "
        >
          Card 1
        </section>
        <section
          onClick={handleClickCongress}
          className="flex justify-center items-center rounded-md w-56 h-36 border border-blue-600 hover:scale-105 transition-all cursor-pointer "
        >
          Card 2
        </section>
        <section
          onClick={handleClickCongress}
          className="flex justify-center items-center rounded-md w-56 h-36 border border-blue-600 hover:scale-105 transition-all cursor-pointer "
        >
          Card 3
        </section>
        <section
          onClick={handleClickCongress}
          className="flex justify-center items-center rounded-md w-56 h-36 border border-blue-600 hover:scale-105 transition-all cursor-pointer "
        >
          Card 4
        </section>
        <section
          onClick={handleClickCongress}
          className="flex justify-center items-center rounded-md w-56 h-36 border border-blue-600 hover:scale-105 transition-all cursor-pointer "
        >
          Card 5
        </section>

        <section
          onClick={handleClickCongress}
          className="flex justify-center items-center rounded-md w-56 h-36 border border-blue-600 hover:scale-105 transition-all cursor-pointer "
        >
          Card 6
        </section>
      </div>
    </div>
  );
}
