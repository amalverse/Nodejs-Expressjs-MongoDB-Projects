// Importing the 'path' module from Node.js core modules.
const path = require('path');
// Exporting the directory name of the main module's file.
module.exports = path.dirname(require.main.filename);