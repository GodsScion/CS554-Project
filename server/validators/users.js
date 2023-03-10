const Joi = require("joi");
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

module.exports = {
  validateSignUp,
  validateLogin,
  validateEditUser
};

/**
 *
 * @param {*} requestBody
 * @return {*} Validate Object
 */

function validateSignUp(requestBody) {
  const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(20).required(),
    lastName: Joi.string().alphanum().min(1).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required(),
    img: Joi.string().required(),
  });
  const { error } = schema.validate(requestBody);
  if (error) return { isInvalid: true, message: error.message };
  return { isInvalid: false, message: "" };
}

function validateLogin(requestBody) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required(),
  });
  const { error } = schema.validate(requestBody);
  if (error) return { isInvalid: true, message: error.message };
  return { isInvalid: false, message: "" };
}

function validateEditUser(requestBody) {
  const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(20).required(),
    lastName: Joi.string().alphanum().min(1).max(20).required(),
    oldPassword: Joi.string().regex(passwordRegex).required(),
    newPassword: Joi.string().required(),
    img: Joi.string().regex(passwordRegex).required(),
  });
  const { error } = schema.validate(requestBody);
  if (error) return { isInvalid: true, message: error.message };
  return { isInvalid: false, message: "" };
}
