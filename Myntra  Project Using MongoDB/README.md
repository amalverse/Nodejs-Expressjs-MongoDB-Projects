# Node.js Project with MongoDB Integration

## Project Overview
This project is a Node.js application that demonstrates the integration of MongoDB for data storage. It uses the Express framework to handle HTTP requests and EJS as the templating engine for rendering dynamic HTML pages. The project is structured to follow the MVC (Model-View-Controller) pattern, ensuring a clean separation of concerns.

## Project Structure

### 1. **Controllers**
Controllers handle the business logic of the application. They process incoming requests, interact with models, and return responses.
- **Path**: `controllers/`
- **Example**: The `errorsController` handles 404 errors by rendering a custom error page.

### 2. **Models**
Models represent the data and interact with the database. They define the structure of the data and provide methods to query or manipulate it.
- **Path**: `models/`
- **Example**: Models are used to interact with MongoDB collections.

### 3. **Routes**
Routes define the endpoints of the application and map them to the appropriate controller functions.
- **Path**: `routes/`
- **Example**: The `storeRouter` handles routes related to store operations, while the `hostRouter` handles host-related routes.

### 4. **Views**
Views are EJS templates used to render dynamic HTML pages.
- **Path**: `views/`
- **Example**: Templates like `home.ejs` and `404.ejs` are used to display the homepage and error pages, respectively.

### 5. **Utilities**
Utility files provide helper functions used across the application.
- **Path**: `utils/`
- **Example**: `databaseUtil.js` contains the logic to connect to the MongoDB database.

### 6. **Public**
The `public/` folder contains static files like CSS, images, and JavaScript.

## Setting Up the Project

### Prerequisites
- Node.js installed on your system.
- MongoDB installed locally or access to a MongoDB Atlas cluster.

### Installation Steps
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Required NPM Packages
- `express`: Web framework for Node.js.
- `ejs`: Templating engine for rendering dynamic HTML.
- `mongodb`: MongoDB driver for Node.js.

Install these packages using:
```bash
npm install express ejs mongodb
```

## MongoDB Integration

### Connecting to MongoDB
The `utils/databaseUtil.js` file contains the logic to connect to MongoDB. The `mongoConnect` function establishes the connection and provides a callback to start the server.

Example:
```javascript
const { MongoClient } = require('mongodb');

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('your-mongodb-connection-string')
    .then(client => {
      console.log('Connected to MongoDB');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

module.exports = { mongoConnect, getDb };
```

### Using MongoDB Data
To interact with MongoDB, use the `getDb` function to get the database instance and perform operations on collections.

Example:
```javascript
const { getDb } = require('../utils/databaseUtil');

const fetchProducts = () => {
  const db = getDb();
  return db.collection('products').find().toArray();
};

module.exports = { fetchProducts };
```

## Running the Project
1. Start the MongoDB server.
2. Run the application:
   ```bash
   node app.js
   ```
3. Open your browser and navigate to `http://localhost:3000`.

## Additional Notes
- Ensure your MongoDB connection string is correctly configured in `databaseUtil.js`.
- Use environment variables to store sensitive information like database credentials.
- Follow the MVC pattern to maintain a clean and scalable codebase.

This documentation should help new developers understand and set up the project from scratch.
