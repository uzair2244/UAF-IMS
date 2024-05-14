const { required } = require("joi");
const mongoose = require("mongoose");

module.exports = mongoose.model("Task", mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    assigner: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}))