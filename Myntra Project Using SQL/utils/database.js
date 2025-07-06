// Importing the 'mysql2' module to manage MySQL database connections
const mysql = require('mysql2');

// Creating a connection pool to manage multiple database connections efficiently
const pool = mysql.createPool({
  host: 'localhost', // Hostname of the MySQL server
  user: 'root', // Username for the MySQL server
  password: '1234', // Password for the MySQL server
  database: 'airbnb' // Name of the database to connect to
});

// Testing the database connection by getting a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    // Logging an error message if the connection fails
    console.error('Error connecting to MySQL:', err);
  } else {
    // Logging a success message if the connection is successful
    console.log('Connection successful!');
    connection.release(); // Releasing the connection back to the pool
  }
});

// Exporting the promise-based pool to be used in other parts of the application
module.exports = pool.promise();
