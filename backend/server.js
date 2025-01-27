require("dotenv").config();
const express = require("express");
const { auth } = require("express-openid-connect");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");

// express app
const app = express();

// Auth0 Configuration
// server.js
const config = {
  authRequired: true, // Require auth for all routes
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL, // e.g., https://yourdomain.com
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  authorizationParams: {
    response_mode: "form_post", // Recommended for production
    audience: process.env.AUTH0_AUDIENCE, // Add API audience if needed
  },
};

// Auth middleware
app.use(auth(config));

// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Regular middleware
app.use(express.json());

// Routes
app.use("/api/workout", workoutRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to DB
mongoose
  .connect(process.env.MONG_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error(err);
  });