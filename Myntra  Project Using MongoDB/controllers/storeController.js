// Importing the 'Favourite' model from the 'models/favourite.js' file.
const Favourite = require("../models/favourite");
// Importing the 'Home' model from the 'models/home.js' file.
const Home = require("../models/home");

// This function fetches all registered homes and renders the homepage.
exports.getIndex = (req, res, next) => {
  // Calls the 'fetchAll' method of the 'Home' model to get all homes.
  Home.fetchAll().then((registeredHomes) => {
    // Renders the 'index.ejs' view file located in the 'views/store' folder.
    res.render("store/index", {
      // Passes the list of homes to the view.
      registeredHomes: registeredHomes,
      // Sets the title of the page.
      pageTitle: "airbnb Home",
      // Indicates the current page for navigation purposes.
      currentPage: "index",
    });
  });
};

// This function fetches all registered homes and renders a list of homes.
exports.getHomes = (req, res, next) => {
  // Calls the 'fetchAll' method of the 'Home' model to get all homes.
  Home.fetchAll().then((registeredHomes) => {
    // Renders the 'home-list.ejs' view file located in the 'views/store' folder.
    res.render("store/home-list", {
      // Passes the list of homes to the view.
      registeredHomes: registeredHomes,
      // Sets the title of the page.
      pageTitle: "Homes List",
      // Indicates the current page for navigation purposes.
      currentPage: "Home",
    });
  });
};

// This function renders the bookings page.
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    // Sets the title of the page.
    pageTitle: "My Bookings",
    // Indicates the current page for navigation purposes.
    currentPage: "bookings",
  });
};

// This function fetches the list of favourite homes and renders the favourite list page.
exports.getFavouriteList = (req, res, next) => {
  // Calls the 'getFavourites' method of the 'Favourite' model to get all favourite homes.
  Favourite.getFavourites().then(favourites => {
    // Maps the list of favourite homes to their house IDs.
    favourites = favourites.map(fav => fav.houseId);
    // Calls the 'fetchAll' method of the 'Home' model to get all homes.
    Home.fetchAll().then(registeredHomes => {
      console.log(favourites, registeredHomes);
      // Filters the list of homes to include only the favourite homes.
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      // Renders the 'favourite-list.ejs' view file located in the 'views/store' folder.
      res.render("store/favourite-list", {
        // Passes the list of favourite homes to the view.
        favouriteHomes: favouriteHomes,
        // Sets the title of the page.
        pageTitle: "My Favourites",
        // Indicates the current page for navigation purposes.
        currentPage: "favourites",
      });
    });
  });
};

// This function adds a home to the list of favourite homes.
exports.postAddToFavourite = (req, res, next) => {
  // Gets the home ID from the request body.
  const homeId = req.body.id;
  // Creates a new 'Favourite' object with the home ID.
  const fav = new Favourite(homeId);
  // Saves the favourite home to the database.
  fav.save().then(result => {
    console.log('Fav added: ', result);
  }).catch(err => {
    console.log("Error while marking favourite: ", err);
  }).finally(() => {
    // Redirects to the favourite list page.
    res.redirect("/favourites");
  })
};

// This function removes a home from the list of favourite homes.
exports.postRemoveFromFavourite = (req, res, next) => {
  // Gets the home ID from the request parameters.
  const homeId = req.params.homeId;
  // Calls the 'deleteById' method of the 'Favourite' model to remove the favourite home.
  Favourite.deleteById(homeId).then(result => {
    console.log('Fav Removed: ', result);
  }).catch(err => {
    console.log("Error while removing favourite: ", err);
  }).finally(() => {
    // Redirects to the favourite list page.
    res.redirect("/favourites");
  });
};

// This function fetches the details of a specific home and renders the home detail page.
exports.getHomeDetails = (req, res, next) => {
  // Gets the home ID from the request parameters.
  const homeId = req.params.homeId;
  // Calls the 'findById' method of the 'Home' model to get the home details.
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      // Redirects to the homes list page if the home is not found.
      res.redirect("/homes");
    } else {
      // Renders the 'home-detail.ejs' view file located in the 'views/store' folder.
      res.render("store/home-detail", {
        // Passes the home details to the view.
        home: home,
        // Sets the title of the page.
        pageTitle: "Home Detail",
        // Indicates the current page for navigation purposes.
        currentPage: "Home",
      });
    }
  });
};