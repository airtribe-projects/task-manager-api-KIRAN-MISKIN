let { tasks } = require('../model/localmemory')  // Importing tasks array from local in-memory storage
const { sendResponse } = require('../utils/responseHandler')  // Importing reusable response handler

const gettasksbypriority = (req, res) => {
    try {
        // Check if query parameters are provided — if yes, return error (not allowed)
        if (Object.keys(req.query).length > 0) {
            return sendResponse(res, 400, 'Query parameter are not accepted')
        }

        // Check if body data is sent in GET request — if yes, return error (not allowed)
        if (Object.keys(req.body).length > 0) {
            return sendResponse(res, 400, 'GET request should not contain a request body.')
        }

        // Extract priority level from URL path param and convert it to lowercase for standardization
        const level = req.params.level.toLowerCase();

        // Define valid priority levels
        const allowedLevels = ["low", "medium", "high"]

        // If provided level is not one of the valid levels, return 404
        if (!allowedLevels.includes(level)) {
            return sendResponse(res, 404, "Invalid Level")
        }

        // Capitalize the first letter to match stored task format (e.g., "Low", "Medium", "High")
        const newlevel = level.charAt(0).toUpperCase() + level.slice(1)

        // Filter tasks that match the given priority level
        let filteredTasks = tasks.filter((items) => items.priority === newlevel)
        
        // If no matching tasks found, send 400 response with message
        if (filteredTasks.length === 0) {
            return sendResponse(res, 400, `No Tasks found Under ${newlevel} Level`)
        } else {
            // If matching tasks found, send success response with the tasks
            return sendResponse(res, 200, filteredTasks)
        }
    } catch (err) {
        // Handle any unexpected runtime errors
        console.log("Error at getTasksByPriority function", err)
        sendResponse(res, 400, err.message)
    }
}

module.exports = gettasksbypriority;  // Exporting the function to use in routes