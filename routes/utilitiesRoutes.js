// external imports
const express = require("express");
const { body } = require("express-validator");
const AWS = require("aws-sdk");
const Busboy = require("busboy");
// internal routes
const utilietesController = require("../controllers/utilitiesController");

// defines the router
const router = express.Router();

/**
 * * Saves a file into AWS S3
 * Entry => file with key of "toUploadFile"
 */

// TODO: validation for formats of files
router.post("/upload-to-S3");
