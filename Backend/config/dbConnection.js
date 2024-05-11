const mongoose = require("mongoose");

const dbConnection = async ()=>{
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.log(error)
  }
};

module.exports = dbConnection