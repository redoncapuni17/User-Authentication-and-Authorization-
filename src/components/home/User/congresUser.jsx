import { useEffect, useState } from "react";
import { handleJoinCongresstoFirestore } from "../../firebase/firestore";

function CongresUser({ congressData, currentUser }) {
  const [clickCongress, setClickCongress] = useState(false);
  const [joinCongress, setJoinCongress] = useState(false);
  const [selectedCongress, setSelectedCongress] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCongressData, setFilteredCongressData] = useState([]);
  const [alreadyJoinedMessage, setAlreadyJoinedMessage] = useState("");

  const handleClickCongress = (congress) => {
    setSelectedCongress(congress);
    setClickCongress(true);
    setJoinCongress(false);
  };

  // Function to join user in congress in Firestore
  const handleJoinCongress = async () => {
    try {
      if (!currentUser) {
        console.error("Current user is not available");
        return;
      }

      const handlejoinCongress = await handleJoinCongresstoFirestore(
        currentUser,
        selectedCongress
      );

      if (handlejoinCongress) {
        setAlreadyJoinedMessage("You have already joined this congress.");
        setTimeout(() => {
          setAlreadyJoinedMessage("");
        }, 1500);
        return;
      }

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
    <div className="flex flex-col px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
      <div className="flex justify-end w-full border-b-2 pb-2">
        <form id="" className="flex items-center w-full md:w-96">
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
              className="w-full md:w-96 px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Search by congress"
              value={searchInput}
              onChange={handleFilteredInput}
            />
          </div>
        </form>
      </div>
      <div className="sm:flex sm:flex-row flex-col">
        {clickCongress ? (
          joinCongress ? (
            ``
          ) : (
            <div className="w-full md:w-96 h-auto md:h-96 p-5 flex flex-col items-center border-r-2 border-gray-300">
              <section
                className={`w-72 flex flex-col ${
                  selectedCongress.type === "passive"
                    ? "border border-red-300 bg-gradient-to-r from-red-100 to-red-200 line-through"
                    : " border border-blue-300"
                } py-7 px-2 bg-gradient-to-r from-blue-100 to-blue-200 my-5 bg-gray-50 shadow-xl rounded-md`}
              >
                <div
                  className={`flex pl-1 mb-2 ${
                    selectedCongress.type === "passive"
                      ? " border-l-4 border-red-500"
                      : " border-l-4 border-blue-500"
                  } text-2xl font-bold cursor-default`}
                >
                  {selectedCongress.name}
                </div>
                <div className="flex w-full justify-between px-6 mb-4 text-sm">
                  Start &nbsp;
                  {selectedCongress.startTime}
                  <p className="text-slate-400 border-x-2 border-gray-400 px-4">
                    to
                  </p>
                  End &nbsp;
                  {selectedCongress.endTime}
                </div>
                <div className="flex justify-center items-center gap-3">
                  <span className="font-bold cursor-default">Date</span>
                  <span
                    className={`text-sm ${
                      selectedCongress.type === "passive"
                        ? "text-red-500"
                        : "text-blue-500"
                    } font-medium`}
                  >
                    {selectedCongress.date}
                  </span>
                </div>
                <div className="flex gap-5 pt-2">
                  <div className="flex flex-col border-r-2 border-gray-400 px-3">
                    <span className="font-bold cursor-default">
                      Contact Info
                    </span>
                    <span className="text-sm text-red-500 font-medium">
                      {selectedCongress.contactInfo}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold cursor-default">Address</span>
                    <span className="text-sm text-slate-500">
                      {selectedCongress.address}
                    </span>
                  </div>
                </div>
              </section>
              {alreadyJoinedMessage && (
                <p className="text-sm text-red-500">{alreadyJoinedMessage}</p>
              )}

              <div className="flex justify-center gap-4 mt-5">
                <button
                  onClick={handleJoinCongress}
                  type="button"
                  className="w-28 text-white bg-indigo-500 hover:bg-indigo-600 transition duration-300 font-medium rounded-lg text-sm py-2 text-center me-2"
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
          <div className="w-full md:w-96 h-80 md:h-96 flex justify-center items-center text-3xl border-r-2 border-gray-300 text-slate-400">
            No Selected
          </div>
        )}

        <div className="h-96 overflow-scroll sm:h-96 md:h-96 sm:overflow-scroll no-scrollbar bg-slate-50 grid sm:grid md:gird lg:grid grid-flow-row gap-5   text-neutral-600 grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 w-full p-3">
          {filteredCongressData.map((congress) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
export default CongresUser;
