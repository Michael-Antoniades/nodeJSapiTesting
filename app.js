//   https://expressjs.com/en/guide/routing.html
//Router = mini-application https://expressjs.com/en/4x/api.html#router
// https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/

const http = require('http');
const dotenv = require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const { auth , requiresAuth } = require('express-openid-connect');
var randomBytes = require('random-bytes');
const path = require('path');
const axios = require('axios');
const qs = require('qs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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
const { nextTick } = require('process');


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

app.get('/test', (req,res) => {
  console.log("Test Johnson displayed here: ");
  getLogin();
});

app.get('/informationFetch', requiresAuth(),(req,res) => {
  const profileInformation = JSON.stringify(req.oidc.user);
  res.send(JSON.stringify(`hello ${profileInformation}`));
  console.log("informationFetch hit")
  console.log(profileInformation)
  //const userInformation = JSON.stringify(req.oidc.user);
});


app.get('/' , (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use("/static", express.static('./static/'));
app.use("/userInformation", userInformationService);


app.use("/static", express.static('./static/'));
app.use("/userInformation", userInformationService);



/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
//                                                                                             //
//                               AWS Cognito APIs                                              //
//                                                                                             //
//                                                                                             //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////

let getLogin = async () => {  
  // ${qs.stringify(parameters, { encode: false})}
  let params = {
    client_id: process.env.AWS_COGNITO_CLIENT_ID ,
    response_type: process.env.AWS_COGNITO_RESPONSE_TYPE ,
    scope: process.env.AWS_COGNITO_SCOPE ,
    redirect_uri: process.env.AWS_COGNITO_REDIRECT_URI ,
}    
url = `https://nextdaybeats.auth.us-east-2.amazoncognito.com/login?${qs.stringify(params, { encode: false})}`  
url2 = "https://nextdaybeats.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=6p9l03ckllen5s65svcrba3h1a&redirect_uri=http://localhost:3000/signedIn&scope=openid"
url3 = "https://nextdaybeats.auth.us-east-2.amazoncognito.com/login?client_id=6p9l03ckllen5s65svcrba3h1a&response_type=code&scope=email+openid&redirect_uri=http://localhost:3000/signedIn"
  //   await axios.request({
  //   url3,
  //   method: "get",
  //  })
  const res = await fetch(url3);
  return res;

}





//s3://nextdaybeatsproductions/NextDayBeatsMedia/
//Module for additional user information