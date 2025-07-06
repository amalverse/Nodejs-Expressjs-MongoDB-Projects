// Importing the path module from Node.js core modules.
const path = require("path");
// Importing the express module to create a router.
const express = require("express");
// Creating a new router instance for handling host-related routes.
const hostRouter = express.Router();
// Importing a utility module for handling paths.
const rootDir = require("../utils/pathUtil");
// Importing the hostController to manage the logic for each route.
const hostController = require("../controllers/hostController");

// Route to show a form for adding a new home.
hostRouter.get("/add-home", hostController.getAddHome);
// Route to handle form submission for adding a new home.
hostRouter.post("/add-home", hostController.postAddHome);
// Route to display a list of all homes added by the host.
hostRouter.get("/host-home-list", hostController.getHostHomes);
// Route to show a form for editing an existing home.
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);
// Route to handle form submission for editing a home.
hostRouter.post("/edit-home", hostController.postEditHome);
// Route to delete a home by its ID.
hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);

// Exporting the router so it can be used in other parts of the application.
module.exports = hostRouter;

