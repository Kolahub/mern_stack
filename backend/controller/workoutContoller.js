const Workout = require("../models/workoutModel");
const mongoose = require("mongoose")

// get all workouts

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).res.json({ err: err.message });
  }
};

// get a workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // checks if the id is valid
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid workout id' });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ message: "Workout not found" });
  }

  res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  console.log("lhvhvh");
  

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid workout id' })
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(400).json({ message: "Workout not found" });
      }

  res.status(200).json(workout);

}

///update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid workout id' })
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({ message: "Workout not found" });
      }

  res.status(200).json(workout);
}

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
};
