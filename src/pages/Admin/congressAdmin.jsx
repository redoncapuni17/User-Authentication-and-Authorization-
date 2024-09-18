import React, { useState, useEffect, useRef } from "react";
import AdminListCongress from "./AdminUI/adminListCongress";

export default function CongressAdmin({
  congressLists,
  handleDeleteCongress,
  openDropDownMenu,
  setOpenDropDownMenu,
  handleEditCongress,
  loading,
  hasMore,
  fetchData,
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
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
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
      <AdminListCongress
        congressLists={congressLists}
        isMenuOpen={isMenuOpen}
        openDropDownMenu={openDropDownMenu}
        toggleDropDown={toggleDropDown}
        handleEdit={handleEdit}
        handleDeleteCongress={handleDeleteCongress}
        handleShowModal={handleShowModal}
        menuRef={menuRef}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        loading={loading}
        hasMore={hasMore}
        fetchData={fetchData}
      />
    </main>
  );
}
