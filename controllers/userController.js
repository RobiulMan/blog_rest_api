const { validationResult } = require("express-validator");
const bcryptpass = require("bcryptjs");
//database schema
const User = require("../models/user");

const addUsersController = async (req, res) => {
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

const getUsersController = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.send(users);
  } catch (err) {
    res.send(err);
  }
};

const getUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const userId = await User.findById(id);
    if (!userId) return res.status(404).send("user not exist");
    res.send(userId);
  } catch (err) {
    res.status(500).send(err);
  }
};

const loginController = async (req, res) => {
  const { mail, password } = req.body;

  try {
    //check user mail
    const user = await User.findOne({ mail });
    if (!user) return res.status(400).send("unable to login");

    //check user password
    const isMatched = await bcryptpass.compare(password, user.password);

    if (!isMatched) return res.status(400).send("unable to login");
    //successfully logged in user
    //generate auth token
    const token = user.generateAuthToken();
    //send as header
    // res.header("x-auth-token", token);
    // console.log(token);
    res.cookie("auth", token, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      maxAge: 4 * 60 * 60 * 1000,
    });
    res.send("user login successfull");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addUsersController,
  getUsersController,
  getUserController,
  loginController,
};
