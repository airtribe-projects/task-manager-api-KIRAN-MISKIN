// utils/responseHandler.js
function sendResponse(res, statusCode, messageOrData) {
  const isSuccess = statusCode >= 200 && statusCode < 300;

  if (isSuccess) {
    // If it's a success, send message or data
    if (typeof messageOrData === 'string') {
      return res.status(statusCode).json(messageOrData);
    } else {
      return res.status(statusCode).json(messageOrData);
    }
  } else {
    // If it's an error
    return res.status(statusCode).json({
      status: "Error",
      errorMessage : messageOrData,
    });
  }
}

module.exports = { sendResponse };
