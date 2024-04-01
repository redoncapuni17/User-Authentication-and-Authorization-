import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDownMenu from "./dropDownMenu.jsx";

export default function CongressAdmin({
  congressLists,
  handleDeleteCongress,
  openDropDownMenu,
  setOpenDropDownMenu,
  handleEditCongress,
}) {
  // Update toggleDropDown function to handle opening the edit form
  const toggleDropDown = (index) => {
    setOpenDropDownMenu(openDropDownMenu === index ? null : index);
  };

  // Handle edit congress
  const handleEdit = (congressId) => {
    handleEditCongress(congressId);
    setOpenDropDownMenu(null); // Close the dropdown menu after selecting "Edit"
  };

  return (
    <main>
      <header className="flex font-bold pl-3">
        <span className="text-center w-48">Name</span>
        <span className="text-center w-48">Contact Info</span>
        <span className="text-center w-48">Address</span>
        <span className="text-center w-48">Time</span>
      </header>
      <div className="h-96 overflow-scroll no-scrollbar border-t-2 border-gray-500">
        <ul className="px-5">
          {congressLists.map((congress, index) => (
            <li
              key={index}
              className="relative flex justify-between items-center pl-3 mt-3 bg-gradient-to-r from-blue-50 to-blue-200 shadow-lg rounded-lg transition-all"
            >
              <span className="flex justify-center w-48">{congress.name}</span>
              <span className="flex justify-center w-48">
                {congress.contactInfo}
              </span>
              <span className="flex justify-center w-48">
                {congress.address}
              </span>
              <span className="flex justify-center w-40">
                From <b>&nbsp;{congress.startTime}&nbsp; </b> to
                <b>&nbsp;{congress.endTime} </b>
              </span>
              <div
                className={`hover:bg-blue-400 p-3 cursor-pointer rounded-r-lg ${
                  openDropDownMenu === index ? "bg-blue-400" : ""
                }`}
                onClick={() => toggleDropDown(index)}
              >
                <BsThreeDotsVertical />
              </div>
              {openDropDownMenu === index ? (
                <DropDownMenu
                  onEdit={() => {
                    handleEdit(congress.id);
                  }}
                  onDelete={() => handleDeleteCongress(congress.id)} // Check if congress.id is defined before calling handleDeleteCongress
                />
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
