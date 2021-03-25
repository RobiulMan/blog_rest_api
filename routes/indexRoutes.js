const express = require("express");
const router = express.Router();

// home
router.get("/", (req, res) => {
  res.send("Welcome Note app everything is okey");
});

//routing error handel
router.get("*", (req, res) => {
  res.send("404 Not Found");
});

module.exports = router;
