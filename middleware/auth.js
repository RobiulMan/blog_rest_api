const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  if (req.signedCookies) {
    //accessing cookes
    const token = req.signedCookies["auth"];
    try {
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //getting user
      const user = await User.findById(decoded.id);
      req.user = user;
      next();
    } catch (err) {
      res.status(401).send("unAthorized access");
    }
  } else {
    res.status(401).send("No token provided or unauthorize");
  }
};

module.exports = {
  auth,
};
