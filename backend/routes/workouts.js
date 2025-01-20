const express = require("express");
// const Workout = require("../models/workoutModel")
const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controller/workoutContoller");

const router = express.Router();

// Get all workouts
router.get("/", getAllWorkouts);

// Get a single workout
router.get("/:id", getWorkout);

// get a new workout
router.post("/", createWorkout);

// delete a workout
router.delete("/:id", deleteWorkout);

// update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
