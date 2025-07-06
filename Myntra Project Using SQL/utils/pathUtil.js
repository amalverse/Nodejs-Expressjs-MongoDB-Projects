// Importing the 'path' module from Node.js core modules to work with file and directory paths
const path = require('path');

// Exporting the directory name of the main module's file
// This is used to get the root directory of the project
module.exports = path.dirname(require.main.filename);