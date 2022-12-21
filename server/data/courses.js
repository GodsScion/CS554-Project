const Courses = require("../models/courses");
const { validateCreate, validateAddProfessor, validatePostreview } = require('../validators/courses');
const ClientError = require("../helpers/client-error");
const ServerError = require("../helpers/server-error");
const sendResponse = require("../helpers/sendResponse");
const { isValidObjectId: isObjectId } = require("mongoose");
const { getUserById } = require('./users');
const { getProfessorById } = require('./professors');
const xss = require('../helpers/xss');
const moment = require('moment');

module.exports = {
    getAllCourses,
    getCourse,
    postReview,
    create,
    addProfessor,
    getCourseById,
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

async function create(req, res, next) {
    try {
        const reqBody = xss(req.body);

        const { error } = validateCreate(reqBody);
        if (error) {
            throw new ClientError(error.message);
        }

        const result = await Courses.create(reqBody);

        return sendResponse(res, result);
    } catch (error) {
        if (error instanceof ClientError) {
            return next(error);
        }
        return next(new ServerError(error.message));
    }
};

async function addProfessor(req, res, next) {
    try {
        const reqBody = xss(req.body);
        const courseId = req.params.id;
        if (!isObjectId(courseId)) throw new ClientError("Course does not exists with given id", 404);

        const { error } = validateAddProfessor(reqBody);
        if (error) {
            throw new ClientError(error.message);
        }

        let course = await Courses.findOne({ _id: courseId }).lean();

        if (!course) throw new ClientError("Course does not exists with given id", 404);

        const professor = await getProfessorById(reqBody.id);

        const result = await Courses.updateOne({ _id: courseId }, { $addToSet: { professors: { _id: professor._id, name: professor.name } } });

        return sendResponse(res, result);
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

        let course = await Courses.findOne({ _id: courseId }).lean();

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
                createdAt: moment(review.createdAt * 1000).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                user: {
                    id: review.userId,
                    name: user.name,
                }
            };
            reviews.push(d);
        }

        course = {
            id: course._id,
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

        const userId = req.user.id;

        if (!isObjectId(courseId)) throw new ClientError("Course does not exists with given id", 404);

        const { error } = validatePostreview(reqBody);
        if (error) {
            throw new ClientError(error.message);
        }

        let course = await Courses.findOne({ _id: courseId });

        if (!course) throw new ClientError("Course does not exists with given id", 404);

        const reviewsSize = course.reviews.length;

        const review = {
            rating: parseInt(reqBody.rating),
            review: reqBody.review,
            userId: userId
        }

        let newRating = ((course.rating * reviewsSize) + review.rating) / (reviewsSize + 1);
        newRating = Math.round((newRating + Number.EPSILON) * 100) / 100
        const updateQuery = {
            $set: {
                rating: newRating
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

async function getCourseById(id) {
    const professor = await Courses.findOne({ _id: id }).lean();

    if (!professor) throw new ClientError("Course does not exists with given id");

    return professor;
};