const Users = require("../models/users");
const { validateLogin, validateSignUp, validateEditUser } = require("../validators/users");
const ClientError = require("../helpers/client-error");
const ServerError = require("../helpers/server-error");
const bcrypt = require("bcrypt");
const sendResponse = require("../helpers/sendResponse");
const { isValidObjectId: isObjectId } = require("mongoose");
const salt = 10;
const xss = require('../helpers/xss');
const { client } = require('../startup/redisClient');
const { isUserLoggedIn, loggedInUserId, expiryTime } = require('../helpers/enums');
const gm = require('gm');

module.exports = {
  login,
  signUp,
  getUser,
  logout,
  getUserById,
  getUserStatus,
  editUser,
};

async function getUser(req, res, next) {
  try {
    const userId = req.params.id;
    if (!isObjectId(userId)) throw new ClientError("ID is not a valid objectId");

    if (userId != req.user.id) throw new ClientError('Not authorized!', 403);

    const user = await Users.findOne({ _id: userId }).lean();

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
    }).lean();

    if (!user) {
      throw new ClientError("User email or password Incorrect!");
    }

    const userId = user._id.toString();

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ClientError("User email or password Incorrect!");
    }

    await client.set(isUserLoggedIn, 'true');
    await client.set(loggedInUserId, userId);
    await client.expire(isUserLoggedIn, expiryTime);
    await client.expire(loggedInUserId, expiryTime);

    return sendResponse(res, { id: userId, name: user.name, img: user.img || '' });
  } catch (error) {
    if (error instanceof ClientError) {
      return next(error);
    }
    return next(new ServerError(error.message));
  }
}

async function logout(req, res, next) {
  try {
    await client.del(isUserLoggedIn);
    await client.del(loggedInUserId);
    return sendResponse(res, 'User has been successfully logged out');
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
    var base64Img = reqBody.img.split(',')[1];
    console.log(base64Img);
    const imageBuff = Buffer.from(base64Img, 'base64');

    gm(imageBuff)
      .resize(338, 338)
      .toBuffer('PNG', async function (err, buffer) {
        if (err) throw new ServerError(err.message);
        const img1 = buffer.toString('base64');
        const img = `data:image/png;base64,${img1}`;
        const result = await Users.create({
          firstName: reqBody.firstName,
          lastName: reqBody.lastName,
          name: `${reqBody.firstName} ${reqBody.lastName}`,
          email: email,
          password: password,
          img: img
        });
        return sendResponse(res, result);
      })

  } catch (error) {
    if (error instanceof ClientError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function getUserById(id) {
  const user = await Users.findOne({ _id: id }).lean();
  return user;
};

async function editUser(req, res, next) {
  try {
    const reqBody = xss(req.body);

    const userId = req.params.id;
    if (userId != req.user.id) throw new ClientError('Not authorized!', 403);

    if (!isObjectId(userId)) throw ClientError("ID is not a valid objectId");

    const { isInvalid, message } = validateEditUser(reqBody);
    if (isInvalid) {
      throw new ClientError(message);
    }

    const user = await Users.findOne({ _id: userId });

    if (!user) throw new ClientError("User does not exists with given Id");

    if (!(await bcrypt.compare(reqBody.oldPassword, user.password))) {
      throw new ClientError("User password Incorrect!");
    }

    const password = await bcrypt.hash(reqBody.newPassword, salt);

    const response = await Users.updateOne({ _id: userId }, {
      $set: {
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        name: `${reqBody.firstName} ${reqBody.lastName}`,
        password: password,
        img: reqBody.img,
      }
    });

    return sendResponse(res, response);
  } catch (error) {
    if (error instanceof ClientError) {
      return next(error);
    }
    return next(new ServerError(error.message));
  }
}