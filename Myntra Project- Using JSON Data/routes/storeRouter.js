// Importing the 'path' module from Node.js core modules to work with file and directory paths
const path = require("path");

// Importing the 'express' module to create a router for handling store-related routes
const express = require("express");
const storeRouter = express.Router(); // Creating a new router instance

// Importing the 'storeController' module to handle store-related logic
const storeController = require("../controllers/storeController");

// Route to render the index page with all homes
storeRouter.get("/", storeController.getIndex);

// Route to render the bookings page
storeRouter.get("/bookings", storeController.getBookings);

// Route to render the list of homes
storeRouter.get("/homes", storeController.getHomes);

// Route to render the favourite list page
storeRouter.get("/favourites", storeController.getFavouriteList);

// Route to render the details of a specific home
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);

// Route to handle adding a home to favourites
storeRouter.post("/favourites", storeController.postAddToFavourite);

// Route to handle removing a home from favourites
storeRouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourite);

// Exporting the router to be used in other parts of the application
module.exports = storeRouter;
