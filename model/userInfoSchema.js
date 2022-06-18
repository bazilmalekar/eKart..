const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
}, {
    timestamps: true
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;