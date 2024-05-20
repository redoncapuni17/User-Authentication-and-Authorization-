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
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (isLoadMore = false) => {
    try {
      setLoading(true);
      const result = await fetchCongressDataToFirestore(
        filterType,
        isLoadMore ? lastVisible : null
      );
      setLoading(false);
      if (result.data.length === 0) {
        setHasMore(false);
      } else {
        setCongressLists((prev) =>
          isLoadMore ? [...prev, ...result.data] : result.data
        );
        setLastVisible(result.lastVisible);
        if (result.data.length < 5) {
          setHasMore(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching congress data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterType]);

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

  const handleEditCongress = (congressId) => {
    const selectedCongress = congressLists.find(
      (congress) => congress.id === congressId
    );
    setEditCongress(selectedCongress);
  };

  const updateCongressList = (updatedCongress) => {
    setCongressLists((prevCongressLists) => {
      const index = prevCongressLists.findIndex(
        (congress) => congress.id === updatedCongress.id
      );
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
    <main className="w-full h-98 overflow-y-auto px-5 py-5">
      <Header currentUser={currentUser} />
      <section className="flex flex-col md:flex-row">
        <div className="xl:w-96 lg:w-96 md:w-full sm:w-full py-3 h-full">
          <EventForm
            addCongress={addCongress}
            adminUid={currentUser}
            editCongress={editCongress}
            updateCongressList={updateCongressList}
          />
        </div>
        <div className="w-full md:w-3/4 lg:p-3">
          <div className="flex justify-between items-center w-full mb-3">
            <div className="relative w-3/5">
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
              hasMore={hasMore}
              fetchData={() => fetchData(true)}
            />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
