import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or title */}
        <div className="text-xl font-bold">No code Form Builder</div>

        {/* Links */}
        <div className="space-x-4">
          <NavLink
            to="user"
            className={({ isActive }) =>
              `px-3 py-1 rounded hover:bg-blue-700 transition ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            User View
          </NavLink>
          <NavLink
            to="admin"
            className={({ isActive }) =>
              `px-3 py-1 rounded hover:bg-blue-700 transition ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            Admin Panel
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
