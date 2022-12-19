const Courses = require("../models/courses");
const { getUserById } = require('./users');
const ClientError = require("../helpers/client-error");
const ServerError = require("../helpers/server-error");
const sendResponse = require("../helpers/sendResponse");
const { isValidObjectId: isObjectId } = require("mongoose");

module.exports = {
    getAllCourses,
    getCourse,
};

async function getAllCourses(req, res, next) {
    try {
        const courses = await Courses.aggregate([
            { $match: {} },
            { $sort: { name: 1 } },
            {
                $project: {
                    _id: 0,
                    id: '$_id',
                    name: '$name',
                    rating: '$rating',
                }
            },
        ]);
        return sendResponse(res, courses);
    } catch (error) {
        if (error instanceof ClientError) {
            return next(error);
        }
        return next(new ServerError(error.message));
    }
};

async function getCourse(req, res, next) {
    try {
        const courseId = req.params.id;
        if (!isObjectId(courseId)) throw ClientError("ID is not a valid objectId");

        let course = await Courses.findOne({ _id: courseId });

        if (!course) throw new ClientError("Course does not exists with given id", 404);

        course.reviews.sort((a, b) => b.createdAt - a.createdAt);

        const reviews = [];
        for (const review of course.reviews) {
            const user = await getUserById(review.userId);
            const d = {
                id: review._id,
                rating: review.rating,
                review: review.review,
                votes: review.votes,
                createdAt: review.createdAt,
                user: {
                    id: review.userId,
                    name: user.name,
                }
            };
            reviews.push(d);
        }

        course = {
            id: course.id,
            name: course.name,
            rating: course.rating,
            description: course.description,
            professors: course.professors.map((i) => { return { id: i['_id'], name: i['name'] } }),
            isLoggedIn: req.session.user ? true : false,
            reviews: reviews,
        }
        return sendResponse(res, course);
    } catch (error) {
        if (error instanceof ClientError) {
            return next(error);
        }
        return next(new ServerError(error.message));
    }
};