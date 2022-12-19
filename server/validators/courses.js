const Joi = require("joi");
const idRegex = /^[a-f\d]{24}$/i;

module.exports = {
    validateCreate,
    validateAddProfessor,
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


/**
 *
 * @param {*} requestBody
 * @return {*} Validate Object
 */

function validateCreate(requestBody) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
    });

    return schema.validate(requestBody);
};

/**
 *
 * @param {*} requestBody
 * @return {*} Validate Object
 */

function validateAddProfessor(requestBody) {
    const schema = Joi.object().keys({
        id: Joi.string().regex(idRegex).required(),
    });

    return schema.validate(requestBody);
};