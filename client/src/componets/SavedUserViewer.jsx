import React, { useEffect, useState } from "react";

const SavedUserViewer = () => {
  const [savedForms, setSavedForms] = useState([]);

  const fetchForms = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/forms");
      const data = await res.json();
      setSavedForms(data);
    } catch (error) {
      console.error("Failed to fetch forms:", error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleSubmit = async (e, form) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = {};

    form.fields.forEach((field) => {
      if (field.type === "submit") return;

      if (field.type === "checkbox") {
        const checkboxes = formData.getAll(field.name);
        userData[field.label] = checkboxes;
      } else if (field.type === "radio") {
        userData[field.label] = formData.get(`radio-${form._id}-${field.name}`);
      } else {
        userData[field.label] = formData.get(field.name);
      }
    });

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Your form has been submitted!");
        e.target.reset();
      } else {
        alert("❌ Failed to save user data");
      }
    } catch (error) {
      console.error("User submit error:", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Saved Form User</h2>

      {savedForms.length === 0 ? (
        <p className="text-center text-gray-500">No forms saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedForms.map((form, formIndex) => (
            <form
              key={form._id}
              onSubmit={(e) => handleSubmit(e, form)}
              className="p-4 rounded border shadow bg-white"
              style={{
                backgroundColor: form.bgColor,
                color: form.textColor,
                fontFamily: form.font,
                textAlign: form.align,
              }}
            >
              <h3 className="text-xl font-semibold mb-4">
                {form.formTitle} #{formIndex + 1}
              </h3>

              {form.fields.map((field, index) => (
                <div key={index} className="p-4 mb-4 border rounded bg-gray-50">
                  <label className="block font-medium mb-1">
                    {field.label}
                  </label>

                  {field.type === "text" && (
                    <input
                      type="text"
                      name={field.name}
                      className="w-full border p-2 rounded"
                      placeholder={field.placeholder || "Type something..."}
                      required
                    />
                  )}

                  {field.type === "dropdown" && (
                    <select
                      name={field.name}
                      className="w-full border p-2 rounded"
                      required
                    >
                      <option value="">Select an option</option>
                      {field.options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === "checkbox" &&
                    field.options.map((opt, i) => (
                      <label key={i} className="block">
                        <input
                          type="checkbox"
                          name={field.name}
                          value={opt}
                          className="mr-2"
                        />
                        {opt}
                      </label>
                    ))}

                  {field.type === "radio" &&
                    field.options.map((opt, i) => (
                      <label key={i} className="block">
                        <input
                          type="radio"
                          name={`radio-${form._id}-${field.name}`}
                          value={opt}
                          className="mr-2"
                          required
                        />
                        {opt}
                      </label>
                    ))}

                  {field.type === "submit" && (
                    <button
                      type="submit"
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      {field.label || "Submit"}
                    </button>
                  )}
                </div>
              ))}
            </form>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedUserViewer;
