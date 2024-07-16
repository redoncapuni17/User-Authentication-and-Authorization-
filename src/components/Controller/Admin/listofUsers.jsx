import React, { useEffect, useState } from "react";
import { fetchAllUsersFromFirestore } from "../../Model/firestoreUser";
import AllUsers from "../../View/AdminUI/allUsers";

export default function ListOfUser({ currentUser }) {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredTable, setFilteredTable] = useState([]);
  const [hoveredCongress, setHoveredCongress] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await fetchAllUsersFromFirestore();
        setAllUsers(users);
      } catch (error) {
        console.log("Error getting users: ", error);
      }
    };

    if (currentUser) {
      fetchAllUsers();
    }
  }, [currentUser]);

  useEffect(() => {
    const filteredData = allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredTable(filteredData);
  }, [searchInput, allUsers]);

  const handleMouseEnter = (congresses) => {
    setHoveredCongress(congresses);
  };

  const handleMouseLeave = () => {
    setHoveredCongress(null);
  };

  return (
    <AllUsers
      filteredTable={filteredTable}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      setSearchInput={setSearchInput}
      hoveredCongress={hoveredCongress}
      searchInput={searchInput}
    />
  );
}
