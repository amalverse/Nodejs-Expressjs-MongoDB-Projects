// Exporting a function to handle 404 errors (page not found)
exports.pageNotFound = (req, res, next) => {
  // Setting the HTTP status code to 404 and rendering the '404.ejs' view
  res
    .status(404)
    .render("404", { pageTitle: "Page Not Found", currentPage: "404" });
};
