const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a username"],
    unique: true,
    trim: true,
    minlength: [3, "username should be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "A user must have an password"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        // Only validate if it's a new user and passwordConfirm matches password
        return this.isNewUser ? el === this.password : true;
      },
      message: "Passwords are not the same!",
    },
    // validate: {
    //   validator: function (el) {
    //     return el === this.password;
    //   },
    //   message: "Passwords are not the same!",
    // },
  },
  token: {
    type: String,
  },
  verificationCode: {
    type: String,
  },
});

// Method to send verification code via email
const User = mongoose.model("User", userSchema);

module.exports = User;
