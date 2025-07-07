import React from "react";
import FormBuilder from "../componets/FormBuilder";
import Slidebar from "../componets/Slidebar";

function AdminFormcreate() {
  return (
    <div className="flex mt-10">
      <Slidebar />
      <div className="flex-1 p-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Create Form 😊
        </h1>
        <div className="grid grid-cols-1">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              Here your create form using drag and drop and here you
              Create,Delete and Update form
            </h2>
          </div>
          <div className="mt-7">
            <FormBuilder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFormcreate;
