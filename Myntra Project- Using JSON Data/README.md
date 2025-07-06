# Dynamic Paths Project

This project demonstrates the use of dynamic paths in a Node.js application. It is structured to follow the MVC (Model-View-Controller) design pattern, ensuring a clean separation of concerns and maintainability.

## Project Structure

- **controllers/**: This folder contains the logic for handling requests and responses. Controllers act as the intermediary between the models and views, processing user input and returning the appropriate output.
- **models/**: This folder contains the data structure and logic for interacting with the data. Models are responsible for managing the data of the application.
- **routes/**: This folder defines the application's routes. Each route is connected to a specific controller function, which handles the logic for that route.
- **views/**: This folder contains the HTML templates or views that are rendered and sent to the client.
- **utils/**: This folder contains utility functions that are used across the application.
- **data/**: This folder contains JSON files or other data sources used by the application.
- **public/**: This folder contains static files like CSS, JavaScript, and images.

## How Controllers, Models, and Routes Work Together

1. **Routes**: Define the endpoints and map them to specific controller functions.
2. **Controllers**: Handle the logic for each route. They may interact with models to fetch or update data and then render a view or send a response.
3. **Models**: Manage the data of the application. They interact with the data source (e.g., JSON files in the `data/` folder) to perform CRUD operations.

### Example Flow
- A user makes a request to a specific route (e.g., `/homes`).
- The route maps this request to a controller function (e.g., `storeController.getHomes`).
- The controller fetches data from the model (e.g., `Home.fetchAll`) and sends the data to the view or directly as a JSON response.

### Real Example in This Project
- **Route**: `/homes`
- **Controller Function**: `storeController.getHomes`
- **Model Function**: `Home.fetchAll`
- **Data Source**: `data/homes.json`

#### Workflow:
1. The user accesses the `/homes` route.
2. The `routes/storeRouter.js` file maps this route to the `getHomes` function in `controllers/storeController.js`.
3. The `getHomes` function calls `fetchAll` from `models/home.js`.
4. The `fetchAll` function reads the `data/homes.json` file to fetch the home data.
5. The data is sent back to the client as a JSON response or rendered in a view.

## Required NPM Packages and Installation

To run this project, you need to install the following npm packages:

- **express**: For creating the server and handling routes.
- **body-parser**: For parsing incoming request bodies.
- **nodemon**: For automatically restarting the server during development.

### Installation
Run the following command to install the required packages:

```bash
npm install express body-parser nodemon
```

## How to Create This Project from Scratch

1. **Initialize the Project**:
   - Create a new folder for the project.
   - Run `npm init -y` to initialize a new Node.js project.

2. **Install Required Packages**:
   - Install the necessary npm packages using the command mentioned above.

3. **Set Up the Folder Structure**:
   - Create the following folders: `controllers`, `models`, `routes`, `views`, `utils`, `data`, and `public`.

4. **Create the Entry Point**:
   - Create an `app.js` file in the root directory.
   - Set up a basic Express server in `app.js`.

5. **Define Routes**:
   - Create route files in the `routes/` folder (e.g., `storeRouter.js`).
   - Use `express.Router()` to define routes and export them.

6. **Create Controllers**:
   - Create controller files in the `controllers/` folder (e.g., `storeController.js`).
   - Define functions to handle the logic for each route.

7. **Set Up Models**:
   - Create model files in the `models/` folder (e.g., `home.js`).
   - Define functions to interact with the data source (e.g., read/write JSON files).

8. **Connect Routes to Controllers**:
   - Import the controllers into the route files and map routes to controller functions.

9. **Serve Static Files**:
   - Use `express.static()` to serve files from the `public/` folder.

10. **Use JSON Data**:
    - Create JSON files in the `data/` folder (e.g., `homes.json`).
    - Use the `fs` module in models to read/write data from/to these files.

11. **Run the Server**:
    - Use `nodemon` to start the server for development.
    - Run `npx nodemon app.js` to start the server.

## How to Use JSON Data in This Project

- JSON files in the `data/` folder are used to store and retrieve data.
- Models interact with these JSON files to perform CRUD operations.
- Example:
  - A model reads a JSON file to fetch data.
  - A controller calls the model's function to get the data.
  - The data is sent to the view or returned as a JSON response.

### Real JSON Workflow in This Project
1. A JSON file (`data/homes.json`) contains home data:
   ```json
   [
     { "id": 1, "houseName": "Cozy Cottage", "price": 120, "location": "Countryside", "rating": 4.5 },
     { "id": 2, "houseName": "Modern Apartment", "price": 200, "location": "City Center", "rating": 4.8 }
   ]
   ```
2. The `Home` model reads this file to fetch all homes using the `fetchAll` function.
3. The `storeController` calls the model's function and sends the data to the client as a JSON response or renders it in a view.

This structure ensures a clean and maintainable codebase, making it easy to add new features or modify existing ones.