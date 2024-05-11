const express = require("express");

// Importing controller functions
const {
  registerUser,
  loginUser,
} = require("../controllers/admin-controller");

// Middlewares
const router = express.Router();

// Route for user registration
router.post(
  "/register",
  registerUser
);

// Route for user login
router.post("/login", loginUser);


module.exports = router;
