// Importing the express module to create a router.
const express = require("express");

// Creating a new router instance for handling authentication-related routes.
const authRouter = express.Router();

// Importing the authController to manage the logic for each route.
const authController = require("../controllers/authController");

// Route to display the login page.
authRouter.get("/login", authController.getLogin);

// Route to handle the login form submission.
authRouter.post("/login", authController.postLogin);

// Route to handle user logout.
authRouter.post("/logout", authController.postLogout);

// Route to display the signup page.
authRouter.get("/signup", authController.getSignup);

// Route to handle the signup form submission.
authRouter.post("/signup", authController.postSignup);

// Exporting the router so it can be used in other parts of the application.
module.exports = authRouter;