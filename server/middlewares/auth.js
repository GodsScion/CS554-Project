const { isValidObjectId: isObjectId } = require("mongoose");
const ClientError = require("../helpers/client-error");

module.exports = {
  isAuthenticated,
};

async function isAuthenticated(req, res, next) {
<<<<<<< Updated upstream
    const url = req.originalUrl;
    next();
}
=======
  const url = req.originalUrl;
  next();
}
>>>>>>> Stashed changes
