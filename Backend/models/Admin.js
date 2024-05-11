const mongoose = require("mongoose");
const joi = require("joi");

const userModel = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Admin", userModel);
