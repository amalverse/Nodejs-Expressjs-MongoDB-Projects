// This function handles 404 errors when a user tries to access a page that doesn't exist.
exports.pageNotFound = (req, res, next) => {
  // Sends a 404 status code to indicate the page was not found.
  res
    .status(404)
    // Renders the '404.ejs' view file located in the 'views' folder.
    .render("404", { pageTitle: "Page Not Found", currentPage: "404" });
};
