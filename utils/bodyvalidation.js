const { sendResponse } = require('../utils/responseHandler');

const bodyValidation = (req, res) => {
    const allowedBody = ["title", "description", "completed", "priority"];
    const queryKeys = Object.keys(req.body);

    // Identify and reject any invalid keys in request body
    const invalidBody = queryKeys.filter(key => !allowedBody.includes(key));
    if (invalidBody.length > 0) {
        throw new Error(`Invalid body parameter(s): ${invalidBody.join(', ')}. Only 'title', 'description', 'completed' and 'priority' are allowed.`);
    }

    // Destructure required fields from request body
    const { title, description, completed, priority } = req.body;

    const missingFields = [];
    if (title === undefined) missingFields.push('title');
    if (description === undefined) missingFields.push('description');
    if (completed === undefined) missingFields.push('completed');

    if (missingFields.length > 0) {
         throw new Error(`Missing required field(s): ${missingFields.join(', ')}`);
    }
    return {
        title,
        description,
        completed,
        priority
    }

}

module.exports = { bodyValidation }
