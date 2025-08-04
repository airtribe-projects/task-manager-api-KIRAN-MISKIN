const express = require('express');
const app = express();
const port = 3000;

// Importing the tasks router
const tasksrouter = require('./router/tasksrouter')

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (form submissions etc.)
app.use(express.urlencoded({ extended: true }));

// Route handler: All task-related APIs will be prefixed with /api/v1/tasks
app.use('/api/v1/tasks', tasksrouter);

// Fallback route for handling undefined paths (404 errors)
app.use((req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Starting the server on defined port
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on port ${port}`);
});

// Exporting the app (useful for testing)
module.exports = app;