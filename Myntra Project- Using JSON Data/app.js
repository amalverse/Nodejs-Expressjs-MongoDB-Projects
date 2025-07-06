// Importing the 'path' module from Node.js core modules to work with file and directory paths
const path = require("path");

// Importing the 'express' module, a web framework for Node.js, to create and manage the server
const express = require("express");

// Importing the 'storeRouter' module from the 'routes' directory to handle routes related to store functionality
const storeRouter = require("./routes/storeRouter");

// Importing the 'hostRouter' module from the 'routes' directory to handle routes related to host functionality
const hostRouter = require("./routes/hostRouter");

// Importing the 'rootDir' utility from the 'utils' directory to get the root directory of the project
const rootDir = require("./utils/pathUtil");

// Initializing the Express application
const app = express();

// Setting up EJS as the templating engine for rendering dynamic HTML pages
app.set("view engine", "ejs");

// Setting the directory where EJS views (templates) are stored
app.set("views", "views");

// Middleware to parse URL-encoded data (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Using the 'storeRouter' to handle all routes related to the store
app.use(storeRouter);

// Using the 'hostRouter' to handle all routes prefixed with '/host'
app.use("/host", hostRouter);

// Serving static files (e.g., CSS, images, JavaScript) from the 'public' directory
app.use(express.static(path.join(rootDir, "public")));

// Importing the 'errorsController' module from the 'controllers' directory to handle errors
const errorsController = require("./controllers/errors");

// Middleware to handle 404 errors (page not found) by rendering a '404.ejs' view
app.use(errorsController.pageNotFound);

// Defining the port number for the server to listen on
const PORT = 3003;

// Starting the server and logging the address to the console
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
