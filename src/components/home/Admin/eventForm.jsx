import React, { useEffect, useState } from "react";
import {
  addCongressToFirestore,
  searchCongressExisting,
  updatedCongressToFirestore,
} from "../../firebase/firestore";
import CreateCongress from "../../createCongress";

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
      const existingCongress = await searchCongressExisting(name);
      if (existingCongress) {
        setIsExistingCongress(true);
        setTimeout(() => {
          setIsExistingCongress(false);
        }, 1500);
      } else {
        const addCongressSuccessfully = await addCongressToFirestore(
          newCongress
        );
        if (addCongressSuccessfully) {
          addCongress(newCongress);
          setName("");
          setAddress("");
          setStartTime("");
          setEndTime("");
          setDate("");
          setContactInfo("");
        }
        setIsExistingCongress(false);
      }
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
      const updateCongressSuccessfully = await updatedCongressToFirestore(
        updatedCongress,
        editCongress.id
      );
      if (updateCongressSuccessfully) {
        updateCongressList(updatedCongress);
        setName("");
        setAddress("");
        setStartTime("");
        setEndTime("");
        setDate("");
        setContactInfo("");
        setShowUpdateForm(false);
      }
    } catch (error) {
      console.error("Error processing document: ", error);
    }
  };

  return (
    <>
      <CreateCongress
        showUpdateForm={showUpdateForm}
        handleUpdateCongress={handleUpdateCongress}
        handleSubmit={handleSubmit}
        isExistingCongress={isExistingCongress}
        name={name}
        setName={setName}
        address={address}
        setAddress={setAddress}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        date={date}
        setDate={setDate}
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
      />
    </>
  );
}
