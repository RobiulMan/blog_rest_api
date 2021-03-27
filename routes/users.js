const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

//users controller
const {
  addUsersController,
  getUsersController,
  getUserController,
  loginController,
} = require("../controllers/userController");

//user routes
router.get("/", getUsersController);

router.post(
  "/",
  [
    body("firstName", "FistName is required").isEmpty(),
    body("lastName", "LastName is required").isEmpty(),
    body("mail", "mail is required").isEmpty(),
    body("mail", "mail Must be vaild").isEmpty(),
    body("password", "password is required").isEmpty(),
    body("password", "password must be 6 character long").isLength({ min: 6 }),
    body("confirmPassword", "confirmPassword is required").isEmpty(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password don't match");
      } else {
        return true;
      }
    }),
    body("password").custom((value, { req }) => {
      if (value.includes("password")) {
        throw new Error("Confirm you don't use password on your password");
      } else {
        return true;
      }
    }),
  ],
  addUsersController
);

router.get("/:id", body("id", "user not found").isMongoId(), getUserController);

router.post("/login", loginController);
module.exports = router;
