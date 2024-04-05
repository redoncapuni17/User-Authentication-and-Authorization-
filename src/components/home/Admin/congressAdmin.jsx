import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDownMenu from "./dropDownMenu.jsx";

export default function CongressAdmin({
  congressLists,
  handleDeleteCongress,
  openDropDownMenu,
  setOpenDropDownMenu,
  handleEditCongress,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleDropDown = (index) => {
    setOpenDropDownMenu(openDropDownMenu === index ? null : index);
    setIsMenuOpen(openDropDownMenu === index);
  };

  const handleEdit = (congressId) => {
    handleEditCongress(congressId);
    setOpenDropDownMenu(null);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setOpenDropDownMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <main>
      <div className="border border-gray-100 rounded-md bg-gray-50 font-normal">
        <ul className="px-2 overflow-scroll no-scrollbar h-96 ">
          {congressLists.map((congress, index) => (
            <li
              key={index}
              className="relative flex  sm:flex-row justify-between  my-5 bg-gradient-to-r from-blue-50 to-blue-200 shadow-lg rounded-lg transition-all"
            >
              <div className="h-40 sm:h-auto pt-3 sm:p-0 flex flex-col justify-between items-center sm:flex-row w-full ">
                <span className="w-full sm:pl-5  sm:text-base text-3xl sm:w-2/6 text-center sm:text-left  font-medium">
                  {congress.name}
                </span>
                <span className="w-full sm:w-2/6 text-center sm:text-left ">
                  {congress.contactInfo}
                </span>
                <span className="w-full sm:w-1/6 text-center sm:text-left">
                  {congress.address}
                </span>
                <span className=" w-full sm:w-1/4  text-center sm:text-left ">
                  From <b>&nbsp;{congress.startTime}&nbsp; </b> to
                  <b>&nbsp;{congress.endTime} </b>
                </span>
              </div>
              <div
                className={`h-10 rounded-full    p-3 cursor-pointer   ${
                  isMenuOpen ? "bg-blue-400" : ""
                }`}
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
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
