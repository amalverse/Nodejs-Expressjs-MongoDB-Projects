// Importing the path module from Node.js core modules to work with file and directory paths.
const path = require('path');

// Importing the express module to create the application.
const express = require('express');

// Importing the session module to manage user sessions.
const session = require('express-session');

// Importing the MongoDBStore module to store session data in MongoDB.
const MongoDBStore = require('connect-mongodb-session')(session);

// Importing mongoose to interact with the MongoDB database.
const { default: mongoose } = require('mongoose');

//Importing Multer to handle file uploads.
const multer = require('multer');

// Importing dotenv to load environment variables from a .env file.
require('dotenv').config();

// Reading the MongoDB connection URL from environment variables.
const DB_PATH = process.env.DB_PATH;

// Importing routers for different parts of the application.
const storeRouter = require("./routes/storeRouter"); // Handles store-related routes.
const hostRouter = require("./routes/hostRouter"); // Handles host-related routes.
const authRouter = require("./routes/authRouter"); // Handles authentication-related routes.

// Importing a utility module for handling paths.
const rootDir = require("./utils/pathUtil");

// Importing the errorsController to handle error pages.
const errorsController = require("./controllers/errors");

// Creating an instance of the express application.
const app = express();

// Setting the view engine to EJS for rendering dynamic HTML pages.
app.set('view engine', 'ejs');

// Setting the directory for the views.
app.set('views', 'views');

// Creating a new MongoDBStore instance to store session data.
const store = new MongoDBStore({
  uri: DB_PATH, // MongoDB connection URL.
  collection: 'sessions' // Name of the collection to store session data.
});

// Function to generate a random string of a specified length.  Used to create unique filenames for uploaded files.
const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Adding comments to explain file upload-related code.

// Configuring Multer storage to specify the destination and filename for uploaded files.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Setting the destination folder for uploaded files.
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname); // Generating a unique filename for each uploaded file.
  }
});

// Defining a file filter to allow only specific file types (PNG, JPG, JPEG).
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true); // Accept the file.
  } else {
    cb(null, false); // Reject the file.
  }
}

// Setting up Multer options with the defined storage and file filter.
const multerOptions = {
  storage, fileFilter
};

// Middleware to parse URL-encoded data from the request body.
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files from the 'public' directory.
app.use(express.static(path.join(rootDir, 'public')));

// Middleware to handle file uploads for a single file with the field name 'photo'.
app.use(multer(multerOptions).single('photo'));

// Serving uploaded files statically from the 'uploads' directory.
app.use("/uploads", express.static(path.join(rootDir, 'uploads')));
app.use("/host/uploads", express.static(path.join(rootDir, 'uploads')));
app.use("/homes/uploads", express.static(path.join(rootDir, 'uploads')));

// Middleware to manage user sessions.
app.use(session({
  secret: "secret", // Secret key for signing the session ID.
  resave: false, // Prevents resaving session data if it hasn't changed.
  saveUninitialized: true, // Saves uninitialized sessions to the store.
  store // Specifies the session store.
}));

// Middleware to add the isLoggedIn property to the request object.
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn; // Adds the login status to the request object.
  next(); // Proceeds to the next middleware or route handler.
});

// Using the authentication router for authentication-related routes.
app.use(authRouter);

// Using the store router for store-related routes.
app.use(storeRouter);

// Middleware to protect host-related routes by checking if the user is logged in.
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next(); // Proceeds to the next middleware or route handler if the user is logged in.
  } else {
    res.redirect("/login"); // Redirects to the login page if the user is not logged in.
  }
});

// Using the host router for host-related routes.
app.use("/host", hostRouter);

// Using the errorsController to handle 404 error pages.
app.use(errorsController.pageNotFound);

// Defining the port number for the server.
const PORT = 3000;

// Connecting to the MongoDB database and starting the server.
mongoose.connect(DB_PATH).then(() => {
  console.log('✅ Connected to MongoDB'); // Logs a success message when connected to MongoDB.
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`); // Logs the server address.
  });
}).catch(err => {
  console.log('❌ Error while connecting to Mongo: ', err); // Logs an error message if the connection fails.
});
