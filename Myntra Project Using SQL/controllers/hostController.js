// Importing the 'Home' model from the 'models' folder to interact with the 'homes' database table
const Home = require("../models/home");

// Exporting a function to render the 'Add Home' page
exports.getAddHome = (req, res, next) => {
  // Rendering the 'edit-home' EJS template for adding a new home
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb", // Setting the page title
    currentPage: "addHome", // Indicating the current page for navigation
    editing: false, // Specifying that this is not an edit operation
  });
};

// Exporting a function to render the 'Edit Home' page
exports.getEditHome = (req, res, next) => {
  // Extracting the 'homeId' parameter from the request URL
  const homeId = req.params.homeId;

  // Checking if the 'editing' query parameter is set to 'true'
  const editing = req.query.editing === 'true';

  // Fetching the home details from the database using the 'Home' model
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0]; // Extracting the first home from the result

    // Redirecting to the home list page if the home is not found
    if (!home) {
      return res.redirect("/host/host-home-list");
    }

    // Rendering the 'edit-home' EJS template with the home details for editing
    res.render("host/edit-home", {
      pageTitle: "Edit Home", // Setting the page title
      currentPage: "editHome", // Indicating the current page for navigation
      editing: true, // Specifying that this is an edit operation
      home: home, // Passing the home details to the template
    });
  });
};

// Exporting a function to render the 'Host Homes' list page
exports.getHostHomes = (req, res, next) => {
  // Fetching all registered homes from the database using the 'Home' model
  Home.fetchAll().then(([registeredHomes]) => {
    // Rendering the 'host-home-list' EJS template with the list of registered homes
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes, // Passing the list of registered homes to the template
      pageTitle: "Host Homes List", // Setting the page title
      currentPage: "host-homes", // Indicating the current page for navigation
    });
  });
};

// Exporting a function to handle the 'Add Home' form submission
exports.postAddHome = (req, res, next) => {
  // Extracting home details from the request body
  const { houseName, price, location, rating, photoUrl, description } = req.body;

  // Creating a new 'Home' instance with the extracted details
  const home = new Home(houseName, price, location, rating, photoUrl, description);

  // Saving the new home to the database
  home.save();

  // Redirecting to the 'Host Homes List' page after successful addition
  res.redirect("/host/host-home-list");
};

// Exporting a function to handle the 'Edit Home' form submission
exports.postEditHome = (req, res, next) => {
  // Extracting home details and the home ID from the request body
  const { id, houseName, price, location, rating, photoUrl, description } = req.body;

  // Creating a new 'Home' instance with the extracted details and the home ID
  const home = new Home(houseName, price, location, rating, photoUrl, description, id);

  // Saving the updated home details to the database
  home.save();

  // Redirecting to the 'Host Homes List' page after successful update
  res.redirect("/host/host-home-list");
};

// Exporting a function to handle the 'Delete Home' request
exports.postDeleteHome = (req, res, next) => {
  // Extracting the 'homeId' parameter from the request URL
  const homeId = req.params.homeId;

  // Deleting the home from the database using the 'Home' model
  Home.deleteById(homeId).then(() => {
    // Redirecting to the 'Host Homes List' page after successful deletion
    res.redirect("/host/host-home-list");
  }).catch(error => {
    // Logging any errors that occur during the deletion process
    console.log('Error while deleting ', error);
  });
};