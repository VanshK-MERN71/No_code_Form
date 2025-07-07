import React from "react";
import Slidebar from "../componets/Slidebar";
import SavedFormsAdmin from "../componets/SavedFormsAdmin";

function Admin() {
  return (
    <div className="flex mt-10">
      <Slidebar />
      <div className="flex-1 p-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Deshboard 😊
        </h1>
        <div className="grid grid-cols-1">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-700">All Forms</h2>
            <p className="text-3xl mt-3 font-bold text-green-700">
              Here show all forms and total number of forms add delete all forms
            </p>
          </div>
          <SavedFormsAdmin />
        </div>
      </div>
    </div>
  );
}

export default Admin;
