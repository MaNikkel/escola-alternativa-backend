// external imports
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// internal imports
const User = require("../models/userModel");

/**
 * * New User Creation
 * Origin => authRoutes
 */
exports.putSignup = async (req, res, next) => {
  try {
    // verifies all errors and throw any error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    // get the data from body
    const { email, name, password } = req.body;
    // encrypts the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await new User({
      email,
      name,
      password: hashedPassword
    });
    const result = await user.save();
    res.status(201).json({
      message: "signup succeeded",
      user: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * * Logs a User in
 * Origin => authRoutes
 */
exports.postLogin = async (req, res, next) => {
  try {
    // get data from body
    const { email, password } = req.body;
    // find and check the user
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    // check the password
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }
    // here the user was found and the password checks, so it will generate an token
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      "here comes a very very very large string to serve as secret",
      { expiresIn: "6h" }
    );
    // returns the message
    res.status(200).json({
      message: "logged in!",
      token,
      user: user
    });
  } catch (error) {
    next(error);
  }
};
