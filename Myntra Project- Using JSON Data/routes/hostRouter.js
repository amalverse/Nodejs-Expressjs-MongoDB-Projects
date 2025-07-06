// Importing the 'path' module from Node.js core modules to work with file and directory paths
const path = require("path");

// Importing the 'express' module to create a router for handling host-related routes
const express = require("express");
const hostRouter = express.Router(); // Creating a new router instance

// Importing the 'rootDir' utility from the 'utils' directory to get the root directory of the project
const rootDir = require("../utils/pathUtil");

// Importing the 'hostController' module to handle host-related logic
const hostController = require("../controllers/hostController");

// Route to render the 'Add Home' page
hostRouter.get("/add-home", hostController.getAddHome);

// Route to handle adding a new home
hostRouter.post("/add-home", hostController.postAddHome);

// Route to render the list of homes for the host
hostRouter.get("/host-home-list", hostController.getHostHomes);

// Route to render the 'Edit Home' page
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);

// Route to handle editing an existing home
hostRouter.post("/edit-home", hostController.postEditHome);

// Route to handle deleting a home
hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);

// Exporting the router to be used in other parts of the application
module.exports = hostRouter;

