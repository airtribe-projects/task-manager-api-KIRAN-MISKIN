let { tasks } = require('../model/localmemory');
const { sendResponse } = require('../utils/responseHandler');

const getalltasks = (req, res) => {
    try {
        const allowedQuery = ['completed'];
        const queryKeys = Object.keys(req.query);

        // Validate that only allowed query parameters are present
        const invalidQueries = queryKeys.filter(key => !allowedQuery.includes(key));
        if (invalidQueries.length > 0) {
            return sendResponse(res, 400, `Invalid query parameter(s): ${invalidQueries.join(', ')}. Only 'completed' is allowed.`);
        }

        // Reject the request if a request body is present in a GET request
        if (Object.keys(req.body).length > 0) {
            return sendResponse(res, 400, 'GET request should not contain a request body.');
        }

        let { completed } = req.query;
        let filteredTasks = tasks;

        // If the 'completed' query is specified, validate and filter tasks accordingly
        if (completed !== undefined) {
            completed = completed.toLowerCase();

            // Ensure the 'completed' value is either 'true' or 'false'
            if (completed !== 'true' && completed !== 'false') {
                return sendResponse(res, 400, `'completed' must be either 'true' or 'false'.`);
            }

            // Filter the tasks based on the 'completed' status
            filteredTasks = tasks.filter(task =>
                task.completed === (completed === 'true')
            );
        }

        // Return filtered tasks or a message if none are present
        if (filteredTasks.length !== 0) {
            return sendResponse(res, 200, filteredTasks);
        } else {
            return sendResponse(res, 200, "No Tasks Present");
        }

    } catch (err) {
        // Log any unexpected error and send a response with the error message
        console.log("Error at getalltasks function", err);
        sendResponse(res, 400, err.message);
    }
};

module.exports = { getalltasks };