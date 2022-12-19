const courses = require("../data/courses");

const router = require("express").Router();

router.get("/", courses.getAllCourses);
router.get("/:id", courses.getCourse);
router.post("/:id/reviews", courses.postReview);

module.exports = router;
