// Importing the Favourite model to interact with the 'favourites' collection in the database.
// The Favourite model is defined in '../models/favourite' and represents the schema for favourite homes.
const Favourite = require("../models/favourite");

// Importing the Home model to interact with the 'homes' collection in the database.
// The Home model is defined in '../models/home' and represents the schema for homes.
const Home = require("../models/home");

// This function handles the GET request to display the store index page.
// It fetches all registered homes from the database and renders the 'store/index' view.
exports.getIndex = (req, res, next) => {
  // Fetches all homes from the database using the Home model.
  Home.find().then((registeredHomes) => {
    // Rendering the 'index' view located in the 'views/store' directory.
    res.render("store/index", {
      registeredHomes: registeredHomes, // Passes the list of homes to the view.
      pageTitle: "airbnb Home", // Sets the title of the page displayed in the browser.
      currentPage: "index", // Indicates the current page for navigation purposes.
      isLoggedIn: req.isLoggedIn, // Passes the login status of the user to the view.
    });
  });
};

// This function handles the GET request to display the list of homes.
// It fetches all registered homes from the database and renders the 'store/home-list' view.
exports.getHomes = (req, res, next) => {
  // Fetches all homes from the database using the Home model.
  Home.find().then((registeredHomes) => {
    // Rendering the 'home-list' view located in the 'views/store' directory.
    res.render("store/home-list", {
      registeredHomes: registeredHomes, // Passes the list of homes to the view.
      pageTitle: "Homes List", // Sets the title of the page displayed in the browser.
      currentPage: "Home", // Indicates the current page for navigation purposes.
      isLoggedIn: req.isLoggedIn, // Passes the login status of the user to the view.
    });
  });
};

// This function handles the GET request to display the bookings page.
// It renders the 'store/bookings' view.
exports.getBookings = (req, res, next) => {
  // Rendering the 'bookings' view located in the 'views/store' directory.
  res.render("store/bookings", {
    pageTitle: "My Bookings", // Sets the title of the page displayed in the browser.
    currentPage: "bookings", // Indicates the current page for navigation purposes.
    isLoggedIn: req.isLoggedIn, // Passes the login status of the user to the view.
  });
};

// This function handles the GET request to display the list of favourite homes.
// It fetches the favourite homes from the database and renders the 'store/favourite-list' view.
exports.getFavouriteList = (req, res, next) => {
  // Fetches all favourites from the database and populates the 'houseId' field with home details.
  Favourite.find()
    .populate('houseId') // Populates the 'houseId' field with the corresponding home document.
    .then((favourites) => {
      // Maps the favourites to extract the home details.
      const favouriteHomes = favourites.map((fav) => fav.houseId);
      // Rendering the 'favourite-list' view located in the 'views/store' directory.
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes, // Passes the list of favourite homes to the view.
        pageTitle: "My Favourites", // Sets the title of the page displayed in the browser.
        currentPage: "favourites", // Indicates the current page for navigation purposes.
        isLoggedIn: req.isLoggedIn, // Passes the login status of the user to the view.
      });
    });
};

// This function handles the POST request to add a home to the favourites list.
exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id; // Extracts the home ID from the request body.

  // Checks if the home is already marked as favourite.
  Favourite.findOne({ houseId: homeId }).then((fav) => {
    if (fav) {
      console.log("Already marked as favourite"); // Logs a message if the home is already a favourite.
    } else {
      // Creates a new Favourite instance with the home ID.
      fav = new Favourite({ houseId: homeId });
      // Saves the new favourite to the database.
      fav.save().then((result) => {
        console.log("Fav added: ", result); // Logs a success message to the console.
      });
    }
    // Redirects the user to the favourites page after adding.
    res.redirect("/favourites");
  }).catch(err => {
    console.log("Error while marking favourite: ", err); // Logs an error message if the operation fails.
  });
};

// This function handles the POST request to remove a home from the favourites list.
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId; // Extracts the home ID from the request parameters.

  // Deletes the favourite by its home ID from the database.
  Favourite.findOneAndDelete({ houseId: homeId })
    .then((result) => {
      console.log("Fav Removed: ", result); // Logs a success message to the console.
    })
    .catch((err) => {
      console.log("Error while removing favourite: ", err); // Logs an error message if the operation fails.
    })
    .finally(() => {
      // Redirects the user to the favourites page after deletion.
      res.redirect("/favourites");
    });
};

// This function handles the GET request to display the details of a specific home.
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId; // Extracts the home ID from the request parameters.

  // Finds the home by its ID in the database using the Home model.
  Home.findById(homeId).then((home) => {
    if (!home) { // If the home is not found, redirects to the homes list page.
      console.log("Home not found"); // Logs a message if the home is not found.
      res.redirect("/homes");
    } else {
      // Rendering the 'home-detail' view located in the 'views/store' directory.
      res.render("store/home-detail", {
        home: home, // Passes the home details to the view.
        pageTitle: "Home Detail", // Sets the title of the page displayed in the browser.
        currentPage: "Home", // Indicates the current page for navigation purposes.
        isLoggedIn: req.isLoggedIn, // Passes the login status of the user to the view.
      });
    }
  });
};