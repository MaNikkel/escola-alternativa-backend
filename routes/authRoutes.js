// external imports
const express = require("express");
const { body } = require("express-validator");
// internal imports
const authController = require("../controllers/authController");
const User = require("../models/userModel");

// defines the router
const router = express.Router();

/**
 * * New User Signup
 * Entry => name, email, password, confirmPassword
 */
router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 }),
    body("name")
      .trim()
      .not()
      .isEmpty(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    })
  ],
  authController.putSignup
);

/**
 * * Loges a user in
 * Entry => email and password
 */
router.post("/login", authController.postLogin);

module.exports = router;
