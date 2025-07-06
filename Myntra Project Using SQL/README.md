# Project Documentation: Intro to SQL with Node.js

## Project Overview
This project demonstrates how to integrate a Node.js application with a MySQL database. It uses the Express.js framework to handle routing and middleware, and EJS as the templating engine for rendering dynamic HTML pages. The project is structured to follow the MVC (Model-View-Controller) design pattern, ensuring a clean separation of concerns.

## Project Structure
The project is organized as follows:

```
15. intro to SQL/
├── app.js
├── nodemon.json
├── package.json
├── controllers/
│   └── errors.js
├── data/
├── models/
├── public/
├── routes/
│   ├── hostRouter.js
│   └── storeRouter.js
├── utils/
│   ├── database.js
│   └── pathUtil.js
└── views/
    ├── 404.html
    ├── add-home.html
    ├── home.html
    └── homeAdded.html
```
├── SQL database - IMPORT IN SQL.csv
### Key Components

#### 1. **Controllers**
Controllers handle the logic for processing requests and returning responses. For example, the `errors.js` controller manages 404 errors by rendering a custom error page.

#### 2. **Models**
Models interact with the database. They define the structure of the data and provide methods for querying and manipulating it. In this project, the database interactions are handled using the `database.js` utility.

#### 3. **Routes**
Routes define the endpoints of the application and map them to specific controller methods. For example:
- `storeRouter.js` handles routes related to store operations.
- `hostRouter.js` handles routes related to host operations.

#### 4. **Views**
Views are EJS templates used to render dynamic HTML pages. They are stored in the `views/` folder.

#### 5. **Utils**
Utility files provide helper functions and configurations. For example:
- `database.js` manages the MySQL database connection.
- `pathUtil.js` provides the root directory path.

## How Components are Connected
1. **Routes**: Define the endpoints and map them to controller methods.
2. **Controllers**: Process the request, interact with the database (via models), and return a response.
3. **Models**: Handle database queries and return data to the controllers.
4. **Views**: Render the data returned by controllers into HTML pages.

## Required NPM Packages
To run this project, you need to install the following NPM packages:

1. **Express**: For creating the server and handling routes.
   ```bash
   npm install express
   ```

2. **EJS**: For rendering dynamic HTML templates.
   ```bash
   npm install ejs
   ```

3. **MySQL2**: For connecting to the MySQL database.
   ```bash
   npm install mysql2
   ```

4. **Nodemon** (optional): For automatically restarting the server during development.
   ```bash
   npm install --save-dev nodemon
   ```

## How To use SQL Data

This project uses SQL to interact with a MySQL database for storing and retrieving data. The database is connected to the Node.js application using the `mysql2` package. Below are the details and code snippets explaining how SQL is used in this project:

### 1. **Database Configuration**
The database connection is configured in the `utils/database.js` file. This file exports a connection pool that is used throughout the application to execute SQL queries.

```javascript
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // Replace with your database host
  user: 'root',      // Replace with your database username
  database: 'my_database', // Replace with your database name
  password: 'password' // Replace with your database password
});

module.exports = pool.promise();
```

### 2. **Executing SQL Queries**
The `db.execute` method is used to execute SQL queries. For example, the following code fetches all rows from the `homes` table:

```javascript
const db = require("./utils/database");

db.execute("SELECT * FROM homes")
  .then(([rows, fields]) => {
    console.log('✅ Getting data from MySQL Database', rows, fields);
  })
  .catch((err) => {
    console.log('❌ Error connecting to MySQL', err);
  });
```

### 3. **Using SQL in Routes**
Routes use SQL queries to fetch or manipulate data. For example, in `storeRouter.js`, you might have a route to fetch all store items:

```javascript
const express = require('express');
const db = require('../utils/database');

const router = express.Router();

router.get('/stores', (req, res) => {
  db.execute("SELECT * FROM stores")
    .then(([rows]) => {
      res.render('stores', { stores: rows });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Database error');
    });
});

module.exports = router;
```

### 4. **Using SQL in Controllers**
Controllers handle the logic for processing SQL data. For example, a controller method to add a new home might look like this:

```javascript
const db = require('../utils/database');

exports.addHome = (req, res) => {
  const { name, location, price } = req.body;
  db.execute("INSERT INTO homes (name, location, price) VALUES (?, ?, ?)", [name, location, price])
    .then(() => {
      res.redirect('/homes');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Database error');
    });
};
```

### 5. **Using SQL Data in Views**
The data fetched from the database is passed to EJS templates for rendering. For example, the `homes` view might display a list of homes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homes</title>
</head>
<body>
  <h1>Available Homes</h1>
  <ul>
    <% homes.forEach(home => { %>
      <li><%= home.name %> - <%= home.location %> - $<%= home.price %></li>
    <% }) %>
  </ul>
</body>
</html>
```

### 6. **Error Handling**
Errors during SQL execution are caught and logged. For example:

```javascript
db.execute("SELECT * FROM non_existent_table")
  .then(([rows, fields]) => {
    console.log(rows);
  })
  .catch(err => {
    console.error('SQL Error:', err);
  });
```

### 7. **Database Initialization**
Before running the application, ensure the database is set up correctly. Import the `SQL database - IMPORT IN SQL.csv` file into your MySQL database to create the required tables and populate them with initial data.

### Summary
- **Database Configuration**: Set up in `utils/database.js`.
- **SQL Queries**: Executed using `db.execute`.
- **Routes and Controllers**: Use SQL to fetch and manipulate data.
- **Views**: Render SQL data using EJS templates.
- **Error Handling**: Log and handle SQL errors gracefully.

By following these steps, you can effectively use SQL in this project to manage and display data.

## Steps to Create This Project from Scratch
1. **Initialize a Node.js Project**
   ```bash
   npm init -y
   ```

2. **Install Required Packages**
   Install the packages listed above.

3. **Set Up the Project Structure**
   Create folders for `controllers`, `models`, `routes`, `utils`, and `views`.

4. **Configure the Database**
   - Create a MySQL database.
   - Import the `SQL database - IMPORT IN SQL.csv` file into the database.
   - Configure the database connection in `utils/database.js`.

5. **Define Routes**
   Create route files (e.g., `storeRouter.js`, `hostRouter.js`) and define endpoints.

6. **Create Controllers**
   Write controller methods to handle the logic for each route.

7. **Set Up Views**
   Create EJS templates in the `views/` folder.

8. **Run the Application**
   Start the server using Node.js or Nodemon:
   ```bash
   nodemon app.js
   ```

## Additional Notes
- Ensure that the MySQL server is running before starting the application.
- Use environment variables to store sensitive information like database credentials.
- Follow the MVC pattern to keep the codebase organized and maintainable.

## Conclusion
This project serves as a foundational example of integrating Node.js with a MySQL database. By following the steps and structure outlined above, you can extend this project or create a similar one from scratch.
