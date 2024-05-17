import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/authContext";
import { fetchAllJoinUsersFromFirestore } from "../../Model/firestore";
import ModalComponent from "../../View/AdminUI/modalComponent";

function ListOfJoinUsers({ onClose, congressName, congress }) {
  const { currentUser } = useAuth();
  const [allJoinUsers, setAllJoinUsers] = useState([]);
  const [animation, setAnimation] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchAllJoinUsers = async () => {
      try {
        if (!currentUser || !currentUser.uid) {
          console.error("No user or user ID available.");
          return;
        }

        const users = await fetchAllJoinUsersFromFirestore(congress.id); // Call fetchAllJoinUsers with the congress ID

        if (users) {
          setAllJoinUsers(users);
          setAnimation(true);
        } else {
          console.log("No joined User data found for this Congress.");
        }
      } catch (error) {
        console.error("Error fetching joined Users: ", error);
      }
    };

    if (currentUser) {
      fetchAllJoinUsers();
    }
  }, [currentUser]);

  const downloadUsers = () => {
    // Create a CSV file content
    const csvContent =
      "data:text/csv;charset=utf-8," +
      allJoinUsers.map((user) => `${user.name}    ${user.email}`).join("\n");

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "joined_users.csv");
    document.body.appendChild(link);

    // Trigger the download
    link.click();
  };

  return (
    <ModalComponent
      allJoinUsers={allJoinUsers}
      animation={animation}
      congress={congress}
      congressName={congressName}
      downloadUsers={downloadUsers}
      onClose={onClose}
    />
  );
}

export default ListOfJoinUsers;
