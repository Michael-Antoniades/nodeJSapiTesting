const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
//https://www.npmjs.com/package/mongoose


//npm install mongodb
//npm install mongoose
//const userModel_Service = require("./userModel.js");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const userSchema = new MongoClient.Schema({
  sub: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  verified: { type: Boolean, required: true }, //optional, see if you can get from amazon
  nickname: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  country: { type: String, required: false },
  address: { type: String, required: false },
  notifications: { type: String, required: false },
  songCount: { type: Number, required: false },
  ProfilePicture: { type: String, required: false },
  ProducerLogo: { type: String, required: false}
});

const User = MongoClient.model('User', userSchema);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


async function createUser(s3_transfer) {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ sub });
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return existingUser;
    } else {
      // Create a new user
      const newUser = new User({ sub:'23234242', email:'test12@2' , verified:'maybe' , nickname:'johngotti'  });
      await newUser.save();
      console.log('New user created:', newUser);
      return newUser;
    }
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
}
module.exports = {
  run
}