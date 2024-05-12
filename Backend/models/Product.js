const mongoose = require("mongoose");

const Product = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  units: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  market: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", Product);
