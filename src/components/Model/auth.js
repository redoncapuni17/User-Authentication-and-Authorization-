import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";

import { doc, setDoc } from "firebase/firestore";

export const doCreateUserWithEmailAndPassword = async (
  name,
  email,
  password,
  role
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create a document in Firestore with the user's name as the document ID
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      role: role,
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};

// Now, you can use 'db' to perform Firestore operations
// For example, to add a document to a collection:
