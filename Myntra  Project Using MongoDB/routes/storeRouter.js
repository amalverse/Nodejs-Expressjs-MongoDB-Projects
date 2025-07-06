// Importing the 'path' module from Node.js core modules.
const path = require("path");
// Importing the 'express' module to create a router.
const express = require("express");
// Creating a new router instance for handling store-related routes.
const storeRouter = express.Router();
// Importing the 'storeController' to manage the logic for each route.
const storeController = require("../controllers/storeController");

// Route to show the homepage.
storeRouter.get("/", storeController.getIndex);
// Route to show the bookings page.
storeRouter.get("/bookings", storeController.getBookings);
// Route to show a list of all homes.
storeRouter.get("/homes", storeController.getHomes);
// Route to show the user's favorite homes.
storeRouter.get("/favourites", storeController.getFavouriteList);
// Route to show details of a specific home by its ID.
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
// Route to add a home to the user's favorites.
storeRouter.post("/favourites", storeController.postAddToFavourite);
// Route to remove a home from the user's favorites by its ID.
storeRouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourite);

// Exporting the router so it can be used in other parts of the application.
module.exports = storeRouter;
