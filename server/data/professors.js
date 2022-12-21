const Professors = require("../models/professors");
const { validatePostreview } = require('../validators/professors');
const ClientError = require("../helpers/client-error");
const ServerError = require("../helpers/server-error");
const sendResponse = require("../helpers/sendResponse");
const { isValidObjectId: isObjectId } = require("mongoose");
const { getUserById } = require('./users');
const xss = require('../helpers/xss');
const moment = require('moment');

module.exports = {
    getAllProfessors,
    getProfessor,
    postReview,
    getProfessorById
};

async function getAllProfessors(req, res, next) {
    try {
        const professors = await Professors.aggregate([
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
        return sendResponse(res, professors);
    } catch (error) {
        if (error instanceof ClientError) {
            return next(error);
        }
        return next(new ServerError(error.message));
    }
};

async function getProfessor(req, res, next) {
    try {
        const professorId = req.params.id;
        if (!isObjectId(professorId)) throw new ClientError("Professor does not exists with given id", 404);

        let professor = await Professors.findOne({ _id: professorId });

        if (!professor) throw new ClientError("Professor does not exists with given id", 404);

        professor.reviews.sort((a, b) => b.createdAt - a.createdAt);

        const reviews = [];
        for (const review of professor.reviews) {
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

        professor = {
            id: professor.id,
            name: professor.name,
            rating: professor.rating,
            description: professor.description,
            courses: professor.courses.map((i) => { return { id: i['_id'], name: i['name'] } }),
            isLoggedIn: req.session.user ? true : false,
            reviews: reviews,
        }
        return sendResponse(res, professor);
    } catch (error) {
        if (error instanceof ClientError) {
            return next(error);
        }
        return next(new ServerError(error.message));
    }
};

async function postReview(req, res, next) {
    try {
        const professorId = req.params.id;
        const reqBody = xss(req.body);

        const userId = req.user.id;

        if (!isObjectId(professorId)) throw new ClientError("Professor does not exists with given id", 404);

        const { error } = validatePostreview(reqBody);
        if (error) {
            throw new ClientError(error.message);
        }

        let professor = await Professors.findOne({ _id: professorId });

        if (!professor) throw new ClientError("Professor does not exists with given id", 404);

        const reviewsSize = professor.reviews.length;

        const review = {
            rating: reqBody.rating,
            review: reqBody.review,
            userId: userId
        }

        let newRating = ((professor.rating * reviewsSize) + review.rating) / (reviewsSize + 1);
        newRating = Math.round((newRating + Number.EPSILON) * 100) / 100
        const updateQuery = {
            $set: {
                rating: newRating
            },
            $push: { reviews: review }
        }

        const result = await Professors.updateOne({ _id: professorId }, updateQuery);

        return sendResponse(res, result);
    } catch (error) {
        if (error instanceof ClientError) {
            return next(error);
        }
        return next(new ServerError(error.message));
    }
};

async function getProfessorById(id) {
    const professor = await Professors.findOne({ _id: id }).lean();

    if (!professor) throw new ClientError("Professor does not exists with given id");

    return professor;
};
