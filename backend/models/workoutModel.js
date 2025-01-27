const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
    min: [0, 'Reps cannot be negative'], // Minimum value validation
  },
  load: {
    type: Number,
    required: true,
    min: [0, 'Load cannot be negative'], // Minimum value validation
  },
  user: {
    type: String,
    required: true // Associates workouts with Auth0 user ID
  }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);