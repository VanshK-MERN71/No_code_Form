import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const fieldTypes = [
  { id: "text", label: "Text Field" },
  { id: "dropdown", label: "Dropdown" },
  { id: "checkbox", label: "Checkbox" },
  { id: "radio", label: "Radio Button" },
  { id: "submit", label: "Submit Button" },
];

const generateField = (type) => ({
  id: `field-${Date.now()}-${Math.random()}`,
  type,
  label: `${type} label`,
  options: ["Option 1", "Option 2"],
  name: `${type}-name`,
  placeholder: type === "text" ? "Text input" : "",
});

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState("Form");
  const [fields, setFields] = useState([]);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [font, setFont] = useState("sans-serif");

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === "delete" && source.droppableId === "form") {
      const newFields = [...fields];
      newFields.splice(source.index, 1);
      setFields(newFields);
      return;
    }

    if (
      source.droppableId === "sidebar" &&
      destination.droppableId === "form"
    ) {
      const newField = generateField(draggableId);
      setFields([...fields, newField]);
    } else if (
      source.droppableId === "form" &&
      destination.droppableId === "form"
    ) {
      const reordered = [...fields];
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);
      setFields(reordered);
    }
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const updateOption = (fieldIndex, optionIndex, newVal) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = newVal;
    setFields(updatedFields);
  };

  const addOption = (fieldIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options.push("New Option");
    setFields(updatedFields);
  };

  const clearAll = () => {
    setFields([]);
    setFormTitle("Form");
    setBgColor("#ffffff");
    setTextColor("#000000");
    setFont("sans-serif");
  };

  const saveForm = async () => {
    const formData = {
      formTitle,
      fields,
      bgColor,
      textColor,
      font,
      align: "center",
    };

    try {
      const res = await fetch("http://localhost:5000/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) alert("Form saved to MongoDB!");
      else alert(result.message || "Error saving form");
    } catch (error) {
      console.error("Save error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex min-h-screen">
        <Droppable droppableId="sidebar" isDropDisabled={true}>
          {(provided) => (
            <div
              className="w-[35%] bg-gray-100 p-4 space-y-4 overflow-y-auto"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2 className="text-xl font-bold">Add Fields</h2>
              {fieldTypes.map((field, index) => (
                <Draggable draggableId={field.id} index={index} key={field.id}>
                  {(provided) => (
                    <div
                      className="p-2 bg-white shadow rounded cursor-pointer"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {field.label}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div className="mt-10 pt-4 border-t">
                <h3 className="font-semibold mb-2">Style Settings</h3>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="w-full border p-1 mt-2"
                >
                  <option value="sans-serif">Sans</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                </select>
              </div>
              <Droppable droppableId="delete">
                {(provided) => (
                  <div
                    className="mt-6 p-4 bg-red-200 border-2 border-red-400 text-center rounded"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <FaTrashAlt className="text-red-600 text-4xl mx-auto mb-1" />
                    <p className="text-sm font-medium">Drag here to delete</p>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <button
                onClick={clearAll}
                className="mt-4 w-full py-2 bg-red-500 text-white rounded font-semibold"
              >
                Clear All
              </button>
              <Link to="/admin">
                <button
                  onClick={saveForm}
                  className="mt-2 w-full py-2 bg-green-600 text-white rounded font-semibold"
                >
                  Save Form
                </button>
              </Link>
            </div>
          )}
        </Droppable>

        {/* Form Preview */}
        <Droppable droppableId="form">
          {(provided) => (
            <div>
              <div
                className="flex-1 p-6 bg-white overflow-y-auto"
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  fontFamily: font,
                  textAlign: "center",
                }}
              >
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="text-2xl font-semibold mb-4 border-b text-center w-full pb-2"
                />

                {fields.map((field, index) => (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="p-4 mb-4 border rounded bg-gray-50"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) =>
                            updateField(index, "label", e.target.value)
                          }
                          className="w-1/2 mb-2 border p-1 rounded"
                        />
                        {field.type === "text" && (
                          <input
                            className="w-1/2 border p-2 rounded"
                            placeholder={field.placeholder}
                            value={field.placeholder}
                            onChange={(e) =>
                              updateField(index, "placeholder", e.target.value)
                            }
                          />
                        )}
                        {field.type === "dropdown" && (
                          <div>
                            {field.options.map((opt, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 mb-1"
                              >
                                <input
                                  type="text"
                                  className="border p-1 rounded w-1/2"
                                  value={opt}
                                  onChange={(e) =>
                                    updateOption(index, i, e.target.value)
                                  }
                                />
                              </div>
                            ))}
                            <button
                              className="text-blue-500 mt-2 text-sm"
                              type="button"
                              onClick={() => addOption(index)}
                            >
                              + Add Option
                            </button>
                          </div>
                        )}
                        {field.type === "checkbox" && (
                          <div>
                            {field.options.map((opt, i) => (
                              <label key={i} className="block">
                                <input type="checkbox" className="mr-2" />
                                <input
                                  className="border px-1 rounded w-1/2"
                                  value={opt}
                                  onChange={(e) =>
                                    updateOption(index, i, e.target.value)
                                  }
                                />
                              </label>
                            ))}
                            <button
                              className="text-blue-500 mt-2 text-sm"
                              type="button"
                              onClick={() => addOption(index)}
                            >
                              + Add Option
                            </button>
                          </div>
                        )}
                        {field.type === "radio" && (
                          <div>
                            {field.options.map((opt, i) => (
                              <label key={i} className="block">
                                <input
                                  type="radio"
                                  name={field.id}
                                  className="mr-2"
                                />
                                <input
                                  className="border px-1 rounded w-1/2"
                                  value={opt}
                                  onChange={(e) =>
                                    updateOption(index, i, e.target.value)
                                  }
                                />
                              </label>
                            ))}
                            <button
                              className="text-blue-500 mt-2 text-sm"
                              type="button"
                              onClick={() => addOption(index)}
                            >
                              + Add Option
                            </button>
                          </div>
                        )}
                        {field.type === "submit" && (
                          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                            {field.label || "Submit"}
                          </button>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default FormBuilder;
