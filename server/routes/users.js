const users = require("../data/users");

const router = require("express").Router();

router.post("/login", users.login);
router.post("/logout", users.logout);
router.post("/signup", users.signUp);
router.get("/status", users.getUserStatus);
router.get("/:id", users.getUser);

module.exports = router;
