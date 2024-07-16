import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

// Function to add congress data in Firestore
export async function addCongressToFirestore(newCongress) {
  try {
    const congressRef = collection(db, "congress");
    await addDoc(congressRef, newCongress);
    console.log("Congress Added in Firestore");
    return true;
  } catch (error) {
    console.error("Error adding congress in Firestore: ", error);
    return false;
  }
}

// Function for search if congress data is existing in Firestore
export async function searchCongressExisting(name) {
  const congressRef = collection(db, "congress");
  const querySnapshot = await getDocs(congressRef);
  const existingCongress = querySnapshot.docs.find(
    (doc) => doc.data().name === name
  );
  return existingCongress;
}

// Function to update congress data in Firestore
export async function updatedCongressToFirestore(updatedCongress, congressId) {
  try {
    const updateRef = doc(db, "congress", congressId);
    await updateDoc(updateRef, updatedCongress);
    console.log("Congress Updated in Firestore");
    return true;
  } catch (error) {
    console.error("Error updating congress in Firestore", error);
    return false;
  }
}

export async function fetchCongressDataToFirestore(filterType, lastDoc = null) {
  let congressData = [];
  const PAGE_SIZE = 5; // Number of items to fetch per page

  try {
    const congressCollect = collection(db, "congress");
    let congressQuery = query(congressCollect, limit(PAGE_SIZE));

    if (filterType) {
      congressQuery = query(
        congressCollect,
        where("type", "==", filterType),
        limit(PAGE_SIZE)
      );
    }

    if (lastDoc) {
      congressQuery = query(congressQuery, startAfter(lastDoc));
    }

    const congressSnapshot = await getDocs(congressQuery);

    congressData = congressSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Check if the congress date and time is after or equal to today's date and time
    const currentTime = new Date();
    for (const congress of congressData) {
      const congressRef = doc(db, "congress", congress.id);
      const endTimeDate = new Date(`${congress.date}, ${congress.endTime}`);

      if (endTimeDate > currentTime) {
        await updateDoc(congressRef, {
          type: "active",
        });
      } else {
        await updateDoc(congressRef, {
          type: "passive",
        });
      }
    }

    return {
      data: congressData,
      lastVisible: congressSnapshot.docs[congressSnapshot.docs.length - 1],
    };
  } catch (error) {
    console.error("Error fetching congress data: ", error);
    return { data: [], lastVisible: null };
  }
}

// Function to delete congress data in Firestore
export async function handleDeleteCongressToFirestore(congressId) {
  try {
    const deletedCongressRef = doc(db, "congress", congressId);
    await deleteDoc(deletedCongressRef);
    console.log("Congress deleted successfully");
    return true;
  } catch (error) {
    console.error("Error removing congress: ", error);
    return false;
  }
}

// Function to fetch all join user to congress data from Firestore
export async function fetchAllJoinUsersFromFirestore(congressId) {
  try {
    const congressDocRef = doc(db, "congress", congressId);
    const congressDocSnapshot = await getDoc(congressDocRef);

    if (congressDocSnapshot.exists()) {
      const congressData = congressDocSnapshot.data();
      if (congressData.users) {
        return congressData.users; // Return the users data
      } else {
        console.log("No joined User data found for this Congress.");
        return [];
      }
    } else {
      console.log("Congress document does not exist.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching joined Users: ", error);
    return [];
  }
}
