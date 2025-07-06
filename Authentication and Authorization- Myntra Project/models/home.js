// Importing mongoose to define the schema for the Home model.
const mongoose = require("mongoose");

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
  photoUrl: String, // Optional field to store the URL of the house's photo.
  description: String, // Optional field to store additional details about the house.
});

// Adding a pre-hook to the schema to perform actions before deleting a Home document.
homeSchema.pre('findOneAndDelete', async function(next) {
  const homeId = this.getQuery()._id; // Retrieves the ID of the home being deleted.
  await favourite.deleteMany({houseId: homeId}); // Deletes all Favourite documents associated with the home being deleted.
  next(); // Proceeds to the next middleware or operation.
});

// Exporting the Home model to use it in other parts of the application.
module.exports = mongoose.model('Home', homeSchema);