import { useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import '../assets/style.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          className="text-gray-700 text-xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">Artoreal</span>
          
        </div>
      </div>

      <ul className="hidden md:flex gap-8 font-medium text-gray-700">
            <li className="menu-item">Photographs</li>
            <li className="menu-item">Digital Arts</li>
            <li className="menu-item">Paintings</li>
            <li className="menu-item">Art Prints</li>
      </ul>


      <div className="flex items-center gap-4 border-black text-lg">
        <FaSearch className="cursor-pointer" />
        <FaHeart className="cursor-pointer" />
        <FaShoppingCart className="cursor-pointer" />
        <FaUser className="cursor-pointer" />
      </div>

      {menuOpen && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col md:hidden">
          <li className="p-4 border-b cursor-pointer">Photographs</li>
          <li className="p-4 border-b cursor-pointer">Digital Arts</li>
          <li className="p-4 border-b cursor-pointer">Paintings</li>
          <li className="p-4 cursor-pointer">Art Prints</li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
