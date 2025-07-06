// Importing the 'Home' model from the 'models/home.js' file.
const Home = require("../models/home");

// This function renders a form for adding a new home.
exports.getAddHome = (req, res, next) => {
  // Renders the 'edit-home.ejs' view file located in the 'views/host' folder.
  res.render("host/edit-home", {
    // Sets the title of the page.
    pageTitle: "Add Home to airbnb",
    // Indicates the current page for navigation purposes.
    currentPage: "addHome",
    // Indicates that the form is not in editing mode.
    editing: false,
  });
};

// This function fetches a home by its ID and renders a form to edit it.
exports.getEditHome = (req, res, next) => {
  // Extracts the home ID from the request parameters.
  const homeId = req.params.homeId;
  // Checks if the 'editing' query parameter is set to 'true'.
  const editing = req.query.editing === 'true';

  // Finds the home in the database using the 'Home' model.
  Home.findById(homeId).then(home => {
    // If the home is not found, logs a message and redirects to the home list page.
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    // Logs the home ID, editing status, and home details for debugging purposes.
    console.log(homeId, editing, home);
    // Renders the 'edit-home.ejs' view file located in the 'views/host' folder.
    res.render("host/edit-home", {
      // Passes the home details to the view.
      home: home,
      // Sets the title of the page.
      pageTitle: "Edit your Home",
      // Indicates the current page for navigation purposes.
      currentPage: "host-homes",
      // Indicates that the form is in editing mode.
      editing: editing,
    });
  });
};

// This function fetches all registered homes and renders a list of them.
exports.getHostHomes = (req, res, next) => {
  // Fetches all homes from the database using the 'Home' model.
  Home.fetchAll().then(registeredHomes => {
    // Renders the 'host-home-list.ejs' view file located in the 'views/host' folder.
    res.render("host/host-home-list", {
      // Passes the list of registered homes to the view.
      registeredHomes: registeredHomes,
      // Sets the title of the page.
      pageTitle: "Host Homes List",
      // Indicates the current page for navigation purposes.
      currentPage: "host-homes",
    })
  });
};

// This function handles the form submission for adding a new home.
exports.postAddHome = (req, res, next) => {
  // Extracts the home details from the request body.
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  // Creates a new 'Home' instance with the extracted details.
  const home = new Home(houseName, price, location, rating, photoUrl, description);
  // Saves the new home to the database.
  home.save().then(() => {
    // Logs a success message.
    console.log('Home Saved successfully');
  });

  // Redirects to the host home list page.
  res.redirect("/host/host-home-list");
};

// This function handles the form submission for editing an existing home.
exports.postEditHome = (req, res, next) => {
  // Extracts the home details and ID from the request body.
  const { id, houseName, price, location, rating, photoUrl, description } = req.body;
  // Creates a new 'Home' instance with the extracted details and ID.
  const home = new Home(houseName, price, location, rating, photoUrl, description, id);
  // Saves the updated home to the database.
  home.save().then(result => {
    // Logs a success message with the result.
    console.log('Home updated ', result);
  });
  // Redirects to the host home list page.
  res.redirect("/host/host-home-list");
};

// This function handles the deletion of a home.
exports.postDeleteHome = (req, res, next) => {
  // Extracts the home ID from the request parameters.
  const homeId = req.params.homeId;
  // Logs the home ID for debugging purposes.
  console.log('Came to delete ', homeId);
  // Deletes the home from the database using the 'Home' model.
  Home.deleteById(homeId).then(() => {
    // Redirects to the host home list page.
    res.redirect("/host/host-home-list");
  }).catch(error => {
    // Logs an error message if the deletion fails.
    console.log('Error while deleting ', error);
  })
};