//https://docs.amazonaws.cn/en_us/sdk-for-javascript/v3/developer-guide/sdk-example-javascript-syntax.html

//https://docs.aws.amazon.com/AmazonS3/latest/userguide/download-objects.html
const multer = require('multer')
const multerS3 = require('multer-s3');
const {S3Client, PutObjectCommand, HeadObjectCommand, ListObjectsCommand, GetObjectCommand} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


//To-Do create a function and export for Data being added to folders,
// example data transmission: https://github.com/bobboy65/Beat-Website-Production-Build/blob/main/src/pages/Upload.js

//const S3_Folder_Function = async(email) => {

//////////////////////////////////////////////////////////////////////////////
//                              STORAGE                                     //
//////////////////////////////////////////////////////////////////////////////

// var upload = multer({    
//     storage: multerS3({
//         s3: s3,
//         bucket: BUCKET_NAME_3,
//         metadata: function (req, file, cb){
//             cb(null, {fieldName: file.fieldname});
//         },
//         key: function(req, file, cb) {
//             //check line below ,uuid =>req.user.SongFile
//             cb(null, req.user.songFile)
//         },
//     })
// })
var user = JSON.parse(JSON.stringify("potato_pancake"))

// function to create a new folder in S3 bucket
const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME_3 = process.env.AWS_BUCKET_NAME_3;
const REGION = process.env.REGION;

var s3 = new S3Client({
  region:REGION,
  accessKeyId: ID,
  secretAccessKey: SECRET,
  Bucket: BUCKET_NAME_3
})

const createFolder = async(email) => {
  const params = {
    Bucket: BUCKET_NAME_3,
    Key: email + '/',
    Body: '',
    //ACL: 'public-read'
  };

  try {
  const data = await s3.send(new PutObjectCommand(params));
  console.log("success!:" , data);
  //return data; //for unit tests
  }
  catch (err) {
    console.log("Error" , err);
  }
}

// function to check if folder already exists
const checkIfFolderExists = async(email) => {
  const params = {
    Bucket: BUCKET_NAME_3,
    Key: email + '/'
  };

  try {
  const response = await s3.send(new HeadObjectCommand(params));
  console.log("success!:" , response);
  return response;
  }
  catch (err) {
    console.log("Error" , err);
  }
}

// // example usage
// const userEmail = 'example@example.com';
// checkFolderExists(userEmail);


//}
//app.post('/upload', upload.array('fileUpload', 2), async (req, res) => {    

    
//console.log(req.user);
//console.log(req.files);
//console.log(keyGen)     THIS SECTION POPULATES UPLOAD INFORMATION
// const params = {
//     Bucket: BUCKET_NAME_3,
//     Key: "ART_ANTIGEN", 
//     user: user,
// }


// s3.upload(params, function(err) {
//     console.log(JSON.stringify(err) + " " + JSON.stringify(user));
// });
//     console.log('check on S3 successful')

//})
///////////////////////////////////////////////////////////////////////////////////////

//app.use("/download" , getDownloads)
//app.use("/user" , userControl)
//app.use("/dB" , authMongoDb)


// In Node.js, router is a mechanism to define routes and their corresponding handlers, which allow an application to respond to specific requests. app.use is a method that registers middleware functions with the application's routing system. Middleware functions are functions that have access to the request and response objects, and the next middleware function in the application's request-response cycle.

// In the given code snippet, const userControl = require("./routes/user") is importing a module named "user" located in the "routes" directory of the application. This module is expected to define a set of routes for handling user-related requests.

// The line app.use("/user", userControl) registers the userControl module as a middleware function for the application, and maps it to the path "/user". This means that any requests to paths that start with "/user" will be handled by the routes defined in the userControl module.

// For example, if the application receives a request to the path "/user/login", the userControl module will handle it according to the route defined for that path. Similarly, if the application receives a request to the path "/user/profile", the userControl module will handle it according to the route defined for that path.

// In summary, the code is defining and registering a set of routes for user-related requests using the userControl module and mapping it to the "/user" path.


// use like this: 
// const userControl = require("./routes/user");
// app.use("/user" , userControl)



//function export
// vs router export (uses paths in router)
// module.exports = router;
// module.exports = {
//     tokenVerify
// }

const getS3Object = async(email) => {
  try {
    // Retrieve a list of objects in the S3 bucket
    const listObjectsParams = {
      Bucket: BUCKET_NAME_3
      // Prefix: 'johngotti18@mail.com/ig11.jpg'
    };

    const { Contents } = await s3.send(new ListObjectsCommand(listObjectsParams));

    // Find the specific object that you want to retrieve
    //const object = Contents.find((obj) => obj.Key === OBJECT_KEY);

    // res.set("Content-Type", "image/jpeg");
    // res.send(data.Body);
    return(Contents);
} catch (err) {
  console.log("Error" , err);
  return res.status(500).send("Error retrieving image from S3 bucket");
}
}

const getS3ObjectPresign = async(email) => {
  try {
  const getObjectCommand = new GetObjectCommand({ Bucket: BUCKET_NAME_3, Key: 'johngotti18@mail.com/ig11.jpg' });
  const signedUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600, isPublic: true });
  return signedUrl;
} catch (err) {
  console.log("Error" , err);
  return err;
  }
}


module.exports = {
    createFolder,
    checkIfFolderExists,
    getS3Object,
    getS3ObjectPresign
}