// Importing the Home model to interact with the 'homes' collection in the database.
const Home = require("../models/home");

// Renders the page for adding a new home.
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb", // Sets the title of the page.
    currentPage: "addHome", // Highlights the current page in the navigation.
    editing: false, // Indicates that this is not an edit operation.
  });
};

// Renders the page for editing an existing home.
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId; // Extracts the home ID from the request parameters.
  const editing = req.query.editing === "true"; // Checks if the editing query parameter is true.

  // Finds the home by its ID in the database.
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing."); // Logs an error if the home is not found.
      return res.redirect("/host/host-home-list"); // Redirects to the host home list page.
    }

    console.log(homeId, editing, home); // Logs the home details for debugging.
    res.render("host/edit-home", {
      home: home, // Passes the home data to the view.
      pageTitle: "Edit your Home", // Sets the title of the page.
      currentPage: "host-homes", // Highlights the current page in the navigation.
      editing: editing, // Indicates that this is an edit operation.
    });
  });
};

// Renders the list of homes for the host.
exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes, // Passes the list of homes to the view.
      pageTitle: "Host Homes List", // Sets the title of the page.
      currentPage: "host-homes", // Highlights the current page in the navigation.
    });
  });
};

// Handles the addition of a new home.
exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } = req.body; // Extracts the home details from the request body.
  const home = new Home({
    houseName, // Sets the house name.
    price, // Sets the price.
    location, // Sets the location.
    rating, // Sets the rating.
    photoUrl, // Sets the photo URL.
    description, // Sets the description.
  });
  home.save().then(() => {
    console.log("Home Saved successfully"); // Logs a success message.
  });

  res.redirect("/host/host-home-list"); // Redirects to the host home list page.
};

// Handles the editing of an existing home.
exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } = req.body; // Extracts the updated home details from the request body.
  Home.findById(id).then((home) => {
    home.houseName = houseName; // Updates the house name.
    home.price = price; // Updates the price.
    home.location = location; // Updates the location.
    home.rating = rating; // Updates the rating.
    home.photoUrl = photoUrl; // Updates the photo URL.
    home.description = description; // Updates the description.
    home.save().then((result) => {
      console.log("Home updated ", result); // Logs a success message.
    }).catch(err => {
      console.log("Error while updating ", err); // Logs an error message if the update fails.
    })
    res.redirect("/host/host-home-list"); // Redirects to the host home list page.
  }).catch(err => {
    console.log("Error while finding home ", err); // Logs an error message if the home is not found.
  });
};

// Handles the deletion of a home.
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId; // Extracts the home ID from the request parameters.
  console.log("Came to delete ", homeId); // Logs the home ID for debugging.
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list"); // Redirects to the host home list page after deletion.
    })
    .catch((error) => {
      console.log("Error while deleting ", error); // Logs an error message if the deletion fails.
    });
};