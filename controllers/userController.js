const { validationResult } = require("express-validator");
const bcryptpass = require("bcryptjs");

//database schema
const User = require("../models/user");

//add uesr contorller
const addUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
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

//getting all users
const getUsersController = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.send(users);
  } catch (err) {
    res.send(err);
  }
};

//getting single user
const getUserController = async (req, res) => {
  const id = req.user._id;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const userId = await User.findById(id);

    if (!userId) return res.status(404).send("user not exist");
    res.send(userId);
  } catch (err) {
    res.status(500).send(err);
  }
};

//login controller
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

//logout user
const logoutController = (req, res) => {
  res.clearCookie("auth");
  res.send("successfully loged out");
};

module.exports = {
  addUserController,
  getUsersController,
  getUserController,
  loginController,
  logoutController,
};
