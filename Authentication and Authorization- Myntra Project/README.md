# Project Details

## Project Overview

This project is a Node.js application that demonstrates the use of cookies and sessions for user authentication and state management. It includes features such as user login, home management, and store functionalities. The project uses the Express framework and integrates with MongoDB for data storage.

## Project Structure

This project is structured to follow the Model-View-Controller (MVC) design pattern, which separates the application logic into three interconnected components:

### Updated Project Structure Tree

```plaintext
Cookies and Sessions/
├── app.js
├── nodemon.json
├── package.json
├── tailwind.config.js
├── controllers/
│   ├── authController.js
│   ├── hostController.js
│   ├── errors.js
│   └── storeController.js
├── models/
│   ├── favourite.js
│   ├── home.js
│   └── user.js
├── public/
│   └── [static assets like CSS files]
├── routes/
│   ├── authRouter.js
│   ├── hostRouter.js
│   └── storeRouter.js
├── utils/
│   └── pathUtil.js
└── views/
    ├── auth/
    │   ├── login.ejs
    │   └── signup.ejs
    ├── host/
    │   ├── edit-home.ejs
    │   ├── home-added.ejs
    │   └── host-home-list.ejs
    ├── partials/
    │   ├── nav.ejs
    │   ├── head.ejs
    │   ├── favourite.ejs
    │   └── errors.ejs
    ├── store/
    │   ├── bookings.ejs
    │   ├── favourite-list.ejs
    │   ├── home-detail.ejs
    │   ├── home-list.ejs
    │   ├── index.ejs
    │   └── reserve.ejs
    └── 404.ejs
```

## How Controllers, Models, and Routes Work

### Controllers
Controllers handle the logic for processing incoming requests, interacting with models, and returning responses. They act as the intermediary between the routes and the models.

Example: `authController.js`
```javascript
exports.login = (req, res) => {
    const { username, password } = req.body;
    // Validate user credentials
    if (username === 'admin' && password === 'password') {
        req.session.isLoggedIn = true;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
};
```

### Models
Models define the structure of the data and interact with the MongoDB database using Mongoose. They encapsulate the data logic and provide an interface to interact with the database.

Example: `home.js`
```javascript
const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number
});

module.exports = mongoose.model('Home', homeSchema);
```

### Routes
Routes define the endpoints for the application and map them to the appropriate controller functions. They act as the entry point for HTTP requests.

Example: `authRouter.js`
```javascript
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);

module.exports = router;
```

### Connection Between Controllers, Models, and Routes
The `authRouter.js` maps the `/login` endpoint to the `login` function in `authController.js`. The controller can interact with models to fetch or save data as needed.

## Required NPM Packages

Install the following dependencies:

```bash
npm install express mongodb mongoose ejs express-session cookie-parser dotenv connect-mongodb-session express-validator bcryptjs
```

For development purposes, you can also install nodemon:

```bash
npm install --save-dev nodemon
```

### Explanation of Key Packages
- **express**: A web framework for Node.js.
- **mongodb**: MongoDB driver for Node.js.
- **mongoose**: ODM library for MongoDB.
- **ejs**: Template engine for rendering views.
- **express-session**: Middleware for managing sessions.
- **cookie-parser**: Middleware for parsing cookies.
- **dotenv**: For managing environment variables.
- **connect-mongodb-session**: MongoDB-backed session store.
- **express-validator**: Middleware for validating user input.
- **bcryptjs**: Library for hashing passwords.

## How MongoDB Works with This Project

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model application data.

### Connecting to MongoDB

In `app.js`, Mongoose is used to connect to the MongoDB database:
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
```

### Performing CRUD Operations

Example of creating a new home listing:
```javascript
const Home = require('./models/home');

const newHome = new Home({
    title: 'Cozy Apartment',
    description: 'A cozy apartment in the city center.',
    price: 1200
});

newHome.save().then(() => {
    console.log('Home saved successfully');
}).catch(err => {
    console.error('Error saving home:', err);
});
```

### Querying Data

Example of fetching all homes:
```javascript
Home.find().then(homes => {
    console.log('Homes:', homes);
}).catch(err => {
    console.error('Error fetching homes:', err);
});
```

## How Cookies and Sessions Work

### Cookies
Cookies are small pieces of data stored on the client-side. In this project, cookies are used to store the session ID, which is sent with each request to identify the user.

### Sessions
Sessions store user-specific data on the server-side. When a user logs in, a session is created, and the session ID is stored in a cookie.

### Implementation

In `app.js`, cookies and sessions are set up as follows:
```javascript
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: process.env.DB_PATH,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store
}));
```

## How Authentication and Authorization Work

### Authentication
Authentication is the process of verifying the identity of a user. In this project, authentication is implemented using sessions. When a user logs in, their session is created and stored on the server.

Example:
```javascript
exports.login = (req, res) => {
    const { username, password } = req.body;
    // Validate user credentials
    if (username === 'admin' && password === 'password') {
        req.session.isLoggedIn = true;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
};
```

### Authorization
Authorization is the process of determining whether a user has permission to perform a specific action. In this project, authorization can be implemented by checking the session data before processing a request.

Example:
```javascript
exports.isAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
};
```

## How to Create This Project from Scratch

1. **Initialize the Project**:
   ```bash
   mkdir cookies-and-sessions
   cd cookies-and-sessions
   npm init -y
   ```

2. **Install Dependencies**:
   ```bash
   npm install express mongoose ejs express-session cookie-parser dotenv connect-mongodb-session express-validator bcryptjs
   npm install --save-dev nodemon
   ```

3. **Set Up the Project Structure**:
   Create the folders and files as shown in the project structure tree.

4. **Set Up Environment Variables**:
   Create a `.env` file and add the following:
   ```env
   DB_PATH=mongodb://localhost:27017/your-database-name
   SESSION_SECRET=your-secret-key
   ```

5. **Write the Code**:
   - Create `app.js` and set up Express, Mongoose, and session management.
   - Create controllers, models, and routes as needed.

6. **Run the Project**:
   ```bash
   npm start
   ```

7. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

By following these steps, you can create this project from scratch and understand how its components work together.
