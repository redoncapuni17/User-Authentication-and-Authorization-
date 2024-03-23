import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
export default function Congress({ congressLists }) {
  return (
    <main>
      <header className="flex w-full justify-between font-bold px-2">
        <span>Name</span>
        <span>Contact Info</span>
        <span>Address</span>
        <span>Time</span>
      </header>
      <div className="border-t-2 border-gray-400 max-h-96">
        <ul>
          {congressLists.map((congress, index) => (
            <li
              key={index}
              className="flex  justify-between items-center mt-3  bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg pl-2  rounded-lg  overflow-hidden  hover:scale-105 transition-all"
            >
              <span className="w-48">{congress.name}</span>
              <span className="w-60 ">{congress.contactInfo}</span>
              <span className="w-44 ">{congress.address}</span>
              <span className="flex justify-end w-16 ">{congress.time}</span>
              <div className="flex gap-2 bg-white p-3 ">
                <FaRegEdit />
                <MdDeleteOutline />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
