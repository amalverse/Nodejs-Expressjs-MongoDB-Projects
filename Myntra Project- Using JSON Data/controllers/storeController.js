// Importing the 'Home' model from the 'models' directory to interact with home data
const Home = require("../models/home");

// Importing the 'Favourite' model from the 'models' directory to interact with favourite data
const Favourite = require("../models/favourite");

// Controller function to render the index page with all homes
exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes, // List of all homes to display
      pageTitle: "All Homes", // Title of the page
      currentPage: "Index", // Current page identifier
    });
  });
};

// Controller function to render the list of homes
exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes, // List of homes to display
      pageTitle: "Homes List", // Title of the page
      currentPage: "Home", // Current page identifier
    });
  });
};

// Controller function to render the bookings page
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings", // Title of the page
    currentPage: "bookings", // Current page identifier
  });
};

// Controller function to render the favourite list page
exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favourites) => {
    console.log("Favourites: ", favourites);
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id)); // Filtering homes marked as favourites
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes, // List of favourite homes to display
        pageTitle: "My Favourite List", // Title of the page
        currentPage: "favourites", // Current page identifier
      });
    });
  });
};

// Controller function to handle adding a home to favourites
exports.postAddToFavourite = (req, res, next) => {
  console.log("Came to add to Favourite", req.body);
  Favourite.addToFavourite(req.body.id, error => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favourites"); // Redirecting to the favourites page
  });
};

// Controller function to handle removing a home from favourites
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while removing from Favourite', error);
    }
    res.redirect("/favourites"); // Redirecting to the favourites page
  });
};

// Controller function to render the details of a specific home
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, home => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes"); // Redirecting to the homes list page if home not found
    } else {
      res.render("store/home-detail", {
        home: home, // Home details to display
        pageTitle: "Home Detail", // Title of the page
        currentPage: "Home", // Current page identifier
      });
    }
  });
};
