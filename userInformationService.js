var express = require("express");
var router = express.Router();
const dotenv = require("dotenv").config();
const AWS = require("aws-sdk")
const mongoose = require("mongoose")
//app.use(express.json());

const ID = process.env.AWS_ACCESS_KEY_ID
const SECRET = process.env.AWS_SECRET_ACCESS_KEY; 
const LOCATION = process.env.AWS_LOCATION;
const BUCKET_NAME = process.env.BUCKET_NAME;

// mongoose.connect(
//     "mongodb+srv://madmin:<password>@clustername.mongodb.net/<dbname>?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true
//     }
//   );

module.exports = router;