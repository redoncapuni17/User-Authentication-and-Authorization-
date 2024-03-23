import React, { useState } from "react";

export default function EventForm({ addCongress }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can handle form submission logic here
    // For example, you can send this data to your backend or perform any other action
    const newCongress = {
      name: name,
      address: address,
      time: time,
      contactInfo: contactInfo,
    };

    // Add new Congress to the list
    addCongress(newCongress);

    // Reset form fields
    setName("");
    setAddress("");
    setTime("");
    setContactInfo("");
  };

  return (
    <div className="w-11/12 pt-3 bg-white rounded-lg  ">
      <h2 className="text-xl font-bold mb-4">Event Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
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
        <div className="flex justify-between items-center ">
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-sm text-gray-700 font-semibold mb-2"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-36 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter time of event"
              required
            />
          </div>
          <div className="mb-4">
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
              className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter contact info"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
