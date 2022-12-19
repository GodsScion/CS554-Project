const Users = require("../models/users");
const { validateLogin, validateSignUp } = require("../validators/users");
const ClientError = require("../helpers/client-error");
const ServerError = require("../helpers/server-error");
const bcrypt = require("bcrypt");
const sendResponse = require("../helpers/sendResponse");
const { isValidObjectId: isObjectId } = require("mongoose");
const salt = 10;
const xss = require('../helpers/xss');

module.exports = {
  login,
  signUp,
  getUser,
  logout,
  getUserById,
  getUserStatus,
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

async function getUserStatus(req, res, next) {
  try {
    const isUserLoggedIn = req.session.user ? true : false;
    if (!isUserLoggedIn) return sendResponse(res, { isUserLoggedIn: false, id: '' });
    return sendResponse(res, { isUserLoggedIn: true, id: req.session.user.id });
  } catch (error) {
    if (error instanceof ClientError) {
      return next(error);
    }
    return next(new ServerError(error.message));
  }
}
async function login(req, res, next) {
  try {
    const reqBody = xss(req.body);

    const { isInvalid, message } = validateLogin(reqBody);
    if (isInvalid) {
      throw new ClientError(message);
    }

    const email = reqBody.email.toLowerCase();
    const password = reqBody.password;

    const user = await Users.findOne({
      email: email,
    });

    if (!user) {
      throw new ClientError("User email or password Incorrect!");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ClientError("User email or password Incorrect!");
    }

    req.session.user = {
      id: user.id,
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
    res.session.destroy();
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
    const reqBody = xss(req.body);

    const { isInvalid, message } = validateSignUp(reqBody);
    if (isInvalid) {
      throw new ClientError(message);
    }

    const email = reqBody.email.toLowerCase();

    const user = await Users.findOne({ email: email });

    if (user) throw new ClientError("User already exists with given email");

    const password = await bcrypt.hash(reqBody.password, salt);

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
};
