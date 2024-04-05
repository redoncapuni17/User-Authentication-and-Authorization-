import React, { Suspense, lazy, useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext/index";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const LazyAdminPage = lazy(() => import("./Admin/adminPage"));
const LazyUserPage = lazy(() => import("./User/userPage"));

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
          <Suspense fallback={<p>Loading...</p>}>
            <LazyAdminPage
              userData={userData}
              showUser={showUser}
              handleUser={handleUser}
              showDashboard={showDashboard}
              handleDashboard={handleDashboard}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<p>Loading...</p>}>
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
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Home;
