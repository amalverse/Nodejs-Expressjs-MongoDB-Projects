// Importing mongoose to define the schema for the Home model.
const mongoose = require("mongoose");
// Importing the Favourite model to interact with the 'favourites' collection.
const favourite = require('./favourite');

// Defining the schema for the Home model.
const homeSchema = mongoose.Schema({
  // houseName is a string field to store the name of the house.
  houseName: {
    type: String, // Specifies the data type as String.
    required: true // Ensures that houseName is mandatory.
  },
  // price is a number field to store the price of the house.
  price: {
    type: Number, // Specifies the data type as Number.
    required: true // Ensures that price is mandatory.
  },
  // location is a string field to store the location of the house.
  location: {
    type: String, // Specifies the data type as String.
    required: true // Ensures that location is mandatory.
  },
  // rating is a number field to store the rating of the house.
  rating: {
    type: Number, // Specifies the data type as Number.
    required: true // Ensures that rating is mandatory.
  },
  // photoUrl is an optional string field to store the URL of the house's photo.
  photoUrl: String,
  // description is an optional string field to store additional details about the house.
  description: String,
});

// Adding a pre-hook to the schema to perform actions before deleting a Home document.
homeSchema.pre('findOneAndDelete', async function(next) {
  // Logs a message to indicate the pre-hook is triggered.
  console.log('Came to pre hook while deleting a home');
  // Retrieves the ID of the home being deleted.
  const homeId = this.getQuery()._id;
  // Deletes all Favourite documents associated with the home being deleted.
  await favourite.deleteMany({houseId: homeId});
  // Proceeds to the next middleware or operation.
  next();
});

// Exporting the Home model to use it in other parts of the application.
module.exports = mongoose.model('Home', homeSchema);