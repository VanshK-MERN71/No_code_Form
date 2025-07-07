import React from "react";
import { Link } from "react-router-dom";

function Slidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-8">Admin panel 🤵</h2>

      <nav className="space-y-4">
        <Link to={"/admin"} className="block hover:text-green-700">
          Deshboard
        </Link>
        <Link to={"/admin/createform"} className="block hover:text-green-700">
          Creat Form
        </Link>
        <Link to={"/admin/userdata"} className="block hover:text-green-700">
          User Data
        </Link>
      </nav>
    </div>
  );
}

export default Slidebar;
