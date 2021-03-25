const { validationResult } = require("express-validator");

//database schema
const User = require("../models/user");

const addUserController = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  const user = new User(req.body);
  try {
    const foundUser = await User.findOne({ mail: req.body.mail });
    if (foundUser) return res.status(400).send("user already regstered");
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserController = async (req, res) => {
  //   try {
  //     const users = await User.find();
  //     res.send(users);
  //   } catch (err) {
  //     res.send(err);
  //   }
};

module.exports = {
  addUserController,
  getUserController,
};
