// external imports
const jwt = require("jsonwebtoken");

// Middleware that passes only if the user is Authenticated
module.exports = (req, res, next) => {
  // get the token and checks it
  const token = req.get("Authorization");
  if (!token) {
    const error = new Error("Authorization (token) field missing");
    error.statusCode = 401;
    throw error;
  }
  // verifies the token
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      "here comes a very very very large string to serve as secret"
    );
  } catch (err) {
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("User not Authenticated");
    error.statusCode = 401;
    throw error;
  }
  // * saves the user ID for the next request that he makes
  req.userId = decodedToken.userId;
  next();
};
