// src/app.ts
import express from 'express';
import sequelize from './src/libs/sequelize.js';
import passport from 'passport';
import routerApi from "./src/routes/index.js"

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (example)
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Sequelize App!');
});

app.use(passport.initialize())

routerApi(app)

import "./src/utils/auth/index.js"

// Function to connect to DB and sync models
async function connectDBAndSync() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync all models with the database
    // sequelize.sync(): Creates tables if they don't exist.
    // sequelize.sync({ force: true }): DROPS existing tables and recreates them. Use with extreme caution!
    // sequelize.sync({ alter: true }): Compares model definitions with current table state and alters tables accordingly.
    //                          Useful for dev, but can be tricky with complex changes/data loss.
    await sequelize.sync({ alter: true }); // A good option for development to add/update columns
    console.log('All models were synchronized successfully.');

    // Start the server ONLY AFTER database sync is complete
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database or sync models:', error);
    process.exit(1); // Exit the process if DB connection/sync fails
  }
}

// Call the function to connect and sync when the application starts
connectDBAndSync();