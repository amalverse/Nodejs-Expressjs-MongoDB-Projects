// Importing the 'path' module from Node.js core modules to work with file and directory paths
const path = require("path");

// Importing the 'express' module to create and manage the router
const express = require("express");

// Creating a new router instance for handling store-related routes
const storeRouter = express.Router();

// Importing the 'storeController' module from the 'controllers' folder to handle store-related logic
const storeController = require("../controllers/storeController");

// Defining a route to render the home page
storeRouter.get("/", storeController.getIndex );

// Defining a route to render the bookings page
storeRouter.get("/bookings", storeController.getBookings );

// Defining a route to render the list of homes
storeRouter.get("/homes", storeController.getHomes );

// Defining a route to render the list of favourite homes
storeRouter.get("/favourites", storeController.getFavouriteList );

// Defining a route to render the details of a specific home
storeRouter.get("/homes/:homeId",storeController.getHomeDetails);

// Defining a route to handle the addition of a home to the favourites list
storeRouter.post("/favourites", storeController.postAddToFavourite);

// Defining a route to handle the removal of a home from the favourites list
storeRouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourite);

// Exporting the router to be used in other parts of the application
module.exports = storeRouter;
