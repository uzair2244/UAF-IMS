const mongoose = require("mongoose");

module.exports = mongoose.model("Task",mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    worker : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        default: "pending"
    }
}))