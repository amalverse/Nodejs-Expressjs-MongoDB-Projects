# Project Documentation: Intro to Mongoose

## Project Overview
This project demonstrates the integration of **Mongoose**, an Object Data Modeling (ODM) library for MongoDB, with a Node.js application. It uses **Express.js** as the web framework and follows a structured approach with controllers, models, and routes to handle different functionalities.

## Project Structure
The project is organized into the following directories:

- **controllers/**: Contains logic to handle requests and responses.
- **models/**: Defines the data schema and interacts with the MongoDB database using Mongoose.
- **routes/**: Defines the endpoints and maps them to the appropriate controllers.
- **views/**: Contains EJS templates for rendering dynamic HTML pages.
- **public/**: Stores static files like CSS, images, and JavaScript.
- **utils/**: Contains utility functions like `pathUtil` to get the root directory.

### File: `app.js`
The `app.js` file is the entry point of the application. It:
- Sets up the Express app.
- Configures middleware for parsing request bodies and serving static files.
- Registers routes for handling requests.
- Connects to the MongoDB database using Mongoose.
- Starts the server.

## How Controllers, Models, and Routes Work Together
1. **Routes**: Define the endpoints (e.g., `/store`, `/host`) and map them to specific controller functions.
2. **Controllers**: Contain the logic to process requests, interact with models, and send responses.
3. **Models**: Define the structure of the data and provide methods to interact with the MongoDB database.

### Example Flow
1. A user sends a request to `/store`.
2. The `storeRouter` routes the request to the appropriate controller function in `storeController`.
3. The controller interacts with the model to fetch or update data in MongoDB.
4. The controller sends a response back to the user.

## Required NPM Packages
To set up this project, the following npm packages are required:

- **express**: Web framework for Node.js.
- **mongoose**: ODM library for MongoDB.
- **dotenv**: Loads environment variables from a `.env` file.
- **ejs**: Template engine for rendering dynamic HTML pages.

### Installation
Run the following command to install the required packages:
```bash
npm install express mongoose dotenv ejs
```

## How Mongoose Works in This Project
Mongoose is used to interact with the MongoDB database. It provides a schema-based solution to model application data.

### Steps to Use Mongoose
1. **Define a Schema**: Create a schema in the `models/` directory.
   ```javascript
   const mongoose = require('mongoose');

   const productSchema = new mongoose.Schema({
       name: String,
       price: Number,
       description: String
   });

   module.exports = mongoose.model('Product', productSchema);
   ```

2. **Connect to MongoDB**: Use `mongoose.connect()` in `app.js`.
   ```javascript
   mongoose.connect(DB_PATH).then(() => {
       console.log('✅Connected to MongoDB');
   }).catch(err => {
       console.log('❌Error while connecting to Mongo: ', err);
   });
   ```

3. **Perform Database Operations**: Use the model to interact with the database.
   ```javascript
   const Product = require('./models/product');

   // Create a new product
   const newProduct = new Product({
       name: 'Sample Product',
       price: 100,
       description: 'This is a sample product.'
   });

   newProduct.save().then(() => {
       console.log('Product saved!');
   }).catch(err => {
       console.log('Error saving product:', err);
   });
   ```

## How Mongoose Interacts with MongoDB Clusters
1. **Connection String**: The MongoDB connection string is stored in the `.env` file as `DB_PATH`.
   ```env
   DB_PATH=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
   ```
2. **Cluster Connection**: Mongoose uses the connection string to connect to the MongoDB cluster.
3. **CRUD Operations**: Mongoose models provide methods like `save()`, `find()`, `updateOne()`, and `deleteOne()` to perform CRUD operations on the database.

## Setting Up the Project from Scratch
1. **Initialize a Node.js Project**:
   ```bash
   npm init -y
   ```

2. **Install Dependencies**:
   ```bash
   npm install express mongoose dotenv ejs
   ```

3. **Create the Directory Structure**:
   ```
   mkdir controllers models routes views public utils
   ```

4. **Set Up `app.js`**:
   - Import required modules.
   - Configure middleware.
   - Register routes.
   - Connect to MongoDB.
   - Start the server.

5. **Create a `.env` File**:
   - Add the MongoDB connection string as `DB_PATH`.

6. **Define Models**:
   - Create schemas in the `models/` directory.

7. **Create Controllers**:
   - Add logic to handle requests and interact with models.

8. **Define Routes**:
   - Map endpoints to controller functions.

9. **Run the Application**:
   ```bash
   node app.js
   ```

## Additional Notes
- Use `nodemon` for automatic server restarts during development.
- Follow best practices for error handling and validation.
- Use environment variables to store sensitive information like database credentials.

This documentation should help new developers understand and set up the project efficiently.