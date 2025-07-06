// Importing the 'getDB' function from the 'utils/databaseUtil.js' file.
const { getDB } = require("../utils/databaseUtil");

// Defining the 'Favourite' class to manage favorite homes.
module.exports = class Favourite {
  // Constructor initializes the 'houseId' property.
  constructor(houseId) {
    this.houseId = houseId;
  }

  // Saves the favorite home to the database.
  save() {
    // Gets the database instance using 'getDB'.
    const db = getDB();
    // Checks if the home is already in the favorites collection.
    return db.collection('favourites').findOne({houseId: this.houseId}).then(existingFav => {
      // If the home is not already a favorite, adds it to the collection.
      if (!existingFav) {
        return db.collection('favourites').insertOne(this);
      }
      // If the home is already a favorite, resolves the promise without making changes.
      return Promise.resolve();
    });
  }

  // Retrieves all favorite homes from the database.
  static getFavourites() {
    // Gets the database instance using 'getDB'.
    const db = getDB();
    // Fetches all documents from the 'favourites' collection and returns them as an array.
    return db.collection('favourites').find().toArray();
  }

  // Deletes a favorite home from the database by its 'houseId'.
  static deleteById(delHomeId) {
    // Gets the database instance using 'getDB'.
    const db = getDB();
    // Deletes the document with the specified 'houseId' from the 'favourites' collection.
    return db.collection('favourites').deleteOne({houseId: delHomeId});
  }
};