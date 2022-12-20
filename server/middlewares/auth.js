const ClientError = require('../helpers/client-error');
const { client } = require('../startup/redisClient');
const { getUserById } = require('../data/users');
const { isUserLoggedIn, loggedInUserId } = require('../helpers/enums');

module.exports = {
    isAuthenticated,
    isAdmin,
};

async function isAuthenticated(req, res, next) {
    try {
        const isUserLoggedInValue = await client.get(isUserLoggedIn);
        if (!isUserLoggedInValue || isUserLoggedInValue != 'true') throw new ClientError('Not authorized!', 403);
        const userId = await client.get(loggedInUserId);
        const user = await getUserById(userId);
        if (!user) throw new ClientError('Not authorized!', 403);

        req.user = {
            id: user._id.toString(),
            name: user.name,
        };
        next();
    } catch (error) {
        next(error);
    }
}

async function isAdmin(req, res, next) {
    try {
        const isUserLoggedInValue = await client.get(isUserLoggedIn);
        if (!isUserLoggedInValue || isUserLoggedInValue != 'true') throw new ClientError('Not authorized!', 403);
        const userId = await client.get(loggedInUserId);
        const user = await getUserById(userId);
        if (!user || user.email != 'admin@corstash.com') throw new ClientError('Not authorized!', 403);
        req.user = {
            id: user._id.toString(),
            name: user.name,
        };
        next();
    } catch (error) {
        next(error);
    }
}