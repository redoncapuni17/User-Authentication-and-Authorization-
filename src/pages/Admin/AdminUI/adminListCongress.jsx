import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";
import DropDownMenu from "./dropDownMenu";
import ListOfJoinUsers from "../listofJoinUsers";

function AdminListCongress({
  congressLists,
  isMenuOpen,
  openDropDownMenu,
  toggleDropDown,
  handleEdit,
  menuRef,
  isModalOpen,
  handleShowModal,
  handleCloseModal,
  handleDeleteCongress,
  loading,
  hasMore,
  fetchData,
}) {
  return (
    <ul className="relative px-2 overflow-y-scroll  h-96 rounded-md bg-gray-50 font-normal border border-gray-400 pb-44">
      {loading && !congressLists.length ? (
        <div className="absolute top-36 left-1/2">
          <VscLoading className="animate-spin text-3xl" />
        </div>
      ) : (
        <>
          {congressLists.map((congress, index) => (
            <li
              key={index}
              className="relative flex sm:flex-row justify-between my-6 bg-gradient-to-r from-blue-50 to-blue-200 shadow-lg rounded-lg transition-all cursor-default animate-fade-right"
            >
              <div
                className={`border-l-4 ${
                  congress.type === "active"
                    ? "border-x border-green-400"
                    : "border-x border-red-500 line-through"
                } rounded-l-md sm:h-auto pt-2 sm:p-0 flex flex-col justify-between sm:items-center sm:flex-row w-full`}
              >
                <span className="w-full sm:pl-5 sm:text-base text-3xl sm:w-2/6 text-left sm:text-left rounded-sm pl-3 font-medium">
                  {congress.name}
                </span>
                <span className="w-full sm:w-2/6 text-left sm:pl-0 pl-5 sm:text-left">
                  {congress.contactInfo}
                </span>
                <span className="w-full sm:w-1/5 text-left sm:pl-0 pl-5 sm:text-left sm:text-sm">
                  <b> {congress.date}</b>
                </span>
                <span className="w-full sm:w-1/4 text-left sm:pl-0 pl-5 sm:text-left">
                  {congress.address}
                </span>
                <span className="sm:block flex justify-between w-48 sm:w-1/5 pl-5 sm:pl-0 sm:text-left">
                  <b>{congress.startTime}&nbsp;</b>to
                  <b>&nbsp;{congress.endTime}</b>
                </span>
              </div>
              <div
                className={`hover:bg-blue-300 rounded-r-md p-3 flex items-center cursor-pointer ${
                  isMenuOpen && openDropDownMenu === index ? "bg-blue-300" : ""
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

          {hasMore && (
            <div className="flex mt-4 z-50 ">
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 duration-300"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    More
                    <VscLoading className="animate-spin text-xl" />
                  </span>
                ) : (
                  "More"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </ul>
  );
}

export default AdminListCongress;
