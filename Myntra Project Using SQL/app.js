// Importing the 'path' module from Node.js core modules to work with file and directory paths
const path = require("path");

// Importing the 'express' module to create and manage the server
const express = require("express");

// Importing the 'storeRouter' module from the 'routes' folder to handle store-related routes
const storeRouter = require("./routes/storeRouter");

// Importing the 'hostRouter' module from the 'routes' folder to handle host-related routes
const hostRouter  = require("./routes/hostRouter");

// Importing the 'rootDir' utility from the 'utils' folder to get the root directory of the project
const rootDir = require("./utils/pathUtil");

// Importing the 'db' module from the 'utils' folder to manage database connections and queries
const db = require("./utils/database");

// Executing a SQL query to fetch all rows from the 'homes' table
// Logs the data if the query is successful, or logs an error if it fails
db.execute("SELECT * FROM homes")
  .then(([rows, fields]) => {
    console.log('✅ Getting data from MySQL Database', rows, fields);
  })
  .catch((err) => {
    console.log('❌ Error connecting to MySQL',err);
  });

// Creating an instance of the Express application
const app = express();

// Setting the view engine to 'ejs' for rendering dynamic HTML templates
app.set("view engine", "ejs");

// Setting the directory for the 'views' folder where EJS templates are stored
app.set("views", "views");

// Adding middleware to parse URL-encoded data from incoming requests
app.use(express.urlencoded({ extended: true }));

// Using the 'storeRouter' for handling store-related routes
app.use(storeRouter);

// Using the 'hostRouter' for handling host-related routes under the '/host' path
app.use("/host", hostRouter);

// Serving static files from the 'public' directory
app.use(express.static(path.join(rootDir, "public")));

// Importing the 'errorsController' module from the 'controllers' folder to handle errors
const errorsController = require("./controllers/errors");

// Using the 'pageNotFound' method from 'errorsController' to handle 404 errors
app.use(errorsController.pageNotFound);

// Defining the port number for the server to listen on
const PORT = 3002;

// Starting the server and logging the address it is running on
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
