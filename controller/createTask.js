let { tasks, counter } = require('../model/localmemory');
const { sendResponse } = require('../utils/responseHandler');
const {bodyValidation} = require('../utils/bodyvalidation')

// Controller to create a new task
const createTask = (req, res) => {
    try {
        // Reject if any query parameters are sent with POST request
        if (Object.keys(req.query).length > 0) {
            return sendResponse(res, 400, 'Query parameters are not accepted');
        }

        // // Define allowed keys in request body
        // const allowedBody = ["title", "description", "completed", "priority"];
        // const queryKeys = Object.keys(req.body);

        // // Identify and reject any invalid keys in request body
        // const invalidBody = queryKeys.filter(key => !allowedBody.includes(key));
        // if (invalidBody.length > 0) {
        //     return sendResponse(res, 400, `Invalid body parameter(s): ${invalidBody.join(', ')}. Only 'title', 'description', 'completed' and 'priority' are allowed.`);
        // }

        // // Destructure required fields from request body
        // const { title, description, completed, priority } = req.body;

        // Validate presence of mandatory fields
        // if (title === undefined || description === undefined || completed === undefined) {
        //     return sendResponse(res, 400, "Missing required field 'Title', 'description', and 'completed' to create a task.");
        // }
        const { title, description, completed, priority } = bodyValidation(req,res)
        // Validate data types for required fields
        if (typeof title !== "string" || typeof description !== "string" || typeof completed !== "boolean") {
            return sendResponse(res, 400, "Invalid input: 'title' and 'description' must be strings, and 'completed' must be a boolean.");
        }

        //Generate task ID by incrementing counter
       let id = ++counter;

        // Prepare base task object
        let response = {
            id,
            title,
            description,
            completed
        };

        // Handle task creation without 'priority' field
        if (priority === undefined) {
            tasks.push(response);
            let data = {
                message: "Task Created Successfully",
                task: response
            };
            return sendResponse(res, 201, data);
        } else {
            // Validate 'priority' value if present
            let check = priority.toLowerCase();
            const allowedPriority = ["low", "medium", "high"];
            const isValidPriority = allowedPriority.includes(check);

            if (!isValidPriority) {
                return sendResponse(res, 400, "Priority accepts only 'Low', 'Medium' and 'High' values");
            }

            // Capitalize first letter of priority and add to response
            response.priority = check.charAt(0).toUpperCase() + check.slice(1);
            tasks.push(response);

            let data = {
                message: "Task Created Successfully",
                task: response
            };
            return sendResponse(res, 201, data);
        }

    } catch (err) {
        // Log and handle any unexpected errors
        console.error(`[createtask Error] ${new Date().toISOString()} - ${err.stack}`);
        sendResponse(res, 400, err.message);
    }
};

module.exports = { createTask };
