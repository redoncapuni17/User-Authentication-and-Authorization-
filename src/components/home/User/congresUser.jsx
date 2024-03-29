import { useEffect, useState } from "react";

import { db } from "../../firebase/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function CongresUser({ congressData, currentUser }) {
  const [clickCongress, setClickCongress] = useState(false);
  const [joinCongress, setJoinCongress] = useState(false);
  const [selectedCongress, setSelectedCongress] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCongressData, setFilteredCongressData] = useState([]);

  const handleClickCongress = (congress) => {
    setSelectedCongress(congress);
    setClickCongress(true);
    setJoinCongress(false);
  };

  const handleJoinCongress = async () => {
    try {
      if (!currentUser) {
        console.error("Current user is not available");
        return;
      }

      const congressDocRef = doc(db, "congress", selectedCongress.id);
      await updateDoc(congressDocRef, {
        users: [
          ...selectedCongress.users,
          { id: currentUser.uid, name: currentUser.name },
        ],
      });
      console.log("User added to Congress successfully");

      // Create a new filed joinedCongress on users collection in firebase firestore
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        joinCongress: arrayUnion({
          id: selectedCongress.id,
          name: selectedCongress.name,
          address: selectedCongress.address,
          contactInfo: selectedCongress.contactInfo,
          startTime: selectedCongress.startTime,
          endTime: selectedCongress.endTime,
        }),
      });

      console.log("Joined congress added to user's document successfully");

      setJoinCongress(true);
      setClickCongress(false);
    } catch (error) {
      console.error("Error adding user to Congress: ", error);
    }
  };

  useEffect(() => {
    const filteredData = congressData.filter((congress) =>
      congress.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredCongressData(filteredData);
  }, [searchInput, congressData]);

  const handleFilteredInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className=" flex flex-col p-2 ">
      <div className="flex justify-end w-full border-b-2 pb-2">
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
              className="w-96 px-10 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Search branch name..."
              value={searchInput}
              onChange={handleFilteredInput}
            />
          </div>
        </form>
      </div>
      <div className="flex">
        {clickCongress ? (
          joinCongress ? (
            ``
          ) : (
            <div className="w-96 h-96 p-5 justify-center   border-r-2 border-gray-300  ">
              <section className=" w-full flex flex-col py-7 px-2 h-60  border border-gray-200 mt-5 bg-gray-50 shadow-xl rounded-md  ">
                <div className="flex  pl-1  mb-2   text-2xl font-bold border-l-4  border-blue-500">
                  {selectedCongress.name}
                </div>
                <div className="flex w-full justify-between px-6 mb-7 text-sm ">
                  Start &nbsp;
                  {selectedCongress.startTime}
                  <p className="text-slate-400 border-x-2 px-4">to</p>
                  End &nbsp;
                  {selectedCongress.endTime}
                </div>
                <div className="flex justify-between pt-5 ">
                  <div className="flex flex-col  border-r-2 px-3 ">
                    <span className="font-bold">Contact Info</span>
                    <span className="text-sm text-red-400">
                      {selectedCongress.contactInfo}
                    </span>
                  </div>
                  <div className="flex flex-col    ">
                    <span className="font-bold">Address</span>
                    <span className="text-sm text-slate-500">
                      {selectedCongress.address}
                    </span>
                  </div>
                </div>
              </section>
              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={handleJoinCongress}
                  type="button"
                  className=" w-28 text-white bg-indigo-500 hover:bg-indigo-600 transition duration-300 font-medium rounded-lg text-sm  py-2 text-center me-2 "
                >
                  Join
                </button>
                <button
                  onClick={() => setClickCongress(false)}
                  className="hover:text-slate-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="w-96 h-96 flex justify-center items-center text-3xl  border-r-2 border-gray-300 text-slate-400    ">
            No Selected
          </div>
        )}

        <div className=" h-96 overflow-scroll no-scrollbar  bg-slate-50 grid grid-flow-row gap-5   text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-3">
          {filteredCongressData.map((congress) => (
            <section
              key={congress.id}
              className="flex w-52 h-28  justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg  rounded-md hover:scale-105 transition-all cursor-pointer"
              onClick={() => handleClickCongress(congress)}
            >
              {congress.name}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
