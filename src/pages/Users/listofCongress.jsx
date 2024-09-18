import React, { useEffect, useState } from "react";

import {
  fetchJoinedCongressFromFirestore,
  handleDeleteCongressFromUserToFirestore,
} from "../../Model/firestoreUser";
import MyCongress from "./UsersUI/myCongress";

export default function ListOfCongress({ currentUser }) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredTable, setFilteredTable] = useState([]);
  const [joinedCongress, setJoinedCongress] = useState([]);

  const fetchJoinedCongress = async () => {
    try {
      if (!currentUser || !currentUser.uid) {
        console.error("No user or user ID available.");
        return;
      }
      const joinedCongressData = await fetchJoinedCongressFromFirestore(
        currentUser
      );
      setJoinedCongress(joinedCongressData);
    } catch (error) {
      console.error("Error fetching joined congress: ", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchJoinedCongress();
    }
  }, [currentUser]);

  const handleDeleteCongressFromUser = async (congress) => {
    try {
      const updatedJoinedCongress =
        await handleDeleteCongressFromUserToFirestore(currentUser, congress);
      if (updatedJoinedCongress) {
        // Update the joinedCongress state with the updated data
        setJoinedCongress((prevCongress) =>
          prevCongress.filter((c) => c.id !== congress.id)
        );
      }
    } catch (error) {
      console.error("Error deleting congress: ", error);
    }
  };
  useEffect(() => {
    // Update filtered table when joinedCongress changes
    setFilteredTable(joinedCongress);
  }, [joinedCongress]);

  useEffect(() => {
    // Filter by search input
    if (joinedCongress && joinedCongress.length > 0) {
      const filteredData = joinedCongress.filter((congress) =>
        congress.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredTable(filteredData);
    }
  }, [searchInput, joinedCongress]);

  return (
    <MyCongress
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      filteredTable={filteredTable}
      handleDeleteCongressFromUser={handleDeleteCongressFromUser}
    />
  );
}
