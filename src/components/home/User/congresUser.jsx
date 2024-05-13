import { useEffect, useState } from "react";

import { handleJoinCongresstoFirestore } from "../../firebase/firestore";

import Search from "../../search";
import Filter from "../../filter";
import SelectedCongress from "../../selectedCongress";
import UserCongress from "../../userListCongress";

function CongresUser({
  congressData,
  currentUser,
  setFilterType,
  filterType,
  loading,
}) {
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

  return (
    <div className="flex flex-col  sm:px-4 md:px-6 lg:px-8 xl:px-2 xl:pt-7">
      <div className="flex justify-end w-full  mb-2  ">
        <div className="relative flex justify-between lg:w-3/4  items-center md:w-80 mb-4 md:mb-0  ">
          <div className="relative  w-3/5">
            <Search setSearchInput={setSearchInput} searchInput={searchInput} />
          </div>
          <Filter filterType={filterType} setFilterType={setFilterType} />
        </div>
      </div>
      <div className="sm:flex sm:flex-row flex-col border-t-2 ">
        <SelectedCongress
          clickCongress={clickCongress}
          joinCongress={joinCongress}
          selectedCongress={selectedCongress}
          setClickCongress={setClickCongress}
          setJoinCongress={setJoinCongress}
          handleJoinCongress={handleJoinCongress}
          alreadyJoinedMessage={alreadyJoinedMessage}
        />
        <div className="relative h-96 overflow-scroll sm:h-96 md:h-96 sm:overflow-scroll no-scrollbar bg-slate-50 grid sm:grid md:gird lg:grid grid-flow-row gap-5   text-neutral-600 grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 w-full p-3">
          <UserCongress
            filteredCongressData={filteredCongressData}
            handleClickCongress={handleClickCongress}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
export default CongresUser;
