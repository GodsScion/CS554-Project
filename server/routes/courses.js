const courses = require("../data/courses");
const { isAdmin, isAuthenticated } = require('../middlewares/auth');

const router = require("express").Router();

router.get("/", courses.getAllCourses);
router.post("/", isAdmin, courses.create);
router.post("/:id/professors", isAdmin, courses.addProfessor);
router.get("/:id", courses.getCourse);
router.post("/:id/reviews", isAuthenticated, courses.postReview);

module.exports = router;
