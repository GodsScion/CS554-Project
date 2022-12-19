const Joi = require("joi");

module.exports = {
    validatePostreview,
};

/**
 *
 * @param {*} requestBody
 * @return {*} Validate Object
 */

function validatePostreview(requestBody) {
    const schema = Joi.object().keys({
    });

    return schema.validate(requestBody);
};