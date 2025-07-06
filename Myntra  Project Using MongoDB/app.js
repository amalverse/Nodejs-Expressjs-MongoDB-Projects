// Importing the 'path' module from Node.js core modules.
const path = require('path');
// Importing the 'express' module to create the web application.
const express = require('express');
// Importing the router for store-related routes.
const storeRouter = require("./routes/storeRouter");
// Importing the router for host-related routes.
const hostRouter = require("./routes/hostRouter");
// Importing a utility to get the root directory of the project.
const rootDir = require("./utils/pathUtil");
// Importing the controller to handle errors like 404 (Page Not Found).
const errorsController = require("./controllers/errors");
// Importing the function to connect to the MongoDB database.
const {mongoConnect} = require('./utils/databaseUtil');

// Creating an Express application.
const app = express();

// Setting the view engine to 'ejs' for rendering dynamic HTML pages.
app.set('view engine', 'ejs');
// Setting the directory for the views (HTML templates).
app.set('views', 'views');

// Middleware to parse incoming request bodies (form data).
app.use(express.urlencoded({ extended: true }));
// Registering the store router to handle store-related routes.
app.use(storeRouter);
// Registering the host router to handle host-related routes.
app.use("/host", hostRouter);
// Serving static files (like CSS, images) from the 'public' folder.
app.use(express.static(path.join(rootDir, 'public')));
// Handling 404 errors by using the errors controller.
app.use(errorsController.pageNotFound);

// Defining the port number for the server.
const PORT = 3000;
// Connecting to the MongoDB database and starting the server.
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
});