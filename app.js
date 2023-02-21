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
const userModelService = require("./userModel.js");

const S3_Service = require("./S3");

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


//////////////////////////////////////////////////////////////////////////////
//                              STORAGE TESTING                             //
//////////////////////////////////////////////////////////////////////////////
app.get('/informationFetch',(req,res) => {
  const emailTest = 'johngotti18@mail.com'
  S3_Service.createFolder(emailTest);
  //const userInformation = JSON.stringify(req.oidc.user);
});

app.get('/checkIfFolderExists', (req, res) => {
  const emailTest = 'johngotti18@mail.com'
  S3_Service.checkIfFolderExists(emailTest);
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














