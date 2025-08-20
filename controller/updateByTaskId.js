let { tasks } = require("../model/localmemory")
const { sendResponse } = require('../utils/responseHandler')

const updateTask = (req, res) => {
    try {
        // Rejecting request if any query parameters are provided
        if (Object.keys(req.query).length > 0) {
            return sendResponse(res, 400, "Query parameter are not accepted")
        }

        let { id } = req.params
        // Validate if 'id' is a number
        if (isNaN(id)) {
            return sendResponse(res, 404, "Invalid Id provided")
        }
        id = parseInt(id)

        // Find task by ID
        let filteredbyid = tasks.find(item => item.id === id)

        // If no task matches the given ID, return error
        if (filteredbyid === undefined) {
            return sendResponse(res, 404, "No task found with the provided ID")
        }

        let index = filteredbyid.id;

        const allowedBody = ["title", "description", "completed", "priority"]
        const queryKeys = Object.keys(req.body);

        // Check if any disallowed keys are present in the request body
        const invalidbody = queryKeys.filter(key => !allowedBody.includes(key));
        if (invalidbody.length > 0) {
            return sendResponse(res, 400, `Invalid body parameter(s): ${invalidbody.join(', ')}. Only 'title,'description','completed' and 'priority' is allowed.`)
        }

        // Destructure fields from body
        const { title, description, completed, priority } = req.body;

        // Ensure required fields are present
        if (title === undefined || description === undefined || completed === undefined) {
            return sendResponse(res, 400, "Title, description, and completed fields are required to create a task.")
        }

        // Validate field types
        if (typeof (title) !== "string" || typeof (description) !== "string" || typeof (completed) !== "boolean") {
            return sendResponse(res, 400, "Invalid input: 'title' and 'description' must be strings, and 'completed' must be a boolean.")
        }

        // Update task values
        tasks[index].title = title
        tasks[index].description = description
        tasks[index].completed = completed

        // Update priority if provided, with first letter capitalized and one accept Low,Medium and High
        if (priority !== undefined) {

            let checkpriority = priority.toLowerCase();
            const allowedPriority = ["low", "medium", "high"];

            if (!allowedPriority.includes(priority)) {
                return sendResponse(res, 400, "Priority accepts only 'Low', 'Medium', and 'High' values");
            }

            tasks[index].priority = priority.charAt(0).toUpperCase() + priority.slice(1);
        }

        // Send success response
        sendResponse(res, 200, "Updated Successfully")
    } catch (err) {
        // Catch any unexpected error and respond
        console.log("Error at updateTask function", err)
        sendResponse(res, 400, err.message)
    }
}

module.exports = {updateTask};
