const express = require('express');
const app = express();
const tasksRouter = require('./router/tasksrouter');
const port = 3000;
app.use(express.json());
app.use('/tasks', tasksRouter);

// Fallback route for handling undefined paths (404 errors)
app.use((req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: `Route not found: ${req.originalUrl}`,
  });
});

module.exports = app;
