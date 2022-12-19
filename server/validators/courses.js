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
        rating: Joi.number().integer().min(1).max(5).required(),
        review: Joi.string().min(2).required(),
    });

    return schema.validate(requestBody);
};