const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const { ObjectId } = require("mongodb");

function checkIsString(s) {
  if (typeof s !== "string") throw "Given input is invalid";
  if (s.length < 1) throw "Given input is empty";
  if (s.trim().length === 0) throw "Given input is all white spaces";
}

function checkIsPassword(s) {
  if (s.length < 6) throw "Given password size is less than 8";
}

function checkIsEmail(s) {
  if (!/^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(s)) throw "Given email id is invalid";
}

function checkIsUsername(s) {
  if (s.length < 4) throw "Given username size is less than 4";
}

router.post("/signup", async (req, res) => {
  let { email, username, password } = req.body.data;

  if (!(email && username && password)) {
    return res.status(400).send("You must provide all values.");
  }

  email = email.toLowerCase().trim();
  username = username.toLowerCase().trim();
  password = password.trim();

  try {
    checkIsString(email);
    checkIsString(username);
    checkIsString(password);

    checkIsName(firstName);
    checkIsName(lastName);

    checkIsEmail(email);
    checkIsUsername(username);
    checkIsPassword(password);
  } catch (e) {
    return res.status(400).send(String(e));
  }

  try {
    const newUser = await userData.createUser(email, username, password);
    res.status(200).json(newUser);
  } catch (e) {
    return res.status(500).send(String(e));
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body.data;

  if (!(email && password))
    return res.status(400).send("You must provide all values.");

  email = email.toLowerCase().trim();

  try {
    checkIsEmail(email);
    checkIsString(password);

    checkIsPassword(password);
  } catch (e) {
    return res.status(400).send(String(e));
  }

  try {
    let auth = await userData.checkUser(email, password);
    if (auth.authenticated) res.status(200).json(auth);
    else res.status(401).send("Invalid username or password");
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
});

router.put("/profile", async (req, res) => {
  let {
    email,
    username,

    password,
  } = req.body.data;

  try {
    if (!email) throw "Must provide the email";

    if (!username) throw "Must provide the username";
    if (!password) throw "Must provide the password";

    checkIsString(email);
    checkIsString(username);
    checkIsString(password);

    checkIsEmail(email);

    checkIsUsername(username);
    checkIsPassword(password);
  } catch (e) {
    return res.status(400).send(String(e));
  }

  try {
    updatedUser = await userData.updateUser(
      email,

      username,

      password
    );
    res.status(200).json(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(500).send(String(e));
  }
});

module.exports = router;
