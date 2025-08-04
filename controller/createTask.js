let { tasks, counter } = require('../model/localmemory');
const createdAtdate = require('../controller/dateAndTime');
const { sendResponse } = require('../utils/responseHandler');

// Controller to create a new task
const createtask = (req, res) => {
    try {
        // Reject if any query parameters are sent with POST request
        if (Object.keys(req.query).length > 0) {
            return sendResponse(res, 400, 'Query parameters are not accepted');
        }

        // Define allowed keys in request body
        const allowedBody = ["title", "description", "completed", "priority"];
        const queryKeys = Object.keys(req.body);

        // Identify and reject any invalid keys in request body
        const invalidbody = queryKeys.filter(key => !allowedBody.includes(key));
        if (invalidbody.length > 0) {
            return sendResponse(res, 400, `Invalid body parameter(s): ${invalidbody.join(', ')}. Only 'title', 'description', 'completed' and 'priority' are allowed.`);
        }

        // Destructure required fields from request body
        const { title, description, completed, priority } = req.body;

        // Validate presence of mandatory fields
        if (title === undefined || description === undefined || completed === undefined) {
            return sendResponse(res, 400, "Missing required field 'Title', 'description', and 'completed' to create a task.");
        }

        // Validate data types for required fields
        if (typeof title !== "string" || typeof description !== "string" || typeof completed !== "boolean") {
            return sendResponse(res, 400, "Invalid input: 'title' and 'description' must be strings, and 'completed' must be a boolean.");
        }

        // Generate createdAt date
        let createdAt = createdAtdate();

        //Generate task ID by incrementing counter
        counter = counter + 1;
        let id = counter;

        // Prepare base task object
        let response = {
            id,
            title,
            description,
            completed,
            createdAt
        };

        // Handle task creation without 'priority' field
        if (priority === undefined) {
            tasks.push(response);
            let data = {
                message: "Task Created Successfully",
                task: response
            };
            return sendResponse(res, 200, data);
        } else {
            // Validate 'priority' value if present
            let check = priority.toLowerCase();
            const allowedPriority = ["low", "medium", "high"];
            const invalidpriority = allowedPriority.includes(check);

            if (!invalidpriority) {
                return sendResponse(res, 400, "Priority accepts only 'Low', 'Medium' and 'High' values");
            }

            // Capitalize first letter of priority and add to response
            response.priority = check.charAt(0).toUpperCase() + check.slice(1);
            tasks.push(response);

            let data = {
                message: "Task Created Successfully",
                task: response
            };
            return sendResponse(res, 200, data);
        }

    } catch (err) {
        // Log and handle any unexpected errors
        console.log("Error at createtask function", err);
        sendResponse(res, 400, err.message);
    }
};

module.exports = { createtask };