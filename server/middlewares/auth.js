const { isValidObjectId: isObjectId } = require("mongoose");
const ClientError = require('../helpers/client-error');

module.exports = {
    isAuthenticated,
};

async function isAuthenticated(req, res, next) {
    const url = req.originalUrl;
}