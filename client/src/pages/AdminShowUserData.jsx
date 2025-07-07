import React from "react";
import Slidebar from "../componets/Slidebar";
import Userdata from "../componets/Userdata";

function AdminShowUserData() {
  return (
    <div className="flex mt-10">
      <Slidebar />
      <div className="flex-1 p-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User Data</h1>
        <div className="grid grid-cols-1">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              Here all user is exist and Admin can delelte and all user delete
            </h2>
          </div>
          <div className="mt-7">
            <Userdata />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminShowUserData;
