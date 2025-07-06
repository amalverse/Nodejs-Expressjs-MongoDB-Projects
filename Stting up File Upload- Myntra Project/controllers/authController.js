// Importing the express-validator module to validate and sanitize user input.
const { check, validationResult } = require("express-validator");

// Importing the User model to interact with the 'users' collection in the database.
const User = require("../models/user");

// Importing bcryptjs to hash and compare passwords securely.
const bcrypt = require("bcryptjs");

// Controller function to render the login page.
exports.getLogin = (req, res, next) => {
  res.render("auth/login", { // Renders the 'login' view located in the 'views/auth' directory.
    pageTitle: "Login", // Sets the title of the page displayed in the browser.
    currentPage: "login", // Indicates the current page for navigation purposes.
    isLoggedIn: false, // Passes the login status to the view (false for login page).
    errors: [], // Initializes an empty array for validation errors.
    oldInput: { email: "" }, // Initializes the old input object with an empty email field.
    user: {}, // Initializes the user object as empty.
  });
};

// Controller function to render the signup page.
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", { // Renders the 'signup' view located in the 'views/auth' directory.
    pageTitle: "Signup", // Sets the title of the page displayed in the browser.
    currentPage: "signup", // Indicates the current page for navigation purposes.
    isLoggedIn: false, // Passes the login status to the view (false for signup page).
    errors: [], // Initializes an empty array for validation errors.
    oldInput: {firstName: "", lastName: "", email: "", userType: ""}, // Initializes the old input object with empty fields.
    user: {}, // Initializes the user object as empty.
  });
};

// Controller function to handle the signup form submission.
exports.postSignup = [
  // Validation and sanitization for the 'firstName' field.
  check("firstName")
  .trim() // Trims leading and trailing whitespace.
  .isLength({min: 2}) // Checks if the length is at least 2 characters.
  .withMessage("First Name should be atleast 2 characters long") // Error message if validation fails.
  .matches(/^[A-Za-z\s]+$/) // Checks if the input contains only alphabets and spaces.
  .withMessage("First Name should contain only alphabets"), // Error message if validation fails.

  // Validation and sanitization for the 'lastName' field.
  check("lastName")
  .matches(/^[A-Za-z\s]*$/) // Checks if the input contains only alphabets and spaces.
  .withMessage("Last Name should contain only alphabets"), // Error message if validation fails.

  // Validation and sanitization for the 'email' field.
  check("email")
  .isEmail() // Checks if the input is a valid email.
  .withMessage("Please enter a valid email") // Error message if validation fails.
  .normalizeEmail(), // Normalizes the email address.

  // Validation and sanitization for the 'password' field.
  check("password")
  .isLength({min: 8}) // Checks if the length is at least 8 characters.
  .withMessage("Password should be atleast 8 characters long") // Error message if validation fails.
  .matches(/[A-Z]/) // Checks if the input contains at least one uppercase letter.
  .withMessage("Password should contain atleast one uppercase letter") // Error message if validation fails.
  .matches(/[a-z]/) // Checks if the input contains at least one lowercase letter.
  .withMessage("Password should contain atleast one lowercase letter") // Error message if validation fails.
  .matches(/[0-9]/) // Checks if the input contains at least one number.
  .withMessage("Password should contain atleast one number") // Error message if validation fails.
  .matches(/[!@&]/) // Checks if the input contains at least one special character.
  .withMessage("Password should contain atleast one special character") // Error message if validation fails.
  .trim(), // Trims leading and trailing whitespace.

  // Validation and sanitization for the 'confirmPassword' field.
  check("confirmPassword")
  .trim() // Trims leading and trailing whitespace.
  .custom((value, {req}) => { // Custom validation to check if passwords match.
    if (value !== req.body.password) {
      throw new Error("Passwords do not match"); // Error message if validation fails.
    }
    return true; // Indicates successful validation.
  }),

  // Validation and sanitization for the 'userType' field.
  check("userType")
  .notEmpty() // Checks if the input is not empty.
  .withMessage("Please select a user type") // Error message if validation fails.
  .isIn(['guest', 'host']) // Checks if the input is either 'guest' or 'host'.
  .withMessage("Invalid user type"), // Error message if validation fails.

  // Validation and sanitization for the 'terms' field.
  check("terms")
  .notEmpty() // Checks if the input is not empty.
  .withMessage("Please accept the terms and conditions") // Error message if validation fails.
  .custom((value, {req}) => { // Custom validation to check if terms are accepted.
    if (value !== "on") {
      throw new Error("Please accept the terms and conditions"); // Error message if validation fails.
    }
    return true; // Indicates successful validation.
  }),
  
  // Middleware function to handle the signup form submission.
  (req, res, next) => {
    const {firstName, lastName, email, password, userType} = req.body; // Extracts form data from the request body.
    const errors = validationResult(req); // Validates the request and returns any errors.
    if (!errors.isEmpty()) { // Checks if there are validation errors.
      return res.status(422).render("auth/signup", { // Renders the signup page with validation errors.
        pageTitle: "Signup", // Sets the title of the page displayed in the browser.
        currentPage: "signup", // Indicates the current page for navigation purposes.
        isLoggedIn: false, // Passes the login status to the view (false for signup page).
        errors: errors.array().map(err => err.msg), // Maps validation errors to an array of error messages.
        oldInput: {firstName, lastName, email, password, userType}, // Passes the old input values to the view.
        user: {}, // Initializes the user object as empty.
      });
    }

    // Hashes the password and saves the user to the database.
    bcrypt.hash(password, 12)
    .then(hashedPassword => { // Hashes the password with a salt of 12 rounds.
      const user = new User({firstName, lastName, email, password: hashedPassword, userType}); // Creates a new user instance.
      return user.save(); // Saves the user to the database.
    })
    .then(() => {
      res.redirect("/login"); // Redirects to the login page after successful signup.
    }).catch(err => { // Catches any errors during the signup process.
      return res.status(422).render("auth/signup", { // Renders the signup page with an error message.
        pageTitle: "Signup", // Sets the title of the page displayed in the browser.
        currentPage: "signup", // Indicates the current page for navigation purposes.
        isLoggedIn: false, // Passes the login status to the view (false for signup page).
        errors: [err.message], // Passes the error message to the view.
        oldInput: {firstName, lastName, email, userType}, // Passes the old input values to the view.
        user: {}, // Initializes the user object as empty.
      });
    });
  }
]

