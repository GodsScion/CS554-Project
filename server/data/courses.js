const Courses = require("../models/courses");
const { validatePostreview } = require('../validators/courses');
const ClientError = require("../helpers/client-error");
const ServerError = require("../helpers/server-error");
const sendResponse = require("../helpers/sendResponse");
const { isValidObjectId: isObjectId } = require("mongoose");
const { getUserById } = require('./users');
const xss = require('../helpers/xss');

module.exports = {
    getAllCourses,
    getCourse,
    postReview,
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
        if (!isObjectId(courseId)) throw new ClientError("Course does not exists with given id", 404);

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

async function postReview(req, res, next) {
    try {
        const courseId = req.params.id;
        const reqBody = xss(req.body);

        const userId = req.session.user.id;

        if (!isObjectId(courseId)) throw new ClientError("Course does not exists with given id", 404);

        const { error } = validatePostreview(reqBody);
        if (error) {
            throw new ClientError(error.message);
        }

        let course = await Courses.findOne({ _id: courseId });

        if (!course) throw new ClientError("Course does not exists with given id", 404);

        const reviewsSize = course.reviews.length;

        const review = {
            rating: reqBody.rating,
            review: reqBody.review,
            userId: userId
        }

        const updateQuery = {
            $set: {
                rating: parseFloat(((course.rating * reviewsSize) + review.rating) / (reviewsSize + 1).toFixed(2))
            },
            $push: { reviews: review }
        }

        const result = await Courses.updateOne({ _id: courseId }, updateQuery);

        return sendResponse(res, result);
    } catch (error) {
        if (error instanceof ClientError) {
            return next(error);
        }
        return next(new ServerError(error.message));
    }
};