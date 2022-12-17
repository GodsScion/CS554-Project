const sendResponse = require('../helpers/sendResponse');

module.exports = async (error, req, res, next) => {
  const status = error.status;
  const message = error.message;
  console.log(error.message);

  return sendResponse(res, message, status);
};
