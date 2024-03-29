import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext/index";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import AdminPage from "./Admin/adminPage";
import UserPage from "./User/userPage";

function Home() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [showUser, setShowUser] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);

  const handleUser = () => {
    setShowUser(true);
    setShowDashboard(false);
  };
  const handleDashboard = () => {
    setShowDashboard(true);
    setShowUser(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserData(userData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document : ", error);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  return (
    <div>
      {userData ? (
        userData.role === "admin" ? (
          <AdminPage
            userData={userData}
            showUser={showUser}
            handleUser={handleUser}
            showDashboard={showDashboard}
            handleDashboard={handleDashboard}
          />
        ) : (
          <UserPage
            userData={userData}
            showUser={showUser}
            handleUser={handleUser}
            showDashboard={showDashboard}
            handleDashboard={handleDashboard}
          />
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Home;
