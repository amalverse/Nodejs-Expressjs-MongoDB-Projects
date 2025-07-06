// Importing the 'fs' module from Node.js core modules to work with the file system
const fs = require("fs");

// Importing the 'path' module from Node.js core modules to work with file and directory paths
const path = require("path");

// Importing the 'rootDir' utility from the 'utils' directory to get the root directory of the project
const rootDir = require("../utils/pathUtil");

// Defining the path to the 'favourite.json' file where favourite data is stored
const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

// Defining the 'Favourite' class to manage favourite data
module.exports = class Favourite {

  // Static method to add a home to the favourites list
  static addToFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home is already marked favourite"); // Error if the home is already a favourite
      } else {
        favourites.push(homeId); // Adding the home ID to the favourites list
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback); // Writing the updated list to the file
      }
    });
  }

  // Static method to retrieve the list of favourite homes
  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []); // Returning the parsed data or an empty array if an error occurs
    });
  }

  // Static method to delete a home from the favourites list
  static deleteById(delHomeId, callback) {
    Favourite.getFavourites(homeIds => {
      homeIds = homeIds.filter(homeId => delHomeId !== homeId); // Filtering out the home to delete
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback); // Writing the updated list to the file
    });
  }
};