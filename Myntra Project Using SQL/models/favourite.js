// Importing the 'fs' module from Node.js core modules to work with the file system
const fs = require("fs");

// Importing the 'path' module from Node.js core modules to work with file and directory paths
const path = require("path");

// Importing the 'rootDir' utility from the 'utils' folder to get the root directory of the project
const rootDir = require("../utils/pathUtil");

// Defining the path to the 'favourite.json' file where favourite data is stored
const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

// Defining the 'Favourite' class to manage favourite homes
module.exports = class Favourite {

  // Static method to add a home to the favourites list
  static addToFavourite(homeId, callback) {
    // Fetching the current list of favourites
    Favourite.getFavourites((favourites) => {
      // Checking if the home is already in the favourites list
      if (favourites.includes(homeId)) {
        // If the home is already a favourite, invoke the callback with an error message
        callback("Home is already marked favourite");
      } else {
        // If the home is not a favourite, add it to the list
        favourites.push(homeId);
        // Write the updated favourites list to the 'favourite.json' file
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  // Static method to fetch the list of favourite homes
  static getFavourites(callback) {
    // Reading the 'favourite.json' file to get the favourites list
    fs.readFile(favouriteDataPath, (err, data) => {
      // If there is no error, parse the data and pass it to the callback
      // Otherwise, pass an empty array to the callback
      callback(!err ? JSON.parse(data) : []);
    });
  }

  // Static method to delete a home from the favourites list by its ID
  static deleteById(delHomeId, callback) {
    // Fetching the current list of favourites
    Favourite.getFavourites(homeIds => {
      // Filtering out the home to be deleted from the list
      homeIds = homeIds.filter(homeId => delHomeId !== homeId);
      // Write the updated favourites list to the 'favourite.json' file
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback);
    });
  }
};