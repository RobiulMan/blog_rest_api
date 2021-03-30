const jwt = require("jsonwebtoken");
const User = require("../models/user");

const admin = async (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).send("your not allowed to access");
  next();
};

module.exports = {
  admin,
};
