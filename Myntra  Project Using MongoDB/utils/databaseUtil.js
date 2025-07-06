// Importing the 'dotenv' package to load environment variables from a .env file.
require('dotenv').config();
// Importing the 'mongodb' package to interact with MongoDB.
const mongo = require("mongodb");
// Extracting the 'MongoClient' class from the 'mongodb' package.
const MongoClient = mongo.MongoClient;
// Reading the MongoDB connection URL from environment variables.
const MONGO_URL = process.env.MONGO_URL;
// Variable to store the database instance.
let _db;

// Function to connect to the MongoDB database.
const mongoConnect = (callback) => {
  // Connecting to the MongoDB server using the connection URL.
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      // Logs a success message when the connection is established.
      console.log("✅ MongoDB Connected");
      // Stores the database instance for later use.
      _db = client.db("airbnb");
      // Executes the callback function after the connection is established.
      callback();
    })
    .catch((err) => {
      // Logs an error message if the connection fails.
      console.error("❌ Error connecting to MongoDB:", err);
    });
};

// Function to get the database instance.
const getDB = () => {
  // If the database instance exists, returns it.
  if (_db) {
    return _db;
  }
  // Throws an error if the database instance is not found.
  throw "No database found!";
};

// Exporting the 'mongoConnect' and 'getDB' functions for use in other files.
module.exports = { mongoConnect, getDB };
