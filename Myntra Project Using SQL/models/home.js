// Importing the 'db' module from the 'utils' folder to manage database connections and queries
const db = require("../utils/database");

// Defining the 'Home' class to represent a home entity
module.exports = class Home {
  // Constructor to initialize the properties of a home
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName; // Name of the house
    this.price = price; // Price of the house
    this.location = location; // Location of the house
    this.rating = rating; // Rating of the house
    this.photoUrl = photoUrl; // URL of the house photo
    this.description = description; // Description of the house
    this.id = id; // Unique identifier for the house
  }

  // Method to save the home to the database
  save() {
    if (this.id) {
      // If the home has an ID, update the existing record in the database
      return db.execute('UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoUrl=?, description=? WHERE id=?', [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description, this.id]);
    } else {
      // If the home does not have an ID, insert a new record into the database
      return db.execute('INSERT INTO homes (houseName, price, location, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)', [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description]);
    }
  }

  // Method to fetch all homes from the database
  static fetchAll() {
    return db.execute('SELECT * FROM homes');
  }

  // Method to find a home by its ID
  static findById(homeId) {
    return db.execute('SELECT * FROM homes WHERE id=?', [homeId]);
  }

  // Method to delete a home by its ID
  static deleteById(homeId) {
    return db.execute('DELETE FROM homes WHERE id=?', [homeId]);
  }
};