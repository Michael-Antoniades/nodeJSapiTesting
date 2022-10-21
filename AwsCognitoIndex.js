const AwsConfig = require('./AwsCognitoConfig');
const axios = require("axios");
const qs = require("qs");



function signUp(email, password, family_name, nickname, locale, name, agent) {
  return new Promise((resolve) => {
    AwsConfig.initAWS ();

    AwsConfig.setCognitoAttributeList(email,
        family_name, nickname, locale, name, agent);

    AwsConfig.getUserPool().signUp(email, password, AwsConfig.getCognitoAttributeList(), null, function(err, result){
      if (err) {
        return resolve({ statusCode: 422, response: err });
      }
      const response = {
        username: result.user.username,
        userConfirmed: result.userConfirmed,
        userAgent: result.user.client.userAgent,
      }
        return resolve({ statusCode: 201, response: response });
      });
    });
}

function verify(email, code) {
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).confirmRegistration(code, true, (err, result) => {
      if (err) {
        return resolve({ statusCode: 422, response: err });
      }
      return resolve({ statusCode: 400, response: result });
    });
  });
}

function getTokens(email, password) {
  
  //new creates an object from a constructor function
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).authenticateUser(AwsConfig.getAuthDetails(email, password), {
      onSuccess: (result) => {
        const token = {
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        }  
        return resolve({ statusCode: 200, response: AwsConfig.decodeJWTToken(token) });
      },
      
      onFailure: (err) => {
        return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
      },
    });
  });
}

function getLogout(email) {
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).signOut(), {
      onSuccess: (result) => {
        return resolve({ statusCode: 200, response: "great success you are logged out" });
      },
      onFailure: (err) => {        
        return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
      }
    }
  });
}

let getLogin = async () => {
  let params = {
      client_id: process.env.AWS_COGNITO_CLIENT_ID ,
      response_type: process.env.AWS_COGNITO_RESPONSE_TYPE ,
      scope: process.env.AWS_COGNITO_SCOPE ,
      redirect_uri: process.env.AWS_COGNITO_REDIRECT_URI ,
  }    
  url = `https://nextdaybeats.auth.us-east-2.amazoncognito.com/login?${qs.stringify(params, { encode: false})}`
  // let response = await axios({
  //   url,
  //   method: "get", 
  // })
  return url;
}

module.exports = {
    signUp,
    verify,
    getTokens,
    getLogout,
    getLogin
}