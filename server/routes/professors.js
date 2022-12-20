const professors = require("../data/professors");
const { isAdmin, isAuthenticated } = require('../middlewares/auth');

const router = require("express").Router();

router.get("/", professors.getAllProfessors);
router.get("/:id", professors.getProfessor);
router.post("/:id/reviews", isAuthenticated, professors.postReview);

module.exports = router;
