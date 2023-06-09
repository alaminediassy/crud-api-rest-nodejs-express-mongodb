const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

// Get All students
router.get("/all-students", studentController.getAllStudents);

// Get student by id
router.get("/:id", studentController.getStudentById);

// Create a new Student
router.post("/", studentController.createStudent);

// Update student
router.put("/update-student/:id", studentController.updateStudent);

// Delete student
router.delete("/delete-student/:id", studentController.deteteStudent);

module.exports = router;