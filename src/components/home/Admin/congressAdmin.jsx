import React, { useState, useEffect, useRef, lazy } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDownMenu from "./dropDownMenu.jsx";
import ListOfJoinUsers from "./listofJoinUsers.jsx";

export default function CongressAdmin({
  congressLists,
  handleDeleteCongress,
  openDropDownMenu,
  setOpenDropDownMenu,
  handleEditCongress,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuRef = useRef();

  const toggleDropDown = (index) => {
    setOpenDropDownMenu(openDropDownMenu === index ? null : index);
    setIsMenuOpen(!isMenuOpen); // Toggle the state of the menu
  };

  const handleEdit = (congressId) => {
    handleEditCongress(congressId);
    setOpenDropDownMenu(null);
    setIsMenuOpen(false); // Close the menu when editing
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenDropDownMenu(null);
        setIsMenuOpen(false); // Close the menu when clicking outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <div className="border border-gray-100 rounded-md bg-gray-50 font-normal">
        <ul className="px-2 overflow-scroll no-scrollbar h-96 pb-44">
          {congressLists.map((congress, index) => (
            <li
              key={index}
              className="relative flex sm:flex-row justify-between  my-6 bg-gradient-to-r from-blue-50 to-blue-200 shadow-lg rounded-lg transition-all cursor-default"
            >
              <div
                className={`border-l-4 ${
                  congress.type === "active"
                    ? "border-x border-green-400 "
                    : " border-x border-red-500 line-through  "
                } rounded-l-md sm:h-auto pt-2 sm:p-0 flex flex-col justify-between sm:items-center sm:flex-row w-full  `}
              >
                <span className="w-full sm:pl-5   sm:text-base text-3xl sm:w-2/6 text-left sm:text-left  rounded-sm pl-3  font-medium">
                  {congress.name}
                </span>
                <span className="w-full sm:w-2/6  text-left sm:pl-0 pl-5 sm:text-left ">
                  {congress.contactInfo}
                </span>
                <span className="w-full sm:w-1/5  text-left sm:pl-0 pl-5 sm:text-left sm:text-sm ">
                  <b> {congress.date}</b>
                </span>
                <span className="w-full sm:w-1/4  text-left sm:pl-0 pl-5 sm:text-left">
                  {congress.address}
                </span>
                <span className="sm:block flex justify-between w-48 sm:w-1/5  pl-5  sm:pl-0 sm:text-left ">
                  <b>{congress.startTime}&nbsp; </b>to
                  <b>&nbsp;{congress.endTime} </b>
                </span>
              </div>
              <div
                className={`hover:bg-blue-300 rounded-r-md p-3 flex items-center cursor-pointer  ${
                  isMenuOpen && openDropDownMenu === index ? "bg-blue-300" : ""
                }`} // Apply background color when menu is open
                onClick={() => toggleDropDown(index)}
              >
                <BsThreeDotsVertical />
              </div>
              {openDropDownMenu === index && (
                <div ref={menuRef}>
                  <DropDownMenu
                    onEdit={() => {
                      handleEdit(congress.id);
                    }}
                    onDelete={() => {
                      handleDeleteCongress(congress.id);
                    }}
                    handleShowJoinUsers={() => {
                      handleShowModal();
                    }}
                  />
                  {isModalOpen && (
                    <ListOfJoinUsers
                      onClose={handleCloseModal}
                      congressLists={congressLists}
                      congressName={congress.name}
                      congress={congress}
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