// Controller function to handle the login form submission.
exports.postLogin = async (req, res, next) => {
  const {email, password} = req.body; // Extracts form data from the request body.
  const user = await User.findOne({email}); // Finds the user by email in the database.
  if (!user) { // Checks if the user does not exist.
    return res.status(422).render("auth/login", { // Renders the login page with an error message.
      pageTitle: "Login", // Sets the title of the page displayed in the browser.
      currentPage: "login", // Indicates the current page for navigation purposes.
      isLoggedIn: false, // Passes the login status to the view (false for login page).
      errors: ["User does not exist"], // Passes the error message to the view.
      oldInput: {email}, // Passes the old input values to the view.
      user: {}, // Initializes the user object as empty.
    });
  }

  const isMatch = await bcrypt.compare(password, user.password); // Compares the input password with the hashed password.
  if (!isMatch) { // Checks if the passwords do not match.
    return res.status(422).render("auth/login", { // Renders the login page with an error message.
      pageTitle: "Login", // Sets the title of the page displayed in the browser.
      currentPage: "login", // Indicates the current page for navigation purposes.
      isLoggedIn: false, // Passes the login status to the view (false for login page).
      errors: ["Invalid Password"], // Passes the error message to the view.
      oldInput: {email}, // Passes the old input values to the view.
      user: {}, // Initializes the user object as empty.
    });
  }

  req.session.isLoggedIn = true; // Sets the login status in the session.
  req.session.user = user; // Sets the user object in the session.
  await req.session.save(); // Saves the session.

  res.redirect("/"); // Redirects to the home page after successful login.
}

// Controller function to handle the logout process.
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => { // Destroys the session.
    res.redirect("/login"); // Redirects to the login page after successful logout.
  })
}