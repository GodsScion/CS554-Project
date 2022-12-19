const courses = require("../data/courses");
const { isAdmin } = require('../middlewares/auth');

const router = require("express").Router();

router.get("/", courses.getAllCourses);
router.post("/", isAdmin, courses.create);
router.post("/:id/professors", isAdmin, courses.addProfessor);
router.get("/:id", courses.getCourse);
router.post("/:id/reviews", courses.postReview);

module.exports = router;
