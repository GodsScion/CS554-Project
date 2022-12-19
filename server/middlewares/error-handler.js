const sendResponse = require('../helpers/sendResponse');

module.exports = async (error, req, res, next) => {
  const status = error.status;
  const message = error.message;
  console.log(`Message: ${error.message}\nDescription: ${error.description || 'No Description'}`);

  return sendResponse(res, message, status);
};
