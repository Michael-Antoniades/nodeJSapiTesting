const multer = require('multer')
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


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

////////////////////////////////////////////////////////////////////////////////////////

function checkFolderExists(email) {
    const params = {
      Bucket: 'your-bucket-name',
      Prefix: email + '/'
    };
};

//app.post('/upload', upload.array('fileUpload', 2), async (req, res) => {    

    var user = JSON.parse(JSON.stringify("potato_pancake"))
//console.log(req.user);
//console.log(req.files);
//console.log(keyGen)     THIS SECTION POPULATES UPLOAD INFORMATION
const params = {
    Bucket: BUCKET_NAME_3,
    Key: "ART_ANTIGEN", 
    user: user,
}


// s3.upload(params, function(err) {
//     console.log(JSON.stringify(err) + " " + JSON.stringify(user));
// });
//     console.log('check on S3 successful')

//})
///////////////////////////////////////////////////////////////////////////////////////

//app.use("/download" , getDownloads)
//app.use("/user" , userControl)
//app.use("/dB" , authMongoDb)


// // function to create a new folder in S3 bucket
// function createFolder(email) {
//   const params = {
//     Bucket: 'your-bucket-name',
//     Key: email + '/',
//     Body: '',
//     ACL: 'public-read'
//   };

//   s3.upload(params, function(err, data) {
//     if (err) {
//       console.log('Error creating folder: ', err);
//     } else {
//       console.log('Folder created successfully');
//     }
//   });
// }

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