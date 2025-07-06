// Importing the Favourite model to interact with the 'favourites' collection in the database.
const Favourite = require("../models/favourite");
// Importing the Home model to interact with the 'homes' collection in the database.
const Home = require("../models/home");

// Renders the index page with a list of all registered homes.
exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes, // Passes the list of homes to the view.
      pageTitle: "airbnb Home", // Sets the title of the page.
      currentPage: "index", // Highlights the current page in the navigation.
    });
  });
};

// Renders the page with a list of all homes.
exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes, // Passes the list of homes to the view.
      pageTitle: "Homes List", // Sets the title of the page.
      currentPage: "Home", // Highlights the current page in the navigation.
    });
  });
};

// Renders the bookings page.
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings", // Sets the title of the page.
    currentPage: "bookings", // Highlights the current page in the navigation.
  });
};

// Renders the favourite list page with all favourite homes.
exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
  .populate('houseId') // Populates the houseId field with data from the Home model.
  .then((favourites) => {
    const favouriteHomes = favourites.map((fav) => fav.houseId); // Extracts the home details from the favourites.
    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes, // Passes the list of favourite homes to the view.
      pageTitle: "My Favourites", // Sets the title of the page.
      currentPage: "favourites", // Highlights the current page in the navigation.
    });
  });
};

// Handles adding a home to the favourites list.
exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id; // Extracts the home ID from the request body.
  Favourite.findOne({houseId: homeId}).then((fav) => {
    if (fav) {
      console.log("Already marked as favourite"); // Logs a message if the home is already a favourite.
    } else {
      fav = new Favourite({houseId: homeId}); // Creates a new Favourite document.
      fav.save().then((result) => {
        console.log("Fav added: ", result); // Logs a success message.
      });
    }
    res.redirect("/favourites"); // Redirects to the favourites page.
  }).catch(err => {
    console.log("Error while marking favourite: ", err); // Logs an error message if the operation fails.
  });
};

// Handles removing a home from the favourites list.
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId; // Extracts the home ID from the request parameters.
  Favourite.findOneAndDelete({houseId: homeId})
    .then((result) => {
      console.log("Fav Removed: ", result); // Logs a success message.
    })
    .catch((err) => {
      console.log("Error while removing favourite: ", err); // Logs an error message if the operation fails.
    })
    .finally(() => {
      res.redirect("/favourites"); // Redirects to the favourites page.
    });
};

// Renders the details page for a specific home.
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId; // Extracts the home ID from the request parameters.
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found"); // Logs an error message if the home is not found.
      res.redirect("/homes"); // Redirects to the homes page.
    } else {
      res.render("store/home-detail", {
        home: home, // Passes the home data to the view.
        pageTitle: "Home Detail", // Sets the title of the page.
        currentPage: "Home", // Highlights the current page in the navigation.
      });
    }
  });
};