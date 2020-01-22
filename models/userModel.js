// external imports
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Schema for user
const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
});

// exports the model following the schema
module.exports = mongoose.model("User", userSchema);
