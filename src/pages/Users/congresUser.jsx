import { useEffect, useState } from "react";

import { handleJoinCongresstoFirestore } from "../../Model/firestoreUser";

import SelectedCongress from "./UsersUI/selectedCongress";
import UserCongress from "./UsersUI/userListCongress";
import Search from "../../components/search";
import Filter from "../../components/filter";

function CongresUser({
  congressData,
  currentUser,
  setFilterType,
  filterType,
  loading,
  hasMore,
  fetchData,
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
    <div className="flex flex-col sm:px-4 md:px-6 lg:px-8 xl:px-2 xl:pt-7">
      <div className="sm:flex sm:flex-row flex-col">
        <div className="sm:flex sm:flex-row flex-col">
          <SelectedCongress
            clickCongress={clickCongress}
            joinCongress={joinCongress}
            selectedCongress={selectedCongress}
            setClickCongress={setClickCongress}
            setJoinCongress={setJoinCongress}
            handleJoinCongress={handleJoinCongress}
            alreadyJoinedMessage={alreadyJoinedMessage}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-end w-full">
            <div className="relative flex justify-between w-full items-center border-b p-2">
              <div className="relative w-full lg:w-96">
                <Search
                  setSearchInput={setSearchInput}
                  searchInput={searchInput}
                />
              </div>
              <Filter filterType={filterType} setFilterType={setFilterType} />
            </div>
          </div>

          <UserCongress
            filteredCongressData={filteredCongressData}
            handleClickCongress={handleClickCongress}
            loading={loading}
            hasMore={hasMore}
            fetchData={fetchData}
          />
        </div>
      </div>
    </div>
  );
}
export default CongresUser;
