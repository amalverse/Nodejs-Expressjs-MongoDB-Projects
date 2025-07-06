// Importing mongoose to define the schema for the Favourite model.
const mongoose = require('mongoose');

// Defining the schema for the Favourite model.
const favouriteSchema = mongoose.Schema({
  houseId: { // Field to store the ID of the house.
    type: mongoose.Schema.Types.ObjectId, // Specifies the data type as ObjectId.
    ref: 'Home', // Refers to the 'Home' model.
    required: true, // Ensures that houseId is mandatory.
    unique: true // Ensures that each houseId is unique in the Favourite collection.
  }
});

// Exporting the Favourite model to use it in other parts of the application.
module.exports = mongoose.model('Favourite', favouriteSchema);