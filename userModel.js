var express = require("express");
var router = express.Router();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })


module.exports = router;