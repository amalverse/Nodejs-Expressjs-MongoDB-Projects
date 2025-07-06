// Importing mongoose to define the schema for the User model.
const mongoose = require('mongoose');

// Defining the schema for the User model.
const userSchema = mongoose.Schema({
  firstName: { // Field to store the first name of the user.
    type: String, // Specifies the data type as String.
    required: [true, 'First name is required'] // Ensures that firstName is mandatory with a custom error message.
  },
  lastName: { // Field to store the last name of the user.
    type: String // Specifies the data type as String.
  },
  email: { // Field to store the email address of the user.
    type: String, // Specifies the data type as String.
    required: [true, 'Email is required'], // Ensures that email is mandatory with a custom error message.
    unique: true // Ensures that each email is unique in the User collection.
  },
  password: { // Field to store the hashed password of the user.
    type: String, // Specifies the data type as String.
    required: [true, 'Password is required'] // Ensures that password is mandatory with a custom error message.
  },
  userType: { // Field to store the type of user (guest or host).
    type: String, // Specifies the data type as String.
    enum: ['guest', 'host'], // Restricts the values to 'guest' or 'host'.
    default: 'guest' // Sets the default value to 'guest'.
  },
  favourites: [{ // Field to store the list of favourite homes of the user.
    type: mongoose.Schema.Types.ObjectId, // Specifies the data type as ObjectId.
    ref: 'Home' // References the Home model.
  }]
});

// Exporting the User model to use it in other parts of the application.
module.exports = mongoose.model('User', userSchema);