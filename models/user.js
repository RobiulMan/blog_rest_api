const mongoose = require("mongoose");
const validator = require("validator");

//user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "must be a valid mail",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    validate: {
      validator(value) {
        return !/password/.test(value);
      },
      message: "password Must not congine your password",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
