var express = require("express");
var router = express.Router();
const dotenv = require('dotenv').config();
const AWS = require('aws-sdk')


const ID = process.env.AWS_ACCESS_KEY_ID
const SECRET = process.env.AWS_SECRET_ACCESS_KEY; 
const LOCATION = process.env.AWS_LOCATION;
const BUCKET_NAME = process.env.BUCKET_NAME;







module.exports = router;