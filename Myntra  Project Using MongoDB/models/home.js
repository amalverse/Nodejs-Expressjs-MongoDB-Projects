// Importing the 'ObjectId' class from the 'mongodb' package.
const { ObjectId } = require('mongodb');
// Importing the 'getDB' function from the 'utils/databaseUtil.js' file.
const { getDB } = require('../utils/databaseUtil');

// Defining the 'Home' class to manage home data.
module.exports = class Home {
  // Constructor initializes the properties of a home.
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    // If an ID is provided, assigns it to the '_id' property.
    if (_id) {
      this._id = _id;
    }
  }

  // Saves a new home or updates an existing one in the database.
  save() {
    // Gets the database instance using 'getDB'.
    const db = getDB();
    // If the home has an ID, updates the existing document.
    if (this._id) {
      const updateFields = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description
      };
      return db.collection('homes').updateOne({ _id: new ObjectId(this._id) }, { $set: updateFields });
    } else {
      // If the home does not have an ID, inserts a new document.
      return db.collection('homes').insertOne(this);
    }
  }

  // Fetches all homes from the database.
  static fetchAll() {
    // Gets the database instance using 'getDB'.
    const db = getDB();
    // Fetches all documents from the 'homes' collection and returns them as an array.
    return db.collection('homes').find().toArray();
  }

  // Finds a home by its ID.
  static findById(homeId) {
    // Gets the database instance using 'getDB'.
    const db = getDB();
    // Finds a document in the 'homes' collection with the specified ID.
    return db.collection('homes').findOne({ _id: new ObjectId(homeId) });
  }

  // Deletes a home by its ID.
  static deleteById(homeId) {
    // Gets the database instance using 'getDB'.
    const db = getDB();
    // Deletes a document in the 'homes' collection with the specified ID.
    return db.collection('homes').deleteOne({ _id: new ObjectId(homeId) });
  }
};