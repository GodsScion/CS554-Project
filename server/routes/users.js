const users = require("../data/users");
const { isAuthenticated } = require('../middlewares/auth')

const router = require("express").Router();

router.post("/login", users.login);
router.post("/logout", isAuthenticated, users.logout);
router.post("/signup", users.signUp);
router.get("/status", users.getUserStatus);
router.get("/:id", isAuthenticated, users.getUser);
router.put("/:id", isAuthenticated, users.editUser);

module.exports = router;
