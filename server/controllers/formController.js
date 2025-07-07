const Form = require("../models/formModel");

exports.saveForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json({ message: "Form saved", form });
  } catch (error) {
    res.status(500).json({ message: "Error saving form", error });
  }
};

exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    await Form.findByIdAndDelete(id);
    res.status(200).json({ message: "Form deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form", error });
  }
};

exports.clearAllForms = async (req, res) => {
  try {
    await Form.deleteMany();
    res.status(200).json({ message: "All forms cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing forms", error });
  }
};
