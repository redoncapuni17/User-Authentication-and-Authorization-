import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// Function to fetch all users from Firestore
export async function fetchAllUsersFromFirestore() {
  try {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const usersList = [];

    usersSnapshot.forEach((doc) => {
      usersList.push({ uid: doc.id, ...doc.data() });
    });

    return usersList;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return [];
  }
}

// Function to fetch all congress data in which currentUser are joined to , from Firestore

export async function fetchJoinedCongressFromFirestore(currentUser) {
  try {
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      if (userData.joinCongress) {
        return userData.joinCongress; // Return the joined congress data
      } else {
        console.log("No joined congress data found for the user.");
      }
    } else {
      console.log("User document does not exist.");
    }
  } catch (error) {
    console.error("Error fetching joined congress: ", error);
  }
}

// Function to delete congress data from user in Firestore
export async function handleDeleteCongressFromUserToFirestore(
  currentUser,
  congress
) {
  try {
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const updatedJoinCongress = userData.joinCongress.filter(
        (congres) => congres.id !== congress.id
      );
      await updateDoc(userDocRef, {
        joinCongress:
          updatedJoinCongress.length > 0 ? updatedJoinCongress : null,
      });
      console.log("Data removed from user successfully");
      // Remove the user from the users list associated with the congress
      const congressDocRef = doc(db, "congress", congress.id);
      const congressDocSnapshot = await getDoc(congressDocRef);
      if (congressDocSnapshot.exists()) {
        const congressData = congressDocSnapshot.data();
        const updatedUsers = congressData.users.filter(
          (user) => user.id !== currentUser.uid
        );
        await updateDoc(congressDocRef, { users: updatedUsers });
        console.log("Data removed from congress successfully");
        return updatedJoinCongress;
      } else {
        console.log("Congress document does not exist.");
        return userDocSnapshot;
      }
    } else {
      console.log("User document does not exist.");
    }
  } catch (error) {
    console.error("Error deleting congress from user: ", error);
  }
}

// Function to join user in congress in Firestore
export async function handleJoinCongresstoFirestore(
  currentUser,
  selectedCongress
) {
  const congressDocRef = doc(db, "congress", selectedCongress.id);
  // Check if the user is already in the list of users in firestore
  const isUserAlreadyJoined = selectedCongress.users.some(
    (user) => user.id === currentUser.uid
  );
  if (isUserAlreadyJoined) {
    return isUserAlreadyJoined;
  } else {
    await updateDoc(congressDocRef, {
      users: [
        ...selectedCongress.users,
        {
          id: currentUser.uid,
          name: currentUser.name,
          email: currentUser.email,
        },
      ],
    });
    // Create a new field joinedCongress on users collection in firebase firestore
    const userDocRef = doc(db, "users", currentUser.uid);
    await updateDoc(userDocRef, {
      joinCongress: arrayUnion({
        id: selectedCongress.id,
        name: selectedCongress.name,
        address: selectedCongress.address,
        contactInfo: selectedCongress.contactInfo,
        startTime: selectedCongress.startTime,
        endTime: selectedCongress.endTime,
        date: selectedCongress.date,
      }),
    });

    console.log("Joined congress added to user's document successfully");
  }
}
