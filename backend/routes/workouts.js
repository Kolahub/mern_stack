const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controller/workoutContoller");

const router = express.Router();

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// Public routes (no authentication required)
router.get("/", getAllWorkouts);         // Get all workouts
router.get("/:id", getWorkout);          // Get single workout

// Protected routes (authentication required)
router.post("/", requireAuth, createWorkout);        // Create workout
router.delete("/:id", requireAuth, deleteWorkout);   // Delete workout
router.patch("/:id", requireAuth, updateWorkout);    // Update workout

module.exports = router;