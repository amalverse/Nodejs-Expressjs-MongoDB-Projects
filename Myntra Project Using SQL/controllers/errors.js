// Exporting a function to handle 404 errors
// This function is used to render a '404' page when a requested route is not found
exports.pageNotFound = (req, res, next) => {
  // Setting the HTTP status code to 404 (Not Found)
  res
    .status(404)
    // Rendering the '404' EJS template with the specified page title and current page
    .render("404", { pageTitle: "Page Not Found", currentPage: "404" });
};
