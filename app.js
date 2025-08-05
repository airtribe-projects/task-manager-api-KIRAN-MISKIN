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
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// app.listen(3000, (err)=>{
//  if (err) {
//     return console.log('Something bad happened', err);
//     }
//     console.log(`Server is listening on port ${port}`);
// })

module.exports = app;