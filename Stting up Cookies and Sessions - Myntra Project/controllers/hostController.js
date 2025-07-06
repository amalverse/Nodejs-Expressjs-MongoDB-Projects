// Importing the Home model to interact with the 'homes' collection in the database.
// The Home model is defined in '../models/home' and represents the schema for homes in the database.
const Home = require("../models/home");

// This function handles the GET request to display the form for adding a new home.
// It renders the 'host/edit-home' view with the specified properties.
exports.getAddHome = (req, res, next) => {
  // Rendering the 'edit-home' view located in the 'views/host' directory.
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb", // Sets the title of the page displayed in the browser.
    currentPage: "addHome", // Indicates the current page for navigation purposes.
    editing: false, // Indicates that this is not an edit operation (used in the view logic).
    isLoggedIn: req.isLoggedIn // Passes the login status of the user to the view.
  });
};

// This function handles the GET request to display the form for editing an existing home.
// It fetches the home details from the database and renders the 'host/edit-home' view.
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId; // Extracts the home ID from the request parameters.
  const editing = req.query.editing === "true"; // Checks if the 'editing' query parameter is set to true.

  // Finds the home by its ID in the database using the Home model.
  Home.findById(homeId).then((home) => {
    if (!home) { // If the home is not found, redirects to the host home list page.
      return res.redirect("/host/host-home-list");
    }

    // Rendering the 'edit-home' view with the fetched home details.
    res.render("host/edit-home", {
      home: home, // Passes the home details to the view for editing.
      pageTitle: "Edit your Home", // Sets the title of the page displayed in the browser.
      currentPage: "host-homes", // Indicates the current page for navigation purposes.
      editing: editing, // Indicates that this is an edit operation (used in the view logic).
      isLoggedIn: req.isLoggedIn // Passes the login status of the user to the view.
    });
  });
};

// This function handles the GET request to display the list of homes hosted by the user.
// It fetches all registered homes from the database and renders the 'host/host-home-list' view.
exports.getHostHomes = (req, res, next) => {
  // Fetches all homes from the database using the Home model.
  Home.find().then((registeredHomes) => {
    // Rendering the 'host-home-list' view with the list of registered homes.
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes, // Passes the list of homes to the view.
      pageTitle: "Host Homes List", // Sets the title of the page displayed in the browser.
      currentPage: "host-homes", // Indicates the current page for navigation purposes.
      isLoggedIn: req.isLoggedIn // Passes the login status of the user to the view.
    });
  });
};

// This function handles the POST request to add a new home to the database.
exports.postAddHome = (req, res, next) => {
  // Extracting home details from the request body.
  const { houseName, price, location, rating, photoUrl, description } = req.body;

  // Creating a new instance of the Home model with the extracted details.
  const home = new Home({
    houseName, // Name of the home.
    price, // Price of the home.
    location, // Location of the home.
    rating, // Rating of the home.
    photoUrl, // URL of the home's photo.
    description // Description of the home.
  });

  // Saving the new home to the database.
  home.save().then(() => {
    console.log("Home Saved successfully"); // Logs a success message to the console.
  });

  // Redirecting the user to the host home list page after saving.
  res.redirect("/host/host-home-list");
};

// This function handles the POST request to edit an existing home in the database.
exports.postEditHome = (req, res, next) => {
  // Extracting updated home details from the request body.
  const { id, houseName, price, location, rating, photoUrl, description } = req.body;

  // Finding the home by its ID in the database using the Home model.
  Home.findById(id).then((home) => {
    // Updating the home details with the new values.
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.photoUrl = photoUrl;
    home.description = description;

    // Saving the updated home to the database.
    home.save().then((result) => {
      console.log("Home updated ", result); // Logs a success message to the console.
    }).catch(err => {
      console.log("Error while updating ", err); // Logs an error message if saving fails.
    });

    // Redirecting the user to the host home list page after updating.
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error while finding home ", err); // Logs an error message if finding the home fails.
  });
};

// This function handles the POST request to delete a home from the database.
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId; // Extracts the home ID from the request parameters.

  // Deletes the home by its ID from the database using the Home model.
  Home.findByIdAndDelete(homeId)
    .then(() => {
      // Redirecting the user to the host home list page after deletion.
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting ", error); // Logs an error message if deletion fails.
    });
};