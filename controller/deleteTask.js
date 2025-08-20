const { tasks } = require('../model/localmemory');
const { sendResponse } = require('../utils/responseHandler');

const deletetask = (req, res) => {
    try {
        // Reject query parameters
        if (Object.keys(req.query).length > 0) {
            return sendResponse(res, 400, 'Query parameters are not accepted for this route.');
        }

        // DELETE should not have a body
        if (Object.keys(req.body).length > 0) {
            return sendResponse(res, 400, 'DELETE request should not contain a request body.');
        }

        // Extract ID from path
        let { id } = req.params;

        // Validate ID is numeric
        if (isNaN(id)) {
            return sendResponse(res, 400, 'Invalid task ID. Please provide a numeric ID.');
        }

        id = parseInt(id, 10);

        // Find task index
        const index = tasks.findIndex(task => task.id === id);

        // Handle task not found
        if (index === -1) {
            return sendResponse(res, 404, `No task found with ID ${id}.`);
        }

        // Remove task
        tasks.splice(index, 1);

        return sendResponse(res, 200, `Task with ID ${id} deleted successfully.`);
    } catch (err) {
        // Structured error log
        console.error(`[deleteTask Error] ${new Date().toISOString()} - ${err.stack}`);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

module.exports = { deletetask };
