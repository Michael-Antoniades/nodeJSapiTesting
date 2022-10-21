var express = require("express");
var router = express.Router();
const app = express();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require('dotenv').config();
const cors = require('cors');


const URI = process.env.DB_URI;
const AUTHSECRET = process.env.AUTHSECRET
const CLIENTID = process.env.CLIENTID
const IBURL = process.env.IBURL
const AUDIENCE = process.env.AUDIENCE
const CLIENTSECRET = process.env.CLIENTSECRET
const BASEURL = process.env.BASEURL

const { auth , requiresAuth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: AUTHSECRET,
    baseURL: BASEURL,
    clientID: CLIENTID,
    issuerBaseURL: IBURL,
    clientSecret: CLIENTSECRET,
  }
  
  app.use(cors({origin: 'http://localhost:3000'}));
  app.use(express.json());
  app.use(express.urlencoded({limit: "30mb",extended:true}));
  app.use(auth(config));

//hardcoded user data for now:
userAuthData = {"nickname":"johngotti","name":"johngotti@mail.com","picture":"https://s.gravatar.com/avatar/7991c82e07d77e59ccb9818658579156?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjo.png","updated_at":"2022-09-19T13:13:26.780Z","email":"johngotti@mail.com","sub":"auth0|628d2b685dc10f00129e8845","sid":"p80LFRMcgfPE3CBYc-9vve4YOz9szFai"};
//console.log(userAuthData);
console.log("userModel Initiated...")
//https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
// https://stackoverflow.com/questions/19696240/proper-way-to-return-json-using-node-or-express?rq=1

app.get('/test', (req,res) => {
    res.send("johnson and jonson")
    console.log("Test Data displayed here: ");
  });



// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   })


module.exports = router;