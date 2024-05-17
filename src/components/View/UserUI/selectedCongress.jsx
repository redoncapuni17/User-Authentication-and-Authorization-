import React from "react";

function SelectedCongress({
  clickCongress,
  joinCongress,
  selectedCongress,
  setClickCongress,
  handleJoinCongress,
  alreadyJoinedMessage,
}) {
  return (
    <>
      {clickCongress ? (
        joinCongress ? (
          ``
        ) : (
          <div className="lg:w-96  flex flex-col justify-center items-center border-r-2 border-gray-300">
            <section
              className={`w-72 flex flex-col ${
                selectedCongress.type === "passive"
                  ? "border  border-red-300 bg-gradient-to-r from-red-100 to-red-200 line-through"
                  : " border border-blue-300"
              } py-7  px-2 bg-gradient-to-r from-blue-100 to-blue-200 my-5 bg-gray-50 shadow-xl rounded-md`}
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
                  <span className="font-bold cursor-default">Contact Info</span>
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
        <div className="lg:w-96 flex flex-col justify-center items-center text-3xl border-r-2 border-gray-300 text-slate-400">
          No Selected
        </div>
      )}
    </>
  );
}

export default SelectedCongress;
