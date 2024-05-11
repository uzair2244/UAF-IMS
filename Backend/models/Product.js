const mongoose = require("mongoose");

const Product = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  code : {
    type : String,
    required : true
  },
  units : {
    type : Number,
    required : true
  },
  price : {
    type : Number,
    required : true
  },
  market : {
    type : String,
    required : true
  },
  location : {
    type : String,
    required : true
  }
});

module.exports = mongoose.model("Product", Product);
