// Controller function to handle requests to pages that are not found (404 errors).
exports.pageNotFound = (req, res, next) => {
  res
    .status(404) // Sets the HTTP status code to 404 (Not Found).
    .render("404", { // Renders the '404' view located in the 'views' directory.
      pageTitle: "Page Not Found", // Sets the title of the page displayed in the browser.
      currentPage: "404", // Indicates the current page for navigation purposes.
      isLoggedIn: req.isLoggedIn // Passes the login status to the view.
    });
};