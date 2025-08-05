const express = require('express')
const router = express.Router();

// Importing controller functions
const { getalltasks } = require('../controller/getAllTasks')
const { gettasksbyid } = require('../controller/getTasksById')
const { createtask } = require('../controller/createTask')
const { deletetask } = require('../controller/deleteTask')
const updateTask = require('../controller/updateByTaskId')
const gettasksbypriority = require('../controller/getTasksByPriority')

// Route to get all tasks
router.get('/', getalltasks)

// Route to get a task by its ID
router.get('/:id', gettasksbyid)

// Route to create a new task
router.post('/', createtask)

// Route to delete a task by its ID
router.delete('/:id', deletetask)

// Route to update a task by its ID
router.put('/:id', updateTask)

// Route to get tasks by priority level
router.get('/priority/:level', gettasksbypriority)

module.exports = router