const { required } = require("joi");
const mongoose = require("mongoose");

module.exports = mongoose.model("User", mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    authorities : [String]
}))