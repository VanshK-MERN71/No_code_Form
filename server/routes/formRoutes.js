const express = require("express");
const router = express.Router();
const {
  saveForm,
  getForms,
  deleteForm,
  clearAllForms,
} = require("../controllers/formController");

router.post("/", saveForm);
router.get("/", getForms);
router.delete("/:id", deleteForm);
router.delete("/", clearAllForms);

module.exports = router;
