const express = require("express");
const router = express.Router();
const {
  saveUserData,
  getAllUsers,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/userController");

router.post("/", saveUserData);
router.get("/", getAllUsers); // ✅ fetch all users
router.delete("/:id", deleteUser); // ✅ delete one user
router.delete("/", deleteAllUsers); // ✅ delete all users

module.exports = router;
