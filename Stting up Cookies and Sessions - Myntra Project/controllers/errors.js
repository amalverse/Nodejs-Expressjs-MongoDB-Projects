// This function handles requests to pages that are not found (404 errors).
// It renders the '404' view with the specified page title and other properties.
exports.pageNotFound = (req, res, next) => {
  res
    .status(404) // Sets the HTTP status code to 404 (Not Found).
    .render("404", { 
      pageTitle: "Page Not Found", // Title of the page displayed in the browser.
      currentPage: "404", // Indicates the current page for navigation purposes.
      isLoggedIn: req.isLoggedIn // Passes the login status to the view.
    });
};