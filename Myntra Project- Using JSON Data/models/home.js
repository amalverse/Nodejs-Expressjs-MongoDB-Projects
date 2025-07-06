// Importing the 'fs' module from Node.js core modules to work with the file system
const fs = require("fs");

// Importing the 'path' module from Node.js core modules to work with file and directory paths
const path = require("path");

// Importing the 'rootDir' utility from the 'utils' directory to get the root directory of the project
const rootDir = require("../utils/pathUtil");

// Importing the 'Favourite' model to manage favourite data
const Favourite = require("./favourite");

// Defining the path to the 'homes.json' file where home data is stored
const homeDataPath = path.join(rootDir, "data", "homes.json");

// Defining the 'Home' class to manage home data
module.exports = class Home {
  // Constructor to initialize a new Home instance
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName; // Name of the house
    this.price = price; // Price of the house
    this.location = location; // Location of the house
    this.rating = rating; // Rating of the house
    this.photoUrl = photoUrl; // URL of the house photo
  }

  // Method to save a new or updated home to the data file
  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        // If the home has an ID, update the existing home
        registeredHomes = registeredHomes.map(home => 
          home.id === this.id ? this : home);
      } else {
        // If the home does not have an ID, add it as a new home
        this.id = Math.random().toString(); // Generate a random ID
        registeredHomes.push(this);
      }
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error); // Log any errors
      });
    });
  }

  // Static method to fetch all homes from the data file
  static fetchAll(callback) {
    fs.readFile(homeDataPath, (error, data) => {
      console.log("File Reading concluded", error); // Log any errors
      callback(!error ? JSON.parse(data) : []); // Return the parsed data or an empty array if an error occurs
    });
  }

  // Static method to find a home by its ID
  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId); // Find the home with the matching ID
      callback(homeFound); // Return the found home
    });
  }

  // Static method to delete a home by its ID
  static deleteById(homeId, callback) {
    this.fetchAll(homes => {
      homes = homes.filter(home => home.id !== homeId); // Filter out the home to delete
      fs.writeFile(homeDataPath, JSON.stringify(homes), error => {
        Favourite.deleteById(homeId, callback); // Delete the home from favourites as well
      });
    });
  }
};


