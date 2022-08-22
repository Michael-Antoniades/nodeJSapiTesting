const http = require('http');
const dotenv = require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const { auth , requiresAuth } = require('express-openid-connect');
var randomBytes = require('random-bytes');
const path = require('path');

const URI = process.env.DB_URI;
const AUTHSECRET = process.env.AUTHSECRET
const CLIENTID = process.env.CLIENTID
const IBURL = process.env.IBURL
const AUDIENCE = process.env.AUDIENCE
const CLIENTSECRET = process.env.CLIENTSECRET
const BASEURL = process.env.BASEURL

const port = 3000;
const userInformationService = require("./userInformationService");
const userModelService = require("./userModel.js");

const { response } = require('express');


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

const server = http.createServer((req, res) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/profile', requiresAuth(), (req,res) => {
  res.redirect(`http://localhost:3000/`);
  profileInformation = JSON.stringify(req.oidc.user);
  console.log(`profile API fetching: ${profileInformation}`);


});

app.get('/informationFetch', (req,res) => {
  const profileInformation = req.oidc.user;
  res.send(profileInformation);
  //const userInformation = JSON.stringify(req.oidc.user);
});


app.get('/test', (req,res) => {
  res.send("johnson and jonson")
});

app.get('/' , (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use("/static", express.static('./static/'));
app.use("/userInformation", userInformationService);

app.use("/userModel", userModelService);
