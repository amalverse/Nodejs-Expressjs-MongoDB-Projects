// Importing mongoose to define the schema for the Favourite model.
const mongoose = require('mongoose');

// Defining the schema for the Favourite model.
const favouriteSchema = mongoose.Schema({
  // houseId is a reference to the Home model, ensuring a relationship between Favourite and Home.
  houseId: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId type to reference another document.
    ref: 'Home', // Refers to the 'Home' model.
    required: true, // Ensures that houseId is mandatory.
    unique: true // Ensures that each houseId is unique in the Favourite collection.
  }
});

// Exporting the Favourite model to use it in other parts of the application.
module.exports = mongoose.model('Favourite', favouriteSchema);