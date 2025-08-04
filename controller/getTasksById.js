let { tasks } = require('../model/localmemory')
const { sendResponse } = require('../utils/responseHandler')

const gettasksbyid = (req, res) => {
    try {
        // Return error if the GET request contains a body
        if (Object.keys(req.body).length > 0) {
            return sendResponse(res, 400, 'GET request should not contain a request body.')
        }

        let { id } = req.params

        // Validate that the id is a number
        if (isNaN(id)) {
            return sendResponse(res, 404, "Invalid Id provided")
        }

        // Convert id to integer for comparison
        id = parseInt(id)

        // Filter tasks array to find task with matching id
        let filteredTasks = tasks.filter(task =>
            task.id === id
        )

        // If matching task is found, return it; otherwise, return not found message
        if (filteredTasks.length !== 0) {
            return sendResponse(res, 200, filteredTasks)
        } else {
            return sendResponse(res, 400, `Task not present for Id ${id}`)
        }

    } catch (err) {
        // Log and return error message if exception occurs
        console.log("Error at gettasksbyid function", err)
        sendResponse(res, 400, err.message)
    }
}

module.exports = { gettasksbyid }