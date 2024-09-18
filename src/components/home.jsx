import React, { Suspense, lazy, useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext/index";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../Model/firebase";
import NavBar from "./navbar";

const LazyAdminPage = lazy(() => import("../pages/Admin/adminPage"));
const LazyUserPage = lazy(() => import("../pages/Users/userPage"));

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
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                Loading...
              </div>
            }
          >
            <LazyAdminPage
              userData={userData}
              showUser={showUser}
              handleUser={handleUser}
              showDashboard={showDashboard}
              handleDashboard={handleDashboard}
            />
          </Suspense>
        ) : (
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                Loading...
              </div>
            }
          >
            <LazyUserPage
              userData={userData}
              showUser={showUser}
              handleUser={handleUser}
              showDashboard={showDashboard}
              handleDashboard={handleDashboard}
            />
          </Suspense>
        )
      ) : (
        ""
      )}
    </div>
  );
}
export default Home;
