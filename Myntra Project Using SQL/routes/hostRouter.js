// Importing the 'path' module from Node.js core modules to work with file and directory paths
const path = require("path");

// Importing the 'express' module to create and manage the router
const express = require("express");

// Creating a new router instance for handling host-related routes
const hostRouter = express.Router();

// Importing the 'rootDir' utility from the 'utils' folder to get the root directory of the project
const rootDir = require("../utils/pathUtil");

// Importing the 'hostController' module from the 'controllers' folder to handle host-related logic
const hostController = require("../controllers/hostController");

// Defining a route to render the 'Add Home' page
hostRouter.get("/add-home", hostController.getAddHome);

// Defining a route to handle the submission of a new home
hostRouter.post("/add-home", hostController.postAddHome);

// Defining a route to render the list of homes for the host
hostRouter.get("/host-home-list", hostController.getHostHomes);

// Defining a route to render the 'Edit Home' page for a specific home
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);

// Defining a route to handle the submission of edited home details
hostRouter.post("/edit-home", hostController.postEditHome);

// Defining a route to handle the deletion of a specific home
hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);

// Exporting the router to be used in other parts of the application
module.exports = hostRouter;

