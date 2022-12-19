const Users = require("../models/users");
const { validateLogin, validateSignUp } = require("../validators/users");
const ClientError = require("../helpers/client-error");
const ServerError = require("../helpers/server-error");
const bcrypt = require("bcrypt");
const sendResponse = require("../helpers/sendResponse");
const { isValidObjectId: isObjectId } = require("mongoose");
const salt = 10;
const xss = require("xss");
module.exports = {
  login,
  getUserById,
  signUp,
  getUser,
  logout,
};

async function getUser(req, res, next) {
  try {
    const userId = req.params.id;
    if (!isObjectId(userId)) throw ClientError("ID is not a valid objectId");

    const user = await Users.findOne({ _id: userId }).lean();

    if (!user) throw new ClientError("User does not exists with given id");

    return sendResponse(res, user);
  } catch (error) {
    if (error instanceof ClientError) {
      return next(error);
    }
    return next(new ServerError(error.message));
  }
}

async function login(req, res, next) {
  try {
    const reqBody = req.body;
    const { isInvalid, message } = validateLogin(reqBody);
    if (isInvalid) {
      throw new ClientError(message);
    }

    const username = reqBody.email;
    const password = reqBody.password;

    const user = await Users.findOne({
      username: username.toLowerCase(),
    });

    if (!user) {
      throw new ClientError("Username or password Incorrect!");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ClientError("Username or password Incorrect!");
    }

    return sendResponse(res, user);
  } catch (error) {
    if (error instanceof ClientError) {
      return next(error);
    }
    return next(new ServerError(error.message));
  }
}

async function logout(req, res, next) {
  try {
    return res.redirect("/");
  } catch (error) {
    if (error instanceof ClientError) {
      return next(error);
    }
    return next(new ServerError(error.message));
  }
}

async function signUp(req, res, next) {
  try {
    const requestBody = req.body;

    const { isInvalid, message } = validateSignUp(requestBody);
    if (error) {
      throw new ServerError(400, error.message);
    }

    const username = requestBody.username.toLowerCase();
    const email = requestBody.email.toLowerCase();

    const user = await Users.findOne({ username: username });

    if (user) throw new ClientError("User already exists with given email");

    const password = await bcrypt.hash(requestBody.password, salt);

    const response = await Users.create({
      firstName: reqBody.firstName,
      lastName: reqBody.lastName,
      name: `${reqBody.firstName} ${reqBody.lastName}`,
      email: email,
      password: password,
    });

    return sendResponse(res, response);
  } catch (error) {
    if (error instanceof ClientError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function getUserById(id) {
  const user = await Users.findOne({ _id: id });
  return user;
}
