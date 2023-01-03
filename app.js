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

app.use(cors({origin: '*'}));
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

app.use('/test', (req, res, next) => {
  console.log("Test URL displayed here: ");
  const url = 'https://nextdaybeats.auth.us-east-2.amazoncognito.com/oauth2/authorize?response_type=code&client_id=6p9l03ckllen5s65svcrba3h1a&scope=openid&redirect_uri=http://localhost:3000/signedIn';
  // axios.get({url: url,
  //   })
  //   .then(response => {
  //       console.log(response)
  //       res.send(response.code)
  //     }).catch(err => {
  //       console.log(err);
  //       res.send({ err })
  //     });
  res.redirect(url);
  console.log()


  
  
  
  console.log("returns new url")
});

app.use('/getToken' , ( req, res) => {
  myFunction2();
})


function myFunction2() { 
  let code = '53e41b4d-f2f7-4ba0-bda7-828860e114e1';
  console.log('requesting ID token');
  url1 = 'https://nextdaybeats.auth.us-east-2.amazoncognito.com/oauth2/token?response_type=code&client_id=6p9l03ckllen5s65svcrba3h1a&scope=openid&redirect_uri=http://localhost:3000/signedIn';
  url2 = 'https://nextdaybeats.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=6p9l03ckllen5s65svcrba3h1a&scope=openid&redirect_uri=http://localhost:3000/signedIn';
  axios.post({url: url2,
  data: {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000/signedIn",
    client_id: process.env.AWS_COGNITO_CLIENT_ID,
    client_secret: process.env.AWS_COGNITO_CLIENT_SECRET
  }
  })
  .then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      const dataString = JSON.stringify(data);
      document.getElementById('output').innerHTML = dataString;
    });

}

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

app.get('/signedIn' , (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/loggedOut' , (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})

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
url3 = "https://nextdaybeats.auth.us-east-2.amazoncognito.com/oauth2/authorize?response_type=code&client_id=6p9l03ckllen5s65svcrba3h1a&scope=openid&redirect_uri=http://localhost:3000/signedIn"
  //   await axios.request({
  //   url3,
  //   method: "get",
  //  })
  console.log(url3)
  console.log("for commit for the queen")
  return url3

}





//s3://nextdaybeatsproductions/NextDayBeatsMedia/
//Module for additional user information












// POST https://nextdaybeats.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=6p9l03ckllen5s65svcrba3h1a&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FsignedIn
// 302
// Request Headers
// Upgrade-Insecure-Requests: 1
// Origin: https://nextdaybeats.auth.us-east-2.amazoncognito.com
// Content-Type: application/x-www-form-urlencoded
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Postman/10.0.1 Chrome/94.0.4606.81 Electron/15.5.7 Safari/537.36
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: navigate
// Sec-Fetch-User: ?1
// Sec-Fetch-Dest: document
// Referer: https://nextdaybeats.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=6p9l03ckllen5s65svcrba3h1a&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FsignedIn
// Accept-Encoding: gzip, deflate, br
// Accept-Language: en-US
// Cookie: XSRF-TOKEN=64158faf-fedc-4994-948a-48d34169a680; csrf-state=""; csrf-state-legacy=""
// Response Headers
// cache-control: no-cache, no-store, max-age=0, must-revalidate
// content-length: 0
// date: Fri, 21 Oct 2022 17:49:00 GMT
// location: http://localhost:3000/signedIn?code=18fe37c2-8eff-4886-98f4-abbc6a0753a6
// pragma: no-cache
// server: Server
// set-cookie: XSRF-TOKEN=""; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/; Secure; HttpOnly; SameSite=Lax
// set-cookie: XSRF-TOKEN=865af007-ef59-4b12-9bbd-1610f9b222c2; Path=/; Secure; HttpOnly; SameSite=Lax
// set-cookie: cognito="H4sIAAAAAAAAAAHnABj/ajUyoVr8yPCzhd2TPBi0RbTF/zfKgkhIzyyOX5WbhwK1sWy4EqG0HgZkEp0WXMPhS0gZz2ZYzd6z1Z/viWt1O4gWx7623BQX4zTMyIZbKIV6H0osqgTTX00sgi44WFEUPX8FmSdpDUtInZ8OjaoZ1EZ3OeS8Ij//X/UQSm/QRAEh47o8FKKuhWOU3BFUSl0bG7oN8NlHoXuo8gexrmZvkvQddyDLLEEUpt9U/k4mzP53j6oPVfdfwYWT0ZKoMogtCYC7hiS5s8RR5StjR5op2kGgrnPlq2i5dsNPZo8VuEQHgaVn2ro/2d5l1ecAAAA=.H4sIAAAAAAAAAFNuuz/38x4xgTeSvxxyVlgf8AiW874Un9gkffiMxJUKfTkAem9TxyAAAAA=.3"; Version=1; Domain=nextdaybeats.auth.us-east-2.amazoncognito.com; Max-Age=3600; Expires=Fri, 21-Oct-2022 18:49:00 GMT; Path=/; Secure; HttpOnly; SameSite=Lax
// strict-transport-security: max-age=31536000 ; includeSubDomains
// x-amz-cognito-request-id: d9f2fad1-8c33-4217-94f1-394549a8df97
// x-content-type-options: nosniff
// x-frame-options: DENY
// x-xss-protection: 1; mode=block






 
// POST https://nextdaybeats.auth.us-east-2.amazoncognito.com/oauth2/token
// 200
// 361 ms
// Network
// Request Headers
// Content-Type: application/x-www-form-urlencoded
// User-Agent: PostmanRuntime/7.29.2
// Accept: */*
// Cache-Control: no-cache
// Postman-Token: 98beb1df-ff82-4c03-a1e9-7fbf3d8bee65
// Host: nextdaybeats.auth.us-east-2.amazoncognito.com
// Accept-Encoding: gzip, deflate, br
// Connection: keep-alive
// Content-Length: 177
// Request Body
// grant_type: "authorization_code"
// code: "18fe37c2-8eff-4886-98f4-abbc6a0753a6"
// redirect_uri: "http://localhost:3000/signedIn"
// client_id: "6p9l03ckllen5s65svcrba3h1a"
// client_secret: ""
// Response Headers
// Date: Fri, 21 Oct 2022 17:49:01 GMT
// Content-Type: application/json;charset=UTF-8
// Transfer-Encoding: chunked
// Connection: keep-alive
// Set-Cookie: XSRF-TOKEN=a8c4bccd-059b-479e-8af4-f8aabaee22fe; Path=/; Secure; HttpOnly; SameSite=Lax
// x-amz-cognito-request-id: 35792cbd-c697-4908-8837-2108079ab861
// X-Application-Context: application:prod:8443
// X-Content-Type-Options: nosniff
// X-XSS-Protection: 1; mode=block
// Cache-Control: no-cache, no-store, max-age=0, must-revalidate
// Pragma: no-cache
// Expires: 0
// Strict-Transport-Security: max-age=31536000 ; includeSubDomains
// X-Frame-Options: DENY
// Server: Server
// Response Body
// {"id_token":"eyJraWQiOiJPMWxpTE