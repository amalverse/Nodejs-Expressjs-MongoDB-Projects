// Importing the 'Home' model from the 'models' directory to interact with home data
const Home = require("../models/home");

// Controller function to render the 'Add Home' page
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb", // Title of the page
    currentPage: "addHome", // Current page identifier
    editing: false, // Indicates that this is not an edit operation
  });
};

// Controller function to render the 'Edit Home' page
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId; // Extracting the home ID from the request parameters
  const editing = req.query.editing === 'true'; // Checking if the editing query parameter is true
  Home.findById(homeId, home => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list"); // Redirecting if the home is not found
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home, // Passing the home data to the view
      pageTitle: "Edit your Home", // Title of the page
      currentPage: "host-homes", // Current page identifier
      editing: editing, // Indicates that this is an edit operation
    });
  });
};

// Controller function to render the list of homes for the host
exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes, // List of homes to display
      pageTitle: "Host Homes List", // Title of the page
      currentPage: "host-homes", // Current page identifier
    });
  });
};

// Controller function to handle adding a new home
exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body; // Extracting data from the request body
  const home = new Home(houseName, price, location, rating, photoUrl); // Creating a new Home instance
  home.save(); // Saving the home data
  res.render("host/home-added", {
    pageTitle: "Home Added Successfully", // Title of the page
    currentPage: "homeAdded", // Current page identifier
  });
};

// Controller function to handle editing an existing home
exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body; // Extracting data from the request body
  const updatedHome = new Home(houseName, price, location, rating, photoUrl); // Creating an updated Home instance
  updatedHome.id = id; // Setting the ID of the home to update
  updatedHome.save(); // Saving the updated home data
  res.redirect("/host/host-home-list"); // Redirecting to the host home list
};

// Controller function to handle deleting a home
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId; // Extracting the home ID from the request parameters
  console.log('Came to delete ', homeId);
  Home.deleteById(homeId, error => {
    if (error) {
      console.log('Error while deleting ', error);
    }
    res.redirect("/host/host-home-list"); // Redirecting to the host home list
  });
};