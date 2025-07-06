// Importing mongoose to define the schema for the Home model.
const mongoose = require("mongoose");

// Importing the User model to handle related operations.
const User = require("./user");

// Defining the schema for the Home model.
const homeSchema = mongoose.Schema({
  houseName: { // Field to store the name of the house.
    type: String, // Specifies the data type as String.
    required: true // Ensures that houseName is mandatory.
  },
  price: { // Field to store the price of the house.
    type: Number, // Specifies the data type as Number.
    required: true // Ensures that price is mandatory.
  },
  location: { // Field to store the location of the house.
    type: String, // Specifies the data type as String.
    required: true // Ensures that location is mandatory.
  },
  rating: { // Field to store the rating of the house.
    type: Number, // Specifies the data type as Number.
    required: true // Ensures that rating is mandatory.
  },
  photo: String, // Optional field to store the URL of the house's photo.
  description: String, // Optional field to store additional details about the house.
});

// Updating the pre-hook to remove the homeId from the favourites array in the User model.
homeSchema.pre('findOneAndDelete', async function(next) {
  const homeId = this.getQuery()._id; // Retrieves the ID of the home being deleted.
  await User.updateMany(
    { favourites: homeId }, // Find users with the homeId in their favourites array.
    { $pull: { favourites: homeId } } // Remove the homeId from the favourites array.
  );
  next(); // Proceeds to the next middleware or operation.
});

// Exporting the Home model to use it in other parts of the application.
module.exports = mongoose.model('Home', homeSchema);