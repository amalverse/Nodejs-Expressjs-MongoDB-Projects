// Importing the 'Favourite' model from the 'models' folder to interact with the 'favourites' database table
const Favourite = require("../models/favourite");

// Importing the 'Home' model from the 'models' folder to interact with the 'homes' database table
const Home = require("../models/home");

// Exporting a function to render the home page
exports.getIndex = (req, res, next) => {
  // Fetching all registered homes from the database using the 'Home' model
  Home.fetchAll().then(([registeredHomes]) => {
    // Rendering the 'index' EJS template with the list of registered homes
    res.render("store/index", {
      registeredHomes: registeredHomes, // Passing the list of homes to the template
      pageTitle: "airbnb Home", // Setting the page title
      currentPage: "index", // Indicating the current page for navigation
    });
  });
};

// Exporting a function to render the homes list page
exports.getHomes = (req, res, next) => {
  // Fetching all registered homes from the database using the 'Home' model
  Home.fetchAll().then(([registeredHomes]) => {
    // Rendering the 'home-list' EJS template with the list of registered homes
    res.render("store/home-list", {
      registeredHomes: registeredHomes, // Passing the list of homes to the template
      pageTitle: "Homes List", // Setting the page title
      currentPage: "Home", // Indicating the current page for navigation
    });
  });
};

// Exporting a function to render the bookings page
exports.getBookings = (req, res, next) => {
  // Rendering the 'bookings' EJS template
  res.render("store/bookings", {
    pageTitle: "My Bookings", // Setting the page title
    currentPage: "bookings", // Indicating the current page for navigation
  });
};

// Exporting a function to render the favourite homes list page
exports.getFavouriteList = (req, res, next) => {
  // Fetching the list of favourite home IDs from the 'Favourite' model
  Favourite.getFavourites(favourites => {
    // Fetching all registered homes from the database using the 'Home' model
    Home.fetchAll().then(([registeredHomes]) => {
      // Filtering the registered homes to get only the favourite homes
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id.toString()));
      // Rendering the 'favourite-list' EJS template with the list of favourite homes
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes, // Passing the list of favourite homes to the template
        pageTitle: "My Favourites", // Setting the page title
        currentPage: "favourites", // Indicating the current page for navigation
      });
    });
  });
};

// Exporting a function to handle adding a home to the favourites list
exports.postAddToFavourite = (req, res, next) => {
  // Adding the home ID from the request body to the favourites list using the 'Favourite' model
  Favourite.addToFavourite(req.body.id, error => {
    if (error) {
      console.log("Error while marking favourite: ", error); // Logging any errors
    }
    res.redirect("/favourites"); // Redirecting to the favourites page
  });
};

// Exporting a function to handle removing a home from the favourites list
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId; // Getting the home ID from the request parameters
  // Deleting the home ID from the favourites list using the 'Favourite' model
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while removing from Favourite', error); // Logging any errors
    }
    res.redirect("/favourites"); // Redirecting to the favourites page
  });
};

// Exporting a function to render the home details page
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId; // Getting the home ID from the request parameters
  // Fetching the home details from the database using the 'Home' model
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0]; // Getting the first home from the result
    if (!home) {
      console.log("Home not found"); // Logging if the home is not found
      res.redirect("/homes"); // Redirecting to the homes list page
    } else {
      // Rendering the 'home-detail' EJS template with the home details
      res.render("store/home-detail", {
        home: home, // Passing the home details to the template
        pageTitle: "Home Detail", // Setting the page title
        currentPage: "Home", // Indicating the current page for navigation
      });
    }
  });
};