// DropDownMenu.jsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function DropDownMenu({ onEdit, onDelete }) {
  return (
    <div className="absolute right-0 sm:mt-36 md:mt-10  lg:mt-10  w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
      <div className="py-1">
        <a
          href="#"
          onClick={onEdit}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaEdit className="mr-2" /> Edit
        </a>
        <a
          href="#"
          onClick={onDelete}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500"
        >
          <FaTrash className="mr-2 " /> Delete
        </a>
      </div>
    </div>
  );
}
