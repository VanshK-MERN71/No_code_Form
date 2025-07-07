import React, { useEffect, useState } from "react";

const Userdata = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch users error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  const handleClearAll = async () => {
    const confirmClear = window.confirm("Are you sure to delete all users?");
    if (!confirmClear) return;

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setUsers([]);
      }
    } catch (error) {
      console.error("Delete all users error:", error);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Submitted Users ({users.length})
          </h2>

          {users.length > 0 && (
            <button
              onClick={handleClearAll}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition duration-200"
            >
              🗑️ Delete All Users
            </button>
          )}
        </div>

        {users.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No user data available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <div
                key={user._id}
                className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200 border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-4 text-indigo-600">
                  👤 User #{index + 1}
                </h3>

                <div className="space-y-1 text-sm text-gray-700">
                  {Object.entries(user).map(
                    ([key, value]) =>
                      !["_id", "__v", "createdAt", "updatedAt"].includes(
                        key
                      ) && (
                        <p key={key}>
                          <span className="font-medium capitalize">{key}:</span>{" "}
                          {Array.isArray(value) ? value.join(", ") : value}
                        </p>
                      )
                  )}
                </div>

                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700 font-medium transition"
                >
                  ❌ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Userdata;
