// external imports
const { validationResult } = require("express-validator");
const AWS = require("aws-sdk");
const Busboy = require("busboy");

// environment for S3
const BUCKET_NAME = "";
const IAM_USER_KEY = "";
const IAM_USER_SECRET = "";

// aux function that uploads a file to S3
function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function() {
    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data
    };
    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
      }
      console.log("success");
      console.log(data);
    });
  });
}

/**
 * * Posts a file to S3
 */
exports.postToS3 = (req, res, next) => {
  try {
    let busboy = new Busboy({ headers: req.headers });
    busboy.on("finish", () => {
      // the file is in req.files, that follows the shape
      // {
      //    toUploadFile: {
      //      data: ...contents of the file...,
      //      name: 'Example.jpg',
      //      encoding: '7bit',
      //      mimetype: 'image/png',
      //      truncated: false,
      //      size: 959480
      //    }
      // }
      const { toUploadFile } = req.files;
      // Begins the upload to the AWS S3
      uploadToS3(file);
    });
    req.pipe(busboy);
  } catch (err) {
    throw new Error(err);
  }
};
