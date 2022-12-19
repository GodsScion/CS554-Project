const { isValidObjectId: isObjectId } = require("mongoose");
const ClientError = require('../helpers/client-error');
const { adminId } = require('../config/default.json');

module.exports = {
    isAuthenticated,
    isAdmin,
};

async function isAuthenticated(req, res, next) {
    const url = req.originalUrl;
    next();
}

async function isAdmin(req, res, next) {
    try {
        if (!req.session.user || req.session.user.id != adminId) throw new ClientError('Not authorized!', 403);
        next();
    } catch (error) {
        next(error);
    }
}