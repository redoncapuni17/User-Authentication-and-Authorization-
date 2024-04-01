import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

export default function EventForm({
  addCongress,
  adminUid,
  editCongress,
  updateCongressList,
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isExistingCongress, setIsExistingCongress] = useState(false);

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    if (editCongress) {
      setName(editCongress.name);
      setAddress(editCongress.address);
      setStartTime(editCongress.startTime);
      setEndTime(editCongress.endTime);
      setContactInfo(editCongress.contactInfo);
      setShowUpdateForm(true);
    }
  }, [editCongress]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if adminUid is defined
    if (!adminUid) {
      console.error("adminUid is undefined");
      return;
    }

    const newCongress = {
      name: name,
      address: address,
      startTime: startTime,
      endTime: endTime,
      contactInfo: contactInfo,
      adminUid: adminUid, // Ensure adminUid is properly set
      users: [], // Add an empty array for users
    };

    try {
      // Add new Congress to the Firestore collection
      const congressRef = collection(db, "congress");
      const querySnapshot = await getDocs(congressRef);
      const existingCongress = querySnapshot.docs.find(
        (doc) => doc.data().name === name
      );

      if (existingCongress) {
        setIsExistingCongress(true);
        return;
      }
      {
        await addDoc(congressRef, newCongress);

        console.log("Congress created");

        addCongress(newCongress);
      }

      setName("");
      setAddress("");
      setStartTime("");
      setEndTime("");
      setContactInfo("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleUpdateCongress = async (e) => {
    e.preventDefault();
    if (!adminUid) {
      console.log("adminUid is undefined");
      return;
    }

    const updatedCongress = {
      ...editCongress,
      name: name,
      address: address,
      startTime: startTime,
      endTime: endTime,
      contactInfo: contactInfo,
      adminUid: adminUid,
    };

    try {
      const updatedRef = doc(db, "congress", editCongress.id);
      await updateDoc(updatedRef, updatedCongress);
      console.log("Congress Updated");

      // Update the Congress list in the parent component
      updateCongressList(updatedCongress);

      // After update set the Form null
      setName("");
      setAddress("");
      setStartTime("");
      setEndTime("");
      setContactInfo("");
      setShowUpdateForm(false);
    } catch (error) {
      console.log("Error updating congress: ", error);
    }
  };

  return (
    <div className="w-11/12  bg-white rounded-lg  ">
      <h2 className="text-xl font-bold mb-4">Event Form</h2>
      <form onSubmit={showUpdateForm ? handleUpdateCongress : handleSubmit}>
        <div className="">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name of Event
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2 border border-gray-300 ${
              isExistingCongress ? "border border-red-500 " : ""
            } rounded-md focus:outline-none focus:border-indigo-500`}
            placeholder="Enter name of event"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 font-semibold mb-2"
          >
            Address of Event
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter address of event"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-sm text-gray-700 font-semibold mb-2"
          >
            Time
          </label>
          <div className="flex items-center  justify-between ">
            <section className="flex items-center gap-1">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-36 px-4 py-2 border border-gray-300 dark:placeholder-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </section>
            <p className="border-x-2 px-6">to</p>
            <section className="flex items-center gap-1">
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-36 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter time of event"
                required
              />
            </section>
          </div>
        </div>
        <div className="">
          <label
            htmlFor="contactInfo"
            className="block text-sm text-gray-700 font-semibold mb-2"
          >
            Contact Info (Phone number or E-mail)
          </label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter contact info"
            required
          />
        </div>
        {isExistingCongress ? (
          <p className="text-red-500  text-xs mb-3">
            Congress with same name alredy exists
          </p>
        ) : (
          <p className="text-green-500  text-xs mb-3">Successfully Created</p>
        )}

        {showUpdateForm ? (
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Update
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
