const professors = require("../data/professors");
const { isAdmin, isAuthenticated } = require('../middlewares/auth');

const router = require("express").Router();

router.get("/", professors.getAllProfessors);
router.post("/", isAdmin, professors.create);
router.post("/:id/professors", isAdmin, professors.addCourse);
router.get("/:id", professors.getProfessor);
router.post("/:id/reviews", isAuthenticated, professors.postReview);

module.exports = router;
