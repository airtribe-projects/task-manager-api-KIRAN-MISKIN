const { tasks } = require('../model/localmemory');
const { sendResponse } = require('../utils/responseHandler');

const deletetask = (req, res) => {
    try {
        // Check if any query parameters are present; if so, return an error response
        if (Object.keys(req.query).length > 0) {
            return sendResponse(res, 400, 'Query parameters are not accepted');
        }

        // Check if request body is not empty; DELETE requests should not include a body
        if (Object.keys(req.body).length > 0) {
            return sendResponse(res, 400, 'Delete request should not contain a request body.');
        }

        // Extract the id from route parameters
        let { id } = req.params;

        // Validate that id is a number
        if (isNaN(id)) {
            return sendResponse(res, 404, 'Invalid Id provided');
        }

        id = parseInt(id);

        // Find the index of the task with the given id
        const index = tasks.findIndex(task => task.id === id);

        // If no task is found with that id, return an error
        if (index < 0) {
            return sendResponse(res, 404, 'Invalid id provided');
        }

        // Remove the task from the list
        tasks.splice(index, 1);

        // Send a success response
        return sendResponse(res, 200, 'Deleted Successfully');
    } catch (err) {
        // Log and return the error if something goes wrong
        console.log('Error at deleteTask function', err);
        sendResponse(res, 400, err.message);
    }
};

module.exports = { deletetask };
