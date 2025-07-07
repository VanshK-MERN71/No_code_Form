const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
  type: String,
  label: String,
  name: String,
  placeholder: String,
  options: [String],
});

const FormSchema = new mongoose.Schema({
  formTitle: String,
  bgColor: String,
  textColor: String,
  font: String,
  align: String,
  fields: [FieldSchema],
});

module.exports = mongoose.model("Form", FormSchema);
