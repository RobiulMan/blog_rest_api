const mongoose = require("mongoose");
const validator = require("validator");
const bcryptpass = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, "secretKey", { expiresIn: "4h" });
  return token;
};
userSchema.pre("save", async function (next) {
  const hashedpassword = await bcryptpass.hash(this.password, 10);
  if (this.isModified("password")) {
    this.password = hashedpassword;
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
