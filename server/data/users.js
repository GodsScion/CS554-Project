const mongoCollections = require("../config/mongoCollection");
const users = mongoCollections.users;

const bcrypt = require("bcrypt");
const saltRounds = 16;
const { ObjectId } = require("mongodb");

function checkIsPassword(s) {
  if (s.length < 6) throw "Given password size is less than 8";
}
function checkIsString(s) {
  if (typeof s !== "string") throw "Given input is invalid";
  if (s.length < 1) throw "Given input is empty";
  if (s.trim().length === 0) throw "Given input is all white spaces";
}
function checkIsEmail(s) {
  const emailRegex = /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/;
  if (!emailRegex.test(s)) throw "Given email id is invalid";
}

function checkIsUsername(s) {
  if (s.length < 4) throw "Given username size is less than 4";
}

async function createUser(
  email,

  username,
  password
) {
  console.log("Inside else of create user");

  if (!email) throw "Must provide the email";
  if (!username) throw "Must provide the username";
  if (!password) throw "Must provide the password";

  email = email.toLowerCase().trim();
  username = username.toLowerCase().trim();
  password = password.trim();

  try {
    checkIsString(email);
    checkIsString(username);
    checkIsString(password);

    checkIsEmail(email);

    checkIsUsername(username);
    checkIsPassword(password);
  } catch (e) {
    console.log(e);
    throw String(e);
  }

  const userCollection = await users();

  if (await userCollection.findOne({ email: email })) throw "Email is taken.";

  let hash = null;

  hash = await bcrypt.hash(password, saltRounds);

  let newUser = {
    email: email,
    username: username,
    password: hash,
    commments: [],
  };

  console.log("Before insert of create user");
  const insertInfo = await userCollection
    .insertOne(newUser)
    .catch(function (e) {
      throw "Username already exists";
    });
  if (insertInfo.insertedCount === 0) throw `Could not add user`;
  return insertInfo.insertedId.toString();
}

async function getUser(emailId) {
  if (
    typeof emailId !== "string" ||
    emailId.length === 0 ||
    emailId === " ".repeat(emailId.length)
  )
    throw "Error: emailId must be a non-empty string.";

  checkIsEmail(emailId);
  const userCollection = await users();
  const singleUserId = await userCollection.findOne({ email: emailId });
  if (singleUserId === null) return null;
  return { ...singleUserId, _id: singleUserId._id.toString() };
}

async function updateUser(email, username, password, id) {
  if (!email) throw "Must provide the email";
  if (!username) throw "Must provide the username";

  if (!password) throw "Must provide the password";

  email = email.toLowerCase().trim();
  username = username.toLowerCase().trim();
  password = password.trim();

  try {
    checkIsString(email);
    checkIsString(username);
    checkIsString(password);
    checkIsEmail(email);
    checkIsUsername(username);
    checkIsPassword(password);
  } catch (e) {
    throw String(e);
  }
  let objectID = ObjectId(id);
  const userCollection = await users();

  // check if email exists
  const userFound = await userCollection.findOne({ email: email }).toArray();
  if (userFound.length > 0) return false;
  let updateObj = {};
  if (email) updateObj.email = email;

  if (password) updateObj.password = await bcrypt.hash(password, saltRounds);

  const updateUser = await userCollection.updateOne(
    { _id: objectID },

    { $set: updateObj }
  );

  if (updateUser.modifiedCount === 0) throw "User could not be updated";
  return updateUser;
}

async function checkUser(email, password) {
  // error check
  if (!email) throw "You must provide a username";
  if (!password) throw "You must provide a password";

  email = email.toLowerCase().trim();

  try {
    checkIsEmail(email);
    checkIsString(password);
    checkIsPassword(password);
  } catch (e) {
    throw String(e);
  }

  // get user by username or email
  const userCollection = await users();
  let user = await userCollection.findOne({ email: email });

  // authenticate user
  if (!user || !bcrypt.compareSync(password, user.password))
    return { authenticated: false };

  return {
    authenticated: true,
    userId: user._id,
    email: email,
  };
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  checkUser,
};
