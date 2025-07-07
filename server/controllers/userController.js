const User = require("../models/userModel");

const saveUserData = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, message: "User data saved" });
  } catch (err) {
    console.error("Save user error:", err);
    res.status(500).json({ success: false, message: "Error saving user data" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

// Delete individual user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};
// Delete all users
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ success: true, message: "All users deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting all users" });
  }
};

module.exports = { saveUserData, getAllUsers, deleteUser, deleteAllUsers };
