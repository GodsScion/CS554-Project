const professors = require("../data/professors");

const router = require("express").Router();

router.get("/", professors.getAllProfessors);
router.get("/:id", professors.getProfessor);
router.post("/:id/reviews", professors.postReview);

module.exports = router;
