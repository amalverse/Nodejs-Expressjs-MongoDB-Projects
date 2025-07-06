// Importing the Home model from the models directory. This model interacts with the database to perform CRUD operations on homes.
const Home = require("../models/home");

// Importing the file system module to handle file operations.
const fs = require("fs");
// Controller to render the Add Home page.
exports.getAddHome = (req, res, next) => {
  // Rendering the 'edit-home' view with the following parameters:
  // - pageTitle: Title of the page.
  // - currentPage: Identifier for the current page.
  // - editing: Indicates whether the form is for editing or adding a new home.
  // - isLoggedIn: Boolean indicating if the user is logged in (comes from session middleware).
  // - user: The current logged-in user's session data.
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn, 
    user: req.session.user,
  });
};

// Controller to render the Edit Home page.
exports.getEditHome = (req, res, next) => {
  // Extracting the homeId from the request parameters.
  const homeId = req.params.homeId;
  // Extracting the 'editing' query parameter and converting it to a boolean.
  const editing = req.query.editing === "true";

  // Finding the home in the database by its ID.
  Home.findById(homeId).then((home) => {
    // If the home is not found, log a message and redirect to the host home list page.
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    // Logging the homeId, editing flag, and the home data for debugging purposes.
    console.log(homeId, editing, home);
    // Rendering the 'edit-home' view with the home data and other parameters.
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
      isLoggedIn: req.isLoggedIn, 
      user: req.session.user,
    });
  });
};

// Controller to render the Host Homes List page.
exports.getHostHomes = (req, res, next) => {
  // Fetching all registered homes from the database.
  Home.find().then((registeredHomes) => {
    // Rendering the 'host-home-list' view with the list of homes and other parameters.
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn, 
      user: req.session.user,
    });
  });
};

// Controller to handle adding a new home.
exports.postAddHome = (req, res, next) => {
  // Destructuring the home details from the request body.
  const { houseName, price, location, rating, description } = req.body;
  console.log(houseName, price, location, rating, description);
  console.log(req.file);

  // Checking if a file is uploaded in the request.
  if (!req.file) {
    return res.status(422).send("No image provided"); // Sending a response if no file is uploaded.
  }

  // Extracting the file path of the uploaded image.
  const photo = req.file.path; // Storing the file path in the 'photo' variable.

  // Creating a new Home instance with the provided details.
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photo,
    description,
  });
  // Saving the new home to the database.
  home.save().then(() => {
    console.log("Home Saved successfully");
  });

  // Redirecting to the Host Homes List page after saving.
  res.redirect("/host/host-home-list");
};

// Controller to handle editing an existing home.
exports.postEditHome = (req, res, next) => {
  // Destructuring the home details and ID from the request body.
  const { id, houseName, price, location, rating, description } = req.body;
  // Finding the home in the database by its ID.
  Home.findById(id).then((home) => {
    // Updating the home details with the new values.
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.description = description;
    
    // Deleting the old photo file if a new file is uploaded during editing.
    if (req.file) {
      fs.unlink(home.photo, (err) => {
        if (err) {
          console.log("Error while deleting file ", err); // Logging an error if file deletion fails.
        }
      });
      home.photo = req.file.path; // Updating the photo path with the new file's path.
    }
    // Saving the updated home to the database.
    home.save().then((result) => {
      console.log("Home updated ", result);
    }).catch(err => {
      console.log("Error while updating ", err);
    });
    // Redirecting to the Host Homes List page after updating.
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error while finding home ", err);
  });
};

// Controller to handle deleting a home.
exports.postDeleteHome = (req, res, next) => {
  // Extracting the homeId from the request parameters.
  const homeId = req.params.homeId;
  // Logging the homeId for debugging purposes.
  console.log("Came to delete ", homeId);
  // Deleting the home from the database by its ID.
  Home.findByIdAndDelete(homeId)
    .then(() => {
      // Redirecting to the Host Homes List page after deletion.
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
    });
};