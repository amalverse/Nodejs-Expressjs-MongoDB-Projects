// This function handles the GET request for the login page.
// It renders the 'auth/login' view with the specified page title and other properties.
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login", // Title of the page displayed in the browser.
    currentPage: "login", // Indicates the current page for navigation purposes.
    isLoggedIn: false // Sets the login status to false.
  });
};

// This function handles the POST request for user login.
// It sets the session's isLoggedIn property to true and redirects to the store index page.
exports.postLogin = (req, res, next) => {
  console.log(req.body); // Logs the request body to the console for debugging purposes.
  req.session.isLoggedIn = true; // Marks the user as logged in in the session.
  res.redirect("store/index"); // Redirects the user to the store index page.
}

// This function handles the POST request for user logout.
// It destroys the session and redirects the user to the login page.
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => { // Destroys the session data.
    res.redirect("/login"); // Redirects the user to the login page.
  })
}