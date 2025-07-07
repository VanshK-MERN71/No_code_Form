import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const SavedFormsAdmin = () => {
  const [savedForms, setSavedForms] = useState([]);

  const fetchForms = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/forms");
      const data = await res.json();
      setSavedForms(data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ This form is only for testing purposes.");
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/forms/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSavedForms((prev) => prev.filter((form) => form._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleClearAll = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all forms?"
    );
    if (confirmClear) {
      try {
        const res = await fetch("http://localhost:5000/api/forms", {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          setSavedForms([]);
        }
      } catch (error) {
        console.error("Clear all error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center sm:text-left">
          All Saved Forms ({savedForms.length})
        </h2>

        {savedForms.length > 0 && (
          <button
            onClick={handleClearAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold"
          >
            Clear All Forms
          </button>
        )}
      </div>

      {savedForms.length === 0 ? (
        <p className="text-center text-gray-500">No forms saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedForms.map((form, formIndex) => (
            <form
              key={form._id}
              onSubmit={handleSubmit}
              className="relative p-4 border rounded shadow bg-white"
              style={{
                backgroundColor: form.bgColor,
                color: form.textColor,
                fontFamily: form.font,
                textAlign: form.align,
              }}
            >
              <h3 className="text-lg font-semibold mb-4 text-center">
                {form.formTitle || "Form"} #{formIndex + 1}
              </h3>

              {form.fields.map((field, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {field.label}
                  </label>

                  {field.type === "text" && (
                    <input
                      type="text"
                      name={field.name}
                      className="w-full border p-1 rounded"
                      placeholder={field.placeholder || "Type here..."}
                      required
                    />
                  )}

                  {field.type === "dropdown" && (
                    <select
                      name={field.name}
                      className="w-full border p-1 rounded"
                      required
                    >
                      <option value="">Select</option>
                      {field.options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === "checkbox" &&
                    field.options.map((opt, i) => (
                      <label key={i} className="block text-sm">
                        <input
                          type="checkbox"
                          value={opt}
                          name={field.name}
                          className="mr-2"
                        />
                        {opt}
                      </label>
                    ))}

                  {field.type === "radio" &&
                    field.options.map((opt, i) => (
                      <label key={i} className="block text-sm">
                        <input
                          type="radio"
                          value={opt}
                          name={`radio-${formIndex}-${index}`}
                          className="mr-2"
                          required
                        />
                        {opt}
                      </label>
                    ))}

                  {field.type === "submit" && (
                    <button
                      type="submit"
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                      {field.label || "Submit"}
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleDelete(form._id)}
                className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
              >
                <FaTrash className="text-sm" />
                Delete
              </button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedFormsAdmin;
