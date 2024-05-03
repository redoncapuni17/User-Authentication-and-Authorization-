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
  const [date, setDate] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isExistingCongress, setIsExistingCongress] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    if (editCongress) {
      setName(editCongress.name);
      setAddress(editCongress.address);
      setStartTime(editCongress.startTime);
      setEndTime(editCongress.endTime);
      setDate(editCongress.date);
      setContactInfo(editCongress.contactInfo);
      setShowUpdateForm(true);
    }
  }, [editCongress]);
  const currentTime = new Date();
  const congressEndTime = new Date(`${date}, ${endTime}`);

  // Check if the congress date is after or equal to today's date
  const actionType = congressEndTime >= currentTime ? "active" : "passive";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCongress = {
      name: name,
      address: address,
      startTime: startTime,
      endTime: endTime,
      date: date,
      contactInfo: contactInfo,
      adminUid: adminUid,
      users: [],
      type: actionType,
    };

    try {
      const congressRef = collection(db, "congress");
      const querySnapshot = await getDocs(congressRef);
      const existingCongress = querySnapshot.docs.find(
        (doc) => doc.data().name === name
      );

      if (existingCongress) {
        setIsExistingCongress(true);
        console.log("New Congress Added");
      }

      await addDoc(congressRef, newCongress);

      setIsExistingCongress(false);
      addCongress(newCongress);

      setName("");
      setAddress("");
      setStartTime("");
      setEndTime("");
      setDate("");
      setContactInfo("");
    } catch (error) {
      console.error("Error processing document: ", error);
    }
  };

  const handleUpdateCongress = async (e) => {
    e.preventDefault();

    const updatedCongress = {
      ...editCongress,
      name: name,
      address: address,
      startTime: startTime,
      endTime: endTime,
      date: date,
      contactInfo: contactInfo,
      adminUid: adminUid,
      type: actionType,
    };

    try {
      const updatedRef = doc(db, "congress", editCongress.id);
      await updateDoc(updatedRef, updatedCongress);
      console.log("Congress Updated");

      updateCongressList(updatedCongress);

      setName("");
      setAddress("");
      setStartTime("");
      setEndTime("");
      setDate("");
      setContactInfo("");
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating congress: ", error);
    }
  };

  return (
    <div className=" bg-white p-3 sm:border-r border-gray-500">
      <h2 className="text-lg font-semibold mb-4 cursor-default">Event Form</h2>
      <form onSubmit={showUpdateForm ? handleUpdateCongress : handleSubmit}>
        <div className="mb-2 ">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-1 text-sm"
          >
            Name of Event
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 ${
              isExistingCongress ? "border border-red-500 text-sm" : ""
            }  rounded-md focus:outline-none focus:border-indigo-500 text-sm `}
            placeholder="Enter name of event"
            required
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="address"
            className="block text-gray-700 font-semibold mb-1 text-sm"
          >
            Address of Event
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`  w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-sm`}
            placeholder="Enter address of event"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="time"
            className="block text-gray-700 font-semibold mb-1 text-sm"
          >
            Time
          </label>
          <div className="flex  sm:flex-row sm:items-center sm:justify-between">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-sm"
              required
            />
            <p className="text-center sm:mx-2 my-2 sm:my-0">to</p>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-sm"
              placeholder="Enter time of event"
              required
            />
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="date"
            className="block text-gray-700 font-semibold mb-1 text-sm"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-sm"
            placeholder="Enter date of event"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="contactInfo"
            className="block text-gray-700 font-semibold mb-1 text-sm"
          >
            Contact Info (Phone number or E-mail)
          </label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-sm"
            placeholder="Enter contact info"
            required
          />
        </div>
        {isExistingCongress && (
          <p className="text-red-500 text-xs">
            Congress with the same name already exists
          </p>
        )}

        <button
          type="submit"
          className=" w-full mt-2 bg-indigo-500 text-white font-mono px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300 text-sm"
        >
          {showUpdateForm ? "Update Congress" : "Create Congress"}
        </button>
      </form>
    </div>
  );
}
