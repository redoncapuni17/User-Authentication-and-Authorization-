import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext/index";
import { db } from "../firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

function Home() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserData(userData);
          setIsAdmin(userData.role === "admin");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document : ", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        const usersList = [];
        usersSnapshot.forEach((doc) => {
          usersList.push(doc.data());
        });
        setAllUsers(usersList);
      } catch (error) {
        console.log("Error getting users: ", error);
      }
    };

    if (currentUser) {
      fetchUserData();
      fetchAllUsers();
    }
  }, [currentUser]);

  return (
    <div className="text-2xl font-bold py-5 px-2">
      {userData ? (
        isAdmin ? (
          <div>
            <p>
              Hello {userData.name}, you are an {userData.role}.
            </p>
            <p>Users List :</p>
            <ul>
              {allUsers.map((user) => (
                <li key={user.uid}>{user.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <p>
              Hello {userData.name}, you are a {userData.role}.
            </p>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;
