const Joi = require("joi");

module.exports = {
  validateSignUp,
  validateLogin
};

/**
 *
 * @param {*} requestBody
 * @return {*} Validate Object
 */

function validateSignUp(requestBody) {
  const schema = Joi.object().keys({
    firstName: Joi.string().alphanum(),
    lastName: Joi.string().alphanum(),
    email: Joi.string().email(),
    password: Joi.string(),
    flag: Joi.string(),
  });
  const { error } = schema.validate(requestBody);
  if (error) return { isInvalid: true, message: error.message };
  return { isInvalid: false, message: '' };
}

function validateLogin(requestBody) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(requestBody);
  if (error) return { isInvalid: true, message: error.message };
  return { isInvalid: false, message: '' };
}
