// Importing the Home model from the models directory. This model interacts with the database to perform CRUD operations on homes.
const Home = require("../models/home");
// Importing the User model from the models directory. This model interacts with the database to manage user data.
const User = require("../models/user");

// Controller to render the main index page.
exports.getIndex = (req, res, next) => {
  // Logging the session data for debugging purposes.
  console.log("Session Value: ", req.session);
  // Fetching all registered homes from the database.
  Home.find().then((registeredHomes) => {
    // Rendering the 'index' view with the list of homes and other parameters.
    res.render("store/index", {
      registeredHomes: registeredHomes, // List of homes fetched from the database.
      pageTitle: "airbnb Home", // Title of the page.
      currentPage: "index", // Identifier for the current page.
      isLoggedIn: req.isLoggedIn, // Boolean indicating if the user is logged in (comes from session middleware).
      user: req.session.user, // The current logged-in user's session data.
    });
  });
};

// Controller to render the Homes List page.
exports.getHomes = (req, res, next) => {
  // Fetching all registered homes from the database.
  Home.find().then((registeredHomes) => {
    // Rendering the 'home-list' view with the list of homes and other parameters.
    res.render("store/home-list", {
      registeredHomes: registeredHomes, // List of homes fetched from the database.
      pageTitle: "Homes List", // Title of the page.
      currentPage: "Home", // Identifier for the current page.
      isLoggedIn: req.isLoggedIn, // Boolean indicating if the user is logged in.
      user: req.session.user, // The current logged-in user's session data.
    });
  });
};

// Controller to render the Bookings page.
exports.getBookings = (req, res, next) => {
  // Rendering the 'bookings' view with the following parameters:
  res.render("store/bookings", {
    pageTitle: "My Bookings", // Title of the page.
    currentPage: "bookings", // Identifier for the current page.
    isLoggedIn: req.isLoggedIn, // Boolean indicating if the user is logged in.
    user: req.session.user, // The current logged-in user's session data.
  });
};

// Controller to render the Favourite List page.
exports.getFavouriteList = async (req, res, next) => {
  // Extracting the user ID from the session data.
  const userId = req.session.user._id;
  // Fetching the user from the database and populating their favourites field.
  const user = await User.findById(userId).populate('favourites');
  // Rendering the 'favourite-list' view with the user's favourite homes and other parameters.
  res.render("store/favourite-list", {
    favouriteHomes: user.favourites, // List of favourite homes fetched from the database.
    pageTitle: "My Favourites", // Title of the page.
    currentPage: "favourites", // Identifier for the current page.
    isLoggedIn: req.isLoggedIn, // Boolean indicating if the user is logged in.
    user: req.session.user, // The current logged-in user's session data.
  });
};

// Controller to handle adding a home to the user's favourites.
exports.postAddToFavourite = async (req, res, next) => {
  // Extracting the home ID from the request body.
  const homeId = req.body.id;
  // Extracting the user ID from the session data.
  const userId = req.session.user._id;
  // Fetching the user from the database.
  const user = await User.findById(userId);
  // Checking if the home is not already in the user's favourites.
  if (!user.favourites.includes(homeId)) {
    // Adding the home ID to the user's favourites array.
    user.favourites.push(homeId);
    // Saving the updated user data to the database.
    await user.save();
  }
  // Redirecting to the Favourites page after adding.
  res.redirect("/favourites");
};

// Controller to handle removing a home from the user's favourites.
exports.postRemoveFromFavourite = async (req, res, next) => {
  // Extracting the home ID from the request parameters.
  const homeId = req.params.homeId;
  // Extracting the user ID from the session data.
  const userId = req.session.user._id;
  // Fetching the user from the database.
  const user = await User.findById(userId);
  // Checking if the home is in the user's favourites.
  if (user.favourites.includes(homeId)) {
    // Removing the home ID from the user's favourites array.
    user.favourites = user.favourites.filter(fav => fav != homeId);
    // Saving the updated user data to the database.
    await user.save();
  }
  // Redirecting to the Favourites page after removing.
  res.redirect("/favourites");
};

// Controller to render the Home Details page.
exports.getHomeDetails = (req, res, next) => {
  // Extracting the home ID from the request parameters.
  const homeId = req.params.homeId;
  // Fetching the home from the database by its ID.
  Home.findById(homeId).then((home) => {
    // If the home is not found, log a message and redirect to the Homes List page.
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      // Rendering the 'home-detail' view with the home data and other parameters.
      res.render("store/home-detail", {
        home: home, // The home data fetched from the database.
        pageTitle: "Home Detail", // Title of the page.
        currentPage: "Home", // Identifier for the current page.
        isLoggedIn: req.isLoggedIn, // Boolean indicating if the user is logged in.
        user: req.session.user, // The current logged-in user's session data.
      });
    }
  });
};