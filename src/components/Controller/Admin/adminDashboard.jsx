import React, { useState, useEffect, Suspense, lazy } from "react";
import EventForm from "./eventForm";
import Header from "../../View/header";
import Search from "../../View/search";
import Filter from "../../View/filter";
import {
  fetchCongressDataToFirestore,
  handleDeleteCongressToFirestore,
} from "../../Model/firestore";

const LazyCongressAdmin = lazy(() => import("./congressAdmin"));

export default function AdminDashboard({ currentUser }) {
  const [congressLists, setCongressLists] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCongressLists, setFilteredCongressLists] = useState([]);
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [editCongress, setEditCongress] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let congress;
        if (filterType) {
          congress = await fetchCongressDataToFirestore(filterType);
        } else {
          congress = await fetchCongressDataToFirestore();
        }
        setCongressLists(congress);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching congress data: ", error);
      }
    };

    fetchData();
  }, [filterType]); // Include filterType as a dependency

  // Delete Congress From Firebase
  const handleDeleteCongress = async (congressId) => {
    try {
      if (!congressId) {
        console.error("Invalid congressId:", congressId);
        return;
      }
      const success = await handleDeleteCongressToFirestore(congressId);
      if (success) {
        setCongressLists((prevCongressLists) =>
          prevCongressLists.filter((congress) => congress.id !== congressId)
        );
        setOpenDropDownMenu(false);
      } else {
        console.error("Failed to delete congress");
      }
    } catch (error) {
      console.error("Error removing congress: ", error);
    }
  };

  // Find the current Congress for editing
  const handleEditCongress = (congressId) => {
    const selectedCongress = congressLists.find(
      (congress) => congress.id === congressId
    );
    setEditCongress(selectedCongress);
  };

  const updateCongressList = (updatedCongress) => {
    setCongressLists((prevCongressLists) => {
      // Find the index of the updated Congress in the array
      const index = prevCongressLists.findIndex(
        (congress) => congress.id === updatedCongress.id
      );
      // If the Congress is found, update it, otherwise just return the previous state
      if (index !== -1) {
        const updatedCongressList = [...prevCongressLists];
        updatedCongressList[index] = updatedCongress;
        return updatedCongressList;
      }
      return prevCongressLists;
    });
  };

  const filteredCongress = congressLists.filter((congress) =>
    congress.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const addCongress = (newCongress) => {
    setCongressLists([newCongress, ...congressLists]);
  };

  useEffect(() => {
    setFilteredCongressLists(filteredCongress);
  }, [searchInput, congressLists]);

  return (
    <main className="w-full h-98 overflow-y-auto  px-5 py-5 ">
      <Header currentUser={currentUser} />
      <section className="flex flex-col md:flex-row  ">
        <div className="xl:w-96 lg:w-96 md:w-full sm:w-full py-3   h-full    ">
          <EventForm
            addCongress={addCongress}
            adminUid={currentUser}
            editCongress={editCongress}
            updateCongressList={updateCongressList}
          />
        </div>
        <div className="w-full md:w-3/4 lg:p-3   ">
          <div className="flex justify-between items-center w-full mb-3 ">
            <div className="relative  w-3/5">
              <Search
                setSearchInput={setSearchInput}
                searchInput={searchInput}
              />
            </div>
            <Filter setFilterType={setFilterType} filterType={filterType} />
          </div>

          <Suspense fallback={<p>Loading Congress...</p>}>
            <LazyCongressAdmin
              congressLists={filteredCongressLists}
              handleDeleteCongress={handleDeleteCongress}
              openDropDownMenu={openDropDownMenu}
              setOpenDropDownMenu={setOpenDropDownMenu}
              handleEditCongress={handleEditCongress}
              updatedCongressLists={congressLists}
              loading={loading}
            />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
