const mongoose = require("mongoose");

module.exports = mongoose.model("User", mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "management"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}))