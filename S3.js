const multer = require('multer')
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


//To-Do create a function and export for Data being added to folders,
// example data transmission: https://github.com/bobboy65/Beat-Website-Production-Build/blob/main/src/pages/Upload.js

const S3_Folders = async(email) => {

const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME_3 = process.env.AWS_BUCKET_NAME_3;

var s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    Bucket: BUCKET_NAME_3
})

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


function createFolder(email) {
  const params = {
    Bucket: BUCKET_NAME_3,
    Key: email + '/',
    Body: '',
    ACL: 'public-read'
  };

  s3.upload(params, function(err, data) {
    if (err) {
      console.log('Error creating folder: ', err);
    } else {
      console.log('Folder created successfully');
    }
  });
}
}
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




// // function to check if folder already exists
// function checkFolderExists(email) {
//   const params = {
//     Bucket: 'your-bucket-name',
//     Prefix: email + '/'
//   };

//   s3.listObjects(params, function(err, data) {
//     if (err) {
//       console.log('Error checking folder existence: ', err);
//     } else {
//       const folderExists = data.Contents.length > 0;
//       console.log(`Folder for ${email} exists: ${folderExists}`);
//       if (!folderExists) {
//         createFolder(email);
//       }
//     }
//   });
// }

// // example usage
// const userEmail = 'example@example.com';
// checkFolderExists(userEmail);




// In Node.js, router is a mechanism to define routes and their corresponding handlers, which allow an application to respond to specific requests. app.use is a method that registers middleware functions with the application's routing system. Middleware functions are functions that have access to the request and response objects, and the next middleware function in the application's request-response cycle.

// In the given code snippet, const userControl = require("./routes/user") is importing a module named "user" located in the "routes" directory of the application. This module is expected to define a set of routes for handling user-related requests.

// The line app.use("/user", userControl) registers the userControl module as a middleware function for the application, and maps it to the path "/user". This means that any requests to paths that start with "/user" will be handled by the routes defined in the userControl module.

// For example, if the application receives a request to the path "/user/login", the userControl module will handle it according to the route defined for that path. Similarly, if the application receives a request to the path "/user/profile", the userControl module will handle it according to the route defined for that path.

// In summary, the code is defining and registering a set of routes for user-related requests using the userControl module and mapping it to the "/user" path.


//function export
// vs router export (uses paths in router)
// module.exports = router;
// module.exports = {
//     tokenVerify
// }


module.exports = {
    S3_Folders
}