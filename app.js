// external imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

// defines an app
const app = express();

// TODO: S3 for static files

// mongo db url in atlas
const URL =
  "mongodb+srv://mnikkel-dev:mnikkel-dev-2020@db-escola-kw8fa.mongodb.net/escola-dev?retryWrites=true&w=majority";

// allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "server listening!"
  });
});

// error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message,
    data
  });
});

// connect and listen via mongo
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3030);
  })
  .catch(err => console.log(err));
